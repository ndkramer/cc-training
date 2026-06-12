// ============================================================================
// deck-slides-broadcast.jsx — SHARED across all broadcast decks.
// Ported from Expedia 2.5h + cc-101-broadcast-source.
// ColdOpen, WhatIsLoop, NoOneWay, Boris (3-beat), Where (4-surface),
// RecapEx1-4, Rookie. All use useSubSteps → requires active + registerSubNav.
//
// Reads window.DECK_PROFILE for vehicle-specific strings (ColdOpen msg/tools/
// path/title/cobrand). Decks that need prose rewrites (Zoox's WhatIsLoop) or
// custom RecapEx replays override via load-last in deck-slides-{customer}.jsx.
// ============================================================================

// Profile shorthand. Fallback to empty so slides degrade gracefully if a deck
// forgets to load deck-profile.jsx (shows "~/undefined" etc — obvious at eye-check).
var _P = window.DECK_PROFILE || {};
var _CO = _P.coldOpen || {};

var _IS_PRINT = document.documentElement.classList.contains('print-pdf');
function _printAll(n) { var a = []; for (var i = 0; i < n; i++) a.push(i); return a; }

// ── Locally-defined helpers (dropped from Generic's deck-broadcast-hooks.jsx) ──
// DISPLAY_NUM: tabular numerics for counters/timestamps. Source: cc-101 hooks.jsx:15.
var DISPLAY_NUM = { fontFamily: "'Anthropic Sans',system-ui", fontVariantNumeric: 'tabular-nums', fontFeatureSettings: '"tnum"' };

// Red: COLORS.red exists but no wrapper component was exported. RecapEx1 needs it.
function Red(props) { return React.createElement('span', { style: { color: COLORS.red } }, props.children); }

// Typed3: progress-driven (0..1) input-box typewriter. Source: cc-101 hooks.jsx:215.
// DemoCLI in Slide_Where uses this; Generic's hooks dropped it.
function Typed3(props) {
  var n = Math.floor(props.text.length * Math.min(1, props.progress));
  return React.createElement(React.Fragment, null,
    React.createElement(Hr, null),
    React.createElement(Line, null,
      React.createElement(Subtle, null, '\u276F '),
      React.createElement('span', { style: { background: COLORS.userMsgBg, color: COLORS.white } }, props.text.slice(0, n)),
      n < props.text.length && React.createElement(Inverse, null, ' ')),
    React.createElement(Hr, null));
}


// ============================================================================
// TWEET CARD — self-contained, only external dep is window.CLAY
// Verbatim from Expedia deck-slides-broadcast.jsx:23-75.
// ============================================================================

function TweetStat(props) {
  var paths = {
    reply: 'M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01z',
    rt: 'M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM19.5 20.12l-4.432-4.14 1.364-1.46L18.5 16.45V8c0-1.1-.896-2-2-2H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14z',
    like: 'M20.884 13.19c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z',
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <svg width="16" height="16" viewBox="0 0 24 24" style={{ fill: props.color || '#536471' }}>
        <path d={paths[props.icon]} />
      </svg>
      <span style={{ color: props.color || '#536471', fontWeight: props.color ? 600 : 400 }}>{props.n}</span>
    </div>
  );
}

function TweetCard(props) {
  return (
    <div style={{
      width: 480, background: '#fff', borderRadius: 16,
      border: '1px solid rgba(15,12,8,0.08)',
      boxShadow: '0 24px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.04)',
      padding: '20px 22px', fontFamily: "'Anthropic Sans',system-ui",
      transform: 'rotate(' + (props.rotate || 0) + 'deg)',
      transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
        <img src={props.avatar}
             style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', background: '#eee' }} />
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontWeight: 700, fontSize: 15, color: '#0f1419' }}>{props.name}</span>
            {props.verified && <svg width="18" height="18" viewBox="0 0 24 24" style={{ fill: CLAY }}>
              <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.67-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.27 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.67-.88 3.33-2.19c1.4.46 2.91.2 3.92-.81s1.26-2.52.8-3.91c1.32-.67 2.2-1.91 2.2-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z" />
            </svg>}
          </div>
          <div style={{ fontSize: 14, color: '#536471' }}>@{props.handle}</div>
        </div>
        <svg width="20" height="20" viewBox="0 0 24 24" style={{ fill: '#0f1419' }}>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </div>
      <p style={{ fontSize: 18, lineHeight: 1.4, color: '#0f1419', margin: '6px 0 14px', fontWeight: 400 }}>{props.body}</p>
      <div style={{ fontSize: 14, color: '#536471', marginBottom: 12 }}>{props.date}</div>
      <div style={{ height: 1, background: 'rgba(15,12,8,0.08)', marginBottom: 12 }} />
      <div style={{ display: 'flex', gap: 28, fontSize: 13, color: '#536471' }}>
        <TweetStat icon="reply" n={props.replies} />
        <TweetStat icon="rt" n={props.rts} />
        <TweetStat icon="like" n={props.likes} color={CLAY} />
      </div>
    </div>
  );
}


// ============================================================================
// PHONE FRAME + SESSION CARD — CSS clay-line bezel. Brand-coherent with Clawd.
// Verbatim React.createElement from cc-101-broadcast-source/deck/phone-frame.jsx.
// Kept R.cE (complex frame, converting risks breakage). Only dep is CLAY.
// ============================================================================

function PhoneFrame(props) {
  var w = props.width || 300;
  var h = props.height || 620;
  var time = props.time || '7:14';
  // Compact mode: shrink status bar + island for short/landscape frames (timeline cards)
  var compact = props.compact || h < 200;
  var statusH = compact ? 34 : 54;
  var islandW = compact ? 80 : 118;
  var islandH = compact ? 22 : 32;
  var statusPad = compact ? 18 : 32;
  var contentPad = compact ? 40 : 60;
  // Corner radius scales down for wider frames — prevents the "giant iPhone" look.
  // 0.14 multiplier ≈ real iPhone proportion (55pt/393pt); cap at 48 keeps Boris (475w) unchanged.
  var outerR = Math.min(48, Math.round(w * 0.14));
  var innerR = outerR - 8;
  return React.createElement('div', {
    style: {
      width: w, height: h, position: 'relative',
      background: BG_DARK, borderRadius: outerR,
      padding: 8,
      border: '2px solid ' + CLAY,
      boxShadow: 'inset 0 0 0 1px rgba(217,119,87,0.15), 0 24px 60px -20px rgba(217,119,87,0.35), 0 8px 24px rgba(0,0,0,0.4)',
      transform: 'rotate(' + (props.tilt || 0) + 'deg)',
      transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)',
    }
  },
    // screen
    React.createElement('div', {
      style: {
        width: '100%', height: '100%', background: '#1a1918',
        borderRadius: innerR, overflow: 'hidden', position: 'relative',
        border: '1px solid rgba(255,255,255,0.04)',
      }
    },
      // Dynamic Island — scales down in compact mode, camera dot
      React.createElement('div', {
        style: {
          position: 'absolute', top: compact ? 8 : 14, left: '50%', transform: 'translateX(-50%)',
          width: islandW, height: islandH, background: '#000', borderRadius: islandH / 2, zIndex: 10,
          display: 'flex', alignItems: 'center', paddingLeft: compact ? 8 : 12,
        }
      },
        React.createElement('div', {
          style: { width: compact ? 8 : 11, height: compact ? 8 : 11, borderRadius: '50%', border: '1.5px solid rgba(217,119,87,0.3)', background: 'rgba(20,20,19,0.8)' }
        })),
      // status bar
      React.createElement('div', {
        style: {
          position: 'absolute', top: 0, left: 0, right: 0, height: statusH,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 ' + statusPad + 'px', fontSize: compact ? 12 : 15, fontWeight: 600, color: '#fff',
          fontFamily: "'Anthropic Sans',system-ui", zIndex: 5,
          fontVariantNumeric: 'tabular-nums',
        }
      },
        React.createElement('span', null, time),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5 } },
          React.createElement('svg', { width: 17, height: 11, viewBox: '0 0 17 11' },
            [3, 5, 7, 10].map(function (barH, i) {
              return React.createElement('rect', { key: i, x: i * 4.5, y: 11 - barH, width: 3, height: barH, rx: 0.8, fill: '#fff' });
            })),
          React.createElement('svg', { width: 24, height: 12, viewBox: '0 0 24 12' },
            React.createElement('rect', { x: 0.5, y: 0.5, width: 20, height: 11, rx: 3, fill: 'none', stroke: '#fff', strokeOpacity: 0.35, strokeWidth: 1 }),
            React.createElement('rect', { x: 2, y: 2, width: 15, height: 8, rx: 1.5, fill: '#fff' }),
            React.createElement('rect', { x: 22, y: 4, width: 1.5, height: 4, rx: 0.75, fill: '#fff', fillOpacity: 0.35 })))),
      // content area (below status+island)
      React.createElement('div', { style: { paddingTop: contentPad, height: '100%', boxSizing: 'border-box' } }, props.children)));
}

// Session card — ellipsis on overflow, no awkward wraps
function PhoneSessionCard(props) {
  var colors = { running: CLAY, done: COLORS.green, waiting: '#6A9BCC' };
  var icons = { running: SPIN_CHARS[props.frame % SPIN_CHARS.length], done: '\u2714', waiting: '\u25CB' };
  return React.createElement('div', {
    style: {
      margin: '0 10px 8px', padding: '13px 14px',
      background: 'rgba(255,255,255,0.04)', borderRadius: 12,
      border: '1px solid rgba(255,255,255,0.06)',
      display: 'flex', alignItems: 'center', gap: 12,
    }
  },
    React.createElement('span', {
      style: { color: colors[props.status], fontSize: 15, fontFamily: "'JetBrains Mono',monospace", width: 16, flexShrink: 0, textAlign: 'center' }
    }, icons[props.status]),
    React.createElement('div', { style: { flex: 1, minWidth: 0 } },
      React.createElement('div', {
        style: { fontSize: 13, color: '#fff', fontFamily: "'JetBrains Mono',monospace", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }
      }, props.title),
      props.sub && React.createElement('div', {
        style: { fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }
      }, props.sub)));
}


// ============================================================================
// ANNOT + RECAP FRAME — pulsing dot → connector → pill with label/sublabel
// Verbatim from Expedia deck-slides-broadcast.jsx:85-154.
// Top offsets are pixel-calibrated to Terminal's 13px line height — do not
// swap in Generic's TerminalMockup here.
// ============================================================================

