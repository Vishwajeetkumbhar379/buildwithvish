# Build with Vish 2.0: context pack for the design interview

Read this file completely before saying anything to Vish. It records how version 1 was built, what exists today, and which of his preferences still apply. The design brief itself is the PDF Vish attaches in the chat ("Build_with_Vish_2_0_COMPLETE_VISUAL_STORYBOARD_FOR_CLAUDE.pdf", 62 pages).

**Phase rule (from Vish):**
- Interview and brainstorm first, page by page, until every page, animation, font and colour is locked.
- No code, no deploy, no live change until he explicitly approves the complete design.

*Prepared 28 Oct 2026 from the repo, the live config, Vish's saved preferences and his LinkedIn content system.*

---

## 1. Who Vish is (only these facts are safe to use publicly)

- **Name:** Vishwajeet Kumbhar, "Vish".
- **Background:** years in influencer and creator marketing and brand management, on 850+ creator deals, leading teams.
  - The **experience figure conflicts**: his CV and LinkedIn system say **4+ years**, but the PDF says **5+ years**. Check this against his master CV before publishing either number.
  - The PDF also mentions 20+ brand accounts and a 12-person team. Treat these as unverified until checked against the CV.
- **Now:** in Germany doing an MBA (International Business Consulting), working as a student assistant on marketing content, and building practical AI tools as a non-engineer.
- **Goal:** remote work while travelling. He is building in public on Instagram and LinkedIn.
- **Links:**
  - Instagram (verified, already on /links): https://www.instagram.com/buildwith.vish/
  - LinkedIn: linkedin.com/in/vishwajeetkumbhar379
  - GitHub: github.com/Vishwajeetkumbhar379
  - Portfolio: https://vishkumbhar.netlify.app
- **Privacy:** never publish his home address, phone number or residence details. The Impressum address question is still open; he wants a non-home address.
- **He works only from an iPad Air. He has no laptop.** Every step you ask him to do must work in Safari or the Claude app on an iPad. Prototypes must be viewable on an iPad.

## 2. How he likes to work with Claude

| Preference | What it means here |
|---|---|
| Natural, direct, brutally honest; no corporate jargon | Say when an idea from the PDF is weak, and why. |
| Concise; lead with the answer; tables over essays | Interview rounds should be scannable: options in tables, then a few clear questions. |
| Wants depth, not token-saving shortcuts | Real visual comparisons, not abstract text. Don't reopen settled decisions. |
| Ask questions with tappable choices where possible | AskUserQuestion worked well in v1 (2 to 4 options, recommendation first). |
| Flag when a lighter model would do | Mention it for mechanical tasks. |
| Got frustrated in v1 by "cluttered" and "levelled down" results | His words: "Looks cluttered, wth", and "previous was better, level up not down". Clean beats busy, every time. |

## 3. How v1 was built (what worked)

1. **Inspiration first.** His favourites:
   - why.zero.university (main inspiration)
   - unseen.co (sound design)
   - edolus.com, digitalpanda.com, activetheory.net, 3dv2.triptych.co, behfar.dev, butter.video

   The v1 rule that came out of it: clean, highly interactive, one 3D hero piece per chapter, violet accent only for key moments.
2. **Short interview rounds with tappable choices**, then a build, then QA.
3. **Serious QA before every release:**
   - Playwright across 9 viewports, no-WebGL and reduced-motion runs, keyboard.
   - axe WCAG A/AA (zero violations).
   - A strict CSP with no third-party requests.
4. **Long-form content system** (`tools/longform/`):
   - `STYLE.md` is the writing contract: original words only, British spelling, no em dashes, no invented stats, verified facts dated "October 2026".
   - `check.js` lints every page.
   - Guides use callouts, numbered prompt boxes, cheat sheets, tickable action plans and FAQs.
5. **Security pass** against his 5-check PDF:
   - no secrets in code, and no personal data in logs;
   - full security headers;
   - escaping before anything goes into innerHTML.

## 4. What exists today (must survive 2.0 unless Vish says otherwise)

**Live:** https://buildwithvvish.com (note the double "v"). It's served from Cloudflare Workers since 15 Oct 2026, and buildwithvish.netlify.app is the old host.

**Repo:** github.com/Vishwajeetkumbhar379/buildwithvish. Every push to `main` deploys automatically. The README still describes Netlify, which is out of date; `wrangler.toml` is the truth.

**Content inventory (counts from `src/` on 28 Oct 2026):**

| Content | Count | Where |
|---|---|---|
| Guides, prompts, workflows, creator, career and "built" case studies | 82 entries (guide 28, prompts 8, workflow 14, creator 18, career 3, built 11) | `src/content-*.js`, full-length bodies in `src/long/guides/` (48 files) |
| News and articles (the AI × marketing series) | 31 | `src/content-posts.js` |
| Step-by-step projects (tickable steps, progress ring) | 8 | `PROJECTS` in `content-more.js` |
| Carousels (swipeable, his locked style) | 8 | `CAROUSELS` |
| Build Notes issues | 6 | `ISSUES`, plus `src/long/issues/` |
| Interactive tools | AI tool finder quiz, prompt builder ("fill two blanks"), campaign maths calculator, launch checklist (19 security + 17 legal checks), XP system | `app.js`, `content-launch.js` |
| Resource library | Value ladder, free EDIT guide, product pages (checkout OFF) | `src/resources/` |
| Legal and other pages | Privacy, data deletion, terms of use, `/links` (link-in-bio) | `src/legal/` |

