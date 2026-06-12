// ═══════════════════════════════════════════════════════════════
// DECK SLIDES — 201: TEACH CLAUDE YOUR REPO (SHARED)
// CLAUDE.md · Plan Mode · Skills · Slash commands · Hooks
//
// Reads window.DECK_PROFILE for vehicle-specific JSX fragments:
//   claudeMd.body, planMode.{prompt,steps}, skill.{filename,body}, atExample,
//   nesting.tree, exercise2.{doneWhen,steps}, plugins.skillName
// Most reads fall back to flag-service generics. Demo3 + Ex2 require
// plugins.skillName (ENH-017) — missing renders [MISSING skillName IN PROFILE].
// ═══════════════════════════════════════════════════════════════

{
const CLAY = '#D97757', OAT = '#F0EEE6', DARK = '#141413', BONE = '#FAF9F5', GRAY = '#73726C';
// Profile shorthand — deck-profile.jsx loads before this file. JSX fragments
// in the profile (<ELine>, <TLine>, etc) resolve against globals from
// deck-components.jsx which loads even earlier.
const _P = window.DECK_PROFILE || {};
const SERIF = "'Anthropic Serif', Georgia, serif";
const MONO = "'JetBrains Mono', monospace";
const H2 = { fontFamily: SERIF, fontSize: 32, fontWeight: 400, marginBottom: 24 };
const KICKER = { fontSize: 12, fontWeight: 600, color: CLAY, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 };
const SUB = { fontSize: 14, color: GRAY, marginBottom: 32, lineHeight: 1.5 };

// Small card with clay accent stripe — used on Plan Mode & Hooks slides
const SideCard = ({ title, children }) => (
  <div style={{
    padding: '14px 16px', background: '#fff', borderRadius: 8,
    border: '1px solid rgba(20,20,19,0.08)', borderLeft: `3px solid ${CLAY}`,
  }}>
    <div style={{ fontSize: 13, fontWeight: 600, color: CLAY, marginBottom: 4 }}>{title}</div>
    <div style={{ fontSize: 12, color: GRAY, lineHeight: 1.5 }}>{children}</div>
  </div>
);

// ── Section divider ───────────────────────────────────────────────
function Slide_Section201() {
  return (
    <SectionSlide
      number={2}
      title="Teach Claude Your Repo"
      subtitle="CLAUDE.md, Plan Mode, Skills — the levers that make it yours"
      bg="#E3DACC"
      lottieSrc="../_shared/assets/lottie/Object-Book.lottie"
    />
  );
}

// ── CLAUDE.md ─────────────────────────────────────────────────────
// Ported from ServiceNow/Intuit pattern. EditorMockup with a good
// example using flag-service context.
function Slide_ClaudeMd() {
  return (
    <Slide bg={BONE} label="CLAUDE.md">
      <div style={KICKER}>Teach Claude</div>
      <h2 style={H2}>CLAUDE.md — the README for the AI</h2>
      <p style={{ ...SUB, maxWidth: 600 }}>
        Keep it short. What commands to run. What never to touch. Loaded
        automatically every session — you stop re-explaining the repo.
      </p>
      <VCenter>
        <EditorMockup filename="CLAUDE.md" width={720}>
          {_P.claudeMd && _P.claudeMd.body}
        </EditorMockup>
      </VCenter>
    </Slide>
  );
}

// ── CLAUDE.md nesting ─────────────────────────────────────────────
// Design from cc-best-practices/deck/slides-a.jsx S3. Terminal file-tree
// on the left (shows WHERE the files live), four tier cards on the right
// (shows WHAT goes in each). The .local.md row is the underrated detail —
// personal overrides, gitignored, not in the simple decks.
function Slide_ClaudeMdNesting() {
  // Ind/Fn helpers moved to deck-components.jsx (window-exported) so
  // deck-profile.jsx nesting.tree fragments can use them.

  // Colours lifted from cc-best-practices — they distinguish tiers
  // without fighting the clay/oat/bone palette (all muted/desaturated).
  const tiers = [
    { l: 'Global',  c: CLAY,      items: ['Shell & editor prefs', 'Package manager default', 'Code style you always want', 'Personal aliases'] },
    { l: 'Project', c: '#5B7553', items: ['Stack & architecture', 'Test & build commands', 'Coding conventions', 'Deploy / CI steps'] },
    { l: 'Nested',  c: '#4A7B8C', items: ['Module-specific rules', 'API conventions', 'Validation patterns', 'Loaded by working dir'] },
    { l: 'Local',   c: '#8B6834', items: ['Local DB / service URLs', 'Skipped test suites', 'WIP notes & scratch', 'Never committed'] },
  ];

  return (
    <Slide bg={`linear-gradient(to right, ${BONE} 50%, ${OAT} 50%)`} label="CLAUDE.md hierarchy" padding="0">
      <div style={{ display: 'flex', height: '100%' }}>
        {/* Left: header + four tier cards (2×2). */}
        <div style={{
          flex: '0 0 50%', background: BONE,
          padding: '52px 44px',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 14,
        }}>
          <div>
            <div style={KICKER}>Teach Claude · at scale</div>
            <h2 style={{ ...H2, fontSize: 30, marginBottom: 6 }}>CLAUDE.md hierarchy</h2>
            <p style={{ ...SUB, fontSize: 12.5, marginBottom: 0 }}>
              Files <strong>stack</strong> — global, then project, then the directory
              you're working in. Most specific wins.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {tiers.map((t, i) => (
              <div key={i} style={{
                padding: '12px 14px', background: '#fff',
                border: '1px solid rgba(20,20,19,0.06)', borderRadius: 10,
                display: 'flex', flexDirection: 'column', gap: 5,
              }}>
                <div style={{
                  fontSize: 11, fontWeight: 600, color: t.c,
                  textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2,
                }}>{t.l}</div>
                {t.items.map((item, j) => (
                  <div key={j} style={{
                    fontSize: 11, color: DARK, lineHeight: 1.35,
                    display: 'flex', gap: 6, alignItems: 'baseline',
                  }}>
                    <span style={{ color: t.c, fontSize: 8 }}>●</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Right: file tree. Profile supplies a domain-specific layout (monorepo,
            polyrepo, sfdx-project…); fallback is the generic vehicle-root shape. */}
        <div style={{
          flex: 1, background: OAT, padding: '40px 36px',
          display: 'flex', alignItems: 'center',
        }}>
          <TerminalMockup title="File hierarchy" width="100%">
            {(_P.nesting && _P.nesting.tree) || (<>
              <TLine><TBlue>~/.claude/</TBlue></TLine>
              <TLine><Ind n={1}><Fn><TWhite>CLAUDE.md</TWhite></Fn><TDim>← global (all projects)</TDim></Ind></TLine>
              <TBlank />
              <TLine><TBlue>{'~/' + (_P.vehicle || 'project') + '/'}</TBlue></TLine>
              <TLine><Ind n={1}><Fn><TWhite>CLAUDE.md</TWhite></Fn><TDim>← project root (committed)</TDim></Ind></TLine>
              <TLine><Ind n={1}><Fn><TOrange>CLAUDE.local.md</TOrange></Fn><TDim>← personal (gitignored)</TDim></Ind></TLine>
              <TLine><Ind n={1}><TBlue>app/api/</TBlue></Ind></TLine>
              <TLine><Ind n={2}><Fn w={116}><TWhite>CLAUDE.md</TWhite></Fn><TDim>← nested dir context</TDim></Ind></TLine>
            </>)}
          </TerminalMockup>
        </div>
      </div>
    </Slide>
  );
}

// ── Plan Mode ─────────────────────────────────────────────────────
// Ported from Intuit 301 (Slide10_PlanMode). Genericized — vehicle-driven
// (DECK_PROFILE.planMode body supplies the example).
function Slide_PlanMode() {
  const code = { fontFamily: MONO, fontSize: 11, background: 'rgba(20,20,19,0.06)', padding: '1px 6px', borderRadius: 4 };
  return (
    <SplitBg label="Plan Mode"
      left={
        <AbsHeader kicker="Best practice" h2="Plan Mode"
          sub="Think before you act. Review the approach before any files change.">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <SideCard title="How to activate">
              Press <code style={code}>shift+tab</code> to cycle modes — twice lands on Plan.
              Or type <code style={code}>/plan</code> before any prompt. Works mid-session:
              you can plan one task and execute the next.
            </SideCard>
            <SideCard title="When to use it">
              <ul style={{ margin: 0, paddingLeft: 16, display: 'flex', flexDirection: 'column', gap: 3 }}>
                <li>Architectural changes</li>
                <li>Multi-file refactors</li>
                <li>Unfamiliar codebases</li>
                <li>Any task where mistakes are costly to undo</li>
              </ul>
            </SideCard>
            <SideCard title="The value">
              You review the approach before any files are touched. Ask follow-ups,
              challenge assumptions, refine iteratively — then execute once, with confidence.
              The plan itself becomes documentation of <em>why</em>.
            </SideCard>
          </div>
        </AbsHeader>
      }
      right={
        <TerminalMockup title={'claude \u2014 ' + (_P.vehicle || 'project')} width="100%">
          <TPrompt>{_P.planMode && _P.planMode.prompt}</TPrompt>
          <TBlank />
          <TLine><TOrange><TBold>Plan Mode — reviewing before changes</TBold></TOrange></TLine>
          <TBlank />
          <TLine><TBlue>Here's my plan:</TBlue></TLine>
          <TBlank />
          {_P.planMode && _P.planMode.steps}
          <TLine><TOrange>?</TOrange> Proceed with this plan? <TGreen>▊</TGreen></TLine>
        </TerminalMockup>
      }
    />
  );
}

// ── Demo 2 ────────────────────────────────────────────────────────
function Slide_Demo2() {
  const d = _P.demo2 || {};
  return <DemoSlide n={d.n ?? 2} title={d.title || "Plan Mode"} beats={d.beats || [
    { key: 'shift+tab ×2', line: 'enter plan mode — read only' },
    { key: null,           line: '"Refactor <your feature> to support <new capability>"' },
    { key: null,           line: 'Claude reads 2 files, proposes 4 steps, no edits yet' },
  ]} />;
}

// ── Spec-driven + TDD ─────────────────────────────────────────────
// Two matched blocks: each gets a label + "when" tag, a step strip, and a
// CC-specific why-line. The strips share the same visual grammar (same
// border/radius/padding/type) — only step count and tints differ. Previous
// version treated TDD as a footnote; Kevin: "keep the visual style similar."
function Slide_SpecTDD() {
  const specSteps = [
    { phase: 'Specify',   desc: 'Write the spec —\ncontracts, edge cases,\nacceptance criteria',  bg: '#fff' },
    { phase: 'Validate',  desc: 'Claude reviews for\ngaps, ambiguity,\ninconsistency',            bg: 'rgba(217,119,87,0.08)' },
    { phase: 'Implement', desc: 'Code generated from\nspec — one source of\ntruth for decisions', bg: 'rgba(217,119,87,0.16)' },
    { phase: 'Verify',    desc: 'Checked against the\nspec at every step.\nDrift caught early',   bg: CLAY, fg: BONE },
  ];
  const tddSteps = [
    { phase: 'Red',      desc: 'You write the\nfailing test',            bg: 'rgba(196,68,68,0.10)' },
    { phase: 'Green',    desc: 'Claude writes the\nimplementation',      bg: 'rgba(143,186,106,0.15)' },
    { phase: 'Refactor', desc: 'Clean up together —\ntests stay green',  bg: '#fff' },
  ];

  // One block = clay label left, gray "when" right, strip below, italic why below that.
  // Defined inline so both workflows are structurally forced to match.
  const Block = ({ label, when, steps, why }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
                      textTransform: 'uppercase', color: CLAY }}>{label}</div>
        <div style={{ fontSize: 10.5, color: GRAY }}>
          <span style={{ opacity: 0.55 }}>reach for it when: </span>{when}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'stretch', borderRadius: 10, overflow: 'hidden',
                    border: '1px solid rgba(20,20,19,0.06)' }}>
        {steps.map((s, i) => (
          <div key={i} style={{
            flex: 1, padding: '14px 16px', background: s.bg, color: s.fg || 'inherit',
            // white divider: visible against clay/tints, vanishes against white
            // cells — where the bg-shift itself reads as the divider.
            borderRight: i < steps.length - 1 ? '1px solid rgba(255,255,255,0.6)' : 'none',
          }}>
            <div style={{ fontSize: 12.5, fontWeight: 700, marginBottom: 4 }}>{s.phase}</div>
            <div style={{ fontSize: 10.5, lineHeight: 1.45, whiteSpace: 'pre-line',
                          opacity: s.fg ? 0.85 : 0.62 }}>{s.desc}</div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 11, color: GRAY, lineHeight: 1.5, fontStyle: 'italic' }}>{why}</div>
    </div>
  );

  return (
    <Slide bg={BONE} label="Spec-driven & TDD">
      <div style={KICKER}>Workflows</div>
      <h2 style={H2}>Define success first</h2>
      <p style={{ ...SUB, maxWidth: 640 }}>
        Both give Claude a <strong>verifiable target</strong> instead of vague intent.
        Spec the feature, TDD the functions — they compose.
      </p>
      <VCenter stretch>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
          <Block
            label="Spec-driven"
            when="new features · multi-file scope · stakeholders sign off on prose"
            steps={specSteps}
            why={<>The spec doc <em>is</em> your prompt. Point Claude at the markdown, ask
              for a plan, implement — drift from the written word shows up in review.</>}
          />
          <Block
            label="Test-driven"
            when="one function · behavior easier to assert than describe · refactors"
            steps={tddSteps}
            why={<>The failing test <em>is</em> the spec — executable and unambiguous.
              You define <em>done</em>, Claude gets there. No debate about what &ldquo;works&rdquo; means.</>}
          />
        </div>
      </VCenter>
    </Slide>
  );
}

// ── Skills ────────────────────────────────────────────────────────
// Split-bg anatomy layout ported from Intuit 301. Left = what/when, right = example.
// Example skill composes MCP + policy (feedback_skill_domain_not_bash — not an npm-test wrapper).
function Slide_Skills() {
  const pill = {
    display: 'inline-block', fontSize: 10.5, padding: '3px 10px', borderRadius: 999,
    background: 'rgba(217,119,87,0.08)', border: '1px solid rgba(217,119,87,0.18)', color: CLAY,
  };
  const card = {
    padding: '14px 16px', background: '#fff', borderRadius: 10,
    border: '1px solid rgba(20,20,19,0.06)',
  };
  return (
    <Slide bg={`linear-gradient(to right, ${BONE} 50%, ${OAT} 50%)`} label="Skills" padding="0">
      <div style={{ display: 'flex', height: '100%' }}>
        {/* Left: what + when. Column bg matches outer gradient's left half —
            redundant when gradient renders, covers the canvas if components.jsx
            is stale-cached (backgroundColor rejects gradients → transparent). */}
        <div style={{
          flex: '0 0 50%', background: BONE,
          padding: '52px 44px',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 12,
        }}>
          <div>
            <div style={KICKER}>Automate</div>
            <h2 style={{ ...H2, fontSize: 30, marginBottom: 6 }}>Anatomy of a Skill</h2>
            <p style={{ ...SUB, fontSize: 12.5, marginBottom: 0 }}>Domain expertise, codified — not a prompt you keep retyping.</p>
          </div>
          <div style={card}>
            <div style={{ fontSize: 13, fontWeight: 600, color: CLAY, marginBottom: 6 }}>What is a Skill?</div>
            <div style={{ fontSize: 11.5, color: GRAY, lineHeight: 1.5, marginBottom: 8 }}>
              A structured instruction set that teaches Claude a workflow. Carries context,
              decision logic, and multi-step processes.
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <span style={pill}>Reusable</span>
              <span style={pill}>Shareable</span>
              <span style={pill}>Composable</span>
            </div>
          </div>
          <div style={card}>
            <div style={{ fontSize: 13, fontWeight: 600, color: CLAY, marginBottom: 6 }}>When to create one?</div>
            <ul style={{ margin: 0, paddingLeft: 16, fontSize: 11.5, color: GRAY, lineHeight: 1.6 }}>
              <li>You've typed the same prompt three times</li>
              <li>Tribal knowledge lives in one person's head</li>
              <li>Consistency matters more than flexibility</li>
              <li>A workflow has compliance steps that can't be skipped</li>
            </ul>
          </div>
          <div style={{ fontSize: 11.5, color: GRAY, fontStyle: 'italic', paddingLeft: 4 }}>
            A tool is a screwdriver. A Skill is an electrician's training.
          </div>
        </div>
        {/* Right: SKILL.md example */}
        <div style={{
          flex: 1, background: OAT, padding: '40px 36px',
          display: 'flex', alignItems: 'center',
        }}>
          <EditorMockup filename={(_P.skill && _P.skill.filename) || '.claude/skills/example/SKILL.md'} width="100%">
            {_P.skill && _P.skill.body}
          </EditorMockup>
        </div>
      </div>
    </Slide>
  );
}

