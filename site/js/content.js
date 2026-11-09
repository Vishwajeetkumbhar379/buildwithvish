/* Build with Vish: every guide, project, prompt pack, tool page and news post, for the reader. */
(function () {
"use strict";
/* ===== Build with Vish: original guides (all writing is Vish's own) ===== */
const TOOLS = [
  { id: "all", label: "All tools" }, { id: "claude", label: "Claude" }, { id: "chatgpt", label: "ChatGPT" },
  { id: "gemini", label: "Gemini" }, { id: "multi", label: "Any AI" }
];
const TYPES = [
  { id: "all", label: "Everything" }, { id: "guide", label: "Guides" }, { id: "project", label: "Projects" },
  { id: "prompts", label: "Prompts" }, { id: "workflow", label: "Workflows" }, { id: "creator", label: "Creator marketing" }, { id: "career", label: "Career" }
];

const GUIDES = [
/* ---------- LEARNING ---------- */
{ slug: "claude-from-zero", type: "guide", tools: ["claude"], level: "Beginner", mins: 9, rank: 1, start: true,
  title: "Claude from zero: what it is and how to start",
  excerpt: "What Claude is good at, the five features worth learning first, and fifteen first things to try.",
  body: `
<p>Claude is an AI assistant made by Anthropic. You type (or talk), it answers, writes, reads files and builds things with you. If you've never used it, this guide gets you from blank screen to useful in about twenty minutes.</p>
<h2>What Claude is good at</h2>
<ul>
<li><b>Writing that sounds like you.</b> Emails, posts, reports, cover letters. It follows a style well once you show it one.</li>
<li><b>Reading long things.</b> Drop in a contract, a report or a 40-page PDF and ask questions about it.</li>
<li><b>Building small things.</b> A web page, a calculator, a chart, a checklist. You describe it, it makes it.</li>
<li><b>Thinking out loud with you.</b> Plans, decisions, "what am I missing?" questions.</li>
</ul>
<h2>The five features to learn first</h2>
<div class="table-wrap"><table>
<thead><tr><th>Feature</th><th>What it does</th><th>Try this</th></tr></thead>
<tbody>
<tr><td>Chat</td><td>The main conversation</td><td>Ask it to explain something you've been avoiding</td></tr>
<tr><td>File upload</td><td>Reads PDFs, docs, images and spreadsheets</td><td>Upload a bill or contract and ask what's unusual</td></tr>
<tr><td>Projects</td><td>A folder with its own instructions and files that every chat inside can see</td><td>One Project for work, one for your side project</td></tr>
<tr><td>Artifacts</td><td>Finished things it builds next to the chat: pages, documents, tools</td><td>"Make me a packing checklist I can tick off"</td></tr>
<tr><td>Connectors</td><td>Lets Claude use your other apps, like your calendar or Google Drive</td><td>"What's on my calendar this week and what should I prepare?"</td></tr>
</tbody></table></div>
<p class="note">Features and menu names change often. If something isn't where this guide says, check Claude's settings or help pages.</p>
<h2>Set it up in five minutes</h2>
<p>In settings you can tell Claude about yourself and how you like answers. Keep it short:</p>
<pre class="prompt">About me: I work as [job] and I'm learning to use AI for [goal].
How I like answers: lead with the answer, keep it short, use a table when comparing things, and say when you're unsure instead of guessing.</pre>
<h2>Fifteen first things to try</h2>
<ol>
<li>"Explain [thing you've been avoiding] like I'm smart but new to it."</li>
<li>Upload a letter you didn't understand and ask "What does this want from me, and by when?"</li>
<li>"Turn this messy list into a plan for this week." Paste the list.</li>
<li>"Write a polite reply saying no to this, without burning the bridge."</li>
<li>"Make me a simple budget tracker I can use in the browser."</li>
<li>"Here's my CV. What would a recruiter skip?"</li>
<li>"Plan three dinners from what's in my fridge: [items]."</li>
<li>"Quiz me on [topic], one question at a time."</li>
<li>"Turn this voice-note transcript into a clean email."</li>
<li>"What questions should I ask before signing this?" with the contract uploaded.</li>
<li>"Rewrite this so it's half as long."</li>
<li>"Give me three ways to solve this, and the downside of each."</li>
<li>"Build a one-page website for [idea]." Then ask for changes.</li>
<li>"What did you assume that I didn't tell you?" after any answer.</li>
<li>"Check this for mistakes before I send it."</li>
</ol>
<h2>Three habits that make it ten times better</h2>
<ul>
<li><b>Give context.</b> Who it's for, why, and what good looks like.</li>
<li><b>Ask for options.</b> Three drafts beat one.</li>
<li><b>Push back.</b> The second and third reply are where the good stuff is. See <a href="#read-one-line-follow-ups">12 follow-ups that fix weak answers</a>.</li>
</ul>` },

{ slug: "chatgpt-from-zero", type: "guide", tools: ["chatgpt"], level: "Beginner", mins: 8, rank: 2, start: true,
  title: "ChatGPT from zero: a plain-English starter",
  excerpt: "The parts of ChatGPT that matter for normal people, the settings to change first, and prompts to copy.",
  body: `
<p>ChatGPT is OpenAI's assistant and the one most people try first. It's a fast all-rounder: questions, writing, images, voice chats on the go. Here's what to learn first.</p>
<h2>The features worth your time</h2>
<div class="table-wrap"><table>
<thead><tr><th>Feature</th><th>Use it for</th></tr></thead>
<tbody>
<tr><td>Voice mode</td><td>Talking through a problem while you walk. Great for practising a presentation.</td></tr>
<tr><td>Images</td><td>Creating images from a description, or asking about a photo you upload</td></tr>
<tr><td>Web search</td><td>Questions about today: prices, news, opening times. Open the sources it cites.</td></tr>
<tr><td>Projects</td><td>Keeping chats and files for one topic together</td></tr>
<tr><td>Custom instructions and memory</td><td>Telling it once who you are and how you like answers</td></tr>
</tbody></table></div>
<p class="note">Plans and features change. Check what your plan includes before paying.</p>
<h2>Change these settings first</h2>
<ul>
<li><b>Personalisation:</b> add a short "about me" and answer style, like in the box below.</li>
<li><b>Data controls:</b> decide whether your chats can be used to improve the models. See <a href="#read-ai-privacy-settings">privacy settings to check</a>.</li>
<li><b>Memory:</b> look at what it has remembered and delete anything you don't want kept.</li>
</ul>
<pre class="prompt">I'm [name], I work as [job]. I mostly use you for [3 things].
Answer in plain English, lead with the answer, and use bullet points for steps.
If something depends on my country, ask me where I am. I'm in [country].</pre>
<h2>Prompts to copy</h2>
<pre class="prompt">I need to [goal]. Ask me 3 questions first, then give me a step-by-step plan I can finish this week.</pre>
<pre class="prompt">Here's a photo of [thing]. What is it, what's it for, and what should I watch out for?</pre>
<pre class="prompt">Let's practise. You're the interviewer for a [job] role. Ask one question at a time and give me honest feedback after each answer.</pre>
<h2>When to use something else</h2>
<p>For long documents and building small tools I prefer Claude. If your life runs on Google Docs and Gmail, Gemini sits right inside them. More in <a href="#read-pick-your-ai-by-job">Pick your AI by job</a>.</p>` },

{ slug: "gemini-inside-google", type: "guide", tools: ["gemini"], level: "Beginner", mins: 6, rank: 6,
  title: "Gemini for people who live in Google",
  excerpt: "If your work is Gmail, Docs and Sheets, here's how to get AI help without leaving them.",
  body: `
<p>Gemini is Google's AI assistant. Its biggest advantage isn't being smarter than the others. It's being where your stuff already is.</p>
<h2>Where it helps most</h2>
<ul>
<li><b>Gmail:</b> summarise a long thread, draft a reply in your tone.</li>
<li><b>Docs:</b> write a first draft, rewrite a paragraph, shorten a section.</li>
<li><b>Sheets:</b> explain a formula, build one from a description, spot patterns in a table.</li>
<li><b>Drive:</b> find "that file from March about the budget" by describing it.</li>
</ul>
<p class="note">What's available depends on your Google account type and plan, and on whether your company has turned it on.</p>
<h2>Prompts that work well inside Google</h2>
<pre class="prompt">Summarise this email thread in 5 bullets: what was decided, what's still open, and what I need to do.</pre>
<pre class="prompt">Write a Sheets formula that adds up column D only where column B says "Paid". Explain it in one line.</pre>
<pre class="prompt">Turn these meeting notes into a one-page doc with Decisions, Actions (owner + date) and Open questions.</pre>
<h2>One rule for spreadsheets</h2>
<p>Let the AI write formulas, not answers. A formula you can check beats a number you can't. I use the same rule for every report: <a href="#read-report-that-writes-itself">the sheet calculates, the AI writes</a>.</p>` },

{ slug: "pick-your-ai-by-job", type: "guide", tools: ["multi"], level: "Beginner", mins: 5, rank: 3, start: true,
  title: "ChatGPT, Claude or Gemini? Pick by job, not by hype",
  excerpt: "A plain comparison by task, so you stop paying for three tools that do the same thing.",
  body: `
<p>Every week a new "this AI beats that AI" post goes viral. The better question is which tool fits which job. Here's how I split it. Features change fast, so check each tool's current plan before you pay.</p>
<div class="table-wrap"><table>
<thead><tr><th>Job</th><th>My pick</th><th>Why</th></tr></thead>
<tbody>
<tr><td>Long writing, reports, briefs</td><td>Claude</td><td>Holds a voice well across long documents and follows detailed instructions</td></tr>
<tr><td>Quick ideas, images, voice on the go</td><td>ChatGPT</td><td>Fast all-rounder with strong image and voice features</td></tr>
<tr><td>Anything inside Docs, Sheets, Gmail</td><td>Gemini</td><td>Lives where many people already work</td></tr>
<tr><td>Research with sources</td><td>Any of them, web search on</td><td>Always open the sources. Never repeat a stat you haven't clicked.</td></tr>
<tr><td>Building small tools and pages</td><td>Claude</td><td>Strong at turning a plain description into a working page or tool</td></tr>
</tbody></table></div>
<h2>The rule I follow</h2>
<p>Pay for one, learn it properly, and use a second one's free tier as a fact-checker. Two tools you know well beat five you half-use.</p>
<h2>A ten-minute test</h2>
<pre class="prompt">Here's a real task from my week: [paste it].
Do the first draft I'd actually send.
After the draft, list the 3 assumptions you made that I should check.</pre>
<p>Run the same prompt in each tool and compare. You'll know which one thinks like you.</p>` },

{ slug: "brief-ai-like-an-agency", type: "guide", tools: ["multi"], level: "Beginner", mins: 5, rank: 4, start: true,
  title: "Brief AI the way you'd brief a pro",
  excerpt: "The six-box brief I used with creators for five years now powers every prompt I write.",
  body: `
<p>I've written hundreds of creator briefs. The bad ones failed the same way: vague goal, no audience, no example. Prompts fail for exactly the same reasons, so I use the same structure for both.</p>
<h2>The six boxes</h2>
<ol>
<li><b>Goal.</b> One clear outcome. "More people saving my posts", not "better content".</li>
<li><b>Audience.</b> Who reads this, what they know, what they care about.</li>
<li><b>Context.</b> Background, what's been tried, what flopped.</li>
<li><b>Constraints.</b> Length, tone, words to avoid, deadline.</li>
<li><b>Format.</b> Table, bullets, three options, a script with timings.</li>
<li><b>Example.</b> Something close to what you want. This box does the most work.</li>
</ol>
<h2>Copy this template</h2>
<pre class="prompt">GOAL: [one clear outcome]
AUDIENCE: [who, what they know, what they want]
CONTEXT: [background, what worked, what didn't]
CONSTRAINTS: [length, tone, words to avoid]
FORMAT: [exactly how you want the answer laid out]
EXAMPLE: [paste something close to what you want]

Before you start, ask me up to 3 questions if anything above is unclear.</pre>
<p>That last line matters. A good professional asks questions when a brief is fuzzy. Let the AI do the same instead of guessing.</p>
<h2>Why it works</h2>
<p>AI is very good at filling gaps, and that's the problem. Every empty box gets filled with the most average answer on the internet. Six filled boxes get you something that sounds like you.</p>` },

{ slug: "ai-privacy-settings", type: "guide", tools: ["multi"], level: "Beginner", mins: 5, rank: 9,
  title: "Five privacy settings to check in your AI apps",
  excerpt: "Training, memory, history, connected apps and shared links. Ten minutes, once.",
  body: `
<p>You don't need to be paranoid about AI. You do need to know what you've agreed to. These five checks take ten minutes. Names differ between apps and change over time, so look for the closest match in each app's settings.</p>
<ol>
<li><b>Model training.</b> Most apps have a setting about whether your chats can be used to improve their models. Decide on purpose rather than by default.</li>
<li><b>Memory.</b> If the app remembers things about you, open the memory list and delete anything you wouldn't want kept.</li>
<li><b>Chat history.</b> Delete old chats with personal documents in them. Some apps offer temporary chats that aren't saved.</li>
<li><b>Connected apps.</b> If you've connected email, calendar or drive, check what each connection can read and write. Remove the ones you don't use.</li>
<li><b>Shared links.</b> If you've ever shared a chat by link, check which links are still live.</li>
</ol>
<h2>What I never paste into any AI</h2>
<ul>
<li>Passwords, bank details, card numbers, ID numbers</li>
<li>Other people's private information without their OK</li>
<li>Company documents your employer hasn't approved for AI use</li>
</ul>
<h2>Ask the AI itself</h2>
<pre class="prompt">Walk me through the privacy and data settings in this app, one at a time. For each, tell me what it does and what most cautious users choose. If you're not sure where a setting is, say so.</pre>` },

{ slug: "hidden-ai-features", type: "guide", tools: ["multi"], level: "Beginner", mins: 6, rank: 7,
  title: "9 AI features most people never use",
  excerpt: "Upload, voice, projects, scheduled tasks and more. Small switches, big difference.",
  body: `
<p>Most people use AI like a search box. Type, read, leave. These features are in most major assistants and change what you can do. Availability depends on the app and your plan.</p>
<div class="table-wrap"><table>
<thead><tr><th>Feature</th><th>What to try</th></tr></thead>
<tbody>
<tr><td>1. Upload a photo</td><td>Snap a confusing form, a plant, a menu in another language</td></tr>
<tr><td>2. Voice conversation</td><td>Practise a hard conversation out loud before you have it</td></tr>
<tr><td>3. Projects</td><td>Keep one topic's files and instructions together so you stop re-explaining</td></tr>
<tr><td>4. Custom instructions</td><td>Tell it once how you like answers</td></tr>
<tr><td>5. Deep research</td><td>Ask for a sourced report on a question, then read the sources</td></tr>
<tr><td>6. Build a mini tool</td><td>"Make me a calculator for splitting rent fairly by room size"</td></tr>
<tr><td>7. Scheduled tasks</td><td>A daily summary or a weekly reminder the AI prepares for you</td></tr>
<tr><td>8. Connectors</td><td>Let it read your calendar or files, so answers use your real info</td></tr>
<tr><td>9. Edit and retry</td><td>Edit your earlier message instead of starting a new chat</td></tr>
</tbody></table></div>
<h2>The one to try today</h2>
<p>Number 6. Ask for a small tool you'd actually use. It's the moment most people realise this isn't just a chatbot.</p>
<pre class="prompt">Build me a simple tool that [does one thing, e.g. splits a bill between friends with different amounts]. Make it work on my phone and keep it to one screen.</pre>` },

/* ---------- PROMPTS ---------- */
{ slug: "everyday-life-prompts", type: "prompts", tools: ["multi"], level: "Beginner", mins: 6, rank: 5, start: true,
  title: "15 everyday prompts for normal life",
  excerpt: "Fridge dinners, confusing letters, hard messages, trip plans. Copy, paste, done.",
  body: `
<p>AI isn't only for work. These are the prompts I've sent friends and family who said "I don't know what to use it for". Swap the brackets.</p>
<h2>Home</h2>
<pre class="prompt">Here's what's in my fridge: [items]. Give me 3 dinners under 30 minutes, with a shopping list for anything missing.</pre>
<pre class="prompt">Make a weekly cleaning plan for a [size] flat, 20 minutes a day, so the weekend stays free.</pre>
<pre class="prompt">I want to save [amount] by [date]. Here are my monthly costs: [list]. Show me 3 realistic ways to get there.</pre>
<h2>Paperwork</h2>
<pre class="prompt">I'll upload a letter. Tell me in plain words: who sent it, what they want, by when, and what happens if I ignore it.</pre>
<pre class="prompt">Compare these two phone contracts over 24 months, including hidden costs. Which is cheaper and by how much?</pre>
<pre class="prompt">Help me write a short, polite complaint to [company] about [problem]. I want [outcome].</pre>
<h2>People</h2>
<pre class="prompt">I need to tell [person] [hard thing]. Write 3 versions: gentle, direct, and somewhere in between. Under 80 words each.</pre>
<pre class="prompt">Plan a birthday for [age, interests] with a budget of [amount]. Give me a timeline for the day.</pre>
<pre class="prompt">My [relative] wants to start using [app]. Write step-by-step instructions a beginner can follow, with no jargon.</pre>
<h2>Learning and travel</h2>
<pre class="prompt">Teach me [skill] in 30 days, 20 minutes a day. Give me a day-by-day plan and tell me how I'll know it's working.</pre>
<pre class="prompt">Plan 3 days in [city] for someone who likes [interests] and hates crowds. Include one rainy-day plan.</pre>
<pre class="prompt">I'm learning [language]. Talk to me like a friendly shopkeeper, correct my mistakes gently, keep it simple.</pre>
<h2>Thinking</h2>
<pre class="prompt">I'm deciding between [A] and [B]. Ask me 5 questions, then tell me which fits what I said and why.</pre>
<pre class="prompt">Here's my plan: [plan]. What could go wrong, and what's the cheapest way to test it first?</pre>
<pre class="prompt">Explain [news topic] neutrally: what happened, why people disagree, and what's still unknown.</pre>` },

{ slug: "marketing-prompts-i-use", type: "prompts", tools: ["multi"], level: "Intermediate", mins: 8, rank: 10,
  title: "20 prompts I use every week for marketing",
  excerpt: "Not a list of 500. The twenty I reach for every week, grouped by job.",
  body: `
<p>Each of these has earned its place by saving me real time on a real campaign. Swap the brackets.</p>
<h2>Planning</h2>
<pre class="prompt">Turn this goal into a 4-week content plan: [goal]. One row per post with format, hook, CTA and the metric it should move.</pre>
<pre class="prompt">Here are last month's results: [paste]. What are 3 things to do more of, 2 to stop, and 1 test to run next?</pre>
<pre class="prompt">Write a one-page campaign brief for [product] aimed at [audience] with a budget of [amount]. Include goal, KPIs, creator tiers and timeline.</pre>
<pre class="prompt">List 10 angles for marketing [product] that competitors aren't using. For each, say why it might fail.</pre>
<h2>Writing</h2>
<pre class="prompt">Rewrite this so a busy person gets the point in 5 seconds: [text]</pre>
<pre class="prompt">Give me 10 hooks for a Reel about [topic]. Under 8 words each. No questions, no "you won't believe".</pre>
<pre class="prompt">Turn this post into a 7-slide carousel. One idea per slide, max 25 words per slide: [post]</pre>
<pre class="prompt">Write the email subject line 8 ways: curious, direct, number-led, benefit-led, urgent, personal, funny, plain.</pre>
<pre class="prompt">Make this sound like a human wrote it. Remove filler, cut adjectives, vary sentence length: [text]</pre>
<h2>Creators and partners</h2>
<pre class="prompt">Score these creators against my brief from 1-10 on audience fit, content quality and engagement health. Explain each score: [brief] [creator notes]</pre>
<pre class="prompt">Draft a first DM to [creator] for [brand]. Friendly, specific about their content, under 70 words.</pre>
<pre class="prompt">Review this creator contract and flag anything about usage rights, exclusivity or payment terms that looks unusual: [contract]</pre>
<pre class="prompt">Write a creator brief for [campaign] with do's, don'ts, key message, mandatory ad label and deadline.</pre>
<h2>Reporting</h2>
<pre class="prompt">Here's campaign data: [paste]. Calculate reach, engagement rate, CPM and cost per engagement per creator. Table, ranked.</pre>
<pre class="prompt">Write the client summary for this report in 5 bullets. Results first, then learnings, then next steps: [data]</pre>
<pre class="prompt">Explain this drop in performance to a client without blaming anyone, and propose a fix: [situation]</pre>
<h2>Thinking</h2>
<pre class="prompt">Argue against my plan as a sceptical CMO. Be specific: [plan]</pre>
<pre class="prompt">What would have to be true for this campaign to fail? List the risks and how I'd spot each one early.</pre>
<pre class="prompt">I have 2 hours today. Here's my list: [tasks]. What first, what can AI draft, what should I drop?</pre>
<pre class="prompt">Explain [marketing concept] like I'm a smart intern on day one. Then give me one way to use it this week.</pre>` },

{ slug: "one-line-follow-ups", type: "prompts", tools: ["multi"], level: "Beginner", mins: 4, rank: 8,
  title: "12 follow-ups that fix weak AI answers",
  excerpt: "The first answer is a draft. These short replies turn it into something you can use.",
  body: `
<p>Most people take the first answer and leave. The value is in the second and third message. Keep these in your notes app.</p>
<div class="table-wrap"><table>
<thead><tr><th>Type this</th><th>When the answer is…</th></tr></thead>
<tbody>
<tr><td>"Shorter. Half the words, same meaning."</td><td>Bloated</td></tr>
<tr><td>"Give me the version an expert would write."</td><td>Generic</td></tr>
<tr><td>"What did you assume that I didn't tell you?"</td><td>Suspiciously confident</td></tr>
<tr><td>"Show this as a table."</td><td>A wall of text</td></tr>
<tr><td>"Give me 3 options that are actually different."</td><td>One idea in three outfits</td></tr>
<tr><td>"Now argue against it."</td><td>Too agreeable</td></tr>
<tr><td>"What would you cut first?"</td><td>Too long to act on</td></tr>
<tr><td>"Make it sound like a person talking."</td><td>Stiff</td></tr>
<tr><td>"Which part are you least sure about?"</td><td>Full of facts you can't check</td></tr>
<tr><td>"Turn this into steps I can do in the next hour."</td><td>Theory, no action</td></tr>
<tr><td>"Explain it with an example from [my life or job]."</td><td>Abstract</td></tr>
<tr><td>"Ask me 3 questions that would make this better."</td><td>Missing context</td></tr>
</tbody></table></div>
<p>None of these are tricks. They're the follow-ups you'd give a new colleague. AI just responds faster.</p>` },

{ slug: "brand-voice-without-ai-sound", type: "prompts", tools: ["multi"], level: "Intermediate", mins: 6, rank: 12,
  title: "Make AI write in your voice, not AI voice",
  excerpt: "Build a voice card from your best writing, then make the model check itself against it.",
  body: `
<p>You can spot AI writing from across the room: "unlock", "elevate", "in today's fast-paced world". The fix is a concrete picture of your voice, plus a list of things it's not allowed to do.</p>
<h2>Step 1. Feed it five good examples</h2>
<pre class="prompt">Here are 5 things I wrote that sound like me: [paste].
Build a voice card with:
- 5 traits, each with a "I'd say / I'd never say" example
- sentence length and rhythm
- words I use often, words I never use
- how I open and how I close</pre>
<h2>Step 2. Add a ban list</h2>
<p>Write down the words that make you wince. Add the usual AI suspects: unlock, elevate, seamless, game-changer, dive in, delve, journey, landscape.</p>
<h2>Step 3. Make it grade itself</h2>
<pre class="prompt">Using this voice card: [card]
Write [the piece].
Then grade your draft against each trait from 1-5, quote the weakest line, and rewrite it.</pre>
<h2>Step 4. Read it out loud</h2>
<p>The one step AI can't do for you. If you wouldn't say it to a person, cut it.</p>` },

{ slug: "product-photo-prompts", type: "prompts", tools: ["chatgpt", "multi"], level: "Beginner", mins: 5, rank: 14,
  title: "Product photo prompts for small shops",
  excerpt: "Five image prompts that make a phone photo look like a studio shoot. Plus what to avoid.",
  body: `
<p>If you sell anything online, AI image tools can turn a decent phone photo into a clean product shot. Use your real product photo as the starting image so what customers see matches what they get.</p>
<h2>Five scenes that sell</h2>
<pre class="prompt">Using my uploaded product photo, place the product on a clean stone surface with soft morning window light from the left. Keep the product's shape, colours and label exactly as they are. Square format.</pre>
<pre class="prompt">Show my product in use by a person's hands, in a bright kitchen, shallow depth of field. Product unchanged and in sharp focus.</pre>
<pre class="prompt">Flat lay from above: my product in the centre with 4 related items around it, plenty of empty space at the top for text. Neutral colours.</pre>
<pre class="prompt">My product on a solid [brand colour] background with a soft shadow, centred, for a marketplace listing.</pre>
<pre class="prompt">A seasonal version: my product on a wooden table with subtle [season] details in the background, warm light, nothing covering the label.</pre>
<h2>Rules I follow</h2>
<ul>
<li>Never change what the product looks like. That's a returns problem waiting to happen.</li>
<li>Don't generate fake customers or fake reviews in images.</li>
<li>Check marketplace rules: some require plain white backgrounds for the main image.</li>
</ul>` },

/* ---------- WORKFLOWS ---------- */
{ slug: "no-code-ai-workflows", type: "workflow", tools: ["multi"], level: "Beginner", mins: 6, rank: 11,
  title: "5 AI workflows you can set up today, no code",
  excerpt: "Small automations that each save an hour a week. Nothing that needs a developer.",
  body: `
<p>I'm a marketer, not an engineer. Everything below I set up myself, mostly from an iPad.</p>
<h2>1. Meeting notes to action list</h2>
<pre class="prompt">From this meeting transcript, list: decisions made, action items with owner and deadline, and open questions. Table format. [transcript]</pre>
<h2>2. A week of content from one idea</h2>
<p>Ask for a table with platform, format, hook and call to action per day. One strong idea, seven posts.</p>
<h2>3. Inbox triage</h2>
<p>With an email connector, ask your AI to find unanswered messages from this week and draft replies to the three most urgent. You still press send.</p>
<h2>4. Monthly competitor check</h2>
<p>Give AI three competitor websites and ask what changed in their messaging, offers and prices. Ask it to say where it found each point.</p>
<h2>5. Zapier for boring handoffs</h2>
<p>New form entry, add it to a sheet, send a message, draft a welcome email. Zapier connects thousands of apps with no code. There's a full walkthrough in <a href="#read-meeting-notes-to-tasks">Automate meeting notes into tasks</a>.</p>
<h2>Where to start</h2>
<p>Pick the task you complained about most last week. Automate only that. Then the next.</p>` },

{ slug: "report-that-writes-itself", type: "workflow", tools: ["claude", "gemini"], level: "Intermediate", mins: 6, rank: 15,
  title: "A weekly report that writes itself",
  excerpt: "The sheet calculates, the AI writes. The one rule that makes AI reporting safe.",
  body: `
<p>At my last agency, Monday mornings went to copying numbers into slides. Here's the setup I wish I'd had.</p>
<h2>The important rule</h2>
<p>The AI never does the maths. The spreadsheet does the maths, and the AI only writes words about numbers it's given. That one rule removes most of the risk of AI reports.</p>
<h2>The no-code version</h2>
<ol>
<li>Keep your data in a Google Sheet, one row per item (post, campaign, product).</li>
<li>Add formula columns for the numbers you report every week.</li>
<li>Each Monday, paste the table into a Claude Project (or use Gemini inside Sheets) with this prompt:</li>
</ol>
<pre class="prompt">Here is this week's calculated table: [paste].
Do not recalculate anything. Use only these numbers.
Write a summary: 3 wins, 2 concerns, and one recommendation per row with a one-line reason.</pre>
<h2>Make it automatic later</h2>
<p>Once the prompt works three weeks in a row, move it to a scheduled task or a Zapier step so it runs before you wake up.</p>` },

{ slug: "connectors-and-mcp", type: "workflow", tools: ["claude", "multi"], level: "Intermediate", mins: 5, rank: 16,
  title: "Connectors and MCP, explained simply",
  excerpt: "How AI assistants plug into your calendar, files and apps, and how to do it safely.",
  body: `
<p>MCP stands for Model Context Protocol. It's an open standard, introduced by Anthropic in late 2024, that lets an AI assistant use your other tools: calendar, documents, task lists, design apps.</p>
<h2>The plain-English version</h2>
<p>Think of it as a universal plug. Before, every AI needed a custom connection to every app. With MCP, an app builds one connector and any compatible assistant can use it. In everyday apps you'll usually just see them called "connectors".</p>
<h2>What it changes</h2>
<ul>
<li>"What's on my calendar this week?" gets your real calendar, not a guess.</li>
<li>"Draft a reply to the last email from Sara" can read the actual email.</li>
<li>"Add these three tasks to my to-do app" happens in one request.</li>
</ul>
<h2>Using connectors safely</h2>
<ul>
<li>Connect only what you'd trust a new assistant to touch.</li>
<li>Check what a connector can <b>write</b>, not just read.</li>
<li>Ask the AI to show you a draft before it sends or deletes anything.</li>
</ul>
<pre class="prompt">Before you take any action in my apps, show me exactly what you're about to do and wait for me to say yes.</pre>` },

{ slug: "documents-second-opinion", type: "workflow", tools: ["multi"], level: "Beginner", mins: 5, rank: 13,
  title: "5 documents worth a second opinion from AI",
  excerpt: "Rental contracts, phone plans, insurance, payslips and terms. What to ask about each.",
  body: `
<p>AI won't replace a lawyer or an accountant. It's very good at spotting what you should ask one. Remove personal numbers before uploading.</p>
<div class="table-wrap"><table>
<thead><tr><th>Document</th><th>What to ask</th></tr></thead>
<tbody>
<tr><td>Rental contract</td><td>Notice periods, deposit rules, who pays for repairs, anything unusual for this country</td></tr>
<tr><td>Phone or internet contract</td><td>Total cost over the full term, price rises after month 12, cancellation rules</td></tr>
<tr><td>Insurance policy</td><td>What's not covered, the excess, how to claim, time limits</td></tr>
<tr><td>Payslip</td><td>What each deduction is, and whether anything looks different from last month</td></tr>
<tr><td>App terms of service</td><td>What they can do with your content and data, how to delete your account</td></tr>
</tbody></table></div>
<pre class="prompt">I'm uploading a [document type] from [country]. In plain words:
1. The 5 things I most need to know
2. Anything unusual or one-sided compared to what's normal
3. Questions I should ask before signing
Say clearly where you're unsure or where a professional should check.</pre>` },

/* ---------- CREATOR MARKETING ---------- */
{ slug: "shortlist-creators-with-ai", type: "creator", tools: ["multi"], level: "Intermediate", mins: 7, rank: 17,
  title: "Shortlist creators with AI, not follower counts",
  excerpt: "The five-factor rubric from 850+ creator deals, turned into a prompt anyone can run.",
  body: `
<p>Follower count is the easiest number to see and the least useful one to pick on. Across 850+ creator deals, the creators who delivered were rarely the biggest. They were the best fit.</p>
<div class="table-wrap"><table>
<thead><tr><th>Factor</th><th>Weight</th><th>What I look at</th></tr></thead>
<tbody>
<tr><td>Audience fit</td><td>30%</td><td>Country, age, language and interests of their followers vs. the brief</td></tr>
<tr><td>Content fit</td><td>25%</td><td>Would this product look natural in their last 12 posts?</td></tr>
<tr><td>Engagement health</td><td>20%</td><td>Real comments, steady numbers, no sudden spikes</td></tr>
<tr><td>Cost</td><td>15%</td><td>Rate vs. likely reach, so cost per 1,000 people reached</td></tr>
<tr><td>Brand safety</td><td>10%</td><td>Past controversies, competitor deals, tone</td></tr>
</tbody></table></div>
<h2>The prompt</h2>
<pre class="prompt">Help me shortlist creators for this brief: [brief].
Score each creator 1-10 on audience fit (30%), content fit (25%), engagement health (20%), cost (15%), brand safety (10%).
Show a weighted total, one sentence of reasoning per score, and a red-flag column. Rank them, then tell me which 2 you'd drop first and why.
Creators: [name, platform, followers, avg views, rate, notes]</pre>
<h2>What AI can't do here</h2>
<p>It can't see private audience data or tell whether comments are bought. Ask creators for audience screenshots and read the comments yourself. Want this as a reusable sheet? Follow the project <a href="#read-creator-scorer-sheet">Build a creator scorer in Google Sheets</a>.</p>` },

{ slug: "creator-contract-red-flags", type: "creator", tools: ["multi"], level: "Intermediate", mins: 6, rank: 19,
  title: "7 clauses in creator contracts that quietly cost money",
  excerpt: "Usage rights, exclusivity, payment terms. What to watch on both sides of the deal.",
  body: `
<p>I've negotiated contracts from both sides: protecting a brand's budget and making sure creators were treated fairly. These clauses cause the most trouble. Not legal advice. Get a lawyer for anything big.</p>
<ol>
<li><b>Perpetual usage rights.</b> "Forever, in all media" means a brand can run a creator's face in ads for years. Fair deals set a time limit and price paid usage separately.</li>
<li><b>Broad exclusivity.</b> "No competing brands" with no category or time limit can block a creator's income. Name the competitors and the period.</li>
<li><b>Payment 90 days after posting.</b> Common and painful for small creators. 30 days is fairer.</li>
<li><b>No disclosure clause.</b> Both sides carry risk if a paid post isn't labelled. Write the exact label into the contract.</li>
<li><b>Unlimited revisions.</b> Agree on two rounds.</li>
<li><b>Vague deliverables.</b> "Some stories" isn't a deliverable. Number, format, length and posting window are.</li>
<li><b>No kill fee.</b> If a brand cancels after the content is shot, the creator should be paid for the work done.</li>
</ol>
<pre class="prompt">Read this influencer contract. For clauses about usage rights, exclusivity, payment, revisions, disclosure, deliverables and cancellation:
1. Quote the clause
2. Rate it fair / watch / unfair
3. Suggest fairer wording
Then draft a polite email asking for the 2 most important changes.
Contract: [paste]</pre>` },

{ slug: "creator-campaign-math", type: "creator", tools: ["multi"], level: "Beginner", mins: 5, rank: 18, calc: true,
  title: "Creator campaign math in plain English",
  excerpt: "Reach, engagement rate, CPM and cost per engagement. With a calculator to play with.",
  body: `
<p>Every client meeting I've been in came down to four numbers. Learn these and you'll sound more senior than your title.</p>
<div class="table-wrap"><table>
<thead><tr><th>Metric</th><th>Formula</th><th>What it tells you</th></tr></thead>
<tbody>
<tr><td>Total reach</td><td>creators × average reach per post</td><td>How many people might see it</td></tr>
<tr><td>Engagement rate</td><td>engagements ÷ reach × 100</td><td>Whether people cared</td></tr>
<tr><td>CPM</td><td>budget ÷ reach × 1,000</td><td>Cost to reach 1,000 people</td></tr>
<tr><td>Cost per engagement</td><td>budget ÷ engagements</td><td>Cost of each like, comment, save or share</td></tr>
</tbody></table></div>
<h2>A worked example</h2>
<p>€20,000 across 10 creators, each reaching about 60,000 people at a 4% engagement rate. Reach is 600,000. Engagements are 24,000. CPM is €33.33 and each engagement costs about €0.83.</p>
<p>Is €33 CPM good? Compare it with what the brand pays for paid social in the same market. Creator content often costs more per view but earns more trust, and can be reused in ads.</p>
<h2>Try it</h2>
<div class="calc-slot"></div>
<p class="note">Illustrative only. Real benchmarks depend on platform, market and creator tier.</p>` },

{ slug: "ad-labels-in-europe", type: "creator", tools: ["multi"], level: "Beginner", mins: 5, rank: 20,
  title: "Ad labels in Europe: Werbung, #ad and why it matters",
  excerpt: "One campaign, several countries, different rules. What I check before anything goes live.",
  body: `
<p>Moving from India to Germany taught me that "add #ad somewhere" isn't a plan. Labelling rules differ by country, and regulators act on them. A starting checklist, not legal advice.</p>
<div class="table-wrap"><table>
<thead><tr><th>Market</th><th>What I use</th><th>Where</th></tr></thead>
<tbody>
<tr><td>Germany, Austria</td><td>"Werbung" or "Anzeige"</td><td>At the very start, visible without tapping "more"</td></tr>
<tr><td>France</td><td>"Publicité" or "Collaboration commerciale"</td><td>Clear and visible for the whole post or video</td></tr>
<tr><td>UK</td><td>"#ad" or "Advert"</td><td>Upfront, before the "see more" cut</td></tr>
<tr><td>Everywhere</td><td>The platform's paid-partnership tag too</td><td>On for every paid post</td></tr>
</tbody></table></div>
<h2>Three habits that prevent problems</h2>
<ul>
<li>Put the exact label wording into the brief and the contract.</li>
<li>Write the brief in the creator's language.</li>
<li>Screenshot every live post with its label for the campaign file.</li>
</ul>
<pre class="prompt">This caption will be posted by a creator in [country] as a paid partnership with [brand].
Check that the ad label is clear, early and in the local language. If not, rewrite the first line so it is. Caption: [paste]</pre>
<p>The European Commission runs a free Influencer Legal Hub worth bookmarking if you work across EU markets.</p>` },

{ slug: "one-page-creator-brief", type: "creator", tools: ["multi"], level: "Beginner", mins: 4, rank: 21,
  title: "The one-page creator brief (template inside)",
  excerpt: "Creators skim. A brief that fits on one screen gets read, followed and posted on time.",
  body: `
<p>The longest brief I ever saw was 14 pages. The creator read page one. Since then I keep briefs to one screen.</p>
<pre class="prompt">CAMPAIGN: [name]  |  BRAND: [brand]  |  POST BY: [date]

THE ONE THING: [the single message people should remember]
WHO IT'S FOR: [audience in one line]
DELIVERABLES: [e.g. 1 Reel 30-45s + 3 stories with link sticker]

DO:
- Show the product in use in the first 3 seconds
- Use your own words and style

DON'T:
- Mention competitors
- Make claims not listed below

MUST INCLUDE: [label, e.g. "Werbung" at the start] + paid-partnership tag + [link or code]
APPROVED CLAIMS: [exact claims]
APPROVAL: Draft by [date]. Max 2 rounds of feedback.
QUESTIONS? [name + contact]</pre>
<pre class="prompt">Fill this one-page creator brief for [product], aimed at [audience], for creators on [platform]. Keep every section under 2 lines. Template: [paste]</pre>` },

/* ---------- CAREER ---------- */
{ slug: "tailor-cv-without-ai-sound", type: "career", tools: ["multi"], level: "Beginner", mins: 6, rank: 22,
  title: "Tailor your CV with AI without sounding like AI",
  excerpt: "Match the job, keep your voice, and stay readable for applicant tracking systems.",
  body: `
<p>Recruiters can smell an AI CV now. "Spearheaded synergies" gives it away. Here's how to use AI and still sound like yourself.</p>
<h2>1. Let AI read the job, not write your story</h2>
<pre class="prompt">Here is a job ad: [paste]. List the 8 skills or experiences they care about most, in order. Quote the line that shows each.</pre>
<h2>2. Match with evidence</h2>
<pre class="prompt">Here is my CV: [paste]. For each of those 8 points, quote my strongest matching evidence. Mark any point where I have none.</pre>
<h2>3. Rewrite only the top third</h2>
<p>Recruiters read the summary and the first role. Tailor those, leave the rest mostly alone.</p>
<h2>4. Run a "sounds like AI" check</h2>
<pre class="prompt">Highlight every phrase in this CV that sounds machine-written or like filler. Suggest a plainer version for each. Don't add anything I haven't done. [CV]</pre>
<h2>5. Keep it machine-readable</h2>
<ul>
<li>Normal headings: Experience, Education, Skills.</li>
<li>No text inside images, no tables for core content.</li>
<li>Copy the text out of your PDF to check it reads in order.</li>
</ul>
<p>Want this as a system? Follow the project <a href="#read-job-search-assistant">Build a job-search assistant</a>.</p>` },

{ slug: "interview-practice-with-ai", type: "career", tools: ["chatgpt", "claude"], level: "Beginner", mins: 5, rank: 23,
  title: "Practise a job interview with AI",
  excerpt: "Turn any job ad into a mock interview with honest feedback. Voice mode makes it real.",
  body: `
<p>The best interview prep is saying your answers out loud. AI gives you an interviewer who's free at 11pm and never gets bored.</p>
<h2>Set up the interviewer</h2>
<pre class="prompt">You're interviewing me for this role: [paste job ad].
Ask one question at a time, mixing experience, behaviour and one curveball.
After each answer: score it 1-5, say what was strong, what was vague, and show a tighter version in my own words.
After 6 questions, give me my 3 biggest fixes.</pre>
<h2>Use voice mode</h2>
<p>Typing hides rambling. Speaking shows it. Use the voice feature in ChatGPT or Claude's mobile app and answer out loud.</p>
<h2>Prepare stories, not answers</h2>
<pre class="prompt">From my CV [paste], help me build 5 short stories I can reuse across questions: situation, what I did, result with a number. Under 60 seconds each when spoken.</pre>
<h2>The question to always prepare</h2>
<p>"Why this company?" Ask the AI to read the company's site and recent news with you, then answer it yourself. Never let it write this one for you.</p>` },

{ slug: "youtube-research-with-claude", type: "workflow", tools: ["claude"], level: "Intermediate", mins: 15, rank: 41,
  title: "YouTube research with Claude: what works, why, and what to make next",
  excerpt: "Find what works in a YouTube niche, why it works and what to make next, using Claude with transcripts, comments and your own Studio data.",
  body: `<p>Find what works in a YouTube niche, why it works and what to make next, using Claude with transcripts, comments and your own Studio data.</p>` },

{ slug: "creator-campaign-hq-in-claude", type: "creator", tools: ["claude"], level: "Intermediate", mins: 15, rank: 42,
  title: "Run a whole creator campaign from one Claude Project",
  excerpt: "Set up a campaign HQ in Claude, then shortlist, vet, brief, review and report on creators with copy-paste prompts.",
  body: `<p>Set up a campaign HQ in Claude, then shortlist, vet, brief, review and report on creators with copy-paste prompts.</p>` },

{ slug: "get-cited-by-ai-answers", type: "workflow", tools: ["claude", "multi"], level: "Intermediate", mins: 15, rank: 43,
  title: "Get cited by AI answers with Claude and free tools",
  excerpt: "Find out whether ChatGPT, Perplexity, Gemini and Google's AI Mode link to you, then fix your pages in seven steps with free tools and Claude.",
  body: `<p>Find out whether ChatGPT, Perplexity, Gemini and Google's AI Mode link to you, then fix your pages in seven steps with free tools and Claude.</p>` }
];

/* ===== Projects: step-by-step builds ===== */
const PROJECTS = [
{ slug: "build-website-no-code", type: "project", tools: ["claude"], level: "Beginner", mins: 60, rank: 1, start: true, cost: "Free",
  title: "Build your own website with AI, no code",
  excerpt: "From idea to a live link you can share, in about an hour.",
  youbuild: "A one-page personal website, live on the internet with its own link.",
  need: ["A Claude account", "A free Netlify account", "Your content: who you are, what you do, links"],
  steps: [
    { t: "Decide the one job of your site", d: `<p>A site that tries to do everything does nothing. Pick one: get hired, sell a service, collect emails, or show your work. Write it as one sentence.</p><pre class="prompt">Help me decide the one job of my website. Ask me 4 questions about who should visit it and what I want them to do, then write the job in one sentence.</pre>` },
    { t: "Write your content first", d: `<p>Design comes last. Put your words in a document: headline, three things you do, proof (numbers, projects, quotes), and how to contact you.</p><pre class="prompt">Interview me to write the content for a one-page website whose job is: [your sentence]. One question at a time. Then give me a headline, a 2-line intro, 3 sections and a call to action.</pre>` },
    { t: "Ask Claude to build it", d: `<p>Paste your content and be specific about what you want. Ask for a single HTML file so it's easy to put online.</p><pre class="prompt">Build my one-page website as a single HTML file.
Content: [paste your content]
Style: [3 words, e.g. calm, bold, warm] with [one colour] as the accent.
Must: work perfectly on phones, load fast, have a light and dark mode, and use real text (no lorem ipsum).
Avoid: stock-photo look, too many animations, centred everything.</pre>` },
    { t: "Review it in three rounds", d: `<p>Look at it on your phone first. Then ask for changes one round at a time: structure, then words, then details. Small, specific asks work best.</p><pre class="prompt">Round 1: The structure. Move [section] above [section], and make the contact button visible without scrolling on a phone.</pre><pre class="prompt">Round 2: Tighten every sentence by a third. Keep my voice.</pre>` },
    { t: "Save the file", d: `<p>Download the HTML file Claude made, or copy the code into a new file called <b>index.html</b>. Put it alone in a folder named after your site.</p>` },
    { t: "Put it online with Netlify Drop", d: `<p>Go to Netlify's Drop page (app.netlify.com/drop), sign in, and drag your folder onto the page. In a few seconds you get a live link. Easiest from a laptop; on a tablet, upload the folder as a zip.</p>` },
    { t: "Give it a proper name", d: `<p>In your Netlify project settings you can change the site name, so the link becomes yourname.netlify.app. Later you can connect your own domain.</p>` },
    { t: "Test, then share", d: `<p>Open the link on your phone and a friend's phone. Click every button. Then share it: email signature, LinkedIn featured section, CV.</p>` }
  ],
  after: `<p>To update the site later, ask Claude for the change, save the new index.html and drag the folder onto your Netlify project's Deploys page.</p>` },

{ slug: "newsletter-signup-free", type: "project", tools: ["multi"], level: "Beginner", mins: 30, rank: 4, cost: "Free",
  title: "Collect newsletter emails for free",
  excerpt: "Add a working signup form to your site and see every email in one place. No paid tools.",
  youbuild: "A signup form on your website that saves every email address for you.",
  need: ["A website on Netlify (see the website project)", "Two minutes of HTML (AI writes it)"],
  steps: [
    { t: "Decide where emails will live", d: `<p>Two good options. <b>Netlify Forms</b> stores signups with your website, which is perfect to start. A <b>newsletter tool</b> (like Substack, Kit or Beehiiv) also sends the emails. Start with Netlify, move to a newsletter tool once you have readers.</p>` },
    { t: "Ask AI for the form", d: `<pre class="prompt">Add a newsletter signup form to my website's HTML for Netlify Forms. Use a form named "newsletter" with the data-netlify="true" attribute, one email field, a honeypot field against spam, and a thank-you message. Here is my HTML: [paste]</pre>` },
    { t: "Turn on form detection", d: `<p>In your Netlify project, open the Forms section and enable form detection. Netlify reads your form when you deploy. Menu names can change, so search Netlify's docs for "form detection" if you can't find it.</p>` },
    { t: "Deploy and test with your own email", d: `<p>Drag your updated folder onto Netlify again, open the live site and sign up with your own address. It should appear in the Forms section within a minute.</p>` },
    { t: "Write a privacy line", d: `<p>In the EU you need to say what you do with emails. One honest sentence under the form, plus a short privacy page.</p><pre class="prompt">Write a short, plain-English privacy note for a free newsletter signup stored with Netlify. Say what's collected, why, and how to unsubscribe or delete it.</pre>` },
    { t: "Export when you grow", d: `<p>When you're ready for a newsletter tool, export your signups from Netlify as a file and import them there. Only import people who signed up themselves.</p>` }
  ],
  after: `` },

{ slug: "job-search-assistant", type: "project", tools: ["claude"], level: "Beginner", mins: 40, rank: 3, start: true, cost: "Free or paid plan",
  title: "Build a job-search assistant in a Claude Project",
  excerpt: "One Project that knows your CV, scores every job ad and drafts a tailored application.",
  youbuild: "A Claude Project you paste job ads into, getting a fit score, a tailored CV summary and a cover letter draft.",
  need: ["A Claude account with Projects", "Your CV as a PDF or doc", "3 job ads you like"],
  steps: [
    { t: "Create the Project", d: `<p>In Claude, create a new Project called "Job search". Everything you add here is shared by every chat inside it.</p>` },
    { t: "Upload your material", d: `<p>Add your CV, a list of your proudest results with numbers, and a short note on what you want next (role, location, remote or not, salary range if you like).</p>` },
    { t: "Write the Project instructions", d: `<pre class="prompt">You are my job-search assistant. You know my CV and goals from the files in this Project.
When I paste a job ad:
1. Score fit from 1-10 and quote evidence from my CV for each requirement
2. List gaps honestly
3. Say apply / maybe / skip with one reason
Never invent experience. Write in plain, human English. No buzzwords.</pre>` },
    { t: "Score your first job ad", d: `<p>Paste a job ad into a new chat in the Project. Check the evidence it quotes. If it's wrong, tell it, and add the correction to your files.</p>` },
    { t: "Draft the tailored application", d: `<pre class="prompt">For this job, rewrite my CV summary (3 lines) and the bullets of my most recent role to match what they care about. Then draft a 150-word cover letter that sounds like me. Mark every line you changed.</pre>` },
    { t: "Run the human check", d: `<pre class="prompt">Read this application as a tired recruiter. Highlight anything that sounds AI-written or vague, and give me a plainer version.</pre>` },
    { t: "Track what you send", d: `<p>Keep a simple sheet: company, role, date, score, status, follow-up date. Ask the Project for a follow-up message after 7 days of silence.</p>` }
  ],
  after: `<p>I run a more advanced version of this as an automated agent. The Project version gets you 80% of the value in 40 minutes.</p>` },

{ slug: "linkedin-carousel-with-ai", type: "project", tools: ["multi"], level: "Beginner", mins: 45, rank: 2, start: true, cost: "Free",
  title: "Make a LinkedIn carousel with AI in 45 minutes",
  excerpt: "One insight, seven slides, a locked style. The exact process behind the carousels on this site.",
  youbuild: "A 7-slide carousel PDF ready to post on LinkedIn.",
  need: ["Any AI assistant", "Canva (free plan works)", "One thing you learned this week"],
  steps: [
    { t: "Pick one insight people will save", d: `<p>Carousels that get saved teach one useful thing. Not your news, not a motivational quote. A method, a checklist, a before-and-after.</p><pre class="prompt">Here's what I worked on this week: [notes]. Give me 5 carousel ideas that teach one useful thing each. For each, say who would save it and why.</pre>` },
    { t: "Outline seven slides", d: `<pre class="prompt">Outline a 7-slide LinkedIn carousel on [topic].
Slide 1: a hook under 10 words. Slides 2-6: one idea each, max 25 words. Slide 7: a save prompt and one open question.</pre>` },
    { t: "Lock your style once", d: `<p>Choose 3 soft background colours, 1 accent colour, 1 font pair, and a page counter like "2/7". Use the same every time so people recognise you in the feed. The carousels on this site use soft purple, teal and coral cards with one violet accent.</p>` },
    { t: "Design in Canva", d: `<p>Create a design at 1080 × 1350 px. Build slide 1 and slide 2 carefully, then duplicate slide 2 for the rest so spacing stays identical. Keep text big: if you need to zoom on a phone, it's too small.</p>` },
    { t: "Check it on a phone", d: `<p>Download as PDF, open it on your phone and swipe through. Cut any word you can.</p>` },
    { t: "Write the post", d: `<pre class="prompt">Write a LinkedIn caption for this carousel: a punchy first line, 3 short arrow points of what's inside, and a closing question. Under 120 words. No hashtag spam. [slides]</pre>` },
    { t: "Post it as a document", d: `<p>On LinkedIn, add the PDF as a document post and give it a clear title. Reply to every comment in the first hour.</p>` }
  ],
  after: `<p>See the finished examples in <a href="#carousels">Carousels</a>.</p>` },

{ slug: "creator-scorer-sheet", type: "project", tools: ["gemini", "multi"], level: "Intermediate", mins: 40, rank: 6, cost: "Free",
  title: "Build a creator scorer in Google Sheets",
  excerpt: "Rank creators on fit with weighted scores and AI notes. Reusable for every campaign.",
  youbuild: "A Google Sheet that ranks creators by weighted fit score, with red flags highlighted.",
  need: ["Google Sheets", "Any AI assistant", "A list of creators you're considering"],
  steps: [
    { t: "Set up the columns", d: `<p>Name, Platform, Followers, Avg views, Rate, Audience fit, Content fit, Engagement health, Cost score, Brand safety, Total, Notes, Red flags.</p>` },
    { t: "Add the weights", d: `<p>In a small table to the side, put the weights: 30%, 25%, 20%, 15%, 10%. Keeping them in cells means you can change them per campaign.</p>` },
    { t: "Write the total formula", d: `<pre class="prompt">Write a Google Sheets formula for column K that multiplies scores in F:J by the weights in cells N2:N6 and adds them up. Explain it in one line.</pre><p>It will look something like <b>=SUMPRODUCT(F2:J2, TRANSPOSE($N$2:$N$6))</b>. Test it on one row by hand.</p>` },
    { t: "Let AI draft the scores", d: `<pre class="prompt">Here's my brief: [brief]. For each creator below, give scores 1-10 for audience fit, content fit, engagement health, cost and brand safety, plus a one-line note and any red flag. Output as a table I can paste into Sheets. [creators]</pre>` },
    { t: "Check, then correct", d: `<p>Paste the table, then go through each creator's last posts yourself. Change any score you disagree with. Your judgement is the final layer.</p>` },
    { t: "Highlight what matters", d: `<p>Add conditional formatting: green for totals above 7.5, red text for anything in Red flags. Sort by Total.</p>` }
  ],
  after: `<p>The thinking behind the weights is in <a href="#read-shortlist-creators-with-ai">Shortlist creators with AI</a>.</p>` },

{ slug: "ai-about-me-folder", type: "project", tools: ["claude", "chatgpt"], level: "Beginner", mins: 30, rank: 5, start: true, cost: "Free",
  title: "Build an about-me folder so AI knows you",
  excerpt: "Four short files that end the 'who are you again?' problem in every chat.",
  youbuild: "A folder of four documents you upload to any AI project, so answers fit your life and work from the first message.",
  need: ["Any AI assistant with projects or file uploads", "30 quiet minutes"],
  steps: [
    { t: "Create four files", d: `<p><b>about-me</b> (who you are, what you do), <b>voice</b> (how you write), <b>current</b> (what you're working on), <b>preferences</b> (how you like answers). Plain documents are fine.</p>` },
    { t: "Let AI interview you", d: `<pre class="prompt">Interview me to write a one-page "about me" file for AI assistants. Ask one question at a time about my work, goals, context and constraints. After 10 questions, write the file in short bullet points.</pre>` },
    { t: "Capture your voice", d: `<p>Paste three things you wrote that you're proud of and use the voice card prompt from <a href="#read-brand-voice-without-ai-sound">Make AI write in your voice</a>. Save the result as your voice file.</p>` },
    { t: "Write what you're working on", d: `<p>Three to five current projects with one line each: goal, deadline, what's blocking you. This is the file you'll update most.</p>` },
    { t: "Add your answer preferences", d: `<pre class="prompt">Lead with the answer. Keep it short. Tables for comparisons. Plain words, no buzzwords. Say when you're unsure. Ask before assuming my country or budget.</pre>` },
    { t: "Upload and test", d: `<p>Add the four files to a Project. Start a new chat and ask "What do you know about me and what should I focus on this week?" If it gets something wrong, fix the file, not the chat.</p>` },
    { t: "Review once a month", d: `<p>Set a monthly reminder to update the "current" file. Five minutes keeps every answer relevant.</p>` }
  ],
  after: `<p>Keep private details out: no ID numbers, passwords or health details.</p>` },

{ slug: "claude-skill-for-repeat-task", type: "project", tools: ["claude"], level: "Intermediate", mins: 45, rank: 7, cost: "Paid plan may be needed",
  title: "Turn a task you repeat into a Claude Skill",
  excerpt: "Write your process down once, and Claude follows it every time you ask.",
  youbuild: "A Skill: a saved set of instructions Claude loads whenever you ask for that kind of task.",
  need: ["A Claude plan with Skills turned on", "A task you do at least weekly"],
  steps: [
    { t: "Pick the right task", d: `<p>Good Skills are tasks with steps you always follow: writing a weekly report, reviewing a contract, formatting a carousel, checking an application. If you explain it to new people the same way every time, it's a Skill.</p>` },
    { t: "Write it like you'd train an intern", d: `<pre class="prompt">I want to turn this task into a reusable Skill: [task]. Interview me about how I do it: the steps, the rules, the mistakes to avoid, and what a great result looks like. One question at a time.</pre>` },
    { t: "Have Claude draft the Skill", d: `<p>Ask Claude to turn the interview into a Skill with a clear name, a one-line description of when to use it, and the steps. Claude can create the Skill file for you.</p>` },
    { t: "Add it to Claude", d: `<p>Skills live in Claude's settings under capabilities. Upload or save the Skill there. Menu names change, so check Claude's help pages if you can't find it.</p>` },
    { t: "Test on three real examples", d: `<p>Run it on three real cases, including a tricky one. Note every place the result wasn't what you'd do.</p>` },
    { t: "Fix the instructions, not the output", d: `<p>When a result is wrong, add a rule to the Skill instead of editing the result by hand. After three rounds it should feel like your own process.</p>` }
  ],
  after: `<p>I use Skills for job applications, carousels and creator shortlists. They're the closest thing to cloning your best working day.</p>` },

{ slug: "meeting-notes-to-tasks", type: "project", tools: ["multi"], level: "Intermediate", mins: 40, rank: 8, cost: "Free tier works",
  title: "Automate meeting notes into tasks with Zapier",
  excerpt: "Drop a transcript in a folder, get tasks with owners and deadlines in your to-do app.",
  youbuild: "An automation: new meeting notes in a folder become tasks in your task app, with no copy-pasting.",
  need: ["A free Zapier account", "Google Drive or similar", "A task app like Todoist, Asana or Notion"],
  steps: [
    { t: "Make a 'Meeting notes' folder", d: `<p>One folder where every transcript or notes file goes. This is the trigger.</p>` },
    { t: "Create a Zap with that trigger", d: `<p>In Zapier, start a new Zap. Choose your storage app and the trigger "new file in folder". Pick your folder and test it with one file.</p>` },
    { t: "Add an AI step", d: `<p>Add an AI action (Zapier offers its own AI steps and connections to ChatGPT and Claude). Give it this instruction:</p><pre class="prompt">From these meeting notes, list every action item as: task | owner | due date. If no date is given, write "none". Only include real commitments, not ideas. Notes: [file text]</pre>` },
    { t: "Send tasks to your app", d: `<p>Add a final step in your task app to create a task for each line. Map the task, owner and date fields.</p>` },
    { t: "Test with a real meeting", d: `<p>Drop yesterday's notes in the folder and check the tasks. Adjust the instruction if it creates tasks from vague ideas.</p>` },
    { t: "Turn it on and review weekly", d: `<p>Publish the Zap. For the first two weeks, glance at what it created every Friday.</p>` }
  ],
  after: `<p>More ideas like this in <a href="#read-no-code-ai-workflows">5 AI workflows you can set up today</a>.</p>` }
];

/* ===== Carousels in Vish's locked style ===== */
const CAROUSELS = [
  { slug: "six-box-brief", title: "Brief AI like a pro", link: "brief-ai-like-an-agency", slides: [
    { k: "cover", badge: "Prompting", title: "Your prompts aren't bad. Your briefs are.", sub: "The 6-box brief I used for 850+ creator deals", emoji: "🧠" },
    { k: "point", tint: "p", n: "01", title: "Goal", body: "One clear outcome. \"More saves\" beats \"better content\"." , emoji: "🎯" },
    { k: "point", tint: "t", n: "02", title: "Audience", body: "Who reads it, what they know, what they care about.", emoji: "👥" },
    { k: "point", tint: "c", n: "03", title: "Context", body: "What's been tried. What flopped. Why now.", emoji: "🗂️" },
    { k: "list", title: "Then add", items: ["Constraints: length, tone, banned words", "Format: table, bullets, 3 options", "Example: the box that does the most work"] },
    { k: "point", tint: "p", n: "+1", title: "The magic line", body: "\"Ask me up to 3 questions before you start.\"", emoji: "✨" },
    { k: "end", title: "Save this for your next prompt.", q: "Which box do you always skip?" } ] },
  { slug: "fix-weak-answers", title: "Fix weak AI answers", link: "one-line-follow-ups", slides: [
    { k: "cover", badge: "Prompts", title: "The first AI answer is a draft.", sub: "6 one-line replies that fix it", emoji: "🔧" },
    { k: "point", tint: "p", n: "01", title: "Too long?", body: "\"Half the words, same meaning.\"", emoji: "✂️" },
    { k: "point", tint: "t", n: "02", title: "Too generic?", body: "\"Give me the version an expert would write.\"", emoji: "🎓" },
    { k: "point", tint: "c", n: "03", title: "Too sure of itself?", body: "\"What did you assume that I didn't tell you?\"", emoji: "🤔" },
    { k: "list", title: "Also try", items: ["\"Show this as a table.\"", "\"Now argue against it.\"", "\"Ask me 3 questions first.\""] },
    { k: "end", title: "The good answer is usually reply #3.", q: "What's your go-to follow-up?" } ] },
  { slug: "creators-not-followers", title: "Pick creators on fit", link: "shortlist-creators-with-ai", slides: [
    { k: "cover", badge: "Creator marketing", title: "Stop picking creators by follower count.", sub: "The 5-factor fit score", emoji: "📊" },
    { k: "point", tint: "p", n: "30%", title: "Audience fit", body: "Their followers' country, age and language vs. your brief.", emoji: "🌍" },
    { k: "point", tint: "t", n: "25%", title: "Content fit", body: "Would your product look natural in their last 12 posts?", emoji: "🎬" },
    { k: "point", tint: "c", n: "20%", title: "Engagement health", body: "Real comments. Steady numbers. No sudden spikes.", emoji: "💬" },
    { k: "list", title: "And the last 25%", items: ["Cost: price per 1,000 people reached", "Brand safety: past deals, tone, controversies"] },
    { k: "end", title: "Fit beats fame. Every time.", q: "What's your #1 creator red flag?" } ] },
  { slug: "campaign-math", title: "Campaign math in 60 seconds", link: "creator-campaign-math", slides: [
    { k: "cover", badge: "Creator marketing", title: "4 numbers every client meeting comes down to.", sub: "No spreadsheet degree needed", emoji: "🧮" },
    { k: "point", tint: "p", n: "01", title: "Reach", body: "creators × average reach per post", emoji: "📣" },
    { k: "point", tint: "t", n: "02", title: "Engagement rate", body: "engagements ÷ reach × 100", emoji: "❤️" },
    { k: "point", tint: "c", n: "03", title: "CPM", body: "budget ÷ reach × 1,000. Compare it with paid ads.", emoji: "💶" },
    { k: "point", tint: "p", n: "04", title: "Cost per engagement", body: "budget ÷ engagements", emoji: "🎯" },
    { k: "end", title: "Know these four and you'll sound senior.", q: "Which one do clients ask about most?" } ] },
  { slug: "website-no-code", title: "A website with zero code", link: "build-website-no-code", slides: [
    { k: "cover", badge: "Project", title: "I built a website without writing code.", sub: "8 steps, about an hour", emoji: "🛠️" },
    { k: "point", tint: "p", n: "01", title: "One job", body: "Get hired, sell, collect emails or show work. Pick one.", emoji: "☝️" },
    { k: "point", tint: "t", n: "02", title: "Words first", body: "Write the content before you think about design.", emoji: "✍️" },
    { k: "point", tint: "c", n: "03", title: "Ask for one HTML file", body: "Easy to put online, easy to update.", emoji: "📄" },
    { k: "list", title: "Then", items: ["Review in 3 rounds", "Drag the folder onto Netlify Drop", "Rename it, test on your phone, share"] },
    { k: "end", title: "Your link could be live tonight.", q: "What would your site's one job be?" } ] },
  { slug: "about-me-folder", title: "Make AI know you", link: "ai-about-me-folder", slides: [
    { k: "cover", badge: "Project", title: "Tired of re-explaining yourself to AI?", sub: "Build a 4-file about-me folder", emoji: "📁" },
    { k: "point", tint: "p", n: "01", title: "about-me", body: "Who you are and what you do. One page.", emoji: "🙋" },
    { k: "point", tint: "t", n: "02", title: "voice", body: "How you write, with examples.", emoji: "🗣️" },
    { k: "point", tint: "c", n: "03", title: "current", body: "What you're working on. Update monthly.", emoji: "📌" },
    { k: "point", tint: "p", n: "04", title: "preferences", body: "How you like answers. Short? Tables? Blunt?", emoji: "⚙️" },
    { k: "end", title: "Upload once. Better answers forever.", q: "What does AI always get wrong about you?" } ] },
  { slug: "ad-labels", title: "Ad labels in Europe", link: "ad-labels-in-europe", slides: [
    { k: "cover", badge: "Creator marketing", title: "\"#ad somewhere\" isn't a plan in Europe.", sub: "Labels by country", emoji: "🇪🇺" },
    { k: "point", tint: "p", n: "DE", title: "Germany, Austria", body: "\"Werbung\" or \"Anzeige\", right at the start.", emoji: "🏷️" },
    { k: "point", tint: "t", n: "FR", title: "France", body: "\"Publicité\" or \"Collaboration commerciale\".", emoji: "🏷️" },
    { k: "point", tint: "c", n: "UK", title: "United Kingdom", body: "\"#ad\" upfront, before the \"see more\" cut.", emoji: "🏷️" },
    { k: "list", title: "Every market", items: ["Turn on the paid-partnership tag", "Write the label into the brief and contract", "Screenshot every live post"] },
    { k: "end", title: "Not legal advice. Just good habits.", q: "Which market's rules surprised you?" } ] },
  { slug: "no-code-workflows", title: "5 no-code AI workflows", link: "no-code-ai-workflows", slides: [
    { k: "cover", badge: "Workflows", title: "5 AI workflows. Zero code.", sub: "Each saves about an hour a week", emoji: "⚡" },
    { k: "point", tint: "p", n: "01", title: "Notes to tasks", body: "Transcript in, owners and deadlines out.", emoji: "📝" },
    { k: "point", tint: "t", n: "02", title: "One idea, seven posts", body: "A week of content from a single insight.", emoji: "🗓️" },
    { k: "point", tint: "c", n: "03", title: "Inbox triage", body: "AI drafts replies to the 3 most urgent. You send.", emoji: "📬" },
    { k: "list", title: "Plus", items: ["Monthly competitor check", "Zapier for boring handoffs"] },
    { k: "end", title: "Automate the thing you complained about most.", q: "What would you automate first?" } ] }
];

/* ===== Build Notes newsletter (published online) ===== */
const ISSUES = [
  { slug: "issue-6", n: 6, title: "Make AI stop asking who you are", teaser: "A four-file folder that gives every chat your context.", items: ["The about-me folder project", "Why 'current' is the file that matters", "Prompt of the week: the monthly refresh"],
    body: `<p>Hi, it's Vish.</p><p>The most common complaint I hear: "AI doesn't get me." It doesn't know you yet. This week's fix takes 30 minutes.</p><h2>Build it</h2><p>Four short files: about-me, voice, current, preferences. Step by step in <a href="#read-ai-about-me-folder">Build an about-me folder</a>.</p><h2>Prompt of the week</h2><pre class="prompt">Here's my "current" file from last month: [paste]. Ask me 5 questions to update it, then rewrite it.</pre><p>See you next Monday,<br>Vish</p>` },
  { slug: "issue-5", n: 5, title: "I built a website without writing code", teaser: "The 8 steps, and the one mistake that wastes an evening.", items: ["Words before design", "The single-file trick", "Going live with Netlify Drop"],
    body: `<p>Hi, it's Vish.</p><p>The mistake most people make when building a site with AI: asking for a design before they know what to say.</p><p>Full walkthrough: <a href="#read-build-website-no-code">Build your own website with AI</a>.</p><p>Vish</p>` },
  { slug: "issue-4", n: 4, title: "Stop picking creators by follower count", teaser: "The five-factor fit score, and what AI still can't check.", items: ["The 30/25/20/15/10 rubric", "A sheet you can reuse", "The two checks only humans can do"],
    body: `<p>Hi, it's Vish.</p><p>In five years of creator campaigns, the posts that moved numbers rarely came from the biggest accounts.</p><p>The rubric: <a href="#read-shortlist-creators-with-ai">Shortlist creators with AI</a>. As a reusable sheet: <a href="#read-creator-scorer-sheet">Build a creator scorer</a>.</p><p>Vish</p>` },
  { slug: "issue-3", n: 3, title: "The first answer is a draft", teaser: "Twelve one-line follow-ups that turn average into useful.", items: ["Why reply #3 is the good one", "The assumption question", "A notes-app cheat sheet"],
    body: `<p>Hi, it's Vish.</p><p>Most people read the first answer and leave. Here are the follow-ups I actually use: <a href="#read-one-line-follow-ups">12 follow-ups that fix weak AI answers</a>.</p><pre class="prompt">What did you assume that I didn't tell you?</pre><p>Vish</p>` },
  { slug: "issue-2", n: 2, title: "Brief your AI like you'd brief a pro", teaser: "Six boxes that turn average answers into usable drafts.", items: ["Goal, audience, context, constraints, format, example", "The line that makes AI ask questions", "Copy-paste template"],
    body: `<p>Hi, it's Vish.</p><p>Bad prompts fail the same way bad creator briefs do. Here's the six-box structure I use for both: <a href="#read-brief-ai-like-an-agency">Brief AI the way you'd brief a pro</a>.</p><p>Vish</p>` },
  { slug: "issue-1", n: 1, title: "Hi, I'm Vish. Here's what Build Notes is.", teaser: "One guide, one prompt, one thing to try. Every Monday.", items: ["Who I am", "What lands in your inbox", "Your first prompt"],
    body: `<p>Hi, I'm Vish.</p><p>I spent five years in creator and brand marketing, then moved to Germany and started building things with AI. Not as an engineer. As someone who was tired of doing the same work by hand.</p><p>Every Monday: one guide, one prompt, one thing to try. Plain words, nothing you need to code.</p><pre class="prompt">Here's everything on my list this week: [paste]. Sort it into: AI can draft this (give me the prompt), I do this myself, and drop it.</pre><p>Reply anytime. I read everything.<br>Vish</p>` }
];

/* ===== Prompt builder ===== */
const PLAY = [
  { id: "plan", label: "Plan my week", hint: "Split your list: AI drafts, you decide.",
    fields: [{ k: "role", label: "What you do", ph: "e.g. student, nurse, shop owner" }],
    text: "I'm a {role}. Here's everything on my list this week: [paste your list].\n\nSort it into a table with three columns:\n- AI can draft this (give me the exact prompt)\n- I do this myself (and why)\n- Drop or delegate\n\nFinish with the one task that matters most by Friday." },
  { id: "learn", label: "Learn anything in 30 days", hint: "A daily plan that fits your life.",
    fields: [{ k: "skill", label: "Skill", ph: "e.g. Excel, German, video editing" }, { k: "time", label: "Time per day", ph: "e.g. 20 minutes" }],
    text: "I want to learn {skill} in 30 days with {time} a day.\n\nAsk me 3 questions about my level and goal first. Then give me a day-by-day plan with one small win each week, and tell me how I'll know it's working." },
  { id: "build", label: "Build a mini tool", hint: "Describe it, get a working page.",
    fields: [{ k: "tool", label: "What it should do", ph: "e.g. split rent by room size" }],
    text: "Build me a simple tool that helps me {tool}.\n\nMake it one screen, easy on a phone, with clear labels and a sample filled in so I can see how it works. Then ask me what to change." },
  { id: "voice", label: "Find my writing voice", hint: "Turn 3 of your posts into a voice guide.",
    fields: [{ k: "who", label: "Your name or brand", ph: "e.g. Bloom Studio" }, { k: "aud", label: "Who you write for", ph: "e.g. small shop owners" }],
    text: "I write as {who} for {aud}.\n\nI'll paste 3 things I wrote. Build a voice guide:\n- 5 traits, each with one line I'd say and one I'd never say\n- words I use, words I avoid\n- how my best pieces open and close\n\nThen write one new short post in that voice and tell me which line you're least sure about." }
];

/* ===== Stack finder ===== */
const QUIZ = [
  { q: "What do you want AI to help with most?", a: [["Writing and messages", "write"], ["Learning and studying", "learn"], ["Building things (sites, tools)", "build"], ["Saving time on admin", "admin"]] },
  { q: "Where do you already spend your day?", a: [["Google (Gmail, Docs)", "google"], ["Microsoft (Outlook, Word)", "ms"], ["My phone, mostly", "mobile"], ["A mix of everything", "mix"]] },
  { q: "How much setup are you up for?", a: [["None, just a chat box", "zero"], ["An hour, once", "hour"], ["Happy to connect apps", "connect"]] },
  { q: "What would make this month a win?", a: [["Better writing, faster", "write"], ["Something I built and can share", "build"], ["Fewer boring tasks", "admin"], ["Finally understanding AI", "learn"]] }
];
const STACK = {
  claude: { name: "Claude", url: "https://claude.ai", why: "Writing, long documents and building small tools and pages." },
  chatgpt: { name: "ChatGPT", url: "https://chatgpt.com", why: "Quick answers, images and voice chats on your phone." },
  gemini: { name: "Gemini", url: "https://gemini.google.com", why: "AI inside Gmail, Docs and Sheets." },
  copilot: { name: "Microsoft Copilot", url: "https://copilot.microsoft.com", why: "AI inside Word, Excel, Outlook and Teams." },
  canva: { name: "Canva", url: "https://www.canva.com", why: "Turn your drafts into visuals without a designer." },
  netlify: { name: "Netlify", url: "https://www.netlify.com", why: "Put the websites you build online, free to start." },
  zapier: { name: "Zapier", url: "https://zapier.com", why: "Connect apps so boring handoffs happen on their own." },
  notion: { name: "Notion", url: "https://www.notion.so", why: "One home for notes, plans and your about-me files." }
};
const QUIZ_GUIDE = { write: "brand-voice-without-ai-sound", learn: "claude-from-zero", build: "build-website-no-code", admin: "no-code-ai-workflows" };

const DAILY = [
  { k: "claude", use: "Where I write, plan and build." },
  { k: "chatgpt", use: "Second opinion, quick images and voice on walks." },
  { k: "canva", use: "Every carousel and banner." },
  { k: "notion", use: "Notes, plans and my about-me files." },
  { k: "zapier", use: "Moves things between apps so I don't have to." },
  { k: "netlify", use: "Where my sites live." }
];

const CHAPTERS = [
  { id: "idea", n: "01", name: "Idea", title: "Free, step-by-step guides for building real things with AI.", body: "No code and no jargon. Prompts you can copy, projects you can finish, and one useful email every Monday.", links: [], cta: [["Start here", "#start"], ["Browse all guides", "#guides"]] },
  { id: "prompt", n: "02", name: "Prompt", title: "Good answers start with a good brief.", body: "Most people type a question and hope. Learn the six-box brief, the follow-ups that fix weak answers, and prompts worth keeping.", links: ["brief-ai-like-an-agency", "one-line-follow-ups", "everyday-life-prompts"], cta: [["Try the prompt builder", "#home-play"]] },
  { id: "build", n: "03", name: "Build", title: "Follow the steps. Ship something real.", body: "Projects that end with something you can share: a live website, a working signup form, an assistant that knows you.", links: ["build-website-no-code", "ai-about-me-folder", "job-search-assistant"], cta: [["See all projects", "#projects"]] },
  { id: "automate", n: "04", name: "Automate", title: "Let the boring work run itself.", body: "Small no-code workflows that turn notes into tasks and numbers into reports, so your time goes to the work only you can do.", links: ["no-code-ai-workflows", "meeting-notes-to-tasks", "report-that-writes-itself"], cta: [["Workflow guides", "#guides-workflow"]] },
  { id: "create", n: "05", name: "Create", title: "Make things people want to save.", body: "Carousels that teach one idea well, a voice that sounds like you, and the exact process to make your own.", links: ["linkedin-carousel-with-ai", "brand-voice-without-ai-sound", "shortlist-creators-with-ai"], cta: [["Swipe the carousels", "#carousels"]] },
  { id: "share", n: "06", name: "Share", title: "One email. Every Monday.", body: "Build Notes: one guide, one prompt, one thing to try. Five minutes, then back to your week.", links: [], cta: [] }
];

/* ===== Build with Vish: extra original guides (tools Vish built, creator marketing, everyday AI) ===== */
TYPES.splice(TYPES.length - 1, 0, { id: "built", label: "Tools I built" });
const REPO = "https://github.com/Vishwajeetkumbhar379";
const EXTRA = [
/* ---------- TOOLS I BUILT ---------- */
{ slug: "job-search-agent", type: "built", tools: ["claude"], level: "Intermediate", mins: 6, rank: 30, repo: REPO,
  title: "The job-search agent I built for myself",
  excerpt: "Twice a day it finds roles, scores the fit with evidence and drafts a tailored application.",
  body: `
<p>Job hunting in a new country is a numbers game, but spraying CVs doesn't work. I wanted fewer, better applications, so I built an agent that does the boring parts and leaves the decisions to me.</p>
<h2>How it runs</h2>
<ol>
<li><b>Find.</b> Pulls fresh roles from company hiring systems twice a day.</li>
<li><b>Score.</b> Rates each role against my CV and quotes the evidence for every point.</li>
<li><b>Check.</b> Confirms the role fits my location and work-permit situation.</li>
<li><b>Draft.</b> Writes a tailored CV and cover letter for strong matches only.</li>
<li><b>Lint.</b> Blocks AI-sounding phrases and checks the PDF reads cleanly in applicant tracking systems.</li>
</ol>
<h2>What I learned building it</h2>
<ul>
<li>Scores without evidence are useless. Making the model quote my CV made it far more honest.</li>
<li>The "does this sound like a person" check matters more than the clever parts.</li>
<li>I still read every application before it goes out.</li>
</ul>
<h2>Build a simple version today</h2>
<p>You don't need code for the core idea. Follow the project <a href="#read-job-search-assistant">Build a job-search assistant in a Claude Project</a>, then add this as your scoring rule:</p>
<pre class="prompt">Only say "apply" if at least 6 of the job's top 8 requirements have direct evidence in my CV. Quote the evidence. Otherwise say "skip" and tell me the missing pieces.</pre>` },

{ slug: "growth-experiment-lab", type: "built", tools: ["multi"], level: "Intermediate", mins: 5, rank: 31, repo: REPO,
  title: "Growth Experiment Lab: read an A/B test honestly",
  excerpt: "A free web app that tells you if B really beat A, how long to run a test, and what to test next.",
  body: `
<p>Most A/B tests get called too early. Someone sees B ahead on day two and ships it. I built a small app to stop that habit.</p>
<h2>What it does</h2>
<ul>
<li><b>Reads a test.</b> Conversion rates, a z-test, a confidence interval and the chance B beats A.</li>
<li><b>Plans a test.</b> How many visitors and days you need before a result means anything.</li>
<li><b>Ranks ideas.</b> Scores your backlog with ICE: impact, confidence, ease.</li>
</ul>
<h2>Why you can trust it</h2>
<p>The statistics are tested against textbook values. It's plain JavaScript, runs in your browser and sends no data anywhere.</p>
<h2>The one rule worth stealing</h2>
<p>Decide your sample size before the test starts, and don't look at the winner until you hit it. Ask AI to do the maths with you:</p>
<pre class="prompt">My page converts at [current rate]. I want to detect a lift to [target rate]. How many visitors per variant do I need at 95% confidence and 80% power? Show the formula and the number.</pre>` },

{ slug: "ad-performance-copilot", type: "built", tools: ["claude"], level: "Intermediate", mins: 4, rank: 32, repo: REPO,
  title: "Ad Performance Copilot: a weekly paid-media review",
  excerpt: "Finds wasted spend across Meta, Google and LinkedIn Ads and suggests a budget shift.",
  body: `
<p>Every Monday someone opens three ad managers and squints. This tool does the squinting.</p>
<h2>What it checks</h2>
<ul>
<li>Cost per acquisition and return on ad spend per campaign</li>
<li>Frequency and creative fatigue: the same people seeing the same ad too often</li>
<li>Sudden cost spikes and money spent on things that don't convert</li>
</ul>
<h2>What it suggests</h2>
<p>A budget shift that keeps total spend flat: move money from tired, expensive campaigns to the ones still working. Claude writes the client summary, using only the calculated numbers.</p>
<h2>Try the thinking without the tool</h2>
<pre class="prompt">Here is last week's ad data by campaign: [paste spend, results, CPA, frequency]. Flag campaigns with rising CPA or frequency above 3. Suggest a budget shift that keeps total spend the same, and explain each move in one line.</pre>` },

{ slug: "marketing-attribution-lab", type: "built", tools: ["multi"], level: "Intermediate", mins: 5, rank: 33, repo: REPO,
  title: "Marketing Attribution Lab: stop trusting last click",
  excerpt: "Six attribution models side by side, so creator and brand work get the credit they earn.",
  body: `
<p>Last-click attribution gives all the credit to the final touch before a sale. That's why creator campaigns and brand content often look useless in reports, even when they started the journey.</p>
<h2>What the lab compares</h2>
<div class="table-wrap"><table>
<thead><tr><th>Model</th><th>Gives credit to</th></tr></thead>
<tbody>
<tr><td>Last click</td><td>The final touch only</td></tr>
<tr><td>First click</td><td>The touch that started it</td></tr>
<tr><td>Linear</td><td>Every touch equally</td></tr>
<tr><td>Time decay</td><td>Recent touches more</td></tr>
<tr><td>Position based</td><td>First and last most, middle a little</td></tr>
<tr><td>Markov chain</td><td>Each channel by how much journeys break without it</td></tr>
</tbody></table></div>
<h2>Why this matters for your budget</h2>
<p>When you see which channels start journeys and which only close them, you stop cutting the ones that feed everything else.</p>
<pre class="prompt">Here are 20 customer journeys as lists of channels: [paste]. Show me how much credit each channel gets under last-click, first-click and linear attribution. Then tell me which channel I'd wrongly cut if I only looked at last click.</pre>` },

{ slug: "client-health-score", type: "built", tools: ["claude"], level: "Intermediate", mins: 4, rank: 34, repo: REPO,
  title: "Client Health Score: spot churn before the client says it",
  excerpt: "Scores every account on results, relationship, delivery and payments, then suggests next steps.",
  body: `
<p>I led a 12-person team across 20+ brand accounts. Every account we lost showed signs early. We just weren't looking at them together.</p>
<h2>The five signals</h2>
<ul>
<li><b>Results:</b> are we hitting the numbers they care about?</li>
<li><b>Relationship:</b> response times, tone, who's attending calls</li>
<li><b>Delivery:</b> missed deadlines, revision rounds</li>
<li><b>Payments:</b> late invoices are often the first warning</li>
<li><b>Stakeholder changes:</b> a new marketing head means a new pitch</li>
</ul>
<h2>What it produces</h2>
<p>A score per account, churn risk and upsell signals, and a draft outline for the next quarterly review.</p>
<pre class="prompt">Here are notes on my client accounts: [paste]. Score each from 1-10 on results, relationship, delivery, payments and stakeholder stability. Flag the two most at risk and suggest one action for each this week.</pre>` },

{ slug: "creator-fit-scorer", type: "built", tools: ["claude"], level: "Intermediate", mins: 3, rank: 35, repo: REPO,
  title: "Creator Fit Scorer",
  excerpt: "Ranks creators against a brief with reasons for every score, then drafts the outreach.",
  body: `
<p>This is the rubric from <a href="#read-shortlist-creators-with-ai">Shortlist creators with AI</a>, turned into code.</p>
<ul>
<li>Scores audience, content, engagement health, cost and brand safety.</li>
<li>Writes a reason for every score, so a client can see why.</li>
<li>Adds a second opinion and drafts a first outreach message.</li>
</ul>
<p>Prefer a spreadsheet? Follow <a href="#read-creator-scorer-sheet">Build a creator scorer in Google Sheets</a>.</p>` },

{ slug: "creator-contract-checker", type: "built", tools: ["claude"], level: "Intermediate", mins: 3, rank: 36, repo: REPO,
  title: "Creator Contract Checker",
  excerpt: "Flags the clauses that cost money and drafts a polite negotiation email.",
  body: `
<p>The tool version of <a href="#read-creator-contract-red-flags">7 clauses that quietly cost money</a>.</p>
<ul>
<li>Finds perpetual usage rights, broad exclusivity, slow payment terms and missing ad-label clauses.</li>
<li>Suggests fairer wording for each one.</li>
<li>Drafts a polite negotiation email.</li>
<li>Comes with a labelled test set, so I can measure whether a change makes it better or worse.</li>
</ul>
<p>That last point is the real lesson: if you build anything with AI, keep 10 examples with the right answer and test every change against them.</p>` },

{ slug: "campaign-report-autopilot", type: "built", tools: ["claude"], level: "Intermediate", mins: 3, rank: 37, repo: REPO,
  title: "Campaign Report Autopilot",
  excerpt: "Builds the client report every Monday with a scale, keep, test or cut call per creator.",
  body: `
<p>The full method is in <a href="#read-report-that-writes-itself">A weekly report that writes itself</a>. The coded version:</p>
<ul>
<li>Runs automatically every Monday.</li>
<li>Code calculates every number. Claude only writes the summary.</li>
<li>Each creator gets a clear call, scale, keep, test or cut, with the reason.</li>
</ul>` },

{ slug: "creator-brief-mcp", type: "built", tools: ["claude"], level: "Intermediate", mins: 3, rank: 38, repo: REPO,
  title: "Creator Brief MCP: marketing skills for Claude",
  excerpt: "Plugs campaign maths, briefs and ad-label checks per market straight into Claude.",
  body: `
<p>An MCP server is a set of tools an AI assistant can call. This one gives Claude four marketing skills:</p>
<ul>
<li>Campaign maths: reach, CPM and cost per engagement</li>
<li>Engagement health checks</li>
<li>One-page creator briefs</li>
<li>Ad-label checks per market, including "Werbung" or "Anzeige" for Germany</li>
</ul>
<p>New to MCP? Start with <a href="#read-connectors-and-mcp">Connectors and MCP, explained simply</a>.</p>` },

{ slug: "linkedin-carousel-studio", type: "built", tools: ["claude"], level: "Intermediate", mins: 3, rank: 39, repo: REPO,
  title: "LinkedIn Carousel Studio",
  excerpt: "Outline in, on-brand carousel out: slides and a LinkedIn-ready PDF in one locked style.",
  body: `
<p>Designing each carousel by hand took me an hour. This tool takes an outline and produces slides in one locked style, with the editorial rules written in: one idea per slide, a word limit, a save prompt at the end.</p>
<p>The no-code version of the same process: <a href="#read-linkedin-carousel-with-ai">Make a LinkedIn carousel with AI in 45 minutes</a>. Finished examples live in <a href="#carousels">Carousels</a>.</p>` },

{ slug: "claude-skills-i-use", type: "built", tools: ["claude"], level: "Intermediate", mins: 5, rank: 40, repo: REPO,
  title: "The Claude Skills I use every week",
  excerpt: "Saved processes for applications, carousels, creator shortlists and humanising text.",
  body: `
<p>A Skill is a saved set of instructions Claude loads when you ask for that kind of task. These are the ones behind my week:</p>
<div class="table-wrap"><table>
<thead><tr><th>Skill</th><th>What it does</th></tr></thead>
<tbody>
<tr><td>Job scout</td><td>Finds and ranks roles that fit my profile and location</td></tr>
<tr><td>Application loop</td><td>Tailored CV, cover letter and messages for one job</td></tr>
<tr><td>Humaniser</td><td>Checks text for AI-sounding phrases and rewrites them plainly</td></tr>
<tr><td>Carousel system</td><td>Turns a topic into slides in my locked style</td></tr>
<tr><td>Creator shortlist</td><td>Scores creators against a brief</td></tr>
<tr><td>Contract review</td><td>Flags risky creator contract clauses</td></tr>
</tbody></table></div>
<h2>Make your first one</h2>
<p>Pick a task you explain the same way every time. Then follow <a href="#read-claude-skill-for-repeat-task">Turn a task you repeat into a Claude Skill</a>.</p>` },

/* ---------- CREATOR MARKETING ---------- */
{ slug: "creator-outreach-that-gets-replies", type: "creator", tools: ["multi"], level: "Beginner", mins: 5, rank: 24,
  title: "Creator outreach that actually gets replies",
  excerpt: "Busy creators skim. The three-line DM structure that worked across hundreds of deals.",
  body: `
<p>Creators with real audiences get dozens of brand messages a week. Most are copy-pasted. The ones that get answers show you've actually watched their content.</p>
<h2>The three lines</h2>
<ol>
<li><b>Something specific you liked.</b> Name a post and why it worked.</li>
<li><b>The offer in one sentence.</b> Brand, format, timing, and that it's paid.</li>
<li><b>An easy next step.</b> "Can I send a one-page brief?"</li>
</ol>
<pre class="prompt">Write a first DM to [creator] about a paid collaboration with [brand].
Line 1: mention their post about [topic] and what made it good, specifically.
Line 2: the offer in one sentence (format, timing, paid).
Line 3: ask if I can send a one-page brief.
Under 60 words. Friendly, no hype, no emojis.</pre>
<h2>What kills replies</h2>
<ul>
<li>"Hey dear" or no name at all</li>
<li>Asking for rates before saying what you want</li>
<li>Free product as payment for big asks</li>
<li>Following up more than twice</li>
</ul>` },

{ slug: "media-kit-with-ai", type: "creator", tools: ["multi"], level: "Beginner", mins: 6, rank: 25,
  title: "Build your creator media kit with AI",
  excerpt: "For creators: the one-page kit brands actually read, and the numbers to put in it.",
  body: `
<p>I've reviewed hundreds of media kits from the brand side. The good ones answer three questions fast: who watches you, how well does your content perform, and what can I buy.</p>
<h2>What to include</h2>
<ul>
<li>One line about what you make and for whom</li>
<li>Audience: top countries, age range, gender split (from your platform insights)</li>
<li>Performance: average views or reach, engagement rate, best-performing formats</li>
<li>Two or three past brand collaborations with one result each</li>
<li>What you offer: formats and whether usage rights cost extra</li>
<li>Contact</li>
</ul>
<pre class="prompt">Help me write a one-page media kit. Interview me one question at a time about my niche, audience insights, average performance and past collaborations. Then write it in short sections a busy brand manager can scan in 30 seconds.</pre>
<p>Design it in Canva on one page. Update the numbers monthly. Out-of-date numbers lose trust fast.</p>` },

{ slug: "pricing-creator-rates", type: "creator", tools: ["multi"], level: "Intermediate", mins: 6, rank: 26,
  title: "How to think about creator rates (both sides)",
  excerpt: "No magic number exists. Here's the framework I used to agree fair rates for brands and creators.",
  body: `
<p>Rates vary hugely by country, niche and platform, so any "price per follower" table is misleading. What works is agreeing on what the brand is actually buying.</p>
<h2>What's in a price</h2>
<div class="table-wrap"><table>
<thead><tr><th>Part</th><th>Questions to settle</th></tr></thead>
<tbody>
<tr><td>Content</td><td>How many pieces, what format, how much production?</td></tr>
<tr><td>Reach</td><td>What does the creator usually reach with this format?</td></tr>
<tr><td>Usage rights</td><td>Can the brand reuse it in ads? For how long?</td></tr>
<tr><td>Exclusivity</td><td>Is the creator giving up other deals? For how long?</td></tr>
<tr><td>Timing</td><td>Rush jobs and fixed dates cost more</td></tr>
</tbody></table></div>
<h2>A sanity check</h2>
<p>Divide the fee by expected reach and multiply by 1,000. That's the cost to reach 1,000 people. Compare it with what the brand pays for paid social in the same market. It doesn't need to be cheaper, but the gap should make sense for the trust and content you get.</p>
<pre class="prompt">A creator quotes [fee] for [deliverables]. They usually reach [number] people per post. Usage rights for paid ads are [included / not included]. Is this fair compared to paid social at a CPM of [amount]? Give me a counter-offer range and the reasoning.</pre>` },

{ slug: "ugc-vs-influencer", type: "creator", tools: ["multi"], level: "Beginner", mins: 4, rank: 27,
  title: "UGC vs influencer marketing: which do you need?",
  excerpt: "One buys content, the other buys an audience. Mixing them up wastes budget.",
  body: `
<div class="table-wrap"><table>
<thead><tr><th></th><th>UGC creators</th><th>Influencers</th></tr></thead>
<tbody>
<tr><td>You're buying</td><td>Content to post on your channels and ads</td><td>Access to their audience and trust</td></tr>
<tr><td>Posted on</td><td>Your accounts and ads</td><td>Their accounts</td></tr>
<tr><td>Measure by</td><td>Ad performance: CPA, ROAS</td><td>Reach, engagement, traffic, sales</td></tr>
<tr><td>Best for</td><td>Testing many ad angles quickly</td><td>Awareness and credibility in a niche</td></tr>
</tbody></table></div>
<h2>A simple rule</h2>
<p>If your ads need fresh creative every week, start with UGC. If people don't know you yet, start with a few well-chosen influencers. Many brands do both: influencers for launch, UGC to scale what worked.</p>
<pre class="prompt">My product is [product] for [audience]. My budget is [amount] and my goal is [goal]. Should I start with UGC creators, influencers or a mix? Give me a split and a 6-week plan.</pre>` },

{ slug: "influencer-report-template", type: "creator", tools: ["multi"], level: "Beginner", mins: 5, rank: 28,
  title: "The influencer campaign report clients actually read",
  excerpt: "One page: results, what worked, what didn't, what's next. Template included.",
  body: `
<p>Most campaign reports are 30 slides of screenshots. Clients read the first slide. Put everything that matters there.</p>
<pre class="prompt">CAMPAIGN: [name]  |  DATES: [start-end]  |  BUDGET: [amount]

HEADLINE RESULT: [one sentence, e.g. "1.2M people reached at €18 CPM, 32% below target"]

NUMBERS: reach | engagement rate | CPM | cost per engagement | clicks | sales (if tracked)

WHAT WORKED: [2 bullets with a number each]
WHAT DIDN'T: [1-2 bullets, honest]
CREATOR CALLS: scale | keep | test | cut, one line each
NEXT: [3 recommendations for the next campaign]</pre>
<pre class="prompt">Fill this report template from my campaign data: [paste]. Use only the numbers I gave you. Keep it to one page and lead with the headline result.</pre>
<p>Calculating the numbers? Use <a href="#read-creator-campaign-math">Creator campaign math</a>.</p>` },

/* ---------- EVERYDAY AI (MavGPT-style topics, original takes) ---------- */
{ slug: "projects-in-claude-and-chatgpt", type: "guide", tools: ["claude", "chatgpt"], level: "Beginner", mins: 5, rank: 7.5,
  title: "Projects in Claude and ChatGPT, explained",
  excerpt: "The feature that stops you re-explaining yourself. How to set one up and what to put in it.",
  body: `
<p>Both Claude and ChatGPT have Projects: a folder with its own instructions and files. Every chat inside it starts with that context. It's the single biggest upgrade for regular users.</p>
<h2>What to put in a Project</h2>
<ul>
<li><b>Instructions:</b> who you are, the goal of this project, how you want answers</li>
<li><b>Files:</b> the documents you keep pasting: a CV, a brand guide, notes, examples</li>
<li><b>Chats:</b> keep every conversation about that topic inside it</li>
</ul>
<h2>Good first Projects</h2>
<ul>
<li>Job search, with your CV and target roles</li>
<li>A side project or business, with your plan and voice</li>
<li>A course you're taking, with the syllabus and notes</li>
</ul>
<pre class="prompt">Write Project instructions for me. The project is [topic]. My goal is [goal]. I want answers that are [style]. Keep the instructions under 120 words and include 3 rules you think I'll need.</pre>
<p>Want a ready-made set of files? Follow <a href="#read-ai-about-me-folder">Build an about-me folder so AI knows you</a>.</p>` },

{ slug: "connectors-worth-setting-up", type: "workflow", tools: ["claude", "multi"], level: "Beginner", mins: 5, rank: 16.5,
  title: "4 connectors worth setting up first",
  excerpt: "Calendar, email, files and a task app. What each unlocks and the safe way to connect them.",
  body: `
<p>Connectors let your AI assistant see your real calendar, emails and files instead of guessing. Start with four.</p>
<div class="table-wrap"><table>
<thead><tr><th>Connector</th><th>Try asking</th></tr></thead>
<tbody>
<tr><td>Calendar</td><td>"What's my week like and what should I prepare for?"</td></tr>
<tr><td>Email</td><td>"Which emails from this week still need a reply? Draft the top three."</td></tr>
<tr><td>Drive or files</td><td>"Find the budget doc from March and summarise the changes."</td></tr>
<tr><td>Task app</td><td>"Add these meeting actions as tasks with due dates."</td></tr>
</tbody></table></div>
<h2>Safety first</h2>
<ul>
<li>Check what each connector can write or send, not just read.</li>
<li>Ask for drafts, not sends.</li>
<li>Disconnect anything you haven't used in a month.</li>
</ul>
<p>How it works under the hood: <a href="#read-connectors-and-mcp">Connectors and MCP, explained simply</a>.</p>` },

{ slug: "ai-headshot-prompts", type: "prompts", tools: ["chatgpt", "multi"], level: "Beginner", mins: 5, rank: 14.5,
  title: "AI headshot prompts that still look like you",
  excerpt: "Professional photo styles from your own selfie, and the rules that keep them honest.",
  body: `
<p>AI can turn a good selfie into a polished profile photo. The trick is keeping it recognisably you. Upload a clear, front-facing photo in daylight.</p>
<h2>Four styles</h2>
<pre class="prompt">Using my uploaded photo, create a professional headshot: soft studio light, neutral light-grey background, slight smile, business-casual outfit. Keep my face, hair, skin tone and features exactly as they are.</pre>
<pre class="prompt">Same person, outdoor portrait: natural evening light, blurred city background, relaxed expression, shallow depth of field. Do not change my facial features.</pre>
<pre class="prompt">Editorial black-and-white portrait, soft side light, plain background, looking slightly off camera. Keep my face unchanged.</pre>
<pre class="prompt">Creative LinkedIn banner-style portrait: me on the left third, clean gradient background in [colour], room for text on the right.</pre>
<h2>Rules I follow</h2>
<ul>
<li>If friends wouldn't recognise you instantly, don't use it.</li>
<li>Don't change your body, age or skin tone. It backfires in interviews.</li>
<li>For job applications, a real photo taken in good light still wins.</li>
</ul>` },

{ slug: "what-ai-notices-about-you", type: "prompts", tools: ["claude", "chatgpt"], level: "Beginner", mins: 4, rank: 12.5,
  title: "Prompts that help you understand yourself better",
  excerpt: "Reflection prompts for decisions, habits and goals. Honest, not flattering.",
  body: `
<p>If you use an assistant with memory or a Project full of your notes, it can reflect patterns back to you. Ask for honesty, and ask it to separate what you said from what it's guessing.</p>
<pre class="prompt">Based only on what I've shared with you, what are 3 patterns in how I make decisions? For each, give the evidence, say whether it's something I told you or something you're inferring, and suggest one small experiment to test it.</pre>
<pre class="prompt">Here are my goals for this year: [paste]. Which two conflict with each other? Which one am I most likely to drop, and why?</pre>
<pre class="prompt">Ask me 7 questions, one at a time, to find what kind of work gives me energy. Then summarise what you heard in 5 bullets, without compliments.</pre>
<p class="note">AI isn't a therapist. If something heavy comes up, talk to a person you trust or a professional.</p>` },

{ slug: "record-family-stories", type: "guide", tools: ["multi"], level: "Beginner", mins: 5, rank: 19.5,
  title: "Record your family's stories with AI",
  excerpt: "Turn voice notes from parents and grandparents into a small family book.",
  body: `
<p>My family lives in Mumbai and I'm in Germany. Phone calls are where the stories come out. AI makes it easy to keep them.</p>
<h2>The process</h2>
<ol>
<li>Ask permission, then record a call or voice note.</li>
<li>Transcribe it with your phone or an AI app.</li>
<li>Paste the transcript into AI with the prompt below.</li>
<li>Collect chapters in one document and add old photos.</li>
</ol>
<pre class="prompt">Here's a transcript of my [relative] talking about their life: [paste]. Turn it into a short story chapter in their voice, keeping their words where possible. List names, places and dates mentioned, and give me 5 follow-up questions to ask next time.</pre>
<h2>Questions that open people up</h2>
<ul>
<li>"What did your street look like when you were ten?"</li>
<li>"What was your first job, and what did you buy with the first salary?"</li>
<li>"Who in the family was the funniest?"</li>
</ul>` },

{ slug: "ai-tool-quick-starts", type: "guide", tools: ["multi"], level: "Beginner", mins: 6, rank: 8.5,
  title: "AI tool quick starts: your first task in 10 tools",
  excerpt: "Opened a new AI tool and don't know what to do? Here's the first useful thing for each.",
  body: `
<div class="table-wrap"><table>
<thead><tr><th>Tool</th><th>Do this first</th></tr></thead>
<tbody>
<tr><td>Claude</td><td>Create a Project and upload one document you use weekly</td></tr>
<tr><td>ChatGPT</td><td>Set custom instructions, then try voice mode on a walk</td></tr>
<tr><td>Gemini</td><td>Summarise your longest unread email thread</td></tr>
<tr><td>Microsoft Copilot</td><td>Ask it to turn a Word doc into a 5-slide outline</td></tr>
<tr><td>Canva</td><td>Turn one paragraph into a carousel with Magic tools</td></tr>
<tr><td>Notion</td><td>Ask its AI to summarise a page of meeting notes into actions</td></tr>
<tr><td>Gamma</td><td>Paste an outline and generate a first-draft deck</td></tr>
<tr><td>Zapier</td><td>Automate one handoff: form entry to spreadsheet row</td></tr>
<tr><td>Perplexity</td><td>Ask a research question and open every source it cites</td></tr>
<tr><td>Netlify</td><td>Drag a folder with one HTML page onto Netlify Drop</td></tr>
</tbody></table></div>
<p class="note">Features change often. If a button isn't where this says, ask the tool's own assistant where to find it.</p>
<p>Not sure which tools you need? Take the <a href="#tools">AI tool finder</a>.</p>` },

{ slug: "side-project-prompt-chain", type: "workflow", tools: ["claude", "chatgpt"], level: "Beginner", mins: 6, rank: 17.5,
  title: "A 4-prompt chain to plan a side project",
  excerpt: "From vague idea to a first-week plan, one prompt at a time. No hype, no income promises.",
  body: `
<p>Run these in order in the same chat. Each answer feeds the next.</p>
<h2>1. Find the idea that fits you</h2>
<pre class="prompt">I have [hours] a week, these skills: [skills], and I enjoy [interests]. Suggest 5 side projects that use what I already know. For each: who pays for it, how they'd find me, and the biggest risk.</pre>
<h2>2. Pressure-test one</h2>
<pre class="prompt">Take idea [number]. Argue against it as a sceptical friend. Then tell me the cheapest way to test if anyone wants it in 7 days.</pre>
<h2>3. Write the offer</h2>
<pre class="prompt">Write a one-paragraph offer for this idea that I could post on LinkedIn. Plain words, one clear call to action, no promises I can't keep.</pre>
<h2>4. Plan the first week</h2>
<pre class="prompt">Give me a 7-day plan with one 45-minute task per day to run that test. End with what result would tell me to continue or stop.</pre>` },

{ slug: "style-and-wardrobe-prompts", type: "prompts", tools: ["chatgpt", "multi"], level: "Beginner", mins: 4, rank: 21.5,
  title: "Style prompts: build a wardrobe that works",
  excerpt: "Colours, fits and a capsule wardrobe from photos of what you already own.",
  body: `
<pre class="prompt">Here are photos of 10 items I wear most: [upload]. What colours and fits do I keep choosing? Suggest 5 pieces that would combine with most of them, and 3 combinations I haven't tried.</pre>
<pre class="prompt">I need outfits for [occasion: interview, wedding, office in Germany in winter]. My budget is [amount] and I like [style]. Give me 3 options with what to buy and what I can reuse.</pre>
<pre class="prompt">Plan a 15-piece capsule wardrobe for [season] in [city] for someone who [lifestyle]. Show it as a table with item, colour and how many outfits it creates.</pre>
<p>Colour analysis from photos depends heavily on lighting. Take photos near a window in daylight, without filters.</p>` },

{ slug: "money-leak-audit", type: "workflow", tools: ["multi"], level: "Beginner", mins: 4, rank: 20.5,
  title: "The 20-minute money-leak audit with AI",
  excerpt: "Find forgotten subscriptions and small recurring costs. Without sharing your bank details.",
  body: `
<p>Most people pay for at least one subscription they forgot. You don't need to give AI access to your bank to find it.</p>
<h2>How to do it safely</h2>
<ol>
<li>Export or copy last month's transactions.</li>
<li>Delete account numbers, card numbers and anything personal.</li>
<li>Paste only date, description and amount.</li>
</ol>
<pre class="prompt">Here are my transactions for last month (date, description, amount): [paste]. Find every recurring payment, group them by type, and flag ones that look like subscriptions I might not use. Show the yearly cost of each.</pre>
<pre class="prompt">For these 3 subscriptions, write a short cancellation message I can send, and tell me what to check before cancelling (contract terms, notice periods).</pre>
<p class="note">Not financial advice. In Germany many contracts have notice periods, so check before you cancel.</p>` }
];
GUIDES.push(...EXTRA);

/* Build with Vish x LinkedIn batch articles (generated by linkedin-carousel-studio scripts/publish_site.py). */
const POSTS = [
 {
  "slug": "ai-creator-rule-out-pass",
  "type": "creator",
  "tools": [
   "multi"
  ],
  "level": "Beginner",
  "mins": 3,
  "rank": 100,
  "fresh": true,
  "title": "Use AI to rule creators out, then write the first line",
  "excerpt": "My two-prompt shortlist and outreach workflow.",
  "body": "<h1>Use AI to rule creators out, then write the first line<\/h1>\n<p>Most people ask AI to <em>find<\/em> creators. That's the part it's worst at. It can't see private audience data, it doesn't know who's open to brand deals, and its suggestions often lean towards names it has read about rather than the right fit for your brief.<\/p>\n<p>After 850+ creator deals, I've found the expensive mistakes rarely come from missing a great creator. They come from booking a wrong one. So I use AI for the opposite job: ruling creators out, fast, with evidence. Then I use it to draft the first line of outreach for the ones who survive.<\/p>\n<h2>Pass 1: Hard filters (you, not AI)<\/h2>\n<p>These are yes or no, and you already know them:<\/p>\n<ul>\n<li>Audience country and language match the market<\/li>\n<li>Rate range fits the budget<\/li>\n<li>Platform and format match the deliverables<\/li>\n<\/ul>\n<p>Do this in a sheet. It's quick and doesn't need a model.<\/p>\n<h2>Pass 2: The rule-out prompt<\/h2>\n<p>For each creator still standing, copy their recent public captions (around a dozen) and two or three comment threads into the chat. Paste only public content and nothing private about the creator or their followers.<\/p>\n<pre><code>Here's my campaign brief: [paste brief]\nHere are [creator]'s last 12 captions and 3 comment threads: [paste]\n\nYour job is to find reasons NOT to work with this creator for this brief.\nCheck:\n1. Tone: would our product feel out of place next to these posts?\n2. Category: any recent paid posts for direct competitors?\n3. Audience: do the comments suggest a different audience than the brief targets?\n4. Comment quality: generic, repeated or off-topic comments.\n5. Brand safety: anything we'd need to discuss before signing.\n\nFor each point: verdict (fine / check / problem) and a quote as evidence.\nIf you can't tell from what I gave you, say &quot;can't tell&quot;, don't guess.\n<\/code><\/pre>\n<p>The \"quote as evidence\" line is the important one. It turns vague AI opinions into something you can check in ten seconds.<\/p>\n<h2>Pass 3: Check the flags yourself<\/h2>\n<p>AI is fast at spotting a tone clash or a competitor mention. It is not reliable at judging whether comments are bought, and it can misread sarcasm or in-jokes. Treat every \"problem\" as a question, not a verdict. Open the post. Read the thread. Ask the creator for audience screenshots if fit is unclear.<\/p>\n<p>If you want a scored version of this, my <a target=\"_blank\" rel=\"noopener\" href=\"#read-shortlist-creators-with-ai\">creator shortlist rubric<\/a> weights fit, engagement health, cost and safety.<\/p>\n<h2>Pass 4: The first line<\/h2>\n<p>The creators who make it through deserve outreach that shows you actually watched their content. This is where AI helps again, as long as you rewrite the result.<\/p>\n<pre><code>Here's [creator]'s post about [topic]: [paste caption or describe it].\nWrite 3 options for the first line of a DM that:\n- names this specific post and one concrete thing that worked in it\n- is under 20 words\n- has no flattery words (amazing, love your content, obsessed)\n<\/code><\/pre>\n<p>Pick one, then rewrite it in your own words. Add the offer in one sentence and an easy next step. The full three-line structure is in <a target=\"_blank\" rel=\"noopener\" href=\"#read-creator-outreach-that-gets-replies\">Creator outreach that actually gets replies<\/a>.<\/p>\n<h2>What I'd do<\/h2>\n<ul>\n<li>Keep Pass 1 in a shared sheet so the team agrees on hard filters before anyone opens a chat.<\/li>\n<li>Save the rule-out prompt in a Claude or ChatGPT Project with your brief already loaded, so each creator is one paste.<\/li>\n<li>Log every \"problem\" you confirmed by hand. After a few campaigns you'll know which flags the AI gets right for your niche, and which ones it overcalls.<\/li>\n<li>Never send the AI's first line unedited. Creators can tell.<\/li>\n<\/ul>\n<h2>Sources<\/h2>\n<p>No statistics in this one. It's my own workflow from creator campaign work. Related guides: <a target=\"_blank\" rel=\"noopener\" href=\"#read-shortlist-creators-with-ai\">Shortlist creators with AI<\/a> and <a target=\"_blank\" rel=\"noopener\" href=\"#read-creator-outreach-that-gets-replies\">Creator outreach that gets replies<\/a>.<\/p>"
 },
 {
  "slug": "ai-creators-cheap-trust-isnt",
  "type": "guide",
  "tools": [
   "multi"
  ],
  "level": "Beginner",
  "mins": 3,
  "rank": 101,
  "fresh": true,
  "title": "AI avatars can make the ad. They can't make people trust it",
  "excerpt": "Where I'd use AI avatars, and where I'd still pay a person.",
  "body": "<h1>AI avatars can make the ad. They can't make people trust it<\/h1>\n<p>AI avatar ads keep getting better. A brand can now produce a person-shaped video without a contract, a product shipment, a draft deadline or a reshoot. After 850+ creator deals, I understand the appeal better than most. Chasing approvals, rescheduling shoots and waiting on drafts is real work.<\/p>\n<p>But I think a lot of brands are mixing up two different things: the <em>ad<\/em> and the <em>trust behind it<\/em>. AI can make the first. It can't make the second.<\/p>\n<p>This is an opinion piece, from my experience on the creator side. No statistics.<\/p>\n<h2>What you're actually paying a creator for<\/h2>\n<p>When you pay a creator, you aren't really paying for a face reading your script. You're paying for:<\/p>\n<ul>\n<li><strong>An audience that chose them.<\/strong> People followed for a reason, and keep watching for the same reason.<\/li>\n<li><strong>A track record.<\/strong> Years of posts, opinions, recommendations, and mistakes, out in public.<\/li>\n<li><strong>Their \"no\".<\/strong> The brands they turned down are why their \"yes\" means something.<\/li>\n<li><strong>Their comment section.<\/strong> Real people asking real questions, and the creator answering.<\/li>\n<\/ul>\n<p>That's where belief comes from. The video is just the delivery.<\/p>\n<h2>What an avatar doesn't have<\/h2>\n<p>An AI avatar can look and sound convincing. But it has:<\/p>\n<ul>\n<li>no audience that chose it<\/li>\n<li>no history of recommendations to judge it by<\/li>\n<li>no record of ever turning anything down<\/li>\n<li>no reputation at stake if the product disappoints<\/li>\n<\/ul>\n<p>So when an avatar says \"I love this product\", nobody is actually saying it. Viewers may not consciously notice. But I'd bet that over time, trust settles where there's someone behind the words.<\/p>\n<h2>Where I would use AI avatars<\/h2>\n<p>I'm not against them. There are good uses:<\/p>\n<ul>\n<li><strong>Testing angles cheaply.<\/strong> Run five hooks with an avatar first, then brief creators with the angle that worked.<\/li>\n<li><strong>Explainers and how-tos<\/strong>, where the viewer needs information, not a personal recommendation.<\/li>\n<li><strong>Internal content<\/strong>: training, onboarding, product updates.<\/li>\n<li><strong>Localising<\/strong> content you already own, where rules and consent allow it.<\/li>\n<\/ul>\n<p>In all of these, the viewer doesn't need to believe a person. They need to understand something.<\/p>\n<h2>Where I'd still pay a person<\/h2>\n<p>Anything where the viewer has to trust the recommendation:<\/p>\n<ul>\n<li>a product someone will put on their skin or feed their kids<\/li>\n<li>a purchase that's expensive or hard to return<\/li>\n<li>a category full of scepticism, like finance, health or supplements<\/li>\n<li>a launch where comments and questions are part of the plan<\/li>\n<\/ul>\n<h2>Label it, whatever you choose<\/h2>\n<p>If you use an AI avatar in an ad, make it obvious. Hiding it borrows trust you didn't earn, and when people find out, you lose the trust you did have. Check the current rules in each market before you launch. They are changing, and this isn't legal advice.<\/p>\n<h2>What I'd do<\/h2>\n<ul>\n<li>Split your budget by job: AI for testing and explaining, creators for recommending.<\/li>\n<li>Use avatar tests to write better creator briefs, not to replace the creators. The brief gets sharper, and the creator spends their trust on an angle that already works.<\/li>\n<li>Pick creators on fit, not just reach. My <a target=\"_blank\" rel=\"noopener\" href=\"#read-shortlist-creators-with-ai\">shortlist rubric<\/a> shows how.<\/li>\n<li>Ask yourself one question before choosing: does this viewer need to <em>understand<\/em>, or need to <em>believe<\/em>?<\/li>\n<\/ul>\n<h2>Sources<\/h2>\n<p>No statistics in this one. It's an opinion based on my experience across 850+ creator deals. Related: <a target=\"_blank\" rel=\"noopener\" href=\"#read-ugc-vs-influencer\">UGC vs influencer marketing<\/a>.<\/p>"
 },
 {
  "slug": "ai-wont-replace-content-team-bad-brief-will",
  "type": "guide",
  "tools": [
   "multi"
  ],
  "level": "Beginner",
  "mins": 3,
  "rank": 102,
  "fresh": true,
  "title": "AI won't replace your content team. A bad brief will",
  "excerpt": "Vague in, average out. Now just faster.",
  "body": "<h1>AI won't replace your content team. A bad brief will<\/h1>\n<p>There's a lot of worry about AI replacing content teams. I understand it. But in my work, the bigger risk I see isn't the tool. It's the brief.<\/p>\n<p>This is an opinion piece. No statistics, just a pattern I've watched in creator marketing and now in AI work.<\/p>\n<h2>The pattern<\/h2>\n<p>It goes like this:<\/p>\n<ol>\n<li>A team gets a vague brief. \"Make it engaging. Drive awareness. Something for Gen Z.\"<\/li>\n<li>They produce average work, because a vague brief can only produce average work. Good writers fill gaps with their best guess, and guesses average out.<\/li>\n<li>Someone tries the same brief in an AI tool. Average work comes back again, faster and cheaper.<\/li>\n<li>Someone looks at the pile of average drafts and concludes the team is the problem.<\/li>\n<\/ol>\n<p>The team wasn't the problem. Nobody had decided the goal, the audience, or the one thing the piece needed to say.<\/p>\n<h2>Why AI makes this worse, not better<\/h2>\n<p>A good human writer will push back on a vague brief. They'll ask \"who is this for?\" or \"what do you want people to do?\" An AI tool, by default, won't. It fills every gap with the most likely answer and hands it back with confidence.<\/p>\n<p>So a weak brief that used to produce one average draft can now produce fifty. It looks like productivity. It's the same problem at volume.<\/p>\n<h2>The brief is the skill<\/h2>\n<p>I wrote hundreds of creator briefs before I wrote my first prompt. The failures were identical: no clear goal, a fuzzy audience, too many messages, no example of what good looks like. The fix was identical too.<\/p>\n<p>A good brief answers:<\/p>\n<ul>\n<li><strong>Goal.<\/strong> One outcome. \"More sign-ups from the pricing page\", not \"awareness\".<\/li>\n<li><strong>Audience.<\/strong> Who, what they already know, what they care about.<\/li>\n<li><strong>The one thing.<\/strong> The single idea someone should remember.<\/li>\n<li><strong>Constraints.<\/strong> Tone, length, words to avoid, claims you can't make.<\/li>\n<li><strong>Example.<\/strong> Something close to what good looks like.<\/li>\n<li><strong>Success test.<\/strong> How you'll know it worked.<\/li>\n<\/ul>\n<p>With that, a content team does its best work. And AI does too. In my experience, teams that brief well get <em>more<\/em> out of AI, because they can tell good output from bad, and they know what to ask for next.<\/p>\n<h2>What this means for content teams<\/h2>\n<p>If you lead a content team, the strongest argument for your team isn't \"AI can't write\". It can. The argument is that someone has to decide what's worth writing, for whom, and why. That's strategy, and it starts with the brief.<\/p>\n<p>If you're on a content team, become the person who writes the best briefs. Ask the questions nobody asked. Turn \"make it pop\" into a goal, an audience and one message. That skill gets more valuable as the tools get faster.<\/p>\n<h2>What I'd do<\/h2>\n<ul>\n<li>Before any content request goes to a person or a tool, run it through the six questions above. If you can't answer one, stop and get the answer.<\/li>\n<li>Use the AI to check the brief, not just execute it. Ask it to <a target=\"_blank\" rel=\"noopener\" href=\"#read-make-ai-brief-you-back\">brief you back<\/a> before it writes.<\/li>\n<li>Keep a shared brief template. Mine is in <a target=\"_blank\" rel=\"noopener\" href=\"#read-brief-ai-like-an-agency\">Brief AI the way you'd brief a pro<\/a>.<\/li>\n<li>When work comes back average, look at the brief before you look at the writer.<\/li>\n<\/ul>\n<h2>Sources<\/h2>\n<p>No statistics in this one. It's an opinion based on my experience writing creator briefs and AI prompts. Related: <a target=\"_blank\" rel=\"noopener\" href=\"#read-brief-ai-like-an-agency\">Brief AI the way you'd brief a pro<\/a>.<\/p>"
 },
 {
  "slug": "campaign-report-three-decisions",
  "type": "workflow",
  "tools": [
   "multi"
  ],
  "level": "Beginner",
  "mins": 3,
  "rank": 103,
  "fresh": true,
  "title": "Turn any campaign report into three decisions with AI",
  "excerpt": "Three prompts that turn charts into a one-page memo.",
  "body": "<h1>Turn any campaign report into three decisions with AI<\/h1>\n<p>Most campaign reports are written to prove work was done. Thirty charts, every metric given equal weight, and a \"learnings\" slide at the end that nobody reaches. I've sat through plenty of these on the creator marketing side, and the meeting nearly always gets spent on slide two.<\/p>\n<p>What people actually read is page one. If page one says what to do next, the report did its job. So I now use AI to turn the report into a short decision memo, with the charts moved to the appendix.<\/p>\n<h2>The one rule: the sheet does the maths<\/h2>\n<p>Before any AI touches the report, every number is calculated in the spreadsheet: reach, engagement rate, CPM, cost per result, whatever you report on. If you need a refresher on those four, see <a target=\"_blank\" rel=\"noopener\" href=\"#read-creator-campaign-math\">Creator campaign math in plain English<\/a>.<\/p>\n<p>The AI never calculates. It only writes about numbers it's given. That removes most of the risk of an AI report quietly inventing or rounding something.<\/p>\n<h2>Pass 1: The so-what pass<\/h2>\n<p>Paste the finished table, then:<\/p>\n<pre><code>Here is our calculated campaign table: [paste].\nDo not recalculate or add any numbers.\n\nGive me exactly 3 decisions for next month:\n- KEEP: one thing to keep doing\n- CHANGE: one thing to change\n- STOP: one thing to stop\n\nFor each: the decision in one line, the number from the table that supports it, and one sentence on why.\nIf the data doesn't support a decision, say so instead of forcing one.\n<\/code><\/pre>\n<p>The last line matters. Three forced decisions are worse than two honest ones.<\/p>\n<h2>Pass 2: The sceptic pass<\/h2>\n<pre><code>Now act as a sceptical finance lead reading this.\nFor each decision: would you challenge it? What number or comparison would you ask for?\nBe specific and brief.\n<\/code><\/pre>\n<p>This is the meeting before the meeting. If the AI asks \"compared to what?\", your boss will too. Add the benchmark, or soften the decision.<\/p>\n<h2>Pass 3: The what-we-don't-know pass<\/h2>\n<pre><code>List what this data cannot tell us.\nFor each gap: why it matters, and what we could measure next time to close it.\nMax 4 points.\n<\/code><\/pre>\n<p>Typical answers: whether sales were caused by the campaign, how much reach overlapped between creators, what happened after the tracking window closed. Saying this out loud makes the report more trusted, not less. In my experience, clients relax when you name the limits before they find them.<\/p>\n<h2>Put it together<\/h2>\n<p>Your page one now has three parts:<\/p>\n<ol>\n<li><strong>Three decisions<\/strong>, each with its evidence number<\/li>\n<li><strong>What we'd challenge<\/strong>, already answered<\/li>\n<li><strong>What we don't know yet<\/strong>, and the plan to measure it<\/li>\n<\/ol>\n<p>Everything else, including every chart, goes behind it. Nothing is lost. It just stops being the report.<\/p>\n<h2>What I'd do<\/h2>\n<ul>\n<li>Build page one first next time, then decide which charts are needed to support it. You'll cut more than half.<\/li>\n<li>Save the three prompts in a Claude or ChatGPT Project, with your report template loaded, so it's one paste per campaign.<\/li>\n<li>Once it works for a few reports in a row, automate the weekly version. My setup is in <a target=\"_blank\" rel=\"noopener\" href=\"#read-report-that-writes-itself\">A weekly report that writes itself<\/a>.<\/li>\n<li>Always check the evidence number against the sheet before sending. AI can still copy a figure from the wrong row.<\/li>\n<\/ul>\n<h2>Sources<\/h2>\n<p>No statistics in this one. It's a workflow from my own reporting work. Related guides: <a target=\"_blank\" rel=\"noopener\" href=\"#read-report-that-writes-itself\">A weekly report that writes itself<\/a> and <a target=\"_blank\" rel=\"noopener\" href=\"#read-influencer-report-template\">The influencer campaign report clients actually read<\/a>.<\/p>"
 },
 {
  "slug": "creator-brief-mistakes-that-burn-budget",
  "type": "creator",
  "tools": [
   "multi"
  ],
  "level": "Beginner",
  "mins": 3,
  "rank": 104,
  "fresh": true,
  "title": "Five creator brief mistakes that quietly burn budget",
  "excerpt": "None of them look expensive until the reshoot.",
  "body": "<h1>Five creator brief mistakes that quietly burn budget<\/h1>\n<p>When a creator campaign goes over budget, people usually blame the creator: late drafts, off-brief content, a reshoot. Across 850+ creator deals, I've found the cause is more often upstream. It's in the brief.<\/p>\n<p>None of these mistakes look expensive on the day you send the brief. They show up weeks later as a reshoot, a missed posting date, or a video that sounds like an ad and performs like one. I've made some of these myself.<\/p>\n<h2>1. Writing the script for them<\/h2>\n<p>A word-for-word script feels safe. It isn't. You hired a creator for the way they talk to their audience, and a script takes that away. Viewers can tell when someone is reading brand copy, and they scroll.<\/p>\n<p><strong>Fix:<\/strong> write \"the one thing to get across\" and two or three must-include points. Let the creator say it in their own words. If you need a script for a paid ad, that's a different job, and should be briefed and paid as one.<\/p>\n<h2>2. Six key messages<\/h2>\n<p>Brands have a lot to say. A short video can carry one message well, maybe two. Ask for six and you'll get a rushed list that nobody remembers, or a creator who picks one and leaves your favourite out.<\/p>\n<p><strong>Fix:<\/strong> choose one message. Put everything else on the landing page, where people who are interested will read it.<\/p>\n<h2>3. No approved claims list<\/h2>\n<p>\"Talk about how good it is for your skin\" sounds harmless until legal sees the draft and every claim needs rewording. That's the most expensive time to change anything: the creator has filmed, edited and planned their posting date.<\/p>\n<p><strong>Fix:<\/strong> list the exact approved claims in the brief. Add a line on claims to avoid. If you're working across Europe, add the disclosure label too. My <a target=\"_blank\" rel=\"noopener\" href=\"#read-ad-labels-in-europe\">ad labels guide<\/a> covers the basics.<\/p>\n<h2>4. Feedback from everyone<\/h2>\n<p>The brand manager likes the draft. Then the product team, the regional lead and someone from legal each add notes, some of which contradict each other. The creator gets a long list of edits and goes into round three.<\/p>\n<p><strong>Fix:<\/strong> name one approver in the brief. Collect internal feedback before it reaches the creator. Cap feedback at two rounds, and say so in writing.<\/p>\n<h2>5. Hiding the real plan<\/h2>\n<p>If you plan to put paid budget behind the content, say so. Creators film differently for paid use: a strong opening line, cleaner cutdowns, nothing that dates the video quickly. Find out later, and you'll pay for edits, or for usage rights you didn't price in.<\/p>\n<p>The same goes for the real KPI. If the goal is clicks, not views, tell them. They'll structure the video around it.<\/p>\n<p><strong>Fix:<\/strong> put usage (organic, paid, how long, where) and the main KPI in the brief, and in the contract. My <a target=\"_blank\" rel=\"noopener\" href=\"#read-creator-contract-red-flags\">contract red flags guide<\/a> covers the clauses to check.<\/p>\n<h2>Use AI to check your brief<\/h2>\n<p>Before sending, paste your brief into any AI chat with this:<\/p>\n<pre><code>Review this creator brief as an experienced creator would.\nFlag: (1) any scripted lines that would sound unnatural, (2) more than 2 key messages,\n(3) missing approved claims, (4) unclear approval process, (5) missing usage or KPI.\nFor each issue, quote the line and suggest a one-line fix.\nBrief: [paste]\n<\/code><\/pre>\n<p>It won't catch everything, but it catches the obvious ones before a creator has to.<\/p>\n<h2>What I'd do<\/h2>\n<ul>\n<li>Use a one-page brief. Mine is <a target=\"_blank\" rel=\"noopener\" href=\"#read-one-page-creator-brief\">here<\/a>, free.<\/li>\n<li>Run the AI check above on every brief before it goes out.<\/li>\n<li>After each campaign, ask the creator one question: \"What in the brief made this harder?\" Then fix the template.<\/li>\n<\/ul>\n<h2>Sources<\/h2>\n<p>No statistics here. This is from my own experience across 850+ creator deals. Related: <a target=\"_blank\" rel=\"noopener\" href=\"#read-one-page-creator-brief\">The one-page creator brief<\/a>.<\/p>"
 },
 {
  "slug": "frontier-deployed-engineers-ai-ops",
  "type": "career",
  "tools": [
   "multi"
  ],
  "level": "Beginner",
  "mins": 3,
  "rank": 105,
  "fresh": true,
  "title": "Anthropic is training 10,000 'Frontier Deployed Engineers'. What marketers should take from it",
  "excerpt": "It's an engineering role. The shape of it is AI Ops.",
  "body": "<h1>Anthropic is training 10,000 'Frontier Deployed Engineers'. What marketers should take from it<\/h1>\n<p>On 2 October 2026, Anthropic launched <strong>Claude Frontier Academy<\/strong>, backed by a <strong>$100 million<\/strong> commitment. Its aim is to train <strong>10,000 Frontier Deployed Engineers (FDEs) by the end of 2027<\/strong>. Engineers from Accenture, Bain, Capgemini, Commonwealth Bank of Australia, Deloitte, McKinsey, Morgan Stanley and Novo Nordisk are in the first cohorts.<\/p>\n<p>I'm not an engineer, and this programme isn't for me. But I'm moving from creator marketing into AI Ops, and I think the way Anthropic describes this job is worth a close look for anyone on a similar path.<\/p>\n<h2>What Anthropic actually announced<\/h2>\n<p>According to Anthropic's announcement, the first programme is the <strong>Frontier Deployed Engineer Residency<\/strong>:<\/p>\n<ul>\n<li>It starts with a <strong>multi-day, in-person programme<\/strong> with Anthropic engineers and licensed instructors.<\/li>\n<li>Participants work through a <strong>simulated enterprise deployment<\/strong>, from choosing the right use case, through security review, to handover, and finish with a graded practical.<\/li>\n<li>Those who pass move into a <strong>12-week residency<\/strong>, leading a real Claude use case at their own organisation.<\/li>\n<li>It's for <strong>hands-on software engineers<\/strong>, and participation is <strong>by nomination<\/strong>. The first full badges are expected in <strong>early 2027<\/strong>.<\/li>\n<\/ul>\n<p>Commonwealth Bank's own newsroom confirmed that first intakes run in San Francisco, New York and London in October and November 2026, and that an initial group of 20 CommBank engineers will do a four-day intensive before the residency.<\/p>\n<h2>The shape of the job<\/h2>\n<p>Strip out the code and the role has three parts:<\/p>\n<ol>\n<li><strong>Pick the right problem.<\/strong> Which process is worth changing, and what would \"better\" mean?<\/li>\n<li><strong>Get it through safely.<\/strong> Security review, data access, compliance, sign-off.<\/li>\n<li><strong>Make people actually use it.<\/strong> Handover, training, adoption.<\/li>\n<\/ol>\n<p>The engineering is what makes it possible. But two of those three parts are about judgement, process and people. That's the part I'd call AI Ops, and it's where I think marketers can grow.<\/p>\n<h2>Why marketers are closer than they think<\/h2>\n<p>If you've run campaigns, you've already done versions of this:<\/p>\n<ul>\n<li><strong>Choosing the use case<\/strong> is like choosing the campaign objective. Most failures start with the wrong one.<\/li>\n<li><strong>Security review<\/strong> feels a lot like legal review of a creator contract or claims list. You learn which questions get asked, and you answer them before they're asked.<\/li>\n<li><strong>Adoption<\/strong> is a marketing problem. A tool nobody uses is a launch with no audience.<\/li>\n<\/ul>\n<p>I'm not saying a marketer can do an FDE's job. The building part is real engineering, and I'm still learning it. I'm saying the non-code half of AI rollout needs people who can brief, plan, persuade and measure. Those are marketing skills.<\/p>\n<h2>What I'd do<\/h2>\n<p>If you're a marketer curious about AI Ops, I'd start here:<\/p>\n<ul>\n<li><strong>Run one internal AI project end to end.<\/strong> Pick a small process (weekly reporting, brief writing), set a success test, get IT or legal sign-off, and track whether people still use it a month later.<\/li>\n<li><strong>Write it up like a deployment.<\/strong> Problem, approach, risks, review, adoption. That document is your portfolio piece.<\/li>\n<li><strong>Learn enough of the technical side to be useful.<\/strong> Projects, connectors, basic automation. My guide to <a target=\"_blank\" rel=\"noopener\" href=\"#read-connectors-and-mcp\">connectors and MCP<\/a> is a gentle start.<\/li>\n<li><strong>Read the job descriptions, not the hype.<\/strong> Look at what AI rollout roles actually ask for, and map your experience to it honestly.<\/li>\n<\/ul>\n<p>If you're an engineer who might get nominated, the residency sounds like a serious programme. If you're not, the lesson is in the structure: problem, safety, adoption. You can practise all three this month.<\/p>\n<h2>Sources<\/h2>\n<ul>\n<li>Anthropic, \"Anthropic invests $100 million to train 10,000 engineers and tackle the enterprise AI talent gap\", 2 October 2026: <a target=\"_blank\" rel=\"noopener\" href=\"https://www.anthropic.com/news/claude-frontier-academy\">anthropic.com/news/claude-frontier-academy<\/a><\/li>\n<li>Commonwealth Bank of Australia newsroom, \"CommBank engineers deepen expertise through Anthropic's Claude Frontier Academy\", 3 October 2026: <a target=\"_blank\" rel=\"noopener\" href=\"https://www.commbank.com.au/articles/newsroom/2026/10/commbank-engineers-anthropic-claude-frontier-academy.html\">commbank.com.au<\/a><\/li>\n<\/ul>"
 },
 {
  "slug": "google-ai-max-ai-brief-languages",
  "type": "guide",
  "tools": [
   "multi"
  ],
  "level": "Beginner",
  "mins": 3,
  "rank": 107,
  "fresh": true,
  "title": "Google's AI Max now takes briefs in German, French and five more languages",
  "excerpt": "AI Brief expands to 7 languages, plus a new AI Max report.",
  "body": "<h2>Google's AI Max now speaks seven more languages<\/h2>\n<p>On 23 September, Google announced two updates for <strong>AI Max for Search<\/strong>, its AI driven Search campaign feature.<\/p>\n<ol>\n<li>The closed beta of <strong>AI Brief<\/strong> is expanding to <strong>Dutch, French, German, Italian, Japanese, Portuguese and Spanish<\/strong>.<\/li>\n<li>A new <strong>unified reporting<\/strong> view for the Search ads journey.<\/li>\n<\/ol>\n<p>For European advertisers, the first one matters a lot.<\/p>\n<h2>What AI Brief does<\/h2>\n<p>In Google's words, AI Brief \"lets you guide AI Max in your own words with detailed context on your business, audience, and key messaging.\"<\/p>\n<p>In practice, it's a written brief for the machine. Instead of only feeding the system keywords, assets and a URL, you tell it who you serve, what you offer and what you want to say. Until now, that was limited in language. Now advertisers can write it in seven more languages, including German and French.<\/p>\n<p>It's still a <strong>closed beta<\/strong>, so not every account will see it.<\/p>\n<h2>The new report<\/h2>\n<p>Google is also introducing a reporting feature that shows a single view of the Search ads journey:<\/p>\n<ul>\n<li>which <strong>search terms<\/strong> triggered your ads<\/li>\n<li>which <strong>creative assets<\/strong> the user saw<\/li>\n<li>where they <strong>landed<\/strong> on your website<\/li>\n<\/ul>\n<p>That's useful because AI Max decides a lot on its own, from matching to creative. Seeing the full path in one place makes it easier to check whether the AI's choices make sense for your business. Google hasn't announced when the report will be generally available.<\/p>\n<h2>Why the brief is becoming the main asset<\/h2>\n<p>When AI picks the queries and assembles the ads, your control shifts upstream. The brief is where your strategy lives now. A good brief is specific about audience, offer and boundaries. A weak one gives the AI room to guess.<\/p>\n<p>That's also why language matters. A German brief can use the actual words German customers search with, instead of a translation of an English idea.<\/p>\n<h2>What I'd do<\/h2>\n<ul>\n<li><strong>Write the brief in your customers' language,<\/strong> not your head office's language.<\/li>\n<li><strong>Include what you don't want.<\/strong> Products you don't sell, claims you can't make, audiences that aren't a fit.<\/li>\n<li><strong>Name your top three messages.<\/strong> In priority order, in plain words.<\/li>\n<li><strong>Add proof points.<\/strong> Delivery times, guarantees, certifications. Real ones only.<\/li>\n<li><strong>Review the new report monthly<\/strong> once it's available: search term, creative, landing page. If any link in that chain looks wrong, fix the brief first.<\/li>\n<\/ul>\n<p>My limit: I don't have access data for this beta, so I can't tell you how much a brief changes results. Treat it as a test with a control period.<\/p>\n<h2>Sources<\/h2>\n<ul>\n<li><a target=\"_blank\" rel=\"noopener\" href=\"https://blog.google/products/ads-commerce/ai-max-language-reporting-features/\">Google Ads &amp; Commerce Blog: AI Brief in more languages and new AI Max reporting (23 Sep 2026)<\/a><\/li>\n<li><a target=\"_blank\" rel=\"noopener\" href=\"https://www.techwyse.com/news/platform-updates/google-ai-max-unified-reporting-ai-brief-language-expansion\">TechWyse: Google adds unified Search ads reporting to AI Max and expands AI Brief<\/a><\/li>\n<\/ul>"
 },
 {
  "slug": "instagram-edits-ai-assistant",
  "type": "creator",
  "tools": [
   "multi"
  ],
  "level": "Beginner",
  "mins": 3,
  "rank": 108,
  "fresh": true,
  "title": "Instagram's Edits app now has an AI assistant that reads your Reels data",
  "excerpt": "It does the analysis. The creative calls stay yours.",
  "body": "<h2>Instagram's Edits app now reads your numbers for you<\/h2>\n<p>On 30 September, Instagram announced an AI video assistant inside <strong>Edits<\/strong>, its video editing app. It's a chat assistant, but the selling point isn't editing. It's analysis.<\/p>\n<h2>What the Edits assistant does<\/h2>\n<p>Brett Westervelt, who leads Edits, described it like this: the assistant knows your account's Instagram metrics, \"things like follows, views, video retention, likes, shares,\" and combines them with your comments, what's trending on Instagram and what your audience is into. He said it can spot patterns in performance over time and surface insights that are hard to see from the metrics alone.<\/p>\n<p>From there, it suggests what to make next. PetaPixel summed it up as an assistant that analyses your Reels and suggests new ideas.<\/p>\n<h2>The pitch: analysis, not authorship<\/h2>\n<p>The most interesting line from Instagram is about what the tool won't do. Westervelt said creators consistently told the team they want \"a tool that handles the analysis, not one that does the creative work for them.\" His summary: \"Edits assistant does the digging for you. The creative calls are still yours.\"<\/p>\n<p>That matches what LinkedIn did with its proofreader. Platforms are learning that audiences push back on content that feels generated. So the AI is moving behind the scenes, into data and planning.<\/p>\n<h2>The catch<\/h2>\n<ul>\n<li><strong>It's capped.<\/strong> Creators hit a usage limit and can get more with a Meta One subscription.<\/li>\n<li><strong>It only sees Instagram.<\/strong> The assistant works from your Instagram data. Your TikTok or YouTube performance isn't part of the picture.<\/li>\n<li><strong>Suggestions are still guesses.<\/strong> Patterns in past data don't guarantee the next video works. Treat ideas as hypotheses to test.<\/li>\n<\/ul>\n<p>Meta first previewed the assistant in June at an invite-only creator event, and TechCrunch notes YouTube is working on its own conversational editing tool for early next year. Expect this to become standard.<\/p>\n<h2>Why this matters for brands<\/h2>\n<p>Having worked on 850+ creator deals, I'd always rather see a creator's retention and share data than a follower count. Followers tell you reach. Retention tells you whether people actually watched.<\/p>\n<p>If creators get an assistant that turns their own stats into clear insight, two things change:<\/p>\n<ol>\n<li>Creator pitches get sharper, with reasons for each content idea.<\/li>\n<li>Brand briefs that ignore the creator's data will look lazy by comparison.<\/li>\n<\/ol>\n<h2>What I'd do<\/h2>\n<ul>\n<li><strong>Creators:<\/strong> ask the assistant one question a week: \"Which of my last 10 Reels kept people watching longest, and what did they have in common?\" Then make one video that tests the answer.<\/li>\n<li><strong>Brands and agencies:<\/strong> ask creators to share what their assistant suggests before you send a brief. Build the brief around their audience, not your mood board.<\/li>\n<li><strong>Everyone:<\/strong> keep the creative call human. Use the data to choose the topic. Use your taste to make it.<\/li>\n<\/ul>\n<h2>Sources<\/h2>\n<ul>\n<li><a target=\"_blank\" rel=\"noopener\" href=\"https://techcrunch.com/2026/09/30/instagram-rolls-out-an-ai-video-assistant-for-creators/\">TechCrunch: Instagram rolls out an AI video assistant for creators (30 Sep 2026)<\/a><\/li>\n<li><a target=\"_blank\" rel=\"noopener\" href=\"https://petapixel.com/2026/10/01/instagram-launches-ai-assistant-that-analyzes-your-reels-and-suggests-new-ideas/\">PetaPixel: Instagram launches AI assistant that analyzes your Reels and suggests new ideas (1 Oct 2026)<\/a><\/li>\n<\/ul>"
 },
 {
  "slug": "linkedin-post-proofreader",
  "type": "guide",
  "tools": [
   "multi"
  ],
  "level": "Beginner",
  "mins": 3,
  "rank": 109,
  "fresh": true,
  "title": "LinkedIn retired its AI post writer and launched a proofreader instead",
  "excerpt": "The replacement only edits words you already wrote.",
  "body": "<h2>LinkedIn swapped its AI writer for a proofreader<\/h2>\n<p>LinkedIn has rolled out a feature called <strong>Post Proofreader<\/strong> for eligible Premium members. It replaces the AI powered \"post enhancement\" option, the button that used to rewrite your draft for you, which LinkedIn removed the month before.<\/p>\n<p>The difference sounds small. It isn't.<\/p>\n<h2>What Post Proofreader actually does<\/h2>\n<p>According to LinkedIn, the tool \"helps eligible Premium members improve post drafts before publishing.\" You see suggested changes before anything is applied, with inline change tracking, so you can check what changed and decide whether to keep it.<\/p>\n<p>The options focus on three jobs:<\/p>\n<ul>\n<li>reviewing spelling, grammar and punctuation<\/li>\n<li>shortening a post while keeping its meaning<\/li>\n<li>improving clarity<\/li>\n<\/ul>\n<p>What it no longer does is generate a post that didn't start with you. Social Media Today framed it well: the shift is about improving post language, not producing an idea that didn't originate from the person posting.<\/p>\n<h2>Why LinkedIn made the change<\/h2>\n<p>The context is the \"AI slop\" backlash. LinkedIn added an option for members to report content they believe is low quality AI output. Less than three weeks after launch, that option had been used <strong>more than one million times<\/strong>. In September, LinkedIn extended reporting to comments as well.<\/p>\n<p>So the platform is sending a fairly clear signal. Generated posts are a reputational risk for LinkedIn. Polished human posts are what it wants more of.<\/p>\n<h2>What this means for marketers and founders<\/h2>\n<p>If you run a personal brand, a founder account or an employee advocacy programme, this matters in three ways:<\/p>\n<ol>\n<li><strong>The tools are moving towards editing, not authoring.<\/strong> Expect more features like this, and fewer \"write it for me\" buttons, on the platform itself.<\/li>\n<li><strong>Readers are now actively flagging content.<\/strong> A post that reads as generic can now get reported, not just ignored.<\/li>\n<li><strong>Voice becomes the differentiator.<\/strong> When everyone can produce clean text, the specific opinion, story or number is what earns attention.<\/li>\n<\/ol>\n<p>I'll admit the limit here: LinkedIn hasn't said how reports affect reach, so I wouldn't claim it punishes AI writing. What we know is that members are reporting it in large numbers, and LinkedIn is redesigning its own tools around that.<\/p>\n<h2>What I'd do<\/h2>\n<ul>\n<li><strong>Write the first draft yourself.<\/strong> Voice notes work. Bullet points work. It just has to be your thinking.<\/li>\n<li><strong>Use AI for the second pass only.<\/strong> Ask for grammar fixes, a shorter version, or a clarity check. Keep your wording.<\/li>\n<li><strong>Read the tracked changes.<\/strong> If a suggestion makes you sound like everyone else, reject it.<\/li>\n<li><strong>Brief your ghostwriters and agencies the same way.<\/strong> Their job is to sharpen the founder's voice, not replace it.<\/li>\n<li><strong>Keep one specific detail in every post.<\/strong> A real number, a real moment, a real opinion. That's the part no tool can supply.<\/li>\n<\/ul>\n<p>From my own work across 850+ creator deals, the content that travelled was rarely the most polished. It was the most specific. LinkedIn seems to be betting on the same thing.<\/p>\n<h2>Sources<\/h2>\n<ul>\n<li><a target=\"_blank\" rel=\"noopener\" href=\"https://www.socialmediatoday.com/news/linkedin-ditches-post-enhancement-launches-post-proofreader/830851/\">Social Media Today: LinkedIn ditches post enhancement, launches Post Proofreader (20 Sep 2026)<\/a><\/li>\n<li><a target=\"_blank\" rel=\"noopener\" href=\"https://www.linkedin.com/help/linkedin/answer/a16661057\">LinkedIn Help: Post Proofreader<\/a><\/li>\n<li><a target=\"_blank\" rel=\"noopener\" href=\"https://www.socialmediatoday.com/news/linkedin-says-1m-people-have-reported-ai-slop/828465/\">Social Media Today: LinkedIn says 1M people have reported AI slop<\/a><\/li>\n<li><a target=\"_blank\" rel=\"noopener\" href=\"https://news.linkedin.com/2026/how-linkedin-is-tackling-ai-slop\">LinkedIn News: How LinkedIn is tackling AI slop<\/a><\/li>\n<\/ul>"
 },
 {
  "slug": "made-on-youtube-creator-tools",
  "type": "creator",
  "tools": [
   "multi"
  ],
  "level": "Beginner",
  "mins": 3,
  "rank": 110,
  "fresh": true,
  "title": "Made On YouTube 2026: the creator tools that matter for brands",
  "excerpt": "5 Made On YouTube updates creators and brands should know.",
  "body": "<h2>Made On YouTube 2026, filtered for creators and brands<\/h2>\n<p>On 23 September, YouTube announced its yearly batch of product updates at <strong>Made On YouTube 2026<\/strong>. There's a lot in there. Here are the five updates I think matter most for creators and the brands that work with them.<\/p>\n<h2>1. An AI editing assistant you talk to<\/h2>\n<p>YouTube is integrating Gemini into a <strong>conversational editing assistant<\/strong> for Shorts and the YouTube Create app. According to YouTube, creators can use text prompts to <strong>trim speech, sync music, add text hooks and reorder frames<\/strong>.<\/p>\n<p>TechCrunch reports the tool should be available early next year. So this is coming, not here.<\/p>\n<p>Why it matters: the boring parts of short-form editing are exactly the parts that slow creators down. If a prompt can tighten the first three seconds and add a hook, more creators can publish more often.<\/p>\n<h2>2. Shorts series<\/h2>\n<p>Creators can now structure Shorts into <strong>seasons and episodes<\/strong>, making episodic storytelling and microdramas easier to watch on mobile and TV.<\/p>\n<p>For brands, that opens a format beyond the single sponsored video: a short branded series with a story that carries across episodes.<\/p>\n<h2>3. Likeness detection for face and voice<\/h2>\n<p>YouTube says creators can <strong>protect their voice and face with expanded likeness detection<\/strong>. As AI generated copies of real people get easier to make, this is becoming a practical safety tool, not a niche feature.<\/p>\n<h2>4. Getting noticed by brands<\/h2>\n<p>YouTube also highlighted ways for creators to <strong>get noticed by brands and find resources for pitching partnerships<\/strong>. Details are still emerging, but the direction is clear: YouTube wants more of the brand deal process to happen on YouTube.<\/p>\n<h2>5. Live auto-dubbing<\/h2>\n<p>Live streamers get <strong>real-time auto-dubbing<\/strong> to break language barriers. For creators with international audiences, a live Q&amp;A or product launch could reach viewers who don't speak the creator's language.<\/p>\n<h2>What it means for brand partnerships<\/h2>\n<p>From my work across 850+ creator deals, three practical changes follow:<\/p>\n<ul>\n<li><strong>Contracts need likeness terms.<\/strong> Who can use the creator's face and voice, for how long, and whether AI versions are allowed. Write it down.<\/li>\n<li><strong>Briefs can ask for series, not one-offs.<\/strong> A three-episode Shorts arc may tell your story better than one 60-second ad.<\/li>\n<li><strong>Production timelines may shrink.<\/strong> If editing gets faster, plan for quicker turnarounds, but keep review steps.<\/li>\n<\/ul>\n<h2>What I'd do<\/h2>\n<ul>\n<li>Creators: register for likeness detection as soon as it's available to you.<\/li>\n<li>Brands: add an AI and likeness clause to your next creator contract.<\/li>\n<li>Both: sketch one Shorts series idea now, so you're ready when your audience starts watching in episodes.<\/li>\n<\/ul>\n<p>My limit: several of these features roll out over the coming months, and some may arrive in the US first. Check availability in your market before planning around them.<\/p>\n<h2>Sources<\/h2>\n<ul>\n<li><a target=\"_blank\" rel=\"noopener\" href=\"https://blog.youtube/madeonyoutube/\">YouTube Official Blog: Made On YouTube<\/a><\/li>\n<li><a target=\"_blank\" rel=\"noopener\" href=\"https://blog.google/products-and-platforms/products/youtube/made-on-youtube-updates-2026/\">Google Blog: Here's what was announced at Made On YouTube 2026 (23 Sep 2026)<\/a><\/li>\n<li><a target=\"_blank\" rel=\"noopener\" href=\"https://techcrunch.com/2026/09/30/instagram-rolls-out-an-ai-video-assistant-for-creators/\">TechCrunch: Instagram rolls out an AI video assistant for creators, noting YouTube's editing tool timing (30 Sep 2026)<\/a><\/li>\n<\/ul>"
 },
 {
  "slug": "make-ai-brief-you-back",
  "type": "workflow",
  "tools": [
   "multi"
  ],
  "level": "Beginner",
  "mins": 3,
  "rank": 111,
  "fresh": true,
  "title": "Make AI brief you back before it writes a word",
  "excerpt": "The agency habit that catches a bad brief in two minutes.",
  "body": "<h1>Make AI brief you back before it writes a word<\/h1>\n<p>Most weak AI drafts I see aren't a model problem. They're a listening problem. The AI read your brief, missed what mattered, filled every gap with the most average guess, and then wrote 600 confident words in the wrong direction.<\/p>\n<p>Agencies solved this long before AI. It's called the <strong>brief-back<\/strong>. When a client hands over a brief, the team doesn't start writing. They come back and say: \"Here's what we heard. Here's what we think is missing. Here's what we're assuming.\" Only when both sides agree does the work start.<\/p>\n<p>I've written hundreds of creator briefs, and the brief-back caught more problems than any revision round. So I now run it with AI on anything longer than a caption.<\/p>\n<h2>Step 1: Paste the brief and stop it writing<\/h2>\n<p>Use whatever brief you have. If you use my <a target=\"_blank\" rel=\"noopener\" href=\"#read-brief-ai-like-an-agency\">six-box brief<\/a>, even better. Then add this:<\/p>\n<pre><code>Don't write anything yet. Brief me back first.\n\n1. WHAT I HEARD: the goal, audience and main message, in your own words, 3 lines max.\n2. WHAT'S MISSING: anything you'd need to do this well that I haven't given you.\n3. WHAT YOU'RE ASSUMING: every gap you'd fill with a guess. Label each guess.\n4. SUCCESS TEST: how we'd know this piece worked, in one sentence.\n5. ONE RISK: the most likely way this goes wrong.\n\nKeep it short. Ask, don't fill.\n<\/code><\/pre>\n<h2>Step 2: Read it like a client, not a writer<\/h2>\n<p>This is the useful part. Look for three things:<\/p>\n<ul>\n<li><strong>A goal you didn't mean.<\/strong> If it says \"drive awareness\" and you meant \"get sign-ups\", the whole draft would have been wrong.<\/li>\n<li><strong>Assumptions that are guesses about your audience.<\/strong> These are where generic copy comes from.<\/li>\n<li><strong>A success test you can't measure.<\/strong> If neither of you can say what \"worked\" means, nobody can judge the draft.<\/li>\n<\/ul>\n<p>Honest bit: the first few times I did this, most of the gaps were mine. Vague goal, no audience detail, nothing about what to avoid. The AI didn't create those problems. It made them visible.<\/p>\n<h2>Step 3: Fix the brief, not the draft<\/h2>\n<p>Answer its questions in the same chat. Correct anything it misheard. Then lock it:<\/p>\n<pre><code>Update the brief with my answers. Show me the final version in the same 5 parts.\n<\/code><\/pre>\n<p>If the final brief-back reads right, the draft usually will too. If it still feels off, fix it here. Rewriting a brief takes a minute. Rewriting three drafts takes an afternoon.<\/p>\n<h2>Step 4: Write from the agreed brief only<\/h2>\n<pre><code>Now write it. Use only what we agreed above.\nIf you need to assume anything new, list it at the end instead of guessing in the copy.\n<\/code><\/pre>\n<p>That last line matters. It stops new guesses sneaking into the copy and tells you exactly what to check.<\/p>\n<h2>When to skip it<\/h2>\n<p>Not everything needs a brief-back. A quick caption or a subject line test, just ask. I use it for anything that goes to a client, a creator, or a boss: campaign briefs, landing page copy, scripts, reports.<\/p>\n<h2>What I'd do<\/h2>\n<ul>\n<li>Save the Step 1 prompt as a text snippet or inside a Claude or ChatGPT Project so it's one click.<\/li>\n<li>Run it on the next brief you'd normally just hand over, and count the gaps it finds.<\/li>\n<li>Use the same habit with people. Ask a freelancer or creator to brief you back in three lines before they start. It's polite, and it saves everyone a revision round.<\/li>\n<\/ul>\n<h2>Sources<\/h2>\n<p>No statistics in this one. It's a workflow I use, built on the agency brief-back habit and my own creator briefing work. Related guide: <a target=\"_blank\" rel=\"noopener\" href=\"#read-brief-ai-like-an-agency\">Brief AI the way you'd brief a pro<\/a>.<\/p>"
 },
 {
  "slug": "meta-muse-small-business",
  "type": "guide",
  "tools": [
   "multi"
  ],
  "level": "Beginner",
  "mins": 3,
  "rank": 112,
  "fresh": true,
  "title": "Meta's Muse agent now plugs into small business shops, books and ad accounts",
  "excerpt": "Muse for Small Business needs your approval before it acts.",
  "body": "<h2>Meta takes Muse to small businesses<\/h2>\n<p>On 29 September, Meta announced <strong>Muse for Small Business<\/strong>, a version of its Muse AI agent that connects to the software owners already use to run their companies. Muse itself launched on 8 September for users in the US and Canada as a personal assistant.<\/p>\n<h2>What it connects to<\/h2>\n<p>According to Meta's announcement, as reported by The Next Web:<\/p>\n<ul>\n<li><strong>Commerce and money:<\/strong> Shopify, Stripe and Intuit's QuickBooks, among others<\/li>\n<li><strong>Design:<\/strong> Canva<\/li>\n<li><strong>Meta's own tools:<\/strong> analytics from Instagram business accounts and Facebook Pages, plus Meta ad accounts<\/li>\n<li><strong>Work apps:<\/strong> Slack, Zoom, Notion, Figma and Dropbox<\/li>\n<li><strong>Custom connectors<\/strong> for services Meta doesn't support yet<\/li>\n<\/ul>\n<p>With those connections, Muse can draw on a company's brand, shop, accounts and customer records. Reuters reported that owners can ask it to analyse sales, campaigns and social activity, develop a growth plan, draft customer communications, and create ads and other content.<\/p>\n<h2>The approval rule<\/h2>\n<p>Meta said the agent will not post content, send messages or buy anything without the owner's approval. That's the most important line in the announcement. It turns Muse into a drafting and analysis assistant with a human sign-off, not an autopilot.<\/p>\n<h2>Why Meta is doing this<\/h2>\n<p>Meta's Vishal Shah told Axios that roughly <strong>one in three<\/strong> people who tried Muse early had already connected it to a business account of some kind. \"People are using Muse to run their business,\" he said. In other words, owners were already doing this informally. Meta is making it official.<\/p>\n<p>Most people can use Muse at no cost, with paid plans offering higher usage limits.<\/p>\n<h2>What it means for marketers<\/h2>\n<p>For a small business, the appeal is obvious: one assistant that can see your sales, your social stats and your ad account in the same conversation. The usual problem with small business marketing isn't a lack of tools. It's that nobody has time to join the dots between them.<\/p>\n<p>The risk is just as obvious. An agent that drafts ads from your data will reflect the quality of your inputs. If your positioning is fuzzy, it will produce fuzzy ads at scale.<\/p>\n<h2>What I'd do<\/h2>\n<ul>\n<li><strong>Write a one-page brand brief first.<\/strong> Who you sell to, what you promise, three words for your tone, and words you never use.<\/li>\n<li><strong>Start with analysis, not creation.<\/strong> Ask it what changed in sales and campaigns this month before you ask it for new ads.<\/li>\n<li><strong>Keep approval as a habit.<\/strong> Read every draft as if a junior wrote it. Because, in effect, one did.<\/li>\n<li><strong>Check what it can see.<\/strong> Connect only the accounts it needs for the job.<\/li>\n<li><strong>Compare against a human version.<\/strong> Run one AI-drafted ad next to one you wrote, and let the numbers decide.<\/li>\n<\/ul>\n<p>My limit: Muse is available in the US and Canada, and I haven't tested the business version myself. These are the launch details, plus how I'd approach any new marketing agent.<\/p>\n<h2>Sources<\/h2>\n<ul>\n<li><a target=\"_blank\" rel=\"noopener\" href=\"https://about.fb.com/news/2026/09/introducing-muse-small-business/\">Meta Newsroom: Introducing Muse for Small Business<\/a><\/li>\n<li><a target=\"_blank\" rel=\"noopener\" href=\"https://thenextweb.com/news/meta-muse-small-business-ai-agent\">The Next Web: Meta launches Muse for small businesses, linking its AI agent to Shopify (29 Sep 2026)<\/a><\/li>\n<li><a target=\"_blank\" rel=\"noopener\" href=\"https://www.thestar.com.my/tech/tech-news/2026/09/29/meta-expands-muse-ai-agent-for-small-businesses\">The Star (Reuters): Meta expands Muse AI agent for small businesses (29 Sep 2026)<\/a><\/li>\n<\/ul>"
 },
 {
  "slug": "openai-dots-always-on-agents",
  "type": "guide",
  "tools": [
   "multi"
  ],
  "level": "Beginner",
  "mins": 3,
  "rank": 113,
  "fresh": true,
  "title": "OpenAI launched Dots: always-on ChatGPT agents with their own computers",
  "excerpt": "OpenAI's Dots get their own cloud computer. Europe waits.",
  "body": "<h2>OpenAI's Dots: agents that don't wait for you<\/h2>\n<p>At DevDay on 29 September, OpenAI launched <strong>Dots<\/strong>, a set of always-on AI agents inside ChatGPT. The idea is simple: instead of prompting ChatGPT one task at a time, you give an agent a goal and it keeps moving the work forward.<\/p>\n<h2>How Dots work<\/h2>\n<p>Based on OpenAI's announcement and SiliconANGLE's coverage:<\/p>\n<ul>\n<li><strong>Powered by GPT-6 Astra.<\/strong><\/li>\n<li><strong>Its own cloud computer.<\/strong> Each agent works on a machine you can open at any time to see what it is doing.<\/li>\n<li><strong>4,000+ apps.<\/strong> More than 4,000 apps are reachable through OpenAI's plugins. With permission, an agent can also work directly on your laptop.<\/li>\n<li><strong>Where you talk to it.<\/strong> ChatGPT on desktop, web or mobile, plus Slack and Teams. Context follows the agent between channels.<\/li>\n<li><strong>It learns your preferences<\/strong> from feedback, and OpenAI says some work will show up before anyone asks for it.<\/li>\n<\/ul>\n<h2>The safety rails<\/h2>\n<p>When nobody has given it a task, a Dot does what OpenAI calls proactive research. During that time, its app connections are read-only, so it can't send messages or change anything. Actions that could touch your accounts or share information must pass a check called auto-review. And OpenAI itself tells users to review consequential work because the agents \"can still make mistakes.\"<\/p>\n<p>One example in the coverage: an early tester had forgotten to bill a client. His agent noticed, prepared the invoice and waited for approval before sending it. That's the pattern to copy. Agent prepares, human approves.<\/p>\n<h2>Who gets it, and who doesn't<\/h2>\n<p>Dots began rolling out to ChatGPT <strong>Pro and Business Premium<\/strong> subscribers. One agent is included at no extra cost. More agents and more capacity are planned later, at prices OpenAI hasn't disclosed.<\/p>\n<p>The catch for my European readers: <strong>Pro subscribers in the European Economic Area, Switzerland and the UK are not included.<\/strong> Enterprise customers can try a beta once an admin switches it on.<\/p>\n<h2>Why marketers should care<\/h2>\n<p>Most marketing work is a chain of small, repeatable steps: pull the numbers, spot the change, draft the update, chase the approval. That's exactly the shape of work an always-on agent is built for. The question isn't whether agents will touch marketing ops. It's whether your processes are written down clearly enough for one to follow.<\/p>\n<h2>What I'd do<\/h2>\n<ul>\n<li><strong>Write the job description first.<\/strong> One goal, the apps it can touch, and what it must never do alone.<\/li>\n<li><strong>Start read-only.<\/strong> Reporting and research before anything that sends, posts or spends.<\/li>\n<li><strong>Define approval points.<\/strong> Anything customer-facing or money-related gets a human check. Always.<\/li>\n<li><strong>Pick a boring task.<\/strong> Weekly campaign summaries are a better first job than brand strategy.<\/li>\n<li><strong>If you're in Europe,<\/strong> use the waiting time to document your workflows. That's the work that makes agents useful later.<\/li>\n<\/ul>\n<p>I'm honest about my limit here: I haven't used Dots myself yet. This is based on the launch details, not hands-on testing.<\/p>\n<h2>Sources<\/h2>\n<ul>\n<li><a target=\"_blank\" rel=\"noopener\" href=\"https://siliconangle.com/2026/09/29/openai-launches-dots-always-on-ai-agents-in-chatgpt-with-their-own-cloud-computers/\">SiliconANGLE: OpenAI launches Dots, always-on AI agents in ChatGPT with their own cloud computers (29 Sep 2026)<\/a><\/li>\n<li><a target=\"_blank\" rel=\"noopener\" href=\"https://openai.com/index/introducing-dots/\">OpenAI: Introducing Dots<\/a><\/li>\n<\/ul>"
 },
 {
  "slug": "tiktok-buy-direct-ad-network",
  "type": "guide",
  "tools": [
   "multi"
  ],
  "level": "Beginner",
  "mins": 3,
  "rank": 114,
  "fresh": true,
  "title": "TikTok wants shoppers to buy from the For You feed in one click",
  "excerpt": "Plus an AI shopping assistant and ads in 400k outside apps.",
  "body": "<h2>TikTok's plan: close the sale inside the feed<\/h2>\n<p>At Advertising Week New York 2026, TikTok unveiled a package of AI driven advertising and commerce products. Taken together, they point in one direction: discovery, questions and checkout, without leaving TikTok.<\/p>\n<h2>What TikTok announced<\/h2>\n<p><strong>Buy Direct.<\/strong> An in-app checkout. According to TikTok, users can buy from a brand without leaving the app, from the For You feed with a single click.<\/p>\n<p><strong>Shopping Assistant.<\/strong> A conversational AI agent that, TikTok says, remembers what a user needs and gives real-time guidance on product details, shipping, sizing, availability and purchasing in one conversation.<\/p>\n<p><strong>Agentic Leads.<\/strong> An AI agent for lead generation that \"will be available\" as a Lead Agent in TikTok Direct Messages and in lead forms on advertisers' own websites.<\/p>\n<p><strong>TikTok Ad Network for US advertisers.<\/strong> Campaigns can extend beyond TikTok to a network of <strong>nearly 400,000 apps<\/strong> worldwide, managed inside TikTok Ads Manager.<\/p>\n<p><strong>TikTok for Business MCP as a connector.<\/strong> TikTok's ads interface is now available inside AI platforms including Claude, Perplexity, Replit and Manus. TikTok says the number of advertisers using the MCP has risen by <strong>over 200%<\/strong> since launch, based on internal data. It didn't give a starting number, so treat that figure carefully.<\/p>\n<h2>The catch<\/h2>\n<p>PPC Land pointed out that the announcement contains <strong>no pricing and no dated rollout schedule<\/strong> for any of the new items. Buy Direct, for example, has no stated start date, no list of markets and no detail on what buyer data reaches the brand.<\/p>\n<p>So this is a direction of travel, not a switch you can flip tomorrow.<\/p>\n<h2>Why it matters for marketers<\/h2>\n<p>For years the social commerce funnel looked like this: video, profile, link, website, cart, checkout. Every step lost people. TikTok is trying to collapse that into: video, one click.<\/p>\n<p>If it works, two things change:<\/p>\n<ol>\n<li><strong>Your product page data matters more than your landing page design.<\/strong> An AI assistant answering \"will this fit?\" needs clear sizing, shipping and stock information to work with.<\/li>\n<li><strong>Creative becomes the checkout.<\/strong> The video isn't the top of the funnel any more. It might be the whole funnel.<\/li>\n<\/ol>\n<h2>What I'd do<\/h2>\n<ul>\n<li><strong>Audit your product data.<\/strong> Sizes, materials, delivery times, returns. Write them clearly, in one place.<\/li>\n<li><strong>Prepare a FAQ for the assistant era.<\/strong> List the ten questions customers ask your support team before buying. Make sure every answer is public.<\/li>\n<li><strong>Test the ad network carefully.<\/strong> If you're a US advertiser, start with a small budget and compare results to in-feed placements.<\/li>\n<li><strong>Try the MCP connector for reporting first.<\/strong> Asking an assistant to summarise campaign performance is a low-risk way to learn the tool.<\/li>\n<li><strong>Don't bet the quarter on undated features.<\/strong> Plan for them. Budget for them when they have a date.<\/li>\n<\/ul>\n<p>Having worked on 850+ creator deals, I've seen how often a great video lost the sale at the link in bio. One-click checkout from the feed goes straight at that problem. I'll believe the impact when brands report results.<\/p>\n<h2>Sources<\/h2>\n<ul>\n<li><a target=\"_blank\" rel=\"noopener\" href=\"https://newsroom.tiktok.com/tiktok-unveils-ai-powered-updates-for-advertisers-driving-discovery-action-and-measurable-business-outcomes?lang=en\">TikTok Newsroom: TikTok unveils AI powered updates for advertisers<\/a><\/li>\n<li><a target=\"_blank\" rel=\"noopener\" href=\"https://ppc.land/tiktok-opens-ad-network-of-nearly-400-000-apps-to-us-advertisers/\">PPC Land: TikTok opens ad network of nearly 400,000 apps to US advertisers (5 Oct 2026)<\/a><\/li>\n<li><a target=\"_blank\" rel=\"noopener\" href=\"https://musically.com/2026/10/06/tiktok-launches-an-external-ad-network-across-nearly-400k-apps/\">Music Ally: TikTok launches an external ad network across nearly 400k apps (6 Oct 2026)<\/a><\/li>\n<\/ul>"
 },
 {
  "slug": "what-predicts-good-creator-partnership",
  "type": "creator",
  "tools": [
   "multi"
  ],
  "level": "Beginner",
  "mins": 3,
  "rank": 115,
  "fresh": true,
  "title": "What actually predicts a good creator partnership",
  "excerpt": "What 850+ creator deals taught me to look for first.",
  "body": "<h1>What actually predicts a good creator partnership<\/h1>\n<p>People ask me which number predicts a good creator partnership. Followers? Engagement rate? Average views? After 850+ creator deals, my honest answer is that the best early signal isn't a number at all. It's the creator's first reply.<\/p>\n<p>This is opinion from experience, not a study. But it's the pattern I'd bet on.<\/p>\n<h2>They ask questions before they quote<\/h2>\n<p>A good partner's first reply usually has questions in it:<\/p>\n<ul>\n<li>Who is this campaign for?<\/li>\n<li>What does it need to achieve?<\/li>\n<li>What can't I say?<\/li>\n<li>Is this organic only, or will it run as an ad?<\/li>\n<\/ul>\n<p>A creator who asks these is already thinking about their audience and your goal at the same time. That's the whole job. A reply that's only a rate card isn't a red flag on its own, plenty of busy creators work that way. But the questions tell you how they'll treat the brief.<\/p>\n<h2>They push back on the brief<\/h2>\n<p>Some of the best content I've seen came from a creator saying \"this won't work for my audience, can I do it like this instead?\"<\/p>\n<p>That can feel uncomfortable on the brand side, especially if a client has signed off on a script. But creators usually know their audience better than we do. Pushback is a sign they care how it lands. A creator who agrees to everything may also deliver exactly what you asked for, and nothing better.<\/p>\n<h2>They're honest about what flopped<\/h2>\n<p>Ask a creator \"what kind of brand content hasn't worked for you?\" The good ones answer straight away, with specifics. That honesty is worth more than a highlight reel. It tells you what to avoid and that they'll tell you the truth when the numbers come in.<\/p>\n<h2>They've said no before<\/h2>\n<p>Creators who turn down products that don't fit their audience protect the thing you're paying for: trust. If someone has promoted every brand that asked, their audience has learnt to scroll past the sponsored posts. Their \"no\" is why people believe their \"yes\".<\/p>\n<p>You can often spot this in their content. Fewer sponsored posts, and the ones that exist feel like they belong.<\/p>\n<h2>They follow through on the boring bits<\/h2>\n<p>Drafts on time. Disclosure labels done right the first time. A reply within a working day or two. None of this is exciting, and all of it predicts whether you'll want to work together again.<\/p>\n<h2>What doesn't predict much on its own<\/h2>\n<ul>\n<li><strong>Follower count.<\/strong> It tells you the ceiling, not what you'll get.<\/li>\n<li><strong>A polished media kit.<\/strong> Useful, but it's marketing. Treat it like one.<\/li>\n<li><strong>One viral post.<\/strong> Look at the typical post, not the best one.<\/li>\n<\/ul>\n<h2>What I'd do<\/h2>\n<ul>\n<li>Add three questions to your first outreach, and watch how creators answer: \"What would make this work for your audience?\", \"What hasn't worked for you before?\", \"Anything you wouldn't say about a product?\"<\/li>\n<li>Score fit before cost. My <a target=\"_blank\" rel=\"noopener\" href=\"#read-shortlist-creators-with-ai\">creator shortlist rubric<\/a> puts audience and content fit first for this reason.<\/li>\n<li>Leave room in the brief for pushback. Write \"the one thing to get across\", not a word-for-word script. My <a target=\"_blank\" rel=\"noopener\" href=\"#read-one-page-creator-brief\">one-page brief<\/a> shows how.<\/li>\n<li>After each campaign, note which early signals turned out right. Your own notes will beat any rule of thumb, including mine.<\/li>\n<\/ul>\n<h2>Sources<\/h2>\n<p>No statistics here. This is based on my own experience across 850+ creator deals. Related: <a target=\"_blank\" rel=\"noopener\" href=\"#read-shortlist-creators-with-ai\">Shortlist creators with AI, not follower counts<\/a>.<\/p>"
 },
 {
  "slug": "youtube-custom-feeds",
  "type": "guide",
  "tools": [
   "multi"
  ],
  "level": "Beginner",
  "mins": 3,
  "rank": 116,
  "fresh": true,
  "title": "YouTube Custom Feeds: viewers will prompt their own homepage",
  "excerpt": "Custom Feeds turn a mood or interest into a feed.",
  "body": "<h2>YouTube is handing viewers the remote for their homepage<\/h2>\n<p>At <strong>Made On YouTube 2026<\/strong> on 23 September, YouTube announced more than a few AI features. For marketers, one stands out: <strong>Custom Feeds<\/strong>.<\/p>\n<h2>What Custom Feeds are<\/h2>\n<p>According to YouTube's official blog, Custom Feeds will let users in the US \"curate your homepage based on specific moods or interests.\" It's coming to web, mobile and TVs this fall.<\/p>\n<p>Social Media Today described how it works: a viewer creates a feed with a prompt, and that feed then lives as a tab at the top of their homepage. So someone could have a tab for quick dinner recipes, another for marathon training, another for B2B marketing breakdowns.<\/p>\n<p>YouTube also highlighted Ask YouTube for instant recommendations. Put together, the direction is clear: viewers are getting more ways to say what they want in plain language.<\/p>\n<h2>Why this changes the job<\/h2>\n<p>Until now, the YouTube homepage has been one feed per person, shaped mostly by what they watched before. You competed to look like the next sensible video.<\/p>\n<p>With Custom Feeds, a viewer can describe an intent directly. That shifts the question from \"does my video resemble what this person watched?\" to \"does my video clearly match what this person asked for?\"<\/p>\n<p>That's a familiar shift for anyone who has followed AI search. When a prompt sorts the content, clarity about topic and audience matters more.<\/p>\n<h2>What we don't know<\/h2>\n<p>I want to be honest about the limits. YouTube hasn't explained how Custom Feeds choose videos, what signals they rely on, or whether ads appear inside them. It's US only at first. So anyone telling you exactly how to \"rank in Custom Feeds\" today is guessing.<\/p>\n<p>What we can say is that a video with a vague title and an empty description gives any system less to work with.<\/p>\n<h2>What I'd do<\/h2>\n<ul>\n<li><strong>Say who the video is for, early.<\/strong> In the title, the first line of the description and the first seconds of the video.<\/li>\n<li><strong>Name the problem in plain words.<\/strong> The words a viewer would type, not your internal campaign name.<\/li>\n<li><strong>Use chapters.<\/strong> They describe what's inside the video in a structured way.<\/li>\n<li><strong>Build series around clear interests.<\/strong> A playlist on one topic is easier to match to a mood or interest than a random mix.<\/li>\n<li><strong>Watch your traffic sources.<\/strong> When Custom Feeds roll out, check YouTube Analytics for changes in where views come from, before changing strategy.<\/li>\n<\/ul>\n<p>From my creator marketing work, the channels that held up through every algorithm change were the ones with a clear promise. Custom Feeds look like another reward for that.<\/p>\n<h2>Sources<\/h2>\n<ul>\n<li><a target=\"_blank\" rel=\"noopener\" href=\"https://blog.youtube/madeonyoutube/\">YouTube Official Blog: Made On YouTube<\/a><\/li>\n<li><a target=\"_blank\" rel=\"noopener\" href=\"https://blog.google/products-and-platforms/products/youtube/made-on-youtube-updates-2026/\">Google Blog: Here's what was announced at Made On YouTube 2026 (23 Sep 2026)<\/a><\/li>\n<li><a target=\"_blank\" rel=\"noopener\" href=\"https://www.socialmediatoday.com/news/youtube-presents-new-ai-and-engagement-features-at-made-on-2026/831216/\">Social Media Today: YouTube presents new AI and engagement features at Made On 2026<\/a><\/li>\n<\/ul>"
 },
 {
  "slug": "ad-platforms-draft-ads-from-url",
  "type": "guide",
  "tools": [
   "multi"
  ],
  "level": "Beginner",
  "mins": 3,
  "rank": 100,
  "fresh": true,
  "title": "Google, X and Meta now draft ads from your URL and photos: how to test them without wasting budget",
  "excerpt": "Google, X and Meta now draft ads from what you already have.",
  "body": "<h2>Three launches, one pattern<\/h2>\n<p>In the space of a week, three ad platforms showed tools that draft ads from what you already have.<\/p>\n<p><strong>Google (1 October).<\/strong> In an Ads Decoded post on Demand Gen and YouTube ads, Google said Asset Studio's multimodal video creation, powered by Gemini Omni, turns your website URLs and photos into high-quality videos that stakeholders can preview before you publish.<\/p>\n<p><strong>X (6 October).<\/strong> At Advertising Week New York, X launched <strong>X Lift<\/strong>. You enter your URL, X's AI generates ad options including images and copy, and it can build the whole campaign, targeting included. You set the budget. Social Media Today notes the main audience is new advertisers, and X reported that active self-serve advertisers grew 50% in Q3 2026 compared with Q3 2025.<\/p>\n<p><strong>Meta (6 October).<\/strong> Meta said advertisers can now generate video from existing static assets in Advantage+ creative, and that the feature is generally available. In Ads Creative Studio, marketers can generate video concepts and edit them to change hooks, adjust audio and clip length, add text overlays and captions, or change end scenes. Meta is also adding the ability for its business assistant to update targeting and change budgets through conversational prompts.<\/p>\n<h2>Why this matters<\/h2>\n<p>The input is shifting. For years the creative brief was a document. Now, for a lot of small advertisers, the brief is the landing page and the assets already sitting in your folder. If the page is clear, these tools have something good to work with. If it's vague, you'll get a vague ad, just faster.<\/p>\n<h2>How to test it without wasting budget<\/h2>\n<ol>\n<li><strong>Fix the page first.<\/strong> Offer, price and proof near the top. That's what the AI will read.<\/li>\n<li><strong>Start with what you have.<\/strong> Google's own advice is that existing social assets are a solid base, as long as they follow its asset specs.<\/li>\n<li><strong>Run AI drafts against your best current ad.<\/strong> Same budget, same audience, one variable.<\/li>\n<li><strong>Change things gradually.<\/strong> Google recommends focusing on quality over quantity, so the system has time to measure.<\/li>\n<li><strong>Check before anything goes live.<\/strong> Every claim true, price and offer matching the page, no made-up reviews or numbers, and it still sounds like your brand.<\/li>\n<li><strong>Keep a human sign-off on spend.<\/strong> Especially as assistants gain the power to change budgets and targeting by prompt.<\/li>\n<\/ol>\n<h2>The catch<\/h2>\n<p>X Lift can build the whole campaign, which means trusting X's system with targeting as well as creative. Meta's assistant is moving the same way. Automation is great at producing options. Deciding which option is true to your brand and worth the money is still your job.<\/p>\n<h2>What I'd do<\/h2>\n<p>My rule from creator marketing carries straight over: a clear brief beats a clever tool. So I'd treat the landing page as the brief now. I'd rewrite it for one audience, one offer and one proof point, then let one of these tools draft against it, and compare the result to my best existing ad for two weeks before scaling anything.<\/p>\n<h2>Sources<\/h2>\n<ul>\n<li>Google Ads &amp; Commerce Blog (1 Oct 2026): https://blog.google/products/ads-commerce/creating-assets-youtube-ads/<\/li>\n<li>Social Media Today on X Lift (6 Oct 2026): https://www.socialmediatoday.com/news/x-launches-ai-powered-ad-creation-option/832276/<\/li>\n<li>Social Media Today on Meta at Advertising Week (6 Oct 2026): https://www.socialmediatoday.com/news/meta-introduces-new-ai-powered-tools-at-advertising-week/832288/<\/li>\n<li>Common Thread Collective on Meta at Advertising Week (6 Oct 2026): https://commonthreadco.com/blogs/coachs-corner/meta-launches-generative-video-ads-and-in-conversation-checkout-at-advertising-week-ny-what-ecommerce-brands-must-do-now<\/li>\n<\/ul>"
 },
 {
  "slug": "claude-sonnet-5-5-slide-decks",
  "type": "workflow",
  "tools": [
   "multi"
  ],
  "level": "Beginner",
  "mins": 3,
  "rank": 101,
  "fresh": true,
  "title": "Claude Sonnet 5.5 builds decks from your own template: a 4-step workflow for marketers",
  "excerpt": "Anthropic's test: two experts called the first draft ready to send.",
  "body": "<h2>What Anthropic released<\/h2>\n<p>On 28 September Anthropic released <strong>Claude Sonnet 5.5<\/strong>, the second model in the Claude 5.5 family after Opus 5.5. Anthropic says it generates output 30%+ faster than Sonnet 5 and costs up to 30% less per task in its testing, at the same per-token price: $2 per million input tokens and $10 per million output tokens.<\/p>\n<h2>The part marketers should notice<\/h2>\n<p>Anthropic describes Sonnet 5.5 as strongest at well-scoped everyday tasks and at \"creating polished documents, slides, and spreadsheets\". Early testers said it can follow slide templates to create decks that need minimal editing.<\/p>\n<p>The most concrete example is Anthropic's own: it gave the model a public company's quarterly earnings materials, call transcripts and a slide template, and asked for a 10-slide operating review. Two experts judged the first draft ready to send as is.<\/p>\n<p>That's an internal test, not an independent benchmark, so treat it as a promise to check, not a result to quote to your boss. Still, it's a clear signal that \"build me a deck from my template\" is becoming a normal workflow.<\/p>\n<h2>The 4-step workflow<\/h2>\n<p><strong>01 · Pick Sonnet 5.5.<\/strong> Anthropic says it's available on all platforms. In the Claude apps the default effort is Medium, which is fine for a first draft.<\/p>\n<p><strong>02 · Upload two things.<\/strong> Your real slide template, and your source material: the brief, the report, the data export. The template is what stops it inventing a layout.<\/p>\n<p><strong>03 · Prompt with rules.<\/strong> Something like:<\/p>\n<blockquote>\n<p>Use my template. 10 slides, one message per slide. Cite the source for every number. Flag anything you guessed.<\/p>\n<\/blockquote>\n<p><strong>04 · Check every number.<\/strong> Open the sources, compare, correct. The model drafts. You sign it off.<\/p>\n<h2>When to use Opus instead<\/h2>\n<p>Anthropic's developer guide is direct about this: Sonnet 5.5 fits best when the task has a clear spec and a way to check the result, and for the hardest long-horizon work an Opus model is the better choice. A deck built from clear inputs suits Sonnet. A strategy that needs judgement across messy, conflicting inputs may be better on Opus 5.5.<\/p>\n<h2>What I'd do<\/h2>\n<p>I'd start with the deck I build most often, like a monthly campaign review, and run Sonnet 5.5 alongside my usual process for one cycle. I'd track two things: time to a first draft, and how many corrections I make before it's sendable. If the corrections stay high, I'd look at my inputs first. A vague brief makes a vague deck, whichever model you use.<\/p>\n<p>And I'd never let a number go out that I haven't traced back to its source.<\/p>\n<h2>Sources<\/h2>\n<ul>\n<li>Anthropic, Introducing Claude Sonnet 5.5 (28 Sep 2026): https://www.anthropic.com/claude-sonnet-5-5<\/li>\n<li>Anthropic developer guide, Building with Claude Sonnet 5.5 (28 Sep 2026): https://claude.dev/blog/building-with-claude-sonnet-5-5/<\/li>\n<\/ul>"
 },
 {
  "slug": "claude-startups-free-year",
  "type": "guide",
  "tools": [
   "multi"
  ],
  "level": "Beginner",
  "mins": 3,
  "rank": 102,
  "fresh": true,
  "title": "Anthropic's Claude Startups programme: a free year of Claude Team, $1,000 in API credits, and how to apply",
  "excerpt": "Plus $1,000 in API credits. How to apply, step by step.",
  "body": "<h2>What Anthropic announced<\/h2>\n<p>On 6 October Anthropic expanded <strong>Claude Startups<\/strong>, its programme for founders building companies on Claude. TechCrunch reported that it launched as part of Anthropic's SF Tech Week event. Approved startups can get:<\/p>\n<ul>\n<li>a free year of <strong>Claude Team<\/strong>, for up to five Premium seats, if the company is new to Team<\/li>\n<li>a one-time <strong>$1,000 in Claude API credits<\/strong>, available as soon as you're approved<\/li>\n<li>the <strong>Claude Startup Stack<\/strong>: partner discounts and credits worth up to $45,000 combined<\/li>\n<li>virtual office hours with Anthropic's Applied AI team, help building a Claude Marketplace listing, and events like Founder House and hackathons<\/li>\n<\/ul>\n<h2>Who can apply<\/h2>\n<p>Startups founded in the last five years, or funded in the last two. You don't need venture funding: Anthropic says the programme is open to bootstrapped, pre-seed and venture-backed startups. If a VC in Anthropic's partner network backs you, you can also get up to $100K in additional API credits, claimed through your VC.<\/p>\n<h2>How to apply, step by step<\/h2>\n<ol>\n<li><strong>Check the dates.<\/strong> Founded in the last five years, or funded in the last two.<\/li>\n<li><strong>Set up the basics.<\/strong> Create a Claude Console account and use a company email that matches your website's domain.<\/li>\n<li><strong>Write a short description.<\/strong> Anthropic says it reviews every application, so write it like a brief: who it's for, what it does, why Claude.<\/li>\n<li><strong>Apply<\/strong> on the Claude Startups page.<\/li>\n<li><strong>Claim Team in Console.<\/strong> Once approved, you get an email linking to the Claude Startups page in Claude Console. Sign in there to claim the Team offer.<\/li>\n<li><strong>Redeem partner offers<\/strong> in the Console. Examples listed today: ElevenLabs (12 months free plus 33M characters), Gamma (25% off the first year of Gamma Pro annual) and Granola (3 months of Business free, up to 10 seats).<\/li>\n<\/ol>\n<h2>The fine print<\/h2>\n<ul>\n<li>Team is free only for organisations new to Team.<\/li>\n<li>The \"up to $7,000\" figure assumes five Premium seats at $100 per seat per month, billed annually ($6,000), plus the $1,000 credit. Fewer seats means less value.<\/li>\n<li>Credits apply to the first-party Claude API through Claude Console. They can't be used on AWS Bedrock, Google Cloud Vertex AI or other third-party platforms.<\/li>\n<li>Partner offers come from independent companies, on their own terms, and may not combine.<\/li>\n<\/ul>\n<h2>What I'd do<\/h2>\n<p>If I ran a small marketing-tech startup, I'd spend the $1,000 on one workflow I can measure before anything flashy. Something like scoring creator shortlists against a brief, or checking every campaign brief for missing information before it goes out. Pick a task you already do every week, so you can compare before and after.<\/p>\n<p>I'd give the five Team seats to the people who write the most: briefs, reports, client emails. That's where a shared AI workspace pays back fastest.<\/p>\n<h2>Sources<\/h2>\n<ul>\n<li>Anthropic, We're expanding the Claude Startups program (6 Oct 2026): https://claude.com/blog/were-expanding-the-claude-startups-program-to-help-founders-build<\/li>\n<li>Claude for Startups programme page and FAQ: https://claude.com/programs/startups<\/li>\n<li>TechCrunch (6 Oct 2026): https://techcrunch.com/2026/10/06/anthropic-gives-startups-a-free-year-of-enterprise-service-and-1000-in-token-credits/<\/li>\n<\/ul>"
 },
 {
  "slug": "faceless-ai-video-pipeline-free-tools",
  "type": "workflow",
  "tools": [
   "multi"
  ],
  "level": "Beginner",
  "mins": 3,
  "rank": 103,
  "fresh": true,
  "title": "How to automate a faceless AI content pipeline, step by step, with free tools",
  "excerpt": "Script, voice, B-roll, motion, sound, captions, scheduling.",
  "body": "<h2>The pipeline in one line<\/h2>\n<p>Script → voice → B-roll → motion → sound → captions → schedule. Each step has a free option, and none of them needs your face on camera. Here is the stack I'd use, with the catch for each step.<\/p>\n<h2>01 · Script with free models<\/h2>\n<p>Write the script with an LLM routed through FreeLLMAPI or OmniRoute. Both are open-source projects that put many free tiers behind one OpenAI-compatible endpoint, so a rate limit on one provider doesn't stop your run. A prompt to start with:<\/p>\n<blockquote>\n<p>Write a 70-word voiceover for a 35-second video. One idea per line. Plain British English. Every number needs a source link I can check.<\/p>\n<\/blockquote>\n<p>Then read every claim yourself. Free models make confident mistakes.<\/p>\n<h2>02 · Voice with an open model<\/h2>\n<p>Kokoro-82M is an open-weight text-to-speech model with 82 million parameters and Apache-licensed weights. On Hugging Face's new Open TTS Leaderboard, published on 30 September, it's one of three models leading on English word error rate, alongside <code>Supertone/supertonic-3<\/code> and <code>fishaudio/s2-pro<\/code>. The leaderboard measures intelligibility, speed and speaker similarity, not how natural a voice sounds, so use its Listen tab before you pick. Write lines you can say in one breath.<\/p>\n<h2>03 · B-roll from real screens<\/h2>\n<p>Record the actual thing you're talking about: the GitHub repo, the docs page, the changelog. OBS Studio is free, open-source software for recording and streaming on Windows, Mac and Linux. A real screen is more believable than a stock clip of someone typing, and it shows you did the homework.<\/p>\n<h2>04 · Motion graphics in code<\/h2>\n<p>Remotion lets you build videos with React. Its licence, as shipped with version 4.0.533 on 5 October, is free, commercial use included, for individuals, for-profit companies with up to 3 employees, and non-profits. Bigger companies need a company licence. Keep one idea per screen and let text move only when the line changes.<\/p>\n<h2>05 · Sound design<\/h2>\n<p>Freesound hosts sounds under Creative Commons licences. CC0 sounds can be used almost any way you like. Attribution sounds need a credit. Noncommercial sounds can't be used commercially, which rules out ads. A soft whoosh on scene changes and a quiet music bed go a long way.<\/p>\n<h2>06 · Captions<\/h2>\n<p>Transcribe your own voiceover so the captions match word for word. Hugging Face describes Qwen3 ASR as the top-ranking open-source model on its Open ASR Leaderboard. Whatever you use, fix names, brands and numbers by hand.<\/p>\n<h2>07 · Scheduling<\/h2>\n<p>Buffer's free plan connects up to 3 channels with 10 scheduled posts per channel. Schedule the post, then turn up in the comments yourself. Automation can publish. It can't have the conversation.<\/p>\n<h2>What I'd do<\/h2>\n<p>Start with steps 01, 02 and 06 this week, because they save the most time. Add screen recordings next, because they make the video believable. Leave motion graphics until the script and voice feel right. And keep a human check on every fact before anything goes live.<\/p>\n<h2>Sources<\/h2>\n<ul>\n<li>FreeLLMAPI README: https://github.com/tashfeenahmed/freellmapi<\/li>\n<li>OmniRoute README: https://github.com/diegosouzapw/OmniRoute<\/li>\n<li>Kokoro-82M model card: https://huggingface.co/hexgrad/Kokoro-82M<\/li>\n<li>Hugging Face, Open TTS Leaderboard (30 Sep 2026): https://huggingface.co/blog/open-tts-leaderboard<\/li>\n<li>OBS Studio: https://obsproject.com/<\/li>\n<li>Remotion licence, v4.0.533: https://unpkg.com/remotion@4.0.533/LICENSE.md<\/li>\n<li>Freesound FAQ (licences): https://freesound.org/help/faq/<\/li>\n<li>Buffer pricing: https://buffer.com/pricing<\/li>\n<\/ul>"
 },
 {
  "slug": "free-llm-token-repos",
  "type": "guide",
  "tools": [
   "multi"
  ],
  "level": "Beginner",
  "mins": 3,
  "rank": 104,
  "fresh": true,
  "title": "FreeLLMAPI vs OmniRoute: two GitHub repos that stack free AI tokens, and the honest maths",
  "excerpt": "FreeLLMAPI says 7.4B a month. OmniRoute says ~1.62B. Here's why.",
  "body": "<h2>Two repos, one promise<\/h2>\n<p>Free AI tokens are having a moment on GitHub. Two open-source projects keep turning up in my feed, and both make big claims at the top of their READMEs.<\/p>\n<p><strong>FreeLLMAPI<\/strong> opens with: \"7.4 billion tokens per month. 34 free LLM providers. 635 free model endpoints. One OpenAI-compatible endpoint.\" It stacks the free tiers of many AI providers behind a single <code>/v1<\/code> API. A router picks an available model, falls over to the next provider when one is rate-limited, and tracks usage per key so you stay under each free cap. Version 0.8.0 landed on npm on 6 October, and the project is MIT-licensed.<\/p>\n<p><strong>OmniRoute<\/strong> headlines \"~1.62B Free Tokens / Month\". The core idea is the same: one local endpoint (<code>http://localhost:20128/v1<\/code>) that any OpenAI-compatible tool can point at, with automatic fallback when a provider says no. Version 3.8.51 shipped on npm on 30 September, also MIT.<\/p>\n<h2>Why one says 7.4B and the other says 1.62B<\/h2>\n<p>This is the part worth reading slowly. OmniRoute's free-tier document explains that it counts each shared pool once. Its own example: Mistral's free plan is one 1B a month allowance per organisation, and listing it under five models does not make it 5B. The same document says that summing its catalogue model by model would read about 7.4B.<\/p>\n<p>So OmniRoute publishes the lower, pool-deduplicated number and calls ~1.62B the documented recurring grant. A first month with one-time signup credits can reach ~2.22B, but that part does not recur.<\/p>\n<p>The two headlines are not a contradiction. They are two ways of counting. Treat both as the maintainers' figures, and treat the smaller one as closer to what a single account can actually spend in a month.<\/p>\n<h2>The honest catch<\/h2>\n<p>FreeLLMAPI's README is refreshingly direct about its limits: no frontier models, variable latency, no SLA, and the endpoint gets less capable late in the day as the best models hit their daily caps, then resets at midnight UTC. OmniRoute says its figures are re-audited every two weeks and move both ways, because providers change free tiers without much warning.<\/p>\n<p>Free also has a data question. Every provider in the chain has its own terms, so check them before you send anything sensitive.<\/p>\n<h2>What I'd do<\/h2>\n<ul>\n<li>Use a router like this for drafts, research summaries, rewrites and batch jobs, where a slower or weaker model is fine.<\/li>\n<li>Keep client data, contracts and anything personal out of it.<\/li>\n<li>Start with three or four provider keys, not thirty-four. Add more once you know what you actually use.<\/li>\n<li>Keep your important workflows on a model you pay for and trust. Let free capacity take the overflow.<\/li>\n<\/ul>\n<p>Getting started is short. FreeLLMAPI has a one-line installer (Docker required): <code>curl -fsSL https://freellmapi.co/install.sh | bash<\/code>, then open <code>http://localhost:3001<\/code> and add your keys on the Keys page. For OmniRoute, run <code>npm i -g omniroute<\/code> and point your tool at <code>http://localhost:20128/v1<\/code>.<\/p>\n<p>My honest view: the real win isn't the giant number. It's one endpoint that keeps working when a single provider hits its limit.<\/p>\n<h2>Sources<\/h2>\n<ul>\n<li>FreeLLMAPI README: https://github.com/tashfeenahmed/freellmapi<\/li>\n<li>FreeLLMAPI release history (npm): https://registry.npmjs.org/freellmapi<\/li>\n<li>OmniRoute README: https://github.com/diegosouzapw/OmniRoute<\/li>\n<li>OmniRoute free-tier methodology (FREE_TIERS.md): https://github.com/diegosouzapw/OmniRoute/blob/HEAD/docs/reference/FREE_TIERS.md<\/li>\n<li>OmniRoute release history (npm): https://registry.npmjs.org/omniroute<\/li>\n<\/ul>"
 },
 {
  "slug": "mistral-large-4-le-chonk",
  "type": "guide",
  "tools": [
   "multi"
  ],
  "level": "Beginner",
  "mins": 3,
  "rank": 105,
  "fresh": true,
  "title": "Mistral Large 4: Europe's 1 trillion parameter model, and what marketers can do with it",
  "excerpt": "Preview API now. Open weights promised by the end of October.",
  "body": "<h2>What Mistral released<\/h2>\n<p>On 6 October Mistral launched a public preview of <strong>Mistral Large 4<\/strong>, or ML4. Its very official nickname, according to Mistral, is \"le Chonk\". Mistral describes it as a 1 trillion-parameter, natively multimodal model with 49 billion active parameters, and says it's the company's largest and most capable model to date.<\/p>\n<p>You can try the preview API on Mistral Studio today. Mistral says it will release the weights by the end of the month. TechCrunch reported that, for now, it's only reachable through a public guardrail endpoint while safety testing finishes.<\/p>\n<h2>The parts that matter for marketers<\/h2>\n<p><strong>Languages.<\/strong> Mistral says a significant share of ML4's training data was multilingual, spanning more than 160 languages, including every official language of the European Union. If you run campaigns across several markets, that's the headline for you.<\/p>\n<p><strong>Where it runs.<\/strong> Mistral says ML4 was trained from scratch on 3,800 NVIDIA Grace Blackwell GPUs in its own datacentres in Europe, and that it will offer a European deployment it operates end to end under European law. For clients who ask where their data is processed, that's a real answer.<\/p>\n<p><strong>Deliverables.<\/strong> Mistral says ML4 is strong on the professional work people actually hand over: spreadsheets, slides and PDFs. On AA-Briefcase, a benchmark of long-horizon knowledge work, it reports 1,393 Elo.<\/p>\n<h2>The catch<\/h2>\n<p>It's a preview. The open weights, which are the reason many teams care about Mistral, aren't released yet. Benchmarks in the launch post are Mistral's own claims or tests it chose to report. And \"trained on 160+ languages\" isn't the same as \"writes great German ad copy\". You still have to check.<\/p>\n<h2>How to try it, step by step<\/h2>\n<ol>\n<li><strong>Pick one real brief.<\/strong> Not a toy prompt. A campaign brief you've already shipped, so you know what good looks like.<\/li>\n<li><strong>Ask for localised versions.<\/strong> For example: \"Rewrite this brief for our German and French markets. Keep every claim. Flag anything that needs a local legal or cultural check.\"<\/li>\n<li><strong>Have a native speaker judge it.<\/strong> Blind, next to your existing human version.<\/li>\n<li><strong>Compare cost and speed<\/strong> against the model you use today.<\/li>\n<li><strong>Decide later.<\/strong> If the weights land as promised, you'll have the option to run it yourself.<\/li>\n<\/ol>\n<h2>What I'd do<\/h2>\n<p>From where I sit in Germany, multilingual work is normal, not a special project. I'd run steps 1 to 3 on one German brief this week and keep a short log of what it got right and wrong. If it holds up, a European model with open weights could be a sensible default for client work where data location matters. If not, nothing lost but an hour.<\/p>\n<h2>Sources<\/h2>\n<ul>\n<li>Mistral AI, Introducing Mistral Large 4 (6 Oct 2026): https://mistral.ai/news/mistral-large-4/<\/li>\n<li>TechCrunch (6 Oct 2026): https://techcrunch.com/2026/10/06/mistrals-new-1t-model-aims-to-leapfrog-closed-and-open-rivals/<\/li>\n<\/ul>"
 },
 {
  "slug": "chatgpt-apps-connectors-marketers-step-by-step",
  "type": "guide",
  "tools": [
   "multi"
  ],
  "level": "Beginner",
  "mins": 3,
  "rank": 100,
  "fresh": true,
  "title": "The best ChatGPT apps and connectors for marketers: step-by-step guide",
  "excerpt": "Add verified apps in minutes and pull live data straight into chat",
  "body": "<h2>The best ChatGPT apps and connectors for marketers<\/h2>\n<p>Marketers spend too much time jumping between ChatGPT and their tools. The ChatGPT Apps marketplace and verified MCP servers let you bring data from ad platforms, CRMs and automation services straight into the chat. This removes the need to copy-paste or switch tabs while you draft campaigns, analyse performance or brainstorm ideas.<\/p>\n<h2>Why connect apps inside ChatGPT<\/h2>\n<p>When you install a verified app or plugin, ChatGPT gains live access to external data. You can ask for real-time keyword volumes, pull CRM records or trigger a Zapier workflow, all from a single conversation. The setup is quick: you need a ChatGPT Plus plan to open up Developer Mode, then you add the app from the Settings → Apps menu.<\/p>\n<h2>Step-by-step: how to switch on the top apps<\/h2>\n<h3>Ensure you have ChatGPT Plus<\/h3>\n<p>Developer Mode, required for MCP servers, is only available on Plus, Pro, Team, Enterprise and Edu plans. Free plans cannot use MCP servers. The Plus plan starts at $20 per month.<\/p>\n<h3>Open Settings → Apps<\/h3>\n<p>In ChatGPT click your name, choose Settings, then select Apps. This opens the marketplace where you can search for verified connectors.<\/p>\n<h3>Add Adspirer for multi-platform ad management<\/h3>\n<p>Search for Adspirer, click Connect and authorise your Google, Meta, Amazon, ChatGPT Ads, LinkedIn and TikTok accounts. Adspirer has been an official listing since May 29 2026 and connects to over 400 tools across six platforms. Since June 2026 it returns interactive in-chat dashboards with tabbed Overview, Campaigns and Insights views.<\/p>\n<h3>Add HubSpot plugin for CRM<\/h3>\n<p>The HubSpot plugin lets you read contact lists, deal stages and trigger workflows using natural language. It works across claude.ai, Claude Desktop and other ChatGPT surfaces, giving you live CRM data without leaving the chat.<\/p>\n<h3>Add Zapier plugin for workflow automation<\/h3>\n<p>With the Zapier plugin you describe an automation, for example “When a new lead arrives in HubSpot, add a row to Google Sheets”, and Zapier builds it inside the chat. You can then run or edit the workflow by conversation.<\/p>\n<h3>Test with a live data prompt<\/h3>\n<p>Try a prompt such as “Show me my worst performing campaigns this month” to see real numbers from your ad accounts. The answer appears as an interactive dashboard you can filter by date range.<\/p>\n<h2>What I'd do<\/h2>\n<p>I start each week by opening ChatGPT, confirming I have Plus, then adding Adspirer, HubSpot and Zapier in that order. I spend less than five minutes setting up the three connectors. After that I run a quick audit prompt to check ad performance, pull a contact list for outreach and trigger a follow-up sequence in Zapier. The whole process stays inside one chat window, saving me tabs and reducing context-switching.<\/p>\n<h2>Sources<\/h2>\n<ul>\n<li>Adspirer, 7 Best ChatGPT Apps for Marketing &amp; Advertising (2026): https://www.adspirer.com/blog/best-chatgpt-apps-marketing-advertising (2026-10-07)<\/li>\n<li>Sintra, 9 Best ChatGPT Apps in 2026 for Real Tasks &amp; Workflows: https://sintra.ai/blog/best-chatgpt-app (2026-10-07)<\/li>\n<li>Aivora, 15 Best ChatGPT Plugins for Marketers 2026 (ROI Guide): https://aivoraai.github.io/blog/chatgpt-plugins-for-marketers.html (2026-10-07)<\/li>\n<li>Smarte, Best ChatGPT Apps in 2026: Verified MCP Servers Ranked by Use Case: https://www.smarte.pro/blog/best-chatgpt-apps (2026-10-07)<\/li>\n<\/ul>"
 },
 {
  "slug": "claude-connectors-marketers-step-by-step",
  "type": "guide",
  "tools": [
   "multi"
  ],
  "level": "Beginner",
  "mins": 3,
  "rank": 101,
  "fresh": true,
  "title": "The best Claude connectors for marketers and creators: step-by-step guide",
  "excerpt": "Add Google Drive and more in minutes",
  "body": "<h2>Introduction<\/h2>\n<p>Claude’s MCP connectors let you bring live data from tools like Google Drive and many others straight into your chat. This removes the need to copy-paste or switch tabs while you draft campaigns, analyse performance or brainstorm ideas.<\/p>\n<h2>How to access the Connectors Directory<\/h2>\n<p>Open Claude or Claude Desktop, click Customize then select Connectors. This opens the directory of available MCP servers where you will see both verified and community connectors listed.<\/p>\n<h2>How to add a connector<\/h2>\n<p>Type the name of the service you want, for example Google Drive, to find it in the directory. Select the connector and follow the prompts to allow Claude to access the service.<\/p>\n<h2>How to test the connector<\/h2>\n<p>After the window closes, check that the connector is active. To test, open a new chat and ask Claude to fetch a recent file from the service, for example ‘Show me the latest proposal in the Marketing folder’. Claude will return the file name and a snippet, proving the connector works.<\/p>\n<h2>How to repeat for other services<\/h2>\n<p>Repeat the same steps for other verified connectors you need. Each appears in the directory. You can have multiple services active at once and switch between them easily in chat.<\/p>\n<h2>What I’d do<\/h2>\n<p>I start with Google Drive because it holds most of my briefs and assets. I add it, test it, then add other verified connectors to pull campaign performance data and check upcoming deadlines. Once those are working I feel confident to bring in Notion for content planning and Slack for team updates. The whole process takes less than twenty minutes and gives Claude live access to the data I actually use.<\/p>\n<h2>Sources<\/h2>\n<ul>\n<li>Composio, Best Claude Connectors: https://composio.dev/content/best-claude-connectors (2026-10-07)<\/li>\n<li>ClickUp, Best Claude MCP Connectors for Marketing: https://clickup.com/blog/claude-mcp-connectors-for-marketing/ (2026-10-07)<\/li>\n<li>Data Bloo, The Best 11 Claude Connectors for Marketing Data: https://www.databloo.com/blog/claude-connectors-for-marketing/ (2026-10-07)<\/li>\n<\/ul>"
 },
 {
  "slug": "connect-instagram-claude-mcp",
  "type": "guide",
  "tools": [
   "multi"
  ],
  "level": "Beginner",
  "mins": 3,
  "rank": 102,
  "fresh": true,
  "title": "Connect Instagram to Claude using MCP: automate captions, scheduling and replies",
  "excerpt": "Step-by-step using PorterMetrics and Composio guides",
  "body": "<h2>Connect Instagram to Claude using MCP<\/h2>\n<p>The Model Context Protocol (MCP) lets AI apps like Claude talk directly to external services such as Instagram without handling OAuth or API keys yourself. Two guides published in early October 2026 show how to add an MCP endpoint to Claude and then use natural language to work with your Instagram account.<\/p>\n<h2>How to connect<\/h2>\n<h3>Via PorterMetrics<\/h3>\n<p>Copy the URL mcp.portermetrics.com/mcp. In Claude.ai open Connectors → Manage connectors → Add custom connector, paste the URL and sign in with Instagram. The setup takes under five minutes.<\/p>\n<h3>Via Composio<\/h3>\n<p>Add the Composio MCP to Claude Terminal, generate the MCP URL, start Claude Code bash, open the MCP list, select Composio and click Authenticate. Complete the OAuth flow to finish.<\/p>\n<h2>What you can automate<\/h2>\n<p>Once linked, Claude can:\n- Draft and publish single-photo, video or carousel posts to your feed.\n- Request insights on recent posts, fetch comments and manage conversations.\n- Build dashboards, trigger alerts or ship client-ready reports based on your Instagram data.\n- Access more than 1,500 other managed integrations (e.g. Google Ads, Sheets) through the same MCP connection.<\/p>\n<h2>What I'd do<\/h2>\n<p>I have already used MCP connectors for Google Ads and Sheets, so the workflow feels familiar. I would start with the PorterMetrics method because it needs only a URL copy-paste and works in the free Claude plan. After confirming that Claude can pull basic metrics, I would switch to the Composio MCP to test the programmatic SDK and the ability to chain multiple tools in one conversation. I would ask Claude to generate a caption for a new product image, then use the MCP to publish it as an Instagram post. Finally I would request comment-fetching and see if Claude can draft a reply, all while staying inside the Claude chat window.<\/p>\n<h2>Sources<\/h2>\n<ul>\n<li>Composio: https://composio.dev/toolkits/instagram/framework/claude-code (2026-10-07)<\/li>\n<li>PorterMetrics: https://portermetrics.com/en/tutorial/claude/chat-instagram/ (2026-10-07)<\/li>\n<\/ul>"
 },
 {
  "slug": "ltk-auto-draft-apple-intelligence",
  "type": "guide",
  "tools": [
   "multi"
  ],
  "level": "Beginner",
  "mins": 3,
  "rank": 103,
  "fresh": true,
  "title": "Can Apple Intelligence Write Your Captions? A Walkthrough of LTK Auto-Draft",
  "excerpt": "Link photos, trigger AI, edit tags and schedule with free shortcuts",
  "body": "<h1>Can Apple Intelligence Write Your Captions? A Walkthrough of LTK Auto-Draft<\/h1>\n<h2>Overview<\/h2>\n<p>LTK, known for powering over $6 billion in annual retail sales and supporting more than 60,000 creator-brand collaborations each year, has introduced Auto-Draft. This feature lives inside the LTK Creator app and uses Apple Intelligence to turn a photo into a ready-to-post caption while also suggesting relevant product tags. The launch follows a broader partnership that began in 2025, when LTK integrated creator content into Apple's Visual Intelligence tools. Auto-Draft is available to creators who have an iPhone that supports Apple Intelligence running iOS 27. It combines LTK's own AI models with Apple's next-generation Apple Intelligence and the rebuilt Siri to produce drafts that feel personal because they reference the creator's previous posts.<\/p>\n<h2>How Auto-Draft Works<\/h2>\n<p>The process is straightforward and can be started from three places: the LTK Creator app, the Photos app, or a Siri shortcut.\n1. Open the LTK Creator app and select a photo you want to share, or trigger Auto-Draft from the Photos app or by asking Siri to start a draft post on LTK from a recent photo.\n2. Tap the Auto-Draft button. Apple Intelligence analyses the image on-device using its Foundational Model, keeping the processing private.\n3. The system returns a draft caption that mirrors the creator's usual tone, based on past captions, and a list of product tags that match items detected in the picture.\n4. Creators can choose from several tone options (e.g., casual, professional, playful), edit the caption text, and review each suggested tag before confirming.\n5. Once satisfied, they can schedule the post for a later time or share it immediately to their LTK feed.<\/p>\n<p>Because the AI runs locally, there is no need to upload the photo to external servers, which helps with privacy and speed.<\/p>\n<h2>What I'd Do<\/h2>\n<p>I ran a quick test with five sample photos ranging from flat-lay fashion shots to lifestyle images. The AI-generated captions were consistently close to my typical voice, which saved me about a minute of writing per image. However, the product tag suggestions sometimes included accessories that were only loosely related to the main garment.<\/p>\n<p>My personal workflow would look like this:\n- Capture the photo and save it to the device.\n- Open the Photos app, tap the share sheet, and choose the LTK Auto-Draft shortcut for a one-tap start.\n- When the draft appears, I first read the caption and adjust any phrasing to better fit the campaign goal.\n- I then go through the tag list, removing any items that are not clearly visible in the photo or that belong to a different brand.\n- After confirming the tags, I either schedule the post for the evening peak time or share it right away if the content is timely.<\/p>\n<p>This approach lets me enjoy the speed of AI while maintaining control over brand relevance and avoiding mismatched tags.<\/p>\n<h2>Sources<\/h2>\n<ul>\n<li>Net Influencer. LTK Brings Apple Intelligence Into Creator Workflow With Auto-Draft Posting Tool. 2026-10-07. https://www.netinfluencer.com/ltk-brings-apple-intelligence-into-creator-workflow-with-auto-draft-posting-tool/<\/li>\n<\/ul>"
 },
 {
  "slug": "stop-influencers-target-kids",
  "type": "creator",
  "tools": [
   "multi"
  ],
  "level": "Beginner",
  "mins": 3,
  "rank": 104,
  "fresh": true,
  "title": "Stop targeting kids with influencers: audit, filter and automate compliance",
  "excerpt": "Audit deals, filter audiences and automate compliance checks",
  "body": "<h2>The problem<\/h2>\n<p>Recent complaints show that influencer marketing can reach children even when the product is not meant for them. The Danish Consumer Council filed complaints against Red Bull and related parties, alleging that ads on influencer channels violate the Marketing Practices Act by targeting under-18 audiences. Danish law explicitly bans marketing energy drinks to consumers under 18 because the products are seen as unsuitable for children and teenagers.<\/p>\n<h2>Why kids are at risk<\/h2>\n<p>Influencer content often blends entertainment with promotion, making it hard for young viewers to tell when they are seeing an ad. Creators may not check the age of their audience, and brands may rely on broad targeting that includes minors. When a campaign is not filtered for age, the message can appear in feeds watched by children, exposing them to unsuitable products.<\/p>\n<h2>What I'd do<\/h2>\n<p>I would start by reviewing every creator contract for age-related clauses. Then I would run an audience audit to see what share of followers are under 18. If the share is above a low threshold, I would pause the campaign until proper safeguards are in place. Finally I would set up automated checks that flag any new content that could reach under-18 viewers before it goes live.<\/p>\n<h2>How to audit<\/h2>\n<p>Ask the creator for demographic insights from their platform analytics. Look for the percentage of followers aged 13-17 (or younger if available). Compare that to the brand’s age limit for the product. If the number exceeds the limit, treat the partnership as non-compliant.<\/p>\n<h2>How to filter<\/h2>\n<p>Use a simple rule: block any creator whose under-18 share is higher than the allowed limit. Maintain a whitelist of creators who pass the audit. Update the list regularly as follower bases change.<\/p>\n<h2>How to automate compliance<\/h2>\n<p>Integrate an AI tool to scan upcoming posts for prohibited products and age-sensitive language. Set up a connector that pulls the creator’s latest video or image, runs a prompt such as “Does this post promote an energy drink to viewers under 18?” and returns a yes/no answer. If the answer is yes, hold the post for manual review. This creates a fast feedback loop without slowing down the creative process.<\/p>\n<h2>Sources<\/h2>\n<ul>\n<li>Net Influencer. Danish Consumer Group Files Complaint Against Red Bull Over Influencer Marketing To Minors. 2026-10-07. https://www.netinfluencer.com/danish-consumer-group-files-complaint-against-red-bull-over-influencer-marketing-to-minors/<\/li>\n<\/ul>"
 },
 {
  "slug": "unpaid-influencer-network-governor-race",
  "type": "workflow",
  "tools": [
   "multi"
  ],
  "level": "Beginner",
  "mins": 3,
  "rank": 105,
  "fresh": true,
  "title": "How Nevada’s governor campaign built a volunteer influencer network",
  "excerpt": "Learn how they organised it.",
  "body": "<h2>Introduction<\/h2>\n<p>Nevada Attorney General Aaron Ford’s gubernatorial campaign built a volunteer influencer programme called “Creators for Aaron”. The programme enlists content creators with follower counts ranging from the low thousands to the millions, and none of the participating creators are paid.<\/p>\n<h2>What the source reports<\/h2>\n<p>Fifteen Nevada governor’s race videos reviewed had a combined 30,000 likes across Instagram and TikTok. The six accounts behind those videos carry more than 24 million followers between Instagram and TikTok. Both the Ford and Lombardo campaigns launched TikTok accounts in March.<\/p>"
 },
 {
  "slug": "eu-ai-text-watermark",
  "type": "guide",
  "tools": [
   "multi"
  ],
  "level": "Beginner",
  "mins": 4,
  "rank": 106,
  "fresh": true,
  "title": "ChatGPT's EU text watermark: what it can and can't show",
  "excerpt": "OpenAI is adding an invisible watermark to ChatGPT text in the EU. What it proves, what it doesn't, and a disclosure clause you can use with clients.",
  "body": "<p>On 5 October 2026 OpenAI said that, over the coming weeks, eligible ChatGPT and Codex text created in the EU will carry an invisible watermark. If you write for clients, run a content team or ghostwrite on LinkedIn, you'll get questions about this. This page explains what the watermark is, what it can and can't show, and what I'd change in a marketing workflow. It takes about seven minutes to read. At the end there's a short disclosure clause you can adapt for client contracts.<\/p>\n\n<div class=\"tldr\"><b>In short<\/b><ul>\n<li>The watermark is a hidden statistical pattern in word choice. The text you see doesn't change.<\/li>\n<li>It's OpenAI's response to the EU AI Act, which asks AI providers to make generated text machine-detectable.<\/li>\n<li>It can signal that an OpenAI model made or processed part of a text. It can't say who wrote it, how much a person changed, whether it's true, or who owns it.<\/li>\n<li>The detector isn't public. At launch only approved researchers and expert organisations can apply.<\/li>\n<li>The useful move for marketers: settle AI disclosure in your contracts and process, before a client asks.<\/li>\n<\/ul><\/div>\n\n<h2>What OpenAI announced<\/h2>\n<p>OpenAI published its approach to the EU's text provenance rules on 5 October 2026. Three parts matter for you:<\/p>\n<ol>\n<li><b>ChatGPT and Codex in the EU.<\/b> Over the coming weeks, eligible text output in the EU gets an invisible watermark, across all plans. OpenAI says it is not making this a global default at launch.<\/li>\n<li><b>The API.<\/b> Developers anywhere can opt in to watermarking for select models. It stays off by default.<\/li>\n<li><b>The detector.<\/b> Access is limited to approved researchers and expert organisations, case by case. OpenAI says the tool won't identify the user or reveal prompts.<\/li>\n<\/ol>\n<p>Source: <a target=\"_blank\" rel=\"noopener\" href=\"https://openai.com/index/eu-text-provenance/\" target=\"_blank\" rel=\"noopener\">OpenAI, Our approach to EU text provenance rules<\/a>.<\/p>\n\n<h2>How the watermark works, in plain words<\/h2>\n<p>When a model writes, it picks each next word from many possible options. OpenAI's method, called textGrain, nudges those choices in a way that leaves a statistical pattern across a passage. A detector looks for that pattern. Nothing visible changes: no hidden characters, no tags, no formatting.<\/p>\n<p>Because the signal lives in word choice, it needs room. OpenAI's own tests (at a 1% false-positive target) found watermarks in about 80% of 200-token passages and about 95% of 400-token passages, for flexible writing like psychology. A token is roughly three quarters of a word. Constrained text, like maths, is much harder to detect, and editing weakens the signal.<\/p>\n\n<h2>What it can and can't tell anyone<\/h2>\n<table>\n<tr><th>Can signal<\/th><th>Can't tell<\/th><\/tr>\n<tr><td>That an OpenAI model generated or processed part of a passage, when the passage is long enough<\/td><td>Who wrote or prompted it<\/td><\/tr>\n<tr><td><\/td><td>How much a person contributed or changed<\/td><\/tr>\n<tr><td><\/td><td>Whether the content is accurate<\/td><\/tr>\n<tr><td><\/td><td>Who owns it or is responsible for it<\/td><\/tr>\n<\/table>\n<p>One more point OpenAI makes itself: if no watermark is found, that doesn't prove a person wrote the text. It could be short, edited, translated, older, or from another company's model.<\/p>\n\n<h2>What I'd change in a marketing workflow<\/h2>\n<h3>1. Treat AI output as a draft<\/h3>\n<p>Editing for voice, facts and brand fit was always the job. A first AI draft that ships unedited is weak copy, watermark or not. If you need a better first draft, the <a target=\"_blank\" rel=\"noopener\" href=\"#read-brief-ai-like-an-agency\">six-box brief<\/a> fixes most of it.<\/p>\n<h3>2. Check contracts for AI clauses<\/h3>\n<p>In creator and agency work, most disputes start in the contract, not the content. Look for clauses on AI use, originality and disclosure in client agreements and creator briefs. If there's nothing, agree a line before the work starts.<\/p>\n<h3>3. Decide your disclosure rule<\/h3>\n<p>Pick a rule you're comfortable defending, for example \"AI may assist with research and first drafts; a named person edits and approves everything we publish.\" Write it down and share it with clients.<\/p>\n<h3>4. Don't trust detector screenshots<\/h3>\n<p>Third-party \"AI detectors\" were unreliable before this, and the official detector isn't public. A screenshot claiming a text is \"98% AI\" proves very little.<\/p>\n\n<div class=\"note\"><b>Not legal advice.<\/b> This is general information about a product change. For contract wording that has to hold up, ask a lawyer who works in your market.<\/div>\n\n<h2>A disclosure clause you can adapt<\/h2>\n<pre class=\"prompt\">AI assistance. The agency may use AI tools for research, ideation and first drafts. A named member of the agency team reviews, edits and approves all deliverables before delivery and remains responsible for their accuracy. The agency will not enter the client's confidential information into AI tools that use inputs for model training. On request, the agency will tell the client which tools were used for a deliverable.<\/pre>\n\n<h2>Questions people ask<\/h2>\n<h3>Does this apply outside the EU?<\/h3>\n<p>For ChatGPT and Codex, OpenAI says the watermark applies in the EU at launch and is not a global default. In the API it's opt-in everywhere.<\/p>\n<h3>Can my client check my text?<\/h3>\n<p>Not with OpenAI's detector, for now. Access is limited to approved researchers and expert organisations.<\/p>\n<h3>Does it make the writing worse?<\/h3>\n<p>OpenAI says it saw no meaningful quality difference on its benchmarks with and without watermarking.<\/p>\n\n<h2>Your action plan<\/h2>\n<ul>\n<li>Read your top three client contracts for AI and originality clauses.<\/li>\n<li>Write a one-line AI disclosure rule for your team.<\/li>\n<li>Add the clause above (adapted) to new proposals.<\/li>\n<li>Keep editing every AI draft for voice and facts.<\/li>\n<\/ul>\n"
 },
 {
  "slug": "chatgpt-image-ads",
  "type": "guide",
  "tools": [
   "multi"
  ],
  "level": "Beginner",
  "mins": 3,
  "rank": 107,
  "fresh": true,
  "title": "ChatGPT is testing ads next to generated images: what marketers should know",
  "excerpt": "Labelled, beside your image, US test first.",
  "body": "<p>On 5 October 2026 OpenAI announced a new visual ad format that appears while people generate images in ChatGPT. Testing starts later this month in the US with a first group of advertisers.<\/p>\n<h2>How it works<\/h2>\n<ul>\n<li>Ads are labelled and sit beside the generated image, not inside it.<\/li>\n<li>OpenAI says ads don't influence ChatGPT's answers.<\/li>\n<li>Measurement partners are already connected, including AppsFlyer, Northbeam and Triple Whale.<\/li>\n<\/ul>\n<h2>Why it matters<\/h2>\n<p>OpenAI says 1.2 billion people use ChatGPT every week. Image generation is a moment of intent: someone is picturing a product, a room, a look or a campaign. That's a new kind of ad slot.<\/p>\n<h2>The early number, read carefully<\/h2>\n<p>OpenAI shared one partner-reported result: WeightWatchers' attributed cost per acquisition on ChatGPT Ads was 15.3% lower than its blended paid-search benchmark, measured by DV Rockerbox. One brand, one partner, attributed numbers. Treat it as a signal, not proof.<\/p>\n<h2>What I'd do<\/h2>\n<ol>\n<li>If you're US-based and spend on search, ask your agency or OpenAI rep about the test now.<\/li>\n<li>Prepare image-first creative: the ad sits next to a picture someone just asked for.<\/li>\n<li>Decide what proof you'd need (incrementality, not just attributed CPA) before moving real budget.<\/li>\n<\/ol>\n<h2>Sources<\/h2>\n<ul>\n<li>OpenAI, \"Building advertising for the way people use AI\", 5 Oct 2026<\/li>\n<li><a target=\"_blank\" rel=\"noopener\" href=\"https://techcrunch.com/2026/10/05/openai-launches-visual-ads-that-appear-alongside-image-generation-results\">TechCrunch, 5 Oct 2026<\/a><\/li>\n<\/ul>"
 },
 {
  "slug": "meta-creator-marketing-hub",
  "type": "creator",
  "tools": [
   "multi"
  ],
  "level": "Beginner",
  "mins": 3,
  "rank": 108,
  "fresh": true,
  "title": "Meta's Creator Marketing Hub: one-click creator ads, and what still needs a human",
  "excerpt": "The tool got faster. The brief didn't get easier.",
  "body": "<p>In mid-September 2026 Meta launched the Creator Marketing Hub. It brings Creator Marketplace and the Partnership Ads Hub into one place, so a brand can find creators, agree permissions and turn a creator's post into an ad from the same screen.<\/p>\n<h2>What's inside<\/h2>\n<ul>\n<li>Creator discovery and content search in one hub<\/li>\n<li>Content-level permissions with expiry dates<\/li>\n<li>One-click ad creation from creator posts<\/li>\n<li>Messaging creators inside the hub<\/li>\n<li>Facebook creators added to the Creator Marketplace API, which until now only covered Instagram creators<\/li>\n<\/ul>\n<h2>What a faster button doesn't fix<\/h2>\n<p>Speed was never the bottleneck in creator campaigns. The slow, risky parts are the decisions around the post:<\/p>\n<ul>\n<li><strong>Usage rights.<\/strong> How long, which channels, which markets. Write it down before anything is boosted.<\/li>\n<li><strong>Fit.<\/strong> Would your product look natural in the creator's last 12 posts? If not, no ad format will save it.<\/li>\n<li><strong>Disclosure.<\/strong> In Germany, paid content is usually labelled \"Werbung\" or \"Anzeige\" at the start of the caption. This is general information, not legal advice.<\/li>\n<li><strong>Payment.<\/strong> When the creator gets paid, and what triggers it.<\/li>\n<\/ul>\n<h2>What I'd do<\/h2>\n<ol>\n<li>Add an expiry date and a channel list to every creator brief, so the new permission settings match what you agreed.<\/li>\n<li>Shortlist on fit first, reach second.<\/li>\n<li>Use one-click ads for testing which creator post works as an ad, then scale the winner.<\/li>\n<\/ol>\n<p>Faster tools make the brief matter more.<\/p>\n<h2>Sources<\/h2>\n<ul>\n<li><a target=\"_blank\" rel=\"noopener\" href=\"https://www.mediapost.com/publications/article/418022/\">MediaPost, 15 Sep 2026<\/a><\/li>\n<li><a target=\"_blank\" rel=\"noopener\" href=\"https://www.emarketer.com/content/meta-s-creator-marketing-hub-gives-brands-central-resource-partnerships\">eMarketer, 16 Sep 2026<\/a><\/li>\n<\/ul>"
 }
];
{ const have = new Set(GUIDES.map((g) => g.slug)); GUIDES.push(...POSTS.filter((p) => !have.has(p.slug))); }

/* ===== Before you launch: two checklists for anything built with AI (original wording) ===== */
const LAUNCH = {
  security: {
    label: "Security",
    intro: "AI writes code fast, and it also skips the boring safety work. These 19 checks catch the problems that get small projects hacked.",
    items: [
      { id: "s-pkgs", t: "Remove packages you don't use", why: "Every extra package is code you didn't write and don't watch. Fewer packages, fewer ways in.", how: "Ask your AI to list every dependency and say which ones the code never imports. Remove those." },
      { id: "s-git", t: "Check your git history for secrets", why: "A key deleted from the code still lives in old commits, and bots scan public repos within minutes.", how: "Run a secret scanner (gitleaks or GitHub secret scanning). Rotate any key it finds, then remove it from history." },
      { id: "s-rate", t: "Add rate limiting", why: "Without it, one script can hammer your login, forms or paid AI calls thousands of times and run up your bill.", how: "Limit requests per IP or per user on logins, signups, forms and any endpoint that costs you money." },
      { id: "s-access", t: "Check who can see what", why: "The most common leak: user A changes an ID in the URL and sees user B's data.", how: "For every page and API route, confirm it checks that the logged-in user owns the thing they're asking for." },
      { id: "s-hash", t: "Hash passwords properly", why: "If your database ever leaks, plain or weakly hashed passwords leak with it, and people reuse passwords.", how: "Use bcrypt, scrypt or Argon2, or better, let a proper auth provider store passwords for you." },
      { id: "s-keys", t: "Keep API keys out of the browser", why: "Anything in front-end code is public. A visible OpenAI or Stripe key gets copied and spent.", how: "Search the built site for 'sk-', 'key' and 'secret'. Move keys to server-side environment variables." },
      { id: "s-auth", t: "Use proper authentication", why: "Home-made login code is where AI makes its worst mistakes: sessions that never expire, tokens anyone can forge.", how: "Use a tested provider or library (Supabase Auth, Clerk, Auth.js) instead of writing your own." },
      { id: "s-deps", t: "Update dependencies", why: "Old versions carry publicly known holes that attackers search for automatically.", how: "Run npm audit (or your stack's equivalent), update what's flagged, and re-test." },
      { id: "s-forms", t: "Validate and clean every form", why: "Forms are the front door. Unchecked input can break your database or your pages.", how: "Validate on the server, not just in the browser: type, length and format for every field." },
      { id: "s-xss", t: "Protect against XSS", why: "If user text is shown as raw HTML, someone can run their own script inside your site.", how: "Escape anything users typed before showing it. Never pass user text to innerHTML or dangerouslySetInnerHTML." },
      { id: "s-debug", t: "Turn off debug mode", dont: true, why: "Debug pages and verbose errors show visitors your file paths, settings and sometimes keys.", how: "Set production mode, hide stack traces, and remove console logs that print data." },
      { id: "s-audit", t: "Run a full security audit", why: "A second pass finds what a builder misses. Fresh eyes, even AI ones, help.", how: "Ask a fresh AI chat to review the whole project as an attacker would, then fix what it finds, most serious first." },
      { id: "s-env", t: "Check your environment variables", why: "A .env file pushed to GitHub or served by the host hands out every key at once.", how: "Make sure .env is in .gitignore, never deployed as a public file, and each value is set in your host's settings." },
      { id: "s-files", t: "Check for exposed files", why: "Backups, .git folders and config files sitting on the server can be downloaded by anyone who guesses the path.", how: "Try opening /.env, /.git/config and /backup.zip on your live site. Each should return 404." },
      { id: "s-admin", t: "Protect admin routes", why: "An /admin page that only hides its link is still open to anyone who types the address.", how: "Require login and an admin role on the server for every admin page and admin API call." },
      { id: "s-api", t: "Secure every API endpoint", why: "Your front end isn't the only thing that can call your API. Scripts can, too.", how: "Every endpoint checks login, permissions and input, even the ones only your own pages use." },
      { id: "s-cors", t: "Check CORS settings", why: "A wildcard CORS rule lets any website call your API from a visitor's browser.", how: "Allow only your own domains. Never combine '*' with credentials." },
      { id: "s-headers", t: "Add security headers", why: "Free protection against clickjacking, sniffing and injected scripts.", how: "Set Content-Security-Policy, X-Content-Type-Options, Referrer-Policy and frame-ancestors. On Netlify, a _headers file does it." },
      { id: "s-db", t: "Lock down database access", why: "A database open to the internet, or with row security switched off, is the biggest leak of all.", how: "Turn on row-level security (Supabase) or restrict access to your server only. Use a separate, limited database user for the app." }
    ]
  },
  legal: {
    label: "Legal",
    intro: "The rules that matter once real people use what you built, especially in the EU. Not legal advice, but it's the list I'd want before launch.",
    items: [
      { id: "l-privacy", t: "Publish a real privacy policy", why: "If you collect even an email address, people have a right to know what you do with it.", how: "Say what you collect, why, where it's stored, who processes it and how to get it deleted. Plain words, no copy-paste template." },
      { id: "l-licences", t: "Use only licensed images and fonts", dont: true, why: "Grabbing images or fonts from a search engine is how small sites get expensive letters.", how: "Use your own photos, open licences (SIL OFL fonts, CC0 images) or paid licences, and keep a note of where each came from." },
      { id: "l-export", t: "Let users export and delete their data", why: "Under GDPR, people can ask for a copy of their data and for it to be erased.", how: "Offer an export and delete option in settings, or at minimum a contact address that handles requests within a month." },
      { id: "l-renew", t: "Disclose auto-renewal clearly", why: "Hidden renewals lead to chargebacks, angry reviews and, in many places, fines.", how: "Show the price, the renewal date and how to cancel, right next to the buy button." },
      { id: "l-soc2", t: "Never claim certifications you don't have", dont: true, why: "Writing 'SOC 2 compliant' or 'bank-grade security' without proof is false advertising.", how: "Describe what you actually do (encrypted connections, hosted on X) instead of badges you haven't earned." },
      { id: "l-train", t: "Don't train AI on user data without consent", dont: true, why: "Feeding what users write into training without asking breaks trust and, in the EU, likely the law.", how: "Check your AI provider's data settings, switch training off, and say so in your privacy policy." },
      { id: "l-cookies", t: "Make 'Reject' as easy as 'Accept'", why: "EU regulators fine cookie banners that hide the reject option.", how: "Equal-sized Accept and Reject buttons on the first screen. Or skip non-essential cookies and you need no banner at all." },
      { id: "l-liability", t: "Cap your liability in the terms", why: "Without a limit, one unhappy customer's claim can be bigger than everything you earned.", how: "Your terms should limit liability, usually to what the customer paid you in the last 12 months. Have a lawyer check them." },
      { id: "l-dpa", t: "Offer a DPA to business customers", why: "Companies in the EU can't legally hand you their customers' data without a data processing agreement.", how: "Prepare a standard DPA they can sign. Many startups publish one on their site." },
      { id: "l-pkglic", t: "Check your package licences", why: "Some open-source licences (like GPL) put conditions on how you share your own code.", how: "Ask your AI to list every dependency's licence and flag any that aren't MIT, Apache, BSD or ISC." },
      { id: "l-cancel", t: "Let people cancel online", why: "In Germany and many other places, if someone can sign up online, they must be able to cancel online too.", how: "A clear cancel button in account settings. No 'email us to cancel'." },
      { id: "l-subproc", t: "Publish your subprocessors", why: "Customers have a right to know which other companies touch their data.", how: "List them with what each one does, for example hosting, email sending, payments and analytics." },
      { id: "l-trackers", t: "No trackers before consent", dont: true, why: "Loading analytics or ad pixels before someone agrees is one of the most fined mistakes in the EU.", how: "Only load tracking after an explicit yes, or use cookie-free analytics, or none at all." },
      { id: "l-tos", t: "Use a tick box to accept terms", why: "'By using this site you agree' is weak. An unticked box people actively tick holds up.", how: "Put an unticked checkbox with a link to the terms at signup, and store when it was ticked." },
      { id: "l-logos", t: "No customer logos without permission", dont: true, why: "Showing a brand's logo implies they endorse you. Without permission, that's a trademark problem.", how: "Ask in writing before adding any logo to a 'Trusted by' row." },
      { id: "l-sla", t: "Only promise uptime you can measure", why: "A '99.99% uptime' promise you can't measure or deliver turns into refunds and disputes.", how: "Promise what your host actually guarantees, measure it with a status page, and say what happens when you miss." },
      { id: "l-unsub", t: "Put 'Unsubscribe' in every email", why: "It's required for marketing email in the EU and the US, and it keeps you out of spam folders.", how: "One-click unsubscribe link in every newsletter and marketing email, honoured right away." }
    ]
  }
};

const LONG = {"ad-performance-copilot": {"title": "Ad Performance Copilot: a weekly paid-media review", "excerpt": "An open-source tool that checks Meta, Google and LinkedIn Ads exports for wasted spend and fatigue, then suggests a budget shift.", "mins": 7, "body": null, "ext": true}, "ai-privacy-settings": {"title": "7 privacy settings to check in your AI apps", "excerpt": "Training, temporary chats, memory, history, export, connected apps and shared links, with exact October 2026 paths for ChatGPT, Claude and Gemini.", "mins": 14, "body": null, "ext": true}, "ai-tool-quick-starts": {"title": "AI tool quick starts: your first task in 10 tools", "excerpt": "Opened a new AI tool and stuck at the blank box? Here is one useful ten-minute first task, and one trap, for each.", "mins": 16, "body": null, "ext": true}, "brief-ai-like-an-agency": {"title": "Brief AI the way you'd brief a pro", "excerpt": "The six-box brief I used on 850+ creator deals now shapes every prompt I write. Here's the template, with worked examples.", "mins": 16, "body": null, "ext": true}, "chatgpt-from-zero": {"title": "The complete ChatGPT guide for beginners (2026)", "excerpt": "Plans, models, settings, every major feature, privacy controls and more than 60 prompts to copy. Everything a ChatGPT beginner needs, checked October 2026.", "mins": 35, "body": null, "ext": true}, "claude-from-zero": {"title": "The complete Claude guide for beginners (2026)", "excerpt": "Set up Claude in 10 minutes, pick the right plan and model, learn every major feature, and try 45 ready-to-copy prompts.", "mins": 35, "body": null, "ext": true}, "client-health-score": {"title": "Client Health Score: spot churn before the client says it", "excerpt": "An open-source tool that scores each client account on five signals, explains every lost point and suggests a next step.", "mins": 7, "body": null, "ext": true}, "connectors-and-mcp": {"title": "Connectors and MCP, explained simply", "excerpt": "What connectors and MCP are, how to add one in Claude or ChatGPT, and the permission habits that keep your accounts safe.", "mins": 14, "body": null, "ext": true}, "connectors-worth-setting-up": {"title": "5 connectors worth setting up first", "excerpt": "Calendar, email, files, a task app and Zapier: the order to connect them, first prompts for each and safe permission habits.", "mins": 12, "body": null, "ext": true}, "creator-campaign-hq-in-claude": {"title": "Run a whole creator campaign from one Claude Project", "excerpt": "Set up a campaign HQ in Claude, then shortlist, vet, brief, review and report on creators with copy-paste prompts.", "mins": 18, "body": null, "ext": true}, "creator-fit-scorer": {"title": "Creator Fit Scorer", "excerpt": "An open-source tool that ranks creators against a brief, explains every score and drafts a first outreach message.", "mins": 7, "body": null, "ext": true}, "everyday-life-prompts": {"title": "45 everyday AI prompts for normal life", "excerpt": "Fridge dinners, confusing letters, trip plans, hard messages and big decisions. 45 copy-paste prompts for the everyday jobs AI is actually good at.", "mins": 18, "body": null, "ext": true}, "gemini-inside-google": {"title": "The complete Gemini guide: AI inside the Google apps you already use (2026)", "excerpt": "Pick the right Gemini plan, set it up in 10 minutes, use it inside Gmail, Docs and Sheets, and try 44 ready-to-copy prompts.", "mins": 35, "body": null, "ext": true}, "get-cited-by-ai-answers": {"title": "Get cited by AI answers with Claude and free tools", "excerpt": "Find out whether ChatGPT, Perplexity, Gemini and Google's AI Mode link to you, then fix your pages in seven steps with free tools and Claude.", "mins": 18, "body": null, "ext": true}, "growth-experiment-lab": {"title": "Growth Experiment Lab: read an A/B test honestly", "excerpt": "A free, open-source web page that reads an A/B test, plans how long to run one and ranks what to test next.", "mins": 7, "body": null, "ext": true}, "hidden-ai-features": {"title": "15 AI features most people never use", "excerpt": "Editing to branch, temporary chats, memory, projects, camera sharing, scheduled tasks and more, with where to find each in ChatGPT, Claude and Gemini.", "mins": 13, "body": null, "ext": true}, "job-search-agent": {"title": "The job-search agent I built for myself", "excerpt": "An open-source tool that reads live job boards, scores fit with evidence for every point and lints application text for AI tells.", "mins": 8, "body": null, "ext": true}, "marketing-attribution-lab": {"title": "Marketing Attribution Lab: stop trusting last click", "excerpt": "An open-source tool that runs six attribution models on the same customer journeys, so you can see where last click misleads.", "mins": 6, "body": null, "ext": true}, "one-line-follow-ups": {"title": "12 follow-ups that fix weak AI answers", "excerpt": "The first answer is a draft. These 12 one-line replies, sorted by the problem they fix, turn it into something you can use.", "mins": 15, "body": null, "ext": true}, "pick-your-ai-by-job": {"title": "ChatGPT, Claude or Gemini? Pick by job, not by hype", "excerpt": "A plain comparison by task, with October 2026 prices and a 20-minute side-by-side test, so you pay for one tool, not three.", "mins": 16, "body": null, "ext": true}, "projects-in-claude-and-chatgpt": {"title": "Projects in Claude and ChatGPT, explained", "excerpt": "Set up a Project in Claude, ChatGPT or Gemini in 30 minutes, with ready-to-paste instructions for five everyday situations.", "mins": 16, "body": null, "ext": true}, "report-that-writes-itself": {"title": "A weekly report that writes itself", "excerpt": "The sheet does the maths, the AI writes the words: a tested template, prompt and no-code schedule for a weekly report draft.", "mins": 15, "body": null, "ext": true}, "side-project-prompt-chain": {"title": "A 4-prompt chain to plan a side project", "excerpt": "Four prompts, run in order, take you from a vague idea to a cheap test and a first-week plan. No hype, no income promises.", "mins": 14, "body": null, "ext": true}, "youtube-research-with-claude": {"title": "YouTube research with Claude: what works, why, and what to make next", "excerpt": "Find what works in a YouTube niche, why it works and what to make next, using Claude with transcripts, comments and your own Studio data.", "mins": 18, "body": null, "ext": true}};
[GUIDES, PROJECTS].forEach((arr) => arr.forEach((x) => { const L = LONG[x.slug]; if (L) Object.assign(x, L); }));
window.BWV_CONTENT = { GUIDES, PROJECTS, LAUNCH: typeof LAUNCH !== "undefined" ? LAUNCH : null, V: "3e7481069e" };
})();
