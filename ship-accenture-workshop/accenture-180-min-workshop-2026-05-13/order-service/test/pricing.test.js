import { test } from 'node:test';
import assert from 'node:assert';
import { billableDays, proratedAmount } from '../lib/pricing.js';

test('full 30-day cycle bills for 30 days', () => {
  const start = '2026-03-01T00:00:00.000Z';
  const end   = '2026-03-31T00:00:00.000Z';
  assert.strictEqual(billableDays(start, end), 30);
});

test('cancellation on day 15 of 30 bills for 15 days', () => {
  // ORD-0042 cancels mid-cycle. Should be billed for 15 days.
  // The scheduler adds ~417ms of latency — effective is 15.0048 days, not 15.
  const start     = '2026-03-01T00:00:00.000Z';
  const effective = '2026-03-16T00:00:00.417Z';  // scheduler latency
  assert.strictEqual(billableDays(start, effective), 15);  // FAILS: returns 16
});

test('same-day cancellation bills for 0 days', () => {
  const start     = '2026-03-01T00:00:00.000Z';
  const effective = '2026-03-01T00:00:00.000Z';
  assert.strictEqual(billableDays(start, effective), 0);
});

test('prorated amount for 15 of 30 days at $9000/mo', () => {
  // This test uses hardcoded day count via the math, not billableDays,
  // so it passes regardless of the rounding bug.
  const rate = 9000;
  const expected = (rate / 30) * 15;  // $4500
  assert.strictEqual(proratedAmount(rate, '2026-03-01T00:00:00.000Z', '2026-03-16T00:00:00.000Z'), expected);
});
