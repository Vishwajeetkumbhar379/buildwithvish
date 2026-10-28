# How to run the Build with Vish 2.0 design interview

Brainstorm and lock first, build later. Nothing in `src/`, `site/` or the live site changes until Vish says "approved" for the complete integrated design. Read `CONTEXT.md` and `DECISIONS.md` first.

## Round order

| Round | Topic | Output Vish sees |
|---|---|---|
| 0 | Audit brief | What you inspected (repo, live site, portfolio, PDF, mascot pack, archive), what's missing, a keep / improve / replace table for v1, and the contradictions from `CONTEXT.md` section 7. Ask the 3 or 4 most important as tappable questions. |
| 1 | Brand foundation | 2 to 3 type systems and the violet family, each shown on real content (hero + a guide page), dark and light, phone and desktop. Logo lockup. Once locked, record it in a Design System artifact. |
| 2 | Welcome (hero) | 2 to 3 portal compositions using the real mascot PNGs as stand-in stills, plus a frame strip of the arrive, greet, idle, assist sequence with timings. |
| 2b | Mascot prototype track (runs alongside) | Honest options for the character (true rigged 3D model, 2.5D layered from the PNGs, pre-rendered sequences) with likeness, cost, effort and performance trade-offs. Then an interactive prototype for the identity gate: turntable, expressions, wave, eye and head tracking, phone and no-WebGL fallbacks. |
| 3 | Services | Overview, focus state, detail page, estimate builder in demo mode (no real prices on screen until approved, nothing bookable). |
| 4 | Selected Work | Featured mix, Interactive Lab, case-study template (Hook, Role, Evidence, Takeaway) using real tool screenshots. |
| 5 | Journey | Both globe entrances as interactive prototypes, the 2D illustrated map and chapters, phone layout, reduced-motion path. |
| 6 | Learn | Library-first hub evolved from the current one, article reader template, search and filters, where every existing URL lands. |
| 7 | About | Real portrait, personal story, verified milestones. |
| 8 | Contact | One clean form, its states, and the commercial gate. |
| 9 | Global elements | Header and desktop dock, phone menu, assistant launcher, panel and sheet, sound control, theme switch, footer, 404, loading, focus styles. |
| 10 | Integrated walkthrough | One clickable prototype through every page, on phone, iPad and desktop, in every theme kept. Ends with Vish's "approved" or a change list. |

Don't start the next page until the current one is locked, unless Vish asks to.

## Format of every round

1. One line: what we're deciding this round.
2. 2 to 3 genuinely different directions on a **Design** artifact Vish can open on his iPad. Artboards: phone 390, iPad 820 and 1180, desktop 1440; dark, plus light if we keep it.
3. A recommendation with reasons: readability, business conversion, motion cost, device behaviour.
4. 2 to 4 tappable questions (AskUserQuestion, recommended option first).
5. A short changelog, then update `DECISIONS.md` and commit it.

Use interactive prototypes (private artifacts) only where a still frame can't show the idea: mascot gaze, the globe entrances, page transitions, the estimate builder.

## A page is LOCKED only when every row has an answer

| Layer | What must be decided |
|---|---|
| Purpose | Primary visitor, the one action we want, how we know it worked. |
| Structure | Section order; what sits above the fold on phone, iPad and desktop. |
| Layout | Grid, max widths, spacing, per breakpoint (320, 390, 768, 1024, 1440). |
| Copy | Real headline, subline, CTA labels and microcopy in Vish's voice. No lorem ipsum. |
| Type | Which styles from the type scale, sizes per breakpoint. |
| Colour | Surfaces, accents, borders, in each theme. |
| Imagery | Which real assets (photo, mascot pose, tool screenshots), alt text, dark-mode versions. |
| Motion | For each animation: trigger, duration, easing, distance, and what reduced motion shows instead. |
| Interaction | Hover, focus, active, disabled; tap on touch; keyboard order. |
| States | Loading, empty, error, success, offline, no WebGL. |
| Links | Which existing URLs and anchors land here; any redirects. |
| Performance | Asset weight budget; what's lazy-loaded. |
| Accessibility | Contrast, focus ring, labels, 44px touch targets. |

## The global system is LOCKED when these are decided

Font families and weights (with licences and self-hosting), type scale, colour tokens for each theme, spacing and radius scale, borders and elevation, icon set, motion tokens (durations, easings, stagger), focus ring, buttons, cards, chips, form fields, header and dock, phone menu, footer, theme switch behaviour, sound control, assistant launcher, logo lockup, favicon and social preview images, and LinkedIn carousel and Instagram templates that use the same tokens.

## Don'ts

- No site code, deploys, purchases, account changes, publishing or messages to anyone before "approved".
- Don't reopen APPROVED decisions without a reason and a side-by-side comparison.
- Don't use generated stand-in characters. Use the real PNGs in `assets/mascot/`.
- Don't commit prices, legal or permit details, or private client data (the repo is public).
- Don't make it cluttered. When in doubt, remove.
- Don't claim something is built when it's only designed.