// ── Slash Commands ────────────────────────────────────────────────
// Autocomplete-dropdown layout ported from ServiceNow 201. All 9 commands kept.
// Dropdown is abs-positioned sibling of TerminalMockup — the terminal's own
// overflow:hidden would clip it otherwise.
function Slide_SlashCmds() {
  const cmds = [
    { cmd: '/add-dir', desc: 'Add another directory to context. Multi-repo work.' },
    { cmd: '/resume',  desc: 'Pick up a previous session. Full context restored.' },
    { cmd: '/memory',  desc: 'Manage auto-saved memory — review, edit, or clear what Claude remembers.' },
    { cmd: '/context', desc: 'Show what Claude currently has in context. Diagnose before /compact.' },
    { cmd: '/compact', desc: 'Summarize the conversation. Frees up context window.' },
    { cmd: '/effort',  desc: 'Dial reasoning up/down. ○ fast · ◐ default · ● deep.' },
    { cmd: '/loop',    desc: 'Run a prompt on an interval. /loop 5m check the deploy — babysit CI hands-free.' },
    { cmd: '/model',   desc: 'Switch between Opus, Sonnet, Haiku mid-session.' },
    { cmd: '/simplify',desc: 'Review your diff for dead code & over-engineering before commit.' },
    { cmd: '/batch',   desc: 'One prompt → N worktree-isolated agents → N PRs. Codebase-wide changes.' },
    { cmd: '/help',    desc: 'List everything. Including your custom skills.' },
  ];
  return (
    <Slide bg={BONE} label="Slash commands">
      <div style={KICKER}>Built-ins</div>
      <h2 style={H2}>Slash commands worth knowing</h2>
      <p style={SUB}>These ship with Claude Code. Your skills appear alongside them.</p>
      <VCenter>
        {/* Explicit height so VCenter accounts for the abs-positioned dropdown,
            not just the ~70px terminal. top:66 + rows×28 + padding + box-shadow
            spill (0 12px 32px bleeds ~20px past last row). Under-measured
            = hint text below gets stepped on by the shadow. */}
        <div style={{ position: 'relative', width: 680, height: 66 + cmds.length * 28 + 38 }}>
          <TerminalMockup title="claude" width={680}>
            <TLine><TGray>{'>'}</TGray> /<TGreen>▊</TGreen></TLine>
          </TerminalMockup>
          {/* Autocomplete dropdown — positioned below the prompt line */}
          <div style={{
            position: 'absolute', top: 66, left: 16, right: 16,
            background: '#262624',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 8, padding: '4px 0',
            boxShadow: '0 12px 32px rgba(0,0,0,0.35)',
            fontFamily: MONO, fontSize: 12, overflow: 'hidden',
          }}>
            {cmds.map((c, i) => (
              <div key={i} style={{
                padding: '7px 14px',
                background: i === 0 ? 'rgba(217,119,87,0.18)' : 'transparent',
                display: 'flex', alignItems: 'baseline', gap: 16,
              }}>
                <span style={{ color: '#E8E6DC', minWidth: 90, flexShrink: 0 }}>{c.cmd}</span>
                <span style={{
                  color: '#73726C', fontSize: 11, flex: 1,
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>{c.desc}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{
          marginTop: 14, fontSize: 12, color: GRAY, textAlign: 'center',
        }}>
          Your skills appear here too — SKILL.md files in <code style={{
            fontFamily: MONO, background: OAT, padding: '2px 6px',
            borderRadius: 4, fontSize: 11,
          }}>.claude/skills/</code>
        </div>
      </VCenter>
    </Slide>
  );
}

// ── Input Shortcuts ───────────────────────────────────────────────
// ! bash, @ file, ⌘V screenshot, ^B background, esc-esc rewind, voice PTT.
// Not slash commands — these go in the prompt box. Six primitives, one slide.
function Slide_InputShortcuts() {
  const rows = [
    {
      glyph: '!',
      name: 'Bash mode',
      desc: 'Run a shell command directly. Output lands in the conversation — no copy-paste.',
      ex: '!npm test    !git log --oneline -5',
    },
    {
      glyph: '@',
      name: 'Reference a file',
      desc: 'Pull a specific file into the prompt. Faster than waiting for Claude to search for it.',
      ex: _P.atExample || 'why is @lib/foo.js doing that?',
    },
    {
      glyph: '⌘V',
      name: 'Paste a screenshot',
      desc: 'Drag or paste an image. Claude sees it. Good for error dialogs, mockups, diagrams.',
      ex: '[screenshot]  make the header match this',
    },
    {
      glyph: '^B',
      name: 'Background a task',
      desc: 'Long-running command? ctrl+b sends it to the background. Keep working, get notified when done.',
      ex: 'npm run build  [ctrl+b]  → continues in background',
    },
    {
      glyph: 'esc²',
      name: 'Rewind the conversation',
      desc: 'esc esc jumps back to an earlier turn. Undo a direction that went sideways without /clear.',
      ex: '[esc][esc] → pick a prior message to rewind to',
    },
    {
      glyph: '🎙',
      name: 'Push-to-talk voice',
      desc: 'Hold the voice key, speak, release. Dictate a long prompt faster than you can type it. 20 languages.',
      ex: 'hold [voice key] → "refactor this to async" → release',
    },
  ];
  return (
    <Slide bg={BONE} label="Input shortcuts">
      <div style={KICKER}>Input</div>
      <h2 style={H2}>Six shortcuts worth muscle memory</h2>
      <p style={SUB}>Not slash commands — these go in the prompt box itself.</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 12 }}>
        {rows.map((r, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '44px 1fr', gap: 14, alignItems: 'center',
            padding: '10px 16px', background: '#fff',
            border: '1px solid rgba(20,20,19,0.06)', borderRadius: 10,
          }}>
            <div style={{
              fontFamily: MONO, fontSize: r.glyph.length > 2 ? 17 : 24,
              fontWeight: 600, color: CLAY, textAlign: 'center', lineHeight: 1,
            }}>{r.glyph}</div>
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 600, marginBottom: 2 }}>{r.name}</div>
              <div style={{ fontSize: 12, color: GRAY, lineHeight: 1.4, marginBottom: 6 }}>{r.desc}</div>
              <code style={{
                fontFamily: MONO, fontSize: 11, color: 'rgba(20,20,19,0.55)',
                background: 'rgba(20,20,19,0.04)', padding: '3px 8px', borderRadius: 4,
                display: 'inline-block',
              }}>{r.ex}</code>
            </div>
          </div>
        ))}
      </div>
    </Slide>
  );
}

// ── Demo 3 ────────────────────────────────────────────────────────
// Reads plugins.skillName (ENH-017). No plausible-looking fallback —
// missing profile surfaces a visible placeholder so customization drift
// is obvious at deck-time, not just in the demo runbook.
function Slide_Demo3() {
  const d = _P.demo3 || {};
  const pl = _P.plugins || {};
  const sn = pl.skillName || '[MISSING skillName IN PROFILE]';
  return <DemoSlide n={d.n ?? 3} title={d.title || ('/' + sn + ' skill')} beats={d.beats || [
    { key: '/' + sn, line: 'your slash command, not built-in' },
    { key: null,     line: 'runs tests → applies skill logic → shows diff' },
    { key: 'cat',    line: "reveal SKILL.md — it's 20 lines" },
  ]} />;
}

// ── Exercise 2 ────────────────────────────────────────────────────
function Slide_Ex2() {
  const ex = _P.exercise2 || {};
  const pl = _P.plugins || {};
  const sn = pl.skillName || '[MISSING skillName IN PROFILE]';
  const mono = { fontFamily: MONO, fontSize: 13 };
  return (
    <ExerciseSlide
      n={ex.n ?? 2}
      time="12 min"
      title={ex.title || "Teach it your repo"}
      doneWhen={ex.doneWhen || ('/' + sn + ' runs and shows you a diff')}
    >
      {ex.steps || (
        <ol style={{ paddingLeft: 20, margin: 0 }}>
          <li style={{ marginBottom: 10 }}>Open <code style={mono}>CLAUDE.md</code> — fill in the three TODO comments</li>
          <li style={{ marginBottom: 10 }}>Create <code style={mono}>{`.claude/skills/${sn}/SKILL.md`}</code> (directory, not a flat file)</li>
          <li style={{ marginBottom: 10 }}>Write the skill body: run tests → apply skill logic → show diff</li>
          <li>Try it: <code style={mono}>{'/' + sn + ' <arg>'}</code></li>
        </ol>
      )}
    </ExerciseSlide>
  );
}

// ── Hooks ─────────────────────────────────────────────────────────
// Split-bg: categorized event list left, HTTP hook example right.
// Issue #3: expanded from just preToolUse/postToolUse to the full modern
// event set + HTTP transport (cleaner enterprise pattern than shell).
function Slide_Hooks() {
  const mono = { fontFamily: MONO, fontSize: 10.5 };
  const Cat = ({ label, events }) => (
    <div style={{
      padding: '10px 14px', background: '#fff', borderRadius: 8,
      border: '1px solid rgba(20,20,19,0.08)', borderLeft: `3px solid ${CLAY}`,
    }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: CLAY, marginBottom: 6 }}>{label}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {events.map((e, i) => (
          <code key={i} style={{
            ...mono, padding: '2px 7px', borderRadius: 4,
            background: 'rgba(20,20,19,0.04)', color: DARK,
          }}>{e}</code>
        ))}
      </div>
    </div>
  );
  return (
    <SplitBg label="Hooks"
      left={
        <AbsHeader kicker="Guardrails" h2="Hooks — fire on any event"
          sub={<>Shell out <em>or POST JSON</em> when Claude acts. Pre-hooks block; post-hooks log, notify, sync. Payload includes <code style={mono}>agent_id</code> so you can tell main session from subagents.</>}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Cat label="Tool lifecycle" events={['preToolUse', 'postToolUse', 'StopFailure']} />
            <Cat label="Session lifecycle" events={['InstructionsLoaded', 'PostCompact', 'TaskCreated', 'Elicitation']} />
            <Cat label="Environment" events={['CwdChanged', 'FileChanged', 'WorktreeCreate', 'WorktreeRemove']} />
            <div style={{ fontSize: 11, color: GRAY, paddingLeft: 4, lineHeight: 1.5 }}>
              <strong style={{ color: DARK }}>HTTP hooks</strong> — <code style={mono}>type: "http"</code> posts JSON
              and reads a JSON response. No shell scripts on the runner.
            </div>
          </div>
        </AbsHeader>
      }
      right={
        <EditorMockup filename=".claude/settings.json" width="100%">
          <ELine num={1}><Punc>{'{'}</Punc></ELine>
          <ELine num={2}  indent={1}><Str>"hooks"</Str><Punc>:</Punc> <Punc>{'{'}</Punc></ELine>
          <ELine num={3}  indent={2}><Str>"preToolUse"</Str><Punc>:</Punc> <Punc>[{'{'}</Punc></ELine>
          <ELine num={4}  indent={3}><Str>"matcher"</Str><Punc>:</Punc> <Str>"Edit"</Str><Punc>,</Punc></ELine>
          <ELine num={5}  indent={3}><Str>"hooks"</Str><Punc>:</Punc> <Punc>[{'{'}</Punc></ELine>
          <ELine num={6}  indent={4}><Str>"type"</Str><Punc>:</Punc> <Str>"http"</Str><Punc>,</Punc></ELine>
          <ELine num={7}  indent={4}><Str>"url"</Str><Punc>:</Punc> <Str>"https://gate.internal/check"</Str></ELine>
          <ELine num={8}  indent={3}><Punc>{'}'}]</Punc></ELine>
          <ELine num={9}  indent={2}><Punc>{'}'}],</Punc></ELine>
          <ELine num={10} indent={2}><Str>"PostCompact"</Str><Punc>:</Punc> <Punc>[{'{'}</Punc></ELine>
          <ELine num={11} indent={3}><Str>"hooks"</Str><Punc>:</Punc> <Punc>[{'{'}</Punc></ELine>
          <ELine num={12} indent={4}><Str>"type"</Str><Punc>:</Punc> <Str>"command"</Str><Punc>,</Punc></ELine>
          <ELine num={13} indent={4}><Str>"command"</Str><Punc>:</Punc> <Str>"./hooks/reinject-state.sh"</Str></ELine>
          <ELine num={14} indent={3}><Punc>{'}'}]</Punc></ELine>
          <ELine num={15} indent={2}><Punc>{'}'}]</Punc></ELine>
          <ELine num={16} indent={1}><Punc>{'}'}</Punc></ELine>
          <ELine num={17}><Punc>{'}'}</Punc></ELine>
        </EditorMockup>
      }
    />
  );
}

