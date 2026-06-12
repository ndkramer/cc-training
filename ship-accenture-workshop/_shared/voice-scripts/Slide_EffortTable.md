---
id: Slide_EffortTable
tokens: []
---
## Spoken

So the effort table. Reference table for the five levels.

Low is the quick syntactic stuff — formatting, things you could almost regex. Medium is Sonnet 4.6 daily-work default. High is Claude Code's default, where architecture and gnarly debugging live. xHigh is new on Opus 4.7 and it's Anthropic's recommended starting point for coding and agentic work — also for exploratory tasks with repeated tool calls and detailed search. Expect meaningfully higher token usage than High. Max is for research-grade problems where you've baselined xHigh and it isn't enough; available on Opus 4.7, Opus 4.6, and Sonnet 4.6, not Haiku. Reserve it — on most workloads max adds cost for marginal gains, and on structured-output tasks it overthinks.

The command is /effort low|medium|high|xhigh|max, lowercase. On Opus 4.7 at High, xHigh, or Max, Claude thinks adaptively by default — no switch to flip. The effort level is the lever.

Sidebar: effort replaces budget_tokens for Opus 4.7 and Sonnet 4.6. If you've got old prompts setting budget_tokens, that's the migration. Effort is the knob now.

## Professor

Here's the key insight about the effort table: model choice and effort level are two sides of the same cost lever, and most teams never touch either.

Let's walk the levels with intention. Low is the floor — quick syntactic operations, formatting, things you could almost regex. The model isn't expected to reason; it's expected to format. Medium is where Sonnet 4.6 lives by default for daily work — enough thought for most professional tasks, fast enough to feel responsive. High is Claude Code's default, and that's deliberate: this is where architecture decisions and gnarly debugging live, and being wrong is expensive. xHigh is new on Opus 4.7 and it's Anthropic's recommended starting point for coding and agentic work — and for exploratory tasks like repeated tool calling and detailed search. The reason xHigh matters is that on Opus 4.7, the model needs more headroom to reason through tool-heavy loops than older models did. Expect meaningfully higher token usage than High; that's the cost. Max is reserved for research-grade problems where you've baselined xHigh and it isn't enough. It's available on Opus 4.7, Opus 4.6, and Sonnet 4.6, not Haiku.

Notice the calibration warning on Max. On most workloads it adds cost for marginal quality gains, and on structured-output tasks it can overthink — producing more reasoning than the question deserves. That's not a small detail. Reaching for Max as a default is the most common cost mistake teams make.

The mechanism in Claude Code is straightforward: /effort low|medium|high|xhigh|max, lowercase, set per session or per turn. On Opus 4.7 at High, xHigh, or Max, Claude thinks adaptively by default — there is no separate switch for extended thinking. The effort level itself is the lever.

The migration note worth carrying out: effort replaces budget_tokens for Opus 4.7 and Sonnet 4.6. If you've got legacy prompts setting budget_tokens, that's the migration. Effort is the knob now, and it's the knob you'll actually use.
