---
id: Slide_MCP
tokens: []
---
## Spoken

So MCP. It's how Claude calls your systems. Stdio or HTTP servers — you give it a tool, it calls the tool. Ticket system, deployment pipeline, your observability stack — anything you'd type into a terminal, you can expose as an MCP tool and Claude calls it directly.

On auth: the server runs with your credentials, not Claude's. Same audit surface you already have.

## Professor

Here's the key insight about MCP: it is the protocol by which Claude reaches outside its sandbox and operates on your actual systems, with your actual credentials.

Notice what the configuration model lets you do. Any system you'd otherwise type a command at — a ticket tracker, a deployment pipeline, an observability stack — can be exposed to Claude as a tool. The transport is stdio for local servers, HTTP for remote ones. The shape of the contract is the same: you describe the tool, Claude calls it, the response feeds back into reasoning.

The reason the auth model matters is that it preserves your existing security boundary. The MCP server runs with your credentials, not Claude's. That means every audit log entry, every IAM permission, every rate limit — all the controls you've already built around the system — apply to Claude's calls the same way they apply to yours. You are not granting Claude its own access to production; you are letting Claude operate within your existing access.

That distinction is the reason MCP scales to enterprise use. The security architecture doesn't need to change.
