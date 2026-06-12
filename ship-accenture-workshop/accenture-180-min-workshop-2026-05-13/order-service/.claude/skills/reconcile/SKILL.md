---
name: reconcile
description: Reconcile an order's invoiced total against its reference amount
---

# /reconcile <order-id>

Reconcile billing for a cancelled or mid-cycle order. Loads invoice data,
computes drift against the reference amount, and applies a correction if
drift is within the policy cap.

## Preconditions

Before acting, verify ALL of the following:

1. The order ID exists in `lib/orders.js` and has status `cancelled`
2. A data file exists at `data/<order-id>-invoices.json`
3. The data file contains a `dataAsOf` timestamp that is at least 24 hours
   after the order's `cancelledAt` — this confirms the billing system has
   settled (no in-flight invoices)
4. `npm test` passes (except known pre-existing failures) — never reconcile
   against broken pricing logic

If any precondition fails, STOP and report which one failed and why.

## Steps

1. **Read the invoice data**
   Read `data/<order-id>-invoices.json`. Note the `referenceAmount` and
   each invoice line item.

2. **Compute drift**
   Run the reconciliation logic in `lib/reconciliation.js` — call
   `reconcile(orderId)` mentally or via a test harness. The result includes:
   - `invoicedTotal` — sum of all invoice amounts
   - `referenceAmount` — the expected correct total
   - `drift` — absolute difference
   - `driftPercent` — drift as % of reference
   - `withinCap` — whether drift is under the policy cap

3. **Evaluate policy**
   If `driftPercent` exceeds the 5% cap, STOP. Do not apply corrections
   above cap — escalate to finance. Report the numbers and halt.

4. **Apply correction**
   If within cap, edit `data/<order-id>-invoices.json`:
   - Add a new invoice entry with a negative `amount` equal to `-drift`
   - Set its `description` to `"Reconciliation adjustment — drift correction"`
   - Set its `invoiceId` to `"INV-<order-id-suffix>-ADJ-001"`
   - Set its `date` to the current ISO timestamp

5. **Verify**
   Run `npm test` to confirm no regressions. Then re-run reconciliation
   to verify drift is now 0.00%.

6. **Report**
   Output a summary: order ID, original drift, correction applied, new
   invoiced total, and confirmation that drift is zero.

## Constraints

- **Max 5% drift correction.** Never apply an adjustment that exceeds 5%
  of the reference amount. Corrections above this threshold require manual
  review per FIN-POL-2024-003 (Automated Billing Adjustment Limits).
- **Snapshot before mutating.** Before editing any data file, copy it to
  `.reset-snapshots/` so `reset-demo.sh` can restore the original state.
- **One adjustment per run.** Do not stack multiple reconciliation passes
  in a single invocation. If re-reconciliation shows residual drift, report
  it and stop.
- **Read-only on lib/.** This skill never edits source code in `lib/`.
  If the drift is caused by a code bug (not data mismatch), report it
  and defer to the developer.

## References

- `@lib/reconciliation.js` — drift computation logic
- `@lib/orders.js` — order records and status
- `@lib/pricing.js` — proration math (read-only context)
- `@data/ORD-0042-invoices.json` — primary reconciliation target
- `@data/ORD-0118-invoices.json` — secondary reconciliation target
