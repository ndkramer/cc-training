// ═══════════════════════════════════════════════════════════════
// DECK SLIDES — WRAP (Title, Agenda, Break, Recap, Resources, Q&A, Thanks)
// Agenda and Recap are DYNAMIC — they receive {visibleSlides, config}
// from deck.html and render what the current config actually includes.
// ═══════════════════════════════════════════════════════════════

// Shared palette / type scale. Each deck-slides-*.jsx file redeclares
// these (they're `const`, so no cross-file leak under Babel's default
// non-module transform). Keeps each file self-contained.
const CLAY = '#D97757', OAT = '#F0EEE6', DARK = '#141413', BONE = '#FAF9F5', GRAY = '#73726C';
const SERIF = "'Anthropic Serif', Georgia, serif";
const MONO = "'JetBrains Mono', monospace";
const H2 = { fontFamily: SERIF, fontSize: 32, fontWeight: 400, marginBottom: 24 };
const KICKER = { fontSize: 12, fontWeight: 600, color: CLAY, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 };
const SUB = { fontSize: 14, color: GRAY, marginBottom: 32, lineHeight: 1.5 };

// ── Title ─────────────────────────────────────────────────────────
// Gear icon bottom-left opens the config panel. deck.html passes
// `openConfig` down via props.
function Slide_Title({ openConfig }) {
  return (
    <Slide bg={DARK} color={BONE} label="Title" center>
      <img src="assets/white-spark.svg" alt="" style={{ width: 44, height: 44, marginBottom: 28 }} />
      <h1 style={{
        fontFamily: SERIF, fontSize: 52, fontWeight: 360,
        lineHeight: 1.12, letterSpacing: '-0.02em', marginBottom: 14,
        textAlign: 'center', maxWidth: 680,
      }}>
        Claude Code Workshop
      </h1>
      <div style={{ fontSize: 18, fontWeight: 430, color: CLAY, marginBottom: 56 }}>
        101 → 301
      </div>
      <p style={{ fontSize: 13, color: 'rgba(250,249,245,0.35)', fontWeight: 430, fontFamily: MONO }}>
        press C to configure
      </p>
      {/* Gear icon — fixed bottom-left of the 1024×768 canvas */}
      <button
        className="gear-icon"
        onClick={openConfig}
        aria-label="Open workshop config"
      >⚙</button>
    </Slide>
  );
}

