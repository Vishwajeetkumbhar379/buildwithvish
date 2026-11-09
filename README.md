# Build with Vish

Free step-by-step guides, prompts, projects and carousels for building things with AI.
Live at https://buildwithvish.netlify.app

## Version 2.0 (live since 9 November 2026)

- `v2/` is the 2.0 site: `index.html` (pages, styles and the main script), `js/` (opening, mascot and chat, Journey map and Earth, 3D pieces, interactive pieces, the article reader), `img/`, `audio/` (Vish's own voice clips), self-hosted `fonts/` and `vendor/` libraries with their licences.
- `python3 v2/build.py` builds everything into `site/`: it runs the v1 build for the long guide bodies (`/g`), legal pages, `/links.html` and `/resources`, then lays 2.0 over it, writes `/js/content.js` (every guide, project, prompt pack, tool page and news post from `src/`) and a strict `_headers` (scripts only from this site, no inline scripts, no third-party requests).
- Forms post to the Cloudflare Worker (`/api/newsletter`, `/api/partner`) and fall back to Netlify Forms when that endpoint isn't there, so they work on either host.

## How v1 was put together

- `src/` is the source: `app.js` (pages and interactions), `scene.js` (home 3D journey), `portfolio-scene.js` (portfolio 3D and live portrait), `sound.js` (generated ambient score and UI sounds), `style.css`, and the `content-*.js` files (all guides, projects, carousels, checklists and portfolio content).
- `python3 src/build.py` builds the published site into `site/`. Everything is self-hosted (fonts, libraries, photo), with strict security headers in `site/_headers`, so visitors' browsers make no third-party requests.
- `netlify/functions/submission-created.mts` passes newsletter sign-ups to MailerLite with double opt-in. It needs the Netlify environment variables `MAILERLITE_API_TOKEN` and `MAILERLITE_GROUP_ID`.
- `emails/welcome-series.md` is the text of the three-email welcome series in MailerLite.

## Publishing

`main` deploys automatically. To change the site: edit `v2/` (or the guides in `src/`), run `python3 v2/build.py`, commit, push.
