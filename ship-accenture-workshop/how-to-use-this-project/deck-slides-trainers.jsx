// ═══════════════════════════════════════════════════════════════
// DECK SLIDES — How to use this project
// Partner deck: teaches Accenture practitioners how to build
// client workshops with /ncp.
// 24 slides. Object.assign at bottom exposes all to window.
// ═══════════════════════════════════════════════════════════════

{
const CLAY = '#D97757', OAT = '#F0EEE6', DARK = '#141413', BONE = '#FAF9F5', GRAY = '#73726C';
const SERIF = "'Anthropic Serif', Georgia, serif";
const MONO = "'JetBrains Mono', monospace";
const H2 = { fontFamily: SERIF, fontSize: 32, fontWeight: 400, marginBottom: 24 };
const KICKER = { fontSize: 12, fontWeight: 600, color: CLAY, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 };
const SUB = { fontSize: 14, color: GRAY, marginBottom: 32, lineHeight: 1.5 };

// ── 1. Title ──────────────────────────────────────────────────
function Slide_TTTitle() {
  return (
    <Slide bg={DARK} color={BONE} label="How to use this project" center>
      <div style={{
        fontSize: 13, fontWeight: 600, letterSpacing: '0.1em',
        textTransform: 'uppercase', color: CLAY, marginBottom: 24,
      }}>Partner Enablement &middot; Accenture</div>
      <h1 style={{
        fontFamily: SERIF, fontSize: 52, fontWeight: 360,
        letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 16,
      }}>How to use this project</h1>
      <p style={{
        fontSize: 20, fontWeight: 430, color: 'rgba(250,249,245,0.55)',
        maxWidth: 520, textAlign: 'center', lineHeight: 1.5, marginBottom: 48,
      }}>Building Customer Workshops with /ncp</p>
    </Slide>
  );
}

// ── 2. Agenda ─────────────────────────────────────────────────
function Slide_TTAgenda() {
  var steps = [
    { n: '1', title: 'Clone', desc: 'Get the repo \u2014 no access gate' },
    { n: '2', title: 'Branch', desc: 'Create a presentation branch' },
    { n: '3', title: 'Generate', desc: '/ncp builds the whole deck' },
    { n: '4', title: 'Tailor & Test', desc: 'Align to the client, smoke test' },
    { n: '5', title: 'Present', desc: 'Serve locally \u2014 ./serve.sh' },
  ];
  return (
    <Slide bg={BONE} label="Agenda">
      <div style={KICKER}>Today</div>
      <h2 style={H2}>Five steps to a customer deck</h2>
      <VCenter stretch>
        <div style={{ display: 'flex', gap: 20 }}>
          {steps.map(function(s) {
            return (
              <div key={s.n} style={{
                flex: 1, background: '#fff', borderRadius: 12,
                padding: '24px 20px', border: '1px solid rgba(20,20,19,0.08)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%', background: CLAY,
                  color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 15, fontWeight: 600, marginBottom: 12,
                }}>{s.n}</div>
                <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6, color: DARK }}>{s.title}</div>
                <div style={{ fontSize: 12.5, color: GRAY, lineHeight: 1.5 }}>{s.desc}</div>
              </div>
            );
          })}
        </div>
      </VCenter>
    </Slide>
  );
}

// ── 3. Why decks-as-code ──────────────────────────────────────
function Slide_TTWhy() {
  var bullets = [
    'Every workshop has 3\u20135 live demos \u2014 even a 1-hour 101',
    'Demos sprinkled throughout, not bolted on at the end',
    'Consistency across the field \u2014 same arc, customer-tuned',
  ];
  return (
    <Slide bg={BONE} label="Why decks-as-code">
      <div style={KICKER}>Philosophy</div>
      <h2 style={H2}>Why decks-as-code</h2>
      <VCenter>
        <div style={{ maxWidth: 620 }}>
          {bullets.map(function(b, i) {
            return (
              <div key={i} style={{
                display: 'flex', gap: 12, alignItems: 'baseline',
                marginBottom: 18, fontSize: 18, lineHeight: 1.5, color: DARK,
              }}>
                <span style={{ color: CLAY, fontSize: 10, flexShrink: 0 }}>{'\u25CF'}</span>
                <span>{b}</span>
              </div>
            );
          })}
        </div>
      </VCenter>
    </Slide>
  );
}

// ── 4. Section: Clone ─────────────────────────────────────────
function Slide_TTSectionAccess() {
  return (
    <SectionSlide number="1" title="Clone" />
  );
}

