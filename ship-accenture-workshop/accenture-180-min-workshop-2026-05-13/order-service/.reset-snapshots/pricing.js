// Proration math for mid-cycle cancellations and upgrades.
// All billing is day-granular — no partial-day charges.

const MS_PER_DAY = 24 * 60 * 60 * 1000;

/**
 * Calculate the number of billable days between a cycle start and
 * the effective cancellation/change timestamp.
 *
 * The scheduler fires the cancellation a few hundred ms after midnight,
 * so effective is never exactly on the boundary.
 */
export function billableDays(cycleStart, effective) {
  const elapsed = (new Date(effective) - new Date(cycleStart)) / MS_PER_DAY;
  return Math.ceil(elapsed);   // BUG: 15.0048 -> 16
}

/**
 * Prorate a monthly charge based on billable days within a 30-day cycle.
 */
export function proratedAmount(monthlyRate, cycleStart, effective) {
  const days = billableDays(cycleStart, effective);
  return Math.round((monthlyRate / 30) * days * 100) / 100;
}
