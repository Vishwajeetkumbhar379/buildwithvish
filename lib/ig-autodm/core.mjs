// Instagram comment-to-DM core, shared by the Cloudflare Pages Function (functions/api/ig-webhook.js) and the old
// Netlify function. Web Crypto only, so it runs on Cloudflare Workers and Node 18+.
// Someone comments a keyword (CITED, EDIT...) on one of Vish's posts -> Instagram calls the webhook -> one private reply
// with the free guide (Instagram's official Private Replies) + a short varied public reply. Vish's own posts only.
// Env: IG_ACCESS_TOKEN, IG_APP_SECRET, IG_VERIFY_TOKEN, optional IG_API_VERSION (default v25.0).
import CFG from "./config.json";

function pick(arr, seed) {  // stable per comment, varied across comments (FNV-1a)
  let h = 2166136261;
  for (const c of String(seed)) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0; }
  return arr[h % arr.length];
}

export function matchKeyword(text) {
  const words = new Set(String(text || "").toUpperCase().normalize("NFKD").replace(/[^A-Z0-9]+/g, " ").trim().split(" "));
  for (const k of Object.keys(CFG.keywords)) if (words.has(k)) return k;
  return null;
}

export function buildDm(key, commentId) {
  const g = CFG.keywords[key];
  if (!g || !g.url) return null;
  const url = g.url.startsWith("http") ? g.url : CFG.site + g.url;
  return pick(CFG.dm, commentId).replaceAll("{title}", g.title).replaceAll("{url}", url);
}

export async function validSignature(raw, header, secret) {
  if (!header || !secret) return false;
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const mac = new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(raw)));
  const want = "sha256=" + [...mac].map((b) => b.toString(16).padStart(2, "0")).join("");
  if (header.length !== want.length) return false;
  let d = 0;
  for (let i = 0; i < want.length; i++) d |= want.charCodeAt(i) ^ header.charCodeAt(i);
  return d === 0;
}

async function graph(env, path, body) {
  const res = await fetch(`https://graph.instagram.com/${env.IG_API_VERSION || "v25.0"}/${path}`, {
    method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${env.IG_ACCESS_TOKEN}` }, body: JSON.stringify(body),
  });
  return { ok: res.ok, status: res.status, txt: (await res.text()).slice(0, 300) };
}

export async function handleChange(env, igUserId, value) {
  const from = (value && value.from) || {};
  if (!value || !value.id || !value.text || String(from.id) === String(igUserId)) return "skip: own or empty";
  const key = matchKeyword(value.text);
  if (!key) return "skip: no keyword";
  const dm = buildDm(key, String(value.id));
  if (!dm) return `skip: keyword ${key} has no guide yet`;
  const sent = await graph(env, `${igUserId}/messages`, { recipient: { comment_id: value.id }, message: { text: dm } });
  if (!sent.ok) return `dm failed ${sent.status}: ${sent.txt}`;
  if (CFG.public_reply) await graph(env, `${value.id}/replies`, { message: pick(CFG.public, String(value.id) + "p") });
  return `sent ${key} to ${from.username || from.id}`;
}

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
  }
  return new Response("OK", { status: 200 });  // always 200 quickly so Meta doesn't retry
}