function Annot(props) {
  var T = useTheme();
  var border = props.color || CLAY;
  var isActive = props.active;
  var pillBg = T.id === 'light' ? '#fff' : BG_DARK;
  return (
    <div style={{
      position: 'absolute', right: -10, top: props.top,
      opacity: props.vis ? (isActive ? 1 : 0.55) : 0,
      transform: props.vis
        ? (isActive ? 'translateX(0) scale(1)' : 'translateX(12px) scale(0.94)')
        : 'translateX(48px) scale(0.9)',
      transformOrigin: 'right center',
      transition: 'all 0.55s cubic-bezier(0.22,1,0.36,1)',
      display: 'flex', alignItems: 'flex-start', gap: 0, zIndex: isActive ? 22 : 20,
      pointerEvents: 'none',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
        <div style={{
          width: 6, height: 6, borderRadius: '50%', background: border,
          boxShadow: isActive ? '0 0 0 4px ' + border + '33, 0 0 12px ' + border + '80' : 'none',
          animation: isActive ? 'annotPulse 1.8s ease-in-out infinite' : 'none',
          transition: 'box-shadow 0.4s',
        }} />
        <div style={{ width: 28, height: 1, background: border, opacity: isActive ? 0.6 : 0.25 }} />
      </div>
      <div style={{
        background: pillBg, border: '1px solid ' + border, borderRadius: 8, padding: '9px 16px',
        boxShadow: isActive
          ? '0 8px 28px rgba(0,0,0,' + (T.id === 'light' ? '0.12' : '0.5') + '), 0 0 0 1px ' + border + '22, 0 0 20px ' + border + '1a'
          : '0 2px 10px rgba(0,0,0,' + (T.id === 'light' ? '0.06' : '0.3') + ')',
        maxWidth: 200, transition: 'box-shadow 0.4s',
      }}>
        <div style={{ fontSize: 11, fontFamily: TERM.font, fontWeight: 700, color: border, textTransform: 'uppercase', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>{props.label}</div>
        {props.sub && <div style={{ fontSize: 11, color: T.textDim, marginTop: 4, lineHeight: 1.4 }}>{props.sub}</div>}
      </div>
    </div>
  );
}

function RecapFrame(props) {
  var T = useTheme();
  return (
    <div style={{ width: '100%', height: '100%', background: T.bg, position: 'relative', overflow: 'hidden', fontFamily: "'Anthropic Sans',system-ui" }}>
      {/* header pill */}
      <div style={{ position: 'absolute', top: 40, left: 56, zIndex: 30, display: 'flex', alignItems: 'center', gap: 14 }}>
        <span style={Object.assign({ background: CLAY, color: '#fff', padding: '5px 14px', borderRadius: 5, fontFamily: TERM.font }, TYPE.kicker, { fontSize: 10 })}>Recap</span>
        <span style={Object.assign({ color: T.textFaint }, TYPE.kicker, { fontWeight: 400, textTransform: 'none', letterSpacing: 0 })}>{props.kicker}</span>
        <span style={Object.assign({ color: T.text, marginLeft: 8 }, TYPE.h4)}>{props.title}</span>
      </div>

      {/* terminal + annots — terminal offset left to make room for annot pills on right */}
      <div style={{ position: 'absolute', top: '53%', left: '45%', transform: 'translate(-50%,-50%)', width: 820 }}>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', inset: -50, borderRadius: 40, background: 'radial-gradient(ellipse, rgba(215,119,87,' + T.glow + ') 0%, transparent 65%)', filter: 'blur(20px)', zIndex: 0 }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Terminal width={106} height={27} title={props.termTitle}>{props.termBody}</Terminal>
          </div>
          {props.annots}
        </div>
      </div>

      {/* closer line */}
      <Fd vis={props.showCloser} y={10}
          style={{ position: 'absolute', bottom: 48, left: '50%', transform: 'translateX(-50%)', zIndex: 30 }}>
        <p style={Object.assign({ color: CLAY, fontWeight: 500, fontStyle: 'italic' }, TYPE.body)}>{props.closer}</p>
      </Fd>
    </div>
  );
}


// ============================================================================
// ROOKIE CARD — symptom/why/fix. Hardcoded clawd.png (GIFs don't exist).
// ============================================================================

// 2-col grid layout — 6 cards stacked vertically overflowed at 768px.
// Clawd shrunk 72→44px and text tightened; symptom lines wrap at ~430px
// but 3 rows instead of 6 nets ~200px headroom.
function _RookieCard(props) {
  var T = useTheme();
  var m = props.move;
  return (
    <Fd vis={props.vis} y={14}>
      <div style={{
        display: 'flex', alignItems: 'flex-start', gap: 12,
        opacity: props.active ? 1 : (props.vis ? 0.5 : 0),
        transition: 'opacity 0.4s',
      }}>
        {/* Static clawd.png — animated GIFs not on disk, swap later if sourced */}
        <img src="assets/clawd.png"
             style={{ flex: '0 0 44px', width: 44, height: 'auto', imageRendering: 'pixelated', marginTop: 2 }} />
        <div style={{
          flex: 1, borderLeft: '3px solid ' + (props.active ? CLAY : T.hr),
          paddingLeft: 12, minWidth: 0,
          transition: 'border-color 0.4s',
        }}>
          <p style={Object.assign({ color: T.text, fontStyle: 'italic', marginBottom: 3 }, TYPE.body, { fontSize: 14, lineHeight: 1.3 })}>{m.symptom}</p>
          <p style={Object.assign({ color: T.textFaint, marginBottom: 6 }, TYPE.caption, { fontSize: 11.5, lineHeight: 1.35 })}>{m.why}</p>
          <div style={{ fontFamily: TERM.font, fontSize: 11.5, color: CLAY, fontWeight: 500, marginBottom: 2 }}>{m.fix}</div>
          <p style={Object.assign({ color: T.textDim }, TYPE.caption, { fontSize: 11.5, lineHeight: 1.35 })}>{m.fixNote}</p>
        </div>
      </div>
    </Fd>
  );
}


// ============================================================================
// #1 — COLD OPEN
// 7.2s auto-play: cursor → `$ claude` → terminal scales in → tool cascade
// → 4/4 green → title overlay. Reads vehicle/msg/bugFile/title/subtitle/cobrand
// from DECK_PROFILE.coldOpen.
// ============================================================================

function Slide_ColdOpen(props) {
  // Gate: cursor blinks until the presenter hits Enter/Space/Arrow. The
  // first forward-nav is consumed to arm the animation; subsequent ones
  // yield back to the deck. `useTm` resets itself whenever its arg goes
  // false→true, so arming starts the clock cleanly at zero.
  var _armed = React.useState(false), armed = _armed[0], setArmed = _armed[1];
  var armedRef = React.useRef(armed); armedRef.current = armed;
  React.useEffect(function () { setArmed(false); }, [props.registerSubNav]);
  React.useEffect(function () {
    if (!props.registerSubNav) return;
    return props.registerSubNav(function (dir) {
      if (dir > 0 && !armedRef.current) { setArmed(true); return true; }
      return false;
    });
  }, [props.registerSubNav]);

  // phase gates (ms). t is offset by P.enter once armed — the cursor/typeCmd
  // phases are now the indefinite idle, so effective runtime is ~5.6s post-arm.
  var P = {
    cursor:  0,
    typeCmd: 800,
    enter:   1600,
    logo:    2100,
    typeMsg: 2400,
    spin:    3900,
    tools:   4500,
    green:   5800,
    title:   7200,
  };

  var tm = useTm(props.active && armed);
  // print: snap to final. armed: start t at P.enter so terminal scales in
  // immediately (skip the now-redundant typeCmd replay). idle: t stays 0.
  var t = _IS_PRINT ? 99999 : (armed ? tm.t + P.enter : 0);

  var cmdTxt = '$ claude';
  var msgTxt = _CO.msg || 'npm test is failing';
  var cmdChars = Math.min(cmdTxt.length, Math.max(0, Math.floor((t - P.typeCmd) / 80)));
  var msgChars = Math.min(msgTxt.length, Math.max(0, Math.floor((t - P.typeMsg) / 45)));

  var showTerm = t >= P.enter;
  var termScale = showTerm ? 1 : 0.3;
  var termOpacity = showTerm ? 1 : 0;

  // All decks so far use the same Read→Edit→Bash rhythm; only the file path
  // varies. If a deck needs a different tool sequence, override Slide_ColdOpen
  // via load-last in deck-slides-{customer}.jsx.
  var bugFile = _CO.bugFile || 'lib/foo.js';
  var tools = [
    { at: P.tools,       name: 'Read', args: bugFile },
    { at: P.tools + 350, name: 'Edit', args: bugFile },
    { at: P.tools + 700, name: 'Bash', args: 'npm test' },
  ];

  return (
    <Slide bg="#000" padding="0" label="Cold Open">
      <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>

        {/* radial glow intensifies as terminal lands */}
        <div style={{
          position: 'absolute', inset: -100,
          background: 'radial-gradient(circle at 50% 45%, rgba(215,119,87,' + (showTerm ? 0.06 : 0.02) + ') 0%, transparent 55%)',
          transition: 'all 0.8s', pointerEvents: 'none',
        }} />

        {/* pre-arm idle: `$ claude` pre-typed + cursor + return hint.
            On arm, t jumps to P.enter → showTerm flips true → this hides. */}
        {!showTerm && <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          textAlign: 'center',
        }}>
          <div style={{ fontFamily: TERM.font, fontSize: 20, color: COLORS.termFg }}>
            <span>{cmdTxt}</span><Cursor w={11} h={22} />
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', marginTop: 24, letterSpacing: '0.05em' }}>
            press return
          </div>
        </div>}

        {/* terminal scales in from center */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%) scale(' + termScale + ')',
          opacity: termOpacity,
          transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
        }}>
          <Terminal width={118} height={24} title="claude">
            {t >= P.logo && <ClawdLogo path={'~/' + (_P.vehicle || 'project')} org={_P.org} />}
            <Spacer lines={2} />
            {t >= P.typeMsg && <UserMessage>
              {msgTxt.slice(0, msgChars)}
              {msgChars < msgTxt.length && <Inverse> </Inverse>}
            </UserMessage>}
            <Spacer />
            {t >= P.spin && t < P.tools && <Spin verb="Thinking" frame={tm.f} />}
            {tools.map(function (tc, i) {
              return t >= tc.at ? <ToolCallSuccess key={i} name={tc.name} args={tc.args} /> : null;
            })}
            {t >= P.green && <>
              <Spacer />
              <Line>{'  '}<Green>{'\u2714 4/4 tests passing'}</Green></Line>
            </>}
            <Spacer lines={2} />
            {t >= P.logo && <InputBox />}
            {t >= P.logo && <StatusBar leftHint="? for shortcuts" rightStatus="claude opus" />}
          </Terminal>
        </div>

        {/* title overlay — fades in over the terminal at ~7.2s */}
        <div style={{
          position: 'absolute', inset: 0,
          background: t >= P.title ? 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.5) 100%)' : 'transparent',
          transition: 'background 0.8s', pointerEvents: 'none', zIndex: 15,
        }} />

        <Fd vis={t >= P.title} y={-20} dur="0.9s"
            style={{ position: 'absolute', top: 42, left: 56, zIndex: 30, display: 'flex', alignItems: 'center', gap: 18 }}>
          <img src="assets/clay-spark.svg" style={{ width: 40 }} />
          <div>
            {/* Serif to match deck voice — font only, no kicker (splash lockup). */}
            <h1 style={{ fontFamily: "'Anthropic Serif', Georgia, serif", fontSize: 32,
                         fontWeight: 400, color: '#fff' }}>{_CO.title || 'Claude Code Workshop'}</h1>
            <p style={Object.assign({ color: CLAY, marginTop: 2 }, TYPE.caption)}>{_CO.subtitle || 'Foundations \u2192 Scale'}</p>
          </div>
        </Fd>

        {/* Optional customer co-brand. Defaults bottom-right; cobrand.pos
            overrides (e.g. {top:48, right:56} for SLB). Fade-in y is sign-
            flipped when anchored to top so it floats down rather than up. */}
        {_CO.cobrand && <Fd vis={t >= P.title}
            y={(_CO.cobrand.pos && _CO.cobrand.pos.top != null) ? -20 : 20} dur="0.9s"
            style={Object.assign({ position: 'absolute', zIndex: 30 },
                                 _CO.cobrand.pos || { bottom: 42, right: 56 })}>
          <img src={_CO.cobrand.src} alt={_CO.cobrand.alt || ''}
               style={{ height: _CO.cobrand.height || 28, opacity: 0.85, filter: _CO.cobrand.filter }} />
        </Fd>}

        {/* Partner delivery brand. Fixed bottom-left; never collides with
            cobrand (bottom-right) or Anthropic lockup (top-left). */}
        {_CO.partnerBrand && <Fd vis={t >= P.title} y={20} dur="0.9s"
            style={{ position: 'absolute', bottom: 42, left: 56, zIndex: 30,
                     display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 11, letterSpacing: '0.06em',
                         color: 'rgba(255,255,255,0.55)' }}>Delivered by</span>
          <img src={_CO.partnerBrand.src} alt={_CO.partnerBrand.alt || ''}
               style={{ height: _CO.partnerBrand.height || 22, opacity: 0.9 }} />
        </Fd>}

      </div>
    </Slide>
  );
}