// ── 5. Clone ──────────────────────────────────────────────────
function Slide_TTAccess() {
  // PLACEHOLDER: replace <accenture-org> with the real GitHub org before delivery.
  var repoUrl = 'https://github.com/<accenture-org>/claude-code-accenture-enablement';
  return (
    <SplitBg label="Clone"
      left={
        <AbsHeader kicker="Steps 1&ndash;2" h2="Clone &amp; branch">
          <div style={{
            background: '#fff', borderRadius: 10, padding: '16px 18px',
            border: '1px solid rgba(20,20,19,0.08)', marginBottom: 14,
          }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Clone the repo</div>
            <span style={{ fontSize: 11, fontFamily: MONO, color: GRAY, wordBreak: 'break-all' }}>{repoUrl}</span>
          </div>
          <p style={{ fontSize: 12, color: GRAY, lineHeight: 1.5 }}>
            No build step. Open any deck.html directly in your browser.<br />
            <strong style={{ color: CLAY }}>Always work on a branch</strong> &mdash; keeps each client deck isolated.
          </p>
        </AbsHeader>
      }
      right={
        <TerminalMockup title="~" width="100%">
          <TPrompt>git clone git@github.com:&lt;accenture-org&gt;/ \</TPrompt>
          <TLine>    claude-code-accenture-enablement.git</TLine>
          <TLine><TGray>Cloning into 'claude-code-accenture-enablement'...</TGray></TLine>
          <TLine><TGreen>{'\u2713'}</TGreen> <TGray>done.</TGray></TLine>
          <TBlank />
          <TPrompt>cd claude-code-accenture-enablement</TPrompt>
          <TPrompt>git checkout -b acme-robotics-deck</TPrompt>
          <TLine><TGray>Switched to a new branch 'acme-robotics-deck'</TGray></TLine>
          <TBlank />
          <TPrompt>claude</TPrompt>
          <TLogo path="~/claude-code-accenture-enablement" />
        </TerminalMockup>
      }
    />
  );
}

// ── 6. Repo Tour ──────────────────────────────────────────────
function Slide_TTRepoTour() {
  return (
    <SplitBg label="Repo layout"
      left={
        <AbsHeader kicker="Orientation" h2="Repo layout"
          sub="Every deck follows the same structure. Shared components live in _shared/; customer decks override what they need.">
          <div style={{
            background: CLAY, color: '#fff', borderRadius: 8,
            padding: '14px 18px', fontSize: 13, fontWeight: 500, lineHeight: 1.6,
          }}>
            Edit source dirs. Never touch dist/ &mdash; /ncp-sync overwrites it.
          </div>
        </AbsHeader>
      }
      right={
        <EditorMockup filename="repo root" width="100%">
          <ELine num={1}><Cmt>{'# Source of truth'}</Cmt></ELine>
          <ELine num={2}><Kw>_shared/</Kw>              <Cmt>{'# slide components, planner'}</Cmt></ELine>
          <ELine num={3}><Kw>{'<Customer> N Hour Workshop/'}</Kw></ELine>
          <ELine num={4}>  deck.html            <Cmt>{'# loads _shared, then local'}</Cmt></ELine>
          <ELine num={5}>  deck-profile.jsx     <Cmt>{'# customer-specific content'}</Cmt></ELine>
          <ELine num={6}>  deck-slides-*.jsx    <Cmt>{'# local overrides'}</Cmt></ELine>
          <ELine num={7}>  slide-manifest.js    <Cmt>{'# slide order + notes'}</Cmt></ELine>
          <ELine num={8}>  demo-scripts.html    <Cmt>{'# presenter runbook'}</Cmt></ELine>
          <ELine num={9}></ELine>
          <ELine num={10}><Cmt>{'# Build artifact'}</Cmt></ELine>
          <ELine num={11}><Str>dist/</Str>                 <Cmt>{'# synced by /ncp \u2014 never edit'}</Cmt></ELine>
          <ELine num={12}></ELine>
          <ELine num={13}><Cmt>{'# The skill'}</Cmt></ELine>
          <ELine num={14}><Kw>.claude/skills/</Kw>       <Cmt>{'# /ncp lives here'}</Cmt></ELine>
        </EditorMockup>
      }
    />
  );
}

// ── 7. Section: Generate ──────────────────────────────────────
function Slide_TTSectionGenerate() {
  return (
    <SectionSlide number="3" title="Generate" />
  );
}

// ── 8. Planner ────────────────────────────────────────────────
function Slide_TTPlanner() {
  return (
    <SplitBg label="Planner"
      left={
        <AbsHeader kicker="Optional" h2="Pick your slides first"
          sub={<>
            <span style={{ fontFamily: MONO, fontSize: 12, color: DARK }}>_shared/planner.html</span> is an
            interactive picker. Toggle slides, see the timing budget, copy a CSV.
          </>}>
          <p style={{ fontSize: 13, color: GRAY, lineHeight: 1.5 }}>
            Paste the CSV into /ncp{'\u2019'}s first question, or leave it blank and /ncp picks defaults for the duration.
          </p>
        </AbsHeader>
      }
      right={
        <div style={{
          background: '#fff', borderRadius: 10, padding: '20px 22px',
          border: '1px solid rgba(20,20,19,0.08)', width: '100%',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
        }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10, color: DARK }}>Planner output</div>
          <div style={{
            fontFamily: MONO, fontSize: 11, color: GRAY, lineHeight: 1.7,
            background: OAT, borderRadius: 6, padding: '12px 14px',
          }}>
            Slide_ColdOpen,Slide_Agenda,<br />
            Slide_WhatIsCC,Slide_Install,<br />
            Slide_CoreLoop,Slide_Demo1,<br />
            Slide_ClaudeMd,Slide_PlanMode,...
          </div>
          <div style={{
            marginTop: 10, display: 'inline-block',
            fontSize: 11, fontWeight: 600, color: CLAY,
            background: CLAY + '12', padding: '4px 12px', borderRadius: 4,
          }}>Copy to clipboard</div>
        </div>
      }
    />
  );
}

