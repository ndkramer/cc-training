// ============================================
// DECK COMPONENTS — Generic Claude Code Workshop (Parametric)
// Base copied from GE Vernova 3 Hour Workshop; extended with
// PlatformContext/Switch, ConfigPanel, DemoSlide, ExerciseSlide, BreakSlide.
// ============================================

// --- Base Slide Container ---
// Outer div: full-viewport bg layer (participates in the opacity transition).
// Inner div: the 1024×768 design canvas, centered, scaled via --deck-scale.
// No letterbox — the slide bg IS the background everywhere.
function Slide({ bg = '#FAF9F5', color = '#141413', children, label, padding = '64px 80px', center = false }) {
  return (
    <div
      data-screen-label={label}
      style={{ position: 'absolute', inset: 0, background: bg }}
    >
      <div
        style={{
          position: 'absolute', top: '50%', left: '50%',
          width: 1024, height: 768,
          transform: 'translate(-50%, -50%) scale(var(--deck-scale, 1))',
          color: color,
          padding: padding,
          display: 'flex', flexDirection: 'column',
          fontFamily: "'Anthropic Sans', -apple-system, sans-serif",
          overflow: 'hidden',
          justifyContent: center ? 'center' : 'flex-start',
          alignItems: center ? 'center' : 'stretch',
        }}
      >
        {children}
      </div>
    </div>
  );
}

// --- Optical vertical centering well ---
// Problem: header (kicker/H2/SUB) eats space from the top, then a
// flex:1 + alignItems:center body centers in the *remaining* space —
// always south of the slide's true middle. Looks low.
// Fix: two spacers, bottom grows faster. Content lands above the
// mathematical center by a ratio, no hardcoded pixels.
//   lift=1   → no correction (old behaviour)
//   lift=1.6 → slides with a SUB paragraph (default)
//   lift=2.2 → slides with just kicker+H2 (thin header, needs more pull)
// Children centre horizontally by default — pass stretch for full-width stacks.
function VCenter({ children, lift = 1.6, stretch = false }) {
  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0,
      alignItems: stretch ? 'stretch' : 'center',
    }}>
      <div style={{ flex: 1, minHeight: 0 }} />
      {children}
      <div style={{ flex: lift, minHeight: 0 }} />
    </div>
  );
}

// --- Section Divider Slide ---
function SectionSlide({ title, subtitle, bg = '#D97757', color = '#141413', lottieSrc, number }) {
  return (
    <Slide bg={bg} color={color} label={title} padding="0" center>
      <div style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '64px 80px',
        position: 'relative', zIndex: 1,
      }}>
        {lottieSrc && (
          // Object-* lotties are dark monoline on transparent — invisible on
          // #141413. Invert flips the strokes near-white; no-op on grayscale hue.
          <div style={{ marginBottom: 28, opacity: 0.85, filter: bg === '#141413' ? 'invert(1)' : 'none' }}>
            <dotlottie-player
              src={lottieSrc} autoplay loop
              style={{ width: '96px', height: '96px' }}
            ></dotlottie-player>
          </div>
        )}
        {number && (
          <div style={{
            fontSize: 13, fontWeight: 600, letterSpacing: '0.1em',
            textTransform: 'uppercase', marginBottom: 12,
            opacity: 0.6,
          }}>
            {(window.DECK_PROFILE && window.DECK_PROFILE.sectionLabel) || 'Part'} {number}
          </div>
        )}
        <h1 style={{
          fontFamily: "'Anthropic Serif', Georgia, serif",
          fontSize: 56, fontWeight: 380,
          letterSpacing: '-0.02em', lineHeight: 1.1,
        }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{
            fontSize: 19, fontWeight: 430,
            opacity: 0.65, marginTop: 16,
            maxWidth: 500, lineHeight: 1.4,
          }}>
            {subtitle}
          </p>
        )}
      </div>
    </Slide>
  );
}

