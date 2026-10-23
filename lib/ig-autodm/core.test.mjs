// Tests for the Instagram comment-to-DM core. Run: node --test lib/ig-autodm/
// Meta's API is mocked (no network, no real DMs). D1 is faked with node:sqlite, so the real SQL runs.
import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import CFG from "./config.json" with { type: "json" };
import {
  matchKeyword, resourceUrl, buildDm, validSignature, handleChange, handleMessage, handleGo, handleStats, handle,
  cleanup, store, resetMemory,
} from "./core.mjs";

const IG = "1789000000";  // Vish's account id in the webhook
const SECRET = "test-secret";

function fakeD1({ failCounts = false } = {}) {
  const db = new DatabaseSync(":memory:");
  class Stmt {
    constructor(sql, args = []) { this.sql = sql; this.args = args; }
    bind(...a) { return new Stmt(this.sql, a); }
    check() { if (failCounts && this.sql.includes("INTO autodm_counts")) throw new Error("D1 write limit"); }
    async run() { this.check(); const r = db.prepare(this.sql).run(...this.args); return { meta: { changes: Number(r.changes) } }; }
    async first() { this.check(); return db.prepare(this.sql).get(...this.args) ?? null; }
    async all() { return { results: db.prepare(this.sql).all(...this.args) }; }
  }
  return { prepare: (sql) => new Stmt(sql), batch: async (list) => Promise.all(list.map((s) => s.run())), raw: db };
}

let calls, replies;
function mockGraph(responder = () => ({ status: 200, body: { id: "m1" } })) {
  calls = [];
  globalThis.fetch = async (url, opts = {}) => {
    const call = { url: String(url), method: opts.method || "GET", body: opts.body ? JSON.parse(opts.body) : null };
    calls.push(call);
    const { status, body } = responder(call) || { status: 200, body: {} };
    return new Response(JSON.stringify(body), { status });
  };
}
const dms = () => calls.filter((c) => c.url.endsWith(`/${IG}/messages`));
const comment = (id, text, user = "u1", name = "anna") => ({ id, text, from: { id: user, username: name } });
const tap = (user, key) => ({ sender: { id: user }, recipient: { id: IG }, message: { mid: "x", text: "Send me the link", quick_reply: { payload: `LINK:${key}` } } });
const env = (extra = {}) => ({ IG_ACCESS_TOKEN: "t", IG_APP_SECRET: SECRET, IG_VERIFY_TOKEN: "v", STATS_TOKEN: "s3cret", DB: fakeD1(), ...extra });
async function sign(raw) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(SECRET), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return "sha256=" + Buffer.from(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(raw))).toString("hex");
}
async function stats(e) {
  const r = await handleStats(new Request("https://x/api/autodm-stats", { headers: { authorization: "Bearer s3cret" } }), e);
  return (await r.json()).keywords;
}

beforeEach(() => { resetMemory(); mockGraph(); CFG.follow_check = true; CFG.hourly_cap = 200; });

test("keywords match whole words, any case, with emoji or hashtags", () => {
  assert.equal(matchKeyword("cited please!"), "CITED");
  assert.equal(matchKeyword("#Check 🙏"), "CHECK");
  assert.equal(matchKeyword("citedd"), null);
  assert.equal(matchKeyword("checking this"), null);
  assert.equal(matchKeyword(""), null);
});

test("resource links carry UTM tags and keep the anchor", () => {
  assert.equal(resourceUrl("CITED"), "https://buildwithvvish.com/?utm_source=instagram&utm_medium=dm&utm_campaign=cited#read-get-cited-by-ai-answers");
  assert.match(buildDm("CITED", "c1"), /https:\/\/buildwithvvish\.com\/go\/cited/);
  assert.equal(resourceUrl("NOPE"), null);
});

test("signature: valid, tampered, missing", async () => {
  const raw = '{"a":1}';
  assert.equal(await validSignature(raw, await sign(raw), SECRET), true);
  assert.equal(await validSignature(raw + " ", await sign(raw), SECRET), false);
  assert.equal(await validSignature(raw, null, SECRET), false);
  assert.equal(await validSignature(raw, await sign(raw), ""), false);
});

