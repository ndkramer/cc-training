---
id: Slide_EffortLevels
tokens: ["{{skill_name}}"]
---
## Spoken

The ○ ◐ ● indicator on the prompt bar is reasoning depth — how hard Claude thinks before answering — and it's your second cost lever after model choice.

Low handles boilerplate and rote refactors, medium is the daily driver on Sonnet 4.6, and high is Claude Code's default for architecture, tricky bugs, and anything cross-cutting. On Claude Opus 4.7, xhigh is the recommended starting point for coding and agentic work because it thinks longer, costs more, and gets it right more often.

There are a few escape hatches worth showing: type "ultrathink" for one-turn high effort without changing the setting, use /effort to switch mid-session, or pin it per-skill via effort: in frontmatter — your {{skill_name}} skill could ride at medium while a refactor-the-feed-router task rides at xhigh. That's how you control token spend at the task level rather than at the session level.

## Professor

Here's the key insight about the ○ ◐ ● indicator: it is your second cost lever, and most practitioners underuse it because they don't consciously manage it at the task level.

Let's set up the concept. Claude Code's reasoning depth is configurable. The indicator on the prompt bar controls how much the model thinks before it answers — not just how long it takes, but the depth and structure of the reasoning it performs. More depth means better answers on hard problems. It also means more tokens consumed and more latency. The question is never 'maximum depth always' — it's 'right depth for this task.'

Notice the calibration that falls out of that framing. Low effort is appropriate for boilerplate generation and rote refactors — tasks where the answer is well-defined and the cost of thinking harder is pure waste. Medium is the right setting for daily driving on Sonnet 4.6 — the broad middle of your work. High is Claude Code's default, calibrated for architecture decisions, tricky bugs, and anything cross-cutting. And on Opus 4.7, xHigh is the recommended starting point for coding and agentic work — because on that model, the additional reasoning depth is where the capability difference actually lives.

What this tells us is that effort level is a task-level decision, not a session-level one. And the tool gives you three mechanisms to act on that.

First, 'ultrathink' typed inline gives you one-turn maximum depth without changing your session setting — surgical, no overhead. Second, /effort lets you switch mid-session as the work changes character. Third, and this is the one with the most leverage at scale: you can pin effort per-skill via the effort: key in frontmatter.

The reason that third option matters is exactly this: your {{skill_name}} skill is doing something well-defined and repeatable — it doesn't need xHigh on every run. A refactor task does. Encoding that distinction in the skill definition means you're not making the effort decision manually every time — you've made it once, correctly, and it holds.

That is how you control token spend at the task level, not just the session level. Model choice sets the ceiling. Effort level sets where you operate within it.