// --- Terminal Mockup ---
function TerminalMockup({ children, title = '~/project', width = 700 }) {
  return (
    <div style={{
      width: width, backgroundColor: '#1a1918',
      borderRadius: 8, overflow: 'hidden',
      outline: '1px solid rgba(255,255,255,0.08)',
      boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
    }}>
      <div style={{
        background: '#252321',
        padding: '8px 12px',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27ca40' }} />
        {title && <span style={{
          marginLeft: 'auto',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11, color: 'rgb(136,136,136)',
        }}>{title}</span>}
      </div>
      <div style={{
        padding: '16px 20px',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11, lineHeight: '13px', color: '#d1cfc5',
        whiteSpace: 'pre',
      }}>
        {children}
      </div>
    </div>
  );
}

// Terminal text primitives — matched to Claude Code UI kit
function TLine({ children, color }) {
  return <div style={{ height: 13, lineHeight: '13px', color }}>{children}</div>;
}
function TBlank({ lines = 1 }) { return <div style={{ height: 13 * lines }} />; }
function TGray({ children }) { return <span style={{ color: 'rgb(153,153,153)' }}>{children}</span>; }
function TDim({ children }) { return <span style={{ color: 'rgb(136,136,136)' }}>{children}</span>; }
function TBlue({ children }) { return <span style={{ color: 'rgb(177,185,249)' }}>{children}</span>; }
function TGreen({ children }) { return <span style={{ color: 'rgb(78,186,101)' }}>{children}</span>; }
function TOrange({ children }) { return <span style={{ color: 'rgb(215,119,87)' }}>{children}</span>; }
function TWhite({ children }) { return <span style={{ color: '#fff' }}>{children}</span>; }
function TBold({ children }) { return <span style={{ fontWeight: 600 }}>{children}</span>; }
// TLine indent + fixed-width filename helpers. Used in file-tree mockups
// and available to deck-profile.jsx nesting.tree fragments.
function Ind({ n, children }) { return <span style={{ paddingLeft: n * 14 }}>{children}</span>; }
function Fn({ w = 130, children }) { return <span style={{ display: 'inline-block', width: w }}>{children}</span>; }
function THr({ w = 60 }) {
  return <TLine><span style={{ color: 'rgb(136,136,136)', opacity: 0.7 }}>{'─'.repeat(w)}</span></TLine>;
}
function TPrompt({ children }) {
  return <TLine><span style={{ color: 'rgb(80,80,80)' }}>{'❯ '}</span><span style={{ color: '#fff' }}>{children}</span></TLine>;
}
function TAssistant({ children }) {
  return <TLine><TWhite>{'⏺ '}</TWhite><span>{children}</span></TLine>;
}
function TToolOk({ name, detail }) {
  return (
    <TLine>
      <TGreen>{'⏺ '}</TGreen>
      <TBold>{name}</TBold>
      {detail && <span>{' '}<TGray>{detail}</TGray></span>}
    </TLine>
  );
}
function TResult({ children }) {
  return <TLine><span>{'  ⎿  '}</span><span>{children}</span></TLine>;
}
function TSep() {
  return <THr />;
}
function TLogo({ model = 'sonnet-4-6', path = '~/project' }) {
  return (
    <React.Fragment>
      <TLine>
        <TOrange>{' ▐'}</TOrange>
        <span style={{ background: '#000' }}><TOrange>{'▛███▜'}</TOrange></span>
        <TOrange>{'▌'}</TOrange>
        {'   '}<TBold>Claude Code</TBold>
      </TLine>
      <TLine>
        <TOrange>{'▝▜'}</TOrange>
        <span style={{ background: '#000' }}><TOrange>{'█████'}</TOrange></span>
        <TOrange>{'▛▘'}</TOrange>
        {'  '}<TGray>{model}</TGray>
      </TLine>
      <TLine>
        {'  '}<TOrange>{'▘▘ ▝▝'}</TOrange>
        {'    '}<TGray>{path}</TGray>
      </TLine>
    </React.Fragment>
  );
}
function TInputBox({ content, placeholder }) {
  return (
    <React.Fragment>
      <THr />
      <TLine>
        <span style={{ color: 'rgb(80,80,80)' }}>{'❯ '}</span>
        {content
          ? <span style={{ background: 'rgb(55,55,55)', color: '#fff' }}>{content}{' '}</span>
          : placeholder
            ? <span style={{ opacity: 0.7 }}>{placeholder}</span>
            : <span style={{ background: '#d1cfc5', color: '#1a1918' }}>{' '}</span>
        }
      </TLine>
      <THr />
    </React.Fragment>
  );
}
function TStatusBar({ left = '? for shortcuts', right = '' }) {
  return (
    <TLine>
      <span>{'  '}<TGray>{left}</TGray></span>
      {right && <span style={{ float: 'right' }}><TGray>{right}</TGray></span>}
    </TLine>
  );
}

// --- Code Editor Mockup ---
function EditorMockup({ filename, children, width = 680 }) {
  return (
    <div style={{
      width, backgroundColor: '#1e1e1e', borderRadius: 10,
      overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
    }}>
      <div style={{
        height: 34, backgroundColor: '#252526',
        display: 'flex', alignItems: 'center',
        borderBottom: '1px solid #1e1e1e',
      }}>
        <div style={{
          padding: '0 14px', height: '100%', display: 'flex', alignItems: 'center',
          backgroundColor: '#1e1e1e', fontSize: 11.5, color: '#ccc',
          fontFamily: "'JetBrains Mono', monospace", borderTop: '2px solid #D97757',
        }}>{filename}</div>
      </div>
      <div style={{
        padding: '14px 0',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 12, lineHeight: '20px', color: '#d4d4d4',
      }}>{children}</div>
    </div>
  );
}

function ELine({ num, indent = 0, children }) {
  return (
    <div style={{ display: 'flex', paddingRight: 14 }}>
      <span style={{ width: 38, textAlign: 'right', paddingRight: 14, color: '#555', flexShrink: 0, userSelect: 'none' }}>{num}</span>
      <span style={{ flex: 1, whiteSpace: 'pre' }}>{'  '.repeat(indent)}{children}</span>
    </div>
  );
}

// Syntax colors
function Kw({ children }) { return <span style={{ color: '#569cd6' }}>{children}</span>; }
function Str({ children }) { return <span style={{ color: '#ce9178' }}>{children}</span>; }
function Cmt({ children }) { return <span style={{ color: '#6a9955' }}>{children}</span>; }
function FnC({ children }) { return <span style={{ color: '#dcdcaa' }}>{children}</span>; }
function Typ({ children }) { return <span style={{ color: '#4ec9b0' }}>{children}</span>; }
function Punc({ children }) { return <span style={{ color: '#d4d4d4' }}>{children}</span>; }

// --- Info Card ---
function InfoCard({ icon, title, items, accent = '#D97757', wide }) {
  return (
    <div style={{
      backgroundColor: '#fff', borderRadius: 12,
      padding: wide ? '20px 24px' : '20px 20px',
      border: '1px solid rgba(31,30,29,0.08)',
      boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
      flex: 1, minWidth: 0,
    }}>
      {icon && <div style={{
        width: 36, height: 36, borderRadius: 9,
        backgroundColor: accent + '12', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        fontSize: 18, marginBottom: 10, color: accent,
      }}>
        <i className={`ai-${icon}`}></i>
      </div>}
      <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6, color: '#141413' }}>{title}</div>
      {items && (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 12.5, color: '#73726C', lineHeight: '20px' }}>
          {items.map((item, i) => (
            <li key={i} style={{ display: 'flex', gap: 6, alignItems: 'baseline', marginTop: 3 }}>
              <span style={{ color: accent, fontSize: 7 }}>●</span>{item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// --- Agenda Block ---
function AgendaBlock({ duration, title, color = '#D97757', isDemo }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '10px 0' }}>
      <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: color, flexShrink: 0 }} />
      <div style={{
        width: 56, fontSize: 13, fontWeight: 500, color: '#73726C',
        fontFamily: "'JetBrains Mono', monospace", flexShrink: 0,
      }}>{duration}</div>
      <div style={{
        fontSize: 16, fontWeight: isDemo ? 600 : 430, color: '#141413',
      }}>
        {title}
        {isDemo && <span style={{
          display: 'inline-block', marginLeft: 10,
          fontSize: 11, fontWeight: 500, color: '#D97757',
          backgroundColor: '#D9775712', padding: '2px 8px',
          borderRadius: 4,
        }}>live</span>}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// PARAMETRIC DECK EXTENSIONS
// ════════════════════════════════════════════════════════════════

// --- Platform switching ---
// Wrap the whole deck in <PlatformContext.Provider value={config.platform}>.
// Inside any slide, use <PlatformSwitch> with children tagged data-platform.
// The switch picks the child matching the current platform, falling back to
// the one tagged 'default'. Keeps install commands / model IDs / docs links
// inline with slide content instead of scattered across if-branches.
const PlatformContext = React.createContext('c4e');

function PlatformSwitch({ children }) {
  const platform = React.useContext(PlatformContext);
  const variants = React.Children.toArray(children);
  const match = variants.find(v => v.props && v.props['data-platform'] === platform)
             || variants.find(v => v.props && v.props['data-platform'] === 'default');
  return match || null;
}

// --- ConfigPanel ---
// Left-drawer overlay. Toggled by `C` key or gear icon.
//   Filters  — duration / level / platform sliders gate the master slide set.
//   Branding — company name + logo (patched into DECK_PROFILE.coldOpen.cobrand).
//   Slides   — per-slide checkboxes override the filter result. Grouped by section.
//   Footer   — live count, Copy Link (base64 config in URL), Reset.
const LEVEL_LABEL = { 0: 'All levels', 1: 'New to CC', 2: 'Some experience', 3: 'Power user' };

const KIND_BADGE = {
  demo:     { label: 'DEMO', bg: 'rgba(217,119,87,0.12)', fg: '#D97757' },
  exercise: { label: 'EX',   bg: 'rgba(94,147,94,0.12)',  fg: '#5E935E' },
  break:    { label: 'BRK',  bg: 'rgba(115,114,108,0.12)',fg: '#73726C' },
};

// Walk the registry (optionally reordered) and split on kind==='section'.
// Slides before the first section marker go into a synthetic "Open" group.
function groupSlidesBySection(allSlides, slideOrder) {
  let ordered = allSlides;
  if (slideOrder && slideOrder.length) {
    const byName = Object.fromEntries(allSlides.map(s => [s.c, s]));
    const seen = new Set(slideOrder);
    ordered = slideOrder.map(c => byName[c]).filter(Boolean)
      .concat(allSlides.filter(s => !seen.has(s.c)));
  }
  const groups = [];
  let cur = { title: 'Open', slides: [] };
  for (const s of ordered) {
    if (s.kind === 'section') {
      if (cur.slides.length) groups.push(cur);
      cur = { title: s.title || s.c.replace(/^Slide_Section/, ''), marker: s, slides: [] };
    } else {
      cur.slides.push(s);
    }
  }
  if (cur.slides.length) groups.push(cur);
  return groups;
}

// Small collapsible wrapper — chevron header toggles body visibility.
function CfgSection({ title, badge, defaultOpen = true, className = '', children }) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <section className={`cfg-section ${className} ${open ? '' : 'collapsed'}`}>
      <h3 onClick={() => setOpen(o => !o)}>
        <span className="cfg-chevron">{open ? '▾' : '▸'}</span>
        {title}
        {badge}
      </h3>
      {open && children}
    </section>
  );
}

function slideTitle(s) {
  return s.c.replace(/^Slide_/, '').replace(/([a-z])([A-Z])/g, '$1 $2');
}

// First sentence of the notes, stripped of bracketed stage directions.
function slideDesc(s) {
  if (!s.notes) return '';
  return s.notes.replace(/\[.*?\]/g, '').split(/(?<=[.!?])\s/)[0].trim();
}

function ConfigPanel({ config, setConfig, visibleSlides, allSlides, passesFilter, thumbPath, onJump, onClose }) {
  const demos = visibleSlides.filter(s => s.kind === 'demo').length;
  const exercises = visibleSlides.filter(s => s.kind === 'exercise').length;
  const hidden = new Set(config.hiddenSlides || []);
  const forced = new Set(config.forcedSlides || []);
  // passesFilter answers "would this slide show under the current sliders?"
  // Three visible states per row:
  //   passes && !hidden  → on   (normal)
  //   passes &&  hidden  → off  (manually removed)
  //   !passes            → filtered, but checkbox now FORCES it in
  const passes = passesFilter || (() => true);
  const groups = React.useMemo(
    () => groupSlidesBySection(allSlides || [], config.slideOrder),
    [allSlides, config.slideOrder]
  );
  const fileRef = React.useRef(null);
  const [copied, setCopied] = React.useState(false);
  const [titlesCopied, setTitlesCopied] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(() => new Set());
  const [dragging, setDragging] = React.useState(null);
  const [dragOver, setDragOver] = React.useState(null);

  // Flat order of all slide names (including section markers) — source of
  // truth for drag reordering. Falls back to registry order when unset.
  const currentOrder = React.useMemo(() => {
    if (config.slideOrder && config.slideOrder.length) return config.slideOrder;
    return (allSlides || []).map(s => s.c);
  }, [config.slideOrder, allSlides]);

  const reorder = (fromC, toC) => {
    if (fromC === toC) return;
    const next = [...currentOrder];
    const fromIdx = next.indexOf(fromC);
    const toIdx = next.indexOf(toC);
    if (fromIdx < 0 || toIdx < 0) return;
    next.splice(fromIdx, 1);
    next.splice(next.indexOf(toC) + (fromIdx < toIdx ? 1 : 0), 0, fromC);
    setConfig({ ...config, slideOrder: next });
  };

  const toggleSlide = (s) => {
    // Slides that pass the filter toggle via hiddenSlides. Slides that
    // DON'T pass toggle via forcedSlides — overriding the filter result.
    if (passes(s)) {
      const next = new Set(hidden);
      next.has(s.c) ? next.delete(s.c) : next.add(s.c);
      setConfig({ ...config, hiddenSlides: [...next] });
    } else {
      const next = new Set(forced);
      next.has(s.c) ? next.delete(s.c) : next.add(s.c);
      setConfig({ ...config, forcedSlides: [...next] });
    }
  };

  const toggleGroup = (group, on) => {
    const nextHidden = new Set(hidden);
    const nextForced = new Set(forced);
    for (const s of group.slides) {
      if (passes(s)) on ? nextHidden.delete(s.c) : nextHidden.add(s.c);
      else           on ? nextForced.add(s.c)    : nextForced.delete(s.c);
    }
    if (group.marker) on ? nextHidden.delete(group.marker.c) : nextHidden.add(group.marker.c);
    setConfig({ ...config, hiddenSlides: [...nextHidden], forcedSlides: [...nextForced] });
  };

  const onLogoFile = (file) => {
    if (!file) return;
    const r = new FileReader();
    r.onload = () => setConfig({
      ...config,
      company: { ...(config.company || {}), logo: r.result, logoName: file.name },
    });
    r.readAsDataURL(file);
  };

  const copyLink = () => {
    // Strip the logo dataURL — it's 50–200KB of base64 and blows past
    // browser URL limits. The recipient re-uploads their own logo.
    const { company, ...rest } = config;
    const { logo, logoName, ...co } = company || {};
    const shareable = { ...rest, company: co };
    const url = new URL(location.href);
    url.search = '';
    url.searchParams.set('cfg', btoa(JSON.stringify(shareable)));
    navigator.clipboard.writeText(url.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const copyTitles = () => {
    // Comma-separated slide IDs in catalog order — same format the
    // /_shared/planner.html export produces, pastes directly into /ncp
    // Phase 1 Q1 ("Picked slides from the planner?"). Section markers
    // excluded so the export only carries real slides.
    const ids = visibleSlides
      .filter(s => s.kind !== 'section')
      .map(s => s.c)
      .join(',');
    navigator.clipboard.writeText(ids);
    setTitlesCopied(true);
    setTimeout(() => setTitlesCopied(false), 1500);
  };

  const reset = () => setConfig({
    duration: config.duration, level: config.level, platform: config.platform,
    hiddenSlides: [], forcedSlides: [], company: {}, slideOrder: null,
  });

  const toggleCollapse = (gi) => setCollapsed(prev => {
    const next = new Set(prev);
    next.has(gi) ? next.delete(gi) : next.add(gi);
    return next;
  });

  return (
    <>
      <div className="cfg-backdrop" onClick={onClose} />
      <div className="cfg-drawer" onClick={e => e.stopPropagation()}>
        <header className="cfg-head">
          <div>
            <h2>Workshop Config</h2>
            <p className="cfg-sub">press C or Esc to close</p>
          </div>
          <button className="cfg-close" onClick={onClose}>×</button>
        </header>

        <CfgSection title="Filters">
          <div className="cfg-row">
            <label>Duration</label>
            <input type="range" min="1" max="3" step="0.5"
                   value={config.duration}
                   onChange={e => setConfig({...config, duration: parseFloat(e.target.value)})} />
            <span className="cfg-val">{config.duration}h</span>
          </div>
          <div className="cfg-row">
            <label>Audience</label>
            <input type="range" min="0" max="3" step="1"
                   value={config.level}
                   onChange={e => setConfig({...config, level: parseInt(e.target.value, 10)})} />
            <span className="cfg-val">{LEVEL_LABEL[config.level] || '—'}</span>
          </div>
          <div className="cfg-row">
            <label>Platform</label>
            <select value={config.platform}
                    onChange={e => setConfig({...config, platform: e.target.value})}>
              <option value="c4e">Claude for Enterprise</option>
              <option value="1p">Anthropic API (1st-party)</option>
              <option value="bedrock">AWS Bedrock</option>
              <option value="vertex">Google Vertex</option>
              <option value="azure">Azure</option>
            </select>
          </div>
        </CfgSection>

        <CfgSection title="Branding" defaultOpen={false}>
          <div className="cfg-brand">
            <input type="text" className="cfg-company-name"
                   placeholder="Company name"
                   value={(config.company && config.company.name) || ''}
                   onChange={e => setConfig({
                     ...config, company: { ...(config.company || {}), name: e.target.value },
                   })} />
            <div className="cfg-logo-drop"
                 onClick={() => fileRef.current && fileRef.current.click()}
                 onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add('dragover'); }}
                 onDragLeave={e => e.currentTarget.classList.remove('dragover')}
                 onDrop={e => {
                   e.preventDefault();
                   e.currentTarget.classList.remove('dragover');
                   onLogoFile(e.dataTransfer.files[0]);
                 }}>
              <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }}
                     onChange={e => onLogoFile(e.target.files[0])} />
              {config.company && config.company.logo
                ? <img src={config.company.logo} alt="" />
                : <span className="cfg-logo-hint">logo</span>}
            </div>
            {config.company && config.company.logo &&
              <button className="cfg-logo-clear"
                      onClick={() => setConfig({
                        ...config, company: { ...(config.company || {}), logo: null, logoName: null },
                      })}>×</button>}
          </div>
        </CfgSection>

        <CfgSection title="Slides" className="cfg-slides"
                    badge={<span className="cfg-badge">{visibleSlides.length}</span>}>
          <div className="cfg-slide-list">
            {groups.map((g, gi) => {
              // Every slide is togglable now — filter-passing slides toggle
              // via hidden[], filter-failing slides toggle via forced[].
              // Tri-state counts against the full group.
              const isOn = s => passes(s) ? !hidden.has(s.c) : forced.has(s.c);
              const onCount = g.slides.filter(isOn).length;
              const allOn = g.slides.length > 0 && onCount === g.slides.length;
              const someOn = onCount > 0 && onCount < g.slides.length;
              const isCollapsed = collapsed.has(gi);
              return (
                <div key={gi} className="cfg-group">
                  <div className="cfg-group-head">
                    <span className="cfg-group-chevron" onClick={() => toggleCollapse(gi)}>
                      {isCollapsed ? '▸' : '▾'}
                    </span>
                    <input type="checkbox" checked={allOn}
                           disabled={g.slides.length === 0}
                           ref={el => el && (el.indeterminate = someOn)}
                           onChange={e => toggleGroup(g, e.target.checked)} />
                    <span className="cfg-group-title" onClick={() => toggleCollapse(gi)}>
                      {g.title}
                    </span>
                    <span className="cfg-group-count">{onCount}/{g.slides.length}</span>
                  </div>
                  {!isCollapsed && <div className="cfg-group-body">
                    {g.slides.map(s => {
                      const filteredOut = !passes(s);
                      const isForced = forced.has(s.c);
                      const on = filteredOut ? isForced : !hidden.has(s.c);
                      const badge = KIND_BADGE[s.kind];
                      const isDragOver = dragOver === s.c;
                      // .filtered dims the row; .forced keeps the dimming but
                      // re-lights the checkbox so the override is visible.
                      const cls = filteredOut ? (isForced ? ' filtered forced' : ' filtered')
                                : !on ? ' off' : '';
                      return (
                        <div key={s.c}
                             className={`cfg-slide${cls}${isDragOver ? ' drag-over' : ''}${dragging === s.c ? ' dragging' : ''}`}
                             draggable
                             onDragStart={e => { setDragging(s.c); e.dataTransfer.effectAllowed = 'move'; }}
                             onDragEnd={() => { setDragging(null); setDragOver(null); }}
                             onDragOver={e => { e.preventDefault(); setDragOver(s.c); }}
                             onDrop={e => { e.preventDefault(); reorder(dragging, s.c); setDragOver(null); }}>
                          <span className="cfg-drag-handle">⋮⋮</span>
                          <input type="checkbox"
                                 checked={on}
                                 title={filteredOut ? 'Excluded by filter — check to override and force-include' : ''}
                                 onChange={() => toggleSlide(s)} />
                          {thumbPath &&
                            <img className="cfg-thumb" src={`${thumbPath}/${s.c}.png`} alt="" loading="lazy"
                                 onClick={() => onJump && onJump(s.c)}
                                 title="Click to jump to this slide" />}
                          <div className="cfg-slide-info">
                            <div className="cfg-slide-title">
                              {slideTitle(s)}
                              {badge && <span className="cfg-kind"
                                              style={{ background: badge.bg, color: badge.fg }}>
                                {badge.label}
                              </span>}
                              {filteredOut && <span className="cfg-filtered-hint">
                                {isForced ? 'forced' : 'filtered'}
                              </span>}
                            </div>
                            <div className="cfg-slide-desc">{slideDesc(s)}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>}
                </div>
              );
            })}
          </div>
        </CfgSection>

        <footer className="cfg-foot">
          <span className="cfg-summary">
            {visibleSlides.length} slides · {demos} demos · {exercises} ex
          </span>
          <button className="cfg-btn-secondary" onClick={reset}>Reset</button>
          <button className="cfg-btn-secondary" onClick={copyTitles}
                  title="Copy slide IDs in /ncp planner format (comma-separated, paste into /ncp Phase 1 Q1)">
            {titlesCopied ? '✓ Copied' : 'Copy Slide IDs'}
          </button>
          <button className="cfg-btn-primary" onClick={copyLink}>
            {copied ? '✓ Copied' : 'Copy Link'}
          </button>
        </footer>
      </div>
    </>
  );
}

// --- DemoSlide ---
// Prologue-style cockpit layout (cc-101-broadcast 09-prologue.jsx):
// left cheat-sheet rail (keystroke badges + caption lines) + right black
// box for live terminal overlay. No stagger — everything renders at once
// so it's screenshot-ready.
//
// beats: [{ key: 'npm test' | null, line: 'caption' }]
//   key=null → renders "hint" label instead of a keystroke badge.
//
// Old signature (n, title, hint) still works — hint coerces to a single
// null-key beat. All 7 call sites pass beats now so this is vestigial.
function DemoSlide({ n, title, beats, hint }) {
  beats = beats || (hint ? [{ key: null, line: hint }] : []);
  var MONO_FONT = "'JetBrains Mono', monospace";
  var CLAY_C = '#D97757';
  return (
    <Slide bg="#FAF9F5" color="#141413" label={`Demo ${n}`}
           padding="56px 48px 56px 52px">
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 36, height: '100%' }}>

        {/* LEFT — cheat-sheet rail */}
        <div style={{ flex: '0 0 330px', display: 'flex', flexDirection: 'column' }}>
          <div style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: CLAY_C, marginBottom: 8,
          }}>
            <span style={{ fontSize: 12, marginRight: 6 }}>▶</span>Live Demo {n}
          </div>
          <h2 style={{
            fontFamily: "'Anthropic Serif', Georgia, serif",
            fontSize: 30, fontWeight: 380, lineHeight: 1.2,
            marginBottom: 24, color: '#141413',
          }}>{title}</h2>

          {beats.map((b, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '11px 0',
              borderBottom: i < beats.length - 1 ? '1px solid rgba(20,20,19,0.08)' : 'none',
            }}>
              {b.key
                ? <code style={{
                    fontFamily: MONO_FONT, fontSize: 11.5, fontWeight: 600,
                    color: CLAY_C, border: '1px solid ' + CLAY_C + '55',
                    borderRadius: 4, padding: '3px 9px',
                    background: CLAY_C + '14', minWidth: 72, textAlign: 'center',
                    flexShrink: 0,
                  }}>{b.key}</code>
                : <span style={{
                    fontSize: 10, fontWeight: 600, letterSpacing: '0.1em',
                    textTransform: 'uppercase', color: 'rgba(20,20,19,0.35)',
                    minWidth: 72, flexShrink: 0, textAlign: 'center',
                  }}>hint</span>}
              <span style={{
                fontSize: 13, lineHeight: 1.45,
                color: b.key ? 'rgba(20,20,19,0.75)' : 'rgba(20,20,19,0.55)',
              }}>{b.line}</span>
            </div>
          ))}
        </div>

        {/* RIGHT — terminal target zone. Presenter's real terminal goes on top. */}
        <div style={{ flex: 1, height: '100%', display: 'flex', alignItems: 'center' }}>
          <div style={{
            width: '100%', height: 560, background: '#000',
            border: '1px solid ' + CLAY_C + '66', borderRadius: 10,
            boxShadow: '0 12px 40px rgba(0,0,0,0.18)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{
              color: 'rgba(255,255,255,0.14)', fontFamily: MONO_FONT, fontSize: 13,
            }}>$ terminal goes here</span>
          </div>
        </div>

      </div>
    </Slide>
  );
}

