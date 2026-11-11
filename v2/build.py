"""Build Build with Vish 2.0 into ../site/ (what Cloudflare serves).

  python3 v2/build.py

1. Runs the v1 build (src/build.py) for the parts 2.0 keeps: the long guide bodies in /g, the legal pages,
   /links.html and /resources.
2. Lays the 2.0 site over it: index.html, /js, /img, /audio, self-hosted fonts and libraries.
3. Writes /js/content.js (every guide, project, prompt pack, tool page and news post, from src/) for the reader.
4. Writes _headers: a strict Content-Security-Policy (scripts only from this site, no inline scripts, no third-party
   requests at all), HSTS, no framing, no referrer leaks, locked-down browser features.
"""
import base64, hashlib, json, math, pathlib, re, shutil, subprocess, sys

V2 = pathlib.Path(__file__).resolve().parent
ROOT = V2.parent
SRC = ROOT / "src"
OUT = ROOT / "site"

subprocess.run([sys.executable, str(SRC / "build.py")], check=True, cwd=ROOT)

h10 = lambda b: hashlib.sha256(b).hexdigest()[:10]


def fix(s):  # old-domain links become in-site links
    s = re.sub(r"https?://buildwithvish\.netlify\.app/#read-", "#read-", s)
    return re.sub(r"https?://buildwithvish\.netlify\.app/?", "/", s)


# ---------- content for the reader ----------
words = lambda h: len([w for w in re.sub(r"<[^>]+>", " ", h).split() if re.search(r"[A-Za-z0-9]", w)])
js = "\n".join(fix((SRC / f).read_text()) for f in ["content-guides.js", "content-more.js", "content-extra.js", "content-posts.js", "content-launch.js"])
LONG = {}
gdir = OUT / "g"
if gdir.exists():
    shutil.rmtree(gdir)
gdir.mkdir()
for f in sorted((SRC / "long" / "guides").glob("*.html")):
    meta = json.loads(f.with_suffix(".meta.json").read_text()); body = fix(f.read_text())
    LONG[f.stem] = {"title": meta["title"], "excerpt": meta["excerpt"], "mins": max(3, math.ceil(words(body) / 220)), "body": None, "ext": True}
    (gdir / (f.stem + ".html")).write_text(body)
CV = h10(json.dumps(LONG, sort_keys=True).encode() + js.encode())
content = ("/* Build with Vish: every guide, project, prompt pack, tool page and news post, for the reader. */\n(function () {\n\"use strict\";\n" + js
           + "\nconst LONG = " + json.dumps(LONG, ensure_ascii=False).replace("</", "<\\/") + ";\n"
           "[GUIDES, PROJECTS].forEach((arr) => arr.forEach((x) => { const L = LONG[x.slug]; if (L) Object.assign(x, L); }));\n"
           "window.BWV_CONTENT = { GUIDES, PROJECTS, LAUNCH: typeof LAUNCH !== \"undefined\" ? LAUNCH : null, V: " + json.dumps(CV) + " };\n})();\n")

# ---------- assets ----------
for d in ["js", "img", "audio"]:
    if (OUT / d).exists():
        shutil.rmtree(OUT / d)
shutil.copytree(V2 / "img", OUT / "img")
shutil.copytree(V2 / "audio", OUT / "audio")
(OUT / "js").mkdir()
for f in (V2 / "js").glob("*.js"):
    shutil.copy(f, OUT / "js" / f.name)
(OUT / "js" / "content.js").write_text(content)
for f in (V2 / "fonts").iterdir():
    shutil.copy(f, OUT / "fonts" / f.name)
for f in (V2 / "vendor").iterdir():
    shutil.copy(f, OUT / "vendor" / f.name)
if (V2 / "og.png").exists():
    shutil.copy(V2 / "og.png", OUT / "og.png")

# ---------- the page ----------
page = (V2 / "index.html").read_text()
page = re.sub(r"^<title>.*?</title>\s*", "", page)
page = re.sub(r'<meta name="claude:[^>]*>\s*', "", page)
page = re.sub(r'<link rel="(?:preconnect|stylesheet)" href="https://fonts\.(?:googleapis|gstatic)\.com[^>]*>\s*', "", page)
styles = re.findall(r"<style>[\s\S]*?</style>", page)
for st in styles:
    page = page.replace(st, "", 1)
inline = re.findall(r"<script>([\s\S]*?)</script>", page)
if len(inline) != 1:
    sys.exit("expected exactly one inline script, found %d" % len(inline))
(OUT / "js" / "main.js").write_text(inline[0])
page = page.replace("<script>" + inline[0] + "</script>", '<script src="js/main.js"></script>')
VENDOR = {"https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js": "vendor/three-r128.min.js",
          "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js": "vendor/gsap-3.13.0.min.js",
          "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/SplitText.min.js": "vendor/SplitText-3.13.0.min.js"}
for a, b in VENDOR.items():
    if page.count('src="%s"' % a) != 1:
        sys.exit("vendor tag missing: " + a)
    page = page.replace('src="%s"' % a, 'src="%s"' % b)


def ver(m):
    name = m.group(1); f = OUT / "js" / name
    return 'src="js/%s?v=%s"' % (name, h10(f.read_bytes()))


page = re.sub(r'src="(?:js/)?([a-z0-9-]+\.js)"', ver, page)
if re.search(r'(?:src|href)="https?://(?!www\.linkedin|github|www\.instagram|vishkumbhar)', page):
    sys.exit("third-party asset left: " + str(re.findall(r'(?:src|href)="https?://[^"]+"', page)[:5]))
