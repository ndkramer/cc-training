// slide-manifest.js — Accenture 180 Min Workshop 2026-05-13
// Generated from presentation-spec.json by /ncp. Edit spec + run /ncp-sync to regenerate.
//
// Section / timing summary
// ────────────────────────────────────────────────────────────────────
//  PRE       2 slides   2.0 min   Cold open + agenda
//  101      18 slides  34.5 min   Foundations + Demo 1 + Exercise 1
//  201      36 slides  59.0 min   Teach Claude + Demos 2-4 (+ hooks sim) + Exercise 2
//  301      22 slides  41.0 min   Scale & Integrate + MCP + Demo 5, 6, 7 + Exercise 3 (Slide_Ex4)
//  WRAP      6 slides   8.0 min   Recap answers, Recap, Q&A, Thanks
//  ─────────────────────────────────────────────────────────────────
//  TOTAL    84 slides 144.5 min   buffer: ~35.5 min (20% of 180)
//
// Demo arc:
//   Demo1 (fix Math.ceil in pricing.js → ORD-0042 over-billed by one unit)
//   Demo2 (plan mode: refactor pricing to support bulk discounts)
//   Demo3 (/reconcile ORD-0042 skill)
//   Demo4 (hooks block data/*.json direct edits) + HooksSimDemo preview
//   Demo5 (parallel Explore: data model + API + test coverage)
//   Demo6 (wire up order-store MCP via localhost HTTP)
//   Demo7 (agent teams: audit → fix → verify order drift)
// Exercises: Ex1 (boundary bug in tiers.js) · Ex2 (CLAUDE.md + skill)
//            Ex4 (plugin package)
// Exercise 3 (MCP hands-on) intentionally omitted — Demo 6 is presenter-driven only.
// ────────────────────────────────────────────────────────────────────

