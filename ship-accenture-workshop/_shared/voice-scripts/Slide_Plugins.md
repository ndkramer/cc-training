---
id: Slide_Plugins
tokens: []
---
## Spoken

So plugins. They bundle skills, MCP, and settings into a .claude-plugin/ directory. Team installs once, gets the lot.

New in the manifest: userConfig.sensitive keeps secrets — API tokens, keys — out of git, stored in the OS keychain. The monitor field declares what hooks watch. bin/ executables in the plugin are auto-discovered.

claude plugin tag for publishing. This is the 'ship your toolkit to the team as one install' beat.

## Professor

Here's the key insight about plugins: a skill is your own workflow, a plugin is your team's. Plugins are the unit of distribution.

Look at the structural shape. A plugin is a .claude-plugin/ directory that bundles skills, MCP configurations, and settings into one installable thing. The team installs it once and gets the whole package — every skill author's contribution, every MCP wired correctly, every guardrail. The alternative is each engineer recreating the setup individually, which is how environments drift.

The new manifest fields are worth understanding because they solve real distribution problems. userConfig.sensitive keeps secrets — API tokens, encryption keys — out of git by storing them in the OS keychain. That's not just convenience; it's the difference between a plugin you can publish and one you can't. The monitor field declares what hooks the plugin watches, which makes the plugin's behavior auditable before install. bin/ executables are auto-discovered, so you can ship a helper command without per-machine PATH setup.

claude plugin tag is the publish step. The implication for your team is that toolkits stop being tribal knowledge — they become installable artifacts that any new engineer onboards into in one command.
