---
id: Slide_ClaudeMdNesting
tokens: ["{{vehicle}}"]
---
## Spoken

CLAUDE.md nests across three levels. Your personal one lives in the home directory and follows you across every repo, the repo-root one carries build conventions and codebase layout, and each module gets its own per-subdirectory file.

They merge like CSS — the subdirectory CLAUDE.md doesn't restate the build stuff because that's inherited from root, so it only adds what's specific to that corner: which functions are pure, which ones have hidden side effects, which ones nobody has dared refactor since the last major incident.

When you launch Claude inside a subdirectory it's reading all three layers, which means it knows the org conventions and the corner you're in without you repeating yourself or Claude having to guess. The token point is that nesting loads only the slice that matters — the {{vehicle}} subagent doesn't get the pipeline CLAUDE.md.

## Professor

Consider what happens when you have three different layers of context that need to coexist: org-wide conventions, repo-level architecture, and the specific rules of one corner of the codebase. The naive approach is to put everything in one file — which means every agent working anywhere in the repo loads every rule, including the ones irrelevant to it. CLAUDE.md nesting solves this with a cascade model that should feel familiar: it merges like CSS.

Here's how the three levels work. The personal CLAUDE.md in your home directory follows you across every repo — that's your preferences, your conventions, the things true regardless of which codebase you're in. The repo-root CLAUDE.md carries the build commands, the layout of the codebase, the conventions that govern the whole project. And each subdirectory gets its own file for what's specific to that corner: which functions are pure, which ones have hidden side effects, which ones nobody has dared refactor since the last major incident.

Notice what the subdirectory file does NOT do: it doesn't restate the build commands, because those are inherited from root. It only adds what's locally true. This is the same principle as CSS specificity — the most local rule wins, the rest cascade in from above.

The reason this matters is the token implication. When you launch Claude inside a subdirectory, it reads all three layers — org context, repo context, local context — but only the slice relevant to where it is. The {{vehicle}} subagent doesn't get the pipeline CLAUDE.md. What this tells us is that nesting isn't just organizational tidiness; it's a precision-loading mechanism that keeps context tight and accurate without requiring you to maintain one monolithic file that grows without bound.
