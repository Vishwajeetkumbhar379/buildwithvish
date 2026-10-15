// Instagram comment-to-DM for Build with Vish (free alternative to ManyChat).
// Someone comments a keyword (EDIT, CITED...) on one of Vish's posts or Reels -> Instagram sends a webhook here ->
// we send that person ONE private reply with the free guide (Instagram's official Private Replies, Instagram API with
// Instagram Login), plus a short varied public reply under the comment. Only Vish's own posts; nothing else is automated.
//
// Netlify env vars (set in the Netlify UI, never in code):
//   IG_ACCESS_TOKEN  long-lived Instagram user access token for Vish's professional account
//   IG_APP_SECRET    the Instagram app secret (verifies that webhooks really come from Meta)
//   IG_VERIFY_TOKEN  any random string, also typed into the Meta webhook settings
//   IG_API_VERSION   optional, default v25.0
// Webhook URL for Meta: https://buildwithvish.netlify.app/.netlify/functions/ig-autodm  (subscribe to "comments")
import crypto from "node:crypto";
import config from "./config.json";

type Cfg = { site: string; public_reply: boolean; keywords: Record<string, { title: string; url: string | null }>; dm: string[]; public: string[] };
const CFG = config as unknown as Cfg;

const pick = <T,>(a: T[], seed: string): T => a[parseInt(crypto.createHash("md5").update(seed).digest("hex").slice(0, 8), 16) % a.length];

export function matchKeyword(text: string): string | null {
  const words = new Set(String(text || "").toUpperCase().normalize("NFKD").replace(/[^A-Z0-9]+/g, " ").trim().split(" "));
  for (const k of Object.keys(CFG.keywords)) if (words.has(k)) return k;
  return null;
}

export function buildDm(key: string, username: string, commentId: string): string | null {
  const g = CFG.keywords[key];
  if (!g || !g.url) return null;
  const url = g.url.startsWith("http") ? g.url : CFG.site + g.url;
  const name = username ? "@" + username : "there";
  return pick(CFG.dm, commentId).replaceAll("{name}", name).replaceAll("{title}", g.title).replaceAll("{url}", url);
}

export function validSignature(raw: string, header: string | null, secret: string): boolean {
  if (!header || !secret) return false;
  const want = "sha256=" + crypto.createHmac("sha256", secret).update(raw, "utf8").digest("hex");
  const a = Buffer.from(header), b = Buffer.from(want);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

async function graph(path: string, body: Record<string, unknown>, token: string) {
  const v = process.env.IG_API_VERSION || "v25.0";
  const res = await fetch(`https://graph.instagram.com/${v}/${path}`, {
    method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify(body),
  });
  const txt = await res.text();
  return { ok: res.ok, status: res.status, txt: txt.slice(0, 300) };
}

export async function handleChange(igUserId: string, value: any, token: string) {
  const from = value?.from || {};
  if (!value?.id || !value?.text || String(from.id) === String(igUserId)) return "skip: own or empty";
  const key = matchKeyword(value.text);
  if (!key) return "skip: no keyword";
  const dm = buildDm(key, from.username || "", String(value.id));
  if (!dm) return `skip: keyword ${key} has no guide yet`;
  const sent = await graph(`${igUserId}/messages`, { recipient: { comment_id: value.id }, message: { text: dm } }, token);
  if (!sent.ok) return `dm failed ${sent.status}: ${sent.txt}`;
  if (CFG.public_reply) await graph(`${value.id}/replies`, { message: pick(CFG.public, String(value.id) + "p") }, token);
  return `sent ${key} to ${from.username || from.id}`;
}

export default async (req: Request) => {
  const url = new URL(req.url);
  if (req.method === "GET") {  // Meta's one-time webhook verification
    const ok = url.searchParams.get("hub.mode") === "subscribe" && url.searchParams.get("hub.verify_token") === process.env.IG_VERIFY_TOKEN;
    return new Response(ok ? url.searchParams.get("hub.challenge") || "" : "Forbidden", { status: ok ? 200 : 403 });
  }
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });
  const raw = await req.text();
  if (!validSignature(raw, req.headers.get("x-hub-signature-256"), process.env.IG_APP_SECRET || "")) return new Response("Bad signature", { status: 401 });
  const token = process.env.IG_ACCESS_TOKEN;
  if (!token) { console.error("IG_ACCESS_TOKEN is not set"); return new Response("Not configured", { status: 500 }); }
  let body: any;
  try { body = JSON.parse(raw); } catch { return new Response("Bad JSON", { status: 400 }); }
  for (const entry of body.entry || []) {
    for (const ch of entry.changes || []) {
      if (ch.field !== "comments" && ch.field !== "live_comments") continue;
      try { console.log(await handleChange(String(entry.id), ch.value, token)); } catch (e) { console.error("comment failed", e); }
    }
  }
  return new Response("OK", { status: 200 });  // always 200 quickly so Meta doesn't retry
};
