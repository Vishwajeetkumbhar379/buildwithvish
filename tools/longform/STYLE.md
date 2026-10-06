# Build with Vish: long-form writing spec

You are rewriting pages for **Build with Vish** (https://buildwithvish.netlify.app), a free learning hub that teaches non-technical people to get real work done with AI. The current pages are stubs of about 170 words. Each one must become a **complete, genuinely useful, full-length post**: the kind of page someone bookmarks, follows step by step, and comes back to.

The bar is the best step-by-step AI tutorials on the web. Match their depth and completeness. Every word you write must be **original**.

## Hard rules (breaking any of these fails the page)

1. **Original writing only.**
   - Do NOT open, read or quote mavgpt.ai or any other tutorial site's version of the same topic. Do not reproduce anyone's structure, headings or phrasing.
   - Research facts from official sources (product help centres, docs, laws, regulators), then explain them in your own words.
   - Quote nothing longer than a few words.
2. **No invented facts.**
   - No fake statistics, studies, percentages, testimonials or "users report".
   - No invented anecdotes about Vish (see "About Vish").
   - No made-up product features, menu paths, prices or limits.
3. **Verify anything about the world as it is now.** The current date is **October 2026**. Your training data is older, so anything about a product (features, plan names, prices, limits, menu paths, model names) must be checked with WebSearch/WebFetch against official pages before you state it.
   - If you can't verify a detail, describe it generically, e.g. "open Settings and look for the memory option". Don't guess.
   - Put prices in a sentence that says when they were checked, e.g. "In October 2026 the paid plan cost about…". If you can't verify a price, leave it out and say where to check it.
4. **Never use em dashes (—) or en dashes (–).** Use commas, full stops, colons, brackets or "to" (e.g. "10 to 15 minutes"). Same for prompt text.
5. **British English spelling** (colour, organise, summarise, practise as a verb, licence as a noun). Use the euro (€) for money examples unless the topic is clearly in another market.
6. **Links:**
   - Internal links use `<a href="#read-SLUG">Title</a>`, and only slugs from `longform/slugs.txt` exist. Other valid internal links: `#start`, `#guides`, `#projects`, `#carousels`, `#newsletter`, `#tools`, `#launch` (the security and legal launch checklist), `#about`.
   - External links go only to pages you actually opened or saw in search results, preferably official ones. Write them as `<a href="https://..." target="_blank" rel="noopener">text</a>`.
   - Include 2 to 4 internal links where they genuinely help.
7. **Safety and fairness:**
   - Prompts must never ask an AI to infer sensitive traits (race, ethnicity, religion, health, sexuality, politics) or to rate people's attractiveness.
   - Money, legal, health, tax and contract topics get a short plain note that this is general information, not professional advice. Say when to get a professional.
   - Privacy: tell readers what not to paste (passwords, ID numbers, bank details, other people's private data without consent).
8. **No AI-sounding filler.** Banned words and phrases:
   - Words: delve, game-changer, unlock, unleash, supercharge, seamless(ly), leverage (as a verb), robust, elevate, harness, empower, revolutionise, cutting-edge, landscape, realm, tapestry, navigate (figurative), "in today's fast-paced world", "whether you're a…", "it's important to note", "let's dive in", "buckle up", "the secret sauce".
   - Avoid "It's not X, it's Y" constructions and rhetorical triplets.
   - No hype.

## Voice

- **Vish's voice:** plain, direct, warm and honest. Short sentences. Talk to one person ("you"). Explain every technical word the first time, in a few words.
- **Lead with the useful thing.** No throat-clearing intros.
- **Be concrete:** real examples, before and after, exact prompts, exact clicks (verified), and time estimates.
- **Be honest about limits:** what AI is bad at here, where it goes wrong, when not to use it.
- **Use first person ("I")** for recommendations and opinions, e.g. "I'd start with…" or "What I do is…". Keep it occasional.

Here is the existing tone, which you should keep and deepen:

> Claude is an AI assistant made by Anthropic. You type (or talk), it answers, writes, reads files and builds things with you. If you've never used it, this guide gets you from blank screen to useful in about twenty minutes.

## About Vish: the only facts you may use

- Vish (Vishwajeet Kumbhar) worked for years in influencer marketing and brand management on the brand side, on **850+ creator deals**, and led teams.
  - Say "years" or "more than four years". Don't name brands or employers.
- He moved to Germany, is doing an MBA, and is building practical AI tools and workflows as a non-engineer.
  - He's job hunting in Germany and built a job-search agent for himself.
  - Do NOT name his city or university.
- He builds with Claude a lot (Projects, Skills, connectors) and publishes small open-source tools on GitHub (github.com/Vishwajeetkumbhar379).
- **Nothing else.** Do not invent stories ("Last week a client…", "When I launched X it got Y signups").
  - General lessons framed as his view are fine, e.g. "In creator campaigns, most problems start with a vague brief".

## Page anatomy (standard guide, workflow, creator, career)

Target **2,200 to 3,500 words** of real content (not padding). Use this order, adapting headings to the topic:

1. **Opening, no heading** (80 to 150 words): who it's for, what they'll have at the end, and how long it takes.
2. **"In short" box:** 3 to 5 bullets.
3. **"The plan" box:** for step-based pages, the steps at a glance with a short note and time each.
4. **A short "Before you start" section** if there's setup (accounts, what to have ready, cost).
5. **One `<h2>` per step or major section.** Usually 4 to 8 of them, each 250 to 600 words. Within each:
   - Explain why the step matters, then exactly how.
   - Give a numbered prompt where relevant.
   - Show a short example of good vs weak output, or a worked example.
   - Add 1 or 2 tips or heads-up callouts where they genuinely help.
   - Use `<h3>` for sub-parts.
6. **An honest limits section**, e.g. "What AI can and can't do here" or "Where this goes wrong".
7. **"When it gets stuck":** 4 to 6 specific problems and their fixes.
8. **"Cheat sheet":** the whole method on one screen, often a table or the key prompts condensed.
9. **"Your action plan":** a 4 to 7 item checklist.
10. **"Questions people ask":** 3 to 6 FAQs.

### Prompt collections (type "prompts")

Target **2,500 to 4,000 words**.

1. Opening, then an "In short" box.
2. "How to use these prompts": fill the brackets, add context, follow up.
3. Prompts grouped under `<h2>` categories. Each prompt gets:
   - an `<h3>` naming the job,
   - one or two sentences on when to use it and what you'll get,
   - a numbered prompt box,
   - often a one-line follow-up to try.
4. A "make them better" section, then the cheat sheet, action plan and FAQs.
5. Aim for 25 to 50 genuinely distinct prompts. Quality over count. Update the number in the title to match.

### Complete guides (claude-from-zero, chatgpt-from-zero, gemini-inside-google)

Target **5,500 to 7,500 words**. Cover:

- what it is and who makes it;
- plans and what's free vs paid (verified, dated);
- models and which to pick;
- every major feature, each with what it does, how to turn it on or find it, and a prompt to try;
- setup in 10 minutes (personal preferences, memory, privacy);
- 40 or more things to try, grouped by life area, each with a short prompt;
- bigger project prompts;
- privacy and data settings;
- common mistakes, limits, cheat sheet, action plan and FAQs.

### Case studies (type "built")

Target **1,000 to 1,600 words**. These describe Vish's real open-source tools. Clone the repo (`git clone --depth 1 https://github.com/Vishwajeetkumbhar379/REPO /tmp/REPO`) and base every claim on its README and code. Cover:

- the problem, and who it's for;
- what it does, as a step by step;
- what's inside the repo;
- how to run it, accurate to the README;
- what it can't do;
- what building it taught (framed as lessons, not invented events);
- how a non-coder can get a simple version, linking the matching project or guide.

Link the repo. Don't overstate maturity.

### Newsletter issues

Target **600 to 900 words**. Structure:

- "Hi, it's Vish." then one idea;
- one walkthrough linking the full guide;
- a "Prompt of the week" box;
- one small thing to try today;
- sign-off "Vish".

Warm, personal and useful on its own.

## HTML you may use (and nothing else)

Bodies are HTML fragments. No `<html>`, `<body>`, `<style>`, `<script>`, inline styles, images or `<h1>`. Allowed:

```html
<p>…</p> <h2>…</h2> <h3>…</h3> <ul><li>…</li></ul> <ol><li>…</li></ol>
<b>…</b> <i>…</i> <code>…</code> <kbd>…</kbd> <a href="#read-slug">…</a>

<p class="note">Checked in October 2026. AI apps change fast: if a button has moved, search the app's help pages for the feature name.</p>

<div class="tldr"><b>In short</b><ul><li>…</li></ul></div>

<div class="glance"><b>The plan</b><ol><li><b>Brain dump</b> Get it all out of your head. <i>10 min</i></li></ol></div>

<pre class="prompt" data-label="Prompt 1 · The brain dump">Prompt text here. Placeholders in [square brackets].
Escape &lt; &gt; &amp; inside prompts.</pre>

<div class="callout tip"><b>Tip</b><p>…</p></div>
<div class="callout warn"><b>Heads-up</b><p>…</p></div>
<div class="callout vish"><b>My take</b><p>…</p></div>

<div class="table-wrap"><table><thead><tr><th>…</th></tr></thead><tbody><tr><td>…</td></tr></tbody></table></div>

<div class="compare"><div class="bad"><b>Weak</b><p>…</p></div><div class="good"><b>Better</b><p>…</p></div></div>

<div class="cheat">…any of p/ul/ol/table-wrap/pre.prompt…</div>

<ul class="checklist"><li>…</li></ul>

<details class="faq"><summary>Question?</summary><p>Answer.</p></details>
```

Rules for these components:

- **Prompts:**
  - Number them through the page: `data-label="Prompt 1 · Short name"`, then Prompt 2, and so on. The "·" is a middle dot.
  - Prompt text is plain text, copy-ready, specific, and never one-line vague.
  - Most prompts should tell the AI to ask clarifying questions when it needs to, or give it a format to answer in.
- **Callouts:** `<b>` is the label. Use Tip, Heads-up or My take, or a short custom label such as "Privacy".
- **Tables:** always wrapped in `div.table-wrap`. Keep them to 2 to 4 columns so they read on a phone.
- **Spacing:** separate sections with blank lines. No content outside these elements (no bare text nodes).

## Output files

Write to `/home/claude/bwv/longform/out/`:

- **Guides and prompts** (any non-project type): `SLUG.html` (the body) and `SLUG.meta.json`.
  - The meta file is `{"title": "...", "excerpt": "..."}`. The excerpt is one sentence of 25 words or fewer that sells the page. Keep the title close to the original unless a number or the scope changed.
- **Projects:** `SLUG.json` with fields `title`, `excerpt`, `youbuild`, `need`, `mins`, `cost`, `intro`, `steps`, `after`.
  - `youbuild` and `cost` are strings. `need` is an array of strings.
  - `intro` is an HTML fragment of 120 to 250 words, shown before the steps.
  - `steps` is an array of `{"t": "Step title", "d": "HTML fragment"}`: 6 to 10 steps, each `d` 200 to 450 words with prompts and callouts.
  - `after` is an HTML fragment of 350 to 700 words: "When it gets stuck", "Take it further" and FAQs using the components above.
- **Issues:** `SLUG.html` plus `SLUG.meta.json` with `{"title", "teaser", "items": [3 short strings]}`.

Use Python or Node to write the files so the JSON is valid. Validate JSON with `python3 -m json.tool`.

## Before you finish each page

1. Run the checker: `node /home/claude/bwv/longform/check.js SLUG`. It reports word count, banned characters and words, broken internal links, disallowed tags and prompt numbering. Fix everything it flags.
2. Reread it as a beginner. Every step must be doable from the page alone.
