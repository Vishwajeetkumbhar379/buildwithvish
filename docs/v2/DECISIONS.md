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
| D37 | v1 interactions return | Vish wants all four back: scroll-driven 3D chapters with a chapter rail, the page wipe from the tap point with a soft whoosh, drag-to-spin plus cursor ripple, and sound on interactions (only after Sound on). This reopens D15 (two 3D moments only) at his request; reading pages stay calm. Page wipe and interaction sounds are in the prototype; the 3D chapters and drag-to-spin wait for his new references | APPROVED · NEEDS PROTOTYPE | Vish, 8 Nov |
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
