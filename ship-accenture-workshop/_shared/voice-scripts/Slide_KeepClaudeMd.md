---
id: Slide_KeepClaudeMd
tokens: []
---
## Spoken

Callback to context management — keep CLAUDE.md updated.

The failure mode is familiar: someone writes a great CLAUDE.md on day one and never touches it, and six months later it's describing a codebase that doesn't exist anymore. The build command changed, the deploy process changed, and Claude is reading stale instructions while burning tokens on misleading context.

The fix is to treat CLAUDE.md like any other file in the repo — when something changes, change the file. Some teams put it in their PR template: 'did this change anything CLAUDE.md should know about?'

Context that's wrong is worse than no context at all.

## Professor

Here's the key insight about CLAUDE.md: its value is not in writing it once — it's in keeping it accurate over time.

Let me set up the failure mode before I give you the fix. Every team that adopts CLAUDE.md starts with good intentions. Day one, someone writes thorough instructions: the build command, the deploy process, the key conventions. That file is accurate on day one. The problem is what happens next. The codebase evolves. The build command changes. The deploy pipeline changes. But CLAUDE.md doesn't get updated, because updating it wasn't part of anyone's workflow. Six months later, Claude is reading that file on every session, treating it as ground truth — and every token spent on stale instructions is worse than useless. Wrong context doesn't just fail to help; it actively misleads.

Notice the implication: a CLAUDE.md that describes a codebase that no longer exists isn't a neutral artifact. It's a liability. Claude will confidently act on outdated information.

The fix is a process change, not a technical one. Treat CLAUDE.md like any other tracked file in the repo — when something in the codebase changes, the file changes with it. The reason this works is that it removes the dependency on memory. You don't need someone to remember to update CLAUDE.md; the PR template asks the question directly: 'Did this change anything CLAUDE.md should know about?' That's a forcing function.

What this tells us is that context quality degrades unless you maintain it. The principle generalizes: any persistent instruction file — CLAUDE.md, a skill definition, a project brief — becomes a source of noise the moment it falls out of sync with reality.

[Natural break point — 5 min before §301 if running on time.]