// ── Hooks — event catalog + HTTP ──────────────────────────────────
// Slide_Hooks teaches the mechanism (pre/post blocking). This is the
// breadth slide: the full event list + HTTP transport for enterprise
// integrations that don't want shell scripts.
function Slide_HooksCatalog() {
  const groups = [
    { h: 'Tool', ev: [
      ['preToolUse / postToolUse', 'Before/after any tool. Pre can block.'],
      ['Elicitation / ElicitationResult', 'Intercept MCP structured-input dialogs.'],
    ]},
    { h: 'Lifecycle', ev: [
      ['InstructionsLoaded', 'CLAUDE.md just loaded — inject dynamic context.'],
      ['PostCompact', 'Conversation just compacted — re-inject critical state.'],
      ['StopFailure', 'Turn ended on API error — alert, retry, page.'],
      ['TaskCreated', 'Task added — mirror to Jira/Linear.'],
    ]},
    { h: 'Reactive', ev: [
      ['CwdChanged / FileChanged', 'direnv-style env reload, auto-regenerate.'],
      ['WorktreeCreate / WorktreeRemove', 'Custom VCS setup per agent worktree.'],
    ]},
  ];
  return (
    <SplitBg label="Hooks — catalog"
      left={
        <AbsHeader kicker="Guardrails · depth" h2="Beyond pre/post"
          sub={<>Hooks fire on lifecycle and reactive events too — not just tool calls. They can POST JSON to a URL instead of shelling out. The <code style={{fontFamily: MONO, fontSize: 11}}>if</code> filter scopes which events fire — permission-rule syntax, no shell-script boilerplate.</>}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 11 }}>
            {groups.map((g, i) => (
              <div key={i}>
                <div style={{
                  fontSize: 10, fontWeight: 600, color: CLAY,
                  textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 5,
                }}>{g.h}</div>
                {g.ev.map(([k, v], j) => (
                  <div key={j} style={{ display: 'flex', gap: 8, marginBottom: 3, alignItems: 'baseline' }}>
                    <code style={{ fontFamily: MONO, fontSize: 10, color: DARK, minWidth: 168 }}>{k}</code>
                    <span style={{ color: GRAY, fontSize: 10.5, lineHeight: 1.4 }}>{v}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </AbsHeader>
      }
      right={
        <EditorMockup filename=".claude/settings.json" width="100%">
          <ELine num={1}><Punc>{'{'}</Punc></ELine>
          <ELine num={2}  indent={1}><Str>"hooks"</Str><Punc>:</Punc> <Punc>{'{'}</Punc></ELine>
          <ELine num={3}  indent={2}><Str>"StopFailure"</Str><Punc>:</Punc> <Punc>[{'{'}</Punc></ELine>
          <ELine num={4}  indent={3}><Str>"if"</Str><Punc>:</Punc> <Str>"Bash(npm:*)"</Str><Punc>,</Punc></ELine>
          <ELine num={5}  indent={3}><Str>"hooks"</Str><Punc>:</Punc> <Punc>[{'{'}</Punc></ELine>
          <ELine num={6}  indent={4}><Str>"type"</Str><Punc>:</Punc> <Str>"http"</Str><Punc>,</Punc></ELine>
          <ELine num={7}  indent={4}><Str>"url"</Str><Punc>:</Punc> <Str>"https://ops.internal/cc-alert"</Str></ELine>
          <ELine num={8}  indent={3}><Punc>{'}'}]</Punc></ELine>
          <ELine num={9}  indent={2}><Punc>{'}'}]</Punc></ELine>
          <ELine num={10} indent={1}><Punc>{'}'}</Punc></ELine>
          <ELine num={11}><Punc>{'}'}</Punc></ELine>
        </EditorMockup>
      }
    />
  );
}

// ── Demo 4 ────────────────────────────────────────────────────────
function Slide_Demo4() {
  const d = _P.demo4 || {};
  return <DemoSlide n={d.n ?? 4} title="Hooks block unsafe edits" beats={[
    { key: null, line: 'pre-edit hook in settings.json blocks prod flag edits' },
    { key: null, line: 'ask Claude to edit a prod flag directly' },
    { key: null, line: 'hook fires → Claude routes through safe API instead' },
  ]} />;
}

// ── Typed terminal scene engine ───────────────────────────────────
// Drives the simulated-demo slides (HooksSimDemo, MCPReconcileSimDemo).
// A scene is an array of lines; a line is [prefixKey, [[text, colorKey, bold?], ...]].
// Arrow-key (via useSubSteps) reveals one scene at a time; each scene
// types out at ~8ms/char. Pending scenes render as blank lines so the
// terminal box doesn't reflow. Print mode snaps to final.
const _SIM_ISPRINT = document.documentElement.classList.contains('print-pdf');
const _SIM_C = {
  red: 'rgb(225,108,108)', green: 'rgb(78,186,101)', blue: 'rgb(177,185,249)',
  gray: 'rgb(153,153,153)', dim: 'rgb(136,136,136)', white: '#fff',
  cyan: 'rgb(125,196,211)', bold: '#d1cfc5', def: '#d1cfc5',
};
function _simSceneLen(sc) {
  return sc.reduce((n, [, segs]) => n + segs.reduce((m, s) => m + s[0].length, 0), 0);
}
function _SimPrefix({ k }) {
  if (k === 'prompt') return <span style={{ color: 'rgb(80,80,80)' }}>{'❯ '}</span>;
  if (k === 'assist') return <span style={{ color: '#fff' }}>{'⏺ '}</span>;
  if (k === 'tool-r') return <span style={{ color: _SIM_C.red }}>{'⏺ '}</span>;
  if (k === 'tool-g') return <span style={{ color: _SIM_C.green }}>{'⏺ '}</span>;
  if (k === 'result') return <span>{'  ⎿  '}</span>;
  if (k === 'cont')   return <span>{'     '}</span>;
  return null;
}
function _SimSegs({ segs, n }) {
  let used = 0;
  return segs.map(([t, ck, bold], i) => {
    const take = Math.max(0, Math.min(t.length, n - used));
    used += t.length;
    if (take === 0) return null;
    return <span key={i} style={{ color: _SIM_C[ck], fontWeight: bold ? 600 : undefined }}>{t.slice(0, take)}</span>;
  });
}
function TypedTerminalScenes({ scenes, registerSubNav, footer }) {
  const sub = useSubSteps(scenes.length, registerSubNav);
  const step = _SIM_ISPRINT ? scenes.length : sub.step;

  const [chars, setChars] = React.useState(0);
  React.useEffect(() => {
    setChars(0);
    if (step === 0 || step > scenes.length) return;
    const total = _simSceneLen(scenes[step - 1]);
    const id = setInterval(() => setChars(c => {
      if (c >= total) { clearInterval(id); return c; }
      return c + 1;
    }), 8);
    return () => clearInterval(id);
  }, [step]);

  const renderScene = (sc, budget, live) => {
    let used = 0;
    return sc.map(([pfx, segs], i) => {
      const lineLen = segs.reduce((m, s) => m + s[0].length, 0);
      const lineN = Math.max(0, Math.min(lineLen, budget - used));
      used += lineLen;
      if (lineN === 0 && i > 0) return <TLine key={i} />;
      const caret = live && lineN > 0 && lineN < lineLen;
      return (
        <TLine key={i}>
          <_SimPrefix k={pfx} /><_SimSegs segs={segs} n={lineN} />
          {caret && <span style={{ background: '#d1cfc5', color: '#1a1918' }}>{' '}</span>}
        </TLine>
      );
    });
  };

  const blocks = [];
  for (let i = 0; i < scenes.length; i++) {
    const done = i < step - 1 || _SIM_ISPRINT;
    const live = i === step - 1 && !_SIM_ISPRINT;
    const pending = i > step - 1;
    const budget = done ? Infinity : live ? chars : 0;
    blocks.push(
      <React.Fragment key={i}>
        {pending
          ? scenes[i].map((_, j) => <TLine key={j} />)
          : renderScene(scenes[i], budget, live)}
        <TBlank />
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {blocks}
      <TInputBox placeholder={step === 0 ? '→ to play' : ''} />
      {footer ? footer(step) : null}
    </React.Fragment>
  );
}

// ── Hooks — simulated demo ────────────────────────────────────────
// Stand-in for Demo 4 when the presenting environment can't run hooks
// (e.g. Accenture-managed shells). Arrow-key steps through 6 scenes.
function Slide_HooksSimDemo(props) {
  const veh = _P.vehicle || 'flag-service';
  const pl  = _P.plugins || {};
  const guardPath = pl.hookGuardPath  || 'config/prod/flags.yaml';
  const guardKey  = pl.hookGuardKey   || 'checkout_v2';
  const cli       = pl.hookCli        || 'flagctl';
  const cliCmd    = pl.hookCliCmd     || (cli + ' set ' + guardKey + ' 100');
  const askPrompt = pl.hookGuardPrompt|| ('set ' + guardKey + ' to 100% in ' + guardPath);
  const doneSum   = pl.hookDoneSummary|| (guardKey + ' is at 100% in prod via ' + cli + '.');
  const guardDir  = guardPath.replace(/\/[^/]+$/, '/**');
  const SCENES = [
    [ ['prompt', [[askPrompt, 'white']]] ],
    [ ['assist', [["I'll update the rollout percentage in the prod config.", 'def']]] ],
    [ ['tool-r', [['Edit', 'bold', true], [' (' + guardPath + ')', 'gray']]],
      ['result', [['✗ Blocked by preToolUse hook', 'red']]],
      ['cont',   [['guard-prod.sh: edits to ' + guardDir + ' are blocked.', 'dim']]],
      ['cont',   [['Use `' + cli + ' set <flag> <pct>` instead.', 'dim']]] ],
    [ ['assist', [['The prod config is guarded by a hook. Using ', 'def'], [cli, 'blue'], [' instead.', 'def']]] ],
    [ ['tool-g', [['Bash', 'bold', true], [' (' + cliCmd + ')', 'gray']]],
      ['result', [['✓', 'green'], [' ' + guardKey + ' → 100% ', 'def'], ['(prod, audited)', 'gray']]] ],
    [ ['assist', [['Done — ', 'def'], [doneSum, 'def']]] ],
  ];
  return (
    <SplitBg label="Hooks — simulated"
      left={
        <AbsHeader kicker="Guardrails · simulated demo" h2="A hook firing"
          sub={<>What you{"'"}d see in the terminal when a <code style={{fontFamily: MONO, fontSize: 11}}>preToolUse</code> hook blocks an edit. Claude reads the block reason and routes to the safe path on its own.</>}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <SideCard title="1 · The hook">
              <code style={{fontFamily: MONO, fontSize: 10.5}}>preToolUse</code> matcher
              on <code style={{fontFamily: MONO, fontSize: 10.5}}>Edit</code> — exits
              non-zero if the path is under <code style={{fontFamily: MONO, fontSize: 10.5}}>config/prod/</code>.
            </SideCard>
            <SideCard title="2 · The ask">
              User asks Claude to flip a prod flag directly in the YAML.
            </SideCard>
            <SideCard title="3 · The reroute">
              Hook blocks the Edit. Claude reads stderr, finds the safe
              CLI, and runs it instead — no human nudge.
            </SideCard>
          </div>
        </AbsHeader>
      }
      right={
        <TerminalMockup title={'claude — ' + veh} width="100%">
          <TypedTerminalScenes scenes={SCENES} registerSubNav={props.registerSubNav}
            footer={(step) => <TStatusBar left="? for shortcuts"
              right={step >= 3 ? 'hook: guard-prod.sh · exit 2' : ''} />} />
        </TerminalMockup>
      }
    />
  );
}

// ── MCP — reconcile the truth (live demo) ─────────────────────────
// flag-service ships 5 mock MCP servers (PD/Notion/Slack/Jira/GitHub)
// seeded with the % 101 bucketing-bug breadcrumb trail. Same bug as
// Demo 1, found from a page instead of a failing test.
function Slide_DemoMCPReconcile() {
  const pl  = _P.plugins || {};
  const veh = _P.vehicle || 'flag-service';
  const mcpServer = pl.mcpServer || 'flag-store';
  const incident  = pl.pdIncident || 'PD-4217';
  const prompt    = pl.mcpReconcilePrompt
    || (incident + ' fired on ' + veh + '. Triage it — pull from PD, Notion, Slack, Jira, GitHub. Root cause?');
  const trail     = pl.mcpReconcileTrail
    || 'PD: what (~1% miss at 100%) → Notion: runbook → Slack: hunch (mod-101) → Jira: why (FLG-302) → GitHub: where (PR #112, % 101)';
  const dmcp = _P.demoMCPReconcile || _P.demo6 || {};
  return <DemoSlide n={dmcp.n ?? 6} title="Reconcile the truth — paged across 5 systems"
    hint="./reset-demo.sh first · /mcp → 6 green"
    beats={[
      { key: '/mcp',    line: mcpServer + ' · pagerduty · notion · slack · jira · github — all connected' },
      { key: null,      line: '"' + prompt + '"' },
      { key: null,      line: trail },
      { key: null,      line: 'five sources reconciled into one root cause — same bug as Demo 1, found from a page' },
    ]} />;
}

// ── Auto-Memory ───────────────────────────────────────────────────
// Issue #1. Auto-memory ships on by default — customers will notice
// Claude "remembering" across sessions and ask what's being saved.
// Left: what/where/manage, right: live /memory panel mockup.
function Slide_AutoMemory() {
  const mono = { fontFamily: MONO, fontSize: 11 };
  const entries = [
    { type: 'user',      text: 'Prefers rebase over merge',           age: '2d' },
    { type: 'feedback',  text: '"Don\'t run migrations without asking"', age: '2d' },
    { type: 'project',   text: 'flag-service uses Vitest, not Jest',   age: '5h' },
    { type: 'reference', text: 'API spec → docs/api.md',                age: '5h' },
  ];
  const typeColor = { user: '#7bb8d9', feedback: CLAY, project: '#8fba6a', reference: GRAY };
  return (
    <SplitBg label="Auto-Memory"
      left={
        <AbsHeader kicker="Continuity" h2="Auto-Memory"
          sub="Claude captures context passively as you work — corrections, preferences, project facts. Recalled next session without being asked.">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <SideCard title="Not CLAUDE.md">
              CLAUDE.md is instructions <em>you</em> write and commit — shared with the
              team. Auto-memory is what <em>Claude</em> writes — machine-local, never
              committed. Two different stores.
            </SideCard>
            <SideCard title="Where it lives">
              <code style={mono}>.claude/memory/</code> per project — plain markdown,
              git-ignorable. Override with <code style={mono}>autoMemoryDirectory</code>.
            </SideCard>
            <SideCard title="Manage it">
              <code style={mono}>/memory</code> opens the panel: review, edit, or clear
              entries. Nothing leaves your machine.
            </SideCard>
          </div>
        </AbsHeader>
      }
      right={
        <div style={{
          width: '100%', background: '#262624', borderRadius: 10,
          padding: '14px 0', fontFamily: MONO, fontSize: 11.5,
          boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
        }}>
          <div style={{
            padding: '0 16px 10px', color: '#73726C', fontSize: 10.5,
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}>/memory — 4 entries</div>
          {entries.map((e, i) => (
            <div key={i} style={{
              padding: '9px 16px', display: 'flex', alignItems: 'center', gap: 12,
              borderBottom: i < entries.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
            }}>
              <span style={{
                fontSize: 9, padding: '2px 7px', borderRadius: 3,
                background: 'rgba(255,255,255,0.06)', color: typeColor[e.type],
                minWidth: 62, textAlign: 'center',
              }}>{e.type}</span>
              <span style={{ color: '#E8E6DC', flex: 1 }}>{e.text}</span>
              <span style={{ color: '#73726C', fontSize: 10 }}>{e.age}</span>
            </div>
          ))}
          <div style={{ padding: '10px 16px 0', color: '#73726C', fontSize: 10 }}>
            [e] edit · [d] delete · [c] clear all
          </div>
        </div>
      }
    />
  );
}

// ── Effort Levels ─────────────────────────────────────────────────
// Issue #5. The ○◐● indicator sits on the prompt bar — customers see it
// and ask. It's also a cost lever budget teams care about.
function Slide_EffortLevels() {
  const levels = [
    { dot: '○', name: 'Low',    when: 'Boilerplate, quick edits, rote refactors',  note: 'Fast & cheap' },
    { dot: '◐', name: 'Medium', when: 'Daily driving on Sonnet 4.6',               note: 'Balanced' },
    { dot: '●', name: 'High',   when: 'Architecture, tricky bugs, cross-cutting design', note: "Claude Code's default" },
  ];
  const mono = { fontFamily: MONO, fontSize: 11 };
  return (
    <Slide bg={BONE} label="Effort">
      <div style={KICKER}>Control</div>
      <h2 style={H2}>Effort — how hard should it think?</h2>
      <p style={{ ...SUB, maxWidth: 640 }}>
        The ○ ◐ ● indicator on the prompt bar is reasoning depth. Five levels total —
        these three cover the daily span; xHigh and Max extend the scale for Opus 4.7
        coding/agentic work and frontier problems. See the reference table next.
      </p>
      <VCenter stretch>
        <div style={{ display: 'flex', gap: 14 }}>
          {levels.map((l, i) => (
            <div key={i} style={{
              flex: 1, padding: '20px 18px', background: '#fff',
              border: '1px solid rgba(20,20,19,0.06)', borderRadius: 10,
              borderTop: i === 2 ? `3px solid ${CLAY}` : '1px solid rgba(20,20,19,0.06)',
            }}>
              <div style={{ fontSize: 28, lineHeight: 1, marginBottom: 10, color: CLAY }}>{l.dot}</div>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>{l.name}</div>
              <div style={{ fontSize: 12, color: GRAY, lineHeight: 1.5, marginBottom: 10 }}>{l.when}</div>
              <div style={{ fontSize: 10.5, color: CLAY, fontWeight: 500 }}>{l.note}</div>
            </div>
          ))}
        </div>
        <div style={{
          marginTop: 18, padding: '12px 18px', background: 'rgba(217,119,87,0.06)',
          borderRadius: 8, fontSize: 12, color: DARK, lineHeight: 1.6,
        }}>
          <strong style={{ color: CLAY }}>Escape hatches:</strong> type{' '}
          <code style={{ ...mono, background: '#fff', padding: '2px 6px', borderRadius: 4 }}>ultrathink</code>{' '}
          for one-turn high effort without changing the setting ·{' '}
          <code style={{ ...mono, background: '#fff', padding: '2px 6px', borderRadius: 4 }}>/effort</code>{' '}
          to switch mid-session · pin it per-skill or per-agent via{' '}
          <code style={{ ...mono, background: '#fff', padding: '2px 6px', borderRadius: 4 }}>effort:</code>{' '}
          frontmatter.
        </div>
      </VCenter>
    </Slide>
  );
}

// ── Demo: /loop ───────────────────────────────────────────────────
// Issue #6. Visually obvious demo — start a loop, let it tick while
// you keep presenting, notification lands on its own.
function Slide_DemoLoop() {
  return <DemoSlide n="4b" title="/loop — hands-free polling" beats={[
    { key: '/loop 30s', line: 'check if the staging deploy is green yet' },
    { key: null,        line: 'keep presenting — loop ticks in background' },
    { key: null,        line: 'two ticks later: notification lands mid-sentence' },
  ]} hint="Pair with a real CI job if wifi allows; otherwise a sleep-then-touch script." />;
}


// ============================================================================
// LINA-PORT — slides from foundational training/Claude Code 101-301.html
// ============================================================================

function Slide_ContextPrinciple(props) {
  var active = props.active;
  var v = useStagger3(active, 2, 300, 500);
  return React.createElement('div', { style: {
    width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center', background: '#141413',
    fontFamily: 'Anthropic Sans, system-ui, sans-serif',
  }},
    React.createElement(Fade3, { vis: v.includes(0) },
      React.createElement('h2', { style: {
        color: '#FAF9F5', fontSize: 44, fontWeight: 300, letterSpacing: '-0.02em',
        textAlign: 'center', lineHeight: 1.3, maxWidth: 700,
      }},
        'Claude Code is as good as the ',
        React.createElement('span', { style: { color: CLAY } }, 'context'),
        ' you give it')),
    React.createElement(Fade3, { vis: v.includes(1) },
      React.createElement('div', { style: { width: 48, height: 1, background: CLAY, opacity: 0.4, marginTop: 32 } })));
}


function Slide_BundledFiles(props) {
  var active = props.active;
  var v = useStagger3(active, 6, 200, 200);

  var MONO = "'JetBrains Mono', monospace";
  var codeStyle = { fontFamily: MONO, fontSize: 11, lineHeight: 1.7, whiteSpace: 'pre-wrap' };
  var FILE_LABEL = { color: '#6A9BCC', fontSize: 12, fontWeight: 500, fontFamily: MONO, marginBottom: 8 };
  var CARD_BG = 'rgba(217,119,87,0.04)';
  var CARD_BORDER = '1px solid rgba(217,119,87,0.12)';

  // SKILL.md content
  var skillMd = [
    { c: '#6a9955', t: '---' },
    { c: '#d4d4d4', t: 'name: Anthropic Brand Style Guidelines' },
    { c: '#d4d4d4', t: 'description: \u2026' },
    { c: '#6a9955', t: '---' },
    { c: null, t: '' },
    { c: '#D97757', t: '## Overview' },
    { c: '#d4d4d4', t: "This skill provides Anthropic's official brand identity" },
    { c: '#d4d4d4', t: 'resources for' },
    { c: '#d4d4d4', t: 'PowerPoint presentations. It includes a pre-branded template' },
    { c: '#d4d4d4', t: 'and tools to apply Anthropic styling to existing' },
    { c: '#d4d4d4', t: 'presentations.' },
    { c: null, t: '' },
    { c: '#D97757', t: '## Colors' },
    { c: '#d4d4d4', t: '- Dark: `#141413` \u2013 Primary text and dark backgrounds' },
    { c: '#d4d4d4', t: '- Light: `#faf9f5` \u2013 Light backgrounds and text on dark' },
    { c: '#d4d4d4', t: '- Light Gray: `#e8e6dc` \u2013 Subtle backgrounds' },
    { c: null, t: '' },
    { c: '#D97757', t: '## Workflows' },
    { c: '#d4d4d4', t: '- For slide decks, see [slide-decks.md](slide-decks.md)' },
    { c: '#d4d4d4', t: '- For documents, see [docs.md](docs.md)' },
  ];

  return React.createElement(FullCanvas, { bg: BG_LIGHT, style: {
    display: 'flex', flexDirection: 'column',
    fontFamily: 'Anthropic Sans, system-ui, sans-serif', padding: '48px 64px 40px',
  }},
    React.createElement(Fade3, { vis: v.includes(0) },
      React.createElement('p', { style: { color: CLAY, fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 } }, 'Skills')),
    React.createElement(Fade3, { vis: v.includes(0) },
      React.createElement('h2', { style: { color: TEXT_PRIMARY, fontSize: 36, fontWeight: 300, marginBottom: 8, letterSpacing: '-0.02em' } }, 'Bundled files')),
    React.createElement(Fade3, { vis: v.includes(0) },
      React.createElement('p', { style: { color: TEXT_SECONDARY, fontSize: 14, marginBottom: 28 } }, 'A skill is a directory — SKILL.md plus any supporting files it references')),

    // Main content area
    React.createElement('div', { style: { display: 'flex', gap: 20, flex: 1, minHeight: 0 } },
      // Left: SKILL.md
      React.createElement(Fade3, { vis: v.includes(1), y: 16 },
        React.createElement('div', { style: { flex: 5, display: 'flex', flexDirection: 'column' } },
          React.createElement('p', { style: FILE_LABEL }, 'anthropic/brand_styling/SKILL.md'),
          React.createElement('div', { style: {
            background: '#1a1918', borderRadius: 10, padding: '14px 18px', flex: 1,
            border: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden',
          }},
            // YAML Frontmatter label
            React.createElement('div', { style: {
              position: 'absolute', top: 8, right: 12, fontSize: 10, color: '#6A9BCC',
              fontFamily: MONO, opacity: 0.7,
            } }, 'YAML Frontmatter'),
            // Markdown label
            React.createElement('div', { style: {
              position: 'absolute', top: 68, right: 12, fontSize: 10, color: '#6A9BCC',
              fontFamily: MONO, opacity: 0.7,
            } }, 'Markdown'),
            // Code content
            React.createElement('div', { style: codeStyle },
              skillMd.map(function(line, i) {
                if (!line.t) return React.createElement('div', { key: i, style: { height: 6 } });
                return React.createElement('div', { key: i, style: { color: line.c || '#d4d4d4' } }, line.t);
              }))))),

      // Right column: slide-decks.md + docs.md
      React.createElement('div', { style: { flex: 4, display: 'flex', flexDirection: 'column', gap: 16 } },
        // slide-decks.md
        React.createElement(Fade3, { vis: v.includes(2), x: 16, y: 0 },
          React.createElement('div', { style: { flex: 1, display: 'flex', flexDirection: 'column' } },
            React.createElement('p', { style: FILE_LABEL }, 'anthropic/brand_styling/slide-decks.md'),
            React.createElement('div', { style: {
              background: CARD_BG, borderRadius: 10, padding: '14px 18px', flex: 1,
              border: CARD_BORDER,
            }},
              React.createElement('div', { style: codeStyle },
                React.createElement('div', { style: { color: '#D97757' } }, '## Anthropic Slide Decks'),
                React.createElement('div', null, ''),
                React.createElement('div', { style: { color: TEXT_PRIMARY } }, '- Intro/outro slides'),
                React.createElement('div', { style: { color: TEXT_SECONDARY } }, '    - background color: `#141413`'),
                React.createElement('div', { style: { color: TEXT_SECONDARY } }, '    - foreground color: oat'),
                React.createElement('div', { style: { color: TEXT_PRIMARY } }, '- Section slides:'),
                React.createElement('div', { style: { color: TEXT_SECONDARY } }, '    - background color: `#da7857`'),
                React.createElement('div', { style: { color: TEXT_SECONDARY } }, '    - foreground color: `#141413`'),
                React.createElement('div', null, ''),
                React.createElement('div', { style: { color: TEXT_SECONDARY, opacity: 0.5 } }, '... and so on ...'))))),

        // docs.md
        React.createElement(Fade3, { vis: v.includes(3), x: 16, y: 0 },
          React.createElement('div', { style: { flex: 1, display: 'flex', flexDirection: 'column' } },
            React.createElement('p', { style: FILE_LABEL }, 'anthropic/brand_styling/docs.md'),
            React.createElement('div', { style: {
              background: CARD_BG, borderRadius: 10, padding: '14px 18px', flex: 1,
              border: CARD_BORDER,
            }},
              React.createElement('div', { style: codeStyle },
                React.createElement('div', { style: { color: '#D97757' } }, '## Documents'),
                React.createElement('div', null, ''),
                React.createElement('div', { style: { color: TEXT_PRIMARY } }, '* every document should start with a title, a list of'),
                React.createElement('div', { style: { color: TEXT_PRIMARY } }, '  authors, and the creation date'),
                React.createElement('div', null, ''),
                React.createElement('div', { style: { color: TEXT_PRIMARY } }, '* if you use tabs in GDocs, make sure the main doc is'),
                React.createElement('div', { style: { color: TEXT_PRIMARY } }, '  titled as such'),
                React.createElement('div', null, ''),
                React.createElement('div', { style: { color: TEXT_SECONDARY, opacity: 0.5 } }, '... and so on ...'))))))),

    // Tip bar at bottom
    React.createElement(Fade3, { vis: v.includes(4) },
      React.createElement('div', { style: {
        background: 'rgba(217,119,87,0.06)', borderRadius: 8, padding: '10px 16px',
        border: '1px solid rgba(217,119,87,0.12)', marginTop: 12,
      }},
        React.createElement('p', { style: { color: TEXT_PRIMARY, fontSize: 13 } },
          React.createElement('span', { style: { color: CLAY, fontWeight: 600 } }, 'Tip: '),
          'Be very explicit in the description of your skill'))));
}

function Slide_MCPArch(props) {
  var active = props.active;
  var v = useStagger3(active, 8, 150, 150);

  var MONO = "'JetBrains Mono', monospace";
  var servers = [
    { name: 'github-enterprise', sub: 'MCP Server', caps: ['TOOLS', 'RESOURCES'], desc: 'github.example.com', descSub: 'External system', color: '#D97757' },
    { name: 'auth-service', sub: 'MCP Server', caps: ['TOOLS'], desc: 'Identity platform', descSub: 'External system', color: '#8B9A6B' },
    { name: 'postgres', sub: 'MCP Server', caps: ['TOOLS', 'RESOURCES'], desc: 'Service databases', descSub: 'External system', color: '#6A9BCC' },
    { name: 'argo-cd', sub: 'MCP Server', caps: ['TOOLS', 'RESOURCES', 'PROMPTS'], desc: 'Deployment pipeline', descSub: 'External system', color: '#9B8EB0' },
  ];

  var capColors = { TOOLS: '#D97757', RESOURCES: '#6A9BCC', PROMPTS: '#8B9A6B' };

  return React.createElement('div', { style: {
    width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
    background: BG_LIGHT, fontFamily: 'Anthropic Sans, system-ui, sans-serif', padding: '40px 50px 32px',
  }},
    // Title
    React.createElement(Fade3, { vis: v.includes(0) },
      React.createElement('h2', { style: { color: TEXT_PRIMARY, fontSize: 34, fontWeight: 300, marginBottom: 6, letterSpacing: '-0.02em' } }, 'MCP architecture')),
    React.createElement(Fade3, { vis: v.includes(0) },
      React.createElement('p', { style: { color: TEXT_SECONDARY, fontSize: 14, marginBottom: 28 } },
        'One client, many servers \u2014 each server exposes typed capabilities over a standard transport')),

    // Diagram area
    React.createElement('div', { style: { display: 'flex', gap: 0, flex: 1, alignItems: 'center', position: 'relative' } },

      // Left: Claude Code client box
      React.createElement(Fade3, { vis: v.includes(1), y: 0 },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 0, flexShrink: 0 } },
          // Client box
          React.createElement('div', { style: {
            background: 'rgba(217,119,87,0.08)', border: '1px solid rgba(217,119,87,0.2)',
            borderRadius: 12, padding: '20px 16px', width: 140, textAlign: 'center',
          }},
            React.createElement('div', { style: { fontSize: 15, fontWeight: 600, color: TEXT_PRIMARY, marginBottom: 2 } }, 'Claude Code'),
            React.createElement('div', { style: { fontSize: 11, color: TEXT_SECONDARY, marginBottom: 12 } }, 'MCP Host / Client'),
            React.createElement('div', { style: { fontSize: 10, color: CLAY, lineHeight: 1.6 } },
              'discovers servers', React.createElement('br'),
              'negotiates caps', React.createElement('br'),
              'invokes tools')),
          // MCP Protocol bar
          React.createElement('div', { style: {
            background: '#141413', color: '#FAF9F5', borderRadius: 4, padding: '12px 6px',
            fontSize: 9, fontWeight: 600, letterSpacing: '0.08em', writingMode: 'vertical-rl',
            textOrientation: 'mixed', height: 110, display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginLeft: 8,
          }}, 'MCP PROTOCOL'))),

      // Connection lines + servers
      React.createElement('div', { style: { flex: 1, display: 'flex', flexDirection: 'column', gap: 10, paddingLeft: 16 } },
        servers.map(function(srv, i) {
          var isVis = v.includes(i + 2);
          return React.createElement('div', { key: i, style: {
            display: 'flex', alignItems: 'center', gap: 12,
            opacity: isVis ? 1 : 0, transform: isVis ? 'translateX(0)' : 'translateX(20px)',
            transition: 'all 0.5s cubic-bezier(0.22,1,0.36,1) ' + (i * 0.08) + 's',
          }},
            // Line
            React.createElement('div', { style: { width: 24, height: 1, background: 'rgba(15,12,8,0.15)' } }),
            // Server card
            React.createElement('div', { style: {
              flex: 1, background: '#fff', borderRadius: 10, padding: '10px 14px',
              border: '1px solid rgba(15,12,8,0.08)', display: 'flex', alignItems: 'center', gap: 10,
              borderLeft: '3px solid ' + srv.color,
            }},
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: TEXT_PRIMARY, fontFamily: MONO } }, srv.name),
                React.createElement('div', { style: { fontSize: 10, color: TEXT_SECONDARY } }, srv.sub)),
              // Capability badges
              React.createElement('div', { style: { display: 'flex', gap: 4, flexWrap: 'wrap' } },
                srv.caps.map(function(cap, j) {
                  return React.createElement('span', { key: j, style: {
                    fontSize: 9, fontWeight: 600, color: capColors[cap], border: '1px solid ' + capColors[cap] + '44',
                    borderRadius: 3, padding: '2px 6px', fontFamily: MONO, letterSpacing: '0.02em',
                  } }, cap);
                }))),
            // External system label
            React.createElement('div', { style: { width: 120, textAlign: 'right' } },
              React.createElement('div', { style: { fontSize: 12, fontWeight: 500, color: TEXT_PRIMARY } }, srv.desc),
              React.createElement('div', { style: { fontSize: 10, color: TEXT_SECONDARY } }, srv.descSub)));
        }),
        // Transport label under lines
        React.createElement(Fade3, { vis: v.includes(2) },
          React.createElement('div', { style: { paddingLeft: 0, marginTop: -4 } },
            React.createElement('span', { style: { fontSize: 10, color: TEXT_SECONDARY, fontFamily: MONO } }, 'stdio / SSE / HTTP'))))),

    // Capabilities legend at bottom
    React.createElement(Fade3, { vis: v.includes(6) },
      React.createElement('div', { style: {
        display: 'flex', alignItems: 'center', gap: 20, marginTop: 16, paddingTop: 12,
        borderTop: '1px solid rgba(15,12,8,0.06)',
      }},
        React.createElement('span', { style: { fontSize: 11, fontWeight: 600, color: TEXT_SECONDARY, textTransform: 'uppercase', letterSpacing: '0.06em' } }, 'Capabilities'),
        ['TOOLS', 'RESOURCES', 'PROMPTS'].map(function(cap, i) {
          var descs = ['Functions Claude invokes', 'Data Claude reads', 'Templates Claude loads'];
          return React.createElement('div', { key: i, style: { display: 'flex', alignItems: 'center', gap: 6 } },
            React.createElement('span', { style: {
              fontSize: 9, fontWeight: 600, color: capColors[cap], border: '1px solid ' + capColors[cap] + '44',
              borderRadius: 3, padding: '2px 6px', fontFamily: MONO,
            } }, cap),
            React.createElement('span', { style: { fontSize: 11, color: TEXT_SECONDARY } }, descs[i]));
        }))));
}