// ── 9. /ncp Intro ─────────────────────────────────────────────
function Slide_TTNcpIntro() {
  return (
    <SplitBg label="/ncp intro"
      left={
        <AbsHeader kicker="The skill" h2="/ncp builds the whole thing">
          <div style={{ fontSize: 13, color: DARK, lineHeight: 1.8 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'baseline', marginBottom: 4 }}>
              <span style={{ color: CLAY, fontSize: 8 }}>{'\u25CF'}</span> Deck (HTML/JSX, every slide renders)
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'baseline', marginBottom: 4 }}>
              <span style={{ color: CLAY, fontSize: 8 }}>{'\u25CF'}</span> Demo repo with a planted bug &mdash; npm test fails on purpose
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'baseline', marginBottom: 4 }}>
              <span style={{ color: CLAY, fontSize: 8 }}>{'\u25CF'}</span> Exercise repo with a different bug
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'baseline', marginBottom: 4 }}>
              <span style={{ color: CLAY, fontSize: 8 }}>{'\u25CF'}</span> Speaker notes per slide
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'baseline', marginBottom: 4 }}>
              <span style={{ color: CLAY, fontSize: 8 }}>{'\u25CF'}</span> demo-scripts.html presenter runbook
            </div>
          </div>
          <div style={{
            marginTop: 16, background: CLAY, color: '#fff', borderRadius: 8,
            padding: '10px 16px', fontSize: 13, fontWeight: 600,
          }}>
            No TODO stubs. Presentable on first run.
          </div>
        </AbsHeader>
      }
      right={
        <TerminalMockup title="~/claude-code-accenture-enablement" width="100%">
          <TPrompt>/ncp</TPrompt>
          <TBlank />
          <TAssistant>I{'\u2019'}ll help you build a new customer presentation.</TAssistant>
          <TBlank />
          <TAssistant>Which customer is this for?</TAssistant>
          <TBlank />
          <TInputBox placeholder="Type customer name..." />
        </TerminalMockup>
      }
    />
  );
}

// ── 10. /ncp Questions ────────────────────────────────────────
function Slide_TTNcpQuestions() {
  var round1 = [
    { q: 'Picked slides (CSV)', drives: 'Slide order, timing' },
    { q: 'Customer name', drives: 'Folder name, branding' },
    { q: 'Live demos? y/n', drives: 'Demo slides + repos' },
    { q: 'Hands-on exercises? y/n', drives: 'Exercise slides + repos' },
  ];
  var round2 = [
    { q: 'Platform', drives: 'Install slide variant' },
    { q: 'Length (60/90/150/180)', drives: 'Slide count, timing' },
    { q: 'Audience', drives: 'Bug difficulty' },
    { q: 'Vehicle + domain', drives: 'Demo repo name + context' },
  ];
  var Row = function(props) {
    return (
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        padding: '8px 0', borderBottom: '1px solid rgba(20,20,19,0.06)',
      }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: DARK }}>{props.q}</span>
        <span style={{ fontSize: 11, color: GRAY, fontFamily: MONO }}>{props.drives}</span>
      </div>
    );
  };
  return (
    <Slide bg={BONE} label="/ncp questions">
      <div style={KICKER}>Inputs</div>
      <h2 style={{ ...H2, fontSize: 28 }}>8 questions, 2 rounds</h2>
      <VCenter stretch>
        <div style={{ display: 'flex', gap: 32 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: CLAY, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Round 1</div>
            {round1.map(function(r, i) { return <Row key={i} q={r.q} drives={r.drives} />; })}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: CLAY, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Round 2</div>
            {round2.map(function(r, i) { return <Row key={i} q={r.q} drives={r.drives} />; })}
          </div>
        </div>
      </VCenter>
    </Slide>
  );
}

// ── 11. Demo Kickoff ──────────────────────────────────────────
function Slide_TTDemoKickoff() {
  var answers = [
    { k: 'Customer', v: 'Acme Robotics' },
    { k: 'Demos', v: 'yes' },
    { k: 'Exercises', v: 'no' },
    { k: 'Platform', v: 'bedrock' },
    { k: 'Length', v: '60' },
    { k: 'Audience', v: 'mixed' },
    { k: 'Vehicle', v: 'arm-controller: industrial robotics' },
  ];
  return (
    <Slide bg={DARK} color={BONE} label="Live Demo" center>
      <div style={{
        display: 'inline-block', background: CLAY, color: '#fff',
        padding: '8px 24px', borderRadius: 6, fontSize: 14,
        fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
        marginBottom: 24,
      }}>LIVE DEMO</div>
      <h2 style={{
        fontFamily: SERIF, fontSize: 40, fontWeight: 380,
        marginBottom: 32, color: BONE,
      }}>Let{'\u2019'}s run /ncp</h2>
      <div style={{ display: 'flex', gap: 32, justifyContent: 'center' }}>
        <div style={{
          background: 'rgba(250,249,245,0.06)', borderRadius: 12,
          padding: '20px 24px', minWidth: 320,
        }}>
          {answers.map(function(a, i) {
            return (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', padding: '6px 0',
                borderBottom: i < answers.length - 1 ? '1px solid rgba(250,249,245,0.08)' : 'none',
              }}>
                <span style={{ fontSize: 13, color: 'rgba(250,249,245,0.5)' }}>{a.k}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: BONE }}>{a.v}</span>
              </div>
            );
          })}
        </div>
        <div style={{
          maxWidth: 200, display: 'flex', alignItems: 'center',
          fontSize: 14, color: 'rgba(250,249,245,0.35)', lineHeight: 1.6,
        }}>
          It runs ~3{'\u20134'} min. We{'\u2019'}ll come back to it.
        </div>
      </div>
    </Slide>
  );
}

