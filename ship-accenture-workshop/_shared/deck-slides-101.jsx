// ═══════════════════════════════════════════════════════════════
// DECK SLIDES — 101: FOUNDATIONS
// What is Claude Code · Install · Core loop · Feature ladder ·
// Models · Demo 1 · Exercise 1
//
// Reads window.DECK_PROFILE for vehicle-specific content:
//   vehicle, demo1.beats, exercise1.{doneWhen,steps}, ladder.tiers
// All reads fall back to flag-service generics if the profile omits them.
// ═══════════════════════════════════════════════════════════════

{
// Scoped block — constants don't leak. Each deck-slides-*.jsx file
// does this so they can share names without stomping each other
// under Babel standalone's script-mode transform.
const CLAY = '#D97757', OAT = '#F0EEE6', DARK = '#141413', BONE = '#FAF9F5', GRAY = '#73726C';
const SERIF = "'Anthropic Serif', Georgia, serif";
const MONO = "'JetBrains Mono', monospace";
const H2 = { fontFamily: SERIF, fontSize: 32, fontWeight: 400, marginBottom: 24 };
const KICKER = { fontSize: 12, fontWeight: 600, color: CLAY, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 };
const SUB = { fontSize: 14, color: GRAY, marginBottom: 32, lineHeight: 1.5 };
// Profile shorthand — deck-profile.jsx loads before this file.
const _P = window.DECK_PROFILE || {};
// Print/thumbnail mode: skip stagger/sub-step animations, render final state.
// Mirrors deck-slides-broadcast.jsx:17 — file-scoped, babel wraps each <script>.
const _IS_PRINT = document.documentElement.classList.contains('print-pdf');
function _printAll(n) { var a = []; for (var i = 0; i < n; i++) a.push(i); return a; }

// ── Section divider ───────────────────────────────────────────────
function Slide_Section101() {
  return (
    <SectionSlide
      number={1}
      title="Foundations"
      subtitle="What Claude Code is, how it thinks, and the loop everything else builds on"
      lottieSrc="../_shared/assets/lottie/Object-CodeTerminal.lottie"
    />
  );
}

// ── What is Claude Code ───────────────────────────────────────────
function Slide_WhatIsCC() {
  return (
    <Slide bg={BONE} label="What is Claude Code">
      <VCenter stretch>
      <div style={KICKER}>Foundations</div>
      <h2 style={H2}>An agent in your terminal, in your repo</h2>
      <p style={{ ...SUB, maxWidth: 600 }}>
        Not a sidebar. Not autocomplete. Claude Code lives where your code lives —
        reads it, edits it, runs it. You stay in review.
      </p>
      <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
        <InfoCard
          icon="Search"
          title="Reads your code"
          items={[
            'Greps, reads files, traces imports',
            'Builds context from the actual repo',
            'No indexing step, no upload',
          ]}
        />
        <InfoCard
          icon="Edit"
          title="Edits files"
          items={[
            'Proposes diffs, you approve',
            'Multi-file refactors in one shot',
            'Respects your formatting',
          ]}
        />
        <InfoCard
          icon="CommandLine"
          title="Runs commands"
          items={[
            'npm test, go build, pytest',
            'Sees output, fixes failures',
            'The loop closes itself',
          ]}
        />
      </div>
      </VCenter>
    </Slide>
  );
}

// ── Install ───────────────────────────────────────────────────────
// PlatformSwitch does the heavy lifting. Each variant is a terminal
// mockup with the right env vars. `default` covers 1P.
function Slide_Install() {
  const InstallTerminal = ({ children }) => (
    <TerminalMockup title="~" width={760}>
      <TPrompt>curl -fsSL https://claude.ai/install.sh | sh</TPrompt>
      <TLine><TGray>Downloading Claude Code...</TGray></TLine>
      <TLine><TGreen>✓</TGreen> <TGray>Installed to ~/.local/bin/claude</TGray></TLine>
      <TBlank />
      {children}
      <TBlank />
      <TPrompt>claude</TPrompt>
      <TBlank />
      <TLogo path="~/your-repo" />
    </TerminalMockup>
  );

  return (
    <Slide bg={BONE} label="Install">
      <div style={KICKER}>Setup</div>
      <h2 style={{ ...H2, marginBottom: 0 }}>One curl. Then auth.</h2>
      <VCenter lift={2.2}>
        <PlatformSwitch>
          <div data-platform="c4e">
            <InstallTerminal>
              <TPrompt>claude auth login</TPrompt>
              <TLine><TGray>Opening browser to authenticate...</TGray></TLine>
              <TLine><TGreen>✓</TGreen> <TGray>Logged in as you@company.com (Enterprise)</TGray></TLine>
            </InstallTerminal>
          </div>
          <div data-platform="bedrock">
            <InstallTerminal>
              <TPrompt>export CLAUDE_CODE_USE_BEDROCK=1</TPrompt>
              <TPrompt>export AWS_REGION=us-east-1</TPrompt>
              <TLine><TGray># AWS credentials via standard chain (IAM role, ~/.aws/credentials, ...)</TGray></TLine>
            </InstallTerminal>
          </div>
          <div data-platform="vertex">
            <InstallTerminal>
              <TPrompt>export CLAUDE_CODE_USE_VERTEX=1</TPrompt>
              <TPrompt>gcloud auth application-default login</TPrompt>
              <TLine><TGreen>✓</TGreen> <TGray>Credentials saved to ~/.config/gcloud/...</TGray></TLine>
            </InstallTerminal>
          </div>
          <div data-platform="azure">
            <InstallTerminal>
              <TPrompt>export ANTHROPIC_AZURE_ENDPOINT=https://your-resource.openai.azure.com</TPrompt>
              <TPrompt>export ANTHROPIC_API_KEY=$AZURE_KEY</TPrompt>
            </InstallTerminal>
          </div>
          <div data-platform="default">
            <InstallTerminal>
              <TPrompt>export ANTHROPIC_API_KEY=sk-ant-api03-...</TPrompt>
              <TLine><TGray># Get your key from console.anthropic.com</TGray></TLine>
            </InstallTerminal>
          </div>
        </PlatformSwitch>
      </VCenter>
    </Slide>
  );
}

// ── Core Loop ─────────────────────────────────────────────────────
function Slide_CoreLoop() {
  const steps = [
    { label: 'Prompt', desc: 'You describe intent' },
    { label: 'Read',   desc: 'Claude greps & reads' },
    { label: 'Plan',   desc: 'Proposes an approach' },
    { label: 'Edit',   desc: 'Writes diffs' },
    { label: 'Review', desc: 'You approve or refine' },
    { label: 'Loop',   desc: 'Run tests, iterate' },
  ];
  return (
    <Slide bg={BONE} label="Core loop">
      <div style={KICKER}>The primitive</div>
      <h2 style={H2}>Everything is this loop</h2>
      <p style={{ ...SUB, maxWidth: 560 }}>
        Spec → prototype, bug → fix, migration → done. Same six steps every time.
        The rest of today is about making each step faster.
      </p>
      <VCenter>
        {/* alignItems: stretch makes every box adopt the tallest sibling's height —
            fixes the "Edit" box looking shorter than "Prompt" */}
        <div style={{ display: 'flex', alignItems: 'stretch', gap: 0 }}>
          {steps.map((s, i) => (
            <React.Fragment key={i}>
              <div style={{
                width: 118, padding: '20px 14px', textAlign: 'center',
                background: i === 0 ? CLAY : '#fff',
                color: i === 0 ? '#fff' : DARK,
                border: '1px solid rgba(20,20,19,0.08)',
                borderRadius: i === 0 ? '12px 0 0 12px' : i === steps.length - 1 ? '0 12px 12px 0' : 0,
                display: 'flex', flexDirection: 'column', justifyContent: 'center',
              }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontSize: 11, opacity: 0.65 }}>{s.desc}</div>
              </div>
              {i < steps.length - 1 && (
                <div style={{ color: GRAY, fontSize: 18, padding: '0 4px', alignSelf: 'center' }}>→</div>
              )}
            </React.Fragment>
          ))}
        </div>
      </VCenter>
      {/* Loop-back arrow — Review loops to Prompt */}
      <div style={{
        textAlign: 'center', fontSize: 12, color: GRAY, fontFamily: MONO,
      }}>
        ↑ loops back to prompt until tests green ↑
      </div>
    </Slide>
  );
}

// ── Feature Ladder ────────────────────────────────────────────────
// 7-tier, ported from Expedia (deck-slides-act0.jsx). All zones 'mid' —
// Generic's level slider means we can't assume where the room sits.
// Presenter narrates position live (feedback_audience_positioning).
// Profile can override with a shorter/zoned tier set via _P.ladder.tiers.
// Resolved set exported to window so a recap reprise stays in lockstep.
const LADDER_TIERS = (_P.ladder && _P.ladder.tiers) || [
  { label: 'Chat + copy-paste',     desc: 'Ask in a tab, paste into your editor',          zone: 'mid' },
  { label: 'CC in terminal',        desc: 'Claude reads, edits, runs tests — you review',  zone: 'mid' },
  { label: 'CLAUDE.md',             desc: 'Teach it your repo once, stop re-explaining',   zone: 'mid' },
  { label: 'Skills + Slash',        desc: 'Encode workflows as markdown, invoke with /',   zone: 'mid' },
  { label: 'Hooks + MCP',           desc: 'Guardrails on tool events, wire external data', zone: 'mid' },
  { label: 'Subagents + Plugins',   desc: 'Fan-out work, bundle & ship to the team',       zone: 'mid' },
  { label: 'Agent teams',           desc: 'Parallel Claudes, spec-driven, you orchestrate',zone: 'mid' },
];
window.LADDER_TIERS = LADDER_TIERS;

