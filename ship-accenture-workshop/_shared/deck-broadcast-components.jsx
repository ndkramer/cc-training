// ============================================================================
// BROADCAST TERMINAL PRIMITIVES — char-grid layer (parallel to T-prefixed set)
//
// Subset of cc-101-broadcast-source/components.jsx (613 → ~200 lines).
// Expedia's T-prefixed primitives (TLine, TGray, TerminalMockup…) take a
// pixel width; these take a CHARACTER width and compute pixels from the
// 6×13 grid in TERM. The Recap annotation top offsets are calibrated to
// this grid — don't swap one Terminal for the other.
//
// Kept only what Cold Open + Recaps call. Dropped: syntax highlighting,
// menus, settings, slash-input, permission dialog, Logo (ClawdLogo replaces).
// ============================================================================

// ── Container ───────────────────────────────────────────────────────────────

function Terminal({ width = 80, height = 24, children, title = '' }) {
  const pxWidth = width * TERM.charWidth + 40;   // 40 = 2 × 20px horizontal padding
  const pxHeight = height * TERM.lineHeight + 32; // 32 = 2 × 16px vertical padding
  return (
    <div style={{
      background: '#1a1918', borderRadius: 8, overflow: 'hidden',
      boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
      outline: '1px solid rgba(255,255,255,0.08)',
      display: 'inline-block',
    }}>
      <div style={{
        background: '#252321', padding: '8px 12px',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27ca40' }} />
        {title && <span style={{ marginLeft: 'auto', color: COLORS.gray, fontSize: 11, fontFamily: TERM.font }}>{title}</span>}
      </div>
      <div style={{
        background: COLORS.termBg, padding: '16px 20px',
        fontFamily: TERM.font, fontSize: TERM.fontSize,
        lineHeight: TERM.lineHeight + 'px', color: COLORS.termFg,
        whiteSpace: 'pre', width: pxWidth, minHeight: pxHeight,
        boxSizing: 'border-box',
      }}>
        {children}
      </div>
    </div>
  );
}

function Line({ children, indent = 0 }) {
  return (
    <div style={{
      height: TERM.lineHeight, lineHeight: TERM.lineHeight + 'px',
      paddingLeft: indent * TERM.charWidth,
    }}>{children}</div>
  );
}

function Spacer({ lines = 1 }) {
  return <div style={{ height: lines * TERM.lineHeight }} />;
}

// ── Text color wrappers ─────────────────────────────────────────────────────

function Gray({ children })         { return <span style={{ color: COLORS.gray }}>{children}</span>; }
function Subtle({ children })       { return <span style={{ color: COLORS.subtle }}>{children}</span>; }
function Green({ children })        { return <span style={{ color: COLORS.green }}>{children}</span>; }
function Yellow({ children })       { return <span style={{ color: COLORS.yellow }}>{children}</span>; }
function ClaudeOrange({ children }) { return <span style={{ color: COLORS.claudeOrange }}>{children}</span>; }
function White({ children })        { return <span style={{ color: COLORS.white }}>{children}</span>; }
function Bold({ children })         { return <span style={{ fontWeight: 600 }}>{children}</span>; }
function Dim({ children })          { return <span style={{ opacity: 0.7 }}>{children}</span>; }
function Inverse({ children })      { return <span style={{ background: COLORS.inverseBg, color: COLORS.inverseFg }}>{children}</span>; }

// ── Layout ──────────────────────────────────────────────────────────────────

function Hr({ width = 80, color = COLORS.dimGray }) {
  return <Line><span style={{ color, opacity: 0.7 }}>{'─'.repeat(width)}</span></Line>;
}

function Spread({ left, right, width = 80 }) {
  return (
    <Line>
      <span style={{ display: 'inline-flex', width: width * TERM.charWidth, justifyContent: 'space-between' }}>
        <span>{left}</span>
        <span>{right}</span>
      </span>
    </Line>
  );
}

// ── Prompt / message lines ──────────────────────────────────────────────────

function InputBox({ content = '', placeholder = '' }) {
  return (
    <>
      <Hr />
      <Line>
        <Subtle>{'❯ '}</Subtle>
        {content ? (
          <span style={{ background: COLORS.userMsgBg, color: COLORS.white }}>{content}</span>
        ) : placeholder ? (
          <Dim>{placeholder}</Dim>
        ) : (
          <Inverse> </Inverse>
        )}
      </Line>
      <Hr />
    </>
  );
}

function UserMessage({ children }) {
  return (
    <Line>
      <span style={{ background: COLORS.userMsgBg, color: COLORS.white }}>{'❯ '}{children}{' '}</span>
    </Line>
  );
}

function AssistantBullet() {
  return <White>{'⏺ '}</White>;
}

// ── Tool calls ──────────────────────────────────────────────────────────────

function ToolCallSuccess({ name, args = '', hint = '' }) {
  return (
    <Line>
      <Green>{'⏺'}</Green>{' '}<Bold>{name}</Bold>{args && `(${args})`}{hint && <> <Gray>{hint}</Gray></>}
    </Line>
  );
}

// ── Diff lines (used by RecapEx1 for the >= fix) ────────────────────────────

function DiffAdded({ num, children, padWidth = 70 }) {
  const content = typeof children === 'string' ? children : '';
  return (
    <Line>
      <span style={{ color: COLORS.diffAddedFg, background: COLORS.diffAddedBg }}>
        {String(num).padStart(2)} +
      </span>
      <span style={{ background: COLORS.diffAddedBg }}>
        {children}{' '.repeat(Math.max(0, padWidth - content.length))}
      </span>
    </Line>
  );
}

function DiffRemoved({ num, children, padWidth = 70 }) {
  const content = typeof children === 'string' ? children : '';
  return (
    <Line>
      <span style={{ color: COLORS.diffRemovedFg, background: COLORS.diffRemovedBg }}>
        {String(num).padStart(2)} -
      </span>
      <span style={{ background: COLORS.diffRemovedBg }}>
        {children}{' '.repeat(Math.max(0, padWidth - content.length))}
      </span>
    </Line>
  );
}

// ── Status bar ──────────────────────────────────────────────────────────────

function StatusBar({ leftHint = '? for shortcuts', rightStatus = '' }) {
  return (
    <Spread
      left={<><span>{'  '}</span><Gray>{leftHint}</Gray></>}
      right={rightStatus ? <Gray>{rightStatus}</Gray> : null}
    />
  );
}

// ── Exports ─────────────────────────────────────────────────────────────────
// No collision with Expedia's T-prefixed set. Both live side by side.
Object.assign(window, {
  Terminal, Line, Spacer,
  Gray, Subtle, Green, Yellow, ClaudeOrange, White, Bold, Dim, Inverse,
  Hr, Spread,
  InputBox, UserMessage, AssistantBullet,
  ToolCallSuccess, DiffAdded, DiffRemoved,
  StatusBar,
});
