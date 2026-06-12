// slide-manifest.js — How to use this project
// HAND-AUTHORED (not /ncp-generated).
// Partner enablement session for Accenture practitioners.
// Teaches the /ncp workflow: clone, generate, tailor, smoke-test, serve locally.
//
// No demo vehicle — the LIVE demo IS /ncp itself (slides 11 + 22).
// Arc: Clone the repo → kick off /ncp live → tailor the output →
// smoke-test → serve locally. The /ncp run spans the middle of the session
// (kicked off slide 11, inspected slide 22).
//
// Sections & timing:
//   pre      4    min  —  3 slides
//   access   4.5  min  —  3 slides
//   gen     12.5  min  —  5 slides (1 demo kickoff)
//   tailor  20.5  min  —  8 slides (the bulk — alignment, testing, tools)
//   present 10    min  —  4 slides (1 demo return)
//   wrap     1    min  —  2 slides
//   ─────────────────────────────────
//   Total   52.5 min   25 slides  (~7.5 min buffer — intentionally wide
//           for Q&A mid-flow)

window.SLIDES = [
  // ── pre ───────────────────────────────────────────────────────
  { c: 'Slide_TTTitle',       section: 'pre', kind: 'title',   mins: 1,
    notes: "Welcome. This session is for Accenture practitioners who deliver Claude Code workshops to clients. By the end of the next hour you'll know how to generate a full client deck with /ncp, tailor it to a specific client, smoke-test it end-to-end, and present it from your laptop. Everything in this repo, from the demo repos to the speaker notes you're reading right now, was built with this workflow." },

  { c: 'Slide_TTAgenda',      section: 'pre', kind: 'content', mins: 1,
    notes: "Five steps. Clone is getting the repo and understanding the layout — there's no access gate. Branch is one command — do it every time, it keeps each client deck isolated. Generate is where we kick off /ncp live in a terminal and let it run while we talk through what it's doing. Tailor & Test is the bulk of the session — client alignment, smoke-testing, the tools you'll use to tune a deck after generation. Present is the finish line — commit, run ./serve.sh, open the deck. No cloud deploy." },

  { c: 'Slide_TTWhy',         section: 'pre', kind: 'content', mins: 2,
    notes: "The 'why' behind this workflow. Every customer workshop has three to five live demos — even a one-hour 101. Demos aren't bolted on at the end; they're sprinkled through the deck, one every twelve minutes or so. That cadence means the demo repo has to actually work, the speaker notes have to be real prose, and the demo-scripts runbook has to have real prompts and real recovery steps. Decks-as-code keeps the field consistent — same shared slide components, same brand, same structure — while letting each deck be customer-tuned. /ncp is how you get from 'new customer call on Thursday' to 'presentable deck with working demos' in one session." },

  // ── access ────────────────────────────────────────────────────
  { c: 'Slide_TTSectionAccess', section: 'access', kind: 'section', mins: 0.5,
    notes: "" },

  { c: 'Slide_TTAccess',      section: 'access', kind: 'content', mins: 2,
    notes: "First things first — clone the repo. No access gate; if you have the GitHub URL you're in. There's no build step — the decks run client-side via babel-standalone in the browser. Open any deck.html and it just works.\n\nThen — before you do anything else — cut a presentation branch: `git checkout -b <client>-deck`. Everything /ncp generates goes on that branch. You'll commit to it directly; branches keep each client engagement isolated." },

  { c: 'Slide_TTRepoTour',    section: 'access', kind: 'content', mins: 2,
    notes: "Quick tour of the repo layout. _shared/ is the DRY component library — shared slide components, navigation, colors, the stuff every deck uses. Source directories are the source of truth — 'Generic Claude Code Workshop/', 'Generic 1 Hour Overview/', plus any client decks you've built. dist/ is a build artifact — /ncp and /ncp-sync mirror the source dirs into it. Never edit dist/ directly; the next sync will overwrite your changes. And .claude/skills/ is where /ncp and /ncp-sync live. That's the machinery we're here to learn." },

  // ── gen ───────────────────────────────────────────────────────
  { c: 'Slide_TTSectionGenerate', section: 'gen', kind: 'section', mins: 0.5,
    notes: "" },

  { c: 'Slide_TTPlanner',     section: 'gen', kind: 'content', mins: 2,
    notes: "Before you run /ncp, consider opening _shared/planner.html. It's a visual slide picker — toggle slides on and off, watch the timing budget update, and when you're happy, copy the CSV. That CSV is the exact answer to /ncp's first question ('picked slides from the planner?'). You don't have to use the planner — /ncp can infer a slide set from audience and length — but it gives you more control, especially for shorter sessions where every minute counts." },

  { c: 'Slide_TTNcpIntro',    section: 'gen', kind: 'content', mins: 3,
    notes: "/ncp is a build, not a scaffold. When it finishes you get: a full deck with real slides, a demo repo with a planted bug where npm test shows exactly one failing test, a separate exercise repo with a different bug, speaker notes that are real prose, and a demo-scripts runbook with copy-paste prompts and recovery steps. No TODO stubs. The output is presentable on first run.\n\nThree artifacts that must agree — slide-manifest.js notes, demo-scripts.html, and the generated block of deck-profile.jsx — are all produced from one presentation-spec.json. That's the key architectural decision: one source of truth, three derived outputs. Edit the spec, run /ncp-sync, they regenerate together." },

  { c: 'Slide_TTNcpQuestions', section: 'gen', kind: 'content', mins: 3,
    notes: "Walk the eight questions /ncp asks. Two calls of four. Call one is routing: picked slides from the planner (free text or empty to infer), customer name, live demos yes/no, hands-on exercises yes/no. Call two is content: platform (c4e, bedrock, vertex, etc.), session length in minutes, audience experience level, and demo vehicle plus domain — that last one is a single line like 'order-service: B2B order management'.\n\nThe things to call out: audience drives bug difficulty — 'power-users' unlocks the async-race bug, which is genuinely hard. Vehicle and domain become the demo repo name and the bug narrative — 'subscriber sub-0015 gets overbilled' vs 'order ORD-0042 gets overcharged'. Platform swaps the install and auth slides. These aren't cosmetic choices — they shape the whole deck." },

  { c: 'Slide_TTDemoKickoff',  section: 'gen', kind: 'demo',   mins: 4,
    notes: "[DEMO — LIVE. Switch to terminal.]\n\nWe're going to run /ncp right now. Open a terminal, run `claude`, then type `/ncp`.\n\nAnswer the questions: leave picked-slides empty (let it infer), customer is 'Acme Robotics', yes to demos, no to exercises, platform is bedrock, length is 60, audience is mixed, vehicle is 'arm-controller: industrial robotics'.\n\nHit enter and let it run. It's going to take several minutes — it spawns subagents to build the demo repo in parallel with the deck artifacts. We're going to leave this running and come back to it on slide 22. By then it should be done and we'll inspect the output together.\n\n[Leave the terminal visible if you have a second monitor. Switch back to slides.]" },

  // ── tailor ────────────────────────────────────────────────────
  { c: 'Slide_TTSectionTailor', section: 'tailor', kind: 'section', mins: 0.5,
    notes: "" },

  { c: 'Slide_TTCustomerAlign', section: 'tailor', kind: 'content', mins: 4,
    notes: "This is the key message of the whole session. Domain alignment isn't cosmetic — it's the difference between an audience that leans in and one that glazes over. Fidelity engineers engage when the demo bug is a NAV calculation error; they check out when it's a generic flag-service. The domain has to feel like their world.\n\nAnd sometimes the demo becomes more than a demo. GE Vernova's turbine-selector demo — we built it as a workshop exercise — seeded their actual curtailment-agent pilot. A P2/P3 they hadn't even scoped before the workshop. The SE walked out with a follow-up meeting already booked. That's what happens when the demo vehicle is close enough to their real problem that they start seeing possibilities.\n\nSpend the prep time here. Get the vehicle right. Get the domain nouns right. Talk to the account team about what the client actually builds. The rest of the workflow is mechanical — this part is judgment." },

  { c: 'Slide_TTDemoPhilosophy', section: 'tailor', kind: 'content', mins: 3,
    notes: "Three to five demos minimum, even in a one-hour session. The canonical four: Demo 1 is Fix the Failing Test — cold start, basic loop, fast win. Demo 2 is Plan Mode — the scary refactor, zero edits until you approve. Demo 3 is Skill Invocation — a domain verb, repeatable workflow, the audience sees /calibrate or /reconcile actually run. Demo 4 is the Agent Teams tease — parallel agents, lateral coordination, the 'wow' moment.\n\nSprinkled, not stacked. One demo every twelve minutes or so. The audience should never go more than fifteen minutes without watching Claude do something live. If they're just looking at slides for twenty minutes, you've lost them. The demos are the content — the slides are connective tissue.\n\nPro tip: take Q&A while Claude is running. Don't narrate every tool call and don't sit in silence — kick off the prompt, turn to the room, 'any questions on what we just covered?', and tab back when output lands. The 60-second tool loop becomes engagement time instead of dead air." },

  { c: 'Slide_TTSpecJson',    section: 'tailor', kind: 'content', mins: 3,
    notes: "presentation-spec.json is the one file you edit after generation. It has three main arrays: demos (with prompts, bug IDs, narratives, beats), exercises (with bug IDs, guide steps), and slides (the ordered list of component names). Three downstream artifacts — the manifest, the demo-scripts page, and the generated block of deck-profile.jsx — all regenerate from the spec. So when you want to swap a demo prompt, change a bug, or reorder slides, you edit the spec, not the artifacts." },

  { c: 'Slide_TTNcpSync',     section: 'tailor', kind: 'content', mins: 2,
    notes: "The regeneration workflow: edit the spec, run /ncp-sync. It overwrites slide-manifest.js and demo-scripts.html entirely — they're fully spec-derived. For deck-profile.jsx it only touches the marked region between the GENERATED markers. Everything below the END GENERATED marker — the hand-editable claudeMd, planMode, and skill JSX fragments — survives the sync. That's where your domain-flavored content lives, and it's safe." },

  { c: 'Slide_TTSmokeTest',   section: 'tailor', kind: 'content', mins: 4,
    notes: "Non-negotiable. /ncp writes real code, but you verify before you're on stage. The checklist: npm test in the demo repo shows exactly one failing test — not zero, not three, one. Run every demo prompt cold in a fresh claude session — don't assume it works because it worked during generation. Click every slide in the deck — if you see 'Missing slide: X' that means a JSX parse error somewhere upstream, not a missing file. Try ?print-pdf. Run reset-demo.sh and confirm it restores the bug.\n\nDo this the day before the customer call. Not the morning of. Not five minutes before. The day before. If something's broken you want time to fix it, not time to panic." },

  { c: 'Slide_TTDemoScripts',  section: 'tailor', kind: 'content', mins: 2,
    notes: "demo-scripts.html is the on-stage runbook. Every demo section has: a preflight checklist (reset-demo.sh has run, npm test shows the failure, fresh claude session), a goal, a copy-paste prompt (so you're not typing live and fat-fingering it), what the audience sees, what to say while it runs, and a recovery step if Claude goes sideways. Put this on your second monitor. You should never be improvising a demo prompt on stage." },

  { c: 'Slide_TTPresenterKeys', section: 'tailor', kind: 'content', mins: 2,
    notes: "Keyboard shortcuts for presenting. Arrow keys and Space navigate slides. S opens the speaker-notes popout window — it follows the main window automatically, put it on your second monitor. Hash deep-links work: #12 jumps to slide 12, useful for skipping ahead or recovering from a crash. ?print-pdf renders the whole deck as a printable PDF. And C opens the config panel on the generic/parametric decks — that's where you toggle platform, duration slider, and level. Customer decks built by /ncp are pre-curated so the config panel is mostly a no-op there." },

  // ── present ───────────────────────────────────────────────────
  { c: 'Slide_TTSectionShip',  section: 'present', kind: 'section', mins: 0.5,
    notes: "" },

  { c: 'Slide_TTDeploy',      section: 'present', kind: 'content', mins: 3,
    notes: "/ncp and /ncp-sync already synced dist/ and added the landing-page card — you don't run rsync yourself. Commit your branch, then run `./serve.sh`. Open localhost:8000/<slug>/deck.html. That's it — no cloud deploy, no review gate. You own this repo." },

  { c: 'Slide_TTLocalFallback', section: 'present', kind: 'content', mins: 1.5,
    notes: "This isn't a fallback — it's the only path. Decks are static HTML. `./serve.sh` wraps `python3 -m http.server 8000 --directory dist`. Works on a plane, works without VPN, works offline. To share afterward, zip `dist/<slug>/` and hand it over." },

  { c: 'Slide_TTDemoReturn',   section: 'present', kind: 'demo',   mins: 5,
    notes: "[DEMO — LIVE PART 2. Tab back to the terminal where /ncp has been running.]\n\nLet's see what /ncp built. It should be done by now — if not, we wait. This is the real output, not a pre-staged one.\n\nOpen the generated deck.html in a browser. Click through a few slides — cold open, agenda, a demo slide. The speaker notes are real prose. The profile is wired. No 'Missing slide' errors means every JSX file parsed cleanly.\n\nNow open demo-scripts.html. Show the preflight checklist, the copy-paste prompt, the recovery step. This is what goes on your second monitor.\n\nFinally: cd into arm-controller and run npm test. One failing test. That's the planted bug — the one Demo 1 will find and fix live in front of the customer. This is exactly what you smoke-test before the customer call. If npm test shows zero failures, the bug wasn't planted. If it shows three, something else broke. One red test. That's the contract.\n\n[Switch back to slides.]" },

  // ── wrap ──────────────────────────────────────────────────────
  { c: 'Slide_TTRecap',       section: 'wrap', kind: 'content', mins: 1,
    notes: "The full arc: clone the repo, cut a branch, run /ncp to generate the deck and demo repo, align the domain to the client, smoke-test everything cold, use /ncp-sync to regenerate after spec edits, and serve locally. That's the workflow. You should be able to go from 'new client call scheduled' to 'presentable deck with working demos' in a single session." },

  { c: 'Slide_TTQA',          section: 'wrap', kind: 'content', mins: 0,
    notes: "Links: this repo on GitHub, Claude Code public docs, the slide planner. If you're building your first deck for a real client, pair with someone on your team who's done it before." },
];