function Slide_SpecWorkflow(props) {
  var active = props.active;
  const steps = [
    { title: 'Specify', desc: 'Write detailed spec: API contracts, edge cases, acceptance criteria', bg: 'rgba(217,119,87,0.08)', color: '#141413' },
    { title: 'Validate', desc: 'Claude reviews spec for completeness, consistency, and ambiguity', bg: 'rgba(217,119,87,0.12)', color: '#141413' },
    { title: 'Implement', desc: 'Code generated from spec. Spec is single source of truth for every decision', bg: 'rgba(217,119,87,0.18)', color: '#141413' },
    { title: 'Verify', desc: 'Implementation verified against spec at every step. Automatic drift detection', bg: '#D97757', color: '#fff' },
  ];
  const benefits = [
    { title: 'Reduced rework', desc: 'Ambiguities caught before a single line is written' },
    { title: 'Parallel-ready', desc: 'Clear contracts enable multi-agent implementation' },
    { title: 'Verifiable output', desc: 'Every decision traceable back to the spec' },
  ];

  return (
    <FullCanvas bg="#FAF9F5" style={{
      color: '#141413',
      fontFamily: "'Anthropic Sans', system-ui, sans-serif",
      display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '56px 72px',
    }}>
      <h2 style={{ fontSize: 36, fontWeight: 400, letterSpacing: '-0.02em', marginBottom: 8 }}>The spec-first workflow</h2>
      <p style={{ fontSize: 15, opacity: 0.5, marginBottom: 48 }}>Write the spec, validate the spec, implement from the spec</p>

      {/* 4-step pipeline */}
      <div style={{ display: 'flex', gap: 3, marginBottom: 32 }}>
        {steps.map((s, i) => (
          <div key={i} style={{
            flex: 1, background: s.bg, color: s.color, padding: '20px 18px',
            borderRadius: i === 0 ? '10px 0 0 10px' : i === 3 ? '0 10px 10px 0' : 0,
          }}>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>{s.title}</div>
            <p style={{ fontSize: 12, lineHeight: 1.5, opacity: s.color === '#fff' ? 0.9 : 0.65 }}>{s.desc}</p>
          </div>
        ))}
      </div>

      {/* 3 benefit cards */}
      <div style={{ display: 'flex', gap: 16 }}>
        {benefits.map((b, i) => (
          <div key={i} style={{
            flex: 1, background: '#fff', border: '0.5px solid rgba(31,30,29,0.08)',
            borderRadius: 12, padding: '18px 20px', borderLeft: '3px solid #D97757',
          }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#D97757', marginBottom: 6 }}>{b.title}</div>
            <p style={{ fontSize: 13, opacity: 0.6, lineHeight: 1.5 }}>{b.desc}</p>
          </div>
        ))}
      </div>
    </FullCanvas>
  );
}

function Slide_TDD(props) {
  var active = props.active;
  return (
    <FullCanvas bg="#141413" style={{
      color: '#FAF9F5',
      fontFamily: "'Anthropic Sans', system-ui, sans-serif",
      display: 'flex', flexDirection: 'column', padding: '48px 56px',
    }}>
      <span style={{
        display: 'inline-block', fontSize: 11, fontWeight: 600,
        textTransform: 'uppercase', letterSpacing: '0.08em',
        padding: '4px 12px', borderRadius: 4, marginBottom: 14, alignSelf: 'flex-start',
        background: 'rgba(250,249,245,0.1)', color: '#D97757',
      }}>Red → Green → Refactor</span>
      <h2 style={{ fontSize: 34, fontWeight: 400, marginBottom: 28, letterSpacing: '-0.02em' }}>Test-Driven Development</h2>

      {/* Terminal */}
      <div style={{
        flex: 1, background: '#1a1918', borderRadius: 12, overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '0 12px 48px rgba(0,0,0,0.3)',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Title bar */}
        <div style={{ background: '#252321', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f56' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#27ca40' }} />
          <span style={{ flex: 1, textAlign: 'center', color: '#666', fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }}>claude — ~/my-project</span>
        </div>

        {/* Terminal content */}
        <div style={{
          flex: 1, padding: '16px 20px', fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12, lineHeight: 1.7, color: '#d4d4d4', whiteSpace: 'pre',
        }}>
          {/* Step 1: Write failing test */}
          <div><span style={{ color: '#D97757' }}>{'>'}</span> <span style={{ color: '#fff' }}>Write a failing test for parsing ISO dates with timezone offsets</span></div>
          <div style={{ height: 6 }} />
          <div>  <span style={{ color: '#999' }}>●</span> <span style={{ fontWeight: 700 }}>Reading</span> <span style={{ color: '#8BB8E0' }}>src/utils/date.ts</span></div>
          <div>  <span style={{ color: '#4EC96B' }}>●</span> <span style={{ fontWeight: 700 }}>Writing</span> <span style={{ color: '#8BB8E0' }}>src/utils/__tests__/date.test.ts</span></div>
          <div>  Running <span style={{ color: '#E3DACC' }}>pnpm test</span></div>
          <div style={{ height: 4 }} />
          <div><span style={{ color: '#E8655A', fontWeight: 700 }}>FAIL</span> src/utils/__tests__/date.test.ts</div>
          <div>  <span style={{ color: '#E8655A' }}>✗</span> parses ISO 8601 with timezone offset</div>
          <div>    <span style={{ color: '#888' }}>Expected: 2024-03-15T10:30:00+05:30</span></div>
          <div>    <span style={{ color: '#888' }}>Received: undefined</span></div>
          <div style={{ height: 10 }} />

          {/* Step 2: Make it pass */}
          <div><span style={{ color: '#D97757' }}>{'>'}</span> <span style={{ color: '#fff' }}>Make it pass</span></div>
          <div style={{ height: 6 }} />
          <div>  <span style={{ color: '#4EC96B' }}>●</span> <span style={{ fontWeight: 700 }}>Editing</span> <span style={{ color: '#8BB8E0' }}>src/utils/date.ts</span> <span style={{ color: '#888' }}>(+42 lines)</span></div>
          <div>  Running <span style={{ color: '#E3DACC' }}>pnpm test</span></div>
          <div style={{ height: 4 }} />
          <div><span style={{ color: '#4EC96B', fontWeight: 700 }}>PASS</span> src/utils/__tests__/date.test.ts</div>
          <div>  <span style={{ color: '#4EC96B' }}>✓</span> parses ISO 8601 with timezone offset <span style={{ color: '#888' }}>(3ms)</span></div>
          <div style={{ height: 10 }} />

          {/* Step 3: Continue */}
          <div><span style={{ color: '#D97757' }}>{'>'}</span> <span style={{ color: '#fff' }}>Now add edge cases for invalid input</span></div>
        </div>
      </div>
    </FullCanvas>
  );
}

function Slide_TDDWhy(props) {
  var active = props.active;
  const items = [
    { icon: '☰', title: 'Unambiguous spec', desc: 'Tests define exactly what "done" means — no "that\'s not what I meant"' },
    { icon: '✓', title: 'Verifiable stopping condition', desc: 'Green/red is binary. Claude knows when to stop.' },
    { icon: '⚡', title: 'Safe autonomy', desc: 'Refactoring under a passing suite is safe to delegate.' },
    { icon: '</>', title: 'Better test coverage', desc: 'Claude writes more thorough tests than most of us would bother to.' },
  ];

  return (
    <FullCanvas bg="#FAF9F5" style={{
      color: '#141413',
      fontFamily: "'Anthropic Sans', system-ui, sans-serif",
      display: 'flex', flexDirection: 'column', padding: '56px 72px',
    }}>
      <span style={{
        display: 'inline-block', fontSize: 11, fontWeight: 600,
        textTransform: 'uppercase', letterSpacing: '0.08em',
        padding: '4px 12px', borderRadius: 4, marginBottom: 14, alignSelf: 'flex-start',
        background: 'rgba(217,119,87,0.15)', color: '#D97757',
      }}>The Feedback Loop</span>
      <h2 style={{ fontSize: 34, fontWeight: 550, marginBottom: 40, letterSpacing: '-0.01em' }}>Why TDD + Claude Works</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
        {items.map((item, i) => (
          <div key={i} style={{
            background: '#fff', border: '0.5px solid rgba(31,30,29,0.08)', borderRadius: 12,
            padding: '18px 24px', display: 'flex', alignItems: 'center', gap: 18,
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10, background: 'rgba(217,119,87,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, color: '#D97757', flexShrink: 0, fontWeight: 600,
            }}>{item.icon}</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 3 }}>{item.title}</div>
              <div style={{ fontSize: 13, opacity: 0.6, lineHeight: 1.4 }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Tip bar */}
      <div style={{
        background: 'rgba(217,119,87,0.06)', borderRadius: 10, padding: '14px 20px',
        border: '1px solid rgba(217,119,87,0.12)', marginTop: 20,
        display: 'flex', alignItems: 'center', gap: 8, borderLeft: '3px solid #D97757',
      }}>
        <span style={{ fontSize: 13, opacity: 0.7 }}>Add</span>
        <code style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 600,
          background: 'rgba(20,20,19,0.06)', padding: '3px 10px', borderRadius: 5,
        }}>"Always write a test when fixing a bug"</code>
        <span style={{ fontSize: 13, opacity: 0.7 }}>to your project CLAUDE.md. It just happens.</span>
      </div>
    </FullCanvas>
  );
}

function Slide_Checkpointing(props) {
  var active = props.active;
  var CLAY_C = '#D97757';
  var BLUE_C = '#6A9BCC';
  var GREEN_C = '#7A9B6F';

  function topCard(accent, heading, body) {
    return React.createElement('div', { style: {
      background: '#fff', borderRadius: 8, borderLeft: '4px solid ' + accent,
      padding: '20px 24px', flex: 1, boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    }},
      React.createElement('h3', { style: { fontSize: 18, fontWeight: 600, marginBottom: 12, color: '#141413' } }, heading),
      body);
  }

  function modeCard(accent, title, desc) {
    return React.createElement('div', { style: {
      background: '#E8E4D9', borderTop: '4px solid ' + accent,
      padding: '16px 20px', flex: 1,
    }},
      React.createElement('h4', { style: { fontSize: 15, fontWeight: 600, marginBottom: 10, color: '#141413', lineHeight: 1.3 } }, title),
      React.createElement('p', { style: { fontSize: 13, color: '#5A5955' } }, desc));
  }

  function footerBox(label, text) {
    return React.createElement('div', { style: {
      background: '#E8E4D9', padding: '12px 18px', flex: 1, fontSize: 13, color: '#141413',
    }},
      React.createElement('strong', { style: { fontWeight: 600 } }, label + ': '),
      text);
  }

  return React.createElement(StubSlide, {
    title: 'Checkpointing',
    subtitle: 'Fearless Experimentation \u2014 Your Safety Net for Ambitious Tasks'
  },
    React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 24, flex: 1 } },
      // Top two cards
      React.createElement('div', { style: { display: 'flex', gap: 20 } },
        topCard(CLAY_C, 'What It Does',
          React.createElement('p', { style: { fontSize: 14, lineHeight: 1.6, color: '#5A5955' } },
            'Claude Code automatically snapshots your code before each edit. Pursue wide-scale refactors knowing you can always rewind.')),
        topCard(BLUE_C, 'How to Access',
          React.createElement('div', null,
            React.createElement('p', { style: { fontSize: 14, fontFamily: 'monospace', marginBottom: 8 } },
              React.createElement('span', { style: { color: CLAY_C, fontWeight: 600 } }, 'Esc + Esc'),
              ' or ',
              React.createElement('span', { style: { color: CLAY_C, fontWeight: 600 } }, '/rewind')),
            React.createElement('p', { style: { fontSize: 14, lineHeight: 1.6, color: '#5A5955' } },
              'Opens a scrollable list of session prompts to rewind to.')))),
      // Three Restore Modes
      React.createElement('div', null,
        React.createElement('h3', { style: { fontSize: 20, fontWeight: 600, marginBottom: 12, color: '#141413' } }, 'Three Restore Modes'),
        React.createElement('div', { style: { display: 'flex', gap: 16 } },
          modeCard(CLAY_C, 'Restore Code & Conversation', 'Revert both to that point'),
          modeCard(BLUE_C, 'Restore Conversation Only', 'Rewind chat, keep current code'),
          modeCard(GREEN_C, 'Restore Code Only', 'Revert files, keep conversation'))),
      // Footer callouts
      React.createElement('div', { style: { display: 'flex', gap: 16 } },
        footerBox('Limitation', 'Does not track bash commands or manual edits outside Claude Code'),
        footerBox('Think', 'Checkpoints = \u201Clocal undo\u201D  \u2022  Git = \u201Cpermanent history\u201D'))));
}


