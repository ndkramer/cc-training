import { test } from 'node:test';
import assert from 'node:assert/strict';
import { discountedUnitPrice, lineItemTotal } from '../lib/pricing.js';

test('no discount for small quantities', () => {
  assert.equal(discountedUnitPrice(1000, 5), 1000);
});

test('5% discount for 10+ units', () => {
  // 1000 cents * 0.95 = 950 cents
  assert.equal(discountedUnitPrice(1000, 25), 950);
});

test('10% discount for 50+ units', () => {
  // 1000 cents * 0.90 = 900 cents
  assert.equal(discountedUnitPrice(1000, 75), 900);
});

test('15% discount for 100+ units', () => {
  // 1000 cents * 0.85 = 850 cents
  assert.equal(discountedUnitPrice(1000, 120), 850);
});

test('lineItemTotal multiplies discounted price by quantity', () => {
  // 25 units at 1000 cents base → 950 * 25 = 23750
  assert.equal(lineItemTotal(1000, 25), 23750);
});