// ============================================================================
// #2 — WHAT IS CLAUDE CODE (loop)
// Ported from cc-101-broadcast-source/slides/16-whatis.jsx S_WhatIs.
// R.cE → JSX. Loop diagram + who/why cards. 2 sub-steps.
// ============================================================================

var LOOP_STAGES = [
  { verb: 'Read',    tool: 'Read / Grep',  eg: 'Reads your files, config, tests, git history',       color: '#34AADC' },
  { verb: 'Decide',  tool: 'Plan',         eg: 'Figures out what to change and in what order',       color: '#9B8ABF' },
  { verb: 'Act',     tool: 'Edit / Bash',  eg: 'Edits code, runs commands, commits \u2014 with your approval', color: CLAY },
  { verb: 'Observe', tool: 'Result',       eg: 'Sees test output, errors, diffs \u2014 and keeps going',  color: '#8B9E6B' },
];

var WHATIS_WHO = [
  { role: 'Developers', why: 'Debug faster. Write less boilerplate. Stay in flow across code, tests, and PRs.' },
  { role: 'Non-developers', why: 'Run data queries. Tweak configs. Handle scripts without waiting on engineering.' },
  { role: 'New to a codebase', why: 'Explore unfamiliar code. Ask what something does. Ramp up faster.' },
];

function Slide_WhatIsLoop(props) {
  var sub = useSubSteps(2, props.registerSubNav);
  var stg = useStg(props.active, 3, 200, 180);
  var step = _IS_PRINT ? 99 : sub.step;
  var v = _IS_PRINT ? _printAll(3) : stg;

  // Loop animation: once step 1 lands, cycle the active stage
  var _li = React.useState(0), loopIdx = _li[0], setLoopIdx = _li[1];
  var loopRunning = step >= 1 && props.active;
  React.useEffect(function () {
    if (!loopRunning) { setLoopIdx(0); return; }
    var i = setInterval(function () { setLoopIdx(function (x) { return (x + 1) % 4; }); }, 1400);
    return function () { clearInterval(i); };
  }, [loopRunning]);

  return (
    <Slide bg={BG_LIGHT} padding="0" label="What is">
      <div style={{
        width: '100%', height: '100%', background: BG_LIGHT,
        padding: '48px 56px 36px', display: 'flex', flexDirection: 'column',
        fontFamily: "'Anthropic Sans',system-ui", color: TEXT_PRIMARY, position: 'relative',
      }}>
        {/* Header */}
        <Fd vis={v.includes(0)}>
          {/* Deck-native Serif — sits between Slide_WhatIsCC and Slide_Install,
              both Serif+kicker, so Sans 40 here reads as a different deck. */}
          <h1 style={{ fontFamily: "'Anthropic Serif', Georgia, serif", fontSize: 32,
                       fontWeight: 400, marginBottom: 10 }}>What is Claude Code?</h1>
        </Fd>
        <Fd vis={v.includes(1)}>
          <p style={Object.assign({ color: TEXT_SECONDARY, marginBottom: 28 }, TYPE.body, { fontSize: 17, maxWidth: 760, lineHeight: 1.55 })}>
            {'Claude Code isn\u2019t a chat window you paste code into. It\u2019s an '}
            <span style={{ color: CLAY, fontWeight: 500 }}>agent</span>
            {' \u2014 meaning it reads your files on its own, decides what needs to change, makes the edit, and checks whether it worked. That read-decide-act-observe loop is what you\u2019re looking at on the left, and it\u2019s what lets Claude finish a multi-step task without you hand-feeding context at every turn.'}
          </p>
        </Fd>

        {/* Two columns */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: 56, alignItems: 'flex-start' }}>

          {/* LEFT — the loop */}
          <Fd vis={v.includes(2)} y={14}>
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, color: CLAY, textTransform: 'uppercase',
                          letterSpacing: '0.08em', marginBottom: 14 }}>How it works</p>
              <div style={{ position: 'relative' }}>
                {LOOP_STAGES.map(function (s, i) {
                  var active = loopRunning && i === loopIdx;
                  return (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', gap: 14,
                      padding: '12px 16px', marginBottom: 8,
                      background: active ? '#fff' : 'rgba(255,255,255,0.5)',
                      border: '1px solid ' + (active ? s.color : 'rgba(15,12,8,0.06)'),
                      borderLeft: '4px solid ' + s.color,
                      borderRadius: 8,
                      transform: active ? 'translateX(6px)' : 'translateX(0)',
                      boxShadow: active ? '0 4px 16px rgba(0,0,0,0.07)' : 'none',
                      transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                    }}>
                      <div style={{ flex: '0 0 72px' }}>
                        <div style={Object.assign({ color: s.color, fontWeight: 700 }, TYPE.body, { fontSize: 16 })}>{s.verb}</div>
                        <div style={{ fontSize: 10, color: 'rgba(15,12,8,0.4)', fontFamily: TERM.font }}>{s.tool}</div>
                      </div>
                      <div style={Object.assign({ color: TEXT_SECONDARY, flex: 1 }, TYPE.caption, { fontSize: 13, lineHeight: 1.4 })}>{s.eg}</div>
                    </div>
                  );
                })}
                {/* loop-back arrow */}
                <svg width="30" height="220" viewBox="0 0 30 220"
                     style={{ position: 'absolute', right: -36, top: 4, opacity: loopRunning ? 0.8 : 0.25, transition: 'opacity 0.4s' }}>
                  <path d="M 4 208 Q 26 208 26 110 Q 26 12 4 12" fill="none" stroke={CLAY} strokeWidth="2" strokeDasharray="4 4" />
                  <polygon points="4,12 10,6 10,18" fill={CLAY} />
                </svg>
              </div>

              {/* plain explanation of why this matters */}
              <Fd vis={step >= 1} y={10}>
                <p style={Object.assign({ color: TEXT_SECONDARY, marginTop: 14, fontSize: 14, lineHeight: 1.5 }, TYPE.body)}>
                  {'This loop is what lets it fix a failing test end-to-end: read the error, find the bug, make the edit, rerun, and confirm \u2014 in one go.'}
                </p>
              </Fd>
            </div>
          </Fd>

          {/* RIGHT — who uses it and why */}
          <Fd vis={step >= 2} y={14}>
            <div style={{
              background: '#fff', border: '1px solid rgba(15,12,8,0.08)',
              borderRadius: 12, padding: '20px 22px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
            }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: CLAY, textTransform: 'uppercase',
                          letterSpacing: '0.08em', marginBottom: 14 }}>Who it's for</p>
              {(window.WHATIS_WHO || WHATIS_WHO).map(function (w, i, arr) {
                return (
                  <div key={i} style={{ marginBottom: i < arr.length - 1 ? 16 : 0 }}>
                    <div style={Object.assign({ fontWeight: 600, marginBottom: 3 }, TYPE.body, { fontSize: 15 })}>{w.role}</div>
                    <div style={Object.assign({ color: TEXT_SECONDARY }, TYPE.caption, { fontSize: 13, lineHeight: 1.45 })}>{w.why}</div>
                  </div>
                );
              })}
            </div>
          </Fd>
        </div>
      </div>
    </Slide>
  );
}


// ============================================================================
// #3 — NO ONE RIGHT WAY (Boris tweet, single-beat)
// Verbatim from Expedia deck-slides-broadcast.jsx:273-305. Caption is already
// generic ("A note before we dive in").
// ============================================================================

function Slide_NoOneWay(props) {
  var stg = useStg(props.active, 2, 300, 400);
  var v = _IS_PRINT ? _printAll(2) : stg;

  return (
    <Slide bg={BG_LIGHT} padding="0" label="No one way">
      <div style={{
        width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Anthropic Sans',system-ui", padding: '0 64px',
      }}>
        <Fd vis={v.includes(0)}>
          <p style={{ fontSize: 12, fontWeight: 600, color: CLAY, textTransform: 'uppercase',
                      letterSpacing: '0.08em', marginBottom: 24, textAlign: 'center' }}>
            A note before we dive in
          </p>
        </Fd>
        <Fd vis={v.includes(1)} y={16}>
          <TweetCard
            avatar="assets/boris-avatar.jpg"
            name="Boris Cherny" handle="bcherny" verified={true}
            body={<>
              {"I'm Boris and I created Claude Code. I wanted to quickly share a few tips for using Claude Code, sourced directly from the Claude Code team. The way the team uses Claude is different than how I use it. "}
              <span style={{ borderBottom: '2px solid ' + CORAL }}>Remember: there is no one right way to use Claude Code</span>
              {" -- everyones' setup is different. You should experiment to see what works for you!"}
            </>}
            date={'4:32 AM \u00b7 Feb 1, 2026 \u00b7 8.7M Views'}
            replies="1.2K" rts="3.4K" likes="12K"
          />
        </Fd>
      </div>
    </Slide>
  );
}


// ============================================================================
// #4 — BORIS (full 3-beat) — Tweet → Phone → Counter
// Ported from cc-101-broadcast-source/slides/04-boris.jsx. R.cE → JSX.
// GIF swapped to clawd.png (doesn't exist on disk).
// ============================================================================

