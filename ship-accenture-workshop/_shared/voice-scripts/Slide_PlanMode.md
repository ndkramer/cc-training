---
id: Slide_PlanMode
tokens: ["{{vehicle}}"]
---
## Spoken

Plan mode — Shift-Tab twice toggles you in. Claude reads everything, figures out what it would do, and proposes a plan without touching a file — it can't, zero edits until you approve.

This is what you reach for when the change is scary, like when you're about to refactor a piece of {{vehicle}} that forty other things depend on and you want to see the blast radius before anything moves.

You get a plan, you read it, and if it's wrong you say so — it replans, still zero edits. When it's right you approve and it executes, so you never find out halfway through an edit that the approach was wrong.

## Professor

Here's the key insight about plan mode: it decouples the reasoning step from the execution step. And that decoupling is what makes it safe to apply Claude to changes that would otherwise feel too risky to automate.

Let me set up the problem first. The dangerous moment in any agentic workflow is when the AI starts editing before you've confirmed it understands the scope of the change. You find out halfway through an edit — sometimes after writes to three different files — that the approach was wrong. Rolling that back is messy; understanding what changed is hard. Plan mode eliminates that failure mode at its root.

Here's the mechanism: Shift-Tab twice. Claude reads everything, reasons about what it would do, and proposes a plan. It cannot touch a file. Architecturally, zero edits are possible until you explicitly approve. This isn't a soft convention — it's enforced.

Notice why this matters for exactly the kind of change that requires care: you're about to refactor a piece of {{vehicle}} that forty other things depend on. The blast radius of getting that wrong is large and non-obvious. Plan mode lets you see the full blast radius — every file, every dependency, every edge case Claude intends to handle — before anything moves.

The reason the replanning loop is important is that it keeps the contract clean. If the plan is wrong, you say so and Claude replans, still zero edits. You're not approving a partially-executed change and hoping the rest goes right. You're approving a complete, legible plan and then watching it execute against what you already signed off on. That's a fundamentally different risk profile than unguarded agentic execution.