// ── Agenda (dynamic) ──────────────────────────────────────────────
// Walks visibleSlides, groups by section marker. Time formula:
// content × 2min + demo × 2min + exercise × 12min + break × 8min.
// Section slides themselves cost 0 — they're transitions.
function Slide_Agenda({ visibleSlides = [], config = {} }) {
  // Fixed budgets for the things that have real wall-clock commitments.
  // Content-slide minutes are calibrated below so the total fills the slot.
  const MIN_PER = { demo: 3, exercise: 12, break: 8 };

  // Count by kind so we can calibrate content-slide minutes to the remainder.
  // Demos/exercises/breaks have fixed budgets — content expands to fill.
  const target = (config.duration || 2) * 60;
  let nContent = 0, fixed = 0;
  for (const s of visibleSlides) {
    if (s.kind === 'content') nContent++;
    else if (MIN_PER[s.kind]) fixed += MIN_PER[s.kind];
  }
  MIN_PER.content = nContent > 0 ? Math.max(1, (target - fixed) / nContent) : 2;

  // Walk slides → groups delimited by section markers. Breaks aren't part
  // of a group's flow — they become interleaved strips after that group.
  const groups = [];
  let cur = { title: 'Open', sub: '', slides: [], breakAfter: null };
  let demoN = 0, exN = 0;
  for (const s of visibleSlides) {
    if (s.kind === 'section') {
      if (cur.slides.length) groups.push(cur);
      cur = { title: s.title || 'Section', sub: s.sub || '', slides: [], breakAfter: null };
    } else if (s.kind === 'break') {
      cur.breakAfter = MIN_PER.break;
    } else {
      if (s.kind === 'demo') demoN++;
      if (s.kind === 'exercise') exN++;
      cur.slides.push({ ...s, _n: s.kind === 'demo' ? demoN : s.kind === 'exercise' ? exN : null });
    }
  }
  if (cur.slides.length) groups.push(cur);

  // Split wrap (Recap onwards) off the tail of Part 3.
  const last = groups[groups.length - 1];
  let wrapMin = 0;
  if (last) {
    const idx = last.slides.findIndex(s => s.c === 'Slide_Recap');
    if (idx >= 0) {
      wrapMin = last.slides.splice(idx).length * MIN_PER.content;
    }
  }
  const openMin = (groups[0]?.title === 'Open' ? groups.shift().slides.length : 0) * MIN_PER.content;

  // Build a chronological flow bar per group. Consecutive content slides
  // merge into one segment so the bar isn't a comb of 2m slivers.
  const buildFlow = (slides) => {
    const f = [];
    for (const s of slides) {
      const m = MIN_PER[s.kind] || MIN_PER.content;
      if (s.kind === 'content' && f.length && f[f.length - 1].k === 's') {
        f[f.length - 1].m += m;
      } else if (s.kind === 'demo') {
        f.push({ m, k: 'd', id: s._n });
      } else if (s.kind === 'exercise') {
        f.push({ m, k: 'e', id: s._n });
      } else {
        f.push({ m, k: 's' });
      }
    }
    return f;
  };

  // Running clock for the time chips on each card.
  // Content minutes are fractional — round at display boundaries only.
  let clock = openMin;
  const fmt = (m) => { const r = Math.round(m); return `${Math.floor(r / 60)}:${String(r % 60).padStart(2, '0')}`; };
  for (const g of groups) {
    g.t = fmt(clock);
    g.flow = buildFlow(g.slides);
    g.dur = Math.round(g.flow.reduce((a, f) => a + f.m, 0));
    clock += g.dur;
    if (g.breakAfter) { g.breakT = fmt(clock); clock += g.breakAfter; }
  }
  const qaT = fmt(clock);

  // Totals by kind, across everything.
  const tot = { slides: openMin + wrapMin, demos: 0, hands: 0, breaks: 0 };
  for (const g of groups) {
    for (const f of g.flow) {
      if (f.k === 's') tot.slides += f.m;
      else if (f.k === 'd') tot.demos += f.m;
      else if (f.k === 'e') tot.hands += f.m;
    }
    if (g.breakAfter) tot.breaks += g.breakAfter;
  }
  tot.slides = Math.round(tot.slides);
  const TOTAL = tot.slides + tot.demos + tot.hands + tot.breaks;
  wrapMin = Math.round(wrapMin);

  // One proportional segment of a flow bar. flex-basis = minutes.
  const Seg = ({ min, bg, fg, label, sub, bordered }) => (
    <div style={{
      flex: `${min} 0 0`, background: bg, color: fg, minWidth: 0,
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      padding: '0 7px', borderRight: bordered ? '1px solid rgba(20,20,19,0.08)' : 'none',
      fontFamily: MONO, fontSize: 10, lineHeight: 1.3, whiteSpace: 'nowrap', overflow: 'hidden',
    }}>
      <div style={{ fontWeight: 600 }}>{label}</div>
      {sub && <div style={{ opacity: 0.55 }}>{sub}</div>}
    </div>
  );

  const SEG_KIND = {
    s: { bg: '#fff', fg: GRAY, label: (f) => f.m >= 5 ? 'slides' : '',    bordered: true },
    d: { bg: CLAY,   fg: DARK, label: (f) => `demo ${f.id}`,              bordered: false },
    e: { bg: DARK,   fg: BONE, label: (f) => `🔨 ex ${f.id}`,             bordered: false },
  };

  return (
    <Slide bg={BONE} label="Agenda">
      <div style={KICKER}>Agenda · {config.duration || '—'}h · {LEVEL_LABEL[config.level] || 'all levels'} · ~{TOTAL} min</div>
      <h2 style={{ ...H2, marginBottom: 6 }}>Three parts. Concepts, then you build.</h2>
      <p style={{ ...SUB, marginBottom: 18 }}>
        Clay means live demo. Dark means your turn. Oat means break.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 18 }}>
        {groups.map((g, i) => (
          <React.Fragment key={i}>
            <div style={{
              background: '#fff', border: '1px solid rgba(20,20,19,0.06)',
              borderLeft: `3px solid ${CLAY}`, borderRadius: 10, padding: '12px 16px',
            }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 8 }}>
                <span style={{ fontFamily: MONO, fontSize: 11, color: GRAY }}>{g.t}</span>
                <span style={{ fontSize: 15, fontWeight: 600 }}>{g.title}</span>
                <span style={{ fontSize: 11.5, color: GRAY, flex: 1 }}>{g.sub}</span>
                <span style={{ fontFamily: MONO, fontSize: 11, color: CLAY, fontWeight: 600 }}>{g.dur} min</span>
              </div>
              <div style={{ display: 'flex', height: 30, borderRadius: 6, overflow: 'hidden', border: '1px solid rgba(20,20,19,0.06)' }}>
                {g.flow.map((f, j) => {
                  const k = SEG_KIND[f.k];
                  return <Seg key={j} min={f.m} bg={k.bg} fg={k.fg}
                    label={k.label(f)} sub={f.m >= 6 ? `${Math.round(f.m)}m` : null} bordered={k.bordered} />;
                })}
              </div>
            </div>
            {g.breakAfter && (
              <div style={{
                display: 'flex', alignItems: 'baseline', gap: 12,
                margin: '0 16px', padding: '5px 16px',
                background: OAT, borderRadius: 6, fontFamily: MONO, fontSize: 10.5,
              }}>
                <span style={{ color: GRAY }}>{g.breakT}</span>
                <span style={{ color: DARK, fontWeight: 600, letterSpacing: '0.04em' }}>break</span>
                <span style={{ marginLeft: 'auto', color: GRAY }}>{g.breakAfter} min</span>
              </div>
            )}
          </React.Fragment>
        ))}
        {wrapMin > 0 && (
          <div style={{
            display: 'flex', alignItems: 'baseline', gap: 12,
            margin: '0 16px', padding: '5px 16px',
            background: 'rgba(217,119,87,0.10)', borderRadius: 6, fontFamily: MONO, fontSize: 10.5,
          }}>
            <span style={{ color: GRAY }}>{qaT}</span>
            <span style={{ color: CLAY, fontWeight: 600, letterSpacing: '0.04em' }}>Q&amp;A + wrap</span>
            <span style={{ marginLeft: 'auto', color: GRAY }}>{wrapMin} min</span>
          </div>
        )}
      </div>

      {/* Totals strip */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: GRAY, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Total
        </span>
        <div style={{ flex: 1, display: 'flex', height: 24, borderRadius: 6, overflow: 'hidden', border: '1px solid rgba(20,20,19,0.08)' }}>
          <Seg min={tot.slides} bg="#fff" fg={GRAY} label={`slides ${tot.slides}m`} bordered />
          {tot.demos > 0 && <Seg min={tot.demos} bg={CLAY} fg={DARK} label={`demos ${tot.demos}m`} />}
          {tot.hands > 0 && <Seg min={tot.hands} bg={DARK} fg={BONE} label={`hands-on ${tot.hands}m`} />}
          {tot.breaks > 0 && <Seg min={tot.breaks} bg={OAT} fg={DARK} label={`breaks ${tot.breaks}m`} />}
        </div>
        <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 600, color: DARK }}>= {TOTAL}</span>
      </div>
    </Slide>
  );
}

