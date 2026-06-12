---
id: Slide_ManagedMCP
tokens: ["{{customer}}", "{{vehicle}}"]
---
## Spoken

Admin pre-approves MCP connectors org-wide, so devs get them without per-user setup.

What's new is that claude.ai connectors carry over from web to CLI to mobile — Slack, Gmail, Drive, GitHub, already configured in the org console, appear here too with the same OAuth and the same audit trail. That's the "set up once, works everywhere" beat, and for {{customer}} it means the {{vehicle}} MCP gets registered once and every dev's CLI sees it.

## Professor

Here's the key insight about how tools spread inside an organization: the bottleneck is almost never capability — it's setup friction. If every developer has to individually configure a connector, track down OAuth credentials, and get through their own approval process, adoption stalls at the early-adopter tier. The tool exists, but it doesn't scale.

Managed MCP is the organizational answer to that problem. The mechanism is straightforward: an admin pre-approves MCP connectors at the org level, and developers get them without per-user setup. The connector is available the moment the developer opens their CLI. No credential hunting, no individual OAuth dance.

What's new — and this is the part worth paying attention to — is that claude.ai connectors carry over across surfaces. Slack, Gmail, Drive, GitHub: if they're configured in the org console for the web product, they show up in the CLI and in mobile too. Same OAuth token, same audit trail, same permissions boundary. The reason this matters is that it collapses what would otherwise be three separate configuration problems into one. Set up once, works everywhere is not marketing copy — it's describing a real architectural property of how the credentials are stored and surfaced.

For {{customer}} specifically: {{vehicle}} MCP gets registered once by whoever owns the org console, and every developer's CLI sees it automatically. The connector doesn't have to be re-explained or re-installed every time someone new joins the team or spins up a new machine.
