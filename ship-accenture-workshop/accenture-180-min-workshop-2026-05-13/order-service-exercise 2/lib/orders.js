/**
 * orders.js — shared order-management helpers
 *
 * Utility functions for B2B order lifecycle: validation, lookups,
 * and summary generation. Used by pricing and tier modules.
 */

const MS_PER_DAY = 1000 * 60 * 60 * 24;

/**
 * Calculate elapsed business days between two ISO date strings.
 * Uses calendar days (inclusive start, exclusive end).
 *
 * @param {string} startDate  ISO date string
 * @param {string} endDate    ISO date string
 * @returns {number}          whole days elapsed
 */
export function elapsedDays(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return Math.floor((end - start) / MS_PER_DAY);
}

/**
 * Build an order summary object.
 * @param {object} order - { id, customer, items, createdAt }
 * @returns {object}     - { id, customer, itemCount, createdAt }
 */
export function summarizeOrder(order) {
  const { id, customer, items, createdAt } = order;
  return {
    id,
    customer,
    itemCount: Array.isArray(items) ? items.length : 0,
    createdAt,
  };
}