function Slide_FeatureLadder() {
  const tiers = LADDER_TIERS;
  const N = tiers.length;

  // Zone styling. All 'mid' by default; presenter can flip a zone in the
  // data array above for a known room without touching markup.
  const zoneStyle = (zone) => {
    if (zone === 'done') return { bg: '#fff', opacity: 0.55, badge: 'rgba(20,20,19,0.06)', badgeFg: GRAY };
    if (zone === 'today') return { bg: 'rgba(217,119,87,0.06)', opacity: 1, badge: CLAY, badgeFg: '#fff' };
    return { bg: '#fff', opacity: 1, badge: 'rgba(217,119,87,0.15)', badgeFg: CLAY };
  };

  return (
    <Slide bg={BONE} label="Feature ladder">
      <div style={KICKER}>Maturity</div>
      <h2 style={H2}>The Claude Code feature ladder</h2>
      <p style={{ ...SUB, marginBottom: 20 }}>
        Seven rungs from one-shot chat to orchestrated agents. Match the rung to the problem.
      </p>

      {/* Gradient bar — oat → clay across 7 segments */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}>
        {tiers.map((t, i) => (
          <div key={i} style={{
            flex: 1, padding: '12px 5px', textAlign: 'center',
            background: i === 0 ? OAT : i === N - 1 ? CLAY : `rgba(217,119,87,${0.06 + i * 0.09})`,
            color: i >= N - 2 ? '#fff' : DARK,
            borderRadius: i === 0 ? '8px 0 0 8px' : i === N - 1 ? '0 8px 8px 0' : 0,
            fontSize: 10, fontWeight: 600, lineHeight: 1.2,
            borderRight: i < N - 1 ? '1px solid rgba(255,255,255,0.5)' : 'none',
          }}>{t.label}</div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 6px', fontSize: 11, color: GRAY, marginBottom: 16 }}>
        <span>Interactive, one-shot</span>
        <span>Orchestrated, parallel</span>
      </div>

      {/* Tier rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        {tiers.map((t, i) => {
          const zs = zoneStyle(t.zone);
          return (
            <div key={i} style={{
              display: 'flex', gap: 12, alignItems: 'center',
              padding: '7px 12px', borderRadius: 8, background: zs.bg,
              border: '1px solid rgba(20,20,19,0.06)', opacity: zs.opacity,
            }}>
              <div style={{
                width: 20, height: 20, borderRadius: 5, flexShrink: 0,
                background: zs.badge, color: zs.badgeFg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 700,
              }}>{t.zone === 'done' ? '✓' : i + 1}</div>
              <div style={{ fontSize: 12.5, fontWeight: 600, minWidth: 150 }}>{t.label}</div>
              <div style={{ fontSize: 11.5, color: GRAY, flex: 1 }}>{t.desc}</div>
            </div>
          );
        })}
      </div>
    </Slide>
  );
}

// ── Models ────────────────────────────────────────────────────────
// Split-bg layout ported from ServiceNow 201. Left illustration / right list.
// PlatformSwitch callout stays — feedback_model_ids compliance.
function Slide_Models() {
  const models = [
    { name: 'Opus',   tag: 'Most capable', use: 'Architecture, gnarly refactors, unfamiliar codebases. Slower, more expensive, worth it.' },
    { name: 'Sonnet', tag: 'Balanced',     use: 'Most edits, most debugging, most everything. The default for a reason.' },
    { name: 'Haiku',  tag: 'Fastest',      use: 'Quick lookups, formatting, background subagent work. Cheap and fast.' },
  ];
  return (
    <Slide bg={`linear-gradient(to right, ${OAT} 50%, ${BONE} 50%)`} label="Models" padding="0">
      <div style={{ display: 'flex', height: '100%' }}>
        {/* Left: illustration. Column bg matches the outer gradient's left half;
            redundant when the gradient renders but covers the canvas area if
            deck-components.jsx is stale-cached (backgroundColor rejects gradients). */}
        <div style={{
          flex: '0 0 50%', background: OAT,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 40,
        }}>
          <img src="assets/illus-hand-rocks.svg" alt="" style={{
            width: '100%', maxHeight: '80%', objectFit: 'contain',
          }} />
        </div>
        {/* Right: model list + platform callout */}
        <div style={{
          flex: 1, background: BONE,
          padding: '56px 48px',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
        }}>
          <div style={KICKER}>Models</div>
          <h2 style={{ ...H2, marginBottom: 28 }}>Pick the right brain for the job</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22, marginBottom: 28 }}>
            {models.map((m, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <span style={{
                  width: 9, height: 9, borderRadius: '50%', background: CLAY,
                  flexShrink: 0, marginTop: 11,
                }} />
                <div>
                  <div style={{ fontFamily: SERIF, fontSize: 26, fontWeight: 400, lineHeight: 1.15 }}>
                    {m.name}
                    <span style={{ fontSize: 12, color: GRAY, fontFamily: "'Anthropic Sans', sans-serif", marginLeft: 12 }}>{m.tag}</span>
                  </div>
                  <div style={{ fontSize: 11.5, color: GRAY, lineHeight: 1.5, marginTop: 3, maxWidth: 380 }}>{m.use}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{
            padding: '12px 16px', background: 'rgba(217,119,87,0.06)',
            borderRadius: 8, borderLeft: `3px solid ${CLAY}`,
            fontSize: 11.5, color: GRAY, lineHeight: 1.6,
          }}>
            <PlatformSwitch>
              <div data-platform="bedrock">
                Model IDs on Bedrock are versioned ARNs — check the <strong style={{color: DARK}}>Bedrock console → Model access</strong> for the current strings. Claude Code picks them up automatically once <code style={{fontFamily: MONO, fontSize: 10.5}}>CLAUDE_CODE_USE_BEDROCK=1</code> is set.
              </div>
              <div data-platform="vertex">
                Model IDs on Vertex are date-suffixed — check <strong style={{color: DARK}}>Vertex AI → Model Garden → Claude</strong> for current publisher model names. Claude Code picks them up automatically once <code style={{fontFamily: MONO, fontSize: 10.5}}>CLAUDE_CODE_USE_VERTEX=1</code> is set.
              </div>
              <div data-platform="azure">
                Azure uses deployment names you configure in <strong style={{color: DARK}}>Azure AI Studio</strong> — they're arbitrary strings you pick, not fixed model IDs.
              </div>
              <div data-platform="default">
                Switch models inside Claude Code with <code style={{fontFamily: MONO, fontSize: 10.5}}>/model</code>. It lists what's available on your account — no need to memorize IDs.
              </div>
            </PlatformSwitch>
          </div>
        </div>
      </div>
    </Slide>
  );
}

// ── How Anthropic uses Claude Code ─────────────────────────────────
// Ported from ServiceNow 201 Slide07. Four-pill credibility beat.
// Anthropicons instead of SN's picto SVGs (feedback_anthropicons).
function Slide_HowAnthropicUses() {
  const pills = [
    { icon: 'ai-Globe',     title: 'Give Claude access to your systems', body: 'connect it to the same tools your team uses every day' },
    { icon: 'ai-Book',      title: 'Give Claude your information',       body: 'CLAUDE.md, docs, architecture decisions' },
    { icon: 'ai-Lightning', title: 'Introduce a "light" setup',          body: 'a few slash commands and one good CLAUDE.md beats elaborate config' },
    { icon: 'ai-Chat',      title: 'Treat Claude like a teammate',       body: 'ask questions, review work, iterate conversationally' },
  ];
  const Pill = ({ icon, title, body }) => (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 20,
      padding: '18px 24px', background: '#fff', borderRadius: 999,
      boxShadow: '0 2px 8px rgba(0,0,0,0.04), 0 0 0 1px rgba(31,30,29,0.06)',
    }}>
      <i className={icon} style={{
        fontSize: 28, color: CLAY, width: 42, textAlign: 'center', flexShrink: 0,
      }} />
      <div style={{ fontSize: 15, lineHeight: 1.4, color: DARK }}>
        <span style={{ fontWeight: 600 }}>{title}</span>
        {' — '}{body}
      </div>
    </div>
  );
  return (
    <Slide bg={BONE} label="How Anthropic uses CC">
      <div style={KICKER}>Principles</div>
      <h2 style={H2}>How Anthropic uses Claude Code</h2>
      <VCenter stretch>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {pills.map((p, i) => <Pill key={i} {...p} />)}
        </div>
      </VCenter>
    </Slide>
  );
}

// ── Workflow transformation ────────────────────────────────────────
// Ported from Intuit 301 Slide20. Before/after time blocks.
// The point isn't the number — it's where the time goes.
function Slide_WorkflowTransform() {
  const before = [
    { task: 'Read spec & understand', time: '2h' },
    { task: 'Study codebase',         time: '3h' },
    { task: 'Write implementation',   time: '8h' },
    { task: 'Write tests',            time: '3h' },
    { task: 'Debug & iterate',        time: '4h' },
    { task: 'Code review fixes',      time: '2h' },
  ];
  const after = [
    { task: 'Share spec with Claude',    time: '15m', hl: true },
    { task: 'Review approach & plan',    time: '1h',  hl: true },
    { task: 'Claude implements + tests', time: '1h',  hl: false },
    { task: 'Review & refine output',    time: '1h',  hl: true },
    { task: 'Polish & ship',             time: '30m', hl: true },
  ];
  const Row = ({ task, time, clay, hl }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{
        flex: 1, padding: '9px 14px', borderRadius: 6, fontSize: 12.5,
        background: clay ? (hl ? 'rgba(217,119,87,0.06)' : 'rgba(217,119,87,0.14)') : 'rgba(20,20,19,0.04)',
        border: '1px solid ' + (clay ? (hl ? 'rgba(217,119,87,0.12)' : 'rgba(217,119,87,0.22)') : 'rgba(20,20,19,0.08)'),
        color: clay && !hl ? CLAY : DARK,
      }}>{task}</div>
      <div style={{
        fontFamily: MONO, fontSize: 12, minWidth: 34, textAlign: 'right',
        color: clay ? CLAY : GRAY, fontWeight: clay ? 600 : 400,
      }}>{time}</div>
    </div>
  );
  return (
    <Slide bg={BONE} label="Workflow transformation">
      <div style={KICKER}>The shift</div>
      <h2 style={H2}>Workflow transformation</h2>
      <p style={SUB}>Your value moves up the stack — from code production to design judgment.</p>
      <VCenter stretch>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
          {/* Before */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: GRAY, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Before</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {before.map((t, i) => <Row key={i} {...t} />)}
              <div style={{ fontSize: 13, fontWeight: 600, color: GRAY, textAlign: 'right', marginTop: 4 }}>~22 hours</div>
            </div>
          </div>
          {/* After */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: CLAY, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>With Claude Code</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {after.map((t, i) => <Row key={i} {...t} clay />)}
              <div style={{ fontSize: 13, fontWeight: 600, color: CLAY, textAlign: 'right', marginTop: 4 }}>~4 hours</div>
            </div>
          </div>
        </div>
      </VCenter>
    </Slide>
  );
}

// ── Demo 1 ────────────────────────────────────────────────────────
function Slide_Demo1() {
  const d = _P.demo1 || {};
  return <DemoSlide n={d.n ?? 1} title="Fix the failing test" beats={d.beats || [
    { key: 'npm test', line: 'see the failure — user-23 excluded' },
    { key: null,       line: '"npm test is failing. Find and fix it."' },
    { key: null,       line: 'watch: Read → Edit → Bash' },
    { key: 'npm test', line: 'green' },
  ]} />;
}

// ── Exercise 1 ────────────────────────────────────────────────────
function Slide_Ex1() {
  const ex = _P.exercise1 || {};
  const mono = { fontFamily: MONO, fontSize: 13 };
  return (
    <ExerciseSlide
      n={ex.n ?? 1}
      time="15 min"
      title="Reproduce & fix"
      doneWhen={ex.doneWhen || "npm test shows 4/4 passing"}
    >
      {ex.steps || (<>
        <ol style={{ paddingLeft: 20, margin: 0 }}>
          <li style={{ marginBottom: 10 }}>Clone the workshop repo, <code style={mono}>cd {_P.vehicle || 'flag-service'}</code></li>
          <li style={{ marginBottom: 10 }}><code style={mono}>npm test</code> — see the failure</li>
          <li style={{ marginBottom: 10 }}>Open <code style={mono}>claude</code> and paste:</li>
        </ol>
        <div style={{
          marginTop: 8, padding: '10px 14px', background: 'rgba(0,0,0,0.3)',
          borderRadius: 6, fontFamily: MONO, fontSize: 12.5, color: '#c3e88d',
        }}>
          npm test is failing. Find the bug and fix it.
        </div>
      </>)}
    </ExerciseSlide>
  );
}


// ============================================================================
// LINA-PORT — slides from foundational training/Claude Code 101-301.html
// GitHubPRMock + SentryErrorMock are SDLC-only helpers (not window-exported).
// ============================================================================

function GitHubPRMock({ checksVisible, slackVisible, stageT }) {
  var GH = {
    headerBg: '#0d1117',
    pageBg: '#0d1117',
    cardBg: '#161b22',
    border: '#30363d',
    text: '#e6edf3',
    textMuted: '#7d8590',
    textFaint: '#484f58',
    green: '#3fb950',
    greenBg: '#238636',
    link: '#58a6ff',
    mergePurple: '#a371f7',
    font: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
    mono: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace",
  };

  var checks = [
    { name: 'build', label: 'Build & Compile', pass: stageT > 640 },
    { name: 'test', label: 'Tests (23/23)', pass: stageT > 1120 },
    { name: 'lint', label: 'Lint & Format', pass: stageT > 1440 },
    { name: 'claude', label: 'claude-review', pass: stageT > 2000 },
  ];
  var allPass = checks.every(function(c) { return c.pass; });

  return React.createElement('div', { style: {
    background: GH.pageBg, borderRadius: 8, overflow: 'hidden', height: '100%',
    fontFamily: GH.font, fontSize: 13, color: GH.text, display: 'flex', flexDirection: 'column',
    border: '1px solid ' + GH.border,
  }},
    // ── GitHub Header ──
    React.createElement('div', { style: {
      background: GH.headerBg, padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 12,
      borderBottom: '1px solid ' + GH.border,
    }},
      // Hamburger
      React.createElement('span', { style: { color: GH.text, fontSize: 16 } }, '\u2261'),
      // GitHub logo (SVG octicon)
      React.createElement('svg', { width: 28, height: 28, viewBox: '0 0 16 16', fill: '#fff' },
        React.createElement('path', { d: 'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z' })),
      // Search
      React.createElement('div', { style: {
        flex: 1, maxWidth: 240, background: GH.cardBg, border: '1px solid ' + GH.border,
        borderRadius: 6, padding: '3px 10px', display: 'flex', alignItems: 'center', gap: 6,
      }},
        React.createElement('i', { className: 'ai-Search', style: { color: GH.textFaint, fontSize: 11 } }),
        React.createElement('span', { style: { color: GH.textFaint, fontSize: 12 } }, 'Type / to search')),
      React.createElement('div', { style: { flex: 1 } }),
      // Right icons
      React.createElement('span', { style: { color: GH.text, fontSize: 14 } }, '+'),
      React.createElement('div', { style: { width: 22, height: 22, borderRadius: '50%', background: '#D97757', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
        React.createElement('span', { style: { color: '#fff', fontSize: 10, fontWeight: 600 } }, 'S'))),

    // ── Repo Header ──
    React.createElement('div', { style: {
      padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 6,
      borderBottom: '1px solid ' + GH.border,
    }},
      React.createElement('svg', { width: 14, height: 14, viewBox: '0 0 16 16', fill: GH.textMuted },
        React.createElement('path', { d: 'M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5zm10.5-1h-8a1 1 0 00-1 1v6.708A2.486 2.486 0 014.5 9h8.5zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z' })),
      React.createElement('a', { style: { color: GH.link, fontSize: 14, textDecoration: 'none' } }, 'anthropics'),
      React.createElement('span', { style: { color: GH.textMuted } }, '/'),
      React.createElement('a', { style: { color: GH.link, fontSize: 14, fontWeight: 600, textDecoration: 'none' } }, 'anthropic'),
      React.createElement('span', { style: {
        fontSize: 10, color: GH.textMuted, border: '1px solid ' + GH.border,
        borderRadius: 12, padding: '0 6px', marginLeft: 4,
      } }, 'Private')),

    // ── Tab Bar ──
    React.createElement('div', { style: {
      display: 'flex', gap: 0, padding: '0 12px', borderBottom: '1px solid ' + GH.border,
      overflow: 'hidden',
    }},
      [
        { label: 'Code', count: null, active: false },
        { label: 'Issues', count: '345', active: false },
        { label: 'Pull requests', count: '5k+', active: true },
        { label: 'Actions', count: null, active: false },
        { label: 'Security', count: null, active: false },
      ].map(function(tab, i) {
        return React.createElement('div', { key: i, style: {
          padding: '8px 12px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4,
          color: tab.active ? GH.text : GH.textMuted,
          borderBottom: tab.active ? '2px solid #f78166' : '2px solid transparent',
          fontWeight: tab.active ? 600 : 400,
        }},
          tab.label,
          tab.count && React.createElement('span', { style: {
            background: 'rgba(110,118,129,0.3)', borderRadius: 10, padding: '0 6px',
            fontSize: 10, fontWeight: 500, color: GH.textMuted,
          } }, tab.count));
      })),

    // ── PR Content ──
    React.createElement('div', { style: { flex: 1, padding: '16px 20px', overflow: 'hidden' } },
      // PR title
      React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 10 } },
        React.createElement('div', { style: { width: 14, height: 14, borderRadius: '50%', border: '2px solid ' + GH.green, marginTop: 3, flexShrink: 0 } }),
        React.createElement('div', null,
          React.createElement('h2', { style: { fontSize: 18, fontWeight: 600, color: GH.text, lineHeight: 1.3, margin: 0 } },
            'Fix OAuth callback URL mismatch',
            React.createElement('span', { style: { color: GH.textMuted, fontWeight: 400 } }, ' #847')),
          React.createElement('div', { style: { fontSize: 11, color: GH.textMuted, marginTop: 3, display: 'flex', alignItems: 'center', gap: 4 } },
            React.createElement('span', { style: { background: GH.greenBg, color: '#fff', fontSize: 10, padding: '1px 7px', borderRadius: 12, fontWeight: 500 } }, 'Open'),
            React.createElement('span', null, 'sarah-chen wants to merge 3 commits into '),
            React.createElement('span', { style: { background: 'rgba(56,139,253,0.15)', color: GH.link, padding: '0 4px', borderRadius: 4, fontFamily: GH.mono, fontSize: 11 } }, 'main'),
            React.createElement('span', null, ' from '),
            React.createElement('span', { style: { background: 'rgba(56,139,253,0.15)', color: GH.link, padding: '0 4px', borderRadius: 4, fontFamily: GH.mono, fontSize: 11 } }, 'fix/oauth-callback')))),

      // PR tabs
      React.createElement('div', { style: { display: 'flex', gap: 0, marginBottom: 14, borderBottom: '1px solid ' + GH.border } },
        [
          { label: 'Conversation', count: '3', active: false },
          { label: 'Commits', count: '3', active: false },
          { label: 'Checks', count: checks.filter(function(c){return c.pass;}).length + '', active: true },
          { label: 'Files changed', count: '3', active: false },
        ].map(function(tab, i) {
          return React.createElement('div', { key: i, style: {
            padding: '6px 12px', fontSize: 11, color: tab.active ? GH.text : GH.textMuted,
            borderBottom: tab.active ? '2px solid #f78166' : '2px solid transparent',
            fontWeight: tab.active ? 600 : 400, display: 'flex', alignItems: 'center', gap: 4,
          }},
            tab.label,
            React.createElement('span', { style: { background: 'rgba(110,118,129,0.3)', borderRadius: 10, padding: '0 5px', fontSize: 10 } }, tab.count));
        })),

      // Checks list
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 0 } },
        checks.map(function(check, i) {
          return React.createElement('div', { key: i, style: {
            display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px',
            borderBottom: '1px solid ' + GH.border,
          }},
            // Check icon
            check.pass
              ? React.createElement('svg', { width: 14, height: 14, viewBox: '0 0 16 16', fill: GH.green },
                  React.createElement('path', { d: 'M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z' }))
              : React.createElement('svg', { width: 14, height: 14, viewBox: '0 0 16 16', fill: '#d29922', style: { animation: 'pulse 1.5s ease infinite' } },
                  React.createElement('circle', { cx: 8, cy: 8, r: 7, fill: 'none', stroke: '#d29922', strokeWidth: 1.5 }),
                  React.createElement('circle', { cx: 8, cy: 8, r: 3, fill: '#d29922' })),
            React.createElement('span', { style: { fontSize: 12, color: GH.text, flex: 1 } }, check.label),
            check.pass && React.createElement('span', { style: { fontSize: 10, color: GH.textMuted } }, 'Successful in ' + (12 + i * 8) + 's'));
        })),

      // Merge section
      allPass && React.createElement('div', { style: {
        marginTop: 12, background: 'rgba(35,134,54,0.08)', border: '1px solid rgba(63,185,80,0.3)',
        borderRadius: 6, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10,
      }},
        React.createElement('svg', { width: 16, height: 16, viewBox: '0 0 16 16', fill: GH.green },
          React.createElement('path', { d: 'M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z' })),
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 12, fontWeight: 600, color: GH.green } }, 'All checks have passed'),
          React.createElement('div', { style: { fontSize: 11, color: GH.textMuted } }, '4 successful checks')),
        React.createElement('div', { style: { marginLeft: 'auto' } },
          React.createElement('button', { style: {
            background: GH.greenBg, color: '#fff', border: 'none', borderRadius: 6,
            padding: '5px 14px', fontSize: 12, fontWeight: 500, cursor: 'default',
          } }, 'Merge pull request')))));
}

