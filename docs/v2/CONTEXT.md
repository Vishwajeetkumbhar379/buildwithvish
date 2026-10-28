# Build with Vish 2.0: context pack for the design interview

Read this whole folder before saying anything to Vish. It records how version 1 was built, what exists today, which of his preferences still apply, and where the real assets are. The design brief itself is the PDF Vish attaches in the chat ("Build_with_Vish_2_0_COMPLETE_VISUAL_STORYBOARD_FOR_CLAUDE.pdf", 62 pages).

**Phase rule (from Vish):**
- Interview and brainstorm first, page by page, until every page, animation, font and colour is locked.
- No code, no deploy, no live change until he explicitly approves the complete design.

| File in `docs/v2/` | What it is |
|---|---|
| `CONTEXT.md` | This file: who Vish is, how v1 was built, what exists, preferences, contradictions. |
| `INTERVIEW_GUIDE.md` | How to run the interview: round order, round format, the lock checklist per page. |
| `DECISIONS.md` | Decision register, seeded from the storyboard PDF. Update it after every round. |
| `assets/mascot/` | The real mascot: 31 transparent PNGs plus a contact sheet. See section 6. |
| `assets/reference/` | Vish's extra mascot sheet, laugh crops next to his real photo, and his real portrait. |
| `archive/` | Screenshots of v1 as it evolved (5 Oct, 6 Oct, now) and of his portfolio site. |