test("follow check flow: button DM + public reply, then follower gets the link once", async () => {
  const e = env();
  assert.match(await handleChange(e, IG, comment("c1", "CITED")), /sent CITED .*button/);
  const first = dms()[0];
  assert.deepEqual(first.body.recipient, { comment_id: "c1" });
  assert.equal(first.body.message.quick_replies[0].payload, "LINK:CITED");
  assert.ok(first.body.message.quick_replies[0].title.length <= 20);
  assert.match(first.body.message.text, /@anna/);
  assert.ok(!first.body.message.text.includes("{"), "no unfilled placeholder");
  assert.ok(calls.some((c) => c.url.endsWith("/c1/replies")), "public reply posted");

  mockGraph((c) => c.method === "GET" ? { status: 200, body: { username: "anna", is_user_follow_business: true } } : { status: 200, body: {} });
  assert.match(await handleMessage(e, IG, tap("u1", "CITED")), /follows: true/);
  assert.ok(calls[0].url.includes("u1?fields=username,is_user_follow_business"));
  const link = dms()[0];
  assert.deepEqual(link.body.recipient, { id: "u1" });
  assert.match(link.body.message.text, /buildwithvvish\.com\/go\/cited/);
  assert.match(await handleMessage(e, IG, tap("u1", "CITED")), /already sent/);
  const k = (await stats(e)).CITED;
  assert.deepEqual([k.comments, k.dm_sent, k.link_sent, k.followers], [1, 1, 1, 1]);
});

test("non-followers still get the link, with one follow nudge", async () => {
  const e = env();
  await handleChange(e, IG, comment("c1", "cited", "u2", "ben"));
  mockGraph((c) => c.method === "GET" ? { status: 200, body: { is_user_follow_business: false } } : { status: 200, body: {} });
  await handleMessage(e, IG, tap("u2", "CITED"));
  const text = dms()[0].body.message.text;
  assert.match(text, /\/go\/cited/);
  assert.match(text, /@buildwith\.vish/);
  assert.equal((await stats(e)).CITED.non_followers, 1);
});

test("unknown follow status (profile call fails): plain link, no nudge", async () => {
  const e = env();
  mockGraph((c) => c.method === "GET" ? { status: 400, body: { error: { message: "no consent" } } } : { status: 200, body: {} });
  assert.match(await handleMessage(e, IG, tap("u3", "CITED")), /follows: null/);
  const text = dms()[0].body.message.text;
  assert.match(text, /\/go\/cited/);
  assert.ok(!text.includes("@buildwith.vish"));
});

test("typing LINK instead of tapping uses the keyword they commented", async () => {
  const e = env();
  await handleChange(e, IG, comment("c1", "REPORT", "u4"));
  const m = { sender: { id: "u4" }, recipient: { id: IG }, message: { mid: "y", text: "link pls" } };
  assert.match(await handleMessage(e, IG, m), /link REPORT sent/);
  assert.match(await handleMessage(e, IG, { sender: { id: "u9" }, message: { text: "link" } }), /not a link request/);
});

test("duplicates: Meta redelivery and the same person commenting twice send one DM", async () => {
  const e = env();
  await handleChange(e, IG, comment("c1", "CITED"));
  assert.match(await handleChange(e, IG, comment("c1", "CITED")), /already handled/);
  assert.match(await handleChange(e, IG, comment("c2", "cited again")), /already got CITED/);
  assert.equal(dms().length, 1);
  assert.match(await handleChange(e, IG, comment("c3", "CHECK")), /sent CHECK/);  // a different keyword is fine
  assert.equal((await stats(e)).CITED.duplicates, 1);
});

test("quick replies refused (4xx): falls back to the plain link", async () => {
  const e = env();
  mockGraph((c) => c.body && c.body.message && c.body.message.quick_replies ? { status: 400, body: { error: {} } } : { status: 200, body: {} });
  assert.match(await handleChange(e, IG, comment("c1", "CITED")), /\(link\)/);
  assert.equal(dms().length, 2);
  assert.match(dms()[1].body.message.text, /\/go\/cited/);
  assert.equal((await stats(e)).CITED.link_sent, 1);
});

