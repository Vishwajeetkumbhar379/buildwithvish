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
