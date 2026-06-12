# Setup & Pre-session Checklist

## What's in this package

| File / Folder | What it is |
|---|---|
| `index.html` | Navigator — open via server (`http://localhost:8000/`), not double-click |
| `SETUP.md` | This file — prerequisites, checklist, keyboard shortcuts |
| `CLAUDE.md` | Auto-loaded by Claude Code — proactive readiness check on startup |
| `accenture-180-min-workshop-2026-05-13/` | Workshop deck folder |
| `accenture-180-min-workshop-2026-05-13/deck.html` | The presentation (open via server) |
| `accenture-180-min-workshop-2026-05-13/demo-scripts.html` | On-stage runbook — preflight, prompts, recovery for every demo |
| `accenture-180-min-workshop-2026-05-13/order-service/` | Live demo codebase |
| `how-to-use-this-project/` | Trainer guide deck |
| `_shared/` | Deck rendering dependencies + syllabus.html |
| `FACILITATOR-INSTRUCTION-AND-CHECKLIST.docx` | Full smoke-test and verification checklist for every demo and exercise |

---

## Prerequisites

Install these before presenting. Do it a day or two before — not the morning of.

| Tool | Why | Install |
|---|---|---|
| **Claude Code** | The tool you demo live | `npm install -g @anthropic-ai/claude-code` |
| **Anthropic auth** | Claude Code won't run without it | API key → set `ANTHROPIC_API_KEY`, or Claude Pro/Max → run `claude login` |
| **Node.js** | Run `npm test` and the MCP exercise | [nodejs.org](https://nodejs.org) |
| **Python 3** | Serve the deck locally | Pre-installed on Mac; Windows: [python.org](https://python.org) |
| **Chrome or Edge** | Render the deck reliably | — |

Internet connection required (deck loads React and Babel from CDN on first open).

---

## Start the presentation

Open a terminal in this folder, then:

```bash
python3 serve.py 8000
```

If that fails, try `python serve.py 8000`.

This serves the deck **and** lets you edit speaker notes live from the presenter
view (the Edit button saves straight back into `slide-manifest.js`). The plain
`python3 -m http.server 8000` still works if you only need to present, but the
note-editing **Save** button will fail against it.

Open Chrome or Edge and go to:

```
http://localhost:8000/
```

Press `Ctrl+C` in the terminal to stop the server when done.

---

## Pre-session checklist

Run these **the day before** — not the morning of.

**Slides:**
- [ ] Start the server and open `http://localhost:8000/` in Chrome — two cards show
- [ ] Click the workshop deck — all slides load, no "Missing slide: X" in the browser console
- [ ] Open `accenture-180-min-workshop-2026-05-13/demo-scripts.html` — read through it end to end

**Demo repo (`order-service/` · 6 demos):**
- [ ] `cd accenture-180-min-workshop-2026-05-13/order-service && npm install`
- [ ] `npm test` — expect exactly **1 failing test**
- [ ] `./reset-demo.sh` — re-plants the bug, clears skills, restores data
- [ ] `npm test` again after reset — still 1 failing
- [ ] Run the Demo 1 prompt cold in a fresh `claude` session to confirm it works

**Exercise 1 — Bug hunt (`order-service-exercise/` · ~8 min):**
- [ ] `cd accenture-180-min-workshop-2026-05-13/order-service-exercise && npm install`
- [ ] `npm test` — expect exactly **1 failing test**
- [ ] Confirm `README.md` is in the repo root (attendees read this first)
- [ ] Instruct attendees to navigate to the `order-service-exercise/` folder and open `exercise-guide.md` for full exercise instructions

**Exercise 2 — CLAUDE.md + Skills (runs in `order-service/` · ~8 min):**
- [ ] Confirm `accenture-180-min-workshop-2026-05-13/order-service/CLAUDE.md` does **not** exist yet (attendees write their own)

**Exercise 4 — Plugin packaging (runs in `order-service/` · ~8 min):**
- [ ] Verify `claude plugin validate --help` works

---

## Your on-stage runbook

**`demo-scripts.html`** — open this in a browser tab on your second monitor before you go on stage. Every demo section has:
- A preflight checklist
- A copy-paste prompt (so you're not typing live)
- What the audience will see
- A recovery step if Claude goes sideways

---

## Keyboard shortcuts

| Key | Action |
|---|---|
| `← →` or `Space` | Navigate slides |
| `S` | Open speaker notes in a second window (use the **Edit** button there to change a slide's notes — saves to `slide-manifest.js`) |
| `F` | Fullscreen |
| `#12` in the URL | Jump directly to slide 12 |
| `?print-pdf` in the URL | Render deck as printable PDF |

---

## Reset between sessions

Run this before each new group or if you want to re-run any demo from scratch:

```bash
cd accenture-180-min-workshop-2026-05-13/order-service
./reset-demo.sh
npm test   # confirm: 1 failing test
```

The exercise repos do not need a reset — each attendee works on their own copy.
