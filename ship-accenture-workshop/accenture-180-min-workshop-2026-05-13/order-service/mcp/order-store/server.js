#!/usr/bin/env node
// Stdio MCP server exposing the order store to Claude.
// Run: node mcp/order-store/server.js  (or `npm run mcp`)
// Register: claude mcp add order-store -- node mcp/order-store/server.js
//
// Seeded order IDs (from ../../lib/orders.js):
//   ORD-0012, ORD-0023, ORD-0034, ORD-0042, ORD-0055, ORD-0067, ORD-0089, ORD-0118

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
import { ORDERS } from '../../lib/orders.js';

const server = new Server(
  { name: 'order-store', version: '0.1.0' },
  { capabilities: { tools: {} } }
);

// ---- input schemas ----
const ListOrdersInput = z.object({
  status: z.enum(['active', 'cancelled', 'suspended']).optional(),
});
const GetOrderInput = z.object({
  id: z.string(),
});

// ---- tool list ----
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
        properties: {
          id: { type: 'string' },
        },
        required: ['id'],
      },
    },
  ],
}));

// ---- dispatch ----
server.setRequestHandler(CallToolRequestSchema, async (req) => {
  const { name, arguments: args } = req.params;

  if (name === 'list_orders') {
    const { status } = ListOrdersInput.parse(args ?? {});
    const orders = status
      ? ORDERS.filter((o) => o.status === status)
      : ORDERS;
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

const transport = new StdioServerTransport();
await server.connect(transport);
