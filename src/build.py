"""Build Build with Vish.
  python3 src/build.py           -> ../site/        (what Cloudflare Pages publishes: self-hosted, strict security headers, no third-party requests)
                                    src/preview.html (single-file preview: CDN libraries, Google Fonts, photo inlined)
  python3 src/build.py --local   -> src/test/       (same as site/, for local testing; not committed)
"""
import pathlib, sys, base64, hashlib, shutil, json, re, math
d = pathlib.Path(__file__).parent
LOCAL = "--local" in sys.argv
css = (d / "style.css").read_text()
js = "\n".join((d / f).read_text() for f in ["content-guides.js", "content-more.js", "content-extra.js", "content-posts.js", "content-portfolio.js", "content-launch.js"])
scene = "\n".join((d / f).read_text() for f in ["scene.js", "portfolio-scene.js", "sound.js"])
app = (d / "app.js").read_text()

# ---------- long-form content (src/long): full-length guides, projects and issues ----------
LONG_DIR = d / "long"
def words(h): return len([w for w in re.sub(r"<[^>]+>", " ", h).split() if re.search(r"[A-Za-z0-9]", w)])
def load_long():
    guides, projects, issues = {}, {}, {}
    for f in sorted((LONG_DIR / "guides").glob("*.html")):
        meta = json.loads(f.with_suffix(".meta.json").read_text()); body = f.read_text()
        guides[f.stem] = {"title": meta["title"], "excerpt": meta["excerpt"], "mins": max(3, math.ceil(words(body) / 220)), "body": body}
    for f in sorted((LONG_DIR / "projects").glob("*.json")):
        projects[f.stem] = json.loads(f.read_text())
    for f in sorted((LONG_DIR / "issues").glob("*.html")):
        meta = json.loads(f.with_suffix(".meta.json").read_text())
        issues[f.stem] = {"title": meta["title"], "teaser": meta["teaser"], "items": meta["items"], "body": f.read_text()}
    return guides, projects, issues
LG, LP, LI = load_long() if LONG_DIR.exists() else ({}, {}, {})
BV = hashlib.sha256(json.dumps([LG, LP, LI], sort_keys=True).encode()).hexdigest()[:10]
def long_js(external):
    data = {}
    for k, v in LG.items(): data[k] = {**v, "body": None, "ext": True} if external else dict(v)
    data.update(LP); data.update(LI)
    j = json.dumps(data, ensure_ascii=False).replace("</", "<\\/").replace("\u2028", "\\u2028").replace("\u2029", "\\u2029")
    return ("window.BWV_V=" + json.dumps(BV) + ";\nconst LONG = " + j + ";\n"
            "[GUIDES, PROJECTS, ISSUES].forEach((arr) => arr.forEach((x) => { const L = LONG[x.slug]; if (L) Object.assign(x, L); }));\n")
PHOTO = d / "vish.jpg"
TITLE = "Build with Vish"
DESC = "Free step-by-step guides, prompts, projects and carousels for building things with AI, no code needed. Plus Build Notes, a weekly newsletter by Vish Kumbhar."
GFONTS = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800&family=Geist+Mono:wght@400;500&display=swap">'
FONTFILES = [("Geist", f"geist-sans-latin-{w}-normal.woff2", w) for w in (300, 400, 500, 600, 700, 800)] + [("Geist Mono", f"geist-mono-latin-{w}-normal.woff2", w) for w in (400, 500)]
SELFFONTS = "".join(f"@font-face{{font-family:'{n}';src:url(fonts/{f}) format('woff2');font-weight:{w};font-display:swap}}" for n, f, w in FONTFILES)
VENDOR = ["gsap.min.js", "ScrollTrigger.min.js", "lenis.min.js", "three.min.js", "CopyShader.js", "LuminosityHighPassShader.js", "EffectComposer.js", "ShaderPass.js", "RenderPass.js", "UnrealBloomPass.js"]
J = "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/"
CDN = ["https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js", "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js", "https://unpkg.com/lenis@1.1.13/dist/lenis.min.js", "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js",
       J + "shaders/CopyShader.js", J + "shaders/LuminosityHighPassShader.js", J + "postprocessing/EffectComposer.js", J + "postprocessing/ShaderPass.js", J + "postprocessing/RenderPass.js", J + "postprocessing/UnrealBloomPass.js"]
FORMS = '''<form name="newsletter" data-netlify="true" netlify-honeypot="bot-field" hidden><input name="email"><input name="page"><input name="bot-field"></form>
<form name="partner" data-netlify="true" netlify-honeypot="bot-field" hidden><input name="name"><input name="email"><input name="company"><input name="topic"><textarea name="message"></textarea><input name="page"><input name="bot-field"></form>
<noscript><p style="padding:24px;color:#ECEBF5;background:#05050A">Build with Vish needs JavaScript for its guides and 3D scenes. Email: vishwajeetkumbhar379@gmail.com</p></noscript>'''
RESET = ':root{color-scheme:dark;box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0;padding:0}img{max-width:100%}[hidden]:not([hidden=until-found i]){display:none!important}'
ICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='16' fill='%237F77DD'/%3E%3Crect x='20' y='20' width='24' height='24' rx='4' fill='none' stroke='white' stroke-width='5' transform='rotate(45 32 32)'/%3E%3Ccircle cx='32' cy='32' r='4' fill='white'/%3E%3C/svg%3E"


