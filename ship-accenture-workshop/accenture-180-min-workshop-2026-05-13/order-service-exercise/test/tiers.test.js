import { test } from 'node:test';
import assert from 'node:assert/strict';
import { classify, slaForTier } from '../lib/tiers.js';

test('order with score exactly 80 → high tier', () => {
  assert.equal(classify(80), 'high');  // FAILS: returns 'medium'
});

test('order with score above 80 → high tier', () => {
  assert.equal(classify(95), 'high');
});

test('order with score in mid-range → medium tier', () => {
  assert.equal(classify(65), 'medium');
});

test('order with score exactly 50 → low tier', () => {
  assert.equal(classify(50), 'low');
});

test('order with score below 50 → low tier', () => {
  assert.equal(classify(25), 'low');
});

test('high tier SLA is 1 business day', () => {
  assert.equal(slaForTier('high'), 1);
});
