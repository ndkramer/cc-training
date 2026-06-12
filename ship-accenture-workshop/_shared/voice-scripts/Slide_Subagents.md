---
id: Slide_Subagents
tokens: []
---
## Spoken

Subagents protect your main context window — spawning an Explore agent means forty files get read in a separate context, and the main session only gets back two paragraphs.

For a token-sensitive room, this is the single biggest lever for keeping main-session context lean on a big repo, and the context-exploration demo we'll run shortly is exactly this pattern: three Explores fan out and three summaries come back.

The `/agents` tab is where you wire your own — Explore and Plan ship built-in, while Custom Agents fill the gap. The isolation: worktree setting gives each agent its own git working directory, so they physically can't stomp on each other.

## Professor

Here's the key insight about subagents: they protect your main context window. That framing matters because the benefit isn't just organizational — it's economic. Every token read into your main session is a token that competes for space with everything else you need Claude to hold in mind.

Consider what happens when you ask Claude to go read forty files in a large repo. If that reading happens in the main session, you've consumed a significant portion of your context budget on file contents that are only useful for one summarization task. The main session now has less room for the reasoning, the plan, and the code you actually want to produce.

The subagent pattern breaks that coupling. Spawning an Explore agent means the forty files get read in a separate context. Your main session only gets back two paragraphs — the summary. The reading cost is paid in parallel, in isolation, and the main session stays lean.

For anyone working on a big repo, this is the single biggest lever for managing context. It's not about convenience; it's about preserving the quality of the main session's reasoning over a long task.

The context-exploration demo we'll run shortly makes this concrete — three Explore agents fan out simultaneously, three summaries come back to the main session. You'll see the /context numbers before and after.

On the wiring side: Explore and Plan ship as built-in subagent types. The /agents tab is where you define Custom Agents for anything those two don't cover. The mechanism that prevents agents from interfering with each other is isolation: worktree — each agent gets its own git working directory, so they physically cannot write over each other's changes. That's not just a safety feature; it's what makes true parallelism safe to run.