function Slide_EffortTable(props) {
  var active = props.active;
  var thDark = { background: '#141413', color: '#fff', padding: '14px 16px', fontSize: 15, fontWeight: 600, textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' };
  var tdLight = { background: '#E8E4D9', padding: '12px 14px', fontSize: 13, lineHeight: 1.5, verticalAlign: 'middle', border: '1px solid rgba(15,12,8,0.08)' };
  var tdWhite = { background: '#fff', padding: '12px 14px', fontSize: 13, lineHeight: 1.5, verticalAlign: 'middle', border: '1px solid rgba(15,12,8,0.08)' };

  var levels = [
    { name: 'Low', color: '#8A8985', behavior: 'Most efficient. May skip thinking for simpler problems.', use: 'Subagents, high-volume tasks, chat, latency-sensitive' },
    { name: 'Medium', color: '#6A9BCC', behavior: 'Balanced token spend. Recommended default for Sonnet 4.6.', use: 'Agentic coding, tool-heavy workflows, code generation' },
    { name: 'High', color: '#D97757', behavior: 'Default in Claude Code. Solid balance of intelligence and token use; on Opus 4.7, raise to xHigh for coding and agentic work.', use: 'Complex reasoning, multi-step analysis, difficult coding' },
    { name: 'xHigh', color: '#B8693E', behavior: 'Recommended starting point for Opus 4.7 coding and agentic work — meaningfully higher token usage than High.', use: 'Autonomous agentic loops, repeated tool calling, detailed web/knowledge-base search' },
    { name: 'Max', color: '#C23B3B', behavior: 'No constraints on token spending. Reserve for frontier problems — on most workloads xHigh is the sweet spot.', use: 'Research-grade problems where xHigh has been baselined and is insufficient' },
  ];

  var pathIcon = React.createElement('svg', { width: 70, height: 70, viewBox: '0 0 70 70', fill: 'none' },
    React.createElement('path', { d: 'M15 55 L35 35 L25 20 L55 15', stroke: '#141413', strokeWidth: 2.5, strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' }),
    React.createElement('circle', { cx: 15, cy: 55, r: 5, fill: '#E8DFD0', stroke: '#141413', strokeWidth: 2 }),
    React.createElement('circle', { cx: 35, cy: 35, r: 5, fill: '#E8DFD0', stroke: '#141413', strokeWidth: 2 }),
    React.createElement('circle', { cx: 25, cy: 20, r: 5, fill: '#E8DFD0', stroke: '#141413', strokeWidth: 2 }),
    React.createElement('circle', { cx: 55, cy: 15, r: 5, fill: '#E8DFD0', stroke: '#141413', strokeWidth: 2 }));

  return React.createElement(StubSlide, {
    title: 'Effort Parameter',
    subtitle: 'Controls how many tokens Claude uses \u2014 affects text, tool calls, and thinking'
  },
    React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 16 } },
      React.createElement('div', { style: { display: 'flex', gap: 28, alignItems: 'stretch' } },
        // Left: table
        React.createElement('div', { style: { flex: '1 1 65%' } },
          React.createElement('table', { style: { width: '100%', height: '100%', borderCollapse: 'collapse' } },
            React.createElement('thead', null,
              React.createElement('tr', null,
                React.createElement('th', { style: Object.assign({}, thDark, { width: 100 }) }, 'Level'),
                React.createElement('th', { style: thDark }, 'Behavior'),
                React.createElement('th', { style: thDark }, 'Typical Use Cases'))),
            React.createElement('tbody', null,
              levels.map(function(lv, i) {
                var rowBg = i % 2 === 0 ? tdLight : tdWhite;
                return React.createElement('tr', { key: lv.name },
                  React.createElement('td', { style: Object.assign({}, rowBg, { textAlign: 'center', fontWeight: 600, color: lv.color }) }, lv.name),
                  React.createElement('td', { style: rowBg }, lv.behavior),
                  React.createElement('td', { style: rowBg }, lv.use));
              })))),
        // Right: Key Details sidebar
        React.createElement('div', { style: {
          flex: '0 0 30%', background: '#E8E4D9', borderRadius: 16, padding: '24px 20px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 14,
        }},
          pathIcon,
          React.createElement('h3', { style: { fontSize: 20, fontWeight: 600, color: '#141413' } }, 'Key Details'),
          React.createElement('p', { style: { fontSize: 12, lineHeight: 1.6, color: '#5A5955' } },
            'Effort is a behavioral signal, not a strict token budget. At lower levels, Claude still thinks on hard problems \u2014 just less.'),
          React.createElement('p', { style: { fontSize: 12, lineHeight: 1.6, color: '#5A5955' } },
            'Affects everything: text, tool calls, and thinking tokens.'),
          React.createElement('p', { style: { fontSize: 12, lineHeight: 1.6, color: '#5A5955', fontFamily: 'monospace' } },
            'Set via output_config: { effort: "medium" }'))),
      // Note below, aligned to left edge
      React.createElement('p', { style: { fontSize: 13, lineHeight: 1.6, color: '#5A5955', maxWidth: '65%' } },
        React.createElement('strong', { style: { fontWeight: 600, color: '#141413' } }, 'Effort replaces budget_tokens: '),
        'For Opus 4.7 and Sonnet 4.6, use the effort parameter instead of budget_tokens to control thinking depth.')));
}