// ── Break ─────────────────────────────────────────────────────────
function Slide_Break1() {
  return <BreakSlide minutes={8} />;
}

// ── Recap (dynamic) ───────────────────────────────────────────────
// Lists what was actually shown. Mapping from slide names → concepts.
// Only concepts whose source slide appears in visibleSlides show up.
function Slide_Recap({ visibleSlides = [] }) {
  const CONCEPTS = [
    { slide: 'Slide_WhatIsLoop',   label: 'The core loop — read, decide, act, observe' },
    { slide: 'Slide_FeatureLadder',label: 'The feature ladder — where your team sits' },
    { slide: 'Slide_ClaudeMd',     label: 'CLAUDE.md — teach Claude your repo' },
    { slide: 'Slide_PlanMode',     label: 'Plan Mode — propose before editing' },
    { slide: 'Slide_SpecTDD',      label: 'Spec-driven & TDD — define success first' },
    { slide: 'Slide_Skills',       label: 'Skills — slash commands you define' },
    { slide: 'Slide_InputShortcuts', label: 'Input shortcuts — !, @, paste' },
    { slide: 'Slide_Hooks',        label: 'Hooks — fire on tool events' },
    { slide: 'Slide_Subagents',    label: 'Subagents — isolated context, parallel work' },
    { slide: 'Slide_MCP',          label: 'MCP — connect Claude to your systems' },
    { slide: 'Slide_CCWeb',        label: 'Claude Code Web — same agent, browser' },
    { slide: 'Slide_ManagedMCP',   label: 'Managed MCP — org-wide connectors' },
    { slide: 'Slide_Plugins',      label: 'Plugins — bundle & ship workflows' },
    { slide: 'Slide_AgentTeams',   label: 'Agent teams — parallel Claudes, one goal' },
    { slide: 'Slide_ParallelCompare', label: 'Parallel work — which mechanism, when' },
  ];
  const shown = new Set(visibleSlides.map(s => s.c));
  const learned = CONCEPTS.filter(c => shown.has(c.slide));

  return (
    <Slide bg={BONE} label="Recap">
      <div style={KICKER}>Recap</div>
      <h2 style={H2}>Here's what you learned today</h2>
      <div style={{
        flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: '10px 24px', alignContent: 'center',
      }}>
        {learned.map((c, i) => (
          <div key={i} style={{
            display: 'flex', gap: 10, alignItems: 'flex-start',
            padding: '10px 0',
          }}>
            <span style={{
              width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
              background: 'rgba(217,119,87,0.12)', color: CLAY,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 700,
            }}>✓</span>
            <span style={{ fontSize: 14, lineHeight: 1.4, color: DARK }}>{c.label}</span>
          </div>
        ))}
      </div>
      <div style={{
        marginTop: 16, padding: '14px 18px', background: 'rgba(217,119,87,0.06)',
        borderRadius: 8, fontSize: 13, color: DARK,
      }}>
        <strong style={{ color: CLAY }}>Keep the repo.</strong> The order-service
        exercises are starting points, not throwaway demos.
      </div>
    </Slide>
  );
}