function Slide_Boris(props) {
  var T = useTheme();
  var sub = useSubSteps(3, props.registerSubNav);
  var step = _IS_PRINT ? 99 : sub.step;
  var beat = step; // 0 = title only, 1 = tweet, 2 = phone, 3 = counter
  var tm = useTm(props.active);

  // counter 0→20 fires on beat 3
  var prCount = useCountUp(20, beat >= 3, 1400);

  return (
    <Slide bg={BG_LIGHT} padding="0" label="Boris">
      <div style={{
        width: '100%', height: '100%', background: T.bg, position: 'relative', overflow: 'hidden',
        fontFamily: "'Anthropic Sans',system-ui",
      }}>
        {/* ambient glow that shifts per beat */}
        <div style={{
          position: 'absolute', width: 700, height: 700, borderRadius: '50%',
          left: beat === 2 ? '65%' : '50%', top: '50%', transform: 'translate(-50%,-50%)',
          background: 'radial-gradient(circle, rgba(217,119,87,' + (beat === 3 ? 0.12 : 0.05) + ') 0%, transparent 65%)',
          transition: 'all 1s cubic-bezier(0.22,1,0.36,1)', pointerEvents: 'none',
        }} />

        {/* header — always visible */}
        <div style={{ position: 'absolute', top: 44, left: 56, zIndex: 20, opacity: beat === 3 ? 0.35 : 1, transition: 'opacity 0.6s' }}>
          <h2 style={Object.assign({ color: T.text }, TYPE.h3)}>Boris Cherny</h2>
          <p style={Object.assign({ color: T.textFaint, marginTop: 2 }, TYPE.caption)}>{'Built it, won\u2019t ship without it'}</p>
        </div>

        {/* ═══ BEAT 1 — THE TWEET ═══ */}
        <div style={{
          position: 'absolute', top: '52%', left: '50%', transform: 'translate(-50%,-50%)',
          opacity: beat === 1 ? 1 : 0,
          scale: beat === 1 ? '1' : (beat < 1 ? '0.9' : '0.85'),
          transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1)',
          pointerEvents: beat === 1 ? 'auto' : 'none',
          zIndex: beat === 1 ? 10 : 1,
        }}>
          <div style={{ transform: 'scale(' + (beat === 1 ? 1.12 : 1) + ')', transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1)' }}>
            <TweetCard
              avatar="assets/boris-avatar.jpg"
              name="Boris Cherny" handle="bcherny" verified={true}
              body="When I created Claude Code as a side project back in September 2024, I had no idea it would grow to be what it is today."
              date={'10:47 AM \u00b7 Sep 2024'}
              replies="847" rts="2.1K" likes="12.4K"
              rotate={beat === 1 ? -2 : 0}
            />
          </div>
          <p style={Object.assign({ textAlign: 'center', marginTop: 32, color: T.textDim, fontStyle: 'italic', maxWidth: 520, marginLeft: 'auto', marginRight: 'auto' }, TYPE.body)}>
            He was onboarding at Anthropic. A CLI was the cheapest thing he could build.
          </p>
        </div>

        {/* ═══ BEAT 2 — THE PHONE ═══ */}
        <div style={{
          position: 'absolute', top: '54%', left: '54%',
          transform: 'translate(-50%,-50%) translateY(' + (beat === 2 ? 0 : beat < 2 ? 400 : -60) + 'px)',
          opacity: beat === 2 ? 1 : 0,
          transition: 'all 0.8s cubic-bezier(0.22,1,0.36,1)',
          pointerEvents: 'none', zIndex: beat === 2 ? 10 : 1,
          display: 'flex', alignItems: 'center', gap: 36,
        }}>
          {/* copy left — narrower so the wider device has room */}
          <div style={{ maxWidth: 260 }}>
            <p style={Object.assign({ color: CLAY, marginBottom: 12 }, TYPE.kicker)}>The Workflow Now</p>
            <p style={Object.assign({ color: T.textDim }, TYPE.body)}>{'5 terminals. 5\u201310 browser sessions.'}</p>
            <p style={Object.assign({ color: T.text, fontWeight: 500, marginTop: 14 }, TYPE.h3, { fontSize: 24, lineHeight: 1.35 })}>
              {'Kicks sessions off from his '}
              <span style={{ color: CLAY, background: 'rgba(217,119,87,0.15)', padding: '2px 12px', borderRadius: 8, border: '1px solid rgba(217,119,87,0.3)' }}>phone</span>
              {' in the morning.'}
            </p>
            <p style={Object.assign({ color: T.textFaint, marginTop: 10 }, TYPE.caption)}>Checks in at night.</p>
          </div>
          {/* device right — Dynamic Island + camera dot, +1/6 wider */}
          <PhoneFrame width={475} height={610} time="7:14" tilt={beat === 2 ? 4 : 0}>
            <div style={{ padding: '8px 0' }}>
              <div style={{ padding: '0 18px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <img src="assets/clawd.png" style={{ width: 20, height: 20, imageRendering: 'pixelated' }} />
                <span style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>Claude Code</span>
                <span style={{ marginLeft: 'auto', color: CLAY, fontSize: 10, fontFamily: TERM.font }}>5 active</span>
              </div>
              <PhoneSessionCard title="reviewing auth PR #847" sub={'claude-cli \u00b7 12m ago'} status="running" frame={tm.f} />
              <PhoneSessionCard title="migration batch 3" sub="48/48 tests green" status="done" frame={tm.f} />
              <PhoneSessionCard title="building API spec" sub={'writing RFC\u2026'} status="running" frame={tm.f} />
              <PhoneSessionCard title={'PR #847 \u2192 merged'} sub="github.com" status="done" frame={tm.f} />
              <PhoneSessionCard title="flaky test triage" status="waiting" frame={tm.f} />
            </div>
          </PhoneFrame>
        </div>

        {/* ═══ BEAT 3 — THE COUNTER ═══ */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          opacity: beat === 3 ? 1 : 0,
          transition: 'opacity 0.8s 0.2s',
          pointerEvents: 'none', zIndex: beat === 3 ? 10 : 1,
          textAlign: 'center',
        }}>
          <div style={Object.assign({
            fontSize: 200, fontWeight: 700, color: CLAY,
            letterSpacing: '-0.06em', lineHeight: 0.85,
            textShadow: '0 0 80px rgba(217,119,87,0.3)',
          }, DISPLAY_NUM)}>{prCount}</div>
          <p style={Object.assign({ color: T.text, marginTop: 12 }, TYPE.h3)}>
            {'PRs a day. '}<span style={{ color: T.textDim }}>Zero typed by hand.</span>
          </p>
          <Fd vis={beat === 3 && prCount >= 20} y={12} dur="0.8s">
            <p style={Object.assign({ color: T.textFaint, marginTop: 36, fontStyle: 'italic' }, TYPE.body)}>{'That\u2019s a Tuesday.'}</p>
          </Fd>
        </div>

        {/* clawd — beat 3 corner. TODO: swap to GIF if sourced (clawd-reactive-sunglasses) */}
        {beat === 3 && prCount >= 20 && <img
          src="assets/clawd.png"
          style={{
            position: 'absolute', bottom: 48, right: 56, width: 120, height: 120,
            imageRendering: 'pixelated', objectFit: 'contain',
            animation: 'slideInRight 0.6s cubic-bezier(0.22,1,0.36,1) both', zIndex: 20,
          }}
        />}
      </div>
    </Slide>
  );
}


// ============================================================================
// #5 — WHERE CLAUDE CODE RUNS (4-surface, animated)
// Ported from cc-101-broadcast-source/slides/02-where.jsx.
// Inner demo components KEPT in React.createElement (complex, low edit risk).
// DemoSDK skipped — dead code in source (WHERE_SURFACES uses DemoEverywhere).
// Top-level Slide_Where wraps in <Slide>; registerSubNav cycles surfaces.
// ============================================================================

// Alias v4's helper names → this deck's hooks (identical contracts)
var useStagger3 = useStg, useTimer3 = useTm, Fade3 = Fd, Spin3 = Spin;

// --- CLI Demo ---
function DemoCLI(props) {
  var active = props.active;
  var _t = useTimer3(active), t = _t.t, f = _t.f;

  var _ts = React.useState(null), tS = _ts[0], setTS = _ts[1];
  var pRef = React.useRef(new Set());
  var _h = React.useState([]), history = _h[0], setHistory = _h[1];
  var _sp = React.useState(null), spinner = _sp[0], setSpinner = _sp[1];
  var _phase = React.useState('intro'), phase = _phase[0], setPhase = _phase[1];

  React.useEffect(function() {
    if (!active) { pRef.current = new Set(); setHistory([]); setSpinner(null); setPhase('intro'); setTS(null); }
  }, [active]);

  var evts = [
    { time: 400, fn: function() { setPhase('ready'); } },
    { time: 640, fn: function() { setPhase('typing'); setTS(800); } },
    { time: 1760, fn: function() { setPhase('working'); setHistory([{ t:'user', x:'fix the auth bug in login handler' }]); setSpinner('Thinking'); } },
    { time: 2400, fn: function() { setSpinner('Working'); } },
    { time: 2880, fn: function() { setSpinner(null); setHistory(function(h) { return h.concat([{ t:'tool', x:'Read(src/auth/login.ts)' }]); }); } },
    { time: 3200, fn: function() { setHistory(function(h) { return h.concat([{ t:'write', x:'Write(src/auth/login.ts)' }]); }); } },
    { time: 3680, fn: function() { setHistory(function(h) { return h.concat([{ t:'asst', x:'Fixed the auth bug. Updated 3 files.' }]); }); } },
  ];
  React.useEffect(function() { evts.forEach(function(e, i) { if (!pRef.current.has(i) && t >= e.time) { pRef.current.add(i); e.fn(); } }); }, [t]);

  var tp = tS ? Math.min(1, (t - tS) / 960) : 0;

  return React.createElement('div', { style: {
    height: '100%', background: '#1a1918', borderRadius: 10, overflow: 'hidden',
    border: '1px solid rgba(255,255,255,0.05)',
    boxShadow: '0 12px 48px rgba(0,0,0,0.15), 0 0 0 1px rgba(15,12,8,0.08)',
    display: 'flex', flexDirection: 'column',
  }},
    // Title bar
    React.createElement('div', { style: { background: '#252321', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 } },
      React.createElement('div', { style: { width: 10, height: 10, borderRadius: '50%', background: '#ff5f56' } }),
      React.createElement('div', { style: { width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e' } }),
      React.createElement('div', { style: { width: 10, height: 10, borderRadius: '50%', background: '#27ca40' } }),
      React.createElement('span', { style: { marginLeft: 'auto', color: '#666', fontSize: 11, fontFamily: TERM.font } }, 'claude')),
    // Content — fills remaining height
    React.createElement('div', { style: {
      flex: 1, padding: '14px 18px', fontFamily: TERM.font,
      fontSize: TERM.fontSize, lineHeight: TERM.lineHeight + 'px', color: COLORS.termFg,
      whiteSpace: 'pre', overflowY: 'auto', overflowX: 'hidden',
    }},
    React.createElement(Spacer, null),
    React.createElement(ClawdLogo, null),
    React.createElement(Spacer, { lines: 2 }),
    history.map(function(h, i) {
      if (h.t === 'user') return React.createElement(React.Fragment, { key: i },
        React.createElement(UserMessage, null, h.x), React.createElement(Spacer, null));
      if (h.t === 'tool') return React.createElement(ToolCallSuccess, { key: i, name: 'Read', args: 'src/auth/login.ts' });
      if (h.t === 'write') return React.createElement(React.Fragment, { key: i },
        React.createElement(Line, null, '  ', React.createElement('span', { style: { color: COLORS.claudeOrange } }, '\u23BF'), ' Write(src/auth/login.ts)'),
        React.createElement(Spacer, null));
      if (h.t === 'asst') return React.createElement(React.Fragment, { key: i },
        React.createElement(Line, null, React.createElement(AssistantBullet, null), h.x), React.createElement(Spacer, null));
      return null;
    }),
    spinner && React.createElement(Spin3, { verb: spinner, frame: f }),
    phase === 'typing' && React.createElement(Typed3, { text: 'fix the auth bug in login handler', progress: tp }),
    (phase === 'intro' || phase === 'ready') && React.createElement(InputBox, null),
    phase === 'working' && !spinner && history.length >= 4 && React.createElement(InputBox, null),
    React.createElement(StatusBar, { leftHint: '? for shortcuts', rightStatus: 'opus \u00b7 auto' })));
}

// --- IDE Demo (uses VSCode UI kit) ---
function DemoIDE(props) {
  var active = props.active;
  var _s = React.useState(0), step = _s[0], setStep = _s[1];
  React.useEffect(function() {
    if (!active) { setStep(0); return; }
    var ts = [
      setTimeout(function() { setStep(1); }, 480),
      setTimeout(function() { setStep(2); }, 1440),
      setTimeout(function() { setStep(3); }, 2400),
      setTimeout(function() { setStep(4); }, 3200),
    ];
    return function() { ts.forEach(clearTimeout); };
  }, [active]);

  return React.createElement('div', { style: {
    height: '100%', borderRadius: 10, overflow: 'hidden',
    boxShadow: '0 16px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
  }},
    React.createElement(VSCodeWindow, { highlightLine: step >= 3 ? 7 : undefined },
      React.createElement(window.CCVSHeader || function() { return null; }, { title: 'fix auth bug', dropdownOpen: false }),
      React.createElement('div', { style: { flex: 1, overflow: 'auto', padding: '12px 16px 80px' } },
        step >= 1 && React.createElement(VSCUserMessage, { text: 'fix the auth bug in the login handler' }),
        step >= 2 && React.createElement(VSCAssistantMessage, null,
          React.createElement('p', null, "I'll fix the auth bug. Let me read the handler first.")),
        step >= 2 && React.createElement(VSCToolCall, { tool: 'Read', target: 'index.ts', status: 'success' }),
        step >= 3 && React.createElement(VSCToolCall, { tool: 'Edit', target: 'index.ts', status: 'success', detail: 'Fixed token validation' },
          React.createElement(CodeBlock, { title: 'index.ts' }, '  const valid = await verifyToken(req.headers.authorization);')),
        step >= 4 && React.createElement(VSCAssistantMessage, null,
          React.createElement('p', null, "Fixed! The bug was a missing await on token verification. Changes are on line 7.")),
        step < 4 && step >= 2 && React.createElement('div', { style: { paddingTop: 8, paddingLeft: 30 } },
          React.createElement(Spinner, { size: 16 }))),
      React.createElement(InputBar, { editMode: 'ask' })));
}

// --- Web/Desktop Demo (Claude Code Remote UI) ---
function DemoWeb(props) {
  var active = props.active;
  var _t3 = useTimer3(active), t3 = _t3.t;

  var step = 0;
  if (t3 >= 400) step = 1;
  if (t3 >= 1280) step = 2;
  if (t3 >= 2240) step = 3;
  if (t3 >= 2880) step = 4;

  var assistText = "I'll look into the OAuth callback URL issue for EU users. Let me start by reading the relevant code.";
  var assistChars = step >= 2 ? Math.min(assistText.length, Math.floor((t3 - 1280) / 18)) : 0;
  var visAssist = assistText.slice(0, assistChars);
  var assistStreaming = assistChars < assistText.length && step >= 2;

  var doneText = "Done! I've replaced the hardcoded AUTH_BASE_URL with config.baseUrl and added URL validation.";
  var doneChars = step >= 4 ? Math.min(doneText.length, Math.floor((t3 - 2880) / 16)) : 0;
  var visDone = doneText.slice(0, doneChars);
  var doneStreaming = doneChars < doneText.length && step >= 4;

  return React.createElement('div', { style: {
    height: '100%', borderRadius: 10, overflow: 'hidden', display: 'flex',
    background: '#fff', border: '1px solid rgba(15,12,8,0.08)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    fontFamily: "'Anthropic Sans', system-ui, -apple-system, sans-serif",
  }},
    // Sidebar
    React.createElement('div', { style: {
      width: 220, background: 'rgb(250,249,245)', borderRight: '1px solid rgba(31,30,29,0.08)',
      display: 'flex', flexDirection: 'column', flexShrink: 0, overflow: 'hidden',
    }},
      React.createElement('div', { style: { padding: '14px 14px 8px', display: 'flex', alignItems: 'center', gap: 8 } },
        React.createElement('img', { src: 'assets/clay-spark.svg', style: { height: 18 } }),
        React.createElement('span', { style: { fontSize: 9, color: 'rgba(20,20,19,0.4)', background: 'rgba(0,0,0,0.04)', padding: '1px 6px', borderRadius: 4, fontWeight: 500 } }, 'Research preview')),
      React.createElement('div', { style: { padding: '6px 14px 12px' } },
        React.createElement('div', { style: {
          background: '#fff', borderRadius: 8, padding: '8px 10px', fontSize: 12, color: 'rgba(20,20,19,0.35)',
          border: '1px solid rgba(31,30,29,0.12)',
        }}, 'Start a new session...')),
      React.createElement('div', { style: { padding: '6px 14px 4px', fontSize: 11, color: 'rgba(20,20,19,0.4)', fontWeight: 500 } }, 'Sessions'),
      React.createElement('div', { style: { flex: 1, overflow: 'hidden' } },
        [
          { title: 'Fix OAuth callback URL', time: '10:02 am', active: true },
          { title: 'Revert settings to previous commit', time: 'Fri' },
          { title: 'Debug autocomplete UX', time: 'Thu' },
          { title: 'Add rate limiting middleware', time: 'Wed' },
        ].map(function(s, i) {
          return React.createElement('div', { key: i, style: {
            padding: '8px 14px', display: 'flex', flexDirection: 'column', gap: 2,
            background: s.active ? 'rgba(0,0,0,0.04)' : 'transparent',
            borderLeft: s.active ? '2px solid rgb(198,97,63)' : '2px solid transparent',
            cursor: 'default',
          }},
            React.createElement('span', { style: { fontSize: 12, color: 'rgb(20,20,19)', fontWeight: s.active ? 500 : 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, s.title),
            React.createElement('span', { style: { fontSize: 10, color: 'rgba(20,20,19,0.35)' } }, s.time));
        }))),

    // Main content
    React.createElement('div', { style: {
      flex: 1, display: 'flex', flexDirection: 'column', background: '#fff', overflow: 'hidden',
    }},
      React.createElement('div', { style: {
        padding: '10px 16px', borderBottom: '1px solid rgba(31,30,29,0.06)',
        display: 'flex', alignItems: 'center', gap: 8,
      }},
        React.createElement('span', { style: { fontSize: 13, fontWeight: 500, color: 'rgb(20,20,19)' } }, 'Fix OAuth callback URL'),
        React.createElement('div', { style: { flex: 1 } }),
        React.createElement('button', { style: {
          background: 'none', border: '1px solid rgba(31,30,29,0.15)', borderRadius: 6,
          padding: '3px 10px', fontSize: 11, color: 'rgba(20,20,19,0.5)', cursor: 'default',
          display: 'flex', alignItems: 'center', gap: 4,
        }}, 'Open in CLI ', React.createElement('i', { className: 'ai-CommandLine', style: { fontSize: 12 } })),
        React.createElement('button', { style: {
          background: 'none', border: '1px solid rgba(31,30,29,0.15)', borderRadius: 6,
          padding: '3px 10px', fontSize: 11, color: 'rgba(20,20,19,0.5)', cursor: 'default',
        }}, 'Share')),

      React.createElement('div', { style: {
        flex: 1, padding: '16px 20px', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 12,
      }},
        step >= 1 && React.createElement('div', { style: { marginLeft: 'auto', maxWidth: '80%', opacity: 1 }},
          React.createElement('div', { style: {
            backgroundColor: 'rgb(245,244,237)', color: 'rgb(20,20,19)', fontWeight: 430,
            fontSize: 13, lineHeight: '19px', padding: '8px 12px', borderRadius: 8,
          }}, 'Fix the OAuth callback URL mismatch for EU users')),

        step >= 2 && React.createElement('div', { style: { fontSize: 13, color: 'rgb(20,20,19)', lineHeight: 1.6 } },
          visAssist,
          assistStreaming && React.createElement('span', { style: { display: 'inline-block', width: 6, height: 14, background: 'rgb(198,97,63)', marginLeft: 2, verticalAlign: 'text-bottom', animation: 'blink 0.8s step-end infinite' } })),

        step >= 2 && React.createElement('div', { style: {
          display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px',
          background: 'rgba(0,0,0,0.02)', borderRadius: 6, border: '1px solid rgba(31,30,29,0.06)',
        }},
          React.createElement('div', { style: { width: 6, height: 6, borderRadius: '50%', background: '#2d8a4e' } }),
          React.createElement('span', { style: { fontSize: 12, fontWeight: 500, color: 'rgb(20,20,19)' } }, 'Read'),
          React.createElement('span', { style: { fontSize: 11, color: 'rgba(20,20,19,0.45)', fontFamily: "'JetBrains Mono', monospace" } }, 'src/auth/callback.ts')),

        step >= 3 && React.createElement('div', { style: {
          display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px',
          background: 'rgba(0,0,0,0.02)', borderRadius: 6, border: '1px solid rgba(31,30,29,0.06)',
        }},
          React.createElement('div', { style: { width: 6, height: 6, borderRadius: '50%', background: '#2d8a4e' } }),
          React.createElement('span', { style: { fontSize: 12, fontWeight: 500, color: 'rgb(20,20,19)' } }, 'Edit'),
          React.createElement('span', { style: { fontSize: 11, color: 'rgba(20,20,19,0.45)', fontFamily: "'JetBrains Mono', monospace" } }, 'src/auth/callback.ts'),
          React.createElement('span', { style: { fontSize: 10, color: 'rgba(20,20,19,0.3)' } }, 'Fixed redirect URI')),

        step >= 4 && React.createElement('div', { style: { fontSize: 13, color: 'rgb(20,20,19)', lineHeight: 1.6 } },
          visDone,
          doneStreaming && React.createElement('span', { style: { display: 'inline-block', width: 6, height: 14, background: 'rgb(198,97,63)', marginLeft: 2, verticalAlign: 'text-bottom', animation: 'blink 0.8s step-end infinite' } }))),

      React.createElement('div', { style: { padding: '8px 16px 12px', borderTop: '1px solid rgba(31,30,29,0.06)' } },
        React.createElement('div', { style: {
          background: 'rgb(250,249,245)', borderRadius: 8, padding: '8px 12px',
          fontSize: 12, color: 'rgba(20,20,19,0.35)', border: '1px solid rgba(31,30,29,0.1)',
          display: 'flex', alignItems: 'center', gap: 6,
        }},
          'Reply to this session...',
          React.createElement('div', { style: { marginLeft: 'auto', width: 20, height: 20, borderRadius: '50%', background: 'rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
            React.createElement('span', { style: { fontSize: 10, color: 'rgba(20,20,19,0.3)' } }, '\u2191'))))));
}

// --- Everywhere Else — timeline: GitHub → Slack → Mobile ---
function _TimelineRow(props) {
  return React.createElement(Fd, { vis: props.vis, y: 14 },
    React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', gap: 0 } },
      React.createElement('span', {
        style: Object.assign({ width: 66, textAlign: 'right', paddingTop: 2, color: 'rgba(15,12,8,0.35)', flexShrink: 0 }, TYPE.caption, DISPLAY_NUM)
      }, props.time),
      React.createElement('div', { style: { width: 36, display: 'flex', justifyContent: 'center', paddingTop: 6, flexShrink: 0, zIndex: 2 } },
        React.createElement('div', { style: { width: 8, height: 8, borderRadius: '50%', background: CLAY, boxShadow: '0 0 0 4px ' + BG_LIGHT } })),
      React.createElement('div', { style: { flex: 1, minWidth: 0 } },
        React.createElement('p', { style: Object.assign({ color: CLAY, marginBottom: 8 }, TYPE.kicker) }, props.label),
        props.children)));
}

function DemoEverywhere(props) {
  var active = props.active;
  var v = useStg(active, 3, 200, 300);

  var cardFrame = {
    background: '#fff', border: '1px solid rgba(15,12,8,0.1)', borderRadius: 10,
    overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', maxWidth: 520,
  };

  // GitHub octicon: check-in-circle (the Approved badge icon)
  var ghCheck = React.createElement('svg', { width: 12, height: 12, viewBox: '0 0 16 16', fill: 'currentColor' },
    React.createElement('path', { d: 'M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16Zm3.78-9.72a.75.75 0 0 0-1.06-1.06L6.75 9.19 5.28 7.72a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0l4.5-4.5Z' }));

  // Two-column: timeline (GitHub+Slack) left, phone right. Phone isn't a
  // timeline event — it's the surface you check. Breaking symmetry fixes the
  // height budget (phone can be full-height) and is more honest narratively.
  return React.createElement('div', { style: {
    height: '100%', background: BG_LIGHT, borderRadius: 10, padding: '32px 40px',
    display: 'flex', alignItems: 'center', gap: 36,
  }},

    // ── Left: timeline column ─────────────────────────────────────
    React.createElement('div', { style: {
      flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 26,
      position: 'relative',
    }},

    React.createElement('div', {
      style: { position: 'absolute', left: 66 + 18, top: 6, bottom: 6, width: 1, background: CLAY + '33', zIndex: 1 }
    }),

    // GitHub: review event. Green Approved pill is the tell. Square avatar,
    // #f6f8fa header bar, d0d7de borders, speech-tab join to avatar.
    React.createElement(_TimelineRow, { vis: v.includes(0), time: '10:30', label: 'GitHub' },
      React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', gap: 10 } },
        React.createElement('div', { style: { width: 28, height: 28, borderRadius: 6, background: CLAY, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 } },
          React.createElement('img', { src: 'assets/white-spark.svg', style: { width: 16 } })),
        React.createElement('div', { style: { flex: 1, position: 'relative' } },
          // speech-bubble tab pointing at avatar (GitHub's triangle notch)
          React.createElement('div', { style: { position: 'absolute', left: -7, top: 11, width: 12, height: 12, background: '#f6f8fa', borderLeft: '1px solid #d0d7de', borderBottom: '1px solid #d0d7de', transform: 'rotate(45deg)', zIndex: 1 } }),
          React.createElement('div', { style: Object.assign({}, cardFrame, { border: '1px solid #d0d7de', borderRadius: 6, position: 'relative', zIndex: 2 }) },
            React.createElement('div', { style: {
              background: '#f6f8fa', borderBottom: '1px solid #d0d7de',
              padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 6,
              fontSize: 12, color: '#656d76',
            }},
              React.createElement('span', { style: { fontWeight: 600, color: '#1f2328' } }, 'claude[bot]'),
              React.createElement('span', { style: {
                display: 'inline-flex', alignItems: 'center', gap: 4,
                background: '#1a7f37', color: '#fff', fontSize: 11, fontWeight: 500,
                padding: '2px 8px', borderRadius: 20, marginLeft: 2,
              }}, ghCheck, 'Approved'),
              React.createElement('span', { style: { marginLeft: 'auto', fontSize: 11 } }, '30 minutes ago')),
            React.createElement('div', { style: { padding: '10px 14px', fontSize: 12.5, color: '#1f2328', lineHeight: 1.5 } },
              'LGTM \u2014 left 2 inline suggestions, nothing blocking.'))))),

    // ── Slack: message row. Timestamp after APP badge, reaction bubble below.
    // Lato-ish stack, #1d1c1d text, Slack-green #2eb67d.
    React.createElement(_TimelineRow, { vis: v.includes(1), time: '10:45', label: 'Slack' },
      React.createElement('div', { style: cardFrame },
        React.createElement('div', { style: {
          borderBottom: '1px solid rgba(15,12,8,0.06)', padding: '7px 14px',
          display: 'flex', alignItems: 'center', gap: 5,
          fontFamily: "'Lato','Anthropic Sans',sans-serif",
        }},
          React.createElement('span', { style: { fontSize: 13.5, fontWeight: 900, color: '#1d1c1d' } }, '# eng-deploys'),
          React.createElement('svg', { width: 10, height: 10, viewBox: '0 0 10 10', style: { opacity: 0.5 } },
            React.createElement('path', { d: 'M2 3.5 L5 6.5 L8 3.5', stroke: '#1d1c1d', strokeWidth: 1.5, fill: 'none', strokeLinecap: 'round' })),
          React.createElement('span', { style: { marginLeft: 'auto', fontSize: 11, color: 'rgba(29,28,29,0.5)' } }, '47 members')),
        React.createElement('div', { style: { padding: '10px 14px 12px', display: 'flex', gap: 8, fontFamily: "'Lato','Anthropic Sans',sans-serif" } },
          React.createElement('img', { src: 'assets/clawd.png', style: { width: 36, height: 36, borderRadius: 4, imageRendering: 'pixelated', flexShrink: 0 } }),
          React.createElement('div', { style: { flex: 1, minWidth: 0 } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 1 } },
              React.createElement('span', { style: { fontSize: 14, fontWeight: 900, color: '#1d1c1d' } }, 'Claude'),
              React.createElement('span', { style: { fontSize: 9.5, background: 'rgba(29,28,29,0.13)', color: 'rgba(29,28,29,0.7)', padding: '1px 4px', borderRadius: 2, fontWeight: 700, letterSpacing: '0.02em' } }, 'APP'),
              React.createElement('span', { style: { fontSize: 11, color: 'rgba(29,28,29,0.5)' } }, '10:45 AM')),
            React.createElement('p', { style: { fontSize: 13.5, color: '#1d1c1d', lineHeight: 1.45, margin: '0 0 6px' } },
              'Deployed ', React.createElement('code', { style: { fontFamily: TERM.font, fontSize: 11.5, background: 'rgba(29,28,29,0.04)', border: '1px solid rgba(29,28,29,0.13)', padding: '1px 5px', borderRadius: 3 } }, 'staging'),
              ' \u2014 4/4 smoke tests ', React.createElement('span', { style: { color: '#2eb67d', fontWeight: 600 } }, 'green \u2714')),
            React.createElement('div', { style: {
              display: 'inline-flex', alignItems: 'center', gap: 4,
              background: '#e8f5fa', border: '1px solid #bde3f3',
              borderRadius: 12, padding: '2px 8px', fontSize: 11,
            }},
              React.createElement('span', null, '\ud83c\udf89'),
              React.createElement('span', { style: { color: '#1264a3', fontWeight: 600, fontVariantNumeric: 'tabular-nums' } }, '3'))))))),
    // ^ closes left column

    // ── Right: phone. 240w → 34px corners (0.14 multiplier), compact island
    // at 80px fits with ~7px clearance on each side. iOS push notification,
    // dark mode. The story: "your phone buzzed."
    React.createElement(Fd, { vis: v.includes(2), y: 14 },
      React.createElement(PhoneFrame, { width: 240, height: 420, time: '11:00', compact: true },
        React.createElement('div', { style: { padding: '18px 12px 0' } },
          React.createElement('div', { style: {
            background: 'rgba(44,44,46,0.92)',
            backdropFilter: 'blur(20px)',
            borderRadius: 16,
            padding: '11px 13px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            border: '1px solid rgba(255,255,255,0.08)',
          }},
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 } },
              React.createElement('div', { style: { width: 20, height: 20, borderRadius: 5, background: CLAY, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
                React.createElement('img', { src: 'assets/white-spark.svg', style: { width: 12 } })),
              React.createElement('span', { style: { fontSize: 11, color: 'rgba(255,255,255,0.55)', fontWeight: 500 } }, 'Claude'),
              React.createElement('span', { style: { marginLeft: 'auto', fontSize: 11, color: 'rgba(255,255,255,0.4)' } }, '15m ago')),
            React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 2 } }, 'Deploy complete'),
            React.createElement('div', { style: { fontSize: 12, color: 'rgba(255,255,255,0.7)', lineHeight: 1.35 } }, 'staging \u00b7 4/4 smoke tests green'))))));
}