FONTS = [("Newsreader", "newsreader-latin-standard-normal.woff2", "normal", "300 700", ""),
         ("Newsreader", "newsreader-latin-standard-italic.woff2", "italic", "300 700", ""),
         ("Wix Madefor Display", "wix-madefor-display-latin-wght-normal.woff2", "normal", "400 800", ""),
         ("Wix Madefor Text", "wix-madefor-text-latin-wght-normal.woff2", "normal", "400 800", ""),
         ("Wix Madefor Text", "wix-madefor-text-latin-wght-italic.woff2", "italic", "400 800", ""),
         ("Martian Mono", "martian-mono-latin-standard-normal.woff2", "normal", "100 800", "font-stretch:75% 112.5%;"),
         ("Mrs Saint Delafield", "mrs-saint-delafield-latin-400-normal.woff2", "normal", "400", "")]
ff = "".join("@font-face{font-family:'%s';src:url(/fonts/%s) format('woff2');font-style:%s;font-weight:%s;%sfont-display:swap}" % f for f in FONTS)
# ---------- tools that live on the site ----------
# Photo Sorter (tools/photo-sorter) is served at /sorter/ with the site fonts added to its stylesheet.
sorter = OUT / "sorter"
if sorter.exists():
    shutil.rmtree(sorter)
sorter.mkdir()
for n in ["index.html", "sorter.js"]:
    shutil.copy(ROOT / "tools" / "photo-sorter" / n, sorter / n)
(sorter / "sorter.css").write_text(ff + "\n" + (ROOT / "tools" / "photo-sorter" / "sorter.css").read_text())
TITLE = "Build with Vish"
DESC = "Vish Kumbhar: five years of creator campaigns (850+ creators, 20+ brands), now based in Germany. Services, a career journey, 11 open-source AI tools and free step-by-step AI guides."
ICON = ("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3E%3Crect width='30' height='30' rx='9' fill='%234A3A73'/%3E"
        "%3Crect x='7' y='7' width='16' height='16' rx='3' fill='none' stroke='%23F3EEE4' stroke-width='2.2' transform='rotate(45 15 15)'/%3E%3Ccircle cx='15' cy='15' r='2.6' fill='%23E2C58E'/%3E%3C/svg%3E")
head = ('<!doctype html>\n<html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n'
        f'<title>{TITLE}</title><meta name="description" content="{DESC}"><meta name="author" content="Vishwajeet Kumbhar">\n'
        '<link rel="canonical" href="https://buildwithvvish.com/"><base href="/">\n'
        f'<meta property="og:title" content="{TITLE}"><meta property="og:description" content="{DESC}"><meta property="og:type" content="website"><meta property="og:url" content="https://buildwithvvish.com/"><meta property="og:image" content="https://buildwithvvish.com/og.png">\n'
        f'<meta name="twitter:card" content="summary_large_image"><meta name="theme-color" content="#0B0E13"><link rel="icon" href="{ICON}">\n'
        '<link rel="preload" href="/fonts/wix-madefor-display-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>\n'
        '<link rel="preload" href="/fonts/wix-madefor-text-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>\n'
        f'<style>body{{margin:0}}[hidden]{{display:none!important}}{ff}</style>\n' + "\n".join(styles) + "\n</head><body>\n")
# hidden definitions so Netlify Forms knows the fields (the forms on the page post to these by name)
NFORMS = ('<form name="newsletter" data-netlify="true" netlify-honeypot="bot-field" hidden><input name="email"><input name="page"><input name="bot-field"></form>\n'
          '<form name="partner" data-netlify="true" netlify-honeypot="bot-field" hidden><input name="name"><input name="email"><input name="company"><input name="topic"><textarea name="message"></textarea><input name="page"><input name="bot-field"></form>\n')
noscript = '<noscript><p style="padding:24px;font:16px system-ui">Build with Vish needs JavaScript for its pages and guides. Email: vishwajeetkumbhar379@gmail.com</p></noscript>\n'
(OUT / "index.html").write_text(head + noscript + NFORMS + page.strip() + "\n</body></html>\n")

# ---------- security headers ----------
inline_left = [p.name for p in OUT.rglob("*.html") if re.search(r"<script(?![^>]*\ssrc=)[^>]*>", p.read_text(errors="ignore"))]
if inline_left:
    sys.exit("inline scripts left in: " + ", ".join(inline_left))
CSP = ("default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self'; "
       "media-src 'self'; worker-src 'self'; manifest-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests")
(OUT / "_headers").write_text(
    "/*\n"
    f"  Content-Security-Policy: {CSP}\n"
    "  X-Content-Type-Options: nosniff\n"
    "  Referrer-Policy: strict-origin-when-cross-origin\n"
    "  X-Frame-Options: DENY\n"
    "  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), serial=(), bluetooth=(), interest-cohort=(), browsing-topics=()\n"
    "  Strict-Transport-Security: max-age=31536000; includeSubDomains\n"
    "  Cross-Origin-Opener-Policy: same-origin\n"
    "/vendor/*\n  Cache-Control: public, max-age=31536000, immutable\n"
    "/fonts/*\n  Cache-Control: public, max-age=31536000, immutable\n"
    "/js/*\n  Cache-Control: public, max-age=31536000, immutable\n"
    "/img/*\n  Cache-Control: public, max-age=604800\n"
    "/audio/*\n  Cache-Control: public, max-age=604800\n"
    "/g/*\n  Cache-Control: public, max-age=3600\n")
print("built site/: 2.0 page, %d long guides, content %s" % (len(LONG), CV))
