// Instagram comment-to-DM core, shared by the Cloudflare Worker (functions/api/ig-webhook.js) and the old Netlify function.
// Web Crypto + fetch only, so it runs on Cloudflare Workers and Node 18+.
//
// The funnel (v2, 23 Oct 2026), Meta's official APIs only, on Vish's own posts:
//   1. Someone comments a keyword (EDIT, CHECK...) -> Instagram calls this webhook ("comments" field).
//   2. One Private Reply (one per comment, within 7 days of it). With follow_check on, it carries a quick-reply button
//      "Send me the link"; otherwise it carries the link. Plus a short, varied public reply under the comment.
//   3. They tap the button -> a "messages" webhook. Messaging the account is the consent Meta requires before we can read
//      is_user_follow_business (User Profile API). Followers get a thank-you + the link; non-followers get the link too,
//      with one friendly follow nudge. Nothing is held back: no follow, still the free resource.
//   4. Links go through /go/KEY (click counter + UTM tags), then the resource on buildwithvvish.com.
// Guards: dedupe per comment and per person+keyword (7 days), an hourly DM cap, own comments skipped, signature checked.
// Storage: Cloudflare D1 binding DB (free plan: 100,000 row writes a day; KV's 1,000 writes a day is too few for one
// busy Reel). Claims are atomic upserts, so a webhook Meta delivers twice can't send two DMs. Without DB it falls back
// to memory (per isolate, for tests and first setup). Tables are created on first use.
// Env: IG_ACCESS_TOKEN, IG_APP_SECRET, IG_VERIFY_TOKEN, optional IG_API_VERSION (default v25.0), STATS_TOKEN, DB (D1).
import CFG from "./config.json" with { type: "json" };

const DAY = 86400;
const now = () => Math.floor(Date.now() / 1000);
const today = () => new Date().toISOString().slice(0, 10);

const SCHEMA = [
  "CREATE TABLE IF NOT EXISTS autodm_seen (k TEXT PRIMARY KEY, v TEXT, exp INTEGER) WITHOUT ROWID",
  "CREATE TABLE IF NOT EXISTS autodm_counts (kw TEXT, day TEXT, field TEXT, n INTEGER, PRIMARY KEY (kw, day, field)) WITHOUT ROWID",
];
const ready = new WeakSet();

function d1(db) {  // the same five calls on D1 and on memory
  const init = async () => { if (!ready.has(db)) { await db.batch(SCHEMA.map((q) => db.prepare(q))); ready.add(db); } };
  const q = async (sql, ...args) => { await init(); return db.prepare(sql).bind(...args); };
  return {
    async claim(k, ttl, v = "1") {  // true only for the first caller (or after the old claim expired)
      const r = await (await q("INSERT INTO autodm_seen (k, v, exp) VALUES (?, ?, ?) ON CONFLICT(k) DO UPDATE SET v = excluded.v, exp = excluded.exp WHERE autodm_seen.exp <= ?", k, v, now() + ttl, now())).run();
      return (r.meta && r.meta.changes) === 1;
    },
    async get(k) { const r = await (await q("SELECT v FROM autodm_seen WHERE k = ? AND exp > ?", k, now())).first(); return r ? r.v : null; },
    async put(k, v, ttl) { await (await q("INSERT INTO autodm_seen (k, v, exp) VALUES (?, ?, ?) ON CONFLICT(k) DO UPDATE SET v = excluded.v, exp = excluded.exp", k, String(v), now() + ttl)).run(); },
    async del(k) { await (await q("DELETE FROM autodm_seen WHERE k = ?", k)).run(); },
    async bump(kw, field, day = today()) {
      const r = await (await q("INSERT INTO autodm_counts (kw, day, field, n) VALUES (?, ?, ?, 1) ON CONFLICT(kw, day, field) DO UPDATE SET n = n + 1 RETURNING n", kw, day, field)).first();
      return r ? r.n : 1;
    },
    async totals(since) {
      const r = await (await q("SELECT kw, field, SUM(n) AS n FROM autodm_counts WHERE day >= ? AND kw != '_cap' GROUP BY kw, field", since)).all();
      return r.results || [];
    },
    async cleanup() {
      await (await q("DELETE FROM autodm_seen WHERE exp <= ?", now())).run();
      await (await q("DELETE FROM autodm_counts WHERE day < ?", new Date(Date.now() - 400 * DAY * 1000).toISOString().slice(0, 10))).run();
    },
  };
}

