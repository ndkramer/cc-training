---
id: Slide_Checkpointing
tokens: []
---
## Spoken

Checkpointing means Claude snapshots state automatically so you can rewind when something goes sideways.

/rewind gives you three modes: conversation only rolls back what was said while keeping the files, code only undoes the file changes while keeping the conversation, and both does a full rewind to the checkpoint.

The key framing is that this is local undo, not git history — checkpoints aren't commits and don't survive the session, so think of it as a safety net for "that last edit was a mistake" without reaching for git stash. The footer says it plainly: checkpoints are local undo, git is permanent history, and they're different tools for different jobs.

## Professor

Let's talk about checkpointing — and more importantly, let's be precise about what it is and what it isn't, because conflating it with git history is the most common mistake.

Here's the key insight: Claude Code automatically snapshots state as you work. These checkpoints capture two distinct things — the conversation state and the file state — and /rewind lets you restore either one independently, or both together.

Pedagogically, that three-way split is worth sitting with. Conversation only means: roll back what was said, but keep the files as they are. Code only means: undo the file changes, but preserve the conversation — so you keep the context of what you were trying to do even as you undo what you actually did. Both means a full rewind to the checkpoint. These are genuinely different recovery scenarios, and having granular control over them is the design.

Now here's the critical distinction: checkpoints are local undo, not git history. They do not survive the session. They are not commits. They will not be there tomorrow morning. The reason this matters is that they solve a different problem than git. Git is for permanent, shareable, reviewable history — the record of what you built and why. Checkpoints are for the in-session moment of 'that last edit was wrong and I want to back up cleanly without context-switching to a terminal.'

Consider what happens when you try to use git for that in-session job: you reach for git stash, you lose your place in the conversation, you have to re-establish context. Checkpoints keep you in flow. That's the mechanism, and that's why the tools are complementary rather than redundant.

Use checkpoints as a safety net for fast local recovery. Use git as the permanent record. Different tools for different jobs — and knowing which job is which is the competency.
