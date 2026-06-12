---
id: Slide_Models
tokens: []
---
## Spoken

Three models to know. Opus is for the hard problems — big refactors, gnarly debugging, anything where you need it to really think — while Sonnet is your daily driver, fast enough and smart enough to be the default, and Haiku is for speed: formatting, boilerplate, anything where you know exactly what you want and just need it typed.

You switch with `/model` inside a session, mid-conversation, so don't memorize version numbers — they change, and the slash command always lists what's current.

## Professor

Before we get into mechanics, it's worth understanding the model tier structure, because model choice is one of your two primary cost levers — and most people never touch it.

Three models. Opus 4.7 for the hard problems: big refactors, gnarly debugging, anything where you need the model to hold a long reasoning chain without dropping threads. Sonnet 4.6 for daily driving — fast enough, smart enough, this is your default. The reason this matters is that Sonnet 4.6 covers the vast majority of professional tasks at a fraction of Opus 4.7's cost, so defaulting to Opus 4.7 is waste, not safety. Haiku 4.5 for speed: formatting, boilerplate, anything where you know exactly what you want and just need it typed.

Notice that the right question isn't 'which model is best' — it's 'which model is sufficient for this task shape.' You switch with `/model` mid-session, so this is a live decision you make per task, not a setting you configure once. Don't memorize version numbers — they change. The slash command always lists what's current. We'll come back to how to calibrate this when we hit effort levels.