// --- ExerciseSlide ---
// Dark bg, numbered badge, hammer emoji, "Done when:" box at bottom.
// Children render inside a card. Time badge in mono.
function ExerciseSlide({ n, time, title, children, doneWhen }) {
  return (
    <Slide bg="#141413" color="#FAF9F5" label={`Exercise ${n}`}>
      <div style={{ display: 'flex', gap: 56, flex: 1, alignItems: 'center' }}>
        <div style={{ flex: '0 0 200px', textAlign: 'center' }}>
          <div style={{ fontSize: 72, marginBottom: 8 }}>🔨</div>
          <div style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: 'rgba(250,249,245,0.4)',
          }}>Hands-on</div>
          <div style={{
            fontFamily: "'Anthropic Serif', Georgia, serif",
            fontSize: 72, fontWeight: 360, color: '#D97757', lineHeight: 1,
          }}>{n}</div>
          <div style={{
            fontSize: 13, color: 'rgba(250,249,245,0.4)', marginTop: 12,
            fontFamily: "'JetBrains Mono', monospace",
          }}>{time}</div>
        </div>
        <div style={{ flex: 1 }}>
          {title && <h2 style={{
            fontFamily: "'Anthropic Serif', Georgia, serif",
            fontSize: 30, fontWeight: 400, color: '#FAF9F5', marginBottom: 20,
          }}>{title}</h2>}
          <div style={{
            padding: '18px 20px', background: 'rgba(250,249,245,0.04)',
            borderRadius: 10, border: '1px solid rgba(250,249,245,0.08)',
            fontSize: 14, lineHeight: 1.6, color: 'rgba(250,249,245,0.85)',
          }}>
            {children}
          </div>
          {doneWhen && <div style={{
            marginTop: 20, padding: '12px 16px', background: 'rgba(217,119,87,0.08)',
            borderRadius: 8, borderLeft: '3px solid #D97757', fontSize: 13,
            color: 'rgba(250,249,245,0.7)',
          }}>
            <strong style={{ color: '#D97757' }}>Done when:</strong> {doneWhen}
          </div>}
        </div>
      </div>
    </Slide>
  );
}

