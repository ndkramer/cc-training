---
name: triage
description: "Run tests, classify an order by priority score, and show its SLA. Usage: /triage <score>"
---

Run `npm test` first. If any tests fail, stop and report which test failed — do not continue.

Read `lib/tiers.js` to confirm the current tier thresholds.

Given the priority score in the user's message (default to 80 if none provided):

1. Classify the score using the thresholds in tiers.js
   - high   : 80–100  (score >= 80)
   - medium : 51–79   (score > 50)
   - low    :  0–50   (everything else)

2. Look up the SLA for that tier using slaForTier in tiers.js
   - high: 1 business day
   - medium: 3 business days
   - low: 5 business days

3. Report the result as a one-line summary:
   "Score <N> → tier: <tier>, SLA: <N> business day(s)"

Do not modify any files. This is a read-only diagnostic.