const MEM = { seen: new Map(), counts: new Map() };  // fallback when no DB binding is set (resets with the isolate)
const mem = {
  async claim(k, ttl, v = "1") { const o = MEM.seen.get(k); if (o && o.exp > now()) return false; MEM.seen.set(k, { v, exp: now() + ttl }); return true; },
  async get(k) { const o = MEM.seen.get(k); return o && o.exp > now() ? o.v : null; },
  async put(k, v, ttl) { MEM.seen.set(k, { v: String(v), exp: now() + ttl }); },
  async del(k) { MEM.seen.delete(k); },
  async bump(kw, field, day = today()) { const id = `${kw}|${day}|${field}`, n = (MEM.counts.get(id) || 0) + 1; MEM.counts.set(id, n); return n; },
  async totals(since) {
    const out = new Map();
    for (const [id, n] of MEM.counts) {
      const [kw, day, field] = id.split("|");
      if (day < since || kw === "_cap") continue;
      out.set(kw + "|" + field, (out.get(kw + "|" + field) || 0) + n);
    }
    return [...out].map(([id, n]) => { const [kw, field] = id.split("|"); return { kw, field, n }; });
  },
  async cleanup() { for (const [k, o] of MEM.seen) if (o.exp <= now()) MEM.seen.delete(k); },
};

export function store(env) { return env && env.DB ? d1(env.DB) : mem; }
export function resetMemory() { MEM.seen.clear(); MEM.counts.clear(); }  // tests

async function bump(env, key, field) {  // daily counters per keyword; analytics never block a DM
  try { await store(env).bump(key, field); } catch (e) { console.error("counter failed", key, field, e); }
}

function pick(arr, seed) {  // stable per comment, varied across comments (FNV-1a)
  let h = 2166136261;
  for (const c of String(seed)) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0; }
  return arr[h % arr.length];
}

const fill = (tpl, map) => Object.entries(map).reduce((s, [k, v]) => s.replaceAll(`{${k}}`, v ?? ""), tpl);

export function matchKeyword(text) {
  const words = new Set(String(text || "").toUpperCase().normalize("NFKD").replace(/[^A-Z0-9]+/g, " ").trim().split(" "));
  for (const k of Object.keys(CFG.keywords)) if (words.has(k)) return k;
  return null;
}

export function linkFor(key) {  // the tracked link sent in DMs
  return `${CFG.site}/go/${key.toLowerCase()}`;
}

export function resourceUrl(key) {  // where /go/KEY lands, with UTM tags
  const g = CFG.keywords[key];
  if (!g || !g.url) return null;
  const u = new URL(g.url.startsWith("http") ? g.url : CFG.site + g.url.replace(/^\/?#/, "/#"));
  const tags = `utm_source=instagram&utm_medium=dm&utm_campaign=${key.toLowerCase()}`;
  return u.hash ? `${u.origin}${u.pathname}${u.search ? u.search + "&" : "?"}${tags}${u.hash}` : `${u.origin}${u.pathname}${u.search ? u.search + "&" : "?"}${tags}`;
}

export function buildDm(key, seed) {
  const g = CFG.keywords[key];
  if (!g || !g.url) return null;
  return fill(pick(CFG.dm, seed), { title: g.title, url: linkFor(key) });
}

async function sameText(a, b) {  // constant-time string compare
  if (a.length !== b.length) return false;
  let d = 0;
  for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}

export async function validSignature(raw, header, secret) {
  if (!header || !secret) return false;
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const mac = new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(raw)));
  return sameText(header, "sha256=" + [...mac].map((b) => b.toString(16).padStart(2, "0")).join(""));
}

async function graph(env, path, body, method = "POST") {
  const base = `https://graph.instagram.com/${env.IG_API_VERSION || "v25.0"}/${path}`;
  let res;
  try {
    res = await fetch(base, {
      method, headers: { "Content-Type": "application/json", Authorization: `Bearer ${env.IG_ACCESS_TOKEN}` },
      body: method === "POST" ? JSON.stringify(body) : undefined,
    });
  } catch (e) { return { ok: false, status: 0, txt: `network: ${e && e.message}`, json: null }; }  // treated like a 5xx
  const txt = await res.text();
  let json = null;
  try { json = JSON.parse(txt); } catch { /* keep text */ }
  return { ok: res.ok, status: res.status, txt: txt.slice(0, 300), json };
}