// ── 12. Section: Tailor & Test ────────────────────────────────
function Slide_TTSectionTailor() {
  return (
    <SectionSlide number="4" title="Tailor & Test" />
  );
}

// ── 13. Customer Align ────────────────────────────────────────
function Slide_TTCustomerAlign() {
  return (
    <SplitBg label="Customer alignment"
      left={
        <AbsHeader kicker="Hero beat" h2={<>Align to their domain &mdash; it hits harder</>}
          sub={<>A NAV miscalculation in portfolio-service lands with Fidelity engineers
            in a way flag-service never will. Domain alignment isn{'\u2019'}t cosmetic.</>}>
          <div style={{
            background: CLAY + '12', borderLeft: '4px solid ' + CLAY,
            borderRadius: '0 8px 8px 0', padding: '14px 18px', marginBottom: 20,
          }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: CLAY, marginBottom: 4 }}>Sometimes the demo becomes the project</div>
            <div style={{ fontSize: 12, color: GRAY, lineHeight: 1.5 }}>
              GE Vernova: our turbine-selector demo seeded their curtailment-agent
              pilot. The {'\u201C'}fake{'\u201D'} use case became a real P2/P3.
            </div>
          </div>
        </AbsHeader>
      }
      right={
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%' }}>
          <div style={{
            background: 'rgba(115,114,108,0.08)', borderRadius: 10, padding: '18px 20px',
            border: '1px solid rgba(115,114,108,0.12)',
          }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: GRAY, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Generic</div>
            <div style={{ fontFamily: MONO, fontSize: 14, color: GRAY }}>flag-service</div>
          </div>
          <div style={{ textAlign: 'center', fontSize: 20, color: GRAY }}>{'\u2193'}</div>
          <div style={{
            background: CLAY + '12', borderRadius: 10, padding: '18px 20px',
            border: '2px solid ' + CLAY,
          }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: CLAY, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Customer-tuned</div>
            <div style={{ fontFamily: MONO, fontSize: 14, color: DARK }}>turbine-selector</div>
          </div>
        </div>
      }
    />
  );
}

// ── 14. Demo Philosophy ───────────────────────────────────────
function Slide_TTDemoPhilosophy() {
  var demos = [
    { label: 'D1', title: 'Fix the Test' },
    { label: 'D2', title: 'Plan Mode' },
    { label: 'D3', title: 'Skill Invocation' },
    { label: 'D4', title: 'Agent Teams (tease)' },
  ];
  var times = ['~8 min', '~22 min', '~35 min', '~48 min'];
  return (
    <Slide bg={BONE} label="Demo philosophy">
      <div style={KICKER}>Pacing</div>
      <h2 style={H2}>3{'\u2013'}5 demos. Every time.</h2>
      <p style={{ fontSize: 16, color: GRAY, marginBottom: 28 }}>Even a 1-hour 101.</p>
      <VCenter stretch>
        <div style={{ display: 'flex', gap: 16, marginBottom: 32 }}>
          {demos.map(function(d) {
            return (
              <div key={d.label} style={{
                flex: 1, background: '#fff', borderRadius: 10,
                padding: '18px 16px', textAlign: 'center',
                border: '1px solid rgba(20,20,19,0.08)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
              }}>
                <div style={{
                  fontSize: 12, fontWeight: 700, color: CLAY, marginBottom: 6,
                }}>{d.label}</div>
                <div style={{ fontSize: 13, fontWeight: 500, color: DARK }}>{d.title}</div>
              </div>
            );
          })}
        </div>
        {/* Timeline bar */}
        <div style={{ position: 'relative', height: 40 }}>
          <div style={{
            position: 'absolute', top: 12, left: 0, right: 0, height: 4,
            background: 'rgba(20,20,19,0.08)', borderRadius: 2,
          }} />
          {times.map(function(t, i) {
            var pct = [10, 35, 58, 80][i];
            return (
              <div key={i} style={{
                position: 'absolute', left: pct + '%', top: 4,
                display: 'flex', flexDirection: 'column', alignItems: 'center',
              }}>
                <div style={{
                  width: 12, height: 12, borderRadius: '50%', background: CLAY,
                  border: '2px solid ' + BONE,
                }} />
                <div style={{ fontSize: 10, color: GRAY, marginTop: 4, fontFamily: MONO }}>{t}</div>
              </div>
            );
          })}
        </div>
        <p style={{ fontSize: 12, color: GRAY, textAlign: 'center', marginTop: 16 }}>
          Audience never goes &gt;15 min without seeing Claude do something.
        </p>
        <div style={{
          marginTop: 24, background: CLAY + '12',
          borderLeft: '4px solid ' + CLAY, borderRadius: '0 8px 8px 0',
          padding: '12px 16px', maxWidth: 640, alignSelf: 'center',
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: CLAY, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Pro tip</div>
          <div style={{ fontSize: 13, color: DARK, lineHeight: 1.5 }}>
            Take Q&amp;A <strong>while Claude is running</strong>. Dead air during a 60-second tool loop
            is wasted &mdash; {'"'}any questions on what we just covered?{'"'} fills it, and you tab
            back the moment output lands.
          </div>
        </div>
      </VCenter>
    </Slide>
  );
}

// ── 15. presentation-spec.json ────────────────────────────────
function Slide_TTSpecJson() {
  return (
    <SplitBg label="presentation-spec.json"
      left={
        <AbsHeader kicker="Single source of truth" h2="presentation-spec.json">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
            <div style={{
              background: '#fff', borderRadius: 8, padding: '12px 16px',
              border: '1px solid rgba(20,20,19,0.08)', textAlign: 'center',
              fontSize: 14, fontWeight: 600, color: DARK,
            }}>presentation-spec.json</div>
            <div style={{ display: 'flex', justifyContent: 'center', fontSize: 18, color: GRAY }}>{'\u2193'}</div>
            <div style={{ display: 'flex', gap: 10 }}>
              {['slide-manifest.js', 'demo-scripts.html', 'deck-profile.jsx'].map(function(f) {
                return (
                  <div key={f} style={{
                    flex: 1, background: CLAY + '12', borderRadius: 6,
                    padding: '8px 10px', fontSize: 10.5, fontFamily: MONO,
                    textAlign: 'center', color: DARK, fontWeight: 500,
                  }}>{f}</div>
                );
              })}
            </div>
            <div style={{ fontSize: 11, color: GRAY, textAlign: 'center', fontStyle: 'italic' }}>GENERATED block</div>
          </div>
        </AbsHeader>
      }
      right={
        <EditorMockup filename="presentation-spec.json" width="100%">
            <ELine num={1}><Punc>{'{'}</Punc></ELine>
            <ELine num={2} indent={1}><Kw>{'"demos"'}</Kw>: <Punc>[{'{'}</Punc></ELine>
            <ELine num={3} indent={2}><Str>{'"n"'}</Str>: 1,</ELine>
            <ELine num={4} indent={2}><Str>{'"slide"'}</Str>: <Str>{'"Slide_Demo1"'}</Str>,</ELine>
            <ELine num={5} indent={2}><Str>{'"bugFile"'}</Str>: <Str>{'"lib/valuations.js"'}</Str>,</ELine>
            <ELine num={6} indent={2}><Str>{'"prompt"'}</Str>: <Str>{'"npm test is failing..."'}</Str>,</ELine>
            <ELine num={7} indent={2}><Str>{'"beats"'}</Str>: <Punc>[</Punc></ELine>
            <ELine num={8} indent={3}><Str>{'"reads test output"'}</Str>,</ELine>
            <ELine num={9} indent={3}><Str>{'"finds the bug"'}</Str>,</ELine>
            <ELine num={10} indent={3}><Str>{'"fixes + re-runs"'}</Str></ELine>
            <ELine num={11} indent={2}><Punc>]</Punc></ELine>
            <ELine num={12} indent={1}><Punc>{'}'}</Punc>]</ELine>
            <ELine num={13}><Punc>{'}'}</Punc></ELine>
          </EditorMockup>
      }
    />
  );
}

// ── 16. /ncp-sync ─────────────────────────────────────────────
function Slide_TTNcpSync() {
  return (
    <Slide bg={BONE} label="/ncp-sync">
      <div style={KICKER}>Iteration</div>
      <h2 style={{ ...H2, fontSize: 28 }}>The edit loop: /ncp-sync</h2>
      <VCenter>
        <TerminalMockup title="~/claude-code-accenture-enablement" width={700}>
          <TGray>{'\u2500'.repeat(50)}</TGray>
          <TLine><TDim>{'# edit presentation-spec.json (change a prompt, swap a bug...)'}</TDim></TLine>
          <TBlank />
          <TPrompt>/ncp-sync</TPrompt>
          <TBlank />
          <TAssistant>Regenerating from presentation-spec.json...</TAssistant>
          <TBlank />
          <TLine>  <TGreen>{'\u2713'}</TGreen> <TGray>slide-manifest.js</TGray></TLine>
          <TLine>  <TGreen>{'\u2713'}</TGreen> <TGray>demo-scripts.html</TGray></TLine>
          <TLine>  <TGreen>{'\u2713'}</TGreen> <TGray>deck-profile.jsx (GENERATED region)</TGray></TLine>
          <TLine>  <TGreen>{'\u2713'}</TGreen> <TGray>dist/acme-robotics-60-min-workshop/ synced</TGray></TLine>
        </TerminalMockup>
        <p style={{ fontSize: 12, color: GRAY, textAlign: 'center', marginTop: 16 }}>
          Hand-editable region of deck-profile.jsx (claudeMd, planMode, skill JSX) survives the regen.
        </p>
      </VCenter>
    </Slide>
  );
}

// ── 17. Smoke Test ────────────────────────────────────────────
function Slide_TTSmokeTest() {
  var checks = [
    { text: 'cd <vehicle> && npm test \u2192 exactly 1 red' },
    { text: 'Run every prompt in demo-scripts.html cold, in a fresh claude session' },
    { text: 'Click through every slide \u2014 no "Missing slide"' },
    { text: '?print-pdf renders clean' },
    { text: 'reset-demo.sh restores between runs' },
  ];
  return (
    <Slide bg={BONE} label="Smoke test">
      <div style={KICKER}>Quality gate</div>
      <h2 style={H2}>Smoke test. Non-negotiable.</h2>
      <p style={{ fontSize: 15, color: CLAY, fontWeight: 500, marginBottom: 24 }}>
        /ncp generates real code &mdash; but verify before you{'\u2019'}re on stage.
      </p>
      <VCenter>
        <div style={{
          background: '#fff', borderRadius: 12, padding: '24px 28px',
          border: '1px solid rgba(20,20,19,0.08)', maxWidth: 560,
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
        }}>
          {checks.map(function(c, i) {
            return (
              <div key={i} style={{
                display: 'flex', gap: 12, alignItems: 'baseline',
                padding: '10px 0',
                borderBottom: i < checks.length - 1 ? '1px solid rgba(20,20,19,0.06)' : 'none',
              }}>
                <span style={{ fontSize: 16, color: GRAY, flexShrink: 0 }}>{'\u2610'}</span>
                <span style={{ fontSize: 13.5, color: DARK, lineHeight: 1.5 }}>{c.text}</span>
              </div>
            );
          })}
        </div>
      </VCenter>
    </Slide>
  );
}

// ── 18. Demo Scripts ──────────────────────────────────────────
function Slide_TTDemoScripts() {
  var sections = ['Preflight', 'Goal', 'Prompt (copy-paste)', 'Audience Sees', 'Say', 'Recovery'];
  return (
    <SplitBg label="demo-scripts.html"
      left={
        <AbsHeader kicker="Presenter runbook" h2="demo-scripts.html is your runbook">
          <div style={{ marginTop: 8 }}>
            {sections.map(function(s, i) {
              return (
                <div key={i} style={{
                  display: 'flex', gap: 10, alignItems: 'center',
                  padding: '7px 0', fontSize: 14, color: DARK,
                }}>
                  <span style={{ color: CLAY, fontSize: 8 }}>{'\u25CF'}</span>
                  {s}
                </div>
              );
            })}
          </div>
          <p style={{ fontSize: 12, color: GRAY, marginTop: 16, lineHeight: 1.5 }}>
            Open it on your second monitor.
          </p>
        </AbsHeader>
      }
      right={
        <div style={{
          background: '#fff', borderRadius: 10, padding: '20px 22px',
          border: '1px solid rgba(20,20,19,0.08)', width: '100%',
        }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: CLAY, marginBottom: 12 }}>Demo 1 &mdash; Fix the Test</div>
            <div style={{
              fontSize: 11, fontWeight: 600, textTransform: 'uppercase',
              color: GRAY, letterSpacing: '0.06em', marginBottom: 6,
            }}>Goal</div>
            <div style={{ fontSize: 12, color: DARK, marginBottom: 14, lineHeight: 1.5 }}>
              Show Claude reading test output, finding the bug, fixing it.
            </div>
            <div style={{
              fontSize: 11, fontWeight: 600, textTransform: 'uppercase',
              color: GRAY, letterSpacing: '0.06em', marginBottom: 6,
            }}>Prompt</div>
            <div style={{
              fontFamily: MONO, fontSize: 11, background: OAT,
              borderRadius: 6, padding: '10px 12px', color: DARK,
            }}>npm test is failing. Find the bug and fix it.</div>
        </div>
      }
    />
  );
}

// ── 19. Presenter Keys ────────────────────────────────────────
function Slide_TTPresenterKeys() {
  var keys = [
    { key: '\u2190 \u2192 / Space', desc: 'Navigate slides' },
    { key: 'S', desc: 'Speaker-notes window (follows main)' },
    { key: '#12', desc: 'URL deep-link to slide 12' },
    { key: '?print-pdf', desc: 'Export to PDF' },
    { key: 'C', desc: 'Config panel (generic/parametric decks)' },
  ];
  return (
    <Slide bg={BONE} label="Presenter keys">
      <div style={KICKER}>Controls</div>
      <h2 style={H2}>Driving the deck</h2>
      <VCenter>
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center', maxWidth: 640,
        }}>
          {keys.map(function(k, i) {
            return (
              <div key={i} style={{
                background: '#fff', borderRadius: 10, padding: '16px 20px',
                border: '1px solid rgba(20,20,19,0.08)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                minWidth: 180, flex: '1 1 180px',
              }}>
                <div style={{
                  fontFamily: MONO, fontSize: 14, fontWeight: 600,
                  color: CLAY, marginBottom: 6,
                }}>{k.key}</div>
                <div style={{ fontSize: 12.5, color: GRAY }}>{k.desc}</div>
              </div>
            );
          })}
        </div>
      </VCenter>
    </Slide>
  );
}