function Slide_PromptingTips(props) {
  var active = props.active;
  var CLAY_C = '#D97757';
  var FILL = '#E8DFD0';
  var STROKE = '#141413';

  var handsIcon = React.createElement('svg', { width: 110, height: 90, viewBox: '0 0 110 90', fill: 'none' },
    React.createElement('path', { d: 'M20 25 L45 25 L45 20 L50 20 L50 25 L55 25 L55 30 L60 30 L60 50 L55 50 L55 55 L20 55 Z', fill: FILL, stroke: STROKE, strokeWidth: 2, strokeLinejoin: 'round' }),
    React.createElement('path', { d: 'M28 25 L28 42 M36 25 L36 42 M44 25 L44 42', stroke: STROKE, strokeWidth: 2, strokeLinecap: 'round' }),
    React.createElement('path', { d: 'M90 65 L65 65 L65 70 L60 70 L60 65 L55 65 L55 60 L50 60 L50 40 L55 40 L55 35 L90 35 Z', fill: FILL, stroke: STROKE, strokeWidth: 2, strokeLinejoin: 'round' }),
    React.createElement('path', { d: 'M82 65 L82 48 M74 65 L74 48 M66 65 L66 48', stroke: STROKE, strokeWidth: 2, strokeLinecap: 'round' }),
    React.createElement('circle', { cx: 55, cy: 45, r: 12, fill: FILL, stroke: STROKE, strokeWidth: 2 }));

  var shapesIcon = React.createElement('svg', { width: 110, height: 90, viewBox: '0 0 110 90', fill: 'none' },
    React.createElement('path', { d: 'M35 75 L15 75 L35 20 L55 75 Z', fill: 'none', stroke: STROKE, strokeWidth: 2, strokeLinejoin: 'round' }),
    React.createElement('circle', { cx: 72, cy: 35, r: 16, fill: FILL, stroke: STROKE, strokeWidth: 2 }),
    React.createElement('rect', { x: 58, y: 50, width: 30, height: 25, fill: 'none', stroke: STROKE, strokeWidth: 2 }));

  var lockIcon = React.createElement('svg', { width: 90, height: 90, viewBox: '0 0 90 90', fill: 'none' },
    React.createElement('path', { d: 'M30 38 L30 25 Q30 12 45 12 Q60 12 60 25 L60 38', fill: 'none', stroke: STROKE, strokeWidth: 3, strokeLinecap: 'round' }),
    React.createElement('rect', { x: 20, y: 38, width: 50, height: 42, rx: 3, fill: FILL, stroke: STROKE, strokeWidth: 2 }),
    React.createElement('circle', { cx: 45, cy: 54, r: 6, fill: 'none', stroke: STROKE, strokeWidth: 2 }),
    React.createElement('path', { d: 'M42 58 L40 70 L50 70 L48 58 Z', fill: 'none', stroke: STROKE, strokeWidth: 2, strokeLinejoin: 'round' }));

  var tips = [
    { icon: handsIcon, title: 'Subagent Use',
      body: 'Opus 4.7 spawns fewer subagents by default than 4.6 \u2014 it reasons through tasks first. Add explicit guidance to delegate more, or raise effort to xhigh if your workflow depends on multi-agent parallelism.' },
    { icon: shapesIcon, title: 'High Initiative',
      body: 'Opus 4.7 uses fewer tool calls and fewer subagents by default than 4.6 \u2014 it reasons more within a single context instead. If your old prompts relied on broad tool-driven exploration, give Claude 4.7 explicit guidance about when to delegate and when to search.' },
    { icon: lockIcon, title: 'Autonomous Actions',
      body: 'Add explicit confirmation prompts for destructive operations. Without guidance, Opus 4.7 may take hard-to-reverse actions (force push, delete files, post to external services).' },
  ];

  function tipCol(tip) {
    return React.createElement('div', { style: { flex: 1, display: 'flex', flexDirection: 'column' } },
      React.createElement('div', { style: {
        width: '100%', aspectRatio: '2 / 1', background: '#E8E4D9', borderRadius: '50%',
        marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}, tip.icon),
      React.createElement('div', { style: { height: 4, background: CLAY_C, marginBottom: 20 } }),
      React.createElement('h3', { style: { fontSize: 22, fontWeight: 600, marginBottom: 16, color: '#141413' } }, tip.title),
      React.createElement('p', { style: { fontSize: 14, lineHeight: 1.6, color: '#5A5955' } }, tip.body));
  }

  return React.createElement(StubSlide, {
    title: 'Opus Prompting Tips'
  },
    React.createElement('div', { style: { display: 'flex', gap: 32, flex: 1, paddingTop: 16 } },
      tips.map(function(t, i) { return React.createElement(React.Fragment, { key: i }, tipCol(t)); })));
}

// Bash mode typed input with magenta HR lines
var BASH_PINK = 'rgb(219, 39, 119)';
function TypedBash({ text, progress }) {
  var n = Math.floor(text.length * Math.min(1, progress));
  return React.createElement(React.Fragment, null,
    React.createElement(Line, null, React.createElement('span', { style: { color: BASH_PINK, opacity: 0.6 } }, '─'.repeat(80))),
    React.createElement(Line, null,
      React.createElement('span', { style: { color: BASH_PINK } }, '! '),
      React.createElement('span', { style: { color: COLORS.white } }, text.slice(0, n)),
      progress < 1 && React.createElement(Inverse, null, ' ')),
    React.createElement(Line, null, React.createElement('span', { style: { color: BASH_PINK, opacity: 0.6 } }, '─'.repeat(80))));
}

// Bash mode input box (idle state)
function BashInputBox() {
  return React.createElement(React.Fragment, null,
    React.createElement(Line, null, React.createElement('span', { style: { color: BASH_PINK, opacity: 0.6 } }, '─'.repeat(80))),
    React.createElement(Line, null,
      React.createElement('span', { style: { color: BASH_PINK } }, '! '),
      React.createElement(Inverse, null, ' ')),
    React.createElement(Line, null, React.createElement('span', { style: { color: BASH_PINK, opacity: 0.6 } }, '─'.repeat(80))));
}

// ============================================================================
// LINA-PORT batch 2 — individual input/slash slides + appendix (1hr like-for-like)
// Helpers: Typed3, ImmersiveTerminal, SplitSlide (Bash/Screenshots deps)
// ============================================================================

function Typed3({ text, progress }) {
  const n = Math.floor(text.length * Math.min(1,progress));
  return React.createElement(React.Fragment, null,
    React.createElement(Hr, null),
    React.createElement(Line, null, React.createElement(Subtle, null, '❯ '),
      React.createElement('span', { style: { color: COLORS.white } }, text.slice(0,n)),
      progress < 1 && React.createElement(Inverse, null, ' ')),
    React.createElement(Hr, null));
}

function ImmersiveTerminal({ width, height, children, phase, shake, glowColor }) {
  const ref = React.useRef(null);
  React.useEffect(() => { if (ref.current) ref.current.scrollTop = ref.current.scrollHeight; });

  const isZoomed = phase !== 'intro';
  const scale = isZoomed ? 1 : 0.7;
  const rotateX = isZoomed ? 0 : 3;

  return React.createElement('div', { style: {
    position: 'relative',
    transform: `perspective(1200px) scale(${scale}) rotateX(${rotateX}deg) ${shake ? 'translateX(3px)' : ''}`,
    transition: 'transform 1.2s cubic-bezier(0.16,1,0.3,1)',
    transformOrigin: 'center center',
  }},
    // Glow halo
    React.createElement('div', { style: {
      position: 'absolute', inset: -60, borderRadius: 60, pointerEvents: 'none',
      background: `radial-gradient(ellipse, ${glowColor || 'rgba(215,119,87,0.1)'} 0%, transparent 70%)`,
      filter: 'blur(30px)', zIndex: 0,
      transition: 'background 0.5s',
    }}),
    // Terminal window
    React.createElement('div', { style: {
      position: 'relative', zIndex: 1, background: '#1a1918', borderRadius: 12, overflow: 'hidden',
      boxShadow: `0 20px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05), 0 0 60px ${glowColor || 'rgba(215,119,87,0.08)'}`,
    }},
      // Title bar
      React.createElement('div', { style: { background: '#252321', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 } },
        React.createElement('div', { style: { width: 12, height: 12, borderRadius: '50%', background: '#ff5f56' } }),
        React.createElement('div', { style: { width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' } }),
        React.createElement('div', { style: { width: 12, height: 12, borderRadius: '50%', background: '#27ca40' } }),
        React.createElement('span', { style: { marginLeft: 'auto', color: COLORS.gray, fontSize: 11, fontFamily: TERM.font } }, 'claude')),
      // Content
      React.createElement('div', { ref, style: {
        background: COLORS.termBg, padding: '16px 20px', fontFamily: TERM.font,
        fontSize: TERM.fontSize, lineHeight: TERM.lineHeight+'px', color: COLORS.termFg,
        whiteSpace: 'pre', width: width*TERM.charWidth+40, height: height*TERM.lineHeight+32,
        boxSizing: 'border-box', overflowY: 'auto', overflowX: 'hidden',
        position: 'relative',
      }},
        children,
        // Scanline overlay
        React.createElement('div', { style: {
          position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.03,
          background: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.1) 1px, rgba(255,255,255,0.1) 2px)',
        }}))));
}

// SplitSlide — text-left / terminal-right. FullCanvas-wrapped so it scales.
// Left at 38% (not 50) because ImmersiveTerminal renders ~590px wide at
// width=78ch and needs the room; overflow stays visible so the box-shadow
// halo can bleed past the 1024 canvas edge on widescreen.
function SplitSlide({ title, subtitle, bullets, children, visible, termGlow, continueVisible }) {
  return React.createElement(FullCanvas, { bg: BG_LIGHT, style: {
    display: 'flex', position: 'relative',
  }},
    React.createElement('div', { style: {
      width: '38%', flexShrink: 0, padding: '64px 40px 64px 56px',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      borderRight: '1px solid rgba(15,12,8,0.06)',
      opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : 'translateX(-16px)',
      transition: 'all 0.6s cubic-bezier(0.22,1,0.36,1)',
    }},
      React.createElement('h2', { style: {
        color: TEXT_PRIMARY, fontSize: 34, fontWeight: 400, letterSpacing: '-0.02em', marginBottom: 16,
        fontFamily: 'Anthropic Sans, system-ui, sans-serif', lineHeight: 1.2,
      }}, title),
      subtitle && React.createElement('p', { style: {
        color: TEXT_SECONDARY, fontSize: 15, lineHeight: 1.6, marginBottom: 24,
        fontFamily: 'Anthropic Sans, system-ui, sans-serif',
      }}, subtitle),
      bullets && React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 12 } },
        bullets.map(function(b, i) {
          return React.createElement('div', { key: i, style: { display: 'flex', gap: 10, alignItems: 'flex-start' } },
            React.createElement('span', { style: { color: CLAY, fontSize: 9, marginTop: 6, flexShrink: 0 } }, '\u25cf'),
            React.createElement('span', { style: { color: TEXT_SECONDARY, fontSize: 14, lineHeight: 1.5, fontFamily: 'Anthropic Sans, system-ui, sans-serif' } }, b));
        }))),
    React.createElement('div', { style: {
      flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '32px 20px 32px 16px', position: 'relative', minWidth: 0,
    }},
      React.createElement('div', { style: {
        position: 'absolute', inset: -20, borderRadius: 40, pointerEvents: 'none',
        background: 'radial-gradient(ellipse, ' + (termGlow || 'rgba(215,119,87,0.04)') + ' 0%, transparent 70%)',
        filter: 'blur(20px)',
      }}),
      React.createElement('div', { style: {
        position: 'relative',
        opacity: visible ? 1 : 0, transform: visible ? 'translateX(0) scale(1)' : 'translateX(20px) scale(0.97)',
        transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s',
      }}, children)),
    continueVisible && React.createElement(ContinueHint, { visible: true }));
}

