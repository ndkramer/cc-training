// ============================================================================
// BROADCAST ANIMATION HOOKS — subset of cc-101-broadcast-source/deck/hooks.jsx
//
// Powers Cold Open (useTm), Cockpit (useStg), Recaps+Rookie (useSubSteps, Fd).
// Theme bus stripped — Expedia is light-mode only, useTheme() hardwired.
//
// Dropped vs source: useTypewriter, useCountUp, Typed3, aN, setTheme.
// ============================================================================

var BG_LIGHT = '#FAF9F5';
var BG_DARK = '#141413';
var TEXT_PRIMARY = 'rgba(15,12,8,0.88)';
var TEXT_SECONDARY = 'rgba(15,12,8,0.55)';
var CLAY = '#D97757';
var CORAL = '#E8655A';

// 8-token typography scale — used by Recap/Rookie/NoOneWay. Expedia's own
// slides have a local H2/KICKER/SUB scoped per-file; this is the broadcast
// layer's separate scale. Both can coexist.
var TYPE = {
  hero:    { fontSize: 80, fontWeight: 300, letterSpacing: '-0.04em', lineHeight: 1.0,  fontFamily: "'Anthropic Sans',system-ui" },
  h1:      { fontSize: 56, fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1.15, fontFamily: "'Anthropic Sans',system-ui" },
  h2:      { fontSize: 40, fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1.2,  fontFamily: "'Anthropic Sans',system-ui" },
  h3:      { fontSize: 28, fontWeight: 400, letterSpacing: '-0.01em', lineHeight: 1.3,  fontFamily: "'Anthropic Sans',system-ui" },
  h4:      { fontSize: 22, fontWeight: 400, letterSpacing: '-0.01em', lineHeight: 1.3,  fontFamily: "'Anthropic Sans',system-ui" },
  kicker:  { fontSize: 12, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: "'Anthropic Sans',system-ui" },
  body:    { fontSize: 16, fontWeight: 400, lineHeight: 1.55, fontFamily: "'Anthropic Sans',system-ui" },
  caption: { fontSize: 14, fontWeight: 400, lineHeight: 1.5,  fontFamily: "'Anthropic Sans',system-ui" },
};

// Light only. Broadcast's dark/light event bus with localStorage + listener
// array is dead weight here — Expedia deck has no theme toggle. Recap's
// Annot/RecapFrame still call useTheme() for T.bg/T.text/T.hr; they just
// get this object every time.
var THEMES = {
  light: {
    id: 'light',
    bg: BG_LIGHT, bgDeep: BG_LIGHT,
    text: TEXT_PRIMARY, textDim: 'rgba(15,12,8,0.62)', textFaint: 'rgba(15,12,8,0.4)',
    hr: 'rgba(15,12,8,0.08)', card: '#fff', cardBorder: 'rgba(15,12,8,0.06)',
    glow: 0.04,
  },
};
function useTheme() { return THEMES.light; }

// Print-PDF: every slide-wrapper renders as its own page, but React only marks
// the current slide active. Hooks gated on `active` would leave other pages
// blank, so in print mode we short-circuit to the settled-final state.
var IS_PRINT_PDF = typeof document !== 'undefined' &&
  document.documentElement &&
  document.documentElement.classList &&
  document.documentElement.classList.contains('print-pdf');

// ── useStg — staggered reveal ───────────────────────────────────────────────
// Returns array of arrived indices. Each slide-enter resets then refires.
function useStg(active, count, base, gap) {
  var _s = React.useState(IS_PRINT_PDF ? Array.from({ length: count }, function (_, i) { return i; }) : []), v = _s[0], setV = _s[1];
  React.useEffect(function () {
    if (IS_PRINT_PDF) return;
    if (!active) { setV([]); return; }
    var ts = [];
    for (var i = 0; i < count; i++) (function (x) {
      ts.push(setTimeout(function () { setV(function (p) { return p.concat([x]); }); }, base + x * gap));
    })(i);
    return function () { ts.forEach(clearTimeout); };
  }, [active]);
  return v;
}

// ── useTm — 50ms tick + spinner frame ───────────────────────────────────────
function useTm(active) {
  // Print mode: pin to a large settled tick so timer-gated content has long
  // since "arrived". 600_000 = 10 minutes — past every cold-open spinner.
  var _t = React.useState(IS_PRINT_PDF ? 600000 : 0), t = _t[0], st = _t[1];
  var _f = React.useState(IS_PRINT_PDF ? 0 : 0), f = _f[0], sf = _f[1];
  React.useEffect(function () {
    if (IS_PRINT_PDF) return;
    if (!active) { st(0); sf(0); return; }
    var i1 = setInterval(function () { st(function (x) { return x + 50; }); }, 50);
    var i2 = setInterval(function () { sf(function (x) { return x + 1; }); }, 120);
    return function () { clearInterval(i1); clearInterval(i2); };
  }, [active]);
  return { t: t, f: f, reset: function () { st(0); sf(0); } };
}

// ── Fd — fade/translate wrapper ─────────────────────────────────────────────
function Fd(props) {
  return React.createElement('div', {
    style: Object.assign({
      opacity: props.vis ? 1 : 0,
      transform: props.vis ? 'translate(0,0)' : 'translate(' + (props.x || 0) + 'px,' + (props.y || 20) + 'px)',
      transition: 'all ' + (props.dur || '0.6s') + ' cubic-bezier(0.22,1,0.36,1)',
    }, props.style || {})
  }, props.children);
}