// ── 20. Section: Present ──────────────────────────────────────
function Slide_TTSectionShip() {
  return (
    <SectionSlide number="5" title="Present" />
  );
}

// ── 21. Serve & Present ───────────────────────────────────────
function Slide_TTDeploy() {
  return (
    <SplitBg label="Serve & Present"
      left={
        <AbsHeader kicker="Step 5" h2="Serve &amp; present">
          <p style={{ fontSize: 12.5, color: GRAY, lineHeight: 1.6, marginBottom: 16 }}>
            <span style={{ fontFamily: MONO }}>/ncp</span> and <span style={{ fontFamily: MONO }}>/ncp-sync</span> already
            synced <span style={{ fontFamily: MONO }}>dist/</span> and added the landing-page card. Just commit and serve.
          </p>
          <div style={{ fontSize: 13, color: DARK, lineHeight: 2 }}>
            <div><span style={{ color: CLAY, fontWeight: 600 }}>1.</span> git add -A &amp;&amp; git commit</div>
            <div><span style={{ color: CLAY, fontWeight: 600 }}>2.</span> ./serve.sh</div>
            <div><span style={{ color: CLAY, fontWeight: 600 }}>3.</span> open <span style={{ fontFamily: MONO, fontSize: 12 }}>localhost:8000/&lt;slug&gt;/deck.html</span></div>
          </div>
        </AbsHeader>
      }
      right={
        <TerminalMockup title="~/claude-code-accenture-enablement" width="100%">
          <TPrompt>git add -A</TPrompt>
          <TPrompt>git commit -m <TGreen>{'"Add Acme Robotics 60 min workshop"'}</TGreen></TPrompt>
          <TBlank />
          <TPrompt>./serve.sh</TPrompt>
          <TLine><TGray>Serving dist/ at http://localhost:8000</TGray></TLine>
          <TBlank />
          <TLine>  <TBlue>http://localhost:8000/acme-robotics-60-min-workshop/deck.html</TBlue></TLine>
        </TerminalMockup>
      }
    />
  );
}

