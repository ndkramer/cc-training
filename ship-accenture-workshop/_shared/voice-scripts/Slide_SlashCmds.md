---
id: Slide_SlashCmds
tokens: []
---
## Spoken

So slash commands. The built-in ones worth knowing.

/add-dir pulls a sibling directory into scope without relaunching. /resume picks up the previous session. /context shows what's loaded, which you want to see in a big repo so you know what Claude actually knows. /compact trims it. /model switches mid-session. /batch fans out across targets — one agent per file, each in its own worktree.

The pair to remember is /context and /compact. See what's loaded, then trim. In a big repo you'll use that a lot.

## Professor

The key insight about slash commands is that each one solves a specific friction point that would otherwise force you to restart the session or context-switch out of the terminal.

Look at the list structurally. /add-dir handles 'I forgot a directory' without losing state. /resume handles 'I have to step away for an hour' without losing the conversation. /model handles 'this turn needs Opus, the next ten don't' without committing to a single model upfront. /batch handles 'I have twenty files that all need the same change' without writing a script.

Notice what /context and /compact do as a pair, because this is the one you'll reach for most. /context tells you what Claude is currently reasoning over — every file pulled in, every prior message still loaded. In a large repo, that number gets surprisingly high, and most of it is no longer relevant to the next turn. /compact trims the dead weight so the next reasoning step has room.

The implication for how you should operate is that these aren't shortcuts for power users — they're the lifecycle controls of the session. The big-repo trainers I see using Claude well are running /context and /compact every fifteen turns, almost as reflex.
