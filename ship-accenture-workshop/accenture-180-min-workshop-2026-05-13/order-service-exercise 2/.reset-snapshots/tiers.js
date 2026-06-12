/**
 * tiers.js — order priority tier classification
 *
 * Classifies B2B orders into processing tiers based on their
 * priority score. Tier determines SLA, fulfillment speed, and
 * escalation rules.
 *
 * Score thresholds (inclusive lower bound):
 *   high   : 80 – 100   → same-day fulfillment, dedicated rep
 *   medium : 51 – 79    → standard 3-day SLA
 *   low    :  0 – 50    → batch processing, weekly cycle
 */

/**
 * Classify an order by its priority score.
 *
 * @param {number} score  0–100 priority score
 * @returns {'high'|'medium'|'low'}
 */
export function classify(score) {
  if (score > 80) return 'high';     // BUG: should be >= 80
  if (score > 50) return 'medium';
  return 'low';
}

/**
 * Look up the SLA (in days) for a given tier.
 * @param {'high'|'medium'|'low'} tier
 * @returns {number}  SLA in business days
 */
export function slaForTier(tier) {
  const slas = {
    high: 1,
    medium: 3,
    low: 5,
  };
  return slas[tier] ?? slas.low;
}