// ── 21b. Zero Infra ───────────────────────────────────────────
function Slide_TTLocalFallback() {
  return (
    <SplitBg label="Zero infra"
      left={
        <AbsHeader kicker="Zero infra" h2="Everything runs from your laptop"
          sub="Static HTML &mdash; no build, no cloud, no VPN. Works on a plane.">
          <div style={{ fontSize: 13, color: DARK, lineHeight: 2 }}>
            <div><span style={{ color: CLAY, fontWeight: 600 }}>1.</span> <span style={{ fontFamily: MONO, fontSize: 12 }}>./serve.sh</span> (or ask Claude to start one)</div>
            <div><span style={{ color: CLAY, fontWeight: 600 }}>2.</span> Open <span style={{ fontFamily: MONO, fontSize: 12 }}>localhost:8000</span></div>
            <div><span style={{ color: CLAY, fontWeight: 600 }}>3.</span> Share <span style={{ fontFamily: MONO, fontSize: 12 }}>dist/&lt;slug&gt;/</span> as a zip if the client wants a copy</div>
          </div>
          <p style={{ fontSize: 12, color: GRAY, marginTop: 16, lineHeight: 1.5 }}>
            <span style={{ fontFamily: MONO }}>serve.sh</span> just wraps <span style={{ fontFamily: MONO }}>python3 -m http.server</span>.
            Nothing is deployed anywhere &mdash; the deck lives in the repo on your machine.
          </p>
        </AbsHeader>
      }
      right={
        <TerminalMockup title="~/claude-code-accenture-enablement" width="100%">
          <TPrompt>start a local server so I can preview the decks</TPrompt>
          <TBlank />
          <TAssistant>I{"'"}ll serve <TWhite>dist/</TWhite> on port 8000.</TAssistant>
          <TToolOk>Bash(python3 -m http.server 8000 --directory dist &amp;)</TToolOk>
          <TBlank />
          <TAssistant>Running. Open:</TAssistant>
          <TLine>  <TBlue>http://localhost:8000/acme-robotics-60-min-workshop/deck.html</TBlue></TLine>
        </TerminalMockup>
      }
    />
  );
}