// --- Surface switcher shell ---
var WHERE_SURFACES = [
  { label: 'Claude Code CLI', desc: 'Bring Claude directly into your terminal', Demo: DemoCLI },
  { label: 'IDE Extensions', desc: 'Integrate with VSCode & JetBrains', Demo: DemoIDE },
  { label: 'Web + Desktop', desc: 'Chat with Claude on any device', Demo: DemoWeb },
  { label: 'Everywhere else', desc: 'GitHub \u00b7 Slack \u00b7 Mobile', Demo: DemoEverywhere },
];

function Slide_Where(props) {
  var _ci = React.useState(0), currentIdx = _ci[0], setCurrentIdx = _ci[1];
  var titleVis = useStagger3(props.active, 2, 200, 200);
  var surfaces = window.WHERE_SURFACES || WHERE_SURFACES;

  // print: snap to surface 0 (CLI), show title immediately
  var printMode = _IS_PRINT;
  var effectiveIdx = printMode ? 0 : currentIdx;
  var effectiveTitle = printMode ? _printAll(2) : titleVis;

  React.useEffect(function() { if (!props.active) setCurrentIdx(0); }, [props.active]);

  // Register sub-navigation handler with the deck
  React.useEffect(function() {
    if (!props.registerSubNav || !props.active) return;
    var cleanup = props.registerSubNav(function(dir) {
      if (dir > 0 && currentIdx < surfaces.length - 1) {
        setCurrentIdx(currentIdx + 1);
        return true;
      }
      if (dir < 0 && currentIdx > 0) {
        setCurrentIdx(currentIdx - 1);
        return true;
      }
      return false;
    });
    return cleanup;
  }, [props.active, props.registerSubNav, currentIdx]);

  return (
    <Slide bg={BG_LIGHT} padding="0" label="Where">
      {React.createElement('div', { style: {
        width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
        background: '#FAF9F5', fontFamily: 'Anthropic Sans, system-ui, sans-serif',
        padding: '48px 64px', overflow: 'hidden', position: 'relative',
      }},
        React.createElement(Fade3, { vis: effectiveTitle.includes(0) },
          React.createElement('h2', { style: { fontFamily: "'Anthropic Serif', Georgia, serif", color: 'rgba(15,12,8,0.88)', fontSize: 32, fontWeight: 400, marginBottom: 6, letterSpacing: '-0.01em' } },
            'Claude Code runs ', React.createElement('span', { style: { color: '#D97757' } }, 'wherever you work'))),

        React.createElement('div', { style: { display: 'flex', gap: 6, alignItems: 'center', marginBottom: 24, marginTop: 4 } },
          surfaces.map(function(s, i) {
            return React.createElement('div', { key: i, style: { display: 'flex', alignItems: 'center', gap: 6 } },
              React.createElement('div', { style: {
                width: effectiveIdx === i ? 24 : 8, height: 8, borderRadius: 4,
                background: i <= effectiveIdx ? '#D97757' : 'rgba(15,12,8,0.1)',
                transition: 'all 0.5s cubic-bezier(0.22,1,0.36,1)',
                boxShadow: effectiveIdx === i ? '0 0 10px rgba(215,119,87,0.4)' : 'none',
              }}),
              effectiveIdx === i && React.createElement('span', { style: {
                color: '#D97757', fontSize: 12, fontWeight: 500, fontFamily: TERM.font,
              }}, s.label),
              i < surfaces.length - 1 && React.createElement('div', { style: {
                width: 16, height: 1, background: i < effectiveIdx ? 'rgba(215,119,87,0.3)' : 'rgba(15,12,8,0.06)',
                transition: 'background 0.5s',
              }}));
          })),

        React.createElement('div', { style: { flex: 1, position: 'relative', minHeight: 0 } },
          surfaces.map(function(s, i) {
            var isActive = effectiveIdx === i;
            var isPast = effectiveIdx > i;
            return React.createElement('div', { key: i, style: {
              position: 'absolute', inset: 0,
              opacity: isActive ? 1 : 0,
              transform: isActive ? 'translateX(0) scale(1)' : isPast ? 'translateX(-40px) scale(0.97)' : 'translateX(40px) scale(0.97)',
              transition: 'all 0.6s cubic-bezier(0.22,1,0.36,1)',
              pointerEvents: isActive ? 'auto' : 'none',
              display: 'flex', flexDirection: 'column',
            }},
              React.createElement('div', { style: { display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 14 } },
                React.createElement('h3', { style: { color: 'rgba(15,12,8,0.88)', fontSize: 22, fontWeight: 400 } }, s.label),
                React.createElement('span', { style: { color: 'rgba(15,12,8,0.45)', fontSize: 14 } }, s.desc)),
              React.createElement('div', { style: { flex: 1, position: 'relative', minHeight: 0 } },
                React.createElement('div', { style: {
                  position: 'absolute', inset: -30, borderRadius: 40, pointerEvents: 'none',
                  background: 'radial-gradient(ellipse, rgba(215,119,87,0.04) 0%, transparent 70%)',
                  filter: 'blur(20px)', opacity: isActive ? 1 : 0, transition: 'opacity 0.6s',
                }}),
                React.createElement('div', { style: {
                  position: 'relative', height: '100%', borderRadius: 10, overflow: 'hidden',
                  boxShadow: '0 12px 48px rgba(0,0,0,0.15), 0 0 0 1px rgba(15,12,8,0.08)',
                }},
                  React.createElement(s.Demo, { active: isActive && props.active }))));
          }))
      )}
    </Slide>
  );
}


