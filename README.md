# Build with Vish

Free step-by-step guides, prompts, projects and carousels for building things with AI.
Live at https://buildwithvish.netlify.app

## How it's put together

- `src/` is the source: `app.js` (pages and interactions), `scene.js` (home 3D journey), `portfolio-scene.js` (portfolio 3D and live portrait), `sound.js` (generated ambient score and UI sounds), `style.css`, and the `content-*.js` files (all guides, projects, carousels, checklists and portfolio content).
- `python3 src/build.py` builds the published site into `site/`. Everything is self-hosted (fonts, libraries, photo), with strict security headers in `site/_headers`, so visitors' browsers make no third-party requests.
- `netlify/functions/submission-created.mts` passes newsletter sign-ups to MailerLite with double opt-in. It needs the Netlify environment variables `MAILERLITE_API_TOKEN` and `MAILERLITE_GROUP_ID`.
- `emails/welcome-series.md` is the text of the three-email welcome series in MailerLite.

## Publishing

Netlify deploys automatically from the `main` branch. To change the site: edit `src/`, run `python3 src/build.py`, commit, push.