// ── 22. Demo Return ───────────────────────────────────────────
function Slide_TTDemoReturn() {
  var bullets = [
    'Open dist/acme-robotics-60-min-workshop/deck.html',
    'Open demo-scripts.html',
    'cd arm-controller && npm test \u2192 1 red',
    'This is exactly what you\u2019d smoke-test.',
  ];
  return (
    <Slide bg={DARK} color={BONE} label="Live Demo Part 2" center>
      <div style={{
        display: 'inline-block', background: CLAY, color: '#fff',
        padding: '8px 24px', borderRadius: 6, fontSize: 14,
        fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
        marginBottom: 24,
      }}>LIVE DEMO &mdash; PART 2</div>
      <h2 style={{
        fontFamily: SERIF, fontSize: 40, fontWeight: 380,
        marginBottom: 32, color: BONE,
      }}>Back to Acme</h2>
      <div style={{ textAlign: 'left', maxWidth: 500 }}>
        {bullets.map(function(b, i) {
          return (
            <div key={i} style={{
              display: 'flex', gap: 12, alignItems: 'baseline',
              marginBottom: 14, fontSize: 16, lineHeight: 1.5,
              color: 'rgba(250,249,245,0.75)',
            }}>
              <span style={{ color: CLAY, fontSize: 10, flexShrink: 0 }}>{'\u25CF'}</span>
              <span>{b}</span>
            </div>
          );
        })}
      </div>
    </Slide>
  );
}

