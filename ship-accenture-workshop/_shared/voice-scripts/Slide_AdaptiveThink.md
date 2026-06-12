---
id: Slide_AdaptiveThink
tokens: ["{{vehicle}}"]
---
## Spoken

By default Claude decides for itself how hard to think, and you don't manage it — it just happens. A simple rename answers fast, while a tricky architecture question takes longer because it reasons more.

You can override it when you need to: type 'ultrathink' and that one response gets max depth. It's useful for the single question in a session where you really need Claude to be careful — the kind of moment where you're deciding 'do I let Claude refactor the core logic of {{vehicle}}?'

## Professor

Here's the key insight about adaptive reasoning: the default behavior is that Claude manages effort allocation for you — and for the vast majority of turns, that's exactly right.

Let's be precise about the mechanism. Claude Code dynamically adjusts reasoning depth based on what it perceives the task to require. A simple rename is answered quickly because deep reasoning would add cost without adding correctness. A tricky architecture question gets more processing time because the answer space is genuinely larger and the cost of a wrong answer is higher. You don't configure this per turn. It just happens, continuously, as the session evolves.

The reason this matters is that it removes a whole category of cognitive overhead. You're not deciding effort level for every prompt. The model is making that call based on signal it has that you don't always have — like how much the answer depends on subtle interactions across the codebase.

But notice that 'usually right' is not 'always right.' There are moments in a session where you know the stakes of a single question are higher than the model's default calibration will reflect. That's the case for 'ultrathink.' Type it, and that one response gets maximum reasoning depth — regardless of what the model would have chosen on its own.

Consider what happens when you're working on a complex codebase and you arrive at the question: do I let Claude restructure the core logic of {{vehicle}}? That is a high-consequence, cross-cutting decision. The adaptive default may not push to maximum depth on its own. 'Ultrathink' is the mechanism for saying: I know this moment is different. Treat it that way.

The skill is knowing which moments those are.