function Slide_LinaAgenda(props) {
  var active = props.active;
  const items = ['Introduction to Claude Code', 'How to Work with Claude Code', 'Context Management', 'Common Workflows', 'Appendix'];
  const v = useStagger3(active, items.length + 2, 100, 100);
  return React.createElement(FullCanvas, { bg: BG_LIGHT, style: {
    display: 'flex',
    fontFamily: 'Anthropic Sans, system-ui, sans-serif', padding: '80px 100px',
  }},
    React.createElement('div', { style: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' } },
      React.createElement(Fade3, { vis: v.includes(0) },
        React.createElement('p', { style: { color: CLAY, fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 } }, 'Agenda')),
      React.createElement(Fade3, { vis: v.includes(1) },
        React.createElement('h2', { style: { color: TEXT_PRIMARY, fontSize: 42, fontWeight: 300, marginBottom: 44, letterSpacing: '-0.02em' } }, "Today's Session")),
      items.map((item, i) => {
        const isFirst = i === 0;
        const isVis = v.includes(i+2);
        return React.createElement('div', { key: i, style: {
          display: 'flex', alignItems: 'center', gap: 20, padding: '14px 0',
          borderBottom: '1px solid rgba(15,12,8,0.06)',
          opacity: isVis ? 1 : 0, transform: isVis ? 'translateX(0)' : 'translateX(-20px)',
          transition: 'all 0.5s cubic-bezier(0.22,1,0.36,1)',
        }},
          React.createElement('span', { style: { color: isFirst ? CLAY : TEXT_SECONDARY, fontSize: 13, fontFamily: TERM.font, minWidth: 28, fontWeight: 600 } }, String(i+1).padStart(2,'0')),
          React.createElement('span', { style: { color: isFirst ? TEXT_PRIMARY : TEXT_SECONDARY, fontSize: 20, fontWeight: isFirst ? 500 : 300 } }, item));
      })));
}

function Slide_BashMode(props) {
  var active = props.active, skipEntrance = props.skipEntrance, crabPhase = props.crabPhase;
  const { t, f, reset } = useTimer3(active);
  const pRef = React.useRef(new Set());
  const [phase, setPhase] = React.useState('intro');
  const [tS, setTS] = React.useState(null);
  const [history, setHistory] = React.useState([]);
  const [spinner, setSpinner] = React.useState(null);
  const [done, setDone] = React.useState(false);
  const [shake, setShake] = React.useState(false);
  const [failGlow, setFailGlow] = React.useState(false);

  React.useEffect(() => {
    if (!active) { reset(); pRef.current = new Set(); setPhase('intro'); setTS(null); setHistory([]); setSpinner(null); setDone(false); setShake(false); setFailGlow(false); }
  }, [active]);

  const evts = [
    { time: 800, fn: () => setPhase('ready') },
    { time: 1400, fn: () => { setPhase('typing'); setTS(1400); } },
    { time: 2600, fn: () => { setPhase('running'); setHistory([{ t:'cmd', x:'git status' }]); } },
    { time: 3100, fn: () => setHistory(h => [...h,
      { t:'out', x:'On branch feature/oauth2' },
      { t:'out', x:'' },
      { t:'git-mod', x:'modified:   src/auth.ts' },
      { t:'git-mod', x:'modified:   src/auth-callback.ts' },
      { t:'git-new', x:'new file:   src/oauth-config.ts' },
    ]) },
    { time: 4000, fn: () => setHistory(h => [...h, { t:'out', x:'' }, { t:'sum', x:'3 files changed (2 modified, 1 new)' }]) },
    { time: 4600, fn: () => { setSpinner('Analyzing'); } },
    { time: 5800, fn: () => {
      setSpinner(null);
      setHistory(h => [...h,
        { t:'asst', x:'You have 3 files changed on the feature/oauth2 branch.' },
        { t:'asst2', x:'The auth refactor looks ready. Want me to commit and push?' }]);
      setDone(true);
    }},
  ];
  React.useEffect(() => { evts.forEach((e,i) => { if (!pRef.current.has(i) && t >= e.time) { pRef.current.add(i); e.fn(); } }); }, [t]);

  const tp = tS ? Math.min(1,(t-tS)/900) : 0;

  const vis = phase !== 'intro';

  return React.createElement(SplitSlide, {
    title: 'Bash Mode',
    subtitle: 'Use ! to run bash commands yourself \u2014 may be faster than asking the model.',
    bullets: ['! prefix to run any shell command', 'Command and results are shown to the model', 'Reference output in later conversation'],
    visible: vis || skipEntrance, continueVisible: done,
    termGlow: failGlow ? 'rgba(255,80,80,0.12)' : done ? 'rgba(78,186,101,0.08)' : undefined,
  },
    React.createElement(ImmersiveTerminal, { width: 78, height: 28, phase, shake,
      glowColor: failGlow ? 'rgba(255,80,80,0.15)' : done ? 'rgba(78,186,101,0.1)' : undefined },
      React.createElement(Spacer, null), React.createElement(ClawdLogo, { crabPhase: crabPhase }), React.createElement(Spacer, { lines: 2 }),
      history.map((h,i) => {
        if (h.t === 'cmd') return React.createElement(React.Fragment, { key: i },
          React.createElement(Line, null, React.createElement('span', { style: { color: BASH_PINK, opacity: 0.6 } }, '─'.repeat(80))),
          React.createElement(Line, null, React.createElement('span', { style: { color: BASH_PINK } }, '! '), React.createElement(Bold, null, h.x)),
          React.createElement(Line, null, React.createElement('span', { style: { color: BASH_PINK, opacity: 0.6 } }, '─'.repeat(80))),
          React.createElement(Spacer, null));
        if (h.t === 'out') return React.createElement(Line, { key: i }, h.x);
        if (h.t === 'git-mod') return React.createElement(Line, { key: i },
          React.createElement('span', { style: { color: COLORS.yellow || '#ffbd2e' } }, '  modified: '),
          React.createElement('span', null, h.x.replace('modified:   ', '')));
        if (h.t === 'git-new') return React.createElement(Line, { key: i },
          React.createElement(Green, null, '  new file: '),
          React.createElement('span', null, h.x.replace('new file:   ', '')));
        if (h.t === 'sum') return React.createElement(React.Fragment, { key: i }, React.createElement(Line, null, React.createElement(Bold, null, h.x)), React.createElement(Spacer, null));
        if (h.t === 'asst') return React.createElement(Line, { key: i }, React.createElement(AssistantBullet, null), h.x);
        if (h.t === 'asst2') return React.createElement(React.Fragment, { key: i }, React.createElement(Line, null, '  ', h.x), React.createElement(Spacer, null));
        return null;
      }),
      spinner && React.createElement(Spin3, { verb: spinner, frame: f }),
      phase === 'typing' ? React.createElement(TypedBash, { text: 'git status', progress: tp })
        : (phase === 'intro' || phase === 'ready' || done) && React.createElement(BashInputBox, null),
      React.createElement(Spread, {
        left: React.createElement('span', null, '  ', React.createElement('span', { style: { color: BASH_PINK } }, '! for bash mode')),
        right: React.createElement(Gray, null, 'opus · auto'),
      })));
}

function Slide_Screenshots(props) {
  var active = props.active, skipEntrance = props.skipEntrance, crabPhase = props.crabPhase;
  const { t, f, reset } = useTimer3(active);
  const pRef = React.useRef(new Set());
  const [phase, setPhase] = React.useState('intro');
  const [tS, setTS] = React.useState(null);
  const [lines, setLines] = React.useState([]);
  const [spinner, setSpinner] = React.useState(null);
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    if (!active) { reset(); pRef.current = new Set(); setPhase('intro'); setTS(null); setLines([]); setSpinner(null); setDone(false); }
  }, [active]);

  const evts = [
    { time: 800, fn: () => setPhase('ready') },
    { time: 1400, fn: () => setLines([{ t:'img' }]) },
    { time: 2000, fn: () => { setPhase('typing'); setTS(2000); } },
    { time: 3800, fn: () => { setPhase('working'); setSpinner('Analyzing image'); } },
    { time: 5200, fn: () => {
      setSpinner(null);
      setLines(l => [...l,
        { t:'asst', x:'I can see the login button is misaligned \u2014 it\u2019s 8px off from the form inputs.' },
        { t:'asst2', x:'Looking at LoginForm.tsx, line 42 has margin-left: 8px that shouldn\u2019t be there.' },
        { t:'asst2', x:'Want me to fix it?' },
      ]);
      setDone(true);
    }},
  ];
  React.useEffect(() => { evts.forEach((e,i) => { if (!pRef.current.has(i) && t >= e.time) { pRef.current.add(i); e.fn(); } }); }, [t]);

  const tp = tS ? Math.min(1,(t-tS)/1400) : 0;
  const vis = phase !== 'intro';

  return React.createElement(SplitSlide, {
    title: 'Screenshots',
    subtitle: 'Drag images into the terminal or paste from clipboard \u2014 Claude sees what you see.',
    bullets: [
      'Mac: Cmd+Ctrl+Shift+4 to copy, Ctrl+V to paste (not Cmd+V)',
      'Windows: Win+Shift+S to copy, Ctrl+V to paste',
      'Drag and drop image files directly into the terminal',
    ],
    visible: vis || skipEntrance, continueVisible: done,
  },
    React.createElement(ImmersiveTerminal, { width: 78, height: 28, phase },
      React.createElement(Spacer, null),
      React.createElement(ClawdLogo, { crabPhase: crabPhase }),
      React.createElement(Spacer, { lines: 2 }),
      lines.map((l,i) => {
        if (l.t === 'img') return React.createElement(React.Fragment, { key: i },
          React.createElement(Line, null, '  ',
            React.createElement('span', { style: { color: COLORS.blue, background: 'rgba(177,185,249,0.15)', padding: '2px 8px', borderRadius: 4 } },
              '[Image #1 pasted: screenshot.png]')),
          React.createElement(Spacer, null));
        if (l.t === 'asst') return React.createElement(React.Fragment, { key: i },
          React.createElement(Spacer, null),
          React.createElement(Line, null, React.createElement(AssistantBullet, null), l.x));
        if (l.t === 'asst2') return React.createElement(Line, { key: i }, '  ', l.x);
        return null;
      }),
      spinner && React.createElement(Spin3, { verb: spinner, frame: f }),
      (phase === 'intro' || phase === 'ready') && React.createElement(InputBox, { placeholder: 'Paste an image or type a message...' }),
      phase === 'typing' && React.createElement(Typed3, { text: 'the login button looks misaligned, can you fix it?', progress: tp }),
      React.createElement(StatusBar, { leftHint: 'Ctrl+V to paste image', rightStatus: 'opus · auto' })));
}

function Slide_AtFile(props) {
  var active = props.active;
  return (
    <FullCanvas bg="#FAF9F5" style={{
      color: '#141413',
      fontFamily: "'Anthropic Sans', system-ui, sans-serif",
      display: 'flex', flexDirection: 'column', padding: '60px 80px',
    }}>
      <span style={{
        display: 'inline-block', fontSize: 11, fontWeight: 600,
        textTransform: 'uppercase', letterSpacing: '0.08em',
        padding: '4px 12px', borderRadius: 4, marginBottom: 16, alignSelf: 'flex-start',
        background: 'rgba(217,119,87,0.15)', color: '#D97757',
      }}>Context</span>
      <h2 style={{ fontSize: 36, fontWeight: 550, marginBottom: 12, letterSpacing: '-0.01em' }}>@-file mentions</h2>
      <p style={{ fontSize: 15, opacity: 0.55, marginBottom: 48 }}>Inject file contents directly into your prompt — no tool call round trip</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, flex: 1, alignContent: 'start' }}>
        <div style={{ background: '#fff', border: '0.5px solid rgba(31,30,29,0.12)', borderRadius: 16, borderLeft: '4px solid #D97757', padding: '32px 28px' }}>
          <div style={{ fontFamily: 'monospace', fontSize: 28, color: '#D97757', marginBottom: 16, fontWeight: 600 }}>@filename</div>
          <p style={{ fontSize: 15, opacity: 0.65, lineHeight: 1.7 }}>
            Contents are automatically injected into the prompt at send time. Faster and more reliable than asking Claude to read the file.
          </p>
          <div style={{ display: 'flex', gap: 8, marginTop: 24, flexWrap: 'wrap' }}>
            {['@src/auth.ts', '@README.md', '@package.json'].map((f, i) => (
              <span key={i} style={{
                fontFamily: 'monospace', fontSize: 12, background: 'rgba(217,119,87,0.08)',
                color: '#D97757', padding: '4px 10px', borderRadius: 6,
              }}>{f}</span>
            ))}
          </div>
        </div>
        <div style={{ background: '#fff', border: '0.5px solid rgba(31,30,29,0.12)', borderRadius: 16, borderLeft: '4px solid rgba(20,20,19,0.12)', padding: '32px 28px', opacity: 0.65 }}>
          <div style={{ fontSize: 16, marginBottom: 16, fontStyle: 'italic', opacity: 0.7, lineHeight: 1.5 }}>
            "Hey can you look at Foo.tsx and fix the rendering bug?"
          </div>
          <p style={{ fontSize: 15, opacity: 0.6, lineHeight: 1.7 }}>
            Without @-mentions, Claude calls <span style={{ fontFamily: 'monospace', fontSize: 13, background: 'rgba(20,20,19,0.06)', padding: '2px 6px', borderRadius: 4 }}>Read(Foo.tsx)</span> — adding a tool call round trip before it can start working.
          </p>
        </div>
      </div>
    </FullCanvas>
  );
}


function Slide_ContextCompact(props) {
  var active = props.active;
  return (
    <StubSlide tag="Context management" title="Curate your context">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 700, flex: 1, justifyContent: 'center' }}>
        {[
          ['/context', 'Visualize what\'s in your context window — check tools and MCPs'],
          ['/compact', 'Summarize and compress current context to a smaller size'],
          ['/clear', 'Wipe the slate clean — start fresh'],
          ['/resume', 'Pick up a previous session in this directory where you left off'],
        ].map(([cmd, desc], i) => (
          <div key={i} style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <div style={{ fontFamily: 'monospace', fontSize: 16, minWidth: 120, textAlign: 'center', background: 'rgba(217,119,87,0.1)', color: '#D97757', padding: '8px 16px', borderRadius: 4, fontWeight: 550 }}>{cmd}</div>
            <p style={{ fontSize: 15, opacity: 0.65, lineHeight: 1.5 }}>{desc}</p>
          </div>
        ))}
      </div>
    </StubSlide>
  );
}


function Slide_Resume(props) {
  var active = props.active;
  return (
    <FullCanvas bg="#141413" style={{
      color: '#FAF9F5',
      fontFamily: "'Anthropic Sans', system-ui, sans-serif",
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
    }}>
      <div style={{ fontFamily: 'monospace', fontSize: 28, color: '#D97757', background: 'rgba(217,119,87,0.15)', padding: '12px 32px', borderRadius: 12, marginBottom: 24, fontWeight: 550 }}>/resume</div>
      <h2 style={{ fontSize: 32, fontWeight: 400, marginBottom: 12 }}>Pick up where you left off</h2>
      <p style={{ fontSize: 15, opacity: 0.5, maxWidth: 500, lineHeight: 1.5 }}>Looks through previous sessions in your current working directory and continues the conversation</p>
    </FullCanvas>
  );
}


