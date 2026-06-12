---
id: Slide_UltraReview
tokens: []
---
## Spoken

So /ultrareview. User-triggered, billed multi-agent review of the current branch. /ultrareview bundles your local; /ultrareview <PR#> reviews a GitHub PR. Needs a git repo — offer to git init if you're not in one.

Agents take different angles — correctness, security, perf, style — and the findings consolidate and de-dupe. /ultraplan is the planning variant. The 'security review at scale' beat: frame it as CI for the parts CI can't check.

## Professor

The key insight about /ultrareview is structural: this is the place to put the review work CI was never built to do.

Notice what /ultrareview actually does. It's user-triggered — you decide when to spend the tokens — and billed because the agents fan out and reason in parallel. /ultrareview with no argument bundles your local branch; /ultrareview <PR#> pulls a GitHub PR and reviews that instead. It needs a git repo, so the first thing it checks is whether you're in one, and offers to git init if not.

Consider what happens during the review. Agents take different angles — correctness, security, performance, style — each one looking at the same diff through a different lens. The findings consolidate and de-dupe so you don't read the same comment four times. /ultraplan is the same machinery applied to planning.

The reason this matters is that CI is excellent at the mechanical checks — lint, type, tests — and structurally weak at the judgment calls. Is this design sound? Security concerns in the auth flow? Perf at scale? Those are the questions /ultrareview is designed to answer. The implication: CI for the parts CI can't check.
