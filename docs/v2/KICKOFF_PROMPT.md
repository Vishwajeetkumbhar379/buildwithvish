# Kickoff prompt for the Build with Vish 2.0 design interview

**Where to run it:** a NEW Claude Code session (claude.ai/code, or Code in the Claude app on the iPad) with only the GitHub repo `Vishwajeetkumbhar379/buildwithvish` selected, on the most capable model. Claude Code can read the repo and the live site, show storyboards as Design artifacts you can open and comment on from the iPad, build interactive prototypes, and commit the decision register.

**Attach to the same message:**
- the 2.0 storyboard PDF (it stays out of the repo because it has prices and private details);
- optional: your ChatGPT conversation export, earlier Claude chats, `Vish_Mascot_Claude_Guide.md`, the Emergent DOCX.

The mascot PNGs, reference images and v1 screenshots are already in the repo; you don't need to attach them.

---

I want to plan Build with Vish 2.0 with you. This is a DESIGN INTERVIEW. Do not write site code, change the live site, deploy, buy or publish anything until I say "approved" for the complete design.

Before your first reply, read everything:
1. All of `docs/v2/` in this repo: `CONTEXT.md` (who I am, how v1 was built, what exists, my preferences, the contradictions), `INTERVIEW_GUIDE.md` (how to run this), `DECISIONS.md` (what's already approved), the real mascot in `docs/v2/assets/mascot/` (31 PNGs) and `assets/reference/`, and the v1 screenshots in `docs/v2/archive/`.
2. The attached storyboard PDF, all 62 pages, and any chats I attach. The PDF is my brief from a long session with ChatGPT: a starting point, not a finished spec. Challenge weak ideas and suggest better ones.
3. The live site buildwithvvish.com, the code in `src/`, and my portfolio vishkumbhar.netlify.app.

Then brainstorm with me in depth before you create anything final:
- **First reply:** a short audit brief: what you inspected, what's missing, what to keep, improve or replace from v1, and the contradictions. Ask the most important ones as tappable questions.
- **Then one page at a time**, in the order in `INTERVIEW_GUIDE.md`: brand foundation first (fonts, colours, light/dark, logo), then Welcome, Services, Work, Journey, Learn, About, Contact, then the global elements (navigation, assistant, sound, theme, footer).
- **For every page:** show me 2 to 3 genuinely different directions on a Design artifact I can open on my iPad (phone, iPad and desktop artboards; dark, plus light if we keep it). Recommend one with reasons. Then ask me a few tappable questions.
- **A page is only LOCKED** when everything in the lock checklist is decided: layout per screen size, real copy, fonts, colours, images, every animation (trigger, timing, easing, reduced-motion version), interactions, states, and which existing URLs land there. Don't move on until the current page is locked, unless I say so.
- **Prototype the hard parts** as private interactive artifacts before I approve them: the 3D mascot (it must look like the real mascot; eye and head tracking, the wave, phone and no-WebGL fallbacks) and the two globe-to-map Journey entrances. Be honest about what a real 3D version of my mascot takes.
- **Once fonts and colours are locked,** put them in a Design System artifact so the site, LinkedIn and Instagram share one system.
- **Update `docs/v2/DECISIONS.md` after every round** and commit it. No prices or legal details in the repo: it's public.
- **Every existing guide, article, project, carousel, Build Notes issue, tool and URL must survive.** My earlier preferences still apply unless I change them. Keep it clean, never cluttered.

At the end: one integrated walkthrough of every page for my "approved". Only then propose the build plan and a staging version. Publishing needs a separate "approved".

I only have an iPad, so everything you show me or ask me to do must work there.