**URLs that must keep working (or get tested redirects):**
- `#read-<slug>`, `#issue-<n>`, `#c-<slug>`, `#guides-<type>`
- `#start`, `#guides`, `#projects`, `#carousels`, `#newsletter`, `#tools`, `#launch`, `#about`, `#portfolio`, `#partner`, `#legal`
- `/links`, `/privacy.html`, `/api/*`, `/go/*`
- The welcome emails link to `#read-claude-from-zero`, `#read-brief-ai-like-an-agency`, `#read-build-website-no-code`, `#read-one-line-follow-ups`, `#start` and `#launch`.

**Running back-end parts (don't break them):**
- **Newsletter:** form, then `/api` to MailerLite with double opt-in, into the group "Build Notes", which triggers a 3-email welcome automation. The automation is OFF until a legal footer address exists.
- **Partner form.**
- **Instagram comment-to-DM** (D1 storage, daily cron).
- **Secrets** live only in Cloudflare.

**Current look (v1):**
- Night mode only. Black canvas, violet accent (#A99CFF on dark, brand #7F77DD), Geist and Geist Mono.
- Three.js "journey" home with chapters, bloom, cursor ripple and drag-to-spin.
- Liquid WebGL portrait of Vish on the portfolio page.
- Generated ambient sound, off until tapped.
- Reading pages are calm and editorial.

## 5. His LinkedIn content engine (the brand outside the website)

Source: the `vish-linkedin-content` skill plus saved preferences.

- **Voice:** confident, sharp, direct, no fluff. AI is a tool, not hype. The India to Germany story gives relatability. The MBA is credibility, not elitism.
  - Never say "synergy", "leverage", "circle back", "In today's fast-paced world" or anything press-release-like.
- **CTAs:** "Save this before your next campaign brief.", "Which of these are you doing wrong?", "Follow for one AI × marketing post every week."
- **Carousel style (locked):**
  - 98% Claude-UI look, tinted cards (purple #F5F4FF, teal #F0FBF6, coral #FEF6F3), #7F77DD accents, 0.5px borders.
  - Badge system, pill counter, handle top-left, no chat bar, sparing emojis.
  - Format: 1080×1350.
- **Motion posts:** dark canvas #0A0A0F, surface #111118, purple #7F77DD, teal #1D9E75, amber #EF9F27, headline weight 600 to 700 with tight tracking.
- **LinkedIn design system:** Space Grotesk + IBM Plex Mono, canvas #07070E.
- **Banners:** Canva or Adobe Express only.
- **The LinkedIn profile photo** (cream blazer, burgundy shirt) is final. It matches the mascot's outfit.
- **Wants LinkedIn, Instagram, the portfolio, GitHub and Build with Vish kept consistent.** The 2.0 brand system should work across all of them.

## 6. Contradictions to resolve with Vish early (don't guess)

| # | Topic | Conflict | Ask |
|---|---|---|---|
| 1 | Light mode | The PDF locks Editorial Ivory + Midnight Lilac with System/Light/Dark. On 7 Oct he removed day mode from v1: "looks extremely shitty… not readable". | Show a genuinely well-made light theme next to dark-only, and let him decide. |
| 2 | Fonts | v1 uses Geist. The PDF candidate is Manrope + Instrument Serif. LinkedIn uses Space Grotesk + IBM Plex Mono. | One type system across site and socials? Show 2 to 3 pairings on real content. |
| 3 | Colours | v1 #7F77DD / #A99CFF on black. LinkedIn #7F77DD on #0A0A0F. The PDF accent is #6C4FA3 / #BFA7FF on #111018. | Pick one violet family for everything. |
| 4 | Scope | v1 was deliberately "not another portfolio", a learning hub. 2.0 merges portfolio, services, journey and Learn. | Confirm. What happens to vishkumbhar.netlify.app (redirect, keep, or merge)? |
| 5 | Existing 3D home and sound | v1's Three.js journey and generated ambient engine vs 2.0's mascot portal and a licensed ambient track. | What carries over, what retires. |
| 6 | Experience numbers | 4+ years vs 5+ years, and 20+ accounts and a 12-person team unverified. | Verify against the master CV. |
| 7 | Naming brands | v1 content rules avoid naming employers or brands. The PDF wants agency proof with employer context. | What may be named publicly, with which permissions? |
| 8 | Paid services, prices, checkout | The PDF has draft prices and a quote builder. A product library with checkout off already exists. | Keep every paid or commercial feature off and in "demo" mode until Vish confirms in writing that he may offer paid work. Don't discuss his permit details in public files. |
| 9 | Mascot assets | The 31 transparent PNGs, Vish_Mascot_Reference.pdf and Vish_Mascot_Claude_Guide.md are NOT in the repo. | Ask him to upload them in the chat before any mascot design. Never use a generic stand-in. |

## 7. Ground rules that carry over from v1

- Original content only. No copying other sites, code, avatars, music or fonts without a licence. Inspiration is not permission.
- No fake stats, testimonials, client results or subscriber counts. Agency work is employment, not Build with Vish clients.
- Sound is off until the visitor chooses it. No autoplay, ever.
- Clean and readable first. Reading pages get no decorative 3D.
- Every guide keeps working on phone and iPad, with copy buttons, a table of contents and readable line length.
- Secrets only in Cloudflare, never in code. The repo is public, so private business details (draft prices, legal status) stay out of committed files.
- Nothing goes live without his explicit "approved". Prototypes are shared as private Claude artifacts or a staging URL first.
