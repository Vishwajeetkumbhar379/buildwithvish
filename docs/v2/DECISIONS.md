# Build with Vish 2.0: decision register

Statuses: **APPROVED** (Vish said yes), **PROPOSED**, **NEEDS PROTOTYPE**, **NEEDS VALIDATION**, **OPEN**, **REJECTED**, **SUPERSEDED**, **BUILT**.

Seeded 28 Oct 2026 from the storyboard PDF (Vish's interview with ChatGPT). "PDF" decisions were approved there; reopen one only with a reason and a side-by-side. Update this file after every interview round. The repo is public: no prices, legal or permit details, or private client data here. Refer to "see PDF" instead.

## Approved direction

| ID | Area | Decision | Status | Source |
|---|---|---|---|---|
| D01 | Site architecture | Welcome → Services → Selected Work → Journey → Learn → About → Contact | APPROVED | PDF |
| D02 | Hero | Centred full-3D Vish mascot inside a soft-lilac sculpted architectural portal. Arrive, one natural smile and wave, idle (blink, breathe, eyes and head follow the pointer), lean forward when chat opens. | APPROVED · NEEDS PROTOTYPE | PDF |
| D03 | Mascot gate | Before integration: turntable, front, profile and three-quarter comparisons, glasses and facial-hair close-ups, wave, cursor-gaze demo, dark and light lighting, phone fallback. Wrong identity means stop and fix. | APPROVED | PDF |
| D04 | Mascot on phone and fallback | No fake cursor gaze on touch; small wave and tap feedback. Reduced motion or no WebGL: a still or short pre-rendered sequence of the same character. | APPROVED | PDF |
| D05 | Assistant | Floating Vish portrait launcher; says "Vish's AI assistant"; text first, opt-in ElevenLabs voice; no autoplay, no lip-sync by default; keys server-side only; knowledge = approved public content. | APPROVED · NEEDS PROTOTYPE | PDF |
| D06 | Navigation | Editorial header that becomes a floating dock on desktop; full-height phone menu. Chat and nav never overlap. | APPROVED | PDF |
| D07 | Services | Four categories: Creator Partnerships, Social & Content, Operations, AI & Automation. Hybrid A+B: four editorial cards, focus opens a bigger preview, "Explore" zooms into a detail page. Estimate builder keeps one-time and monthly totals separate. | APPROVED (prices: draft, see PDF; all commercial features OFF / demo mode) | PDF |
| D08 | Selected Work | Mixed agency experience and independent tools; Editorial Proof + Interactive Lab; case study = Hook, Role, Evidence, Takeaway; real screenshots only. | APPROVED | PDF |
| D09 | Journey | Short globe reveal on scroll (about 0.8 to 1.2 s, never traps scrolling) and a longer cinematic entry from the hero CTA (about 2 to 3 s, skippable). Both land on the same 2D illustrated map with editorial chapters. Remote work is not a city pin. | APPROVED · NEEDS PROTOTYPE | PDF |
| D10 | Learn | Library first (search, filters, real cards), guided path after. Keep all content and URLs. No decorative 3D. | APPROVED | PDF |
| D11 | About | More personal story, real portrait, verified milestones. | APPROVED (copy OPEN) | PDF |
| D12 | Contact | One clean inquiry form; commercial submission gated. | APPROVED | PDF |
| D13 | Themes | Editorial Ivory + Midnight Lilac; System by default, remembered manual override, no theme flash. | APPROVED direction · NEEDS VALIDATION (he removed v1's day mode on 7 Oct) | PDF |
| D14 | Sound | Optional calm ambient track, silent by default, pauses for voice. | APPROVED (audio asset OPEN) | PDF |
| D15 | Motion budget | About 80% calm editorial, 20% motion and 3D. Only two signature 3D moments: the mascot portal and the Earth-to-Journey entrance. | APPROVED | PDF |
| D16 | Wordmark | Keep the existing "Build with Vish" name and logo; don't swap in "VISH." from mockups. | APPROVED | PDF |
| D17 | Type system | B′: Inter for UI, headings and reading (optical sizes for large type), Instrument Serif italic as a rare accent (one word per headline, 32 px and up, never body text), JetBrains Mono for labels, prompts and code. One system for the site, LinkedIn and Instagram. Scale and weights to lock in round 1b | APPROVED | Round 1 |
| D18 | Violet | Iris family anchored on #7F77DD (values in P02) | APPROVED | Round 1 |
| D19 | Themes | Editorial Ivory + Midnight Lilac, following the device setting, remembered toggle, no flash. Validates D13. Working values in P03 and P04 | APPROVED | Round 1 |
| D20 | Entry gate and "Press and hold" | Vish kept both, then asked to follow the PDF. Per the PDF (content first, no waiting screens, silent by default): no full-screen gate. "Enter with sound" lives on as the visible sound control in the hero. "Press and hold" lives on as an optional way to start the long Journey entrance from the portal, next to a normal "My journey" button, so holding is never the only way in | APPROVED (delegated, per PDF) · NEEDS PROTOTYPE | Round 1 |
| D21 | XP "Curious" pill | Kept, inside Learn only; removed from the global header | APPROVED | Round 1 |
| D22 | Ambient sound | v1's generated sound engine (original, no licence needed) becomes the optional ambient track. Silent by default, ducks for voice chat. Retune in round 9 | APPROVED | Round 1 |
| D23 | Portfolio site | buildwithvvish.com is the complete, organised package (Work, Journey, About, CV, Contact). vishkumbhar.netlify.app stays live as its own site, reached by one small "Portfolio" button | APPROVED | Round 1 |
| D24 | Brand names and logos | Brands named with employer context (agency accounts, not Build with Vish clients). Logos wanted, but shown only after written permission from the brand or agency; text until then. Tracked in the asset register | APPROVED (logos gated on permission) | Round 1 |
| D25 | Public facts | 5+ years, 850+ creators, 20+ brand accounts, led a 12-person team; Instagram @buildwith.vish | APPROVED | Round 1 |
| D26 | Berlin move | Not mentioned on 2.0 for now (the public CV and portfolio still mention it) | APPROVED | Round 1 |
| D27 | Mascot priority | Reaffirmed: the 3D mascot says hi with one wave, moves and follows the cursor (D02). Top priority of the hero | APPROVED | Round 1 |
| D28 | Scope | 2.0 is one complete site with three sides: Work with me (freelance portfolio, services, UGC, packages and pricing, selected work, how I work, contact), Learn (every free guide, post, project, carousel, tool, free downloads; digital products in demo mode) and Me (Journey, About, skills, CV, portfolio button) | APPROVED | Vish, 7 Nov |
| D29 | UGC page | Its own page under Work with me: formats, deliverables, written usage rights, showreel of real labelled samples, packages, FAQ | APPROVED direction · storyboard PROPOSED | Vish, 7 Nov |
| D30 | Packages and pricing | Packages per service, one-time and monthly kept apart, "contact for more" path. Built with an open / not-yet-open switch; prices stay [PRICE] placeholders until Vish approves real numbers | APPROVED direction · storyboard PROPOSED | Vish, 7 Nov |
| D31 | Mascot quality bar | A real rigged 3D character (skeleton plus face controls for eyes, lids, brows, smile; wave clip; eyes and head follow the cursor). Not 2.5D tricks on flat images. Built from a careful study of the reference reels. Pre-rendered sequence stays as the fallback only | APPROVED · NEEDS PROTOTYPE | Vish, 7 Nov |
| D32 | Premium bar | Apple-level restraint: one idea per screen, large confident type, real proof as large numbers, real photo lit like a product shot, product-style previews of real tools. Must read as a high-end consultant, stay easy to navigate, and be well organised in both the front end and the back end | APPROVED | Vish, 7 Nov |
| D33 | Case-study layout | One short "The project" overview, then three numbered responsibility cards chosen per project (replaces Task / Goal / Execution, which read as repetitive), then evidence, honest results, tools, next step | APPROVED (from Vish's handoff brief) | Vish, 7 Nov |
| D34 | Price display | When bookings open: "From" prices per package plus "Ask about this package". Until then the not-yet-open mode shows "Price on request" | APPROVED | Vish, 7 Nov |
| D35 | Mascot production route | Quick AI multi-view image-to-3D likeness test first (four turnaround views already uploaded to Higgsfield; needs credits Vish adds himself), then a 3D character artist builds the final model with a real face rig. AI auto-rigs give a body skeleton only: no blinking, no eye movement, no smile | APPROVED · NEEDS PROTOTYPE | Vish, 7 Nov |
| D36 | Finish level | Board 8 (premium pass) is the finish bar for every page | APPROVED | Vish, 7 Nov |
| D37 | v1 interactions return | Vish wants all four back: scroll-driven 3D chapters with a chapter rail, the page wipe from the tap point with a soft whoosh, drag-to-spin plus cursor ripple, and sound on interactions (only after Sound on). This reopens D15 (two 3D moments only) at his request; reading pages stay calm. On v5 Vish kept the page wipe, sounds and 3D chapters (asking for more 3D), and swapped drag-to-spin and the cursor ripple for a half-body mascot that looks toward the pointer (PR19) | APPROVED · REVISED IN v6 | Vish, 8 Nov |
| D38 | Job titles | Use the new CV titles: Senior Marketing Manager, Influencer Marketing and Client Servicing (Illuminati Media); Marketing Manager, Influencer Marketing and Client Servicing (Pollen); Marketing Analytics and Content Manager, Working Student (Black Forest Business School) | APPROVED | Vish, 8 Nov |

## Round 0: audit (7 Nov 2026)

What was actually checked, so later rounds don't re-derive it.

| Item | Finding | How verified |
|---|---|---|
| Library size | 82 entries (guide 28, prompts 8, workflow 14, creator 18, career 3, built 11). The 31 AI × marketing posts are part of the 82, not extra. Plus 8 projects = the "90 resources" the Learn hub shows. 8 carousels, 6 Build Notes issues, 24 long-form guide bodies. | Loaded `src/content-*.js` in Node and counted |
| Live site | buildwithvvish.com home, `#guides`, `#read-claude-from-zero`, `#portfolio` all load; matches the archive screenshots | Playwright, 7 Nov |
| Portfolio | vishkumbhar.netlify.app loads; CV PDF readable | Fetched 7 Nov |
| CV facts | 5+ years, 850+ creators, 20+ brand accounts, 12-person team. Pollen is two roles: Senior Influencer Marketing Executive 06/2022 to 04/2023, then Manager, Influencer Marketing & Client Servicing 04/2023 to 01/2024 (use this split on the Journey page) | CV text |
| Fonts licence note | Geist, Manrope, Instrument Serif, Inter, Space Grotesk, JetBrains Mono, IBM Plex Mono are all OFL. IBM Plex Mono carries a Reserved Font Name, so a subset we host must keep the files unmodified or be renamed | Font metadata |
| Not yet reviewed | Storyboard PDF (not attached to this session), the three Instagram reels (Instagram blocks automated viewing), the 11 tool repos (attach in round 4), the reference sites (one per relevant round) | |

## Round 1 proposals (brand foundation, canvas "BwV 2.0 · Round 1 Brand Foundation")

| ID | Area | Proposal | Status |
|---|---|---|---|
| P01 | Type system | Three directions on identical real content: A Clarity (Geist + Geist Mono, v1), B Editorial (Manrope + Instrument Serif + JetBrains Mono, PDF candidate), C Signal (Space Grotesk + Inter + IBM Plex Mono, LinkedIn preference). Recommendation: B′ = B's structure on Inter (true italics, already in the carousel renderer) + Instrument Serif as a rare accent (one word per headline, 32 px and up) + JetBrains Mono for labels and prompts | APPROVED → D17 |
| P02 | Violet family | Iris, anchored on brand #7F77DD: light-theme accent #5B52CF (5.5:1 on ivory, white text on it 5.9:1), dark-theme accent #A99CFF (8.0:1 on midnight), soft #ECEAFB / #262245. Alternative: the PDF's Lilac (#6C4FA3 / #BFA7FF). #7F77DD itself is never used for text on light (3.5:1) | APPROVED → D18 |
| P03 | Theme tokens | Editorial Ivory: canvas #F8F7F4, card #FFFFFF, sunken #F1EFEA, line #E4E1DA, ink #24212C, body #625B68, muted #716A78. Midnight Lilac: canvas #111018, card #1D1A27, sunken #17151F, line #2C2838, ink #F3F0F6, body #B8AFCA, muted #9A93A6. All text pairs pass AA | APPROVED → D19 |
| P04 | Category tints | Only colours besides violet, shared with carousels: guides #F5F4FF / #3E39A8, projects #F0FBF6 / #0A5E55, prompts #FEF6F3 / #8A3A1A; dark #1B1830 / #C9C1FF, #0F2420 / #86E6D8, #2A1B17 / #F5B49C | APPROVED → D19 |
| P05 | Logo | Mark unchanged; wordmark typeface follows the chosen system; tile always #7F77DD; favicon drops the dot and thickens the stroke at 16 px; clear space = tile corner radius; mascot never inside the tile | PROPOSED |
| P06 | Assistant launcher | Mascot face + "Talk to Vish" + a visible "AI" tag; Vish's real photo is reserved for About, Contact and bylines so the bot is never mistaken for him | PROPOSED |
| P07 | Hero routing | Hero offers the three visitor routes (brand or agency / hiring / learning AI) plus a "My journey" shortcut | PROPOSED (detail in round 2) |
| P08 | Phone sound control | Lives inside the phone menu; floating "Sound off" pill only on desktop and iPad | PROPOSED (detail in round 9) |
| P09 | Hero copy strategy | Three tested: A personal ("Hi, I'm Vish."), B brand-led ("Build with Vish" around the portal), C offer-led ("I run creator campaigns and build the AI that makes them faster.") | OPEN (round 2) |

## Storyboard proposals (canvas "BwV 2.0 · Site Storyboard", 7 Nov 2026)

Structure reference for the freelance side: a freelance social-media portfolio Vish shared. Borrowed structure only (service cards, Task / Goal / Execution case format, practice-project labels, a "working together" FAQ); no copy reused. Not borrowed: an hourly rate in the FAQ, a plain tool list, unverified testimonials.

| ID | Board | Proposal | Status |
|---|---|---|---|
| SB1 | Site map | Welcome portal with three doors (brand or agency / hiring / learning) plus My journey, leading to the three sides in D28. Global: header to dock, Talk to Vish (AI), sound, theme, footer, 404 | APPROVED |
| SB2 | Visitor journeys | Brand: welcome, services hub, UGC, packages, pre-filled contact. Recruiter: welcome, selected work, case study, About and Journey, CV and LinkedIn. Learner: Instagram keyword or /links, guide, download card, Build Notes, Learn hub | APPROVED |
| SB3 | Work with me hub | Ten sections: hero with real photo and proof, who I help, five service cards, how working together goes (4 steps), selected work with honesty labels, packages teaser, skills and tools linked to proof, kind words (hidden until real), FAQ, contact band | APPROVED |
| SB4 | UGC page | Reel-first hero, six formats with lengths, deliverables incl. written usage rights, showreel hidden until real samples exist, language angle (English, Hindi, Marathi on camera), five-step process, three packages, FAQ | APPROVED |
| SB5 | Packages and pricing | Tabs per service, three packages each (small way in, fuller project, ongoing), "every package includes" and "always quoted separately", estimate builder entry (scope PDF, not a contract), open / not-yet-open switch | APPROVED |
| SB6 | Case study template | One honesty label (agency work employed / my tool / client project / practice project), hook, at-a-glance facts, "The project" overview, three responsibility cards, anonymised evidence, honest results, tools, takeaway and next step (D33) | APPROVED |
| SB7 | Learn downloads | Instagram keyword to auto-DM to free guide; download card inside the post; PDF first, Build Notes signup after with double opt-in; resource library with paid kits visible but switched off | APPROVED |
| SB8 | Premium pass | Work with me shown at final quality, desktop and phone, Midnight Lilac: floating dock, centred headline with one serif accent, proof numbers beside the real photo, services as a bento of five tiles with small previews of real tools (sample data labelled) | APPROVED |
| SB9 | Agency overflow support | Optional white-label page for agencies needing overflow help (from Vish's handoff brief) | OPEN |

## Clickable prototype (7 Nov 2026)

A private interactive prototype of the whole site, built to the board 8 finish level so Vish can scroll and tap it on his iPad. Not site code: nothing in `src/` or the live site changed.

| ID | Item | Proposal | Status |
|---|---|---|---|
| PR1 | Hero | Build / portal / with Vish (B′ type). Vish's original mascot renders stand in the portal; the six real wave keyframes play once on arrival and on tap; slight breathing and pointer depth on the portal layers. No fake face motion | PROPOSED |
| PR2 | Navigation | Floating dock: Work with me (menu: Services, UGC, Packages, Selected work), Work, Journey, Learn (menu: Learn hub, Start here, Downloads and kits, Tools and Build Notes), About, sound, theme, Contact. Phone: full-screen grouped menu. Three visitor doors right under the hero | PROPOSED |
| PR3 | UGC mockups | Real-looking phone frames with reel UI and labelled video slots that take Vish's videos later; laptop mockup for tool and agency case studies | PROPOSED |
| PR4 | Depth and motion | Cards tilt slightly toward the pointer with a soft sheen (mouse only), counters count up once, journey route animates, layered shadows for clear depth. Off for reduced motion and touch | PROPOSED |
| PR5 | Downloads and kits | Digital products page: free guides live, paid kits visible as "coming soon" with the button off | PROPOSED |
| PR6 | Sound control | Moved into the dock on desktop and iPad (no floating pill over content); inside the menu on phone | PROPOSED |
| PR7 | v1 carried over | Learn hub with search, filters and tinted numbered cards; all 90 resources; projects with progress; carousels; Build Notes; AI tool finder; prompt builder, campaign maths and launch checklist entries; XP inside Learn; the generated ambient sound | PROPOSED |
| PR8 | Intro letter and signature | Home page, right after the three doors: "A note from me", a short letter in Vish's voice (agency years in Mumbai, 850+ creators, 20+ accounts, team of twelve; MBA and thesis in Germany; what each visitor finds on the site; building in public), signed "Vish Kumbhar" in a cursive signature face (Mrs Saint Delafield, OFL) that writes itself on when it scrolls into view. The same signature closes the About bio. The numbers band below no longer repeats the photo | PROPOSED |
| PR9 | Services, repackaged | Six neat numbered cards in the style of the reference portfolio, built from Vish's CV: Influencer campaigns, Talent management, Account management and client servicing, Content and UGC, Team and operations, AI workflows. Each card flips in 3D on tap to show what you get, a from-price placeholder and a link to its packages tab. Packages page re-cut to the same six. Work with me ends with a centred, signed closing. Supersedes the four-category list in D07 for the prototype (to confirm) | PROPOSED |
| PR10 | CV additions | Raymond named as the largest agency client, Universal Pictures India added, campaign scale and budget outcomes on the agency case study, the trekking start-up as a Journey chapter, MICA x upGrad and Rotaract on About. Budget figures and job-title wording to confirm before publishing | APPROVED (new CV job titles; budget figures may be shown) |

## Reference study (8 Nov 2026)

Vish asked for elements from sebg.ch and simondai.com, plus his earlier references, a look at portfolios in his niche, and real UGC portfolios that show more than three videos. Each reference was opened in a browser at iPad width and checked for layout, type, motion and libraries. activetheory.net, unseen.co, edolus.com and lusion.co did not render in the test browser (WebGL or timeouts), so they were judged from earlier notes only.

| Ref | What it does well | Taken into 2.0 |
|---|---|---|
| sebg.ch | A drawn character who guides you through the page with speech bubbles; full-width colour blocks per project; browser and phone mockups side by side; words that light up as you read; buttons with a hard offset shadow; sound toggle | Narrator (PR12), colour-block chapters (PR11), work showcase (PR15), reading reveal (PR11), hard-shadow buttons (PR16) |
| simondai.com | Mono kicker, a big plain headline, outlined mono buttons with arrows, grid lines, and a portrait that turns toward your cursor ("move me with your cursor") | Mascot follows the pointer with his own front-left, front and front-right renders (PR13); mono kicker and grid lines in the hero (PR16) |
| v.ish.al | A 3D character that moves as you scroll | The narrator changes pose per chapter as you scroll (PR12) |
| avivashishta.com | "Tell me where you're headed": a sentence with choices that builds a path; floating phones for reels | Learn path picker on home (PR17); 3D phone ring for UGC (PR14) |
| cuberto.com | Numbered service cards that stack as you scroll | Services stack on home (PR11) |
| toyfight.co | Highlighted words inside the headline | Two highlighted phrases in the hero line (PR16) |
| gahanrao.com | Fanned photo cards and soft text reveals on About | About uses three fanned cards: two mascot expressions around a real photo (PR16) |
| why.zero.university | "Draw a zero": a gesture you make with the pointer | Draw a circle round the mascot and he waves (mouse only, PR13) |
| digitalpanda.com, triptych.co, butter.video, peec.ai, minhpham.design, shubhamgl.com, gabrielvaldivia.com, behfar.dev | Strong single ideas (3D office scene, arched image windows, inline icons in headlines, logo walls, start gates, game-style character sheets, calm case-study grids, particle hero) | Not taken, to keep the site calm and fast: no start gate (D20 stands), no logo wall until permissions are in (D24), no particle hero |

Niche portfolio findings (influencer marketing, talent and account managers): the strongest sites lead with two or three deep case studies (challenge, approach, outcome), name the scale they worked at, list services plainly, and keep employer work clearly separate from freelance clients. 2.0 already does this (Lena-style case study, honest labels).

UGC portfolio findings (creator guides and hiring checklists): brands look for a hook that lands in the first three seconds, range across formats and niches, raw footage on request, hook variations for testing, usage rights stated up front, a short showreel, and a clear way to brief. Samples are grouped by format and niche, and each one says what it is best for. This shaped the new UGC page (PR18).

## Prototype v5 (8 Nov 2026)

| ID | Item | Proposal | Status |
|---|---|---|---|
| PR11 | Scroll chapters (Vish: more 3D) | Home is nine chapters (Hello, A note, Proof, Services, UGC, Work, Journey, Learn, Say hello). Services, UGC and Work are full-width colour blocks (deep Iris, lilac, midnight) that tilt up into place in 3D as you scroll. A chapter rail of dots on the right (iPad landscape and desktop) flashes the chapter name as you arrive; a thin progress line runs along the dock. The intro letter lights up word by word as you read. Services stack as numbered cards. Reading pages stay calm | PROPOSED |
| PR12 | Narrator (rejected) | Vish's own gesture renders guide the home chapters from the bottom-left corner: a new pose per chapter with a short line in a speech bubble, which steps aside after a few seconds. Can be hidden, and stays hidden | REJECTED by Vish on 8 Nov: the small full-body figure in the corner looked wrong. Removed in v6 (S07) |
| PR13 | Drag to spin | The hero mascot turns through his eight original turnaround views when dragged sideways (finger or mouse, with inertia), turns back to face you, and still waves on tap. Arrow keys turn him too. With a mouse he looks toward the pointer. Drawing a circle round him makes him wave. A "Psst. You can spin me." bubble shows once | NOT KEPT: Vish kept only "looks at the pointer". Spin and circle removed in v6 |
| PR14 | Cursor, ripple, sound | Dot and ring cursor with a mouse; a ripple on every tap or click; soft tick, pop and whoosh sounds only after Sound on | CURSOR AND RIPPLE NOT KEPT (removed in v6); sounds stay |
| PR15 | Work showcase | The agency case study is shown in a browser frame with a phone in front and a speech bubble, then three tool cards labelled with sample data | PROPOSED |
| PR16 | Finish details | Hard-shadow pill buttons, outlined mono buttons, grid lines in the hero and blocks, mono kicker with LinkedIn, highlighted phrases in the hero line, fanned cards on About | PROPOSED |
| PR17 | Learn path picker | "Tell me where you're headed. I want to use AI at work / run better creator campaigns / build my own tools / land a marketing job", each choice builds a four-step path from the real Learn library | PROPOSED |
| PR18 | UGC page | Hero with showreel slot; a sample library of twelve format slots (product demo, unboxing, problem to fix, review to camera, voiceover, before and after, comparison, app walkthrough, day in the life, no-face B-roll, ASMR, hook test pack), filterable by format and niche, each with a planned hook, "best for" line, length and platforms, opening a script outline; a hook lab with three openings; a raw versus edited slider; what every video includes; usage rights explained (organic, paid ads, whitelisting); six steps; three UGC packages with add-ons; questions. Every slot is labelled "to film" until a real video replaces it | APPROVED (keep all 12 slots) |

## Prototype v6 (8 Nov 2026)

| ID | Item | Proposal | Status |
|---|---|---|---|
| PR19 | Half-body mascot that looks at you | The hero arch now shows Vish's original chest-up render. It turns toward the pointer, or toward a tap on iPad, using a depth map made from the render itself, and the eyes follow. After a pause it looks around slowly. A tap shows a quick laugh, wink or surprise from his expression renders. This prototype uses his pixels as they are. A smooth head turn like simondai.com's (about 120 frames from a short AI video of the same render) needs an image-to-video step that uses credits, so it waits for Vish's go-ahead | REJECTED by Vish on 8 Nov: looked cheap. Removed in v7 (S08, D40) |
| PR20 | Liquid glass | Speech bubbles and small panels use an iOS-style glass: blurred and brightened background, a bright rim, a highlight that follows the pointer and a slow sheen. The dotted bubble shadow is gone | PROPOSED |
| PR21 | More 3D | One real 3D piece per chapter (Three.js, as in v1): 850 dots that gather into groups in Proof, one per creator (the groups are illustrative); six service cards that fan out in Services; a dotted globe that turns from India to Europe while the Mumbai to Offenburg route draws itself in Journey. The Work devices swing into place in 3D, and the colour blocks tilt in further. Each piece reacts to the pointer and pauses when off screen | PROPOSED |

## Reference study 2 (8 Nov 2026)

| Ref | What it does well | Taken into 2.0 |
|---|---|---|
| jameschugh.com (Vish: the best reference) | An illustrated map hero with career stops; a Journey that works like a maps app (light street map, blue route, a moving location arrow, a place card that opens after the map moves, numbered stops, a timeline); a bottom dock with Resume; scroll-revealed story text with marker highlights and a sticky note; big quick links | Map hero (D41), maps-style Journey (PR22), bottom dock (D44), marker and wavy highlights plus a sticky note on the intro letter (PR26), quick links (D44). The bright illustrated scene is not copied |
| jishnumondal.vercel.app | Cinematic dark motion, a framed box that expands as you scroll, project cards in browser frames | Motion polish for the final build; no new element in v7 |
| abiemaxey.com | Clean services in three cards, each with a short line and a "from" price; a path from free to paid ("Start free, go as deep as you want"); stats; an About block | Services page rebuilt in this style (PR23) |
| abiemaxey.com, the cursor-tracking hero article | Numbered contents next to numbered steps, prompt boxes, terminal blocks, before and after grids, a closing checklist, time per step | Guide layout (PR24). The article's technique is a short AI video cut into frames, which Vish chose not to use for now (D40) |
| JNO UGC template | A big phone with the showreel and a row of clients | UGC page keeps the phone hero and adds a brands row (agency work, names only). Vish finds the template busy; the rest stays as designed |

## Prototype v7 (8 Nov 2026)

| ID | Item | Proposal | Status |
|---|---|---|---|
| PR22 | Journey as a maps interface | Ten stops from Pillai College to the Black Forest Business School on a stylised map ("places are approximate"): Mumbai, then a dotted world map with the flight, then Offenburg. Scrolling moves a blue route and an arrow from stop to stop; the map pans, then a place card opens with role, a short story, photo slots, chips and next and back buttons. Zoom and reset controls, timeline dots, and a plain list of the stops for screen readers. Remote roles (both Pollen roles and Illuminati Media) have no pin. No home or residence is shown | PROPOSED |
| PR23 | Services, cleaner | Six service cards (one dark, the rest light or tinted), each with a one-line promise and a "from" price; a five-step path from the free Learn hub to monthly work; the six-card 3D deck above; tools as an app grid | PROPOSED |
| PR24 | Guides, step by step | Header with time and date, three before and after previews, a numbered contents list that follows your reading, numbered steps with time per step, copyable prompt boxes, illustrated screens marked as illustrations, and a checklist at the end | PROPOSED |
| PR25 | Brands and tools | A moving row of agency brands (names only until permission for logos) and a row of tools; tools also as an app grid on Services and About. Tools listed: Meta Business Suite, Meta Ads Manager, Google Ads, LinkedIn Ads, Google Analytics, HubSpot, Zoho, Google Sheets, Canva, Figma, WordPress, Microsoft Office, Excel, PowerPoint, Slack, Google Workspace, Claude, Claude Code, ChatGPT, Codex | PROPOSED · LIST TO CONFIRM |
| PR26 | Intro letter details | A marker on "850 creators" and "building small AI tools", a wavy underline on "vague brief" and "I answer every message myself", and a sticky note: "Five years on agency floors. Now building in public." | PROPOSED |

## Talk to Vish in Vish's voice (8 Nov 2026)

Vish wants the site assistant to answer in his own voice without spending voice credits for every visitor.

| ID | Item | Proposal | Status |
|---|---|---|---|
| D40 | No moving figure in the hero | Vish chose no head-turn figure for now, rather than a free AI clip or filming himself. The technique stays on file (an 8-second head-turn clip cut into frames that follow the cursor) if he wants it later | APPROVED | Vish, 8 Nov |
| D41 | Home hero is a map of the career | A calm, maps-style view of Mumbai with the career stops as pins (after jameschugh.com, without the bright illustrated scene). Tapping a pin moves the map and opens a place card; "Take the journey" opens the full Journey | APPROVED · IN PROTOTYPE (v7) | Vish, 8 Nov |
| D42 | Where the mascot appears | Only on the "Talk to Vish" assistant button and chat window. Removed from the hero, the narrator and the About cards | APPROVED | Vish, 8 Nov |
| D43 | New type | Vish asked for fonts that don't look like every AI-made site, with a Hinge feel. Hinge is reported to use Tiempos Headline and Modern Era (paid). Free stand-ins on Google Fonts: Newsreader for headlines, Wix Madefor Display and Text for interface and body, Martian Mono for labels; the signature face stays. Replaces B′ (Inter, Instrument Serif, JetBrains Mono) in the prototype | PROPOSED · NEEDS VALIDATION | v7 |
| D44 | Navigation at the bottom | Main dock moves to the bottom of the screen with a Resume button (after jameschugh.com); logo, sound and theme stay at the top. On phones the dock becomes a tab bar: Home, Services, Journey, Learn, More. Every page ends with big quick links: Resume, Services, About me, Journey, Contact | PROPOSED | v7 |
| D45 | Remote roles | Vish worked remotely for Pollen (Zoo Media) and Illuminati Media. The Journey shows them without a pin, the timeline lists them as remote, and copy no longer says "agency floors in Mumbai" for all five years | APPROVED | Vish, 8 Nov |
| D46 | First screen: night flight on a real Earth | Vish rated v7 4/10 (crowded, not premium, no wow). New first screen: a dark, cinematic 3D Earth (NASA Blue Marble by day and Black Marble city lights by night, public domain, via the MIT-licensed three-globe package) with one line, "Build with Vish." Scrolling tells the story in five beats: Mumbai, the agency years, remote, take-off (an amber plane flies to Germany), Offenburg now. The menu and the assistant stay hidden until the story ends; "Skip the story" is always there | APPROVED DIRECTION · IN PROTOTYPE (v8) | Vish, 8 Nov |
| D47 | Colour: violet plus an amber spark | Iris violet stays the brand colour; one warm amber (#FFB547) is used only where the eye should go first: the plane and route, the main buttons, the big numbers. Reason: the eye goes to the one warm, saturated colour on a calm ground, and amber sits opposite violet | APPROVED | Vish, 8 Nov |
| D48 | Sound design | Nothing plays until a tap. Then a calm generated bed (a warm pad that changes chord slowly, soft room air, a rare soft chime) and soft interface sounds: a swell at each story beat, a whoosh for the plane, a chime on landing, quiet taps on buttons. All generated in the browser, no audio files | APPROVED · IN PROTOTYPE | Vish, 8 Nov |
| D49 | Proof and brands | Brands shown as international names: Philips, L’Oréal, Universal Pictures, Bumble, Vans, Unilever (HUL), Lakmé, Tata, Raymond (agency work, names only until logo permission). 9,000+ LinkedIn followers and 11 open-source AI tools may be shown | APPROVED | Vish, 8 Nov |
| D39 | Assistant voice | ElevenLabs voices cannot be downloaded as a model, so every live answer would use credits. Recommended: (1) pre-voice the assistant's answers once (about 30 to 40 answers to the questions visitors ask most), store them as audio files with the site, and play one only when a visitor taps "Hear Vish say it". Visitors then cost nothing, and audio is redone only when an answer changes. (2) Later, if free-form spoken answers matter: train an open-source voice model on Vish's own recordings (not on ElevenLabs output) and run it in the visitor's browser, with a licence that allows commercial use. Lower quality than ElevenLabs, a larger download, and it needs about an hour of clean recordings. Text answers themselves still need a small AI budget or a free tier. Voice never plays without a tap | PROPOSED · NEEDS DECISION |

## Needs validation

| ID | Item | Current best answer | Status |
|---|---|---|---|
| V01 | Instagram link | instagram.com/buildwith.vish (already on /links) | APPROVED → D25 |
| V02 | Experience figures | 5+ years, 850+ creators, 20+ brand accounts, 12-person team (public CV) | APPROVED → D25 |
| V03 | Naming brands and employers on 2.0 | Already named on CV and portfolio | APPROVED → D24 |
| V04 | Light theme | Editorial Ivory shown next to Midnight Lilac on real hero and guide content (round 1 canvas) | APPROVED → D19 |

## Rejected or superseded

| ID | Item | Status |
|---|---|---|
| S01 | Pre-rendered animation as the primary hero | SUPERSEDED by full 3D (pre-rendered stays as a fallback) |
| S02 | Generated concept-board characters as Vish's identity | REJECTED |
| S03 | Hero option B (bright orange energetic CTA) | REJECTED |
| S04 | 3D-heavy gallery look for Work and Learn | REJECTED |
| S05 | Hero option A (abstract purple orb instead of the mascot) | REJECTED |
| S08 | The chest-up mascot turned with a depth map (v6) | REJECTED by Vish on 8 Nov: looked cheap (D40) |
| S07 | A full-body narrator figure in the corner of the home page | REJECTED by Vish on 8 Nov (v5). The mascot now appears chest-up in the hero and looks toward the pointer (PR19) |
| S06 | A mascot built from code primitives (Three.js shapes) | REJECTED by Vish on 7 Nov: nowhere near the quality of his renders. The real 3D version comes from a professional 3D artist (D35) |

## Open: to lock in the interview

Type scale, spacing, radii, buttons, focus ring and motion tokens (round 1b) · real package contents and prices · UGC samples to film · testimonials (only real, with permission) · extra brand names in the handoff brief (Raymond, Bumble, Tata Motors, Universal Pictures India, Vans) to verify against the CV before use · mascot production route and budget · per-page layouts and copy · icon set · EN/DE (not answered yet) · whether vishkumbhar.netlify.app gets restyled to the 2.0 system · logo permissions (who to ask) · mascot production route (rigged 3D vs image-to-3D vs 2.5D vs pre-rendered).

## Built

Nothing for 2.0 yet.

## Changelog

- 28 Oct 2026: register seeded from the storyboard PDF.
- 7 Nov 2026: round 0 audit recorded (content counts, CV role split, font licences, access gaps). Round 1 brand-foundation proposals P01 to P09 added; V04 (light theme) added.
- 7 Nov 2026: Vish's answers recorded. Approved: B′ type (D17), Iris (D18), both themes following the device (D19), XP inside Learn (D21), v1 sound engine as the ambient track (D22), portfolio as a linked site inside one organised package (D23), named brands with logos only after permission (D24), public facts (D25), no Berlin for now (D26), mascot priority (D27). D20 decided per the PDF at his request: no blocking gate.
- 7 Nov 2026: scope widened to a complete freelance + learning + personal site (D28 to D30). Storyboard SB1 to SB7 proposed. Round 3 now splits into 3a services hub, 3b UGC, 3c packages and pricing with the estimate builder, 3d service detail pages.
- 7 Nov 2026: Vish's handoff brief read. D31 (real rigged 3D mascot), D32 (premium bar), D33 (case-study layout) added; SB6 updated; SB8 premium pass and SB9 agency option added.
- 7 Nov 2026: storyboard SB1 to SB8 approved; D34 (from prices), D35 (mascot route), D36 (finish level) added.
- 7 Nov 2026: code-built mascot rejected (S06). Clickable prototype of the whole site built with the original mascot renders (PR1 to PR7).
- 7 Nov 2026: PR8 intro letter and signature added to the prototype.
- 8 Nov 2026: PR9 (six services, flip cards, signed closing) and PR10 (CV additions) added to the prototype.
- 8 Nov 2026: D37 (v1 interactions return, reopens D15 at Vish's request) and D38 (job titles) added; PR10 approved. Page wipe and interaction sounds added to the prototype.
- 8 Nov 2026: reference study (sebg, simondai and the earlier list, niche and UGC portfolio research) and prototype v5 (PR11 to PR18). D37 now in the prototype.
- 8 Nov 2026: Vish's answers on v5 (narrator out, only look-at-pointer kept, more 3D, keep 12 UGC slots, glass bubbles). Prototype v6 (PR19 to PR21). D39 voice proposal added.
- 8 Nov 2026: v6 hero mascot rejected (S08); D40 to D44 added; second reference study (jameschugh.com, jishnumondal, abiemaxey.com, JNO); prototype v7 (PR22 to PR26). Next: a UGC shoot plan for Vish.
- 8 Nov 2026: D45 (Pollen and Illuminati Media were remote) applied to the map, timeline and intro letter.
- 8 Nov 2026: v7 rated 4/10 by Vish. D46 to D49 added. Prototype v8: night flight on a real Earth, a concrete note in Vish's voice (from his CV and email skills), amber spark, new sound engine, headline motion, a Remote marker and take-off on the Journey map.
