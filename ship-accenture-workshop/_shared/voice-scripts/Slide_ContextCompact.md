---
id: Slide_ContextCompact
tokens: ["{{vehicle}}"]
---
## Spoken

This is the slide your room came for: /context and /compact, the pair that makes long sessions sustainable.

/context shows what's actually in working memory right now — which files, which MCP tools, how full it is — while /compact summarizes and compresses once things start to balloon. In a codebase the size of {{vehicle}} plus all your data feeds, you'll reach for this pair constantly: check what's loaded, see it filling up, compact it down before it bites you.

Use it proactively rather than waiting for things to feel slow, because the rule of thumb is to compact before context hits 60% full — compacting late means the model has already started behaving worse.

## Professor

Here's the key insight behind /context and /compact — and this is one of the most operationally important pairs in the entire tool.

Let's set up the concept first. Claude Code operates with a working memory — a context window — that holds everything it currently knows about your session: which files it has read, which MCP tools are loaded, the conversation so far, any injected CLAUDE.md content. That window has a hard limit. And here's what most people don't realize: the model doesn't degrade all at once when it fills up. It degrades gradually and quietly. You won't get an error. You'll just start getting slightly worse answers, slightly less coherent plans — and you may not connect that to context pressure at all.

Notice that this makes the problem invisible by default. That's exactly why /context exists: it makes the invisible visible. Run /context and you see precisely what's loaded, which tools are registered, and how full the window actually is. You're not guessing. You have a readout.

/compact is the paired intervention. Once you can see the window filling, /compact summarizes and compresses the conversation history — preserving the substance while reclaiming headroom. Think of it as controlled deflation before a pressure problem becomes a quality problem.

The reason this matters for your environment specifically: {{vehicle}} is not a small surface. Once you add your data feeds on top of the base codebase, you are routinely loading a lot of context before you've written a single line of code. That is a room where context hygiene is not optional — it's a daily discipline.

What this tells us is the right operating rule: compact proactively, not reactively. The threshold that works in practice is 60% — not 80%, not 90%, not 'when things feel slow.' By the time things feel slow, the model has already been operating in degraded state for a while. 60% is the intervention point that keeps you ahead of the curve.

Check what's loaded. Watch it fill. Compact before it matters. That's the loop.