// ============================================================================
// #6 — EXERCISE RECAPS (×4) — GENERIC (flag-service) content below.
// These are answer-key terminal replays — vehicle-specific by definition.
// Customer decks override via load-last in deck-slides-{customer}.jsx.
// Structure lifted from Expedia; Annot top offsets (82, 152, 228, 314) reused —
// terminal bodies line-count-matched to Expedia's.
// ============================================================================

// ── RecapEx1 — Fix the %101 bug ──────────────────────────────────────────────
function Slide_RecapEx1(props) {
  var sub = useSubSteps(4, props.registerSubNav);
  var step = _IS_PRINT ? 99 : sub.step;

  var annots = [
    { top: 82,  label: 'Test failure',    sub: 'user-23 excluded at 100% rollout',         color: '#6A9BCC' },
    { top: 152, label: 'Found it',        sub: 'hash % 101 \u2014 one too many buckets',   color: CLAY },
    { top: 228, label: 'One-char fix',    sub: '101 \u2192 100',                           color: '#9B8ABF' },
    { top: 314, label: 'Green',           sub: '4/4 passing',                              color: COLORS.green },
  ];

  return (
    <Slide bg={BG_LIGHT} padding="0" label="Recap Ex1">
      <RecapFrame
        kicker={'Exercise 1 \u00b7 Fix'} title="The %101 bug"
        termTitle={'replay \u00b7 ex 1'} showCloser={step >= 4}
        closer={'Not magic \u2014 it grepped, read, reasoned, edited. You just watched.'}
        annots={<>
          {annots.map(function (a, i) {
            return <Annot key={i} vis={step >= i + 1} active={step === i + 1} {...a} />;
          })}
        </>}
        termBody={<>
          <ClawdLogo path="~/flag-service" />
          <Spacer />

          {step >= 1 && <>
            <ToolCallSuccess name="Bash" args="npm test" />
            <Line>{'  '}<Red>{'\u2717 100% rollout includes all users \u2014 user-23 excluded'}</Red></Line>
            <Spacer />
          </>}

          {step >= 2 && <>
            <ToolCallSuccess name="Read" args="lib/evaluate.js" />
            <Line>{'  '}<Gray>{'\u2022'} line 14: const bucket = hash(userId) % 101</Gray></Line>
            <Line>{'  '}<Gray>{'\u2022'} 101 buckets but rollout is 0-100 \u2014 off-by-one</Gray></Line>
            <Spacer />
          </>}

          {step >= 3 && <>
            <ToolCallSuccess name="Edit" args="lib/evaluate.js" />
            <Line>{'  '}<span style={{ color: COLORS.diffRemovedFg, background: COLORS.diffRemovedBg }}>{'- const bucket = hash(userId) % 101'}</span></Line>
            <Line>{'  '}<span style={{ color: COLORS.diffAddedFg, background: COLORS.diffAddedBg }}>{'+ const bucket = hash(userId) % 100'}</span></Line>
            <Spacer />
          </>}

          {step >= 4 && <>
            <ToolCallSuccess name="Bash" args="npm test" />
            <Line>{'  '}<Green>{'\u2714 4/4 tests passing'}</Green></Line>
          </>}

          <Spacer />
          <InputBox />
          <StatusBar leftHint="? for shortcuts" rightStatus="claude opus" />
        </>}
      />
    </Slide>
  );
}

