"""Build Build with Vish.
  python3 src/build.py           -> ../site/        (what Netlify publishes: self-hosted, strict security headers, no third-party requests)
                                    src/preview.html (single-file preview: CDN libraries, Google Fonts, photo inlined)
  python3 src/build.py --local   -> src/test/       (same as site/, for local testing; not committed)
"""
import pathlib, sys, base64, hashlib, shutil
d = pathlib.Path(__file__).parent
LOCAL = "--local" in sys.argv
css = (d / "style.css").read_text()
js = "\n".join((d / f).read_text() for f in ["content-guides.js", "content-more.js", "content-extra.js", "content-portfolio.js", "content-launch.js"])
scene = "\n".join((d / f).read_text() for f in ["scene.js", "portfolio-scene.js", "sound.js"])
app = (d / "app.js").read_text()
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
RESET = ':root{color-scheme:light;box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0;padding:0}img{max-width:100%}[hidden]:not([hidden=until-found i]){display:none!important}'
ICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='16' fill='%237F77DD'/%3E%3Crect x='20' y='20' width='24' height='24' rx='4' fill='none' stroke='white' stroke-width='5' transform='rotate(45 32 32)'/%3E%3Ccircle cx='32' cy='32' r='4' fill='white'/%3E%3C/svg%3E"


def scripts(selfhost, photo):
    libs = "\n".join(f'<script src="{("vendor/" + v) if selfhost else c}"></script>' for v, c in zip(VENDOR, CDN))
    inline = ["window.BWV_SELFHOST=" + ("true" if selfhost else "false") + ";", js, scene, app.replace("__VISH_PHOTO__", photo)]
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
    (out / "_redirects").write_text("/*  /index.html  200\n")
    (out / "robots.txt").write_text("User-agent: *\nAllow: /\n")
print("ok", len(site))
