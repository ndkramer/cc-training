---
id: Slide_ParallelPatterns
tokens: []
---
## Spoken

Motivation before mechanics: sequential time is the sum of all tasks, while parallel time is just the longest one.

There are three patterns to know. Task decomposition splits work by concern — a writer, a tester, and a doc-writer running side by side, which is exactly what we'll do for the endpoint demo at the end. Horizontal scaling fans the same transform across N files or services, like sweeping all the adapters at once, and pipeline parallelism overlaps stages so each one starts before the last finishes.

There are also three built-in fan-out modes — /batch for N-worktree migrations, /ultrareview for cloud parallel review, and /ultraplan for cloud planning — and we'll see /ultrareview in a few slides.

## Professor

Let me give you the motivation before the mechanics, because the mechanics only make sense once you've internalized why they matter.

Here's the key insight: sequential time is the sum of every task. Parallel time is just the longest one. That asymmetry is the entire reason to care about parallelism. If you have three tasks that each take ten minutes, sequential execution costs thirty minutes. Run them in parallel and you pay ten. That's not an optimization — it's a structural change in how you think about large work.

Now, three patterns for how to decompose that work.

Task decomposition means splitting by concern. Writer, tester, doc-writer — each runs simultaneously against the same goal. Notice that this isn't just 'faster'; it's also qualitatively different, because each agent is optimizing for its own axis without the others slowing it down. We'll make this concrete in the agent-team demo at the end of the session, so hold that thought.

Horizontal scaling is the same transform applied across N targets at once. The canonical example is sweeping all the adapters in a single pass rather than one at a time. The reason this matters is that the cost structure is flat — ten targets costs the same wall-clock time as one.

Pipeline parallelism overlaps stages so the next begins before the previous finishes. Consider what happens when you're generating documentation while tests are still running — you recover all the idle wait time.

Now here's what connects these three patterns to practice: Claude Code ships built-in modes that map directly to each one. /batch is horizontal scaling, mechanized — N worktrees, one per migration target, no orchestration code required. /ultrareview is task decomposition applied to PR review — one agent per angle, findings consolidated at the end. /ultraplan does the same for planning.

The reason I'm presenting these as a taxonomy rather than a feature list is this: the pattern you pick should match the shape of the work. Reach for horizontal scaling when you have N identical targets. Reach for task decomposition when the work has distinct concerns that don't need to coordinate. Reach for pipeline parallelism when stages have slack between them. The /ultrareview slide coming up puts task decomposition into practice — that's the one to watch for.
