#!/usr/bin/env node
// HTTP MCP server exposing the order store to Claude.
// Run:      node mcp/order-store/server-http.js
// Register: claude mcp add --transport http order-store http://localhost:3001/mcp

import { createServer } from 'node:http';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
import { ORDERS } from '../../lib/orders.js';

const PORT = 3001;

// ---- input schemas ----
const ListOrdersInput = z.object({
  status: z.enum(['active', 'cancelled', 'suspended']).optional(),
});
const GetOrderInput = z.object({
  id: z.string(),
});

function buildMcpServer() {
  const server = new Server(
    { name: 'order-store', version: '0.1.0' },
    { capabilities: { tools: {} } }
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: [
      {
        name: 'list_orders',
        description: 'List B2B orders, optionally filtered by status.',
        inputSchema: {
          type: 'object',
          properties: {
            status: { type: 'string', enum: ['active', 'cancelled', 'suspended'] },
          },
        },
      },
      {
        name: 'get_order',
        description: 'Get a single order by ID.',
        inputSchema: {
          type: 'object',
          properties: { id: { type: 'string' } },
          required: ['id'],
        },
      },
    ],
  }));

  server.setRequestHandler(CallToolRequestSchema, async (req) => {
    const { name, arguments: args } = req.params;

    if (name === 'list_orders') {
      const { status } = ListOrdersInput.parse(args ?? {});
      const orders = status ? ORDERS.filter((o) => o.status === status) : ORDERS;
      return { content: [{ type: 'text', text: JSON.stringify(orders, null, 2) }] };
    }

    if (name === 'get_order') {
      const { id } = GetOrderInput.parse(args ?? {});
      const order = ORDERS.find((o) => o.id === id);
      if (!order) {
        return { content: [{ type: 'text', text: `No order '${id}'.` }], isError: true };
      }
      return { content: [{ type: 'text', text: JSON.stringify(order, null, 2) }] };
    }

    return { content: [{ type: 'text', text: `unknown tool: ${name}` }], isError: true };
  });

  return server;
}

// Stateless: each request gets a fresh transport + server pair (simplest for demos)
const httpServer = createServer(async (req, res) => {
  if (req.url !== '/mcp') {
    res.writeHead(404).end('Not found');
    return;
  }

  const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
  const mcpServer = buildMcpServer();
  await mcpServer.connect(transport);
  await transport.handleRequest(req, res);
});

httpServer.listen(PORT, () => {
  console.log(`order-store MCP server listening on http://localhost:${PORT}/mcp`);
});