// ── RecapEx2 — CLAUDE.md + skill ─────────────────────────────────────────────
function Slide_RecapEx2(props) {
  var sub = useSubSteps(4, props.registerSubNav);
  var step = _IS_PRINT ? 99 : sub.step;

  var annots = [
    { top: 82,  label: 'CLAUDE.md filled',  sub: 'domain terms + test cmd',            color: '#6A9BCC' },
    { top: 152, label: 'SKILL.md written',  sub: '~20 lines of markdown',              color: CLAY },
    { top: 228, label: '/rollout fires',    sub: 'your slash command',                 color: '#9B8ABF' },
    { top: 314, label: 'Reuses lib/',       sub: 'skill wraps existing code',          color: COLORS.green },
  ];

  return (
    <Slide bg={BG_LIGHT} padding="0" label="Recap Ex2">
      <RecapFrame
        kicker={'Exercise 2 \u00b7 Teach'} title="CLAUDE.md + your first skill"
        termTitle={'replay \u00b7 ex 2'} showCloser={step >= 4}
        closer={'Tribal knowledge \u2192 slash command. 20 lines.'}
        annots={<>
          {annots.map(function (a, i) {
            return <Annot key={i} vis={step >= i + 1} active={step === i + 1} {...a} />;
          })}
        </>}
        termBody={<>
          <ClawdLogo path="~/flag-service" />
          <Spacer />

          {step >= 1 && <>
            <ToolCallSuccess name="Read" args="CLAUDE.md" />
            <Line>{'  '}<Gray>{'\u2022'} test: npm test {'\u00b7'} domain: flag/rollout/bucket/hash</Gray></Line>
            <Spacer />
          </>}

          {step >= 2 && <>
            <ToolCallSuccess name="Read" args=".claude/skills/rollout/SKILL.md" />
            <Line>{'  '}<Gray>{'\u2022'} name: rollout {'\u00b7'} description: check flag rollout %</Gray></Line>
            <Line>{'  '}<Gray>{'\u2022'} body: run lib/evaluate.js against a flag, report inclusion</Gray></Line>
            <Spacer />
          </>}

          {step >= 3 && <>
            <UserMessage>/rollout new-checkout</UserMessage>
            <Spacer />
            <Line><AssistantBullet />Checking new-checkout rollout config{'\u2026'}</Line>
            <Spacer />
          </>}

          {step >= 4 && <>
            <ToolCallSuccess name="Bash" args={'node -e \'require("./lib/evaluate")("new-checkout")\''} />
            <Line>{'  '}<Green>{'\u2714 75% rollout'}</Green><Gray>{' \u2014 ~3/4 users see new-checkout'}</Gray></Line>
          </>}

          <Spacer />
          <InputBox />
          <StatusBar leftHint="? for shortcuts" rightStatus="claude opus" />
        </>}
      />
    </Slide>
  );
}

