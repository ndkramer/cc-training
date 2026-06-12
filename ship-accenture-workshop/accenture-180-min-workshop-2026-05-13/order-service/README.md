# order-service — Claude Code Workshop

A B2B order management service built on Next.js App Router. Tracks orders
with recurring billing cycles, prorates cancellations, and reconciles
invoiced totals against reference amounts. One test fails on a cold clone.
You'll fix the bug, teach Claude the repo, and package the workflow as a skill.

## Setup

```bash
unzip order-service.zip
cd order-service
npm test            # expect: 3 passing, 1 failing — that's the starting point
```

Zero install required for the core exercises. Tests run on plain `node --test`
and import `lib/` directly — no bundler, no Next build. Only `npm install`
when you hit Exercise 3 (the MCP SDK is a real dep).

## Structure

```
lib/pricing.js            <- Proration math. THE BUG LIVES HERE.
lib/orders.js             <- Order records. Static array. Start by reading this.
lib/reconciliation.js     <- Invoice reconciliation logic.
test/pricing.test.js      <- 4 tests. One fails. Your target for Demo 1.
data/ORD-*-invoices.json  <- Invoice data for reconciliation demos.
app/api/orders/route.js   <- GET all orders, ?status= filter
app/api/invoices/route.js <- GET invoices for an order
mcp/order-store/server.js <- Stdio MCP server. Exercise 3 wires this up.
CLAUDE.md                 <- Sparse TODOs. Demo 2 fills these in.
```

## The bug

Order ORD-0042 cancels mid-cycle. Should be billed for 15 days — the invoice
says 16. The scheduler adds a few hundred milliseconds of latency, so the
elapsed time is 15.0048 instead of 15. `Math.ceil` pushes it up.

## Reset between runs

```bash
./reset-demo.sh   # re-plants the bug, restores sparse CLAUDE.md, clears demo artifacts
```
