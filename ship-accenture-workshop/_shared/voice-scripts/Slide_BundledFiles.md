---
id: Slide_BundledFiles
tokens: []
---
## Spoken

Here's what a skill actually looks like on disk. SKILL.md leads with YAML frontmatter — name and description — followed by the markdown body that holds your instructions.

Alongside it you can bundle anything the skill needs to do its job: reference docs, templates, even a separate slide-deck.md if the skill builds presentations. It all lives in the same directory, so the skill is self-contained.

The key insight is to be very explicit in that frontmatter description, because that's the line Claude sees when deciding whether the skill applies. A vague description means the skill never fires, while a specific one fires exactly when it should.

## Professor

Here's what a skill looks like as a concrete artifact on disk, and why the structure is designed this way.

SKILL.md is the entry point. It opens with YAML frontmatter — a name and a description — and then the markdown body carries the instructions. Alongside it in the same directory you can bundle anything the skill needs to do its job: reference docs, templates, output files the skill generates. The directory is the unit of deployment. The skill is self-contained.

Now here's the key insight, and it's easy to underestimate: the frontmatter description is not documentation for humans. It is the signal Claude uses at invocation time to decide whether this skill applies to what it's been asked to do. The reason that distinction matters is that a vague description — something like 'handles operations' — gives Claude no discriminating signal. It may never fire, or it fires on the wrong prompt. A specific description — one that names the exact trigger condition, the inputs, the domain — fires exactly when it should and not otherwise.

What this tells us is that writing a skill is really two separate writing tasks. The instructions in the body tell Claude what to do. The description in the frontmatter tells Claude when to do it. Both have to be precise, but they're precise in different ways and for different audiences: the body is for execution, the frontmatter is for routing.
