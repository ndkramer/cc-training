---
id: Slide_Ex4
tokens: ["{{skill_name}}", "{{vehicle}}"]
---
## Spoken

[EXERCISE 2]

So Exercise 2. You've built a skill and wired MCP — now ship the whole thing, skill plus MCP, as one install your team can use.

Done when: claude plugin validate {{vehicle}}-toolkit shows green.

## Professor

[EXERCISE 2]

The shift this exercise asks you to make is from "I have a working setup" to "my team has a working setup."

Up to this point in the workshop you've built artifacts that live on your machine — your {{skill_name}} skill, your wired MCP server. They work for you. They don't work for the engineer who joins next month. The plugin packaging step closes that gap.

Notice the done-when criterion is `claude plugin validate {{vehicle}}-toolkit` showing green — a mechanical check that the manifest is shaped correctly and the plugin will actually install elsewhere. Green means installable. Not "should work" — installable.

The implication is that this is the difference between an individual practitioner and a team practice. Plugins are how your work travels.
