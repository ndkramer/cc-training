import { test } from 'node:test';
import assert from 'node:assert/strict';
import { elapsedDays, summarizeOrder } from '../lib/orders.js';

test('elapsed days between two dates is computed correctly', () => {
  assert.equal(elapsedDays('2026-03-01', '2026-03-16'), 15);
});

test('summarizeOrder returns correct item count', () => {
  const order = {
    id: 'ORD-0099',
    customer: 'Contoso',
    items: [{ sku: 'A' }, { sku: 'B' }, { sku: 'C' }],
    createdAt: '2026-03-01',
  };
  const summary = summarizeOrder(order);
  assert.equal(summary.itemCount, 3);
  assert.equal(summary.id, 'ORD-0099');
});
