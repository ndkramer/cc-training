---
id: Slide_MCPArch
tokens: ["{{vehicle}}"]
---
## Spoken

How MCP works under the hood. Claude Code is both the host and the client — it discovers servers, negotiates capabilities, and invokes tools.

Each server exposes three kinds of capability: tools are functions Claude can call, resources are data Claude can read, and prompts are templates Claude can load. Transport is standardized across stdio, SSE, or HTTP, so any server speaks the same protocol regardless of what's behind it.

Why this matters is that you don't write integration code — you point at an MCP server and Claude knows how to use it. Jira, Sentry, your data providers, your internal {{vehicle}} API all use the same wire format. The next slide is the why-care, and the one after that is the live demo.

## Professor

Let me set up the architecture before I show you why it matters in practice.

Here's the key insight: Claude Code is simultaneously the MCP host and the MCP client. As host, it discovers what servers are available and negotiates their capabilities. As client, it invokes those capabilities on demand. The reason this distinction matters is that it means Claude Code is doing the integration work — not you.

Each MCP server exposes three kinds of capability. Tools are functions Claude can call — think of these as the verbs. Resources are data Claude can read — the nouns. Prompts are templates Claude can load to structure its own behavior. What unifies all three is transport: stdio, SSE, or HTTP, all speaking the same wire protocol. Any server that implements the protocol is automatically compatible, regardless of what's behind it.

Now consider the implication. You don't write integration code. You point Claude Code at an MCP server and it knows how to discover the tools, read the resources, and use the prompts — because the protocol is standardized. Jira, Sentry, your data provider adapters, your internal {{vehicle}} API — same wire format, same discovery mechanism, same invocation pattern.

The reason this architectural choice is significant: it decouples capability from implementation. The team that builds the {{vehicle}} MCP server doesn't need to know anything about how Claude Code works. The team using Claude Code doesn't need to know anything about how {{vehicle}} is implemented. The protocol handles the handshake.

The next slide is the why-care in practical terms. The slide after that is the live demo where you'll see a {{vehicle}} MCP tool invoked directly from the main session.
