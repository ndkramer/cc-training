# Exercise Guide — Accenture Claude Code Workshop

Three exercises against this `order-service-exercise/` copy. All run live in the room. You can break this repo freely — your changes do not affect the trainer's demo repo.

## Prerequisites

**Required:**
- **Node.js 18+** — runs the tests (`node --test` is built into Node 18)
- **Claude Code CLI** — every exercise uses the `claude` command

**Not required:** Python, Docker, a specific IDE, or a GitHub account.

Quick check before you start:
```bash
node --version    # should be v18+
claude --version  # should be present
```

## Setup (do this once)

```bash
unzip order-service-exercise.zip   # or cd into the directory if you cloned it
cd order-service-exercise
npm install
```

**Note:** Exercise 1 has a planted bug, so `npm test` will show 1 failing test — that's expected. Exercises 2 and 3 build on top of the fixed repo.

---

## Exercise 1 — Find the boundary bug (~12 min)

**Why:** The demo showed Claude finding a rounding bug in `pricing.js`. Now you find a boundary bug in a different file — same order-service domain, different failure mode.

**Done when:** `npm test` passes and you can name the operator that was wrong.

### Steps

One failing test is pre-staged in `lib/tiers.js`. Don't open the test file — let Claude triangulate from the failure message.

**Step 1 — Open Claude and point it at the failure:**

```bash
claude
```

Then paste:

```
Test is failing in order-service. Find and fix the failing npm test
```

**Step 2 — Watch Claude grep, read, edit:**

Claude reads `lib/tiers.js`, spots the wrong comparison operator on the tier boundary, swaps it, and re-runs `npm test`.

**Step 3 — Confirm tests pass:**

```bash
npm test  # expect: 13/13 passing
```

### Success looks like

```
✔ order with score exactly 80 → high tier   # the boundary case
✔ order with score above 80 → high tier
✔ order with score in mid-range → medium tier
✔ order with score exactly 50 → low tier
✔ order with score below 50 → low tier
✔ high tier SLA is 1 business day
ℹ pass 13
```

The diff touches exactly one line in `lib/tiers.js` — a single comparison operator (`>` → `>=`). No other files changed.

### If you get stuck

- If Claude reads the test file first and guesses: **redirect with "Focus on `lib/tiers.js` — the tier-boundary comparison looks wrong."**
- If the test still fails after Claude's edit: **ask "Re-read the failing test and tell me what input it's using and what it expects."** That usually reveals the off-by-one.
- Last resort: `git checkout lib/tiers.js` and try a fresh prompt.

---

## Exercise 2 — Teach the repo (~15 min)

**Why:** The demo showed the repo with a sparse `CLAUDE.md` and a pre-staged `/reconcile` skill. Now you fill in the gaps yourself — domain terms, test command, and your first custom slash command.

**Done when:** `/<yourskill>` runs in Claude and shows you a diff.

### Steps

Stay in `order-service-exercise/` — the same repo you used in Exercise 1. `CLAUDE.md` is intentionally sparse (empty `Commands`, `Architecture`, and `Rules` sections). Your skill goes in `.claude/skills/<your-verb>/SKILL.md`.

**Step 1 — Fill in CLAUDE.md:**

Open `CLAUDE.md` and fill in the three empty sections in plain English:

- **Commands** — the test command (`npm test`)
- **Architecture** — domain terms (order, tier — one line each) and where logic lives (`lib/`)
- **Rules** — what not to touch (e.g. `test/` files are source-of-truth for expected behavior)

**Step 2 — Create your skill:**

```bash
mkdir -p .claude/skills/<your-verb>
```

Pick a domain verb: `reprice`, `audit`, `validate`. Then write `.claude/skills/<your-verb>/SKILL.md` with 3–5 plain-English steps. Include a guardrail step:

```
1. Run `npm test` first — abort if red.
2. ...
```

**Step 3 — Restart Claude and fire your skill:**

```bash
# exit current claude session (Ctrl-D or /exit), then:
claude
```

Then:

```
/<your-verb>
```

Skills are discovered at session start only — a restart is required.

### Success looks like

```
> /<your-verb>
[Claude reads SKILL.md]
Running npm test...
✓ 13/13 passing
[Claude executes step 2..N]
Diff:
  lib/<file>.js | 3 +-
```

Claude reads your `SKILL.md`, runs `npm test` first, then does whatever your steps describe — and produces a diff. It should reference your `CLAUDE.md` updates when explaining choices ("I avoided `test/` because CLAUDE.md says those are source-of-truth").

### If you get stuck

- If `/<your-verb>` not recognized: **restart Claude.** Skills are loaded at session start.
- If Claude ignores your `CLAUDE.md`: **make sure you saved the file and started Claude from `order-service-exercise/` (not a subdirectory).**
- Last resort: read your `SKILL.md` out loud — if a human couldn't follow it, neither can Claude. Tighten the language.

---

## Exercise 3 — Package it (~12 min)

**Why:** You've built a skill. Now package it so your whole team gets it with one install — skills, hooks, and config bundled.

**Done when:** `claude plugin validate my-plugin` shows a green check.

### Steps

You're packaging the skill you wrote in Exercise 2. The plugin manifest goes in `my-plugin/.claude-plugin/plugin.json`; skills live as a sibling at `my-plugin/skills/<your-verb>/SKILL.md`.

**Step 1 — Scaffold the plugin folder:**

```bash
mkdir -p my-plugin/.claude-plugin
mkdir -p my-plugin/skills/<your-verb>
cp .claude/skills/<your-verb>/SKILL.md my-plugin/skills/<your-verb>/SKILL.md
```

**Step 2 — Write the manifest:**

Create `my-plugin/.claude-plugin/plugin.json` with the three required fields:

```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "Order-service workflow toolkit",
  "author": { "name": "<your-name>" }
}
```

Keep it under 10 lines.

**Step 3 — Validate:**

```bash
claude plugin validate my-plugin
```

### Success looks like

```
Validating plugin manifest: my-plugin/.claude-plugin/plugin.json
✔ Validation passed
```

A green check with no errors. The `my-plugin/` directory has at minimum `.claude-plugin/plugin.json` + `skills/<your-verb>/SKILL.md`. Another teammate could clone it and install as-is.

### If you get stuck

- If validator complains about missing fields: **read the error — it tells you which field.** `plugin.json` needs `name`, `description`, and `author` at minimum.
- If validator can't find your skill: **check the directory layout — `my-plugin/skills/<your-verb>/SKILL.md`.** The skill name in the path must match the frontmatter `name:` field.
- Last resort: even a plugin with just one skill and a three-line `plugin.json` is a valid shippable artifact. Don't over-build.
