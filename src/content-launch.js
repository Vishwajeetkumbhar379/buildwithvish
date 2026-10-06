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
