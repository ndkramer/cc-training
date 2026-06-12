---
id: Slide_ParallelCompare
tokens: []
---
## Spoken

Decision recap now that all three are taught — when to reach for each.

claude -w <branch> and the EnterWorktree tool make worktree-mode a one-liner from either the CLI or an agent, which collapses the setup cost. The matrix lands like this: Subagents are hub-and-spoke where workers don't talk and you're protecting context, parallel worktrees are when workers don't even know about each other and you're fanning out N-worktree migrations with /batch, and agent teams are when workers DO talk via files because the feature needs lateral coordination.

For your room, the heuristic is: Subagents whenever you need context isolation, worktrees when the work is fan-out of the same task, and agent teams when the work has roles.

## Professor

Now that we've seen all three patterns in action, the important question isn't 'what are they' — it's 'when does each one apply.' Let me set up the decision logic before landing the matrix.

Notice that each pattern makes a different assumption about whether workers need to communicate, and that assumption is what drives the choice.

Subagents are hub-and-spoke: workers don't talk to each other, only to the orchestrator. The reason you'd choose this is context protection — each worker gets a clean context with exactly the information it needs and nothing more. The isolation is the feature.

Parallel worktrees go one step further: workers don't even know about each other. There's no hub, no coordination at all — just N independent instances of the same task running against separate branches. `claude -w <branch>` and the EnterWorktree tool make this a one-liner from the CLI or an agent, so the setup cost that used to make worktrees impractical is essentially gone. This is the right pattern for fan-out work: the same migration, the same refactor, applied independently across N targets with /batch.

Agent teams are the pattern for when workers DO need to coordinate — not through an orchestrator, but laterally, via shared state on the filesystem. The reason you'd choose this over subagents is that the work has roles and the roles have dependencies. A writer produces something a tester needs to read. A tester produces results a doc-writer needs to reference. No orchestrator knows enough to mediate those handoffs in advance; the agents have to discover them through the shared artifact.

What this tells us is a clean three-way decision rule: subagents when you need context isolation, worktrees when the work is fan-out of the same task, agent teams when the work has roles and lateral dependencies. The room you're in right now maps onto one of those three. Pick the pattern that matches the coordination shape of your actual work.