test("Meta down (5xx): counted as failed, and the person can try again later", async () => {
  const e = env();
  mockGraph(() => ({ status: 503, body: {} }));
  assert.match(await handleChange(e, IG, comment("c1", "CITED")), /dm failed 503/);
  assert.equal(dms().length, 1, "no fallback hammering on 5xx");
  mockGraph();
  assert.match(await handleChange(e, IG, comment("c2", "CITED")), /sent CITED/);
  assert.equal((await stats(e)).CITED.dm_failed, 1);
});

test("network error (fetch throws): no crash, no fallback, the person can try again", async () => {
  const e = env();
  globalThis.fetch = async () => { throw new Error("connection reset"); };
  assert.match(await handleChange(e, IG, comment("c1", "CITED")), /dm failed 0: network/);
  mockGraph();
  assert.match(await handleChange(e, IG, comment("c2", "CITED")), /sent CITED/);
  globalThis.fetch = async () => { throw new Error("connection reset"); };
  assert.match(await handleMessage(e, IG, tap("u1", "CITED")), /link failed 0/);
  mockGraph();
  assert.match(await handleMessage(e, IG, tap("u1", "CITED")), /link CITED sent/);
});

test("hourly cap stops DMs and frees the person", async () => {
  const e = env();
  CFG.hourly_cap = 2;
  await handleChange(e, IG, comment("c1", "CITED", "a"));
  await handleChange(e, IG, comment("c2", "CITED", "b"));
  assert.match(await handleChange(e, IG, comment("c3", "CITED", "c")), /cap reached/);
  assert.equal(dms().length, 2);
  assert.equal((await stats(e)).CITED.capped, 1);
});

test("skips: own comment, no keyword, keyword without a resource, echoes", async () => {
  const e = env();
  assert.match(await handleChange(e, IG, { id: "c1", text: "CITED", from: { id: IG } }), /own/);
  assert.match(await handleChange(e, IG, comment("c2", "love this")), /no keyword/);
  const empty = Object.keys(CFG.keywords).find((k) => !CFG.keywords[k].url);
  if (empty) assert.match(await handleChange(e, IG, comment("c3", empty)), /no resource yet/);
  assert.match(await handleMessage(e, IG, { sender: { id: IG }, message: { text: "x" } }), /echo/);
  assert.match(await handleMessage(e, IG, { sender: { id: "u1" }, message: { is_echo: true, text: "CITED" } }), /echo/);
  assert.equal(dms().length, 0);
});

test("follow_check off: one private reply with the link", async () => {
  CFG.follow_check = false;
  const e = env();
  assert.match(await handleChange(e, IG, comment("c1", "CITED")), /\(link\)/);
  assert.equal(dms()[0].body.message.quick_replies, undefined);
  assert.match(dms()[0].body.message.text, /\/go\/cited/);
});

test("analytics failing (D1 limit) never blocks a DM", async () => {
  const e = env({ DB: fakeD1({ failCounts: true }) });
  assert.match(await handleChange(e, IG, comment("c1", "CITED")), /sent CITED/);
  assert.match(await handleChange(e, IG, comment("c1", "CITED")), /already handled/);  // dedupe still works
});

