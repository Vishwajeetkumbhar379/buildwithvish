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
  body: `<p>Set up a campaign HQ in Claude, then shortlist, vet, brief, review and report on creators with copy-paste prompts.</p>` }
];
