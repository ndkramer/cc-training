---
id: Slide_AgentTeams
tokens: []
---
## Spoken

So agent teams. tmux split, one Claude per pane, coordinate via shared files. Lateral communication — agents actually talk, unlike parallel worktrees.

New tip: /color and /rename per pane for visual distinction. The 'which pane was the test writer?' pain on big migrations — solved. Walk it: three Claudes, one feature, the router assigns the panes.

## Professor

Here's the key insight about agent teams: this is the pattern when the work has multiple roles that need to coordinate, not just multiple instances running in parallel.

Notice the architecture. tmux gives you the visual surface — one Claude per pane, all alive at the same time. Shared files are the bus: when the auditor writes a list, the fixer reads it. Lateral communication is what distinguishes this from parallel worktrees — agents actively talk to each other, not just running independent slices.

Consider what /color and /rename solve. On a three-agent migration the panes blur together fast — which one is the test writer, which one is the implementer. Color-coding and explicit naming aren't cosmetic; they're how the human at the keyboard keeps the mental model straight while the agents work.

Three Claudes, one feature, a router that assigns the panes. The implication is that you're not parallelizing work — you're building a team where each member has a role.