test("/go/KEY counts the click and redirects with UTM tags; unknown goes to /resources", async () => {
  const e = env();
  const r = await handleGo(new Request("https://buildwithvvish.com/go/cited"), e);
  assert.equal(r.status, 302);
  assert.match(r.headers.get("location"), /utm_campaign=cited#read-get-cited/);
  assert.equal((await handleGo(new Request("https://buildwithvvish.com/go/nope"), e)).headers.get("location"), "https://buildwithvvish.com/resources/");
  assert.equal((await handleGo(new Request("https://buildwithvvish.com/go/%3Cscript%3E"), e)).headers.get("location"), "https://buildwithvvish.com/resources/");
  assert.equal((await stats(e)).CITED.clicks, 1);
});

test("stats need the token", async () => {
  const e = env();
  assert.equal((await handleStats(new Request("https://x/api/autodm-stats"), e)).status, 403);
  assert.equal((await handleStats(new Request("https://x/api/autodm-stats", { headers: { authorization: "Bearer nope" } }), e)).status, 403);
  assert.equal((await handleStats(new Request("https://x/api/autodm-stats", { headers: { authorization: "Bearer s3cret" } }), { ...e, STATS_TOKEN: "" })).status, 403);
  const ok = await handleStats(new Request("https://x/api/autodm-stats?days=7", { headers: { authorization: "Bearer s3cret" } }), e);
  assert.equal(ok.status, 200);
  assert.equal((await ok.json()).storage, "d1");
});

test("webhook end to end: verify, signature, comment, message", async () => {
  const e = env();
  const v = await handle(new Request("https://x/api/ig-webhook?hub.mode=subscribe&hub.verify_token=v&hub.challenge=42"), e);
  assert.equal(await v.text(), "42");
  assert.equal((await handle(new Request("https://x/api/ig-webhook?hub.mode=subscribe&hub.verify_token=no&hub.challenge=42"), e)).status, 403);
  const body = JSON.stringify({ object: "instagram", entry: [{ id: IG, time: 1, changes: [{ field: "comments", value: comment("c9", "CITED") }] }] });
  const post = (raw, sig) => new Request("https://x/api/ig-webhook", { method: "POST", body: raw, headers: { "x-hub-signature-256": sig } });
  assert.equal((await handle(post(body, "sha256=00"), e)).status, 401);
  assert.equal((await handle(post(body, await sign(body)), { ...e, IG_ACCESS_TOKEN: "" })).status, 500);
  assert.equal((await handle(post(body, await sign(body)), e)).status, 200);
  assert.equal(dms().length, 1);
  const msg = JSON.stringify({ object: "instagram", entry: [{ id: IG, time: 2, messaging: [tap("u1", "CITED")] }] });
  mockGraph((c) => c.method === "GET" ? { status: 200, body: { is_user_follow_business: true } } : { status: 200, body: {} });
  assert.equal((await handle(post(msg, await sign(msg)), e)).status, 200);
  assert.equal(dms().length, 1);
  assert.equal((await handle(post("not json", await sign("not json")), e)).status, 400);
});

test("no DB binding: the memory fallback runs the same flow", async () => {
  const e = env({ DB: undefined });
  assert.match(await handleChange(e, IG, comment("c1", "CITED")), /sent CITED/);
  assert.match(await handleChange(e, IG, comment("c1", "CITED")), /already handled/);
  const s = await handleStats(new Request("https://x/api/autodm-stats", { headers: { authorization: "Bearer s3cret" } }), e);
  assert.equal((await s.json()).storage, "memory");
});

test("claims expire, and the daily clean-up removes them", async () => {
  const e = env();
  const real = Date.now;
  try {
    await handleChange(e, IG, comment("c1", "CITED"));
    Date.now = () => real() + 8 * 86400 * 1000;  // a week later the same person can ask again
    assert.match(await handleChange(e, IG, comment("c2", "CITED")), /sent CITED/);
    Date.now = () => real() + 40 * 86400 * 1000;
    await cleanup(e);
    assert.equal(e.DB.raw.prepare("SELECT COUNT(*) AS n FROM autodm_seen").get().n, 0);
  } finally { Date.now = real; }
  assert.equal(await store(e).get("nothing"), null);
});

test("config copy: placeholders, lengths, no dashes, every live keyword has a title", () => {
  const all = [...CFG.dm, ...CFG.dm_confirm, ...CFG.dm_follower, ...CFG.dm_nudge, ...CFG.public, CFG.quick_reply_label];
  for (const t of all) assert.ok(!/[–—]/.test(t), `dash in: ${t}`);
  for (const t of [...CFG.dm, ...CFG.dm_follower, ...CFG.dm_nudge]) assert.ok(t.includes("{url}"), `no link in: ${t}`);
  for (const t of CFG.dm_confirm) assert.ok(!t.includes("{url}") && /LINK/.test(t), `confirm must not hold the link: ${t}`);
  for (const t of CFG.dm_nudge) assert.ok(t.includes("{handle}"));
  assert.ok(CFG.quick_reply_label.length <= 20);
  for (const [k, g] of Object.entries(CFG.keywords)) {
    assert.match(k, /^[A-Z0-9]{2,20}$/);
    assert.ok(g.title && g.title.length > 3, k);
    if (g.url) assert.ok(resourceUrl(k).startsWith(CFG.site), k);
  }
});