// ── 23. Recap ─────────────────────────────────────────────────
function Slide_TTRecap() {
  var steps = ['Clone', 'Branch', '/ncp', 'Align to client', 'Smoke test', '/ncp-sync iterate', 'Serve & present'];
  return (
    <Slide bg={BONE} label="Recap">
      <div style={KICKER}>Workflow</div>
      <h2 style={H2}>The full loop</h2>
      <VCenter>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          {steps.map(function(s, i) {
            return (
              <React.Fragment key={i}>
                <div style={{
                  padding: '14px 16px', textAlign: 'center',
                  background: i === 2 ? CLAY : '#fff',
                  color: i === 2 ? '#fff' : DARK,
                  border: '1px solid ' + (i === 2 ? CLAY : 'rgba(20,20,19,0.08)'),
                  borderRadius: i === 0 ? '10px 0 0 10px' : i === steps.length - 1 ? '0 10px 10px 0' : 0,
                  fontSize: 12.5, fontWeight: 600, whiteSpace: 'nowrap',
                  minWidth: 90,
                }}>
                  {s}
                </div>
                {i < steps.length - 1 && (
                  <div style={{ color: GRAY, fontSize: 16, padding: '0 2px' }}>{'\u2192'}</div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </VCenter>
    </Slide>
  );
}

// ── 24. Q&A ───────────────────────────────────────────────────
function Slide_TTQA() {
  var links = [
    { label: 'This repo', url: 'github.com/<accenture-org>/claude-code-accenture-enablement',
      href: 'https://github.com/<accenture-org>/claude-code-accenture-enablement' },
    { label: 'Claude Code docs', url: 'docs.anthropic.com/claude-code',
      href: 'https://docs.anthropic.com/en/docs/claude-code' },
    { label: 'Slide planner', url: '_shared/planner.html',
      href: '../../_shared/planner.html' },
  ];
  return (
    <Slide bg={DARK} color={BONE} label="Q&A" center>
      <h1 style={{
        fontFamily: SERIF, fontSize: 56, fontWeight: 360,
        letterSpacing: '-0.02em', marginBottom: 48, color: BONE,
      }}>Questions?</h1>
      <div style={{ textAlign: 'left' }}>
        {links.map(function(l, i) {
          var text = <span style={{ fontSize: 13, fontFamily: MONO, color: CLAY, wordBreak: 'break-all' }}>{l.url}</span>;
          return (
            <div key={i} style={{
              display: 'flex', gap: 12, alignItems: 'baseline',
              marginBottom: 14, maxWidth: 720,
            }}>
              <span style={{ color: CLAY, fontSize: 10 }}>{'\u25CF'}</span>
              <span style={{ fontSize: 14, color: 'rgba(250,249,245,0.5)', flexShrink: 0, minWidth: 90 }}>{l.label}</span>
              {l.href
                ? <a href={l.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>{text}</a>
                : text}
            </div>
          );
        })}
      </div>
    </Slide>
  );
}

// ── Expose all 24 to window ───────────────────────────────────
Object.assign(window, {
  Slide_TTTitle,
  Slide_TTAgenda,
  Slide_TTWhy,
  Slide_TTSectionAccess,
  Slide_TTAccess,
  Slide_TTRepoTour,
  Slide_TTSectionGenerate,
  Slide_TTPlanner,
  Slide_TTNcpIntro,
  Slide_TTNcpQuestions,
  Slide_TTDemoKickoff,
  Slide_TTSectionTailor,
  Slide_TTCustomerAlign,
  Slide_TTDemoPhilosophy,
  Slide_TTSpecJson,
  Slide_TTNcpSync,
  Slide_TTSmokeTest,
  Slide_TTDemoScripts,
  Slide_TTPresenterKeys,
  Slide_TTSectionShip,
  Slide_TTDeploy,
  Slide_TTLocalFallback,
  Slide_TTDemoReturn,
  Slide_TTRecap,
  Slide_TTQA,
});
}
