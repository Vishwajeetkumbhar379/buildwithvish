// Cloudflare Pages Function: newsletter sign-up -> MailerLite as "unconfirmed" (MailerLite sends the double opt-in email).
// Env: MAILERLITE_API_TOKEN, optional MAILERLITE_GROUP_ID. Replaces the Netlify Forms + submission-created setup.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function onRequestPost({ request, env }) {
  let data;
  try { data = await request.json(); } catch { return new Response("Bad request", { status: 400 }); }
  if (data["bot-field"]) return new Response("OK", { status: 200 });  // honeypot: quietly drop bots
  const email = String(data.email || "").trim().toLowerCase().replace(/^mailto:/, "");
  if (!EMAIL.test(email) || email.length > 254) return new Response("Invalid email", { status: 422 });
  if (!env.MAILERLITE_API_TOKEN) { console.error("MAILERLITE_API_TOKEN is not set"); return new Response("Not configured", { status: 500 }); }
  const body = { email, status: "unconfirmed" };
  if (env.MAILERLITE_GROUP_ID) body.groups = [env.MAILERLITE_GROUP_ID];
  const ip = request.headers.get("cf-connecting-ip");
  if (ip) body.ip_address = ip;
  const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json", Authorization: `Bearer ${env.MAILERLITE_API_TOKEN}` },
    body: JSON.stringify(body),
  });
  if (!res.ok) { console.error("MailerLite rejected the sign-up, status", res.status); return new Response("Upstream error", { status: 502 }); }
  return new Response("OK", { status: 200 });
}