async function underCap(env) {  // stay well inside Meta's limits (vendors report ~750 private replies an hour)
  try { return (await store(env).bump("_cap", "dm", new Date().toISOString().slice(0, 13))) <= (CFG.hourly_cap || 200); }
  catch (e) { console.error("cap check failed", e); return true; }
}

// 1-2: a keyword comment
export async function handleChange(env, igUserId, value) {
  const from = (value && value.from) || {};
  if (!value || !value.id || !value.text || String(from.id) === String(igUserId)) return "skip: own or empty";
  const key = matchKeyword(value.text);
  if (!key) return "skip: no keyword";
  const g = CFG.keywords[key];
  const db = store(env);
  if (!(await db.claim(`c:${value.id}`, 8 * DAY))) return `skip: comment ${value.id} already handled`;  // Meta retries
  await bump(env, key, "comments");
  if (!g.url) return `skip: keyword ${key} has no resource yet`;
  const person = from.id ? `u:${from.id}:${key}` : null;
  if (person && !(await db.claim(person, 7 * DAY))) {  // same person, same keyword, within 7 days: one DM is enough
    await bump(env, key, "duplicates");
    return `skip: ${from.username || from.id} already got ${key}`;
  }
  if (!(await underCap(env))) {
    if (person) await db.del(person);
    await bump(env, key, "capped");
    return "skip: hourly cap reached";
  }
  const seed = String(value.id), name = from.username ? `@${from.username}` : "";
  let sent, link = false;
  if (CFG.follow_check) {  // a button they tap = they message us = consent to check the follow and send the link
    const text = fill(pick(CFG.dm_confirm, seed), { title: g.title, name }).replace(/ +([!,.])/g, "$1").trim();
    sent = await graph(env, `${igUserId}/messages`, { recipient: { comment_id: value.id },
      message: { text, quick_replies: [{ content_type: "text", title: CFG.quick_reply_label || "Send me the link", payload: `LINK:${key}` }] } });
    if (!sent.ok && sent.status >= 400 && sent.status < 500 && sent.status !== 429) {  // quick replies refused: plain link
      sent = await graph(env, `${igUserId}/messages`, { recipient: { comment_id: value.id }, message: { text: buildDm(key, seed) } });
      link = sent.ok;
    } else if (sent.ok && from.id) {
      await db.put(`p:${from.id}`, key, 7 * DAY);  // what they asked for, if they type "link" instead of tapping
    }
  } else {
    sent = await graph(env, `${igUserId}/messages`, { recipient: { comment_id: value.id }, message: { text: buildDm(key, seed) } });
    link = sent.ok;
  }
  if (!sent.ok) {  // free the person so their next comment can try again
    if (person) await db.del(person);
    await bump(env, key, "dm_failed");
    return `dm failed ${sent.status}: ${sent.txt}`;
  }
  await bump(env, key, "dm_sent");
  if (link) await bump(env, key, "link_sent");
  if (CFG.public_reply) {
    const pub = await graph(env, `${value.id}/replies`, { message: pick(CFG.public, seed + "p") });
    if (!pub.ok) await bump(env, key, "public_failed");
  }
  return `sent ${key} to ${from.username || from.id}${link ? " (link)" : " (button)"}`;
}