// ── Resources ─────────────────────────────────────────────────────
function Slide_Resources() {
  const LinkRow = ({ href, label }) => (
    <div style={{ fontSize: 14, fontFamily: MONO, color: DARK, marginBottom: 8 }}>
      <span style={{ color: CLAY, marginRight: 8 }}>→</span>{href}
      <span style={{ color: GRAY, marginLeft: 12, fontFamily: "'Anthropic Sans', sans-serif", fontSize: 12 }}>{label}</span>
    </div>
  );
  return (
    <Slide bg={BONE} label="Resources">
      <div style={KICKER}>Resources</div>
      <h2 style={H2}>Where to go next</h2>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <PlatformSwitch>
          <div data-platform="c4e">
            <LinkRow href="claude.ai/enterprise" label="Enterprise console" />
            <LinkRow href="docs.anthropic.com/claude-code" label="Full docs" />
            <LinkRow href="docs.anthropic.com/claude-code/web" label="Claude Code Web" />
            <LinkRow href="docs.anthropic.com/claude-code/skills" label="Writing skills" />
            <LinkRow href="docs.anthropic.com/claude-code/mcp" label="MCP connectors" />
          </div>
          <div data-platform="bedrock">
            <LinkRow href="docs.anthropic.com/claude-code" label="Full docs" />
            <LinkRow href="docs.anthropic.com/claude-code/bedrock" label="Bedrock setup" />
            <LinkRow href="docs.aws.amazon.com/bedrock/claude" label="AWS model access" />
            <LinkRow href="docs.anthropic.com/claude-code/skills" label="Writing skills" />
          </div>
          <div data-platform="vertex">
            <LinkRow href="docs.anthropic.com/claude-code" label="Full docs" />
            <LinkRow href="docs.anthropic.com/claude-code/vertex" label="Vertex setup" />
            <LinkRow href="cloud.google.com/vertex-ai/docs/claude" label="GCP model access" />
            <LinkRow href="docs.anthropic.com/claude-code/skills" label="Writing skills" />
          </div>
          <div data-platform="azure">
            <LinkRow href="docs.anthropic.com/claude-code" label="Full docs" />
            <LinkRow href="docs.anthropic.com/claude-code/azure" label="Azure setup" />
            <LinkRow href="docs.anthropic.com/claude-code/skills" label="Writing skills" />
          </div>
          <div data-platform="default">
            <LinkRow href="docs.anthropic.com/claude-code" label="Full docs" />
            <LinkRow href="console.anthropic.com" label="API console & keys" />
            <LinkRow href="docs.anthropic.com/claude-code/skills" label="Writing skills" />
            <LinkRow href="docs.anthropic.com/claude-code/mcp" label="MCP servers" />
            <LinkRow href="github.com/anthropics/claude-agent-sdk" label="Agent SDK" />
          </div>
        </PlatformSwitch>
      </div>
    </Slide>
  );
}

// ── Q&A ───────────────────────────────────────────────────────────
function Slide_QA() {
  return (
    <Slide bg="#CC785C" color={DARK} label="Q&A" center>
      <h1 style={{ fontFamily: SERIF, fontSize: 88, fontWeight: 340 }}>Q&amp;A</h1>
      <div style={{ fontSize: 13, opacity: 0.55, marginTop: 20, fontFamily: MONO }}>
        pricing · security · languages · rollout
      </div>
    </Slide>
  );
}

// ── Thanks ────────────────────────────────────────────────────────
// Tri-brand close: Anthropic spark + "Delivered by Accenture" mark.
function Slide_Thanks() {
  return (
    <Slide bg={DARK} color={BONE} label="Thanks" center>
      <img src="assets/white-spark.svg" alt="" style={{ width: 40, height: 40, marginBottom: 24 }} />
      <h1 style={{ fontFamily: SERIF, fontSize: 48, fontWeight: 380, marginBottom: 40 }}>Thank you</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10,
                    fontSize: 12, color: 'rgba(250,249,245,0.45)' }}>
        <span>Delivered by</span>
        <img src="../../_shared/assets/Acc_Logo_White_Purple_RGB.svg" alt="Accenture"
             style={{ height: 18, opacity: 0.85 }} />
      </div>
    </Slide>
  );
}

Object.assign(window, {
  Slide_Title, Slide_Agenda, Slide_Break1,
  Slide_Recap, Slide_Resources, Slide_QA, Slide_Thanks,
});
