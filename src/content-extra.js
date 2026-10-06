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