def scripts(selfhost, photo):
    libs = "\n".join(f'<script src="{("vendor/" + v) if selfhost else c}"></script>' for v, c in zip(VENDOR, CDN))
    inline = ["window.BWV_SELFHOST=" + ("true" if selfhost else "false") + ";", js + "\n" + long_js(selfhost), scene, app.replace("__VISH_PHOTO__", photo)]
    return libs, inline


# ---------- private preview (artifact) ----------
if not LOCAL:
    data_uri = "data:image/jpeg;base64," + base64.b64encode(PHOTO.read_bytes()).decode()
    libs, inline = scripts(False, data_uri)
    body = FORMS + "\n" + libs + "\n" + "\n".join(f"<script>\n{s}\n</script>" for s in inline)
    (d / "preview.html").write_text(f"<title>{TITLE}</title>\n{GFONTS}\n<style>\n{css}\n</style>\n{body}\n")

# ---------- live site / local test: self-hosted, no third-party requests ----------
out = (d / "test") if LOCAL else (d.parent / "site"); out.mkdir(exist_ok=True)
(out / "vendor").mkdir(exist_ok=True); (out / "fonts").mkdir(exist_ok=True)
for v in VENDOR: shutil.copy(d / "vendor" / v, out / "vendor" / v)
for _, f, _w in FONTFILES: shutil.copy(d / "fonts" / f, out / "fonts" / f)
shutil.copy(PHOTO, out / "vish.jpg"); shutil.copy(d / "og.png", out / "og.png")
libs, inline = scripts(True, "vish.jpg")
body = FORMS + "\n" + libs + "\n" + "\n".join(f"<script>\n{s}\n</script>" for s in inline)
hashes = " ".join("'sha256-" + base64.b64encode(hashlib.sha256(("\n" + s + "\n").encode()).digest()).decode() + "'" for s in inline)
site = f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>{TITLE}</title><meta name="description" content="{DESC}"><meta name="author" content="Vishwajeet Kumbhar">
<meta property="og:title" content="{TITLE}"><meta property="og:description" content="{DESC}"><meta property="og:type" content="website"><meta property="og:image" content="/og.png">
<meta name="twitter:card" content="summary_large_image"><meta name="theme-color" content="#030308"><link rel="icon" href="{ICON}">
<link rel="preload" href="fonts/geist-sans-latin-600-normal.woff2" as="font" type="font/woff2" crossorigin>
<style>{RESET}{SELFFONTS}</style><style>
{css}
</style></head><body>
{body}
</body></html>
'''
(out / "index.html").write_text(site)
gdir = out / "g"
if gdir.exists(): shutil.rmtree(gdir)
gdir.mkdir()
for k, v in LG.items(): (gdir / (k + ".html")).write_text(v["body"])
for f in (d / "legal").glob("*.html"): shutil.copy(f, out / f.name)  # privacy + data deletion (Meta app review)

# ---------- resource library (src/resources): /resources + one page per guide or product ----------
# Static pages with no inline script (the CSP only allows the app's hashes): style in r.css, the sign-up form in signup.js.
# Paid items stay "Coming soon" until catalog.json has status "live" and a "checkout" Payment Link (docs/monetisation.md).
RD, rout = d / "resources", out / "resources"
if RD.exists():
    import html as _h
    if rout.exists(): shutil.rmtree(rout)
    rout.mkdir()
    for f in ("r.css", "signup.js"): shutil.copy(RD / f, rout / f)
    CAT = json.loads((RD / "catalog.json").read_text())["items"]
    TIERS = [("free", "Free", "guides and checklists, no sign-up"), ("one", "€1", "one ready-to-use file"), ("bundle", "€5 to €10", "kits: templates, video, PDF")]
    e = _h.escape
    def href(it): return it.get("href") or f"/resources/{it['slug']}"
    def pills(it):
        p = f'<span class="pill {it["tier"]}">{dict((t, l) for t, l, _ in TIERS)[it["tier"]]}</span>'
        if it["status"] != "live": p += '<span class="pill soon">Coming soon</span>'
        return p + (f'<span class="kw">Comment {e(it["key"])}</span>' if it.get("key") and it["status"] == "live" else "")
    SIGNUP = ('<form class="signup" novalidate><label class="hp">Leave empty <input name="bot-field" tabindex="-1" autocomplete="off"></label>'
              '<input type="email" name="email" placeholder="you@email.com" aria-label="Email address" required><button class="btn" type="submit">{label}</button>'
              '<p class="msg" role="status" aria-live="polite"></p></form>')
    def page(title, desc, body, canon):
        return (f'<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n'
                f'<title>{e(title)}</title><meta name="description" content="{e(desc)}"><link rel="canonical" href="https://buildwithvvish.com{canon}">\n'
                f'<meta property="og:title" content="{e(title)}"><meta property="og:description" content="{e(desc)}"><meta property="og:image" content="/og.png">\n'
                f'<link rel="icon" href="{ICON}"><link rel="stylesheet" href="/resources/r.css"></head><body><main class="wrap">\n'
                '<nav class="top" aria-label="Site"><a href="/resources/">Resources</a><a href="https://www.instagram.com/buildwith.vish/">@buildwith.vish</a></nav>\n'
                f'{body}\n<footer><a href="/">buildwithvvish.com</a><a href="/links.html">Links</a><a href="/privacy.html">Privacy</a></footer>\n'
                '</main><script src="/resources/signup.js" defer></script></body></html>\n')
    cards = ""
    for t, label, note in TIERS:
        items = [it for it in CAT if it["tier"] == t]
        cards += f'<section class="tier"><h2>{label} <small>{note}</small></h2><div class="grid">'
        cards += "".join(f'<a class="card" href="{href(it)}"><div class="row">{pills(it)}</div><b>{e(it["title"])}</b><span>{e(it["summary"])}</span></a>' for it in items)
        cards += "</div></section>"
    idx = ('<p class="pill">Week by week</p><h1>Free guides, €1 files and kits from my weekly build</h1>'
           '<p class="sub">Everything I use to build a remote income with AI, as I use it. Most of it is free. The paid files are the exact templates, for people who want to skip the setup.</p>'
           f'{cards}<h2>Get the next one first</h2><p>One email a week with what I tried, what worked and the real numbers. Free.</p>{SIGNUP.format(label="Join Build Notes")}')
    (rout / "index.html").write_text(page("Resources · Build with Vish", "Free AI and social media guides, €1 templates and kits from Vish's weekly build.", idx, "/resources/"))
    for it in CAT:
        if it.get("href"): continue
        head = f'<div class="row">{pills(it)}</div><h1>{e(it["title"])}</h1><p class="sub">{e(it["summary"])}</p><p class="meta">{e(it["format"])}</p>'
        if it["tier"] == "free":
            nxt = next((x for x in CAT if x["tier"] == "one" and x.get("week") == it.get("week")), None)
            more = (f'<div class="buy"><b>Want the exact brief I use?</b><p class="note">{e(nxt["title"])}: {e(nxt["summary"])}</p>'
                    f'<a class="btn" href="/resources/{nxt["slug"]}">See what\'s inside · €{e(nxt["price"])}</a></div>') if nxt else ""
            body = head + (RD / f'{it["slug"]}.html').read_text() + more + f'<h2>Get next week\'s guide first</h2>{SIGNUP.format(label="Join Build Notes")}'
        else:
            inside = "".join(f"<li>{e(x)}</li>" for x in it.get("inside", []))
            live = it["status"] == "live" and it.get("checkout")
            btn = (f'<a class="btn" href="{e(it["checkout"])}">Buy now, payment required</a><p class="note">Secure checkout by Stripe, the merchant of record: it handles VAT and sends your receipt. Instant download. By buying you agree to immediate delivery and lose the 14-day right of withdrawal once the download starts.</p>'
                   if live else '<span class="btn" aria-disabled="true">Coming soon</span><p class="note">Not on sale yet. Leave your email below and you\'ll hear when it is.</p>')
            body = (head + f'<h2>What\'s inside</h2><ul class="inside">{inside}</ul>'
                    f'<div class="buy"><div class="price">€{e(it["price"])}<small>incl. VAT, one-off</small></div>{btn}</div>'
                    '<p class="note">No fake discounts and no countdowns: the price is the price.</p>'
                    f'<h2>Tell me when it\'s out</h2>{SIGNUP.format(label="Notify me")}')
        (rout / f'{it["slug"]}.html').write_text(page(f'{it["title"]} · Build with Vish', it["summary"], body, f'/resources/{it["slug"]}'))
if not LOCAL:
    csp = ("default-src 'self'; script-src 'self' " + hashes + "; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; "
           "connect-src 'self'; media-src 'self' blob:; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests")
    (out / "_headers").write_text(
        "/*\n"
        f"  Content-Security-Policy: {csp}\n"
        "  X-Content-Type-Options: nosniff\n"
        "  Referrer-Policy: strict-origin-when-cross-origin\n"
        "  X-Frame-Options: DENY\n"
        "  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()\n"
        "  Strict-Transport-Security: max-age=31536000; includeSubDomains\n"
        "  Cross-Origin-Opener-Policy: same-origin\n"
        "/vendor/*\n  Cache-Control: public, max-age=31536000, immutable\n"
        "/fonts/*\n  Cache-Control: public, max-age=31536000, immutable\n"
        "/vish.jpg\n  Cache-Control: public, max-age=604800\n")
    (out / "_redirects").unlink(missing_ok=True)  # Cloudflare Pages serves index.html for unknown paths by itself; a /* rule would hide real files
    (out / "robots.txt").write_text("User-agent: *\nAllow: /\n")
print("ok", len(site))