// 3: they tapped "Send me the link" (or wrote the keyword / "link") in the DM
export async function handleMessage(env, igUserId, m) {
  const sender = m && m.sender && String(m.sender.id);
  if (!sender || sender === String(igUserId) || (m.message && m.message.is_echo)) return "skip: echo or own";
  const payload = (m.message && m.message.quick_reply && m.message.quick_reply.payload) || (m.postback && m.postback.payload) || "";
  const text = (m.message && m.message.text) || "";
  const db = store(env);
  let key = payload.startsWith("LINK:") ? payload.slice(5).toUpperCase() : matchKeyword(text);
  if (!key && /\blink\b/i.test(text)) key = await db.get(`p:${sender}`);
  if (!key || !CFG.keywords[key] || !CFG.keywords[key].url) return "skip: not a link request";
  const done = `l:${sender}:${key}`;
  if (!(await db.claim(done, 30 * DAY))) return `skip: link for ${key} already sent`;
  const prof = await graph(env, `${sender}?fields=username,is_user_follow_business`, null, "GET");
  const follows = prof.ok && prof.json && typeof prof.json.is_user_follow_business === "boolean" ? prof.json.is_user_follow_business : null;
  const g = CFG.keywords[key], seed = sender + key;
  const set = follows === true ? CFG.dm_follower : follows === false ? CFG.dm_nudge : CFG.dm;  // unknown: plain, no nudge
  const line = fill(pick(set, seed), { title: g.title, url: linkFor(key), handle: CFG.handle || "" });
  const sent = await graph(env, `${igUserId}/messages`, { recipient: { id: sender }, message: { text: line } });
  if (!sent.ok) { await db.del(done); await bump(env, key, "link_failed"); return `link failed ${sent.status}: ${sent.txt}`; }
  await bump(env, key, "link_sent");
  await bump(env, key, follows === true ? "followers" : follows === false ? "non_followers" : "follow_unknown");
  return `link ${key} sent to ${sender} (follows: ${follows})`;
}

// 4: /go/KEY -> count the click, redirect to the resource with UTM tags
export async function handleGo(request, env) {
  const K = String(new URL(request.url).pathname.split("/").filter(Boolean)[1] || "").toUpperCase();
  const dest = /^[A-Z0-9]{2,20}$/.test(K) ? resourceUrl(K) : null;
  if (!dest) return Response.redirect(`${CFG.site}/resources`, 302);
  await bump(env, K, "clicks");
  return Response.redirect(dest, 302);
}

// stats: /api/autodm-stats?days=30 with header "Authorization: Bearer <STATS_TOKEN>"
export async function handleStats(request, env) {
  const auth = request.headers.get("authorization") || "";
  if (!env.STATS_TOKEN || !(await sameText(auth, `Bearer ${env.STATS_TOKEN}`))) return new Response("Forbidden", { status: 403 });
  const days = Math.max(1, Math.min(400, Math.floor(+new URL(request.url).searchParams.get("days") || 30)));
  const since = new Date(Date.now() - (days - 1) * DAY * 1000).toISOString().slice(0, 10);
  const keywords = {};
  for (const { kw, field, n } of await store(env).totals(since)) (keywords[kw] ??= {})[field] = n;
  return new Response(JSON.stringify({ since, storage: env.DB ? "d1" : "memory", keywords }, null, 1),
    { headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });
}

export async function cleanup(env) { await store(env).cleanup(); }  // daily cron: drop expired claims

export async function handle(request, env) {
  const url = new URL(request.url);
  if (request.method === "GET") {  // Meta's one-time webhook verification
    const ok = url.searchParams.get("hub.mode") === "subscribe" && !!env.IG_VERIFY_TOKEN && url.searchParams.get("hub.verify_token") === env.IG_VERIFY_TOKEN;
    return new Response(ok ? url.searchParams.get("hub.challenge") || "" : "Forbidden", { status: ok ? 200 : 403 });
  }
  if (request.method !== "POST") return new Response("Method not allowed", { status: 405 });
  const raw = await request.text();
  if (!(await validSignature(raw, request.headers.get("x-hub-signature-256"), env.IG_APP_SECRET || ""))) return new Response("Bad signature", { status: 401 });
  if (!env.IG_ACCESS_TOKEN) { console.error("IG_ACCESS_TOKEN is not set"); return new Response("Not configured", { status: 500 }); }
  let body;
  try { body = JSON.parse(raw); } catch { return new Response("Bad JSON", { status: 400 }); }
  for (const entry of body.entry || []) {
    for (const ch of entry.changes || []) {
      if (ch.field !== "comments" && ch.field !== "live_comments") continue;
      try { console.log(await handleChange(env, String(entry.id), ch.value)); } catch (e) { console.error("comment failed", e); }
    }
    for (const m of entry.messaging || []) {
      try { console.log(await handleMessage(env, String(entry.id), m)); } catch (e) { console.error("message failed", e); }
    }
  }
  return new Response("OK", { status: 200 });  // always 200 quickly so Meta doesn't retry
}
