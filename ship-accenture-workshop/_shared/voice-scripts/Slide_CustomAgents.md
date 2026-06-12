---
id: Slide_CustomAgents
tokens: []
---
## Spoken

So custom agents. Define your own in .claude/agents/ as markdown files. You pick the model per agent — Opus 4.7 for the reviewer, Haiku for the formatter. Scope MCP per agent for least-privilege. maxTurns caps runtime. disallowedTools means a reviewer that physically can't write.

New: @reviewer summon-by-handle in the prompt. Once the agent's defined, mention it like a teammate. --agent=name launches from CLI, and background:true keeps it running while you work.

## Professor

Here's the key insight about custom agents: you're not just configuring an LLM, you're defining a role with constrained capabilities. Each agent file is a contract — who this agent is, what it can do, what it cannot.

Notice what the configuration shape lets you express. You pick the model per agent: Opus 4.7 for the reviewer where reasoning depth matters, Haiku for the formatter where speed and cost matter. You scope MCP per agent, which is the least-privilege principle applied to AI — the reviewer doesn't need write access to your deployment pipeline. maxTurns caps runtime. And disallowedTools is the structural enforcement: a reviewer agent that physically cannot call Edit cannot accidentally rewrite the code it's reviewing.

Then the new ergonomics: @reviewer in the prompt summons by handle, like mentioning a teammate. --agent=name from CLI launches it directly. background:true keeps it running while you work. The implication is that an agent is a persistent role definition the whole team uses the same way, not a single instance you spin up.
