# order-service-exercise — Claude Code Workshop

A minimal B2B order management library. One test fails on a fresh clone.
Fix the bug, teach Claude the repo, and package the workflow as a skill.

## Setup

```bash
cd order-service-exercise
npm install && npm test   # expect: most passing, 1 failing — that's the starting point
```

No install required for the core exercises. Tests run on plain `node --test`
and import `lib/` directly — no bundler, no build step.

## Structure

```
lib/orders.js            ← shared order helpers (elapsed days, summaries)
lib/pricing.js           ← volume discount pricing. Clean — no bugs here.
lib/tiers.js             ← priority tier classification. THE BUG LIVES HERE.
test/orders.test.js      ← 2 tests. All passing.
test/pricing.test.js     ← 5 tests. All passing.
test/tiers.test.js       ← 6 tests. One fails. Your target for Exercise 1.
CLAUDE.md                ← sparse TODOs. Exercise 2 fills these in.
exercise-guide.md        ← step-by-step instructions
```

---

## Exercise 1 — Find the boundary bug (12 min)

Open `claude` in this directory. One test is red. You don't know why yet.

Paste this prompt:

> *"npm test is failing in order-service-exercise. Find and fix it."*

Watch Claude run the test, read the failure, open `lib/tiers.js`, spot the
comparison operator, and patch it. If it proposes changing the test instead
of the code, push back.

**Done when:** `npm test` → all passing. Claude found the `> 80` and changed
it to `>= 80`.

---

## Reset between runs

```bash
./reset-demo.sh   # re-plants the bug, restores sparse CLAUDE.md, clears skills
```
