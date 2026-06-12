// Invoice reconciliation — compares invoiced totals against reference
// amounts and flags drift. Used by the /reconcile skill.

import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Load invoice data for an order from data/<id>-invoices.json.
 */
export function loadInvoices(orderId) {
  const filePath = resolve(__dirname, '..', 'data', `${orderId}-invoices.json`);
  const raw = readFileSync(filePath, 'utf8');
  return JSON.parse(raw);
}

/**
 * Compute drift between invoiced total and reference amount.
 * Returns { invoicedTotal, referenceAmount, drift, driftPercent, withinCap }.
 */
export function computeDrift(invoiceData, capPercent = 5) {
  const invoicedTotal = invoiceData.invoices.reduce(
    (sum, inv) => sum + inv.amount,
    0
  );
  const referenceAmount = invoiceData.referenceAmount;
  const drift = Math.abs(invoicedTotal - referenceAmount);
  const driftPercent =
    referenceAmount === 0 ? 0 : (drift / referenceAmount) * 100;

  return {
    orderId: invoiceData.orderId,
    invoicedTotal: Math.round(invoicedTotal * 100) / 100,
    referenceAmount,
    drift: Math.round(drift * 100) / 100,
    driftPercent: Math.round(driftPercent * 100) / 100,
    withinCap: driftPercent <= capPercent,
  };
}

/**
 * Reconcile an order: load its invoices, compute drift, return findings.
 */
export function reconcile(orderId, capPercent = 5) {
  const invoiceData = loadInvoices(orderId);
  return computeDrift(invoiceData, capPercent);
}
