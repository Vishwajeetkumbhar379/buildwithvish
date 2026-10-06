// Runs automatically after every verified (non-spam) Netlify Forms submission.
// Newsletter sign-ups are sent to MailerLite as "unconfirmed", so MailerLite emails a
// confirm link first (double opt-in, required in Germany). Only after they click it do
// they join the Build Notes group and the welcome series starts.
// Needs two environment variables in Netlify: MAILERLITE_API_TOKEN and MAILERLITE_GROUP_ID.

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default async (req: Request) => {
  let payload: any;
  try {
    ({ payload } = await req.json());
  } catch {
    return new Response("Bad request", { status: 400 });
  }
  if (!payload || payload.form_name !== "newsletter") return new Response("Ignored");

  const email = String(payload.data?.email || payload.email || "").trim().toLowerCase();
  if (!EMAIL.test(email) || email.length > 254) return new Response("Invalid email", { status: 422 });

  const token = Netlify.env.get("MAILERLITE_API_TOKEN");
  const group = Netlify.env.get("MAILERLITE_GROUP_ID");
  if (!token) {
    console.error("MAILERLITE_API_TOKEN is not set, so the sign-up was stored in Netlify Forms only.");
    return new Response("Not configured", { status: 500 });
  }

  const body: Record<string, unknown> = { email, status: "unconfirmed" };
  if (group) body.groups = [group];
  const ip = payload.data?.ip;
  if (typeof ip === "string" && ip) body.ip_address = ip;

  const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    console.error("MailerLite rejected the sign-up, status", res.status); // no response body: it can contain the email address
    return new Response("Upstream error", { status: 502 });
  }
  return new Response("OK");
};
