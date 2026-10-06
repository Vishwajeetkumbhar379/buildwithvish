// Runs automatically every time a Netlify form is submitted (event-triggered function, classic handler syntax).
// Newsletter sign-ups are passed to MailerLite as "unconfirmed"; MailerLite then sends its double opt-in email.
// Secrets live in Netlify environment variables, never in this file.
import { getStore } from "@netlify/blobs";
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Keeps only the last outcome (no email addresses) so the health check can show whether sign-ups work.
async function note(step: string, status = 0) { try { await getStore("newsletter-diag").setJSON("last", { at: new Date().toISOString(), step, status }); } catch {} }

export const handler = async (event: { body?: string | null }) => {
  await note("triggered");
  let payload: any;
  try { payload = JSON.parse(event.body || "{}").payload; } catch { return { statusCode: 400, body: "Bad request" }; }
  if (!payload || payload.form_name !== "newsletter") return { statusCode: 200, body: "Ignored" };

  const email = String(payload.data?.email || payload.email || "").trim().toLowerCase().replace(/^mailto:/, "");
  if (!EMAIL.test(email) || email.length > 254) { console.error("Newsletter sign-up skipped: not a valid email"); await note("invalid-email"); return { statusCode: 422, body: "Invalid email" }; }

  const token = process.env.MAILERLITE_API_TOKEN, group = process.env.MAILERLITE_GROUP_ID;
  if (!token) { console.error("MAILERLITE_API_TOKEN is not set, so the sign-up was stored in Netlify Forms only."); await note("no-token"); return { statusCode: 500, body: "Not configured" }; }

  const body: Record<string, unknown> = { email, status: "unconfirmed" };
  if (group) body.groups = [group];
  const ip = payload.data?.ip; if (typeof ip === "string" && ip) body.ip_address = ip;

  const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(body),
  });
  if (!res.ok) { console.error("MailerLite rejected the sign-up, status", res.status); await note("mailerlite-rejected", res.status); return { statusCode: 502, body: "Upstream error" }; }
  console.log("Newsletter sign-up passed to MailerLite, status", res.status); await note("ok", res.status);
  return { statusCode: 200, body: "OK" };
};
