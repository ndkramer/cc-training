// ═══════════════════════════════════════════════════════════════════
// DECK LAYOUT HELPERS (SHARED)
// SplitBg + AbsHeader — the two recurring split-bg patterns.
//
// Self-contained (inlines BONE/OAT/CLAY/GRAY — these are brand constants,
// not theme vars). Load AFTER deck-components.jsx (needs Slide on window).
//
// Adoption is opt-in: existing inline-CSS split-bg slides keep working.
// Converting a slide means deleting ~20L of boilerplate per instance.
// ═══════════════════════════════════════════════════════════════════

{
const _BONE = '#FAF9F5', _OAT = '#F0EEE6', _CLAY = '#D97757', _GRAY = '#73726C';
const _SERIF = "'Anthropic Serif', Georgia, serif";

// Split-bg: BONE left (cards/text), OAT right (code/terminal).
// Viewport-centered at 50% — the gradient and the flex split land on the
// same seam (feedback_split_bg_viewport_gradient.md). The inner column
// backgrounds are redundant with the gradient but defend against rounding
// drift if the flex basis ever gets perturbed.
//
// Left column vertically centers its children. Right column does too
// (alignItems on a row-flex container). Caller owns internal layout —
// if you want stacked cards with gap, wrap them yourself.
//
// leftPad default 40px 44px matches the abs-header slides (PlanMode/Hooks).
// ClaudeMdNesting uses 52px 44px — pass leftPad explicitly if header is
// inline (not abs) and needs top breathing room.
function SplitBg({ left, right, label, leftPad, rightPad }) {
  return (
    <Slide bg={'linear-gradient(to right, ' + _BONE + ' 50%, ' + _OAT + ' 50%)'} padding="0" label={label}>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{
          flex: '0 0 50%', background: _BONE, padding: leftPad || '40px 44px',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
        }}>
          {left}
        </div>
        <div style={{
          flex: 1, background: _OAT, padding: rightPad || '40px 36px',
          display: 'flex', alignItems: 'center',
        }}>
          {right}
        </div>
      </div>
    </Slide>
  );
}

// Abs-header: kicker+h2+sub positioned ABOVE a content block via bottom:100%.
// Use when left-column cards should align with right-column terminal-top.
// Without this trick the header's ~100px height pushes cards south of where
// the eye expects them (feedback_split_column_top_align.md).
//
// The outer relative wrapper is WHAT GETS CENTERED by SplitBg's left column.
// The abs header hangs above it without contributing to centering height.
function AbsHeader({ kicker, h2, sub, children }) {
  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', bottom: '100%', left: 0, right: 0, paddingBottom: 14 }}>
        {kicker && <div style={{
          fontSize: 12, fontWeight: 600, color: _CLAY,
          textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10,
        }}>{kicker}</div>}
        <h2 style={{ fontFamily: _SERIF, fontSize: 30, fontWeight: 400, marginBottom: 6 }}>{h2}</h2>
        {sub && <p style={{ fontSize: 12.5, color: _GRAY, marginBottom: 0, lineHeight: 1.5 }}>{sub}</p>}
      </div>
      {children}
    </div>
  );
}

Object.assign(window, { SplitBg, AbsHeader });
}