// ── RecapEx3 — MCP wire ──────────────────────────────────────────────────────
function Slide_RecapEx3(props) {
  var sub = useSubSteps(4, props.registerSubNav);
  var step = _IS_PRINT ? 99 : sub.step;

  var pl = _P.plugins || {};
  var veh = _P.vehicle || 'flag-service';
  var mcpServer = pl.mcpServer || 'flag-store';
  var listPrompt = pl.mcpListPrompt || 'Which flags are >50% rollout?';
  var sample = pl.mcpListSample || [
    { name: 'new-checkout', pct: '75%' },
    { name: 'dark-mode',    pct: '60%' },
    { name: 'search-v2',    pct: '90%' },
  ];

  var annots = [
    { top: 82,  label: 'One-line wire',    sub: 'stdio transport \u2014 just a node cmd',  color: CLAY },
    { top: 152, label: 'Natural question', sub: 'no tool-name ceremony in the prompt',     color: '#34AADC' },
    { top: 228, label: 'Tool not grep',    sub: 'check transcript: it CALLED your API',    color: '#9B8ABF' },
    { top: 314, label: 'Structured answer',sub: 'Claude reads JSON, not parsed text',      color: COLORS.green },
  ];

  return (
    <Slide bg={BG_LIGHT} padding="0" label="Recap Ex3">
      <RecapFrame
        kicker={'Exercise 3 \u00b7 Wire'} title={'MCP \u2014 Claude calls your systems'}
        termTitle={'replay \u00b7 ex 3'} showCloser={step >= 4}
        closer="Claude didn't read a file. It called your API."
        annots={<>
          {annots.map(function (a, i) {
            return <Annot key={i} vis={step >= i + 1} active={step === i + 1} {...a} />;
          })}
        </>}
        termBody={<>
          <ClawdLogo path={'~/' + veh} />
          <Spacer />

          {step >= 1 && <>
            <Line><Gray>$ </Gray><White>{'claude mcp add ' + mcpServer + ' -- node mcp/' + mcpServer + '/server.js'}</White></Line>
            <Line>{'  '}<Green>{'\u2714'}</Green> Added MCP server <Bold>{mcpServer}</Bold> <Gray>(stdio)</Gray></Line>
            <Spacer />
          </>}

          {step >= 2 && <>
            <UserMessage>{listPrompt}</UserMessage>
            <Spacer />
          </>}

          {step >= 3 && <>
            <ToolCallSuccess name={'mcp__' + mcpServer + '__list'} args="all" />
            <Line>{'  '}<Gray>{'\u2022'} NOT a grep. NOT a file read. Actual tool call.</Gray></Line>
            <Spacer />
          </>}

          {step >= 4 && <>
            <Line><AssistantBullet />{sample.length + ' results:'}</Line>
            {sample.map(function (s, i) {
              return <Line key={i}>{'  '}<Gray>{'\u2022'} </Gray><Bold>{s.name}</Bold><Gray>{'  ' + s.pct}</Gray></Line>;
            })}
          </>}

          <Spacer />
          <InputBox />
          <StatusBar leftHint="? for shortcuts" rightStatus="opus \u00b7 mcp" />
        </>}
      />
    </Slide>
  );
}

// ── RecapEx4 — Plugin package ────────────────────────────────────────────────
function Slide_RecapEx4(props) {
  var sub = useSubSteps(3, props.registerSubNav);
  var step = _IS_PRINT ? 99 : sub.step;

  var pl = _P.plugins || {};
  var veh = _P.vehicle || 'flag-service';
  var toolkit   = pl.toolkit   || 'flag-toolkit';
  var mcpServer = pl.mcpServer || 'flag-store';
  var skillName = pl.skillName || 'rollout';

  var annots = [
    { top: 92,  label: 'plugin.json shape', sub: 'skills + MCP config + settings bundled', color: '#6A9BCC' },
    { top: 178, label: 'Validate green',    sub: 'schema check \u2014 ship-ready',         color: COLORS.green },
    { top: 264, label: 'Install',           sub: 'team gets your whole toolkit at once',   color: CLAY },
  ];

  return (
    <Slide bg={BG_LIGHT} padding="0" label="Recap Ex4">
      <RecapFrame
        kicker={'Exercise 4 \u00b7 Package'} title={'Plugin \u2014 ship your toolkit'}
        termTitle={'replay \u00b7 ex 4'} showCloser={step >= 3}
        closer="Skill + MCP + settings, one install. Ship it to the team."
        annots={<>
          {annots.map(function (a, i) {
            return <Annot key={i} vis={step >= i + 1} active={step === i + 1} {...a} />;
          })}
        </>}
        termBody={<>
          <ClawdLogo path={'~/' + veh} />
          <Spacer />

          {step >= 1 && <>
            <Line><Gray>$ </Gray><White>{'cat ' + toolkit + '/.claude-plugin/plugin.json'}</White></Line>
            <Line>{'  '}{'{'}</Line>
            <Line>{'    '}<Yellow>"name"</Yellow>{': '}<Green>{'"' + toolkit + '"'}</Green>{','}</Line>
            <Line>{'    '}<Yellow>"skills"</Yellow>{': ['}<Green>{'"' + skillName + '"'}</Green>{'],'}</Line>
            <Line>{'    '}<Yellow>"mcp"</Yellow>{': { '}<Green>{'"' + mcpServer + '"'}</Green>{': {...} }'}</Line>
            <Line>{'  '}{'}'}</Line>
            <Spacer />
          </>}

          {step >= 2 && <>
            <Line><Gray>$ </Gray><White>{'claude plugin validate ' + toolkit}</White></Line>
            <Line>{'  '}<Green>{'\u2714'}</Green> schema valid</Line>
            <Line>{'  '}<Green>{'\u2714'}</Green> 1 skill found</Line>
            <Line>{'  '}<Green>{'\u2714'}</Green> 1 MCP server configured</Line>
            <Spacer />
          </>}

          {step >= 3 && <>
            <Line><Gray>$ </Gray><White>{'claude plugin install ./' + toolkit}</White></Line>
            <Line>{'  '}<Green>{toolkit + ' installed'}</Green><Gray>{' \u2014 /' + skillName + ' + ' + mcpServer + ' MCP ready'}</Gray></Line>
          </>}

          <Spacer />
          <InputBox />
          <StatusBar leftHint="? for shortcuts" rightStatus="claude opus" />
        </>}
      />
    </Slide>
  );
}


// ============================================================================
// #7 — ROOKIE MOVES
// 6 symptom→why→fix cards. Lifted from Expedia; kicker made generic
// ("Even at 3,000 users" → "Even experienced users"). All use clawd.png.
// ============================================================================

var POWER_ROOKIE_MOVES = [
  { symptom: 'You sit and watch it read files. Approve each edit. Wait.',
    why: "Default asks per-change. Right for unknown code \u2014 not for a task you already trust.",
    fix: 'Shift+Tab  \u2192  auto-accept',
    fixNote: 'Runs without stopping. Review the full diff at the end.' },
  { symptom: 'Big refactor kicked off. Watching the spinner. Check Slack. Still going.',
    why: 'Long tasks hold the prompt hostage.',
    fix: 'Ctrl+B  \u2192  backgrounds it',
    fixNote: 'Keeps running. Prompt free. Notification on finish. Stack three, check back later.' },
  { symptom: 'Claude reads the wrong file. Esc twice. Clear session. Re-explain from scratch.',
    why: 'Esc once interrupts. Esc twice clears. Most people only know the second.',
    // bugFile interpolated at module-load — _CO is already populated by the time
    // this array literal evaluates (deck-profile.jsx loads before us).
    fix: 'Esc  \u2192  "actually, check @' + (_CO.bugFile || 'lib/foo.js') + '"',
    fixNote: 'Interrupt, steer one sentence, keep context. Almost never start over.' },
  { symptom: 'Type the path from memory. Wrong. Correct yourself. Twice.',
    why: '400 files, you remember maybe 12 paths.',
    // Derive a fuzzy-prefix from bugFile's basename (lib/prorate.js → @prora).
    // Every deck so far had this stale (Zoox showed @evalu against recall.js).
    fix: '@' + ((_CO.bugFile || 'foo.js').split('/').pop().slice(0, 5)) + '  \u2192  tab-completes',
    fixNote: 'Fuzzy. Globs too: @**/*.test.js grabs every test.' },
  { symptom: "Day three. Same session. Slow, confused, suggests things you ruled out.",
    why: 'Context builds up. Five unrelated tasks = dead weight.',
    fix: '/clear',
    fixNote: 'Fresh slate between tasks. CLAUDE.md and /resume still work.' },
  { symptom: 'Gnarly bug. Jumps straight to editing. Wrong fix. Revert. Try again. Wrong.',
    why: 'Default is to act. On hard problems: think first.',
    fix: 'Shift+Tab  \u2192  plan mode',
    fixNote: 'Read-only. Diagnose, propose, wait for your approve. No thrashing.' },
];

function Slide_Rookie(props) {
  var T = useTheme();
  var sub = useSubSteps(6, props.registerSubNav);
  var step = _IS_PRINT ? 99 : sub.step;

  return (
    <Slide bg={BG_LIGHT} padding="0" label="Rookie moves">
      <div style={{
        width: '100%', height: '100%', padding: '38px 56px 28px',
        position: 'relative', overflow: 'hidden',
        fontFamily: "'Anthropic Sans',system-ui",
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ marginBottom: 18 }}>
          {/* Deck-native header styles inlined — TYPE.h2 is Sans 40 / TYPE.kicker is
              0.18em tracking, which reads as a different deck next to 201/301's Serif
              32 + 0.08em KICKER. Don't edit TYPE in hooks.jsx; other broadcast
              internals (RecapEx chrome, card labels) still depend on Sans. */}
          <p style={{ fontSize: 12, fontWeight: 600, color: CLAY, textTransform: 'uppercase',
                      letterSpacing: '0.08em', marginBottom: 10 }}>Even experienced users</p>
          <h1 style={{ fontFamily: "'Anthropic Serif', Georgia, serif", fontSize: 32,
                       fontWeight: 400, color: T.text }}>
            Rookie moves. <span style={{ color: CLAY }}>Everyone still makes them.</span>
          </h1>
          <div style={{ width: '100%', height: 1, background: T.hr, marginTop: 12 }} />
        </div>

        <div style={{
          flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '20px 28px', alignContent: 'start',
        }}>
          {POWER_ROOKIE_MOVES.map(function (m, i) {
            return <_RookieCard key={i} move={m} vis={step >= i + 1} active={step === i + 1} />;
          })}
        </div>
      </div>
    </Slide>
  );
}


// ============================================================================
Object.assign(window, {
  Slide_ColdOpen, Slide_WhatIsLoop, Slide_NoOneWay, Slide_Boris, Slide_Where,
  Slide_RecapEx1, Slide_RecapEx2, Slide_RecapEx3, Slide_RecapEx4, Slide_Rookie,
  // Demo* inner components — exported so customer decks can reference them
  // when building a custom WHERE_SURFACES array (e.g. TMO's GitLab 3-surface).
  DemoCLI, DemoIDE, DemoWeb, DemoEverywhere,
});
