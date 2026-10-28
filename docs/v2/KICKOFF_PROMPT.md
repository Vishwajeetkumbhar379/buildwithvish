# Kickoff prompt for the Build with Vish 2.0 design interview

Paste the text below as the first message of a NEW Claude Code session that has the GitHub repo `Vishwajeetkumbhar379/buildwithvish` attached. Attach these to the same message:
- the 2.0 storyboard PDF;
- the mascot files: the 31 transparent PNGs, Vish_Mascot_Reference.pdf and Vish_Mascot_Claude_Guide.md.

---

I want to plan Build with Vish 2.0 with you. This is a DESIGN INTERVIEW first. Do not write site code, change the live site, deploy or buy anything until I say "approved" for the complete design.

Before your first reply:
1. Read `docs/v2/CONTEXT.md` in the repo completely. It tells you how v1 was built, what exists now (82 guides, 31 articles, 8 projects, 8 carousels, 6 Build Notes issues, the tools, the newsletter and Instagram automations), my preferences, and 9 contradictions you must resolve with me.
2. Read the attached storyboard PDF completely. It's my brief from a long session with ChatGPT. Treat it as the starting point, not a finished spec, and challenge weak ideas.
3. Look at the real live site (buildwithvvish.com) and the code in `src/`, and at my mascot files.

Use Claude Design for the visuals:
- Put every page's storyboard and alternatives on a **Design** artifact (canvas with artboards for phone, iPad and desktop) that I can open and comment on from my iPad.
- Once fonts and colours are locked, record them in a **Design System** artifact for Build with Vish, so the site, LinkedIn and Instagram all use one system.
- Use working prototypes, as private artifacts, only for things a still frame can't show: mascot gaze, globe entrance, transitions.

Then interview me like a creative director:
- **Start with a short brief:**
  - what you inspected;
  - what's missing;
  - what to keep, improve or replace from v1;
  - the contradictions list.
- **Then go one page at a time:** Welcome, Services, Work, Journey, Learn, About, Contact, then global elements (navigation, chat assistant, sound, theme).
  - Show me 2 to 3 genuinely different directions as visual prototypes I can open on my iPad, in dark mode, plus light if we keep it, and in mobile and desktop.
  - Recommend one, with reasons.
  - Ask me only a few tappable questions per round.
- **Lock everything explicitly:** layout, copy tone, animations and timing, fonts, colours, spacing, icons, sounds, and how each page behaves on phone, iPad and desktop.
- **Keep a decision register** (APPROVED / PROPOSED / REJECTED / SUPERSEDED / NEEDS PROTOTYPE) in `docs/v2/DECISIONS.md` and update it after every round.
  - The repo is public, so keep prices and private details out of committed files.
- **Prototype the hard parts separately before approval:**
  - the 3D mascot: identity match, eye and head tracking, wave, and fallbacks;
  - the globe-to-map Journey entrances.
- **All existing articles, guides, tools and URLs must survive.** My earlier preferences still apply unless I change them.

Only after I approve the full integrated design: propose the build plan and a staging version. Publishing needs a separate "approved".

I only have an iPad, so everything you ask me to look at or do must work there.
