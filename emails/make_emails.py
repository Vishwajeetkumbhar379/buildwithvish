"""Builds the three welcome emails (HTML + plain text) from one source, so the repo and MailerLite stay in sync."""
import html, json, pathlib, re
SITE = "https://buildwithvish.netlify.app/"
ADDRESS = "Build with Vish · Vishwajeet Kumbhar · Germany"   # replaced with the full postal address before the automation goes live
D = pathlib.Path(__file__).parent

EMAILS = [
 {"subject": "You're in. Here's where to start.",
  "preview": "Three links, about an hour, and you'll have AI set up properly.",
  "blocks": [
   ("p", "Hi,"),
   ("p", "Thanks for confirming. You're on Build Notes now."),
   ("p", "Here's the deal: every Monday you get one guide, one prompt and one thing to try. Plain words, no jargon, nothing you need to code."),
   ("p", "If you only do one thing this week, do the Start here path. Three steps, in order:"),
   ("ol", [("Pick one AI and set it up properly", "#read-claude-from-zero"),
           ("Learn the six-box brief, the habit that fixes most bad answers", "#read-brief-ai-like-an-agency"),
           ("Build your first thing: a small website, no code", "#read-build-website-no-code")]),
   ("p", "Prefer ChatGPT or Gemini? Those have their own complete guides too, linked from the Start page."),
   ("btn", ("Open the Start here path", "#start")),
   ("p", "One question: what do you want AI to help you with right now? Just hit reply. I read every answer, and the most common ones become the next guides."),
   ("p", "Vish")]},
 {"subject": "The follow-up that fixes weak AI answers",
  "preview": "One line you can paste after any answer that misses.",
  "blocks": [
   ("p", "Hi,"),
   ("p", "Most people judge AI by its first answer. The first answer is a draft."),
   ("p", "Here's the line I paste most often when an answer is vague:"),
   ("quote", "That's too generic. Ask me 3 questions about my situation first, then rewrite it."),
   ("p", "It works because the AI stops guessing and starts asking. I collected 12 of these, one for each way answers go wrong, with a before and after for every one."),
   ("btn", ("Read the 12 follow-ups", "#read-one-line-follow-ups")),
   ("p", "Try it on something real today: an email you're avoiding, a plan for the week, a post you keep rewriting."),
   ("p", "Vish")]},
 {"subject": "Build one real thing this weekend",
  "preview": "A live website in about an hour, plus the checklist I run before sharing anything.",
  "blocks": [
   ("p", "Hi,"),
   ("p", "Reading about AI only gets you so far. Building one small thing teaches more than ten guides."),
   ("p", "This weekend's project: your own website, live on the internet, no code. About an hour, step by step."),
   ("btn", ("Start the website project", "#read-build-website-no-code")),
   ("p", "Before you share it, run the launch checklist: 19 security checks and 17 legal ones in plain words, with a prompt that makes your AI do the checking."),
   ("link", ("Open the launch checklist", "#launch")),
   ("p", "When it's live, reply with the link. I'd genuinely like to see it."),
   ("p", "From next Monday you'll get Build Notes every week. If it ever stops being useful, the unsubscribe link is at the bottom of every email."),
   ("p", "Vish")]},
]

INK, MUTED, ACC, BG, CARD, LINE = "#16151F", "#5B5970", "#4A44C4", "#F5F4FF", "#FFFFFF", "#E4E2F5"
FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif"
P = f"margin:0 0 16px;font-family:{FONT};font-size:16px;line-height:1.6;color:{INK}"

def url(h): return SITE + h

def render(e):
    out = []
    for kind, v in e["blocks"]:
        if kind == "p": out.append(f'<p style="{P}">{html.escape(v)}</p>')
        elif kind == "ol": out.append(f'<ol style="margin:0 0 16px;padding-left:22px;font-family:{FONT};font-size:16px;line-height:1.6;color:{INK}">' + "".join(f'<li style="margin:0 0 8px"><a href="{url(h)}" style="color:{ACC};font-weight:600">{html.escape(t)}</a></li>' for t, h in v) + "</ol>")
        elif kind == "quote": out.append(f'<p style="margin:0 0 16px;padding:14px 18px;border-left:3px solid {ACC};background:{BG};border-radius:8px;font-family:{FONT};font-size:16px;line-height:1.6;color:{INK}">&ldquo;{html.escape(v)}&rdquo;</p>')
        elif kind == "btn": t, h = v; out.append(f'<table role="presentation" cellpadding="0" cellspacing="0" style="margin:4px 0 20px"><tr><td style="border-radius:999px;background:{ACC}"><a href="{url(h)}" style="display:inline-block;padding:12px 22px;font-family:{FONT};font-size:15px;font-weight:600;color:#FFFFFF;text-decoration:none;border-radius:999px">{html.escape(t)} &rarr;</a></td></tr></table>')
        elif kind == "link": t, h = v; out.append(f'<p style="{P}"><a href="{url(h)}" style="color:{ACC};font-weight:600">{html.escape(t)} &rarr;</a></p>')
    body = "\n".join(out)
    return f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{html.escape(e["subject"])}</title></head>
<body style="margin:0;padding:0;background:{BG}">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">{html.escape(e["preview"])}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:{BG}"><tr><td align="center" style="padding:28px 14px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:580px">
<tr><td style="padding:0 6px 14px;font-family:{FONT};font-size:13px;font-weight:600;letter-spacing:.08em;color:{ACC}">BUILD NOTES</td></tr>
<tr><td style="background:{CARD};border:1px solid {LINE};border-radius:16px;padding:30px 28px">
{body}
</td></tr>
<tr><td style="padding:18px 6px;font-family:{FONT};font-size:12px;line-height:1.6;color:{MUTED}">
You're getting this because you signed up for Build Notes at <a href="{SITE}" style="color:{MUTED}">buildwithvish.netlify.app</a> and confirmed your email.<br>
<a href="{{$unsubscribe}}" style="color:{MUTED};font-weight:600">Unsubscribe</a> &middot; <a href="{SITE}#legal" style="color:{MUTED}">Privacy</a><br>
{html.escape(ADDRESS)}
</td></tr></table></td></tr></table></body></html>'''

def plain(e):
    lines = []
    for kind, v in e["blocks"]:
        if kind in ("p",): lines.append(v)
        elif kind == "quote": lines.append(f'"{v}"')
        elif kind == "ol": lines.append("\n".join(f"{i+1}. {t}: {url(h)}" for i, (t, h) in enumerate(v)))
        elif kind in ("btn", "link"): t, h = v; lines.append(f"{t}: {url(h)}")
    lines.append(f"---\nUnsubscribe: {{$unsubscribe}}\n{ADDRESS}")
    return "\n\n".join(lines)

data = []
for i, e in enumerate(EMAILS, 1):
    h, t = render(e), plain(e)
    (D / "html" / f"email-{i}.html").write_text(h); (D / "html" / f"email-{i}.txt").write_text(t)
    data.append({"subject": e["subject"], "html": h, "plain": t})
(D / "html" / "emails.json").write_text(json.dumps(data))
print([len(x["html"]) for x in data])
