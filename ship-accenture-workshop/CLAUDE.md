# Claude Code Workshop — Facilitator Package

You are helping a facilitator prepare to deliver and run the Claude Code workshop.

## On startup
When the facilitator opens this directory, proactively check readiness without being asked:

1. Check whether npm dependencies are installed in the demo repo:
   `find . -name node_modules -maxdepth 3 -type d`
   If missing, tell them: `cd accenture-180-min-workshop-2026-05-13/order-service && npm install`

2. Verify the demo is in the correct pre-session state:
   `cd accenture-180-min-workshop-2026-05-13/order-service && npm test`
   Expect exactly 1 failing test. If all pass, run `./reset-demo.sh` then test again.

3. Remind them to start the presentation server from this folder:
   `python3 serve.py 8000`
   Then open http://localhost:8000/ in Chrome or Edge.
   (`serve.py` also lets them edit speaker notes live from the presenter view via
   the Edit button — saves back to `slide-manifest.js`. Plain `python3 -m http.server`
   still presents fine, but the note-editing Save button needs `serve.py`.)

4. Point them to `accenture-180-min-workshop-2026-05-13/demo-scripts.html` for the step-by-step demo runbook.

## Package structure
- `index.html` — navigator (must open via the server, not by double-clicking)
- `accenture-180-min-workshop-2026-05-13/` — workshop deck, demo repo (order-service), exercise repo, demo scripts
- `how-to-use-this-project/` — trainer guide deck
- `SETUP.md` — full pre-session checklist and keyboard shortcuts

## Key commands
- Reset demo between sessions: `cd accenture-180-min-workshop-2026-05-13/order-service && ./reset-demo.sh && npm test`
- Stop the server: Ctrl+C in the terminal running serve.py