function SentryErrorMock({ stageT }) {
  var SN = {
    bg: '#fff',
    surfaceBg: '#faf9fb',
    sidebarBg: '#3e2c63',
    sidebarText: 'rgba(255,255,255,0.8)',
    sidebarActive: '#fff',
    sidebarMuted: 'rgba(255,255,255,0.5)',
    sidebarIcon: 'rgba(255,255,255,0.6)',
    border: '#e2dfe5',
    text: '#2f2936',
    textMuted: '#80708f',
    textFaint: '#b4adc2',
    red: '#e1567c',
    redBg: 'rgba(225,86,124,0.06)',
    redBorder: 'rgba(225,86,124,0.2)',
    purple: '#6c5fc7',
    purpleBg: 'rgba(108,95,199,0.08)',
    link: '#3d74db',
    green: '#57be8c',
    orange: '#f9a66c',
    font: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
    mono: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace",
  };

  var sparkline = [2,3,2,4,3,5,4,6,8,12,18,28,45,62,54,42,30,22,15,10,8,6,5,4];

  var sidebarItems = [
    { label: 'Projects', active: false },
    { label: 'Issues', active: true },
    { label: 'Discover', active: false },
    { label: 'Performance', active: false },
    { label: 'Alerts', active: false },
    { label: 'Releases', active: false },
  ];

  return React.createElement('div', { style: {
    background: SN.bg, borderRadius: 8, overflow: 'hidden', height: '100%',
    fontFamily: SN.font, fontSize: 13, color: SN.text, display: 'flex',
    border: '1px solid ' + SN.border,
  }},
    // ── Purple Sidebar ──
    React.createElement('div', { style: {
      width: 56, background: SN.sidebarBg, display: 'flex', flexDirection: 'column',
      padding: '10px 0', alignItems: 'center', gap: 2, flexShrink: 0,
    }},
      // Sentry logo
      React.createElement('div', { style: { marginBottom: 10, padding: '4px' } },
        React.createElement('svg', { width: 20, height: 18, viewBox: '0 0 72 66', fill: '#fff' },
          React.createElement('path', { d: 'M29 2.26a3.68 3.68 0 00-6.38 0L.55 46.11A3.63 3.63 0 003.74 51.5h8.2a.66.66 0 00.57-.98l-8-13.83a.66.66 0 01.57-.98h7.45a.66.66 0 01.57.33l12.07 20.89a.66.66 0 00.57.33h3.76a.66.66 0 00.57-.98L18.15 38.4a.66.66 0 01.57-.98h4.3a.66.66 0 01.58.33l7.64 13.22a.66.66 0 00.57.33h3.76a.66.66 0 00.57-.98z' }))),
      // Nav items
      sidebarItems.map(function(item, i) {
        return React.createElement('div', { key: i, style: {
          width: 40, height: 28, borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: item.active ? 'rgba(255,255,255,0.15)' : 'transparent',
          cursor: 'default', position: 'relative',
        }},
          React.createElement('span', { style: {
            fontSize: 8, color: item.active ? SN.sidebarActive : SN.sidebarMuted,
            fontWeight: item.active ? 600 : 400, textAlign: 'center',
          } }, item.label.slice(0,3)));
      }),
      // Bottom spacer + avatar
      React.createElement('div', { style: { flex: 1 } }),
      React.createElement('div', { style: {
        width: 26, height: 26, borderRadius: '50%', background: 'rgba(255,255,255,0.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 10, color: '#fff', fontWeight: 600,
      } }, 'JS')),

    // ── Main Content ──
    React.createElement('div', { style: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' } },
      // Breadcrumb header
      React.createElement('div', { style: {
        padding: '10px 20px', borderBottom: '1px solid ' + SN.border,
        display: 'flex', alignItems: 'center', gap: 6, fontSize: 12,
      }},
        React.createElement('span', { style: { color: SN.link } }, 'Issues'),
        React.createElement('span', { style: { color: SN.textFaint } }, '>'),
        React.createElement('span', { style: { color: SN.text, fontWeight: 500 } }, 'TypeError')),

      // Error header
      React.createElement('div', { style: {
        padding: '14px 20px', borderBottom: '1px solid ' + SN.border,
      }},
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 } },
          // Error level indicator
          React.createElement('div', { style: { width: 12, height: 12, borderRadius: 3, background: SN.red } }),
          React.createElement('span', { style: { fontSize: 10, color: SN.textMuted, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.03em' } }, 'Error \u00b7 javascript')),
        React.createElement('h2', { style: {
          fontSize: 17, fontWeight: 600, color: SN.text, margin: 0, lineHeight: 1.35,
        } }, "TypeError: Cannot read properties of undefined (reading 'url')"),
        React.createElement('div', { style: { display: 'flex', gap: 14, marginTop: 6, fontSize: 12, color: SN.textMuted } },
          React.createElement('span', null, React.createElement('span', { style: { color: SN.red, fontWeight: 600, fontSize: 14 } }, '847'), ' events'),
          React.createElement('span', null, React.createElement('span', { style: { fontWeight: 600, color: SN.text } }, '312'), ' users'),
          React.createElement('span', null, 'First seen ', React.createElement('span', { style: { fontWeight: 500 } }, '2h ago')),
          React.createElement('span', null, 'Last seen ', React.createElement('span', { style: { fontWeight: 500 } }, '3m ago')))),

      // Tabs
      React.createElement('div', { style: { display: 'flex', gap: 0, padding: '0 16px', borderBottom: '1px solid ' + SN.border } },
        ['Details', 'Activity', 'User Feedback', 'Tags'].map(function(tab, i) {
          var isActive = i === 0;
          return React.createElement('div', { key: i, style: {
            padding: '8px 14px', fontSize: 12, color: isActive ? SN.purple : SN.textMuted,
            borderBottom: isActive ? '2px solid ' + SN.purple : '2px solid transparent',
            fontWeight: isActive ? 600 : 400,
          } }, tab);
        })),

      // Content area
      React.createElement('div', { style: { flex: 1, padding: '12px 20px', overflow: 'hidden', display: 'flex', gap: 16 } },
        // Main column
        React.createElement('div', { style: { flex: 1, display: 'flex', flexDirection: 'column', gap: 12 } },
          // Event frequency chart
          React.createElement('div', { style: {
            background: SN.surfaceBg, borderRadius: 6, padding: '10px 14px',
            border: '1px solid ' + SN.border,
          }},
            React.createElement('div', { style: { fontSize: 11, color: SN.textMuted, marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' } }, 'Events'),
            React.createElement('div', { style: { display: 'flex', alignItems: 'flex-end', gap: 2, height: 40 } },
              sparkline.map(function(h, i) {
                var maxH = 62;
                var pct = (h / maxH) * 100;
                var isSpike = h > 25;
                return React.createElement('div', { key: i, style: {
                  flex: 1, height: pct + '%', borderRadius: '2px 2px 0 0',
                  background: isSpike ? SN.red : SN.purple + '40',
                }});
              })),
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginTop: 4 } },
              React.createElement('span', { style: { fontSize: 9, color: SN.textFaint } }, '24h ago'),
              React.createElement('span', { style: { fontSize: 9, color: SN.textFaint } }, 'now'))),

          // Stack Trace
          React.createElement('div', null,
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 } },
              React.createElement('span', { style: { fontSize: 12, fontWeight: 600, color: SN.text } }, 'Exception'),
              React.createElement('span', { style: { fontSize: 10, color: SN.textFaint, background: SN.surfaceBg, border: '1px solid ' + SN.border, padding: '0 6px', borderRadius: 3 } }, 'Most recent call first')),

            // Collapsed frame 1
            React.createElement('div', { style: {
              padding: '5px 10px', background: SN.surfaceBg, border: '1px solid ' + SN.border,
              borderBottom: 'none', borderRadius: '6px 6px 0 0',
              display: 'flex', alignItems: 'center', gap: 6,
            }},
              React.createElement('span', { style: { color: SN.textFaint, fontSize: 8, fontFamily: 'monospace' } }, '\u25B8'),
              React.createElement('span', { style: { fontSize: 11, color: SN.textMuted, fontFamily: SN.mono } }, 'processTicksAndRejections'),
              React.createElement('span', { style: { fontSize: 10, color: SN.textFaint, fontFamily: SN.mono, marginLeft: 'auto' } }, 'node:internal/process:82')),

            // Collapsed frame 2
            React.createElement('div', { style: {
              padding: '5px 10px', background: SN.surfaceBg, border: '1px solid ' + SN.border,
              borderBottom: 'none',
              display: 'flex', alignItems: 'center', gap: 6,
            }},
              React.createElement('span', { style: { color: SN.textFaint, fontSize: 8, fontFamily: 'monospace' } }, '\u25B8'),
              React.createElement('span', { style: { fontSize: 11, color: SN.textMuted, fontFamily: SN.mono } }, 'Router.handle'),
              React.createElement('span', { style: { fontSize: 10, color: SN.textFaint, fontFamily: SN.mono, marginLeft: 'auto' } }, 'express/router:174')),

            // Expanded frame — culprit
            React.createElement('div', { style: {
              border: '1px solid ' + SN.redBorder, borderRadius: '0 0 6px 6px', overflow: 'hidden',
            }},
              // Frame header
              React.createElement('div', { style: {
                padding: '5px 10px', display: 'flex', alignItems: 'center', gap: 6,
                background: SN.redBg,
              }},
                React.createElement('span', { style: { color: SN.red, fontSize: 8, fontFamily: 'monospace' } }, '\u25BE'),
                React.createElement('span', { style: { fontSize: 11, color: SN.red, fontWeight: 600, fontFamily: SN.mono } }, 'handleOAuthCallback'),
                React.createElement('span', { style: { fontSize: 10, color: SN.textMuted, fontFamily: SN.mono } }, 'src/auth/callback.ts'),
                React.createElement('span', { style: { fontSize: 10, color: SN.red, fontFamily: SN.mono, fontWeight: 600, marginLeft: 'auto' } }, 'line 47')),
              // Source code context
              React.createElement('div', { style: {
                padding: '4px 0', fontFamily: SN.mono, fontSize: 11, lineHeight: '20px',
                background: '#fff',
              }},
                [
                  { n: 44, code: '  // Redirect to OAuth provider', hl: false },
                  { n: 45, code: '  const config = getRegionConfig(user);', hl: false },
                  { n: 46, code: '  const callbackUrl = config.authEndpoint;', hl: false },
                  { n: 47, code: '  const redirectUri = AUTH_BASE_URL + "/callback";', hl: true },
                  { n: 48, code: '  return oauth.authorize({ redirectUri });', hl: false },
                ].map(function(line, i) {
                  return React.createElement('div', { key: i, style: {
                    display: 'flex', padding: '0 10px',
                    background: line.hl ? SN.redBg : 'transparent',
                    borderLeft: line.hl ? '3px solid ' + SN.red : '3px solid transparent',
                  }},
                    React.createElement('span', { style: {
                      width: 28, textAlign: 'right', color: line.hl ? SN.red : SN.textFaint,
                      marginRight: 10, userSelect: 'none', fontSize: 10,
                      fontWeight: line.hl ? 700 : 400,
                    } }, line.n),
                    React.createElement('span', { style: {
                      color: line.hl ? SN.red : SN.textMuted,
                      fontWeight: line.hl ? 500 : 400,
                    } }, line.code));
                }))))),

        // Right sidebar — stats
        React.createElement('div', { style: { width: 140, display: 'flex', flexDirection: 'column', gap: 10, flexShrink: 0 } },
          // Status
          React.createElement('div', { style: { background: SN.surfaceBg, borderRadius: 6, padding: '8px 10px', border: '1px solid ' + SN.border } },
            React.createElement('div', { style: { fontSize: 9, color: SN.textMuted, fontWeight: 600, textTransform: 'uppercase', marginBottom: 4 } }, 'Status'),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
              React.createElement('div', { style: { width: 8, height: 8, borderRadius: '50%', background: SN.red } }),
              React.createElement('span', { style: { fontSize: 11, fontWeight: 500 } }, 'Unresolved'))),
          // Priority
          React.createElement('div', { style: { background: SN.surfaceBg, borderRadius: 6, padding: '8px 10px', border: '1px solid ' + SN.border } },
            React.createElement('div', { style: { fontSize: 9, color: SN.textMuted, fontWeight: 600, textTransform: 'uppercase', marginBottom: 4 } }, 'Priority'),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
              React.createElement('i', { className: 'ai-Lightning', style: { fontSize: 12, color: SN.red } }),
              React.createElement('span', { style: { fontSize: 11, fontWeight: 500, color: SN.red } }, 'Critical'))),
          // Assignee
          React.createElement('div', { style: { background: SN.surfaceBg, borderRadius: 6, padding: '8px 10px', border: '1px solid ' + SN.border } },
            React.createElement('div', { style: { fontSize: 9, color: SN.textMuted, fontWeight: 600, textTransform: 'uppercase', marginBottom: 4 } }, 'Assignee'),
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
              React.createElement('div', { style: { width: 16, height: 16, borderRadius: '50%', background: '#D97757', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                React.createElement('span', { style: { color: '#fff', fontSize: 8, fontWeight: 600 } }, 'S')),
              React.createElement('span', { style: { fontSize: 11 } }, 'Sarah C.'))),
          // Tags
          React.createElement('div', { style: { background: SN.surfaceBg, borderRadius: 6, padding: '8px 10px', border: '1px solid ' + SN.border } },
            React.createElement('div', { style: { fontSize: 9, color: SN.textMuted, fontWeight: 600, textTransform: 'uppercase', marginBottom: 6 } }, 'Tag Summary'),
            [
              { k: 'browser', v: 'Chrome 120', pct: 90 },
              { k: 'region', v: 'eu-west-1', pct: 78 },
              { k: 'release', v: 'v2.1.31', pct: 100 },
            ].map(function(tag, i) {
              return React.createElement('div', { key: i, style: { marginBottom: 4 } },
                React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', fontSize: 9, color: SN.textMuted, marginBottom: 2 } },
                  React.createElement('span', null, tag.k),
                  React.createElement('span', null, tag.v + ' ' + tag.pct + '%')),
                React.createElement('div', { style: { height: 4, background: SN.border, borderRadius: 2 } },
                  React.createElement('div', { style: { height: '100%', width: tag.pct + '%', background: SN.purple, borderRadius: 2 } })));
            }))))));
}

