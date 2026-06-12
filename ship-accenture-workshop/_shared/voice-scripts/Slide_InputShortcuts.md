---
id: Slide_InputShortcuts
tokens: []
---
## Spoken

So input shortcuts. Three things that go in the prompt box that aren't slash commands — just characters.

Bang runs a shell command in place. !npm test, the output lands in the conversation, no second terminal, no copy-paste. You've seen me do this in the demos.

At-sign pulls a file in. @lib/buckets.js and Claude reads it right there. Faster than saying 'go find the file' and waiting for a search.

Then there's paste-screenshots. Command-V or drag it in — error dialogs, mockups, a whiteboard diagram. If you can screenshot it, Claude sees it.

Simple stuff. Muscle memory after a week.

## Professor

The key insight here is that the prompt box has three little tools that disappear into your muscle memory and end up changing the shape of the workflow.

Start with bang. The reason this matters isn't that you couldn't run `npm test` in another terminal — it's that the output lands inside the conversation, in the same context window Claude is reasoning over. So when the test fails, you don't have to copy the error in. Claude already saw it. That's a fundamentally different feedback loop than tabbing back and forth.

At-sign is similar in spirit. @lib/buckets.js doesn't ask Claude to "go find the file" — it puts the file's contents into the prompt directly. Notice what that does structurally: it collapses the search step into a citation. The model doesn't burn context exploring; you've already pointed at what matters.

Paste-screenshots is the visual extension of the same principle. Command-V drops the pixels into the conversation. Error dialogs, mockups, whiteboard photos — any visual the room already has. Multimodal isn't an experiment; it's an input channel.

So the implication is that these three aren't features to memorize — they're the way you get the right context in front of Claude without spending a turn fetching it. Muscle memory after a week, real workflow change after that.