// --- BreakSlide ---
// Oat bg, huge centered number.
function BreakSlide({ minutes = 8 }) {
  return (
    <Slide bg="#F0EEE6" label="Break" center>
      <div style={{
        fontSize: 13, fontWeight: 600, letterSpacing: '0.12em',
        textTransform: 'uppercase', color: '#73726C', marginBottom: 8,
      }}>Break</div>
      <div style={{
        fontFamily: "'Anthropic Serif', Georgia, serif",
        fontSize: 120, fontWeight: 340, color: '#141413', lineHeight: 1,
      }}>{minutes}</div>
      <div style={{ fontSize: 14, color: '#73726C', marginTop: 4 }}>minutes</div>
    </Slide>
  );
}

// --- FullCanvas ---
// Same centering+scaling wrapper as <Slide> but BARE — no padding,
// no font, no color. For Lina-port slides that already lay out their
// own 1024×768 canvas. Outer div paints bg edge-to-edge so there's no
// black corner; inner div is the design canvas, centered, scaled by
// --deck-scale (set in deck.html on resize).
//
// `style` merges into the inner canvas — pass display/flex/padding/
// font there. Inner gets boxSizing:border-box so existing padding
// math stays correct. The canvas is also painted bg to avoid a seam
// at sub-pixel scale boundaries.
//
// Use cases:
//   - StubSlide-wrapped slides (WhichModel, EffortTable, etc.)
//   - Slides hardcoding width:1024,height:768 (TDD, AskDocs, etc.)
//   - Slides that were 100%/100% in Lina's bundle but ran inside her
//     1024×768 shell (CrossOrg, SDLC, BundledFiles, LinaAgenda)
function FullCanvas({ bg = '#FAF9F5', style, children }) {
  return (
    <div style={{ position: 'absolute', inset: 0, background: bg }}>
      <div style={Object.assign({
        position: 'absolute', top: '50%', left: '50%',
        width: 1024, height: 768,
        transform: 'translate(-50%, -50%) scale(var(--deck-scale, 1))',
        boxSizing: 'border-box',
        background: bg,
      }, style || {})}>
        {children}
      </div>
    </div>
  );
}

