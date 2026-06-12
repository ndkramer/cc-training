---
id: Slide_WhichModel
tokens: []
---
## Spoken

Reference slide — the previous one was the intuition, and this is the lookup table.

Opus is the hardest problems and peak intelligence at $5/$25 per million tokens, Sonnet is near-Opus at scale for $3/$15, and Haiku is the latency-sensitive, free-tier option at $1/$5. Context is 1M for Opus and Sonnet, 200K for Haiku.

For this room, 'Best for' is the row that matters: long-horizon agent tasks like the MCP reconcile demo we'll do later go to Opus, high-volume pipeline jobs go to Sonnet, and sub-second autocomplete-ish responses go to Haiku. Pick by task shape, not by default — we'll come back to this when we hit effort levels, because model choice and effort level are the two cost levers.

## Professor

The previous slide was the intuition. This is the reference — the lookup table you come back to when you're deciding.

Opus 4.7: hardest problems, peak intelligence, $5 input / $25 output per million tokens. Sonnet 4.6: near-Opus quality at scale, $3 / $15. Haiku 4.5: latency-sensitive workloads, free-tier eligible, $1 / $5. Context window is 1M tokens for Opus 4.7 and Sonnet 4.6, 200K for Haiku 4.5.

For this room, the 'Best for' row is the one that actually drives the decision. Consider what happens when you apply that to your specific workflow: long-horizon agent tasks — like the MCP reconcile demo we'll run later — that's Opus 4.7, because it needs to hold a complex reasoning chain across many steps without losing state. High-volume pipeline jobs where you're running at scale, that's Sonnet 4.6 — near-Opus quality at a cost structure that makes volume viable. Sub-second responses, autocomplete-adjacent things, that's Haiku 4.5.

The reason this matters operationally is that model choice and effort level are the two cost levers you control in Claude Code. Neither one is set-and-forget. The discipline is picking by task shape, not by habit.
