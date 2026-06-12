---
id: Slide_ClaudeMd
tokens: ["{{vehicle}}"]
---
## Spoken

The first thing you teach it with is CLAUDE.md — a markdown file at the root of the repo that Claude reads automatically every session.

Think of it as the briefing you'd give a very smart contractor: how to run the tests, what the build command is, what they should never touch. For {{vehicle}} that means the known tech debt, which feed adapters are fragile, and where the dragons live — the rotation modulus bug from the cold open is exactly the kind of thing that lands in CLAUDE.md after you find it.

Keep it short, under 200 lines. You're not writing documentation, you're writing a briefing — the stuff a new engineer would spend a week asking around about goes here, and the stuff they can grep for stays out. Token-wise this loads every session, so it's cheap context that earns its keep many times over.

## Professor

Here's the key insight about CLAUDE.md: it is the mechanism by which you transfer institutional knowledge into Claude's working context — automatically, at zero marginal cost, every single session.

Let me set this up before landing it. When a contractor joins a team, there are two categories of knowledge they need. The first category they can find themselves: architecture docs, API references, anything grep or a file search surfaces. The second category is tacit knowledge — the rotation modulus bug that bit the team six months ago, the feed adapter that breaks if you touch the timeout, the test suite that lies about what it covers. That second category typically costs a week of asking around. CLAUDE.md is where that second category lives.

Notice what it does structurally: you place a markdown file at the root of your repo, and Claude reads it automatically at the start of every session. No configuration, no explicit prompt, no pointing at it. It just loads. For {{vehicle}}, that means Claude arrives already knowing which feed adapters are fragile, where the known tech debt sits, and exactly the kind of dragons — the rotation modulus bug from the cold open — that an engineer would only discover the hard way.

The reason the length constraint matters is this: CLAUDE.md loads on every session. That means every token in it is paid again and again across every interaction. Under 200 lines keeps it cheap enough that the return — correct behavior from session one — easily justifies the cost. You are not writing documentation. You are writing a briefing. The distinction is important: documentation tries to be complete; a briefing tries to be load-bearing. The stuff a new engineer would spend a week asking around about goes here. The stuff they could grep for stays out.