function Slide_SDLC(props) {
  var active = props.active, registerSubNav = props.registerSubNav;
  // Sub-stages: 0=intro, 1-5=stages — total 6
  var TOTAL_SUBSTAGES = 6;
  var _cs = React.useState(0), subStage = _cs[0], setSubStage = _cs[1];

  var stages = [
    { id: 'discover', label: 'Discover', icon: 'Search', color: '#34AADC',
      bullets: ['Explore codebase and history', 'Search documentation', 'Summarize a PR or module'] },
    { id: 'design',   label: 'Design',   icon: 'Slides', color: '#9B8ABF',
      bullets: ['Draft technical specs and RFCs', 'Plan architecture changes', 'Design API contracts'] },
    { id: 'build',    label: 'Build',     icon: 'Code', color: '#D97757',
      bullets: ['Write new features', 'Refactor existing code', 'Debug and fix issues'] },
    { id: 'deploy',   label: 'Deploy',   icon: 'ArrowUpRight', color: '#6A9BCC',
      bullets: ['Create and review PRs', 'Run CI/CD checks', 'Merge and ship to production'] },
    { id: 'support',  label: 'Support',  icon: 'Wrench', color: '#E8655A',
      bullets: ['Monitor production errors', 'Debug issues from alerts', 'Hotfix and redeploy'] },
  ];

  // Derived: which content stage is active (0-4), or -1 for intro, -2 for recap
  var isIntro = subStage === 0;
  var isRecap = false;
  var currentStage = isIntro ? -1 : subStage - 1;

  // Reset when becoming active
  React.useEffect(function() { if (!active) setSubStage(0); }, [active]);
  var _t = useTimer3(active), t = _t.t, f = _t.f;
  // Track stage start time
  var _stageStart = React.useState(function() { return -1; }), stageStart = _stageStart[0], setStageStart = _stageStart[1];
  React.useEffect(function() { setStageStart(t); }, [subStage]);
  var stageT = stageStart < 0 ? 0 : Math.max(0, t - stageStart);

  // Register sub-navigation handler
  React.useEffect(function() {
    if (!registerSubNav || !active) return;
    var cleanup = registerSubNav(function(dir) {
      if (dir > 0 && subStage < TOTAL_SUBSTAGES - 1) {
        setSubStage(subStage + 1);
        return true;
      }
      if (dir < 0 && subStage > 0) {
        setSubStage(subStage - 1);
        return true;
      }
      return false;
    });
    return cleanup;
  }, [active, registerSubNav, subStage]);

  function termLine(time) { return stageT >= time; }

  var MONO = "'JetBrains Mono', monospace";
  var SANS = "'Anthropic Sans', system-ui, sans-serif";

  // ============================
  // EXTERNAL SURFACE RENDERERS
  // ============================

  // DISCOVER — Finder-style codebase exploration with click animation
  function renderDiscover() {
    // Cursor animation phases (slower for visibility):
    // 0-500ms: cursor appears at top-right
    // 500-1200ms: cursor moves toward folder
    // 1200-1500ms: folder highlight
    // 1500-1650ms: first click (folder pulses)
    // 1700-1850ms: second click (folder pulses again)
    // 1900+: folder opens, cursor fades out
    var cursorVisible = stageT > 240 && stageT < 1760;
    var cursorProgress = Math.min(1, Math.max(0, (stageT - 400) / 560)); // 0→1 as cursor moves
    var cursorEase = 1 - Math.pow(1 - cursorProgress, 3); // ease-out
    var click1 = stageT > 1200 && stageT < 1320;
    var click2 = stageT > 1360 && stageT < 1480;
    var folderPulse = click1 || click2;
    var folderHighlight = stageT > 880 && stageT < 1560;

    var folderOpen = stageT > 1560;
    var treeItems = [
      { depth: 0, name: 'anthropic/', type: 'dir', show: 1760 },
      { depth: 1, name: 'README.md', type: 'file', show: 2000 },
      { depth: 1, name: 'CLAUDE.md', type: 'claude', show: 2240 },
      { depth: 1, name: 'package.json', type: 'file', show: 2400 },
      { depth: 1, name: 'src/', type: 'dir', show: 2560 },
      { depth: 2, name: 'auth/', type: 'dir', show: 2720 },
      { depth: 3, name: 'callback.ts', type: 'ts', show: 2880 },
      { depth: 3, name: 'middleware.ts', type: 'ts', show: 3000 },
      { depth: 2, name: 'payments/', type: 'dir', show: 3120 },
      { depth: 3, name: 'handler.ts', type: 'ts', show: 3240 },
      { depth: 2, name: 'config/', type: 'dir', show: 3360 },
      { depth: 3, name: 'regions.ts', type: 'ts', show: 3440 },
      { depth: 1, name: 'tests/', type: 'dir', show: 3560 },
      { depth: 2, name: 'auth.test.ts', type: 'ts', show: 3680 },
    ];

    var readingIdx = -1;
    if (stageT > 3840) readingIdx = 1;
    if (stageT > 4320) readingIdx = 2;
    if (stageT > 4640) readingIdx = 6;

    return React.createElement('div', { style: {
      height: '100%', display: 'flex', flexDirection: 'column',
      background: '#fff', borderRadius: 10, overflow: 'hidden',
      border: '1px solid rgba(15,12,8,0.08)', boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
    }},
      React.createElement('div', { style: {
        background: '#f6f6f6', padding: '7px 12px', display: 'flex', alignItems: 'center', gap: 6,
        borderBottom: '1px solid rgba(15,12,8,0.08)',
      }},
        React.createElement('div', { style: { width: 10, height: 10, borderRadius: '50%', background: '#ff5f56' } }),
        React.createElement('div', { style: { width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e' } }),
        React.createElement('div', { style: { width: 10, height: 10, borderRadius: '50%', background: '#27ca40' } }),
        React.createElement('div', { style: { flex: 1, textAlign: 'center', fontSize: 12, color: TEXT_PRIMARY, fontWeight: 500 } }, 'anthropic'),
        React.createElement('div', { style: { width: 52 } })),
      React.createElement('div', { style: { flex: 1, padding: '16px 20px', overflow: 'hidden', position: 'relative' } },
        !folderOpen && React.createElement('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 10, position: 'relative' } },
          // Folder icon with click pulse
          React.createElement('div', { style: {
            position: 'relative', width: 80, height: 64,
            transform: folderPulse ? 'scale(0.92)' : folderHighlight ? 'scale(1.02)' : 'scale(1)',
            transition: 'transform 0.1s',
          }},
            React.createElement('div', { style: { position: 'absolute', top: 0, left: 0, width: 32, height: 12, background: '#5AC8FA', borderRadius: '4px 4px 0 0' } }),
            React.createElement('div', { style: {
              position: 'absolute', top: 10, left: 0, right: 0, bottom: 0,
              background: 'linear-gradient(180deg, #5AC8FA 0%, #34AADC 100%)',
              borderRadius: '0 6px 6px 6px',
              boxShadow: folderHighlight ? '0 2px 16px rgba(52,170,220,0.5)' : '0 2px 8px rgba(52,170,220,0.3)',
              transition: 'box-shadow 0.15s',
            }}),
            // Selection highlight behind folder
            folderHighlight && React.createElement('div', { style: {
              position: 'absolute', inset: -8, borderRadius: 8,
              background: 'rgba(52,170,220,0.08)', border: '1px solid rgba(52,170,220,0.15)',
              zIndex: -1,
            }})),
          React.createElement('span', { style: {
            fontSize: 13, color: folderHighlight ? '#34AADC' : TEXT_PRIMARY, fontWeight: 500,
            transition: 'color 0.15s',
          } }, 'anthropic'),
          // macOS-style cursor
          cursorVisible && React.createElement('div', { style: {
            position: 'absolute',
            left: 'calc(50% + ' + (60 - 100 * cursorEase) + 'px)',
            top: 'calc(50% + ' + (-40 + 30 * cursorEase) + 'px)',
            width: 14, height: 20, zIndex: 10,
            opacity: stageT > 100 ? (stageT < 800 ? 1 : Math.max(0, 1 - (stageT - 800) / 160)) : 0,
            transition: 'opacity 0.15s',
            pointerEvents: 'none',
          }},
            // CSS cursor arrow
            React.createElement('svg', { width: 14, height: 20, viewBox: '0 0 14 20', style: { filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' } },
              React.createElement('path', { d: 'M0 0 L0 16 L4 12 L7 19 L9 18 L6 11 L11 11 Z', fill: '#fff', stroke: '#000', strokeWidth: 0.8 }))),
          // Click ripple
          (click1 || click2) && React.createElement('div', { style: {
            position: 'absolute', left: 'calc(50% - 8px)', top: 'calc(50% - 8px)',
            width: 16, height: 16, borderRadius: '50%',
            background: 'rgba(52,170,220,0.2)',
            transform: 'scale(2)',
            opacity: 0.5,
            transition: 'transform 0.15s, opacity 0.15s',
            pointerEvents: 'none',
          }})),
        folderOpen && React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 0 } },
          treeItems.map(function(item, i) {
            var visible = stageT >= item.show;
            var isReading = i === readingIdx;
            var iconColor = item.type === 'dir' ? '#5AC8FA' : item.type === 'claude' ? '#D97757' : item.type === 'ts' ? '#3178C6' : '#7d8590';
            return React.createElement('div', { key: i, style: {
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '3px 6px 3px ' + (8 + item.depth * 18) + 'px', borderRadius: 4,
              opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : 'translateX(-8px)',
              transition: 'all 0.25s cubic-bezier(0.22,1,0.36,1)',
              background: isReading ? 'rgba(52,170,220,0.08)' : 'transparent',
              borderLeft: isReading ? '2px solid #34AADC' : '2px solid transparent',
            }},
              item.type === 'dir'
                ? React.createElement('div', { style: { position: 'relative', width: 16, height: 13, flexShrink: 0 } },
                    React.createElement('div', { style: { position: 'absolute', top: 0, left: 0, width: 7, height: 3, background: iconColor, borderRadius: '1px 1px 0 0' } }),
                    React.createElement('div', { style: { position: 'absolute', top: 2, left: 0, right: 0, bottom: 0, background: iconColor, borderRadius: '0 2px 2px 2px', opacity: 0.85 } }))
                : React.createElement('div', { style: { width: 14, height: 16, borderRadius: 2, border: '1px solid ' + iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } },
                    React.createElement('span', { style: { fontSize: 6, color: iconColor, fontWeight: 700 } }, item.type === 'ts' ? 'TS' : item.type === 'claude' ? 'C' : '')),
              React.createElement('span', { style: { fontSize: 12, color: isReading ? '#34AADC' : TEXT_PRIMARY, fontFamily: MONO, fontWeight: isReading ? 500 : 400 } }, item.name),
              isReading && React.createElement('span', { style: { marginLeft: 'auto', fontSize: 9, color: '#34AADC', fontFamily: MONO, fontWeight: 500 } }, '\u25C0 reading'));
          }))));
  }

  // DESIGN — Technical spec / RFC document streaming in
  function renderDesign() {
    // Full document text — we stream it character by character
    var docParts = [
      { type: 'h1', text: 'RFC: OAuth2 Callback Refactor', startT: 240 },
      { type: 'meta', text: 'Status: Draft  \u00b7  Author: Claude  \u00b7  Date: Feb 2025', startT: 480 },
      { type: 'h2', text: 'Problem', startT: 720 },
      { type: 'p', text: 'EU users are redirected to US callback endpoint. The redirect_uri is hardcoded to AUTH_BASE_URL instead of using the region config.', startT: 880 },
      { type: 'h2', text: 'Proposed Solution', startT: 1920 },
      { type: 'li', text: 'Replace AUTH_BASE_URL with config.baseUrl per region', startT: 2160 },
      { type: 'li', text: 'Add URL validation via isValidCallbackUrl()', startT: 2560 },
      { type: 'li', text: 'Add error handling for invalid redirects', startT: 2880 },
      { type: 'h2', text: 'API Changes', startT: 3200 },
      { type: 'code', text: '// Before\nconst redirectUri = AUTH_BASE_URL + "/callback";\n\n// After\nconst redirectUri = config.baseUrl + "/callback";\nif (!isValidCallbackUrl(redirectUri)) {\n  throw new InvalidRedirectError(redirectUri);\n}', startT: 3360 },
    ];

    // Characters per second for streaming
    var charRate = 56; // chars per second

    function getVisibleText(part) {
      if (stageT < part.startT) return null;
      var elapsed = stageT - part.startT;
      var charsVisible = Math.floor(elapsed / (1000 / charRate));
      if (charsVisible >= part.text.length) return part.text;
      return part.text.slice(0, charsVisible);
    }

    function isStreaming(part) {
      if (stageT < part.startT) return false;
      var elapsed = stageT - part.startT;
      var charsVisible = Math.floor(elapsed / (1000 / charRate));
      return charsVisible < part.text.length;
    }

    return React.createElement('div', { style: {
      height: '100%', display: 'flex', flexDirection: 'column',
      background: '#fff', borderRadius: 10, overflow: 'hidden',
      border: '1px solid rgba(15,12,8,0.08)', boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
    }},
      // Doc header
      React.createElement('div', { style: {
        background: '#f8f8f7', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8,
        borderBottom: '1px solid rgba(15,12,8,0.06)',
      }},
        React.createElement('div', { style: { width: 10, height: 10, borderRadius: '50%', background: '#ff5f56' } }),
        React.createElement('div', { style: { width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e' } }),
        React.createElement('div', { style: { width: 10, height: 10, borderRadius: '50%', background: '#27ca40' } }),
        React.createElement('div', { style: { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 } },
          React.createElement('i', { className: 'ai-File', style: { fontSize: 12, color: TEXT_SECONDARY } }),
          React.createElement('span', { style: { fontSize: 12, color: TEXT_PRIMARY, fontWeight: 500 } }, 'RFC-2025-003.md'))),
      // Document content — streaming
      React.createElement('div', { style: { flex: 1, padding: '18px 24px', overflow: 'hidden', fontFamily: SANS } },
        docParts.map(function(part, i) {
          var visText = getVisibleText(part);
          if (visText === null) return null;
          var streaming = isStreaming(part);
          var cursor = streaming ? React.createElement('span', { style: { background: TEXT_PRIMARY, color: '#fff', animation: 'blink 0.8s step-end infinite', fontSize: 10, padding: '0 1px', marginLeft: 1, verticalAlign: 'baseline' } }, ' ') : null;

          if (part.type === 'h1') return React.createElement('h1', { key: i, style: { fontSize: 18, fontWeight: 600, color: TEXT_PRIMARY, marginBottom: 4 } }, visText, cursor);
          if (part.type === 'meta') return React.createElement('p', { key: i, style: { fontSize: 11, color: TEXT_SECONDARY, marginBottom: 16, fontFamily: MONO } }, visText, cursor);
          if (part.type === 'h2') return React.createElement('h2', { key: i, style: { fontSize: 14, fontWeight: 600, color: TEXT_PRIMARY, marginTop: 12, marginBottom: 6, borderBottom: '1px solid rgba(15,12,8,0.06)', paddingBottom: 4 } }, visText, cursor);
          if (part.type === 'p') return React.createElement('p', { key: i, style: { fontSize: 12, color: TEXT_SECONDARY, lineHeight: 1.6, marginBottom: 8 } }, visText, cursor);
          if (part.type === 'li') return React.createElement('div', { key: i, style: { display: 'flex', gap: 8, marginBottom: 4, alignItems: 'flex-start' } },
            React.createElement('span', { style: { color: CLAY, fontSize: 8, marginTop: 4 } }, '\u25CF'),
            React.createElement('span', { style: { fontSize: 12, color: TEXT_SECONDARY, lineHeight: 1.5 } }, visText, cursor));
          if (part.type === 'code') return React.createElement('pre', { key: i, style: {
            background: '#1a1918', borderRadius: 6, padding: '10px 14px', fontSize: 10,
            fontFamily: MONO, color: '#d4d4d4', lineHeight: '16px', marginBottom: 8,
            overflow: 'hidden', whiteSpace: 'pre-wrap',
          } }, visText, cursor);
          return null;
        })));
  }

  // BUILD — IDE diff view
  function renderBuild() {
    var lines = [
      { n: 41, code: '  const config = getRegionConfig(user);', hl: false },
      { n: 42, code: '  const callbackUrl = config.authEndpoint;', hl: false },
      { n: 43, code: '', hl: false },
      { n: 44, code: '  // Redirect to OAuth provider', hl: false },
      { n: 45, code: '-  const redirectUri = AUTH_BASE_URL + "/callback";', del: true },
      { n: 45, code: '+  const redirectUri = config.baseUrl + "/callback";', add: true },
      { n: 46, code: '+  if (!isValidCallbackUrl(redirectUri)) {', add: true },
      { n: 47, code: '+    throw new InvalidRedirectError(redirectUri);', add: true },
      { n: 48, code: '+  }', add: true },
      { n: 49, code: '', hl: false },
      { n: 50, code: '  return oauth.authorize({ redirectUri });', hl: false },
    ];
    return React.createElement('div', { style: {
      background: '#1e1e1e', borderRadius: 10, border: '1px solid rgba(15,12,8,0.1)',
      height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    }},
      React.createElement('div', { style: { background: '#252526', padding: '5px 10px', display: 'flex', alignItems: 'center', gap: 6, borderBottom: '1px solid rgba(255,255,255,0.04)' } },
        React.createElement('div', { style: { display: 'flex', gap: 5, marginRight: 8 } },
          React.createElement('div', { style: { width: 9, height: 9, borderRadius: '50%', background: '#ff5f56' } }),
          React.createElement('div', { style: { width: 9, height: 9, borderRadius: '50%', background: '#ffbd2e' } }),
          React.createElement('div', { style: { width: 9, height: 9, borderRadius: '50%', background: '#27ca40' } })),
        React.createElement('div', { style: { background: '#1e1e1e', padding: '3px 10px', borderRadius: 4, fontSize: 11, color: '#ccc', fontFamily: MONO } }, 'callback.ts')),
      React.createElement('div', { style: { flex: 1, padding: '10px 0', fontFamily: MONO, fontSize: 12, lineHeight: '20px', overflow: 'hidden' } },
        lines.map(function(l, i) {
          var bg = 'transparent';
          if (l.del) bg = 'rgba(248,113,113,0.1)';
          if (l.add) bg = 'rgba(78,186,101,0.1)';
          var show = l.del ? stageT > 1000 : l.add ? stageT > 2000 : true;
          if (!show) return null;
          return React.createElement('div', { key: i, style: { display: 'flex', background: bg, padding: '0 14px' } },
            React.createElement('span', { style: { width: 32, textAlign: 'right', color: '#555', marginRight: 12, userSelect: 'none', fontSize: 11 } }, l.n),
            l.del && React.createElement('span', { style: { color: '#F87171', marginRight: 4 } }, '-'),
            l.add && React.createElement('span', { style: { color: '#4eba65', marginRight: 4 } }, '+'),
            !l.del && !l.add && React.createElement('span', { style: { width: 10 } }),
            React.createElement('span', { style: { color: l.del ? '#F87171' : l.add ? '#4eba65' : '#d4d4d4' } }, l.code));
        })));
  }

  // DEPLOY — GitHub PR page
  function renderDeploy() {
    return React.createElement(GitHubPRMock, { stageT: stageT });
  }

  // SUPPORT — Sentry error page
  function renderSupport() {
    return React.createElement(SentryErrorMock, { stageT: stageT });
  }

  // ============================
  // TERMINAL — uses real Claude Code components
  // ============================
  var SC2 = ['\u00b7','\u2726','\u2733','\u2736','\u273B','\u273D','\u273B','\u2736','\u2733','\u2726'];

  function renderTerminal() {
    // Build terminal content using the real components
    var children = [];

    // Always show Clawd logo at top
    children.push(React.createElement(Spacer, { key: 'sp0' }));
    children.push(React.createElement(ClawdLogo, { key: 'logo' }));
    children.push(React.createElement(Spacer, { key: 'sp1', lines: 2 }));

    if (currentStage === 0) { // Discover
      if (termLine(400))  { children.push(React.createElement(UserMessage, { key: 'd-u' }, 'how does the auth system work?')); children.push(React.createElement(Spacer, { key: 'd-s1' })); }
      if (termLine(960)) children.push(React.createElement(Spin3, { key: 'd-sp', verb: 'Exploring', frame: f }));
      if (termLine(1760)) children.push(React.createElement(ToolCallSuccess, { key: 'd-t1', name: 'Read', args: 'README.md' }));
      if (termLine(2240)) children.push(React.createElement(ToolCallSuccess, { key: 'd-t2', name: 'Read', args: 'CLAUDE.md' }));
      if (termLine(2720)) children.push(React.createElement(ToolCallSuccess, { key: 'd-t3', name: 'Read', args: 'src/auth/callback.ts' }));
      if (termLine(3200)) children.push(React.createElement(ToolCallSuccess, { key: 'd-t4', name: 'Read', args: 'src/auth/middleware.ts' }));
      if (termLine(3520)) { children.push(React.createElement(Spacer, { key: 'd-s2' })); children.push(React.createElement(Line, { key: 'd-a1' }, React.createElement(AssistantBullet, null), 'Auth uses OAuth2 with region-based')); children.push(React.createElement(Line, { key: 'd-a2' }, '  callback URLs. Config is in')); children.push(React.createElement(Line, { key: 'd-a3' }, '  src/config/regions.ts.')); }
      if (!termLine(1200) || (termLine(1200) && !termLine(2200))) {} // spinner handles itself
    } else if (currentStage === 1) { // Design
      if (termLine(240))  { children.push(React.createElement(UserMessage, { key: 's-u' }, 'write an RFC for fixing the callback')); children.push(React.createElement(Spacer, { key: 's-s1' })); }
      if (termLine(640) && !termLine(1280))  children.push(React.createElement(Spin3, { key: 's-sp', verb: 'Planning', frame: f }));
      if (termLine(1280)) children.push(React.createElement(ToolCallSuccess, { key: 's-t1', name: 'Read', args: 'src/auth/callback.ts' }));
      if (termLine(1760)) children.push(React.createElement(ToolCallSuccess, { key: 's-t2', name: 'Read', args: 'src/config/regions.ts' }));
      if (termLine(2240)) { children.push(React.createElement(Spacer, { key: 's-s2' })); children.push(React.createElement(Line, { key: 's-w1' }, '  ', React.createElement('span', { style: { color: COLORS.claudeOrange } }, '\u23BF'), ' Write(docs/RFC-2025-003.md)')); }
      if (termLine(2720)) { children.push(React.createElement(Spacer, { key: 's-s3' })); children.push(React.createElement(Line, { key: 's-a1' }, React.createElement(AssistantBullet, null), 'Drafted RFC with problem statement,')); children.push(React.createElement(Line, { key: 's-a2' }, '  proposed solution, and rollout plan.')); }
    } else if (currentStage === 2) { // Build
      if (termLine(240) && !termLine(800))  children.push(React.createElement(Spin3, { key: 'b-sp', verb: 'Working', frame: f }));
      if (termLine(800)) children.push(React.createElement(ToolCallSuccess, { key: 'b-t1', name: 'Read', args: 'src/auth/callback.ts' }));
      if (termLine(1440)) { children.push(React.createElement(Spacer, { key: 'b-s1' })); children.push(React.createElement(Line, { key: 'b-w1' }, '  ', React.createElement('span', { style: { color: COLORS.claudeOrange } }, '\u23BF'), ' Write(src/auth/callback.ts)')); }
      if (termLine(2000)) children.push(React.createElement(Line, { key: 'b-d1' }, '    ', React.createElement(Green, null, '+'), ' Use config.baseUrl instead of AUTH_BASE_URL'));
      if (termLine(2400)) children.push(React.createElement(Line, { key: 'b-d2' }, '    ', React.createElement(Green, null, '+'), ' Add URL validation'));
      if (termLine(2800)) { children.push(React.createElement(Spacer, { key: 'b-s2' })); children.push(React.createElement(Line, { key: 'b-w2' }, '  ', React.createElement('span', { style: { color: COLORS.claudeOrange } }, '\u23BF'), ' Write(src/utils/validation.ts)')); }
      if (termLine(3200)) { children.push(React.createElement(Spacer, { key: 'b-s3' })); children.push(React.createElement(Line, { key: 'b-ok' }, ' ', React.createElement(Green, null, '\u2714'), ' Fixed 2 files, +47 -12 lines')); }
    } else if (currentStage === 3) { // Deploy
      if (termLine(240))  { children.push(React.createElement(UserMessage, { key: 'p-u' }, '/pr-prep')); children.push(React.createElement(Spacer, { key: 'p-s1' })); }
      if (termLine(640))  children.push(React.createElement(Line, { key: 'p-1' }, ' ', React.createElement(Green, null, '\u2714'), ' PR #847 created'));
      if (termLine(1200)) children.push(React.createElement(Line, { key: 'p-2' }, React.createElement(AssistantBullet, null), 'CI checks running...'));
      if (termLine(1600)) children.push(React.createElement(Line, { key: 'p-3' }, ' ', React.createElement(Green, null, '\u2714'), ' Build passed'));
      if (termLine(2000)) children.push(React.createElement(Line, { key: 'p-4' }, ' ', React.createElement(Green, null, '\u2714'), ' Tests passed (23/23)'));
      if (termLine(2400)) children.push(React.createElement(Line, { key: 'p-5' }, ' ', React.createElement(Green, null, '\u2714'), ' claude-review: approved'));
      if (termLine(2800)) children.push(React.createElement(Line, { key: 'p-6' }, ' ', React.createElement(Green, null, '\u2714'), ' Deployed to staging'));
    } else if (currentStage === 4) { // Support
      if (termLine(240) && !termLine(800))  children.push(React.createElement(Spin3, { key: 'x-sp', verb: 'Analyzing alert', frame: f }));
      if (termLine(800)) { children.push(React.createElement(Spacer, { key: 'x-s1' })); children.push(React.createElement(Line, { key: 'x-e1' }, ' ', React.createElement(Yellow, null, '\u26A0 '), React.createElement(Yellow, null, 'TypeError at callback.ts:47 (847 events)'))); }
      if (termLine(1440)) children.push(React.createElement(ToolCallSuccess, { key: 'x-t1', name: 'Read', args: 'src/auth/callback.ts:47' }));
      if (termLine(2000)) { children.push(React.createElement(Spacer, { key: 'x-s2' })); children.push(React.createElement(Line, { key: 'x-a1' }, React.createElement(AssistantBullet, null), 'Root cause: AUTH_BASE_URL hardcoded')); children.push(React.createElement(Line, { key: 'x-a2' }, '  This was fixed in PR #847')); }
      if (termLine(3200)) { children.push(React.createElement(Spacer, { key: 'x-s3' })); children.push(React.createElement(Line, { key: 'x-ok' }, ' ', React.createElement(Green, null, '\u2714'), ' Hotfix deployed')); }
    }

    // Status bar at bottom
    children.push(React.createElement(StatusBar, { key: 'sb', leftHint: '? for shortcuts', rightStatus: 'opus \u00b7 auto' }));

    return React.createElement('div', { style: {
      flex: 1, background: '#1a1918', borderRadius: 10, overflow: 'hidden',
      border: '1px solid rgba(15,12,8,0.1)', display: 'flex', flexDirection: 'column',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    }},
      // Title bar
      React.createElement('div', { style: { background: '#252321', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 } },
        React.createElement('div', { style: { width: 10, height: 10, borderRadius: '50%', background: '#ff5f56' } }),
        React.createElement('div', { style: { width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e' } }),
        React.createElement('div', { style: { width: 10, height: 10, borderRadius: '50%', background: '#27ca40' } }),
        React.createElement('span', { style: { marginLeft: 'auto', color: '#555', fontSize: 11, fontFamily: MONO } }, 'claude')),
      // Content — uses real terminal font/sizing
      React.createElement('div', { style: {
        flex: 1, padding: '12px 16px', fontFamily: TERM.font,
        fontSize: TERM.fontSize, lineHeight: TERM.lineHeight + 'px', color: COLORS.termFg,
        whiteSpace: 'pre', overflowY: 'auto', overflowX: 'hidden', position: 'relative',
      }}, children));
  }

  // ============================
  // PROGRESS BAR (shared by all sub-stages except intro)
  // ============================
  // introCycle: when >=0, all dots are color-filled and dot[introCycle] is
  // "raised" (lifted + scaled + glow + full opacity) while the rest sit at
  // ~0.5. The intro view drives this from a looping timer so the highlight
  // walks Discover→…→Support→Discover indefinitely. Stage views pass nothing
  // (undefined → introMode off → original isActive/isPast logic).
  function renderProgressBar(introCycle) {
    var introMode = introCycle != null && introCycle >= 0;
    return React.createElement('div', { style: { display: 'flex', alignItems: 'center', marginBottom: 14 } },
      stages.map(function(stage, i) {
        var isActive = currentStage === i;
        var isPast = currentStage > i || isRecap;
        var allDone = isRecap;
        var isHi = introMode && i === introCycle;
        var filled = isActive || isPast || allDone || introMode;
        return React.createElement(React.Fragment, { key: i },
          React.createElement('div', { style: {
            display: 'flex', alignItems: 'center', gap: 6,
            opacity: isActive || isHi ? 1 : (isPast || allDone || introMode) ? 0.5 : 0.3,
            transform: isHi ? 'translateY(-4px)' : 'translateY(0)',
            transition: 'opacity 0.4s, transform 0.4s cubic-bezier(0.22,1,0.36,1)',
          }},
            React.createElement('div', { style: {
              width: 28, height: 28, borderRadius: '50%',
              background: filled ? stage.color : 'rgba(15,12,8,0.06)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transform: isHi ? 'scale(1.18)' : 'scale(1)',
              transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
              boxShadow: (isActive || isHi) ? '0 4px 14px ' + stage.color + '55' : 'none',
            }},
              isPast || allDone
                ? React.createElement('span', { style: { color: '#fff', fontSize: 11 } }, '\u2714')
                : React.createElement('i', { className: 'ai-' + stage.icon, style: { fontSize: 14, color: '#fff' } })),
            React.createElement('span', { style: {
              fontSize: 12, fontWeight: (isActive || isHi) ? 600 : 400,
              color: filled ? stage.color : TEXT_SECONDARY,
              transition: 'color 0.3s, font-weight 0.3s',
            } }, stage.label)),
          i < 4 && React.createElement('div', { style: {
            flex: 1, height: 2, margin: '0 8px',
            background: (isPast || allDone || introMode) ? stage.color : 'rgba(15,12,8,0.06)',
            transition: 'background 0.5s',
          }}));
      }));
  }

  // ============================
  // MAIN RENDER
  // ============================
  var surfaces = [renderDiscover, renderDesign, renderBuild, renderDeploy, renderSupport];

  // Hooks must be called unconditionally
  var introVis = useStagger3(active && isIntro, 4, 200, 300);
  if (_IS_PRINT) introVis = _printAll(4);
  var recapVis = useStagger3(false, 7, 100, 150); // unused but must call hook unconditionally
  // Loop timer for the intro highlight-walk. Gated on the bar's own
  // fade-in trigger so cycling starts the moment the bar appears.
  var introTm = useTimer3(active && isIntro && introVis.includes(2));
  var introCycle = Math.floor(introTm.t / 1200) % 5;

  // INTRO VIEW
  if (isIntro) {
    return React.createElement(FullCanvas, { bg: BG_LIGHT, style: {
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', fontFamily: SANS, padding: '60px 80px',
    }},
      React.createElement(Fade3, { vis: introVis.includes(0) },
        React.createElement('img', { src: 'assets/clay-spark.svg', style: { width: 56, marginBottom: 28 } })),
      React.createElement(Fade3, { vis: introVis.includes(1) },
        React.createElement('h2', { style: { color: TEXT_PRIMARY, fontSize: 44, fontWeight: 300, letterSpacing: '-0.02em', textAlign: 'center', lineHeight: 1.25, marginBottom: 36 } },
          'Claude Code augments your entire', React.createElement('br', null),
          React.createElement('span', { style: { color: CLAY } }, 'software development lifecycle'))),
      React.createElement(Fade3, { vis: introVis.includes(2) },
        React.createElement('div', { style: { width: '100%', maxWidth: 760 } }, renderProgressBar(introCycle))),
      React.createElement(Fade3, { vis: introVis.includes(3) },
        React.createElement('p', { style: { color: TEXT_SECONDARY, fontSize: 16, textAlign: 'center', marginTop: 28 } },
          'From exploring a new codebase to deploying and monitoring in production')));
  }

  // (recap removed)

  // STAGE VIEWS (1-5)
  return React.createElement(FullCanvas, { bg: BG_LIGHT, style: {
    display: 'flex', flexDirection: 'column',
    fontFamily: SANS, padding: '36px 48px 44px', overflow: 'hidden',
  }},
    // Stage progress bar
    renderProgressBar(),

    // Description bullets for current stage
    currentStage >= 0 && currentStage < 5 && React.createElement('div', { style: { display: 'flex', gap: 16, marginBottom: 14 } },
      stages[currentStage].bullets.map(function(bullet, i) {
        return React.createElement('div', { key: currentStage + '-' + i, style: {
          display: 'flex', alignItems: 'center', gap: 6,
          animation: 'fadeUp 0.3s ease forwards',
          animationDelay: i * 80 + 'ms',
          opacity: 0,
        }},
          React.createElement('span', { style: { color: stages[currentStage].color, fontSize: 7 } }, '\u25CF'),
          React.createElement('span', { style: { fontSize: 12, color: TEXT_SECONDARY } }, bullet));
      })),

    // Main content — External surface + Terminal
    React.createElement('div', { style: { flex: 1, display: 'flex', gap: 14, minHeight: 0 } },
      // External surface (crossfading)
      React.createElement('div', { style: { flex: 1, position: 'relative', minHeight: 0 } },
        surfaces.map(function(renderFn, i) {
          var isActive2 = currentStage === i;
          return React.createElement('div', { key: i, style: {
            position: 'absolute', inset: 0,
            opacity: isActive2 ? 1 : 0,
            transform: isActive2 ? 'translateX(0)' : 'translateX(-20px)',
            transition: 'all 0.5s cubic-bezier(0.22,1,0.36,1)',
            pointerEvents: isActive2 ? 'auto' : 'none',
          }}, renderFn());
        })),
      // Terminal
      React.createElement('div', { style: { width: 380, display: 'flex' } },
        renderTerminal())));
}

function Slide_CrossOrg(props) {
  var active = props.active;
  var v = useStagger3(active, 11, 100, 80);
  if (_IS_PRINT) v = _printAll(11);
  var teams = [
    { name: 'Product Development', desc: 'Fast prototyping, test generation, bug fixes' },
    { name: 'Data Science', desc: 'Dashboard apps, zero-dependency task delegation' },
    { name: 'Inference', desc: 'Codebase comprehension, cross-language translation' },
    { name: 'Security Engineering', desc: 'Infrastructure debugging, documentation & runbooks' },
    { name: 'Product Design', desc: 'Rapid interactive prototyping, compliance copy' },
    { name: 'Legal', desc: 'Workflow automation, team coordination tools' },
    { name: 'RL Engineering', desc: 'Test generation, code review, K8s operations' },
    { name: 'Growth Marketing', desc: 'Automated ad generation, prompt engineering' },
    { name: 'API', desc: 'Workflow planning, model iteration testing' },
  ];
  return React.createElement(FullCanvas, { bg: '#E3DACC', style: {
    display: 'flex', flexDirection: 'column',
    fontFamily: 'Anthropic Sans, system-ui, sans-serif', padding: '50px 70px',
  }},
    React.createElement(Fade3, { vis: v.includes(0) },
      React.createElement('p', { style: { color: TEXT_PRIMARY, fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10, opacity: 0.6 } }, 'How Anthropic uses Claude Code')),
    React.createElement(Fade3, { vis: v.includes(1) },
      React.createElement('h2', { style: { color: TEXT_PRIMARY, fontSize: 32, fontWeight: 300, marginBottom: 24, letterSpacing: '-0.02em' } }, 'Value across the organization')),
    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, flex: 1, alignContent: 'center' } },
      teams.map(function(team, i) {
        return React.createElement(Fade3, { key: i, vis: v.includes(i + 2), y: 16, style: { height: '100%' } },
          React.createElement('div', { style: {
            background: 'rgba(255,255,255,0.7)', borderRadius: 10, padding: '14px 16px',
            border: '1px solid rgba(15,12,8,0.04)',
            height: '100%', minHeight: 84, boxSizing: 'border-box',
          }},
            React.createElement('h4', { style: { color: CLAY, fontSize: 13, fontWeight: 500, marginBottom: 4 } }, team.name),
            React.createElement('p', { style: { color: TEXT_SECONDARY, fontSize: 12, lineHeight: 1.4 } }, team.desc)));
      })));
}


function Slide_WhichModel() {
  var thDark = { background: '#141413', color: '#fff', padding: '14px 16px', fontSize: 15, fontWeight: 600, textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' };
  var thLabel = { background: '#E8E4D9', padding: '12px 14px', fontSize: 13, fontWeight: 600, textAlign: 'left', verticalAlign: 'top', width: 130, border: '1px solid rgba(15,12,8,0.08)' };
  var tdLight = { background: '#E8E4D9', padding: '12px 14px', fontSize: 12, lineHeight: 1.5, verticalAlign: 'top', border: '1px solid rgba(15,12,8,0.08)' };
  var tdWhite = { background: '#fff', padding: '12px 14px', fontSize: 12, lineHeight: 1.5, verticalAlign: 'top', border: '1px solid rgba(15,12,8,0.08)' };

  function bullets(items) {
    return React.createElement('ul', { style: { margin: 0, paddingLeft: 16, listStyle: 'disc' } },
      items.map(function(it, i) { return React.createElement('li', { key: i, style: { marginBottom: 3 } }, it); }));
  }

  return React.createElement(StubSlide, {
    tag: 'Model selection', title: 'Which Model Do I Use When?'
  },
    React.createElement('table', { style: { width: '100%', borderCollapse: 'collapse', fontSize: 13 } },
      React.createElement('thead', null,
        React.createElement('tr', null,
          React.createElement('th', { style: Object.assign({}, thDark, { background: '#E8E4D9', border: '1px solid rgba(15,12,8,0.08)' }) }, ''),
          React.createElement('th', { style: thDark }, 'Opus 4.7'),
          React.createElement('th', { style: thDark }, 'Sonnet 4.6'),
          React.createElement('th', { style: thDark }, 'Haiku 4.5'))),
      React.createElement('tbody', null,
        React.createElement('tr', null,
          React.createElement('td', { style: thLabel }, 'Description'),
          React.createElement('td', { style: Object.assign({}, tdLight, { textAlign: 'center' }) }, 'The world\u2019s best model for coding, enterprise agents, and professional work.'),
          React.createElement('td', { style: Object.assign({}, tdLight, { textAlign: 'center' }) }, 'Approaches Opus levels of intelligence, enabling scalable, high-quality task completion, making it ideal for scaled use cases.'),
          React.createElement('td', { style: Object.assign({}, tdLight, { textAlign: 'center' }) }, 'Most efficient model delivering near-frontier performance at accessible cost and speed.')),
        React.createElement('tr', null,
          React.createElement('td', { style: Object.assign({}, thLabel, { background: '#fff' }) }, 'Recommended for'),
          React.createElement('td', { style: Object.assign({}, tdWhite, { textAlign: 'center' }) }, 'The hardest, most complex work \u2014 problems that need peak intelligence and sustained autonomy.'),
          React.createElement('td', { style: Object.assign({}, tdWhite, { textAlign: 'center' }) }, 'High-volume workloads where you need near-Opus intelligence at scale.'),
          React.createElement('td', { style: Object.assign({}, tdWhite, { textAlign: 'center' }) }, 'Use cases where you need to balance performance with cost and speed.')),
        React.createElement('tr', null,
          React.createElement('td', { style: thLabel }, 'Best for / when to use'),
          React.createElement('td', { style: tdLight }, bullets(['Long-horizon agent tasks', 'Deep, complex coding', 'Precision enterprise workflows (finance, legal)', 'Computer use automation', 'Cybersecurity'])),
          React.createElement('td', { style: tdLight }, bullets(['High-volume production deployments', 'Agentic workflows and tool use', 'Fast iteration and prototyping', 'Cost-sensitive workloads + strong intelligence', 'Computer use automation', 'Cybersecurity'])),
          React.createElement('td', { style: tdLight }, bullets(['Powering free tier user experiences', 'Latency-sensitive experiences', 'Executing tasks planned by more capable models', 'Efficient research']))),
        React.createElement('tr', null,
          React.createElement('td', { style: Object.assign({}, thLabel, { background: '#fff' }) }, 'Cost'),
          React.createElement('td', { style: tdWhite }, '$5.00 / $25.00 per MTok'),
          React.createElement('td', { style: tdWhite }, '$3.00 / $15.00 per MTok'),
          React.createElement('td', { style: tdWhite }, '$1.00 / $5.00 per MTok')),
        React.createElement('tr', null,
          React.createElement('td', { style: thLabel }, 'Context'),
          React.createElement('td', { style: Object.assign({}, tdLight, { textAlign: 'center' }) }, '1M'),
          React.createElement('td', { style: Object.assign({}, tdLight, { textAlign: 'center' }) }, '1M'),
          React.createElement('td', { style: Object.assign({}, tdLight, { textAlign: 'center' }) }, '200K')))));
}

Object.assign(window, {
  Slide_Section101, Slide_WhatIsCC, Slide_Install, Slide_CoreLoop,
  Slide_FeatureLadder, Slide_HowAnthropicUses, Slide_WorkflowTransform,
  Slide_Models, Slide_Demo1, Slide_Ex1,
  Slide_CrossOrg, Slide_WhichModel, Slide_SDLC,
});

} // end scoped block