// ── useSubSteps — presenter-click in-slide nav ──────────────────────────────
// registerSubNav is null when slide isn't active → effect is a no-op, so
// only the active slide can intercept arrow keys. Returning true consumes
// the keypress; false yields back to the deck (advance slide).
function useSubSteps(count, registerSubNav) {
  // Print mode: pin to final step so multi-step slides print fully revealed.
  var _s = React.useState(IS_PRINT_PDF ? count : 0), step = _s[0], setStep = _s[1];
  var stepRef = React.useRef(step);
  stepRef.current = step;

  React.useEffect(function () {
    if (IS_PRINT_PDF) return;
    if (!registerSubNav) return;
    var unregister = registerSubNav(function (dir) {
      if (dir > 0) {
        if (stepRef.current < count) { setStep(stepRef.current + 1); return true; }
        return false;
      } else {
        if (stepRef.current > 0) { setStep(stepRef.current - 1); return true; }
        return false;
      }
    });
    return unregister;
  }, [registerSubNav, count]);

  // reset when registerSubNav identity changes (slide becomes active again)
  React.useEffect(function () { if (!IS_PRINT_PDF) setStep(0); }, [registerSubNav]);

  return { step: step, atEnd: step >= count };
}

// ── Cursor — blinking block. @keyframes blink in deck.html ──────────────────
function Cursor(props) {
  return React.createElement('span', {
    style: {
      display: 'inline-block',
      width: props.w || 10, height: props.h || '1em',
      background: props.color || CLAY,
      animation: 'blink 1s step-end infinite',
      verticalAlign: 'text-bottom', marginLeft: 2,
    }
  });
}

// ── ClawdLogo — pixel-clawd + version banner ────────────────────────────────
function ClawdLogo(props) {
  props = props || {};
  return React.createElement('div', {
    style: { display: 'flex', alignItems: 'center', gap: 12, minHeight: 3 * TERM.lineHeight },
  },
    React.createElement('div', { style: { width: 54, height: 36 } },
      React.createElement('img', {
        src: 'assets/clawd.png',
        style: { width: '100%', height: '100%', imageRendering: 'pixelated', objectFit: 'contain' },
      })),
    React.createElement('div', { style: { display: 'flex', flexDirection: 'column' } },
      React.createElement('div', null,
        React.createElement(Bold, null, 'Claude Code'), ' ',
        React.createElement(Gray, null, props.version || 'v2.x')),
      React.createElement('div', null,
        React.createElement(Gray, null, (props.model || 'Opus') + (props.org ? ' \u00b7 ' + props.org : ''))),
      React.createElement('div', null,
        React.createElement(Gray, null, props.path || '~/project'))));
}

// ── Spin — spinner line. Cold Open "Thinking…" phase ────────────────────────
var SPIN_CHARS = ['\u00b7', '\u2726', '\u2733', '\u2736', '\u273B', '\u273D', '\u273B', '\u2736', '\u2733', '\u2726'];
function Spin(props) {
  return React.createElement(Line, null,
    React.createElement(ClaudeOrange, null, SPIN_CHARS[props.frame % SPIN_CHARS.length]),
    ' ', React.createElement(ClaudeOrange, null, props.verb + '\u2026'),
    ' ', React.createElement(Gray, null, '(esc to interrupt)'));
}

// ── useCountUp — single-fire counter (Boris's 20 PRs) ───────────────────────
// Added back from cc-101-broadcast-source/deck/hooks.jsx — Expedia dropped it
// because they skipped the full Boris 3-beat.
function useCountUp(target, trigger, duration) {
  duration = duration || 1200;
  var _v = React.useState(0), v = _v[0], setV = _v[1];
  React.useEffect(function () {
    if (!trigger) { setV(0); return; }
    var start = Date.now();
    var id = setInterval(function () {
      var e = Date.now() - start;
      var p = Math.min(1, e / duration);
      setV(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p >= 1) clearInterval(id);
    }, 16);
    return function () { clearInterval(id); };
  }, [trigger, target, duration]);
  return v;
}

// ── ContinueHint — substage nudge for multi-step slides (Lina port) ─────────
function ContinueHint(props) {
  return React.createElement('div', { style: {
    position: 'absolute', bottom: 50, left: '50%', transform: 'translateX(-50%)',
    opacity: props.visible ? 0.45 : 0, transition: 'opacity 1s ease 0.5s',
    color: 'rgba(15,12,8,0.45)', fontSize: 13, fontFamily: "'JetBrains Mono', monospace",
    display: 'flex', alignItems: 'center', gap: 8,
  }},
    'press ', React.createElement('span', { style: {
      background: 'rgba(15,12,8,0.06)', padding: '2px 8px', borderRadius: 4,
      border: '1px solid rgba(15,12,8,0.1)',
    }}, '\u2192'), ' to continue');
}

// ── Exports ─────────────────────────────────────────────────────────────────
Object.assign(window, {
  BG_LIGHT: BG_LIGHT, BG_DARK: BG_DARK, TEXT_PRIMARY: TEXT_PRIMARY, TEXT_SECONDARY: TEXT_SECONDARY,
  CLAY: CLAY, CORAL: CORAL, THEMES: THEMES, TYPE: TYPE,
  useTheme: useTheme, useStg: useStg, useTm: useTm, Fd: Fd, useSubSteps: useSubSteps,
  Cursor: Cursor, ClawdLogo: ClawdLogo, Spin: Spin, SPIN_CHARS: SPIN_CHARS,
  useCountUp: useCountUp, ContinueHint: ContinueHint,
  // Lina-port name aliases — her slides reference these, identical contracts
  useStagger3: useStg, useTimer3: useTm, Fade3: Fd, Spin3: Spin,
});