// --- StubSlide ---
// Lina-port. Tag pill + title + subtitle frame, FullCanvas-wrapped.
// Used by reference-table slides (WhichModel, EffortTable,
// Checkpointing, PromptingTips, AdaptiveThink, WebCliDesktop).
function StubSlide({ tag, tagColor = 'clay', title, subtitle, children, bg = '#FAF9F5', dark = false }) {
  const isDark = dark || bg === '#141413';
  return (
    <FullCanvas bg={bg} style={{
      color: isDark ? '#FAF9F5' : '#141413',
      fontFamily: "'Anthropic Sans', system-ui, sans-serif",
      display: 'flex', flexDirection: 'column',
      padding: '64px 80px',
    }}>
      {tag && (
        <span style={{
          display: 'inline-block', fontSize: 11, fontWeight: 600,
          textTransform: 'uppercase', letterSpacing: '0.08em',
          padding: '4px 12px', borderRadius: 4, marginBottom: 16, alignSelf: 'flex-start',
          background: tagColor === 'clay' ? 'rgba(217,119,87,0.15)' : 'rgba(250,249,245,0.15)',
          color: tagColor === 'clay' ? '#D97757' : '#FAF9F5',
        }}>{tag}</span>
      )}
      <h2 style={{ fontSize: 30, fontWeight: 550, marginBottom: subtitle ? 8 : 32, letterSpacing: '-0.01em' }}>{title}</h2>
      {subtitle && <p style={{ fontSize: 14, opacity: 0.55, marginBottom: 32 }}>{subtitle}</p>}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>{children}</div>
    </FullCanvas>
  );
}

// Export all to window
Object.assign(window, {
  Slide, SectionSlide, VCenter,
  TerminalMockup, TLine, TBlank, TGray, TDim, TBlue, TGreen, TOrange, TWhite, TBold,
  Ind, Fn, THr, TPrompt, TAssistant, TToolOk, TResult, TSep, TLogo, TInputBox, TStatusBar,
  EditorMockup, ELine, Kw, Str, Cmt, FnC, Typ, Punc,
  InfoCard, AgendaBlock,
  PlatformContext, PlatformSwitch, ConfigPanel, LEVEL_LABEL,
  DemoSlide, ExerciseSlide, BreakSlide, StubSlide, FullCanvas,
});