window.SLIDES = [

  // ── PRE ──────────────────────────────────────────────────────────

  { c: 'Slide_ColdOpen', section: 'pre', kind: 'content', mins: 1,
    notes: "[Idle shows `$ claude` + cursor. Press Enter to arm — animation runs ~6s. Don't speak until the title lands.]\n\nThat was Claude Code. A test in our program (order-service) — code that has been around a while — failed, and it found the bug, fixed it, and tested it in less than six seconds.\n\nEverything in the next three hours is some version of what you just watched. We're just going to get progressively more ambitious about what 'the mess' is." },

  { c: 'Slide_LinaAgenda', section: 'pre', kind: 'content', mins: 1,
    notes: "Five sections. \n-Introduction — what Claude Code is and where it fits. \n-How to work with it — modes, commands, the daily-driver shortcuts. \n-Context management — because output quality is context quality. \n-Common workflows — spec-driven and test-driven patterns. \n-And an appendix with some bonus features.\n\nWe will also have several demo and even a few hands-on exercises so that you can practice.\n\nIf you only remember one section, make it section three." },

  // ── 101 — FOUNDATIONS ────────────────────────────────────────────

  { c: 'Slide_Section101', section: '101', kind: 'section', mins: 0.5,
    notes: "Foundations.\nIn this section, we will discuss -what is Claude Code\n-How to get it running-\n-then straight into a live demo." },

  { c: 'Slide_WhatIsCC', section: '101', kind: 'content', mins: 1,
    notes: "Claude Code is an agent in your terminal. Not a sidebar, not autocomplete, not a browser tab. It lives in your repo. \nYou describe what you want it to do\n-It reads your files\n-runs your tests\n-makes edits\n-tests the results\n\nThink of it as an advanced assistance.\n\nBut don't worry, you have full control and can see every step Claude Code takes in the terminal. \nYou can approve every edit, see every change, and adjust course as necessary. \n-That's the whole model." },

  { c: 'Slide_WhatIsLoop', section: '101', kind: 'content', mins: 1.5,
    notes: "[2 clicks. Click 1 — loop animates. Click 2 — 'who it's for' card reveals.]\n\nHere's what 'agent' actually means. It is a four-step loop.\n\n[Click 1] \n-Read — it looks at your code. \n-Decide — it figures out what to do next. \n-Act — it runs a command or makes an edit. \n-Observe — it checks what happened. And then it loops. You describe the goal, and it runs that loop until it reaches the desired outcome. \nThat's the whole mechanism. Not magic — just this loop.\n\n[Click 2] Clause code is for developers and non-developers. If you have access to the terminal and a repo, Claude Code will work for you.  The best part is that if you have never used code, it can help you ramp up quickly. \nYou can get started in just a few quick steps. " },

  { c: 'Slide_Install', section: '101', kind: 'content', mins: 1,
    notes: "Getting it installed is basically two steps. \n-From the Terminal, you run the install script\n-Then type `claude` and it walks you through the rest. \n\nNo API keys to manage, no env vars. Your admin already provisioned the seats.\n\nOne caveat — first install scripts download the binary code, which takes about thirty seconds. \n\nAfter that, you're up and running." },

  { c: 'Slide_Models', section: '101', kind: 'content', mins: 1,
    notes: "Three models. \n-Opus for the hard problems — big refactors, gnarly debugging, when you need it to really think. \n-Sonnet for daily driving — fast enough, smart enough.\n-Haiku for speed — formatting, boilerplate, anything where you know exactly what you want and you just need it typed.\n\nI spend about 75% of my time in Sonnet because it does everything I need and is fast.\n\nYou switch with the slash `/model` inside a session, even if you're mid-conversation. \n\n" },

  { c: 'Slide_WhichModel', section: '101', kind: 'content', mins: 1.5,
    notes: "Reference slide. The previous one was the intuition — this is the lookup table.\n\nOpus: hardest problems, peak intelligence, $5/$25 per million tokens. Sonnet: near-Opus at scale, $3/$15. Haiku: latency-sensitive, free-tier, $1/$5. Context is 1M for Opus and Sonnet, 200K for Haiku.\n\nThe row that matters most for daily work is 'Best for' — long-horizon agent tasks go to Opus, high-volume production goes to Sonnet, sub-second responses go to Haiku. Pick by task shape, not by default." },

  { c: 'Slide_CoreLoop', section: '101', kind: 'content', mins: 1.5,
    notes: "Everything is this loop. \n-Spec to prototype \n-bug to fix \n-migration to done \n\nSame six steps every time. Prompt, read, plan, edit, review, loop. \n\nRemember that you are the most important part of the loop. Stay engaged with Claude to ensure it follows your rules and builds to a high standard.\n\nThe rest of today is about making each step faster. The loop closes itself: tests run, output comes back, Claude iterates. You stay in review." },

  { c: 'Slide_FeatureLadder', section: '101', kind: 'content', mins: 1.5,
    notes: "Seven-rung maturity ladder. Install it, chat with it, write a CLAUDE.md, plan mode, skills, parallel agents, agent teams.\n\nSome people install Claude Code try it and get to rung two or three. They ask it questions, maybe it fixes a bug for them, and that might be enough for them; \n\nOthers mature and need more. \n\nSo they teach it the repo and start to advance on the feature ladder.\nThe middle of this session is rungs three through five — that's where the power is. \n\nThe end touches rung six and seven.\n\n[Optional poll if the room feels warm: 'Quick hands — who here has already installed it?' Calibrate the next few slides on the response.]" },

  { c: 'Slide_HowAnthropicUses', section: '101', kind: 'content', mins: 1.5,
    notes: "Here is how Anthropic recommends using Claude Code. \n\nThey are the experts. They wrote it, and they use it.\n\nThese are my four initial playbook tips.\n\nOne: give it your systems. If your team uses GitHub and Jira and some CI pipeline, so should Claude. Not 'someday when we trust it' — day one. It's useless in a sandbox.\n\nTwo: give it your information. CLAUDE.md, architecture docs, the decisions you've already made. Context is what makes it YOUR teammate instead of a generic one.\n\nThree: keep setup light. The temptation is to build some elaborate config before you start. Don't. One good CLAUDE.md, a couple slash commands. You'll know what you actually need after a week, not before.\n\nFour: treat it like a teammate. Ask it questions. Push back. Review its work. The conversational loop IS the feature.\n\nThat's the whole playbook. Everything else today is one of these four." },

  { c: 'Slide_CrossOrg', section: '101', kind: 'content', mins: 1,
    notes: "This isn't theoretical. Here's how teams across Anthropic actually use Claude Code — and most of these aren't engineering teams.\n\nProduct development: prototyping. Data science: dashboard apps. Security: infra debugging and runbooks. Legal: workflow automation. Growth marketing: ad generation. Design: interactive prototypes.\n\nThe point is — this isn't a developer tool that engineers use. It's a building tool that anyone with a problem and a terminal can pick up. Value across the org, not just one team's velocity." },

  { c: 'Slide_WorkflowTransform', section: '101', kind: 'content', mins: 1.5,
    notes: "The point isn't the number of steps before and after\n— it's where the time goes. \n\nIf you notice, the loop stays roughly the same.\n\nBefore: most of the hours are in implementation and debugging-these are the coding steps, the steps that require specialized coding knowledge. \n\nAfter: because Claude can do the coding-faster that you can, you're freed up to spend most of your hours on spec planning, review, and architecture.\n\nYour value moves up the stack — from code production to design judgment. Claude does the typing; you do the thinking." },

  { c: 'Slide_SDLC', section: '101', kind: 'content', mins: 3,
    notes: "[6 substages. Intro lands automatically — then 5 arrow-right clicks walk Discover → Design → Build → Deploy → Support. Each stage runs ~5s of animation; let it breathe before clicking through.]\n\nHere's the thing that surprises people: Claude Code isn't just for writing code. It helps across the entire software development lifecycle.\n\n[Click → Discover] Exploring an unfamiliar codebase. Claude reads README, CLAUDE.md, walks the order module. Same thing you'd do — but in seconds. We can see the Callback URL issue.\n\n[Click → Design] Resist the urge to just tell Clause to FIX it. \nInstead, ask Claude to draft a Request for Comment (RFC). Which is the problem statement, a proposed solution, and changes? The doc streams in. Now we can work with Claude to understand the bug and refine the solution.\n\n[Click → Build] Once we are happy with the direction, we can build the solution. One of the cool things that we can see on this screen is that the red lines are the ones that are being removed and the green lines are the updated code.  Because I am in the driver's seat, I can even ask Claude to make more changes before I move on.\n\n[Click → Deploy] PR opened, CI runs, checks pass, merge button lights up. The terminal narrates while GitHub renders.\n\n[Click → Support] This screen is a Sentry alert. 847 events. Stack trace points at pricing.js:12 — the same line we just fixed. Claude reads the alert, finds the root cause, and links it to the PR. This tells the person looking at the Sentry error that the bug has been fixed and has not been deployed it.  \n\nFive stages. Same agent. That's the loop — discovery through hotfix." },

  { c: 'Slide_NoOneWay', section: '101', kind: 'content', mins: 1,
    notes: "[Click once — kicker. Click again — tweet lands.]\n\nThis is Boris. He created Claude Code. And what he wants you to know is the underlined bit: \n\nThere is no one right way to use this.\n\nEverything I show you today — CLAUDE.md, plan mode, skills — these are patterns, not rules. The way I set it up for order-service is not how you'll set it up for your stack. That's fine. That's the point. Steal what's useful, ignore what isn't." },

  { c: 'Slide_Boris', section: '101', kind: 'content', mins: 2,
    notes: "[3 clicks.]\n\n[Click 1 — tweet.] That's the tweet again. But the thing is, Boris doesn't just say 'experiment' and leave it there. Here's what his day actually looks like.\n\n[Click 2 — phone with 5 sessions.] Five Claude sessions running at once. Think of them as a small team.\n-One's reviewing a PR. \n-One's working on a feature branch. \n-One's answering questions. \nHe context-switches between them the way you'd context-switch between browser tabs. And on Claude for Enterprise — these sessions don't all have to run from his laptop. Some are in the browser. One might be on his phone.\n\n[Click 3 — counter lands.] Boris can complete 20 PRs a day. That's not a vanity number — that's what happens when five sessions each close small loops in parallel.\n\nYou don't have to work this way. But this is what the ceiling looks like." },

  { c: 'Slide_Where', section: '101', kind: 'content', mins: 2,
    notes: "[Arrow keys cycle 4 surfaces. Let each one settle ~2s before advancing.]\n\nSo far everything's been in a terminal. But it runs in more places.\n\n[Arrow 1 — CLI.] The terminal you've been watching. This is the default, it's where the power users live.\n\n[Arrow 2 — IDE.] Same agent, inside VS Code. Sidebar. You stay in your editor, Claude's right there. Good for people who don't live in a terminal.\n\n[Arrow 3 — Web.] Same agent, in a browser. No install at all. Someone on your team who reviews code but doesn't write it? They can use this.\n\n[Arrow 4 — Everywhere.] GitHub, Slack, mobile. The SDK if you want to build your own surface.\n\nSame agent. Same CLAUDE.md. Same skills. Four surfaces." },

  { c: 'Slide_Rookie', section: '101', kind: 'content', mins: 2,
    notes: "[6 clicks — one card per click.]\n\nEven experienced users make these. Each card is symptom → why → fix.\n\n1-Watching it work, approving every edit? Shift-Tab to auto-accept. \n\n2-Long task holding the prompt? Ctrl-B backgrounds it. \n\n3-Wrong file, you nuke the session? ESC ONCE interrupts- ESC TWICE rewinds the conversation to the last good point\n\n4-No need to type paths from memory? @ begin typing until you see what you are looking for- tab-completes, think of it as auto-complete.\n\n5- Does Claude seem confused, or are you starting a whole new topic? Use the /clear \n \n6-Plan mode — read-only, propose first.\n\nThese aren't advanced. They're week-one habits." },

  { c: 'Slide_Demo1', section: '101', kind: 'demo', mins: 3,
    notes: "[DEMO 1 — order-service]\n\nAn order ORD-0042 cancels mid-cycle. Should be billed for 15 days — the invoice says 16. It's one character wrong — Math.ceil instead of Math.floor — but it's a billable number on a client invoice, and that's the kind of bug that gets escalated. Watch where Claude goes when all you say is 'the test fails.'\n\n[Switch to terminal, cd order-service, run `claude`]\n[Paste: npm test is failing in order-service. Find and fix it.]\n[Watch: runs test → sees ORD-0042 expects 15 gets 16 → opens pricing.js → spots Math.ceil → swaps to Math.floor → reruns → green]\n\nIt read the test. It read the code. It found the one character that was wrong. Nobody told it where to look." },

  { c: 'Slide_Ex1', section: '101', kind: 'exercise', mins: 8,
    notes: "[EXERCISE 1]\n\nThe demo showed Claude finding a rounding bug in pricing.js. Now you find a boundary bug in a different file — same order-service domain, different failure mode.\n\nDone when: npm test passes and you can name the operator that was wrong\n\n[Hands-on. 15 minutes. Walk the room.]\n\nUnzip order-service-exercise.zip, cd in, npm install, npm test. One test fails. Don't read the test file — read the error message. Open claude and paste what you see. Done when 4+ tests pass.\n\nIf someone gets stuck: the bug is one character in lib/tiers.js. They don't need to understand the whole codebase — just let Claude grep." },

  // ── 201 — TEACH CLAUDE YOUR REPO ──────────────────────────────────

  { c: 'Slide_Section201', section: '201', kind: 'section', mins: 0.5,
    notes: "The previous demo was reviewing code out of the box, code it had never seen.\n\nWhich is fine if you are working with a small project.\n\nBut what if you are working with a large code repository?\n\nHere's where it actually gets good: where the real power of Claude begins to flex.  We can actually teach Claude the repo." },

  { c: 'Slide_ContextPrinciple', section: '201', kind: 'content', mins: 0.5,
    notes: "[Dark slide. Hold for a beat before speaking — the visual break does work.]\n\nI cannot stress this enough. Claude Code is as good as the context you give it.\n\nSet up your context properly, and the results are dramatically better. Skip it, and you get generic answers from a model that doesn't know your codebase. Everything in this section — CLAUDE.md, skills — is about closing that gap." },

  { c: 'Slide_ClaudeMd', section: '201', kind: 'content', mins: 2,
    notes: "The first thing you teach it with is CLAUDE.md. Markdown file, root of the repo, Claude reads it automatically every session.\n\nThink of it as the briefing you'd give a new employee.\n-What is this project\n-What are our coding standards\n-How do we run the tests? \n-What should I never touch? \n-What's the known tech debt? \n-Which modules are fragile? \n\nKeep it short. Under 200 lines. You're not writing documentation, you're writing a briefing. The stuff a new engineer would spend a week asking around about — that goes here. The stuff they can grep for — leave it out." },

  { c: 'Slide_ClaudeMdNesting', section: '201', kind: 'content', mins: 2,
    notes: "CLAUDE.md nests. Four levels.\n\n1. Global (applies to everything you ever do, on any project)\n\nLives in your home folder\n\n2. Project (applies to the specific project)\n\nLives in the root folder of the project.\n\n3. Nested (applies only to one sub-folder or module)\n\n4. Local (applies only to a specific project on a specific machine, never shared)\n\n\nClaude.md files nest and merge, a lot like CSS. The deeper file inherits everything from the root, so it doesn't restate it. It just covers what's local to that area.\n\nSo when you launch Claude in a subdirectory, it reads all three layers. It knows the org conventions AND the subdirectory you're in. You don't repeat yourself, and Claude doesn't have to guess." },

  { c: 'Slide_PlanMode', section: '201', kind: 'content', mins: 2,
    notes: "Plan mode. Shift-Tab twice toggles you in.\n\nIn plan mode, Claude reads everything, figures out what it would do, proposes a plan — and does not touch a file. It can't. Zero edits until you approve.\n\nThis is what you reach for when the change is scary. You're about to refactor something that forty other things depend on, and you want to see the blast radius before anything moves.\n\nYou get a plan. You read it. If it's wrong, you say so — it replans, still zero edits. When it's right, you approve it and it executes. You never find out halfway through an edit that the approach was wrong." },

  { c: 'Slide_BashMode', section: '201', kind: 'content', mins: 1.5,
    notes: "[Animated terminal. Auto-plays ~5s — zoom in, prompt, ! gets typed, then `git status` runs. Wait for it to settle.]\n\nBash mode. ! as the first character drops you into a shell. You run the command yourself — not asking Claude to run it.\n\nThe point: the output is shared. You run `git status`, see what's staged, then say 'commit those three files.' Claude saw the same output. No re-explaining.\n\nSmall thing, changes the rhythm. You drive, Claude watches over your shoulder." },

  { c: 'Slide_Screenshots', section: '201', kind: 'content', mins: 1,
    notes: "[Animated. Auto-plays a paste sequence. Wait for it.]\n\nVisual feedback. Drag an image straight into the terminal — Claude sees it.\n\nThe killer use case: the UI is broken in a way that's hard to describe. Don't describe it. Screenshot, paste, say 'this button is wrong.' Claude looks at the actual pixels.\n\nMac shortcut: Cmd+Ctrl+Shift+4 to copy a region, then Ctrl+V — and it really is Ctrl, not Cmd. That trips everyone up the first time." },

  { c: 'Slide_Demo2', section: '201', kind: 'demo', mins: 3,
    notes: "[DEMO 2 — order-service]\n\nThe pricing module handles single-unit orders. Business wants bulk discount tiers. This touches pricing, order validation, and tests — a scary refactor. Plan mode: see the blast radius before anything moves.\n\n[Terminal, still in order-service. Shift+Tab x2 → PLAN indicator.]\n[Paste: refactor pricing to support bulk discounts]\n[While it runs:] So this is the plan-first play. I want to see the shape of the work before anything moves — because in code like this, there's always a coupling you didn't see.\n[When plan appears:] There's the plan. It read pricing.js and orders.js. Multi-step proposal. And look — zero edits. I could say 'actually, do step three first' and it would replan and we'd still be at zero edits.\n[Switch back — do NOT approve, just back to slides.]" },

  { c: 'Slide_SpecTDD', section: '201', kind: 'content', mins: 1.5,
    notes: "What you just watched — that's a version of spec-driven work. You defined success upfront. Claude hit the target.\n\nTwo flavors of that.\n\nSpec-driven: you write the spec. Contracts, edge cases, acceptance criteria — in a markdown file. Claude reads it, pokes holes in it, then implements from it. The spec is the source of truth. When code drifts from the spec, that shows up in review. Reach for this when the feature's big, multiple files, and someone other than you needs to sign off on what 'done' means.\n\nTest-driven: same idea, smaller grain. You write the failing test. Claude makes it green. You both refactor. The test IS the spec — executable, unambiguous. No debate about what 'works' means. Reach for this when it's one function and the behavior is easier to assert than describe.\n\nNot either-or. Spec the feature, TDD the functions. Plan mode — what you just saw — is how you do either inside Claude." },

  { c: 'Slide_SpecWorkflow', section: '201', kind: 'content', mins: 1.5,
    notes: "Here's the spec workflow as a pipeline. Four steps.\n\nWrite the spec — what success looks like, edge cases, acceptance criteria. Let Claude plan against it — it'll find gaps. Build from the plan. Verify against the spec.\n\nThree wins from this. One: the spec is reviewable by people who don't read code. Two: the plan catches problems before any edits. Three: drift shows up — when the implementation wanders from the spec, you see it. The spec is the contract." },

  { c: 'Slide_TDD', section: '201', kind: 'content', mins: 1.5,
    notes: "[Dark slide. Terminal mockup — let the red FAIL land before the green PASS appears.]\n\nThis is the TDD loop. Red — failing test. Green — Claude makes it pass. Refactor — clean it up, tests still green.\n\nNotice: you wrote the test. Claude wrote the implementation. The test is the spec — executable, no ambiguity. Claude can't argue with a failing assertion. Either it passes or it doesn't.\n\nThe loop is tight. Write the next test. Watch it fail. Watch it pass. Move on." },

  { c: 'Slide_TDDWhy', section: '201', kind: 'content', mins: 1,
    notes: "Why this works specifically with Claude.\n\nFeedback signal: tests are the loop's observe step. Pass/fail is unambiguous — Claude knows if it's done. No ambiguity: a failing assertion is clearer than 'make it work right.' Regression net: every test you write is one Claude won't break later. Refactor safety: green suite means you can ask for cleanup without fear.\n\n[Tip callout at bottom:] Drop 'Use TDD' in your CLAUDE.md and Claude will write the test first without being asked. One line, big shift." },

  { c: 'Slide_Skills', section: '201', kind: 'content', mins: 1.5,
    notes: "Skills. A skill is a slash command you define. Markdown file, becomes a repeatable workflow.\n\nThe pattern is: you've typed the same multi-step thing three times. 'Run the tests, then do X, then re-test, then show me the diff.' Third time, stop typing. Put it in a skill file. Now it's /yourskill and it runs the whole sequence.\n\nIt's markdown. Frontmatter decides when it fires. Body is the steps. Guardrails if you want them — 'don't touch anything if tests are already red.' No DSL. Just markdown." },

  { c: 'Slide_BundledFiles', section: '201', kind: 'content', mins: 1.5,
    notes: "Here's what a skill actually looks like on disk. SKILL.md has YAML frontmatter — name, description — then the markdown body with your instructions.\n\nYou can bundle additional files alongside it. Reference docs. Templates. A separate slide-deck.md if your skill builds presentations. Whatever the skill needs to do its job lives in the same directory.\n\nKey insight: be very explicit in the description. The frontmatter description is what Claude sees when deciding whether the skill applies. Vague description, skill never fires. Specific description, fires exactly when it should." },

  { c: 'Slide_MCPArch', section: '201', kind: 'content', mins: 1.5,
    notes: "How MCP works under the hood. Claude Code is the host and the client — discovers servers, negotiates capabilities, invokes tools.\n\nEach server exposes three kinds of capability. Tools: functions Claude can call. Resources: data Claude can read. Prompts: templates Claude can load. Standard transport — stdio, SSE, or HTTP — so any server speaks the same protocol regardless of what's behind it.\n\nWhy this matters: you don't write integration code. You point at an MCP server and Claude knows how to use it. Jira, Sentry, your internal API — same wire format." },

  { c: 'Slide_SlashCmds', section: '201', kind: 'content', mins: 1.5,
    notes: "Built-in slash commands worth knowing.\n\n/add-dir pulls a sibling directory into scope without relaunching. /resume picks up a previous session. /context shows what's loaded — good for big repos where you want to see what Claude actually knows. /compact trims it down. /model switches models mid-session. /batch fans out across targets — one agent per file, each in a worktree.\n\n/context and /compact are the pair. See what's loaded, then trim. In a big repo you'll use that a lot." },

  { c: 'Slide_InputShortcuts', section: '201', kind: 'content', mins: 1,
    notes: "Three things that go in the prompt box — not slash commands, just characters.\n\nBang runs a shell command. !npm test, output lands right in the conversation. No switching to a second terminal, no copy-paste. You've seen me do this in the demos.\n\nAt-sign pulls a file in. @lib/pricing.js — Claude reads it right there. Faster than saying 'go find the file' and waiting for a search.\n\nAnd you can paste screenshots. Command-V, or drag it in. Error dialogs, mockups, a diagram on a whiteboard — if you can screenshot it, Claude sees it.\n\nSimple stuff. Muscle memory after a week." },

  { c: 'Slide_Demo3', section: '201', kind: 'demo', mins: 3,
    notes: "[DEMO 3 — order-service]\n\nThe reconcile skill codifies the end-of-cycle order review. Run it against an order ID — it reads the invoice data, validates the total against the reference amount, applies any correction within the 5% policy cap, re-tests, and shows you the diff. No tribal knowledge required.\n\n[Terminal. Skill was pre-staged by reset: .claude/skills/reconcile/SKILL.md]\n[Type: /reconcile ORD-0042]\n[While it runs:] Tests first. Green — that's the guardrail. Now it's reading data/ORD-0042-invoices.json. Computes expected vs invoiced total. Applies correction in lib/reconciliation.js. Re-tests. Green again. Diff shown.\n[When done — cat .claude/skills/reconcile/SKILL.md:] And here's the skill file. Twenty lines of markdown. Run tests, read the data, apply correction, re-test, show diff, and a guardrail. That's it. Someone encoded the reconciliation SOP once — now anyone on the team runs it.\n[Switch back.]" },

  { c: 'Slide_Ex2', section: '201', kind: 'exercise', mins: 8,
    notes: "[EXERCISE 2]\n\nCLAUDE.md and skills are how you make Claude useful for your specific codebase — not just on a workshop repo. This exercise builds that muscle before you go back to your own stack.\n\nDone when: /<yourskill> runs and shows you a diff\n\n[Hands-on. 12 minutes.]\n\nTwo parts. First: open CLAUDE.md and fill in the three TODO comments — domain terms, test command, what not to touch. Second: create .claude/skills/<name>/SKILL.md (directory, not a flat file) and write a skill that does something useful for order-service.\n\nDone when /<yourskill> runs and shows you a diff. The skill body is just markdown — describe the steps in plain English." },

  { c: 'Slide_Hooks', section: '201', kind: 'content', mins: 1.5,
    notes: "Hooks — three questions: what are they, how do you set them up, and what can they do.\n\nWhat they are: event listeners baked into Claude Code. Instead of trusting Claude to always make the right call, you attach a script or an HTTP endpoint to a specific event. Claude fires the event, your code runs.\n\nHow they're implemented: five lines in `.claude/settings.json`. Pick an event — `preToolUse`, `postToolUse`, `PostCompact` — set a matcher for which tool or path, then point to a command or HTTP URL.\n\nWhat they do: pre-hooks run before the tool call and can stop it. Exit non-zero, the tool is blocked. Exit zero, it proceeds. Post-hooks run after, for logging, alerting, or syncing to external systems. HTTP hooks post JSON and read a response — that's the enterprise pattern when you can't run shell scripts on the runner." },

  { c: 'Slide_HooksCatalog', section: '201', kind: 'content', mins: 1.5,
    notes: "The previous slide was the mechanism. This slide is the breadth — here's what else hooks can attach to.\n\n`InstructionsLoaded` fires when CLAUDE.md loads at session start. That's your window to inject dynamic context: current sprint, today's deployment freeze, on-call engineer. CLAUDE.md stays static; the hook keeps it live.\n\n`PostCompact` fires after the conversation compresses. Re-inject critical state before it disappears from context.\n\n`StopFailure` fires when a turn ends on an API error — page someone, retry, alert.\n\n`CwdChanged` and `FileChanged` are reactive: change directories, reload the right env. Modify a config, auto-regenerate what depends on it.\n\nThe `if` filter scopes which events fire — same syntax as permission rules. No shell boilerplate. You're not writing a cron job, you're wiring an event." },

  { c: 'Slide_HooksSimDemo', section: '201', kind: 'content', mins: 2,
    notes: "[Walk the terminal top to bottom — this is the simulated hook flow. Preview of what you'll see live in a moment.]\n\nThe user asks Claude to set the invoice total for ORD-0042 directly in data/ORD-0042-invoices.json. Claude tries Edit — the preToolUse hook fires, exits non-zero, the Edit is blocked. Red ✗.\n\nThe hook's stderr is fed back to Claude as the block reason: 'edits to data/** are blocked, use orderctl instead.' Claude reads that, says 'the prod invoice is guarded — using orderctl instead', and runs the safe CLI. Green ✓. No human nudge.\n\nThat's the pattern: hooks aren't just a wall, they're a redirect. The block reason teaches Claude the right path. The next slide is the same thing live — same reroute, same five-line config." },


  { c: 'Slide_AutoMemory', section: '201', kind: 'content', mins: 1.5,
    notes: "Auto-memory. Claude captures context as you work — corrections you make, preferences you express, project facts it learns. Recalled next session without being asked.\n\nThis is NOT CLAUDE.md. CLAUDE.md is instructions YOU write and commit — shared with the team. Auto-memory is what CLAUDE writes — machine-local, never committed, in .claude/memory/. Two different stores.\n\n/memory opens the panel: review entries, edit them, clear them. Nothing leaves your machine. People notice Claude 'remembering' across sessions and ask what's being saved — this is the answer." },

  { c: 'Slide_AtFile', section: '201', kind: 'content', mins: 1,
    notes: "The @ symbol gets a specific file into Claude's view. Type @, start typing a filename — autocomplete. When you send, the file's full contents are injected automatically.\n\nFaster and more reliable than asking Claude to go read it. You're saying 'this exact file, I'm certain' instead of 'go find the thing I'm describing.' No room for Claude to guess wrong." },

  { c: 'Slide_ContextCompact', section: '201', kind: 'content', mins: 1,
    notes: "Two slash commands that pair: /context and /compact.\n\n/context shows what's actually in working memory right now — which files, which MCP tools, how full it is. /compact summarizes and compresses when it's getting large.\n\nIn a big codebase you use this pair a lot. Check what's loaded, see it's getting full, compact it down. Use proactively — don't wait until things get slow." },

  { c: 'Slide_Resume', section: '201', kind: 'content', mins: 0.5,
    notes: "/resume picks up a previous session right where it left off. Looks through recent sessions in the current directory, offers a list, you pick one. Same context, same conversation, same place in the work.\n\nSimple feature. Means context investment doesn't evaporate when you close the terminal." },

  { c: 'Slide_Checkpointing', section: '201', kind: 'content', mins: 1.5,
    notes: "Checkpointing. Claude snapshots state automatically — you can rewind.\n\n/rewind gives you three modes. Conversation only: roll back what was said, keep the files. Code only: undo the file changes, keep the conversation. Both: full rewind to the checkpoint.\n\nThis is local undo, not git history. Checkpoints aren't commits — they don't survive the session. Think of it as a safety net for 'that last edit was a mistake' without reaching for git stash. The footer says it: checkpoints are local undo, git is permanent history. Different tools." },

  { c: 'Slide_EffortLevels', section: '201', kind: 'content', mins: 1.5,
    notes: "The ○ ◐ ● indicator on the prompt bar. That's reasoning depth — how hard Claude thinks before answering.\n\nLow for boilerplate and rote refactors. Medium for daily driving on Sonnet 4.6. High is Claude Code's default — architecture, tricky bugs, anything cross-cutting. On Opus 4.7, xHigh is the recommended starting point for coding and agentic work. It thinks longer, costs more, gets it right more often.\n\nEscape hatches: type 'ultrathink' for one-turn high effort without changing the setting. /effort to switch mid-session. Pin it per-skill via effort: in frontmatter. Budget teams care about this — it's a cost lever." },

  { c: 'Slide_EffortTable', section: '201', kind: 'content', mins: 1,
    notes: "Reference table for effort levels.\n\nLow: quick syntactic stuff, formatting, things you could almost regex. Medium: default for Sonnet 4.6 daily work. High: Claude Code's default — architecture, gnarly debugging, anything where being wrong is expensive. xHigh: new on Opus 4.7. Anthropic's recommended starting point for coding and agentic work — and for exploratory tasks like repeated tool calling and detailed search. Expect meaningfully higher token usage than High. Max: research-grade problems where xHigh has been baselined and isn't enough. Available on Opus 4.7, Opus 4.6, and Sonnet 4.6 (not Haiku). Reserve it — on most workloads max adds cost for marginal quality gains, and on structured-output tasks it can overthink.\n\nSet this in Claude Code with `/effort low|medium|high|xhigh|max` (lowercase). On Opus 4.7 at High, xHigh, or Max, Claude thinks adaptively by default — you don't need to flip a switch. The lever is the effort level itself.\n\nThe sidebar: effort replaces budget_tokens for Opus 4.7 and Sonnet 4.6. If you've got old prompts setting budget_tokens, that's the migration. Effort is the knob now." },

  { c: 'Slide_AdaptiveThink', section: '201', kind: 'content', mins: 1,
    notes: "By default Claude decides for itself how hard to think. Simple rename: answers fast. Tricky architecture question: takes longer, reasons more. You don't manage this — it just happens.\n\nBut you CAN override it. Type 'ultrathink' and that one response gets max depth. Useful for the one question in a session where you really need it to be careful." },

  { c: 'Slide_DemoLoop', section: '201', kind: 'content', mins: 1.5,
    notes: "[Optional micro-demo — pair with a real CI job if wifi allows; otherwise a sleep-then-touch script.]\n\n/loop runs a prompt on an interval. Type `/loop 30s check if the deploy is green yet` — keep presenting, the loop ticks in the background. Two ticks later: notification lands mid-sentence. Hands-free babysitting for CI, deploys, anything you'd otherwise alt-tab to check." },

  { c: 'Slide_PromptingTips', section: '201', kind: 'content', mins: 1.5,
    notes: "[Appendix slide — skip if running long, point to it for self-study.]\n\nPrompting tips. Be specific: 'fix the bug' is worse than 'the date formatter returns null for ISO strings without timezones.' Give context: paste the error, @-mention the file, drag in the screenshot. Iterate: first answer is a draft, push back on it.\n\nNone of this is magic. It's the same way you'd brief a sharp contractor — except this contractor reads at 10,000 words per second and doesn't need lunch." },

  { c: 'Slide_AskDocs', section: '201', kind: 'content', mins: 1,
    notes: "If you only remember one thing — when stuck, ask Claude about Claude.\n\nThe docs site at code.claude.com/docs has an Ask Claude feature built in. Type a question about Claude Code itself — 'how do I set up an MCP server,' 'what's the syntax for a hook' — get an answer grounded in the actual docs.\n\nNobody memorizes all of this. The team that uses Claude Code well knows where to look it up." },

  { c: 'Slide_WebCliDesktop', section: '201', kind: 'content', mins: 1,
    notes: "Three surfaces side by side. Web: no install, browser, good for non-terminal people. CLI: power-user surface, full access. Desktop: CLI in a native wrapper, dedicated window.\n\nSame agent. Same context files. Same skills. The choice is preference, not capability." },

  { c: 'Slide_KeepClaudeMd', section: '201', kind: 'content', mins: 1,
    notes: "Callback to context management. Keep CLAUDE.md updated.\n\nThe failure mode: someone writes a great CLAUDE.md on day one and never touches it. Six months later it's describing a codebase that doesn't exist anymore. Build command changed. Deploy process changed. Claude is reading stale instructions.\n\nFix: treat CLAUDE.md like any other file in the repo. When something changes, change the file. Some teams put it in their PR template — 'did this change anything CLAUDE.md should know about?'\n\nContext that's wrong is worse than no context at all." },

  // ── 301 — SCALE & INTEGRATE ────────────────────────────────────────

  { c: 'Slide_Section301', section: '301', kind: 'section', mins: 0.5,
    notes: "That's teaching one agent. This section — many agents, and where Claude Code runs that isn't your terminal." },

  { c: 'Slide_MCP', section: '301', kind: 'content', mins: 1,
    notes: "MCP is how Claude calls your systems. Stdio or HTTP servers. You give it a tool, it calls the tool. Ticket system, deployment pipeline, your observability stack — anything you'd type into a terminal, you can expose as an MCP tool and Claude calls it directly.\n\nAuth: servers run with YOUR credentials, not Claude's. Same audit surface you already have.\n\nFor this Accenture environment specifically: stdio works fine on a personal laptop, but corporate allowlists prefer localhost HTTP — Claude talks to http://localhost:<port>/mcp instead of spawning a process. Same protocol, same tools, different transport. That's the pattern you'll see in the next demo." },

  { c: 'Slide_Demo6', section: '301', kind: 'demo', mins: 3,
    notes: "[DEMO 6 — order-service]\n\nTwo terminals. Terminal 1 starts the order-store MCP server on localhost:3001/mcp — `npm run mcp:http`, leave it running. Terminal 2 wires it into Claude — `claude mcp add --transport http order-store http://localhost:3001/mcp`. Restart claude when prompted.\n\n[Confirm in claude:] /mcp shows order-store green and connected.\n\n[Ask:] 'Show me all our active orders. Which one is the highest monthly rate?'\n\n[Watch:] That's not a grep. Not a file read. That's an `mcp__order-store__list_orders` tool call — Claude called your API directly. Structured response — five active orders. Claude inspects monthlyRate, names Stark Solutions at $9,000/mo as the highest.\n\n[cat .mcp.json:] One block of config. HTTP transport, localhost only — same audit boundary you already have.\n\nWhy HTTP and not stdio? On a locked-down corporate laptop the stdio path can't always spawn a child process. Localhost HTTP slides through. Same MCP, different wire.\n\n[Switch back.]" },

  { c: 'Slide_ParallelPatterns', section: '301', kind: 'content', mins: 1.5,
    notes: "Why parallelize: independent work doesn't need to queue. Sequential — sum of all tasks. Parallel — longest task.\n\nThree patterns. Task decomposition: greenfield features, split by concern. Horizontal scaling: same transform across N services. Pipeline parallelism: code → review → test in overlapping stages.\n\nThis is the WHY. The next slides are the HOW.\n\nFooter introduces the three coordination modes you'll meet next: subagents (hub-and-spoke), parallel worktrees (no coordination), agent teams (lateral)." },

  { c: 'Slide_Subagents', section: '301', kind: 'content', mins: 1.5,
    notes: "Subagents. Agents the main agent spawns.\n\nWhy? Context protection. Your main session has a context window. If you ask 'go read the entire module and tell me what's in it,' every file it reads lands in your context. Expensive.\n\nInstead it spawns an Explore subagent. That subagent reads forty files, burns through its own context, hands back two paragraphs. Your main session gets the summary. The reading happened off to the side.\n\nAnd you can isolate them — `isolation: worktree` gives each agent its own git working directory. They physically can't stomp on each other's edits.\n\nStatus bar callout: the `/agents` tab is where you wire your own — explore + plan ship built-in, custom agents fill the gap between." },

  { c: 'Slide_CustomAgents', section: '301', kind: 'content', mins: 1.5,
    notes: "Explore and Plan ship with Claude Code. When a team needs a repeatable agent — a reviewer, a migrator, a test-writer — drop a markdown file in .claude/agents/ and launch it by name.\n\nYou pick the model per agent — opus for the reviewer, haiku for the formatter. Scope MCP per agent — least-privilege, enforced by config. maxTurns caps how long it runs. disallowedTools means a reviewer that physically can't write. Most users never get here. This is the deep end.\n\nNew: `@reviewer` summon-by-handle in the prompt — once the agent is defined, you mention it like a teammate." },

  { c: 'Slide_Demo5', section: '301', kind: 'demo', mins: 3,
    notes: "[DEMO 5 — order-service]\n\nMap the data model, API surface, and test coverage simultaneously. Three Explore subagents fan out — each burns through its own context window reading its slice of the repo, then hands back a summary. Your main context window is barely touched.\n\n[Terminal, order-service.]\n[Paste: Map this repo: data model, API surface, test coverage. Use Explore subagents.]\n[Watch:] Three Explore agents fan out simultaneously. Each reads its slice of order-service in its own context window. Results merge back to the main session — three summaries, no context blowout.\n[When done:] My main context window is barely touched. The reading happened off to the side. This is the pattern for any 'go understand a thing' task in a big repo.\n[Switch back.]" },

  { c: 'Slide_MCP', section: '301', kind: 'content', mins: 1,
    notes: "MCP is how Claude calls your systems. Stdio or HTTP servers. You give it a tool, it calls the tool. Ticket system, deployment pipeline, your observability stack — anything you'd type into a terminal, you can expose as an MCP tool and Claude calls it directly.\n\nAuth: servers run with YOUR credentials, not Claude's. Same audit surface you already have." },

  { c: 'Slide_CCWeb', section: '301', kind: 'content', mins: 1.5,
    notes: "[c4e-exclusive.]\n\nClaude Code Web. Same agent — read, edit, run — against your repos, no terminal required. PMs prototype without an eng handoff. Designers tweak CSS in the real code. QA writes test cases against source.\n\nSSO, audit logs, role-based access. Same CLAUDE.md and skills apply — they're in the repo, not on someone's laptop. Admin manages repo access centrally." },

  { c: 'Slide_ScheduledTasks', section: '301', kind: 'content', mins: 1.5,
    notes: "[c4e-exclusive.]\n\nScheduled Tasks. Cron for Claude agents — configure in Claude Code Web, runs on enterprise infrastructure. Opens PRs you review in the morning.\n\nNightly dep bumps — PR only if tests green. Weekly dead-code sweeps. CVE drops → patch PR before the team wakes. Daily secret scan across recent commits. Work that runs while you sleep.\n\nRenamed Routines in 4.7 — same idea, cleaner pronoun. New pill row shows the three buckets: code health, security, team glue." },

  { c: 'Slide_CCMobile', section: '301', kind: 'content', mins: 1,
    notes: "[c4e-exclusive.]\n\nOne more surface — phone. Same Claude, on mobile.\n\nThe use case isn't writing code on your phone — it's the approval loop. You kicked off a plan before you left the office. Claude's been working. On the train home, you open the app, the PR is ready. You read the diff, you approve it, it merges. Or you say 'actually revert that second change' and it does, and you check again at the next stop.\n\nThe work happens on a machine somewhere. The phone is just where you say yes.\n\nRepositioned in 4.7 — phone is now full authoring via Remote Control, not just review-and-approve. Push new prompts mid-commute, watch them execute on your laptop." },

  { c: 'Slide_ManagedMCP', section: '301', kind: 'content', mins: 1.5,
    notes: "[c4e-exclusive.]\n\nManaged MCP. The enterprise version of what I just said.\n\nNormally every developer sets up MCP servers on their own machine. Clone the server, configure it, wire it into their settings. N developers, N setups.\n\nWith c4e, your admin pre-approves connectors org-wide. GitHub, Jira, your CI pipeline, your observability stack. Developers don't set up anything — the connectors are just there. First day, first session, the tools exist.\n\nAnd allowlist enforcement: lock installs to approved servers only. No rogue MCP endpoints.\n\nNew card: connectors carry over from web → CLI → mobile, no per-surface re-auth. Set up once, works everywhere." },

  { c: 'Slide_APIAuth', section: '301', kind: 'content', mins: 1.5,
    notes: "[Platform-specific — content switches based on platform setting.]\n\nThe knobs your platform team will ask about. Auth flow. Rate limits and how to request increases. Cost controls and budget alerts. Region availability.\n\nThe slide content auto-switches based on the deck's platform setting. Read what's on screen — it's already correct for this audience.\n\nNew Setup-wizard label flags the `/setup` interactive path — the one-shot guided config flow. Service-account flow stays manual." },

  { c: 'Slide_Plugins', section: '301', kind: 'content', mins: 1.5,
    notes: "Plugins. Skills, MCP config, and hooks — bundled in one folder with a manifest. `claude plugin install` and the whole team inherits the workflow.\n\nThree fields in plugin.json: name, description, author. Skills, MCP configs, and hooks are auto-discovered from the folder structure. The plugin you build for order-service is the plugin the next person on your team installs on day one.\n\nNew: `userConfig.sensitive` keeps secrets per-user (out of git); `monitor` field declares what hooks watch — auditable surface for security review." },

  { c: 'Slide_MustHavePlugins', section: '301', kind: 'content', mins: 1,
    notes: "We published the most popular combinations of MCPs, skills, subagents, and hooks used by the Claude Code team. /plugin → claude-plugins-official.\n\ncommit-commands for git workflows. claude-md-management for auto-maintaining CLAUDE.md. pr-review-toolkit for review subagents. hookify for guardrail patterns. Starting points, not the ceiling." },

  { c: 'Slide_Ex4', section: '301', kind: 'exercise', mins: 8,
    notes: "[EXERCISE 3]\n\nA skill that only lives on your machine helps only you. A plugin is how you give your whole team the same workflow — one install, same capabilities.\n\nDone when: claude plugin validate shows a green check\n\n[Hands-on. 8 minutes.]\n\nmkdir the plugin scaffold. Copy your skill from exercise 2 into the skills/ folder. Write plugin.json — three fields. Then `claude plugin validate order-toolkit`.\n\nDone when validate shows a green check. This is the thing you'd push to a shared repo for the rest of your team to install." },

  { c: 'Slide_AgentTeams', section: '301', kind: 'content', mins: 1.5,
    notes: "Agent teams. Named agents that talk to each other — not through you, through the shared filesystem.\n\nSubagents are hub-and-spoke: you're the hub. Agent teams are lateral: writer talks to tester, tester talks to documenter, nobody loops through the parent.\n\nThree agents, one outcome, no human routing between them. You define who does what, they coordinate. The filesystem IS the message bus — pane two reads what pane one just wrote.\n\nTip card: `/color` and `/rename` per pane — biggest pain on big migrations was 'which pane was the test writer?', now you can tell at a glance." },

  { c: 'Slide_ParallelCompare', section: '301', kind: 'content', mins: 1.5,
    notes: "When to reach for which. Subagents: you're the hub, they report back. Good for exploration, reading, research — anything where you want a summary, not a commit.\n\nParallel Claude: same transform, many targets. Migrate ten files, each in a worktree. Wide, not deep. New: claude -w <branch> + EnterWorktree make worktree mode a one-liner.\n\nAgent teams: lateral coordination. When the workflow has handoffs, not just fan-out.\n\nThe split is: how much do the workers need to talk to each other?\n\nNew: `claude -w <branch>` and the `EnterWorktree` tool make worktree mode a one-liner — no manual `git worktree add` ceremony." },

  { c: 'Slide_UltraReview', section: '301', kind: 'content', mins: 1.5,
    notes: "/ultrareview launches a multi-agent cloud review of the current branch. /ultrareview <PR#> reviews a GitHub PR. User-triggered and billed.\n\nFrame as security-review-at-scale. CI checks the things you wrote rules for — Ultra Review checks the things you didn't think to write rules for. Needs a git repo; the no-arg form bundles local without needing a remote." },

  { c: 'Slide_DeepLinks', section: '301', kind: 'content', mins: 1.5,
    notes: "Deep-linked URLs that launch a fresh Claude session pre-loaded with files, context, and a pinned prompt. The Slack / Jira / IDE → Claude bridge.\n\nAuditor clicks a link in a triage thread, lands on a session with the offending diff already loaded and 'explain this regression' pre-filled. No copy-paste, no setup." },

  { c: 'Slide_GitHubApp', section: '301', kind: 'content', mins: 1.5,
    notes: "Install the GitHub App. @claude in PR or issue comments triggers async review. Label-based triage; autofix on green CI for pre-approved chores.\n\nThis replaces the 'do I need a CI workflow for this' question — the bot IS the CI step. Pairs with HeadlessCI: same agent, different surface." },

  { c: 'Slide_AgentSDK', section: '301', kind: 'content', mins: 1.5,
    notes: "When the CLI isn't the right shape, embed the agent loop in your own product. SDK exposes tool use, planning, subagents, hooks — the same primitives Claude Code is built on.\n\nUse cases: customer-facing support agents, internal ops agents, eng-internal agents living in a portal. Pairs with HeadlessCI for the CI flavor." },

  { c: 'Slide_Demo7', section: '301', kind: 'demo', mins: 3,
    notes: "[DEMO 7 — order-service]\n\nThree agents, one order reconciliation audit. The auditor scans data/ and finds which orders have drift above 2% from their reference total. The fixer receives the list via SendMessage and corrects the over-threshold ones. The verifier receives the change list and runs npm test. You never route between them — they hand off laterally.\n\n[Terminal, order-service. tmux split into 3 panes or use agent spawning.]\n[Paste the team prompt — see demo-scripts.html for full text]\n[Watch:] Auditor scans data/ — finds ORD-0042 (1.5% drift) and ORD-0118 (3.7% drift — over threshold). Sends findings to fixer via SendMessage. Fixer applies correction to ORD-0118, reports to verifier. Verifier runs npm test — green.\n[When done:] Three Claudes, one audit, zero manual routing. You defined who does what — they coordinated.\n[Switch back.]" },

  { c: 'Slide_RemoteControl', section: '301', kind: 'content', mins: 1.5,
    notes: "`claude remote-control`. Serve your local environment to claude.ai/code. Web UI in the browser, files and tools stay on your machine.\n\nThis is the bridge between 'I want the web UI' and 'my repo can't leave this laptop.' Internal code never uploads — the daemon serves files on demand, nothing persists in the cloud. Trust boundary is on the slide.\n\nAlso the answer for locked-down laptops where devs can't install terminal tooling. Background daemon, work entirely in-browser.\n\nNew card: Push notifications — approvals forward to your phone, no laptop polling. The daemon nudges you when Claude needs a yes." },

  { c: 'Slide_EnterpriseControls', section: '301', kind: 'content', mins: 1.5,
    notes: "The knobs your platform and security teams will ask about. Policy deployment: managed-settings.json for org-wide baseline, .d/ drop-in fragments to compose policies from multiple sources, plist/Registry for MDM-native distribution.\n\nRuntime hardening: sandbox.failIfUnavailable to fail closed. allowRead carve-outs inside denyRead. SUBPROCESS_ENV_SCRUB to strip credentials before spawning. These come up in the security review — get ahead of them.\n\nMajor restructure in 4.7 — five groups now (deployment / sandbox / networking / audit / identity), ~14 controls across the rows. Walk top-to-bottom; point at the rows that match the room." },

  { c: 'Slide_HeadlessCI', section: '301', kind: 'content', mins: 1.5,
    notes: "Claude Code in CI. Scripted, headless, deterministic.\n\n--bare disables hooks, LSP, plugin sync — the flag for CI. --console auths via API key, no claude.ai login. -p is print mode: one prompt in, result on stdout, exit. -n labels the session so you can find CI runs in history later.\n\nThe slide shows a GitHub Actions workflow. Same pattern works in any CI." },

  // ── WRAP ─────────────────────────────────────────────────────────

  { c: 'Slide_RecapEx1', section: 'wrap', kind: 'content', mins: 1.5,
    notes: "[4 clicks — one annotation per click. Answer-key replay.]\n\nFor anyone who didn't quite get there: this is what exercise one looked like. Test failure → grep finds the bug in lib/tiers.js → one-character fix (> becomes >=) → green.\n\nNot magic. It grepped, read, reasoned, edited. You watched every step. The closer line on the slide is the takeaway: this is grep + read + edit, made conversational." },

  { c: 'Slide_RecapEx2', section: 'wrap', kind: 'content', mins: 1.5,
    notes: "[4 clicks. Answer-key replay.]\n\nExercise two recap. CLAUDE.md filled — domain terms and test command. SKILL.md written — about twenty lines. Slash command fires — your slash command, not built-in. And it reuses existing lib code — the skill wraps what's already there.\n\nTribal knowledge → slash command. Twenty lines." },

  { c: 'Slide_RecapEx4', section: 'wrap', kind: 'content', mins: 1.5,
    notes: "[3 clicks. Answer-key replay.]\n\nExercise three. plugin.json — three fields, skills + hooks bundled. Validate green — schema check, ship-ready. Install — team gets your whole toolkit at once.\n\nSkill plus settings, one install. This is the thing you push to a shared repo for the rest of your team." },

  { c: 'Slide_Recap', section: 'wrap', kind: 'content', mins: 1.5,
    notes: "[Auto-filters — only shows checklist items for slides that were actually in this deck.]\n\nDon't read the list. Pick the two or three that landed hardest in the room — usually CLAUDE.md, Plan Mode, and whichever demo got the most lean-in. 'If you remember nothing else: write a CLAUDE.md, use Shift+Tab before scary changes, and try a skill.' That's enough for Monday." },

  { c: 'Slide_QA', section: 'wrap', kind: 'content', mins: 1.5,
    notes: "Open floor. The four prompts at the bottom are the questions everyone asks — pricing, security posture, language support, deployment model. If nobody asks anything in the first 5 seconds, prime it: 'The thing people usually want to know about c4e specifically is...' and answer your own question." },

  { c: 'Slide_Thanks', section: 'wrap', kind: 'content', mins: 0.5,
    notes: "Leave this up. Don't rush off it." },

];
