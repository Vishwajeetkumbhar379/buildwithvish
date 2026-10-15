// Cloudflare Pages Function: "Partner with me" form -> an email to Vish through Cloudflare Email Routing.
// Needs the send_email binding MAIL (wrangler.toml) and PARTNER_TO = Vish's verified Email Routing address.
// Until both exist it answers 503 and the page shows "Email me instead" with his address.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const clean = (s, n) => String(s || "").replace(/[\r\n]+/g, " ").trim().slice(0, n);

export async function onRequestPost({ request, env }) {
  let d;
  try { d = await request.json(); } catch { return new Response("Bad request", { status: 400 }); }
  if (d["bot-field"]) return new Response("OK", { status: 200 });
  const name = clean(d.name, 120), email = clean(d.email, 254), message = String(d.message || "").trim().slice(0, 5000);
  if (!name || !EMAIL.test(email) || !message) return new Response("Missing fields", { status: 422 });
  if (!env.MAIL || !env.PARTNER_TO) return new Response("Not configured", { status: 503 });
  const { EmailMessage } = await import("cloudflare:email");
  const from = env.PARTNER_FROM || "forms@buildwithvvish.com";
  const raw = [
    `From: Build with Vish <${from}>`, `To: ${env.PARTNER_TO}`, `Reply-To: ${name} <${email}>`,
    `Subject: Partner enquiry: ${clean(d.company, 80) || name}`, `Message-ID: <${crypto.randomUUID()}@buildwithvvish.com>`,
    `Date: ${new Date().toUTCString()}`, "MIME-Version: 1.0", "Content-Type: text/plain; charset=utf-8", "",
    `Name: ${name}`, `Email: ${email}`, `Company: ${clean(d.company, 120)}`, `Topic: ${clean(d.topic, 120)}`, `Page: ${clean(d.page, 120)}`, "", message,
  ].join("\r\n");
  await env.MAIL.send(new EmailMessage(from, env.PARTNER_TO, raw));
  return new Response("OK", { status: 200 });
}
