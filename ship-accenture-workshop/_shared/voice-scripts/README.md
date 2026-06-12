# voice-scripts — canonical script library

Speaker scripts seeded from the 2026-04-29 workshop voice-pass run.
One file per slide ID. Each file holds both the spoken and professor versions
with `{{token}}` placeholders replacing customer-specific terms.

## Token vocabulary

| Token | Resolved from | Example values |
|---|---|---|
| `{{vehicle}}` | `deck-profile.jsx` → `.vehicle` | `clay-sync`, `project-tracker` |
| `{{customer}}` | workshop directory name (first word) | `Clay`, `Accenture` |
| `{{skill_name}}` | `deck-profile.jsx` → `.plugins.skillName` | `/enrich`, `/reconcile` |

`voice-pass` resolves these tokens at runtime from `deck-profile.jsx` before
applying scripts to a slide manifest.

## File format

    ---
    id: Slide_Name
    tokens: ["{{vehicle}}"]   # list tokens used in this file; [] if static
    ---
    ## Spoken
    [first-person spoken prose, no bullets]

    ## Professor
    [deeper pedagogical framing — Socratic structure, explain the why]

## Coverage

- **Static slides** (`tokens: []`) — same text for every customer, no substitution needed.
- **Tokenized slides** — contain one or more `{{token}}` placeholders.
- **Excluded from library** — `Slide_Demo3`, `Slide_Demo5`, `Slide_DemoMCPReconcile`,
  `Slide_Demo7` are NOT here; demo scenarios vary too much per customer to templatize.

## Adding a slide to the library

1. Copy the approved rewrite from the voice-pass diff file.
2. Grep for the customer's `vehicle` value, the customer name, and the `plugins.skillName`
   value; replace each with `{{vehicle}}`, `{{customer}}`, or `{{skill_name}}`.
3. Create `_shared/voice-scripts/<Slide_ID>.md` using the format above.
4. Verify: grep for the customer-specific strings in `_shared/voice-scripts/` —
   all slide files should return 0 hits after seeding.
