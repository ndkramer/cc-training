---
id: Slide_AgentView
tokens: []
---
## Spoken

Agent View is the dashboard for background sessions — one screen instead of a wall of terminal tabs.

Four entry points: `claude agents` opens the dashboard, `/bg` pushes the current session to the background, `claude --bg [task]` launches straight to background, and left-arrow on any row opens that session inline. Each row tells you the session id, whether it's waiting on you, the last response preview, and how long since it spoke.

Reach for this when the work is async and queued — fire and check back, many in flight at once. It's not real-time agent coordination, it's the orchestration UI for the parallel sessions you already know how to launch.

## Professor

We just walked through three ways to parallelize — subagents, parallel worktrees, agent teams — and the natural follow-on question is: once I have five or ten of these running, how do I actually keep track of them? Until recently the answer was 'open more terminal tabs and tail the output,' which is the pattern you've probably been improvising. Agent View, shipped on May 11th, replaces that.

The mental model is simple: it's a dashboard for background Claude Code sessions. Four CLI surfaces drive it. `claude agents` opens the dashboard itself — a list of every background session, with a session id, a needs-input flag, a preview of the most recent response, and the last-interaction timestamp. `/bg` is what you type inside a foreground session to push it to the background; useful when a long-running task has hit a checkpoint and you'd rather move on than wait. `claude --bg [task]` launches a session directly to the background, which is what you'd use to fan out N tasks at once. And left-arrow on any row opens that session inline so you can answer its question or steer it, then push it back to background and move on to the next.

The framing that matters for your room: this is the UI for async, queued work — not real-time coordination. If your three workers need to read each other's files mid-task, that's still agent teams in tmux. Agent View is the layer above: it's how you supervise many parallel sessions when each one is mostly independent and you just need to know which ones are blocked on you.

Minimum version is Claude Code 2.1.139, and it's available on Pro, Max, Team, Enterprise, and on the API as a Research Preview today. If folks update Claude Code on the flight home, they'll see this dashboard and now they know what it is.
