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
| P01 | Type system | Three directions on identical real content: A Clarity (Geist + Geist Mono, v1), B Editorial (Manrope + Instrument Serif + JetBrains Mono, PDF candidate), C Signal (Space Grotesk + Inter + IBM Plex Mono, LinkedIn preference). Recommendation: B′ = B's structure on Inter (true italics, already in the carousel renderer) + Instrument Serif as a rare accent (one word per headline, 32 px and up) + JetBrains Mono for labels and prompts | PROPOSED |
| P02 | Violet family | Iris, anchored on brand #7F77DD: light-theme accent #5B52CF (5.5:1 on ivory, white text on it 5.9:1), dark-theme accent #A99CFF (8.0:1 on midnight), soft #ECEAFB / #262245. Alternative: the PDF's Lilac (#6C4FA3 / #BFA7FF). #7F77DD itself is never used for text on light (3.5:1) | PROPOSED |
| P03 | Theme tokens | Editorial Ivory: canvas #F8F7F4, card #FFFFFF, sunken #F1EFEA, line #E4E1DA, ink #24212C, body #625B68, muted #716A78. Midnight Lilac: canvas #111018, card #1D1A27, sunken #17151F, line #2C2838, ink #F3F0F6, body #B8AFCA, muted #9A93A6. All text pairs pass AA | PROPOSED |
| P04 | Category tints | Only colours besides violet, shared with carousels: guides #F5F4FF / #3E39A8, projects #F0FBF6 / #0A5E55, prompts #FEF6F3 / #8A3A1A; dark #1B1830 / #C9C1FF, #0F2420 / #86E6D8, #2A1B17 / #F5B49C | PROPOSED |
| P05 | Logo | Mark unchanged; wordmark typeface follows the chosen system; tile always #7F77DD; favicon drops the dot and thickens the stroke at 16 px; clear space = tile corner radius; mascot never inside the tile | PROPOSED |
| P06 | Assistant launcher | Mascot face + "Talk to Vish" + a visible "AI" tag; Vish's real photo is reserved for About, Contact and bylines so the bot is never mistaken for him | PROPOSED |
| P07 | Hero routing | Hero offers the three visitor routes (brand or agency / hiring / learning AI) plus a "My journey" shortcut | PROPOSED (detail in round 2) |
| P08 | Phone sound control | Lives inside the phone menu; floating "Sound off" pill only on desktop and iPad | PROPOSED (detail in round 9) |
| P09 | Hero copy strategy | Three tested: A personal ("Hi, I'm Vish."), B brand-led ("Build with Vish" around the portal), C offer-led ("I run creator campaigns and build the AI that makes them faster.") | OPEN (round 2) |

## Needs validation

| ID | Item | Current best answer | Status |
|---|---|---|---|
| V01 | Instagram link | instagram.com/buildwith.vish (already on /links) | NEEDS VALIDATION |
| V02 | Experience figures | 5+ years, 850+ creators, 20+ brand accounts, 12-person team (public CV) | NEEDS VALIDATION |
| V03 | Naming brands and employers on 2.0 | Already named on CV and portfolio | NEEDS VALIDATION |
| V04 | Light theme | Editorial Ivory shown next to Midnight Lilac on real hero and guide content (round 1 canvas) | NEEDS VALIDATION |

## Rejected or superseded

| ID | Item | Status |
|---|---|---|
| S01 | Pre-rendered animation as the primary hero | SUPERSEDED by full 3D (pre-rendered stays as a fallback) |
| S02 | Generated concept-board characters as Vish's identity | REJECTED |
| S03 | Hero option B (bright orange energetic CTA) | REJECTED |
| S04 | 3D-heavy gallery look for Work and Learn | REJECTED |
| S05 | Hero option A (abstract purple orb instead of the mascot) | REJECTED |

## Open: to lock in the interview

Typography · colour tokens · logo lockup · motion tokens · per-page layouts and copy · icon set · EN/DE · v1 entry gate, "Press and hold" and XP system · fate of vishkumbhar.netlify.app · licensed or original ambient track · mascot production route (rigged 3D vs 2.5D vs pre-rendered).

## Built

Nothing for 2.0 yet.

## Changelog

- 28 Oct 2026: register seeded from the storyboard PDF.
- 7 Nov 2026: round 0 audit recorded (content counts, CV role split, font licences, access gaps). Round 1 brand-foundation proposals P01 to P09 added; V04 (light theme) added.
