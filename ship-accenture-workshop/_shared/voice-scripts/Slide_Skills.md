---
id: Slide_Skills
tokens: ["{{skill_name}}"]
---
## Spoken

So skills. A skill is a slash command you define — markdown file, becomes a repeatable workflow.

The pattern: you've typed the same multi-step thing three times. 'Run the tests, then do X, then re-test, then show me the diff.' Third time, stop typing. Put it in a skill file. Now it's /yourskill and it runs the whole sequence.

It's markdown. Frontmatter decides when it fires. Body is the steps. Guardrails if you want them — 'don't touch anything if tests are already red.' No DSL, just markdown.

## Professor

Here's the key insight about skills: they are how you turn your own expertise into something the model can re-execute without you re-typing it.

The mechanism is precise. A skill is a markdown file with a frontmatter block and a body. The frontmatter declares when the skill should fire. The body is the procedure you'd otherwise type into the prompt every time. Once that file exists, /yourskill runs the whole sequence as if you had typed it manually.

The reason this matters is structural. Most senior engineers carry around five or six "I always do this in this order" patterns — run tests, snapshot a file, edit it, re-run, show the diff. Those patterns are tacit knowledge today; they live in your head and don't transfer when someone new joins the team. A skill is the cheapest possible way to externalize that knowledge in a form Claude can execute.

Notice there's no DSL. No special language to learn — the same markdown you write in PR descriptions and design docs. That constraint is intentional: lowering the barrier to authoring is what gets engineers to actually write the skill the third time instead of typing the sequence again.

The implication is that skills accumulate. The {{skill_name}} skill we'll see in the next demo is one example; every team I see using Claude Code well ends up with a folder of these.