**Deliberately not in the repo** (it's public): the storyboard PDF, because it contains draft prices and private business details. Vish attaches it in the chat. Keep those details out of every committed file.

*Prepared 28 Oct 2026 from the repo, the live sites, his public CV, the mascot reference PDF, his saved preferences and his LinkedIn content system.*

---

## 1. Who Vish is

- **Name:** Vishwajeet Kumbhar, "Vish".
- **Verified career facts** (from his public CV, `Vishwajeet_Kumbhar_CV.pdf` on vishkumbhar.netlify.app, read 28 Oct 2026):
  - 5+ years in creator partnerships, social and client leadership.
  - 850+ creators, 20+ brand accounts, led a 12-person team.
  - Brands already named publicly on his CV and portfolio: HUL, Philips, L'Oréal, Tata, Lakmé.
  - His LinkedIn skill still says "4+ years". That's outdated; the CV and portfolio say 5+. Confirm once with Vish, then use 5+.
- **Career timeline** (source material for the Journey page; confirm wording before publishing):

  | Dates | Role | Place on the map |
  |---|---|---|
  | 2017 to 2020 | Bachelor of Mass Media (Journalism & Advertising), Pillai College, University of Mumbai | Mumbai |
  | 01/2021 to 07/2021 | Social Media Marketing Executive, FashionTV India | Mumbai |
  | 07/2021 to 06/2022 | Influencer Marketing Executive, White Rivers Media | Mumbai |
  | 06/2022 to 01/2024 | Senior Influencer Marketing Executive, then Manager, Influencer Marketing & Client Servicing, Pollen (Zoo Media) | Mumbai |
  | 01/2024 to 07/2025 | Senior Account Manager, Team & Client Servicing Lead, Illuminati Media | Remote: not a city pin |
  | 10/2025 to early 2027 | MBA International Business Consulting, Hochschule Offenburg. Thesis on AI-powered marketing automation and perceived work performance | Offenburg |
  | 01/2026 to now | Working Student, Marketing Analytics & Content, Hochschule Offenburg / Black Forest Business School | Offenburg |
  | Dec 2026 | Moving to Berlin (on his public CV; ask before putting it on the site) | Berlin |
  | Jan 2027 | Available full-time, remote-first | |

- **Now:** in Germany doing the MBA, working as a student assistant on marketing content, and building practical AI tools as a non-engineer.
- **Languages:** English fluent, German B1, Hindi and Marathi native. His portfolio has an EN/DE switch.
- **Goal:** remote work while travelling. He is building in public on Instagram and LinkedIn.
- **Links:**
  - Instagram (already on /links): https://www.instagram.com/buildwith.vish/ . The PDF says the handle was never confirmed, so ask him to confirm it with one tap.
  - LinkedIn: linkedin.com/in/vishwajeetkumbhar379
  - GitHub: github.com/Vishwajeetkumbhar379
  - Portfolio: https://vishkumbhar.netlify.app
- **His tool repos** (the "Work" proof): creator-fit-scorer, campaign-report-autopilot, client-health-score, creator-contract-checker, ad-performance-copilot, growth-experiment-lab, linkedin-carousel-studio, marketing-attribution-lab, creator-brief-mcp, job-search-agent, claude-skills. All under github.com/Vishwajeetkumbhar379. Attach them to the session (add_repo) when auditing Work, and read each README before calling anything production-ready.
- **Privacy:** never publish his home address, phone number or residence details. The Impressum address question is still open; he wants a non-home address.
- **He works only from an iPad Air. He has no laptop.** Every step you ask him to do must work in Safari or the Claude app on an iPad. Prototypes must be viewable on an iPad.

## 2. How he likes to work with Claude

| Preference | What it means here |
|---|---|
| Natural, direct, brutally honest; no corporate jargon | Say when an idea from the PDF is weak, and why. |
| Concise; lead with the answer; tables over essays | Interview rounds should be scannable: options in tables, then a few clear questions. |
| Wants depth in this interview, not token-saving shortcuts | His PDF says so twice. Real visual comparisons, not abstract text. Don't reopen settled decisions. |
| Ask questions with tappable choices where possible | AskUserQuestion worked well in v1 (2 to 4 options, recommendation first). |
| Not a developer | Explain technical trade-offs (3D model vs 2.5D, cost, performance) in plain words. |
| Flag when a lighter model would do | Mention it for mechanical tasks. |
| Got frustrated in v1 by "cluttered" and "levelled down" results | His words: "Looks cluttered, wth", and "previous was better, level up not down". Clean beats busy, every time. |

He may also paste his ChatGPT conversation or earlier Claude chats. Treat them as context. Where they disagree with the PDF, the PDF is the later record, and Vish decides.

## 3. How v1 was built (what worked)

1. **Inspiration first.** His favourites:
   - why.zero.university (main inspiration)
   - unseen.co (sound design)
   - edolus.com, digitalpanda.com, activetheory.net, 3dv2.triptych.co, behfar.dev, butter.video

   The v1 rule that came out of it: clean, highly interactive, one 3D hero piece per chapter, violet accent only for key moments.

   The 2.0 PDF adds new references (principles only, never copy): shubhamgl.com, cuberto.com, gabrielvaldivia.com, minhpham.design, gahanrao.com/about, avivashishta.com/blog, v.ish.al, globe.gl, and three Instagram reels about character entrances and cursor-reactive characters.
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

**Repo:** github.com/Vishwajeetkumbhar379/buildwithvish. Every push to `main` deploys automatically (the site is the prebuilt `site/` folder; `docs/` is not served). The README still describes Netlify, which is out of date; `wrangler.toml` is the truth.

**Content inventory (counted from `src/` on 28 Oct 2026):**

| Content | Count | Where |
|---|---|---|
| Guides, prompts, workflows, creator, career and "built" case studies | 82 entries (guide 28, prompts 8, workflow 14, creator 18, career 3, built 11) | `src/content-*.js`, full-length bodies in `src/long/guides/` |
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
- `/g/<slug>.html` (24 long-form guide bodies the reader fetches), `/resources/*`, `/links`, `/privacy.html`, `/terms.html`, `/data-deletion.html`, `/api/*`, `/go/*`
- The welcome emails link to `#read-claude-from-zero`, `#read-brief-ai-like-an-agency`, `#read-build-website-no-code`, `#read-one-line-follow-ups`, `#start` and `#launch`.

**Running back-end parts (don't break them):**
- **Newsletter:** form, then `/api` to MailerLite with double opt-in, into the group "Build Notes", which triggers a 3-email welcome automation. The automation is OFF until a legal footer address exists.
- **Partner form.**
- **Instagram comment-to-DM** (D1 storage, daily cron). The terms, privacy and data-deletion pages exist for the Meta and TikTok apps.
- **Secrets** live only in Cloudflare.

**What v1 looks like** (screenshots in `archive/`, taken 28 Oct 2026):

| Screenshot | What it shows |
|---|---|
| `1-oct05-first-build-*` | First build (5 Oct): space black, contour-line "planet" with an orbit ring, outlined extra-wide display type, chapter rail 01 to 06. |
| `2-oct06-day-mode-later-removed-desktop` | 6 Oct: the lilac-pink **day mode** he removed on 7 Oct ("looks extremely shitty… not readable"). Any 2.0 light theme must look nothing like this. |
| `3-current-home-*` | Now: night only. "Enter with sound / Enter without sound" gate, then a glassy contour planet, "Press and hold to begin the journey", chapter rail, a "Curious 0" XP pill, Sound off pill. Chapter 3 is a 3D city of blocks ("Follow the steps. Ship something real."). |
| `4-current-learn-hub-*` | The Learn hub: "Every free guide, prompt and project." 90 resources, search, filters (Everything, Guides, Projects, Prompts, Workflows, Creator marketing, Tools I built, Career), tinted cards with big numerals. The strongest existing piece: evolve it, don't replace it. |
| `5-portfolio-vishkumbhar-*` | His separate portfolio: paper and ink palette with teal and ochre, Syne display type, dotted globe, EN/DE switch, light and Night. "I grow brands with creators, campaigns and AI." |

Note: `/g/<slug>.html` files are HTML fragments (no head, no CSS) that the app loads into the `#read-<slug>` reader. Opened directly they look unstyled. The article design lives in the reader; any 2.0 article template must keep loading these bodies (or migrate them with tested redirects).

**Current design tokens (v1):** black canvas, violet accent (#A99CFF on dark, brand #7F77DD), Geist and Geist Mono (self-hosted), Three.js chapters with bloom, cursor ripple and drag-to-spin, a liquid WebGL portrait of Vish on the portfolio section, a generated ambient score (`sound.js`) that stays off until tapped. Reading pages are calm and editorial.

## 5. His LinkedIn content engine (the brand outside the website)

Sources: the `vish-linkedin-content` skill (with `brand-voice.md` and `motion-snippets.md`), the `linkedin-carousel` skill in the `claude-skills` repo, the `linkedin-carousel-studio` renderer, and his saved preferences.

- **Positioning line:** "I work where creators, brands, and business results meet." Niche: AI × marketing. Audience: marketers, brand managers, agency people, founders, MBA students.
- **Voice:** confident, sharp, direct, no fluff, "I" statements, real examples. AI is a tool, not hype. The India to Germany story gives relatability. The MBA is credibility, not elitism.
  - Phrases he uses: "here's what most people miss", "the honest breakdown", "no fluff", "this is what the data actually says".
  - Never: "synergy", "leverage", "circle back", "In today's fast-paced world", "As a [job title], I…", anything press-release-like.
  - Copy runs through the `application-humanizer` tells list: no "not X but Y", no dramatic one-liners, no stock AI words.
- **CTAs:** "Save this before your next campaign brief.", "Which of these are you doing wrong?", "Follow for one AI × marketing post every week.", "Tag a marketer who needs to see this."
- **Visual inspiration:** Apple clarity × Claude purple × Swishy-style motion.
- **Motion rules from the skill (useful for the site too):** motion must serve the message; animate to reveal, not to distract; every animation has a clear end state; eased, never linear; staggered entrances around 100 to 150 ms; no infinite spinning that hides content.
- **Carousel style (locked):**
  - Light Claude-UI look, tinted cards (purple #F5F4FF, teal #F0FBF6, coral #FEF6F3), #7F77DD accents, 0.5px borders.
  - Badge labels, pill counter, name and handle top-left, no chat bar, two emojis per deck at most.
  - 1080×1350. The renderer uses Inter and JetBrains Mono.
- **Motion posts:** dark canvas #0A0A0F, surface #111118, border #1E1E2A, purple #7F77DD, purple light #AFA9EC, teal #1D9E75, amber #EF9F27; headlines weight 600 to 700 with tight tracking.
- **LinkedIn design system (saved preference):** Space Grotesk + IBM Plex Mono, canvas #07070E.
- **Banners:** Canva or Adobe Express only.
- **The LinkedIn profile photo** (cream blazer, burgundy shirt) is final. It matches the mascot's outfit.
- **He wants LinkedIn, Instagram, the portfolio, GitHub and Build with Vish kept consistent.** The 2.0 brand system should work across all of them.

## 6. The mascot (now in the repo)

**The pack:** `assets/mascot/`, 31 transparent PNGs, recovered losslessly from `Vish_Mascot_Reference.pdf` (the embedded images and their alpha masks). `_contact-sheet.png` shows all 31 at a glance.

| Folder | Files | Size |
|---|---|---|
| `01-sides/` | front, front-facing-screen-right, profile-facing-screen-right, rear-facing-screen-right, back, rear-facing-screen-left, profile-facing-screen-left, front-facing-screen-left | 512×768 |
| `02-expressions/` | confident-smile, laughing, thoughtful, surprised, skeptical, focused, concerned, pleased, winking | 512×512, chest-up |
| `03-gestures/` | point-screen-left, point-screen-right, point-up, present-screen-right, explaining, thinking, arms-crossed, thumbs-up | 512×768 |
| `04-wave/` | 1-rest, 2-raise-hand, 3-wave-center, 4-wave-out, 5-wave-in, 6-return-to-rest | 512×768 |

**Identity markers** (must survive every angle, theme and size): adult Indian man, warm brown skin; wavy, shoulder-length dark-brown hair; round tortoiseshell glasses; moustache and goatee; small hoop earring; pendant necklace; ivory/cream linen blazer; burgundy (velvet-look) shirt, open collar; brown belt; indigo bootcut jeans; brown leather boots. Friendly, relaxed smile. Stylised 3D-animation look, soft studio lighting.

**What the pack is not:** these are raster renders. There is no 3D model or rig. The 8-view turnaround is the best input for modelling (or an image-to-3D pass), the 9 expressions are targets for facial blendshapes, and the 6 wave keyframes define the greeting. Use the PNGs as stand-in stills in storyboards; never use a generated "similar-looking" character.

**Extra references in `assets/reference/`:**
- `mascot-sheet-pose-and-expressions.png`: a sharper render sheet (full body arms crossed, plus laughing, pleased and surprised) on an ivory background. Close to the Editorial Ivory mood.
- `mascot-laugh-crops-vs-real-photo.png`: laughing crops next to his real photo. It shows how the mascot maps to his real face.
- `vish-real-portrait.png`: the real photo (cream linen blazer, burgundy velvet shirt, tortoiseshell glasses, two pendant necklaces, small hoops, watch; warm office background). For About and Contact. Never for the mascot itself.

**Still missing** (ask only when the work needs them): `Vish_Mascot_Claude_Guide.md`, the "3D Portfolio Website - Emergent" DOCX, the ElevenLabs voice and agent details, any video or reel footage of his own.

## 7. Contradictions to resolve with Vish early (don't guess)

| # | Topic | Conflict | Ask |
|---|---|---|---|
| 1 | Light mode | The PDF locks Editorial Ivory + Midnight Lilac with System/Light/Dark. On 7 Oct he removed day mode from v1 (see `archive/2-…`): "looks extremely shitty… not readable". | Show a genuinely well-made light theme next to dark-only on real content, and let him decide. |
| 2 | Fonts | v1: Geist + Geist Mono. Portfolio: Syne + Public Sans + IBM Plex Mono. Carousel renderer: Inter + JetBrains Mono. Saved LinkedIn preference: Space Grotesk + IBM Plex Mono. PDF candidate: Manrope + Instrument Serif. | One type system across site, portfolio and socials? Show 2 to 3 pairings on real content (a hero and a guide page). |
| 3 | Colours | v1 #7F77DD / #A99CFF on black. LinkedIn #7F77DD on #0A0A0F, light carousel tints. Portfolio paper/ink with teal and ochre. PDF accent #6C4FA3 / #BFA7FF on #111018 and #F8F7F4. | Pick one violet family for everything; decide whether anything from the portfolio palette survives. |
| 4 | Scope and the portfolio site | v1 was deliberately "not another portfolio", a learning hub. 2.0 merges portfolio, services, journey and Learn. | Confirm. What happens to vishkumbhar.netlify.app (redirect, keep, or merge)? Does 2.0 need German (the portfolio has EN/DE)? |
| 5 | v1 home, entry gate and sound | v1 opens with "Enter with sound / Enter without sound", then "Press and hold", a Three.js chapter journey and a generated ambient engine. 2.0 wants the mascot portal, silent by default, no waiting screens, and a licensed or original ambient track. | What carries over, what retires. The gate most likely goes; confirm. |
| 6 | Experience numbers | LinkedIn skill: 4+ years. Public CV and portfolio: 5+ years, 850+ creators, 20+ accounts, 12-person team. | Confirm 5+ in one tap. |
| 7 | Naming brands and employers | v1 content rules avoid naming employers or brands. His CV and portfolio already name HUL, Philips, L'Oréal, Tata, Lakmé and his employers. The PDF wants agency proof with employer context. | May 2.0 name them? As text only, or with logos (logos need rights)? |
| 8 | Paid services, prices, checkout | The PDF has draft prices and a quote builder. A product library with checkout off already exists. | Keep every paid or commercial feature off and in "demo" mode until Vish confirms in writing that he may offer paid work. Don't discuss his permit details in public files. |
| 9 | Gamification | v1 has an XP system ("Curious 0" pill). The PDF doesn't mention it. | Keep, move into Learn only, or retire? |
| 10 | Mascot assets | Previously missing. Now in `assets/mascot/` (31 PNGs). `Vish_Mascot_Claude_Guide.md` is still missing. | Ask for the guide only when starting the 3D work. |

## 8. Ground rules that carry over from v1

- Original content only. No copying other sites, code, avatars, music or fonts without a licence. Inspiration is not permission (the PDF flags MoncyDev's repo as learning-only).
- No fake stats, testimonials, client results or subscriber counts. Agency work is employment, not Build with Vish clients.
- The mascot appears in the hero and the assistant launcher (and future brand assets), not all over the site.
- Sound is off until the visitor chooses it. No autoplay, ever.
- Clean and readable first. Reading pages get no decorative 3D.
- Every guide keeps working on phone and iPad, with copy buttons, a table of contents and readable line length.
- Secrets only in Cloudflare, never in code. The repo is public, so private business details (draft prices, legal status) stay out of committed files.
- Nothing goes live without his explicit "approved". Prototypes are shared as private Claude artifacts or a staging URL first.
