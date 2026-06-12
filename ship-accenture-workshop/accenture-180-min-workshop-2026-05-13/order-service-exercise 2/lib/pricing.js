/**
 * pricing.js — order pricing calculations
 *
 * Computes line-item totals and applies discount tiers
 * for B2B order invoices. All currency values in USD cents.
 */

/**
 * Compute the unit price after applying a volume discount.
 * Discount tiers:
 *   100+ units : 15% off
 *    50–99     : 10% off
 *    10–49     :  5% off
 *     1–9      : no discount
 *
 * @param {number} basePrice   unit price in cents
 * @param {number} quantity    number of units
 * @returns {number}           discounted unit price in cents (floored)
 */
export function discountedUnitPrice(basePrice, quantity) {
  let discount = 0;
  if (quantity >= 100) discount = 0.15;
  else if (quantity >= 50) discount = 0.10;
  else if (quantity >= 10) discount = 0.05;

  return Math.floor(basePrice * (1 - discount));
}

/**
 * Calculate the total for an order line item.
 * @param {number} basePrice  unit price in cents
 * @param {number} quantity   number of units
 * @returns {number}          total in cents
 */
export function lineItemTotal(basePrice, quantity) {
  return discountedUnitPrice(basePrice, quantity) * quantity;
}