function Slide_AskDocs(props) {
  var active = props.active;
  var CLAY_C = '#D97757';
  var linkStyle = { color: '#6A9BCC', textDecoration: 'underline' };

  function chatMsg(isAI, content) {
    return React.createElement('div', { style: { display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 14 } },
      React.createElement('div', { style: {
        width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
        background: isAI ? '#141413' : '#fff', border: isAI ? 'none' : '1.5px solid #141413',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 10, fontWeight: 600, color: isAI ? '#fff' : '#141413',
      }}, isAI ? 'A\\' : '\u25CF'),
      React.createElement('div', { style: { fontSize: 11, lineHeight: 1.5, color: '#3A3935', flex: 1 } }, content));
  }

  return React.createElement(FullCanvas, { bg: '#FAF9F5', style: {
    display: 'flex',
    fontFamily: "'Anthropic Sans', system-ui, sans-serif",
  }},
    // Left: text content
    React.createElement('div', { style: { flex: '0 0 42%', padding: '64px 40px 64px 60px', display: 'flex', flexDirection: 'column' } },
      React.createElement('h2', { style: { fontSize: 38, fontWeight: 600, marginBottom: 36, color: '#141413', letterSpacing: '-0.01em' } }, 'Ask Claude!'),
      React.createElement('p', { style: { fontSize: 18, lineHeight: 1.6, color: '#141413', marginBottom: 12 } },
        'If you only remember one thing from today, it\u2019s that you should use the ',
        React.createElement('strong', null, '\u201CAsk Claude\u201D'),
        ' feature at'),
      React.createElement('a', { href: 'https://code.claude.com/docs', style: Object.assign({}, linkStyle, { fontSize: 18, marginBottom: 48, display: 'block' }) },
        'https://code.claude.com/docs'),
      React.createElement('p', { style: { fontSize: 18, lineHeight: 1.6, color: '#141413', marginBottom: 48 } },
        'Ask questions about features, behaviors, how to do X, etc\u2026'),
      React.createElement('p', { style: { fontSize: 18, lineHeight: 1.5, fontWeight: 600, color: '#141413', marginBottom: 10 } },
        'Want to get developer updates? Sign up for the Anthropic Developer Newsletter!'),
      React.createElement('a', { href: 'https://www.anthropic.com/newsletter/developers', style: Object.assign({}, linkStyle, { fontSize: 14 }) },
        'https://www.anthropic.com/newsletter/developers')),
    // Right: chat widget mockup on clay background
    React.createElement('div', { style: { flex: 1, background: CLAY_C, padding: '40px 30px', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
      React.createElement('div', { style: {
        width: '100%', maxWidth: 460, background: '#fff', borderRadius: 10, padding: '18px 20px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column',
      }},
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid rgba(15,12,8,0.08)' } },
          React.createElement('span', { style: { fontSize: 12, color: '#8A8985' } }, 'Ask AI'),
          React.createElement('span', { style: { fontSize: 11, color: '#8A8985' } }, '\u2728 Ask Claude')),
        chatMsg(true, React.createElement(React.Fragment, null,
          'Hi!', React.createElement('br'), React.createElement('br'),
          'I\u2019m an AI assistant trained on documentation, help articles, and other content.',
          React.createElement('br'), React.createElement('br'),
          'Ask me anything about ',
          React.createElement('span', { style: { background: '#141413', color: '#fff', padding: '1px 6px', borderRadius: 3, fontSize: 10 } }, 'Claude'))),
        chatMsg(false, 'I seem to be hitting a weird bug where WebFetch exists and is fine, but WebSearch has disappeared as a tool. /doctor shows no issues. Any ideas?'),
        chatMsg(true, React.createElement(React.Fragment, null,
          'Based on the documentation, WebSearch is a distinct tool from WebFetch in Claude Code. ',
          React.createElement('span', { style: { borderBottom: '2px solid ' + CLAY_C } },
            'The web search tool requires your organization\u2019s administrator to enable it in the Anthropic Console.'),
          React.createElement('br'), React.createElement('br'),
          React.createElement('strong', null, 'WebSearch vs WebFetch:'),
          React.createElement('ul', { style: { margin: '6px 0 0 0', paddingLeft: 16 } },
            React.createElement('li', null, 'WebSearch is listed as requiring permission in the tools table'),
            React.createElement('li', null, 'WebFetch is also listed as requiring permission but operates differently')))),
        React.createElement('div', { style: {
          marginTop: 12, padding: '10px 14px', background: '#F5F3EE', borderRadius: 6,
          fontSize: 11, color: '#8A8985', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }},
          React.createElement('span', null, 'How do I get started?'),
          React.createElement('span', { style: { opacity: 0.5 } }, '\u27A4')))));
}

function Slide_AdaptiveThink(props) {
  var active = props.active;
  var levels = [
    { level: 'Low', desc: 'Fast & cheap — straightforward tasks', color: '#27ca40', bar: '20%' },
    { level: 'Medium', desc: 'Balanced reasoning \u2014 explicit opt-in on Opus 4.7 (adaptive thinking is off by default)', color: '#D97757', bar: '55%' },
    { level: 'High', desc: 'Deep reasoning — complex problems', color: '#E53935', bar: '95%' },
  ];
  return (
    React.createElement(StubSlide, { tag: 'Reasoning', title: 'Adaptive Thinking', subtitle: 'Opus 4.7 and Sonnet 4.6 dynamically allocate thinking tokens based on task complexity' },
      React.createElement('div', { style: { display: 'flex', gap: 20, marginBottom: 28 } },
        levels.map(function(l, i) {
          return React.createElement('div', { key: i, style: { flex: 1, background: '#fff', border: '0.5px solid rgba(31,30,29,0.12)', borderRadius: 12, padding: '20px 20px 16px' } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 } },
              React.createElement('span', { style: { width: 8, height: 8, borderRadius: '50%', background: l.color, display: 'inline-block' } }),
              React.createElement('h3', { style: { fontSize: 15, fontWeight: 600 } }, l.level)),
            React.createElement('p', { style: { fontSize: 11.5, opacity: 0.55, lineHeight: 1.4, marginBottom: 12 } }, l.desc),
            React.createElement('div', { style: { background: 'rgba(20,20,19,0.06)', borderRadius: 4, height: 6, overflow: 'hidden' } },
              React.createElement('div', { style: { width: l.bar, height: '100%', background: l.color, borderRadius: 4, opacity: 0.7 } })),
            React.createElement('p', { style: { fontSize: 10, opacity: 0.35, marginTop: 4 } }, 'thinking tokens'));
        })),
      React.createElement('div', { style: { background: '#fff', border: '0.5px solid rgba(31,30,29,0.12)', borderRadius: 12, padding: '20px 24px', marginBottom: 20 } },
        React.createElement('h3', { style: { fontSize: 13, fontWeight: 600, marginBottom: 12 } }, 'Setting effort level'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 } },
          [
            ['/model', 'Use \u2190/\u2192 arrow keys to adjust the effort slider'],
            ['Environment variable', 'CLAUDE_CODE_EFFORT_LEVEL=low|medium|high'],
            ['Settings file', 'Set effortLevel in your settings'],
          ].map(function(item, i) {
            return React.createElement('div', { key: i },
              React.createElement('p', { style: { fontSize: 12, fontWeight: 600, marginBottom: 4 } }, item[0]),
              React.createElement('p', { style: { fontSize: 11, opacity: 0.5, lineHeight: 1.4 } }, item[1]));
          }))),
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: 'rgba(217,119,87,0.08)', borderRadius: 8 } },
        React.createElement('span', { style: { fontSize: 13 } }, '\uD83D\uDCA1'),
        React.createElement('p', { style: { fontSize: 11.5, opacity: 0.6, lineHeight: 1.4 } },
          'Current effort level is shown next to the logo and spinner (e.g. "with low effort"). To disable adaptive reasoning, set ',
          React.createElement('code', { style: { background: 'rgba(20,20,19,0.08)', padding: '1px 6px', borderRadius: 4, fontFamily: 'monospace', fontSize: 11 } }, 'CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING=1')))));
}


function Slide_WebCliDesktop(props) {
  var active = props.active;
  var surfaces = [
    { name: 'CLI', color: '#D97757', tagline: 'Your terminal, full control',
      best: ['Active local development', 'Full filesystem + shell access', 'IDE integration via extensions', 'Custom MCP servers and hooks'],
      pick: 'You\u2019re at your machine and want Claude working alongside you in the repo.' },
    { name: 'Web', color: '#6A9BCC', tagline: 'Cloud-based, access anywhere',
      best: ['Delegating tasks while away', 'Reviewing PRs from any device', 'No local setup required', 'Runs in isolated cloud sandbox'],
      pick: 'You want to kick off work from your phone or a machine without your dev environment.' },
    { name: 'Desktop', color: '#7A9B6F', tagline: 'Native app, local + managed',
      best: ['GUI without terminal setup', 'Local filesystem access', 'Managed updates and auth', 'Multiple sessions in one window'],
      pick: 'You want local access with a visual interface instead of living in the terminal.' },
  ];

  function surfaceCard(s) {
    return React.createElement('div', { style: {
      flex: 1, background: '#fff', borderRadius: 12,
      border: '1px solid rgba(15,12,8,0.08)', borderTop: '4px solid ' + s.color,
      padding: '22px 20px', display: 'flex', flexDirection: 'column',
    }},
      React.createElement('h3', { style: { fontSize: 22, fontWeight: 600, color: '#141413', marginBottom: 4 } }, s.name),
      React.createElement('p', { style: { fontSize: 12, color: s.color, fontWeight: 550, marginBottom: 16 } }, s.tagline),
      React.createElement('p', { style: { fontSize: 11, fontWeight: 600, color: '#8A8985', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 } }, 'Best for'),
      React.createElement('ul', { style: { margin: 0, paddingLeft: 16, marginBottom: 18, flex: 1 } },
        s.best.map(function(b, i) {
          return React.createElement('li', { key: i, style: { fontSize: 13, lineHeight: 1.6, color: '#5A5955', marginBottom: 4 } }, b);
        })),
      React.createElement('div', { style: { background: '#F5F3EE', borderRadius: 6, padding: '12px 14px' } },
        React.createElement('p', { style: { fontSize: 11, fontWeight: 600, color: '#8A8985', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 } }, 'Pick this when'),
        React.createElement('p', { style: { fontSize: 12, lineHeight: 1.5, color: '#3A3935' } }, s.pick)));
  }

  return React.createElement(StubSlide, {
    title: 'When to use CC Web vs. CLI vs. Desktop',
    subtitle: 'Choosing the right surface for your workflow'
  },
    React.createElement('div', { style: { display: 'flex', gap: 20, flex: 1 } },
      surfaces.map(function(s, i) { return React.createElement(React.Fragment, { key: i }, surfaceCard(s)); })));
}

function Slide_KeepClaudeMd(props) {
  var active = props.active;
  var GREEN_C = '#7A9B6F';
  var mono = { fontFamily: 'monospace', color: GREEN_C };

  function termLine(bullet, content, sub) {
    return React.createElement('div', { style: { marginBottom: sub ? 2 : 10 } },
      bullet && React.createElement('span', { style: { color: bullet === 'g' ? '#4eba65' : '#fff', marginRight: 6 } }, '\u25CF'),
      content,
      sub && React.createElement('div', { style: { color: '#8A8985', paddingLeft: 18 } }, '\u2514 ', sub));
  }

  return React.createElement(FullCanvas, { bg: '#FAF9F5', style: {
    display: 'flex',
    fontFamily: "'Anthropic Sans', system-ui, sans-serif",
  }},
    // Left: three methods
    React.createElement('div', { style: { flex: '0 0 42%', padding: '64px 40px 64px 60px', display: 'flex', flexDirection: 'column', gap: 28 } },
      React.createElement('h2', { style: { fontSize: 32, fontWeight: 600, color: '#141413', letterSpacing: '-0.01em', marginBottom: 8 } },
        'Keeping CLAUDE.md up-to-date'),

      React.createElement('div', null,
        React.createElement('h3', { style: { fontSize: 18, fontWeight: 600, marginBottom: 8, fontFamily: 'monospace', color: '#141413' } }, '/revise-claude-md'),
        React.createElement('p', { style: { fontSize: 15, lineHeight: 1.6, color: '#3A3935' } },
          'Asks Claude to update its own CLAUDE.md file based on recent changes. We use this before committing changes in the Anthropic repo!')),

      React.createElement('div', null,
        React.createElement('h3', { style: { fontSize: 18, fontWeight: 600, marginBottom: 8, fontFamily: 'monospace', color: '#141413' } }, '# inline edits'),
        React.createElement('p', { style: { fontSize: 15, lineHeight: 1.6, color: '#3A3935' } },
          'Start any message with ', React.createElement('code', { style: mono }, '#'),
          ' to add a memory directly to CLAUDE.md mid-session \u2014 ',
          React.createElement('code', { style: Object.assign({}, mono, { display: 'inline-block' }) }, '#\u00A0always use pnpm, not npm'))),

      React.createElement('div', null,
        React.createElement('h3', { style: { fontSize: 18, fontWeight: 600, marginBottom: 8, color: '#141413' } }, 'Review periodically'),
        React.createElement('p', { style: { fontSize: 15, lineHeight: 1.6, color: '#3A3935' } },
          'Run ', React.createElement('code', { style: mono }, '/memory'),
          ' to open and edit CLAUDE.md directly. Prune stale entries, reorganize sections, promote learned patterns to team-shared instructions.'))),

    // Right: terminal mockup
    React.createElement('div', { style: { flex: 1, background: '#E8E4D9', padding: '50px 40px', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
      React.createElement('div', { style: {
        width: '100%', background: '#1a2f33', borderRadius: 10, overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0,0,0,0.25)', fontFamily: 'monospace', fontSize: 12, color: '#c8d4d6',
      }},
        React.createElement('div', { style: { background: '#fff', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 6 } },
          React.createElement('span', { style: { width: 10, height: 10, borderRadius: '50%', background: '#ff5f56' } }),
          React.createElement('span', { style: { width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e' } }),
          React.createElement('span', { style: { width: 10, height: 10, borderRadius: '50%', background: '#27c93f' } }),
          React.createElement('span', { style: { marginLeft: 12, fontSize: 12, fontWeight: 600, color: '#141413', fontFamily: "'Anthropic Sans', sans-serif" } }, '\u2731 Revise CLAUDE.md')),
        React.createElement('div', { style: { padding: '16px 18px', lineHeight: 1.7 } },
          React.createElement('div', { style: { background: '#2a3f43', padding: '4px 10px', borderRadius: 4, display: 'inline-block', marginBottom: 12 } },
            React.createElement('span', { style: { color: '#fff' } }, '\u203A /revise-claude-md')),
          termLine('g', React.createElement('span', null, React.createElement('span', { style: { color: '#fff', fontWeight: 600 } }, 'Skill'), '(/revise-claude-md)'),
            'Successfully loaded skill \u00B7 3 tools allowed'),
          termLine('w', 'Let me review what happened this session and check for relevant CLAUDE.md files.'),
          termLine('g', React.createElement('span', null, React.createElement('span', { style: { color: '#fff', fontWeight: 600 } }, 'Search'), '(pattern: "**/CLAUDE.md")'),
            'Found 1 file (ctrl+o to expand)'),
          termLine('g', React.createElement('span', null, React.createElement('span', { style: { color: '#fff', fontWeight: 600 } }, 'Read'), '(', React.createElement('span', { style: { textDecoration: 'underline dotted' } }, 'claude-cafe/CLAUDE.md'), ')'),
            'Read 63 lines'),
          termLine('w', React.createElement('span', { style: { fontWeight: 600, color: '#fff' } }, 'Session Review')),
          React.createElement('div', { style: { marginTop: 8, paddingLeft: 4 } },
            React.createElement('div', { style: { fontWeight: 600, color: '#fff', marginBottom: 4 } }, 'What happened:'),
            React.createElement('div', null, '1. You refactored the checkout flow to use the new ', React.createElement('span', { style: { color: '#6A9BCC' } }, 'PaymentService'), ' API'),
            React.createElement('div', null, '2. You switched the test runner from jest to ', React.createElement('span', { style: { color: '#6A9BCC' } }, 'vitest')),
            React.createElement('div', null, '3. You added a new lint rule requiring explicit return types'))))));
}

Object.assign(window, {
  Slide_Section201, Slide_ClaudeMd, Slide_ClaudeMdNesting, Slide_PlanMode, Slide_Demo2,
  Slide_SpecTDD, Slide_Skills, Slide_SlashCmds, Slide_InputShortcuts, Slide_EffortLevels,
  Slide_AutoMemory, Slide_Demo3, Slide_Ex2, Slide_Hooks, Slide_HooksCatalog, Slide_Demo4, Slide_HooksSimDemo, Slide_DemoMCPReconcile, Slide_DemoLoop,
  Slide_ContextPrinciple, Slide_BundledFiles, Slide_MCPArch,
  Slide_SpecWorkflow, Slide_TDD, Slide_TDDWhy,
  Slide_Checkpointing, Slide_EffortTable, Slide_PromptingTips,
  Slide_LinaAgenda, Slide_BashMode, Slide_Screenshots, Slide_AtFile, Slide_ContextCompact,
  Slide_Resume, Slide_AskDocs, Slide_AdaptiveThink, Slide_WebCliDesktop, Slide_KeepClaudeMd,
});

} // end scoped block
