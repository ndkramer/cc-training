// ═══════════════════════════════════════════════════════════════
// DECK SLIDES — 301: SCALE & INTEGRATE (SHARED, PROFILE-DRIVEN)
// Subagents · MCP · C4E-only (Web/Mobile/Managed MCP) ·
// API auth · Plugins · Agent teams
//
// All customer-specific strings come from window.DECK_PROFILE.plugins.
// When a key is missing, a visible "[MISSING plugins.<key> IN PROFILE]"
// sentinel renders — matches ENH-017 discipline (no plausible-looking
// generic defaults). Required keys:
//   Slide_MCP / Slide_ManagedMCP / Slide_Ex3 / Slide_Demo6 — mcpServer
//   Slide_Demo6                                           — demoPrompt
//   Slide_CCMobile                                        — mobileHeading, yamlSample
//   Slide_Ex3                                             — ex3Repo, ex3Prompt, ex3ConfigPath
//   Slide_Plugins                                         — toolkit, skillName, mcpConfig,
//                                                           hookScript, description, author
//   Slide_Ex4                                             — toolkit, skillName
//   Slide_AgentTeams                                      — agentTeam.{route,file,testFile}
//   Slide_Demo7 (fallback beats path only)                — demo7Prompt
// ═══════════════════════════════════════════════════════════════

{
const CLAY = '#D97757', OAT = '#F0EEE6', DARK = '#141413', BONE = '#FAF9F5', GRAY = '#73726C';
const SERIF = "'Anthropic Serif', Georgia, serif";
const MONO = "'JetBrains Mono', monospace";
const H2 = { fontFamily: SERIF, fontSize: 32, fontWeight: 400, marginBottom: 24 };
const KICKER = { fontSize: 12, fontWeight: 600, color: CLAY, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 };
const SUB = { fontSize: 14, color: GRAY, marginBottom: 32, lineHeight: 1.5 };

// ── Section divider ───────────────────────────────────────────────
function Slide_Section301() {
  return (
    <SectionSlide
      number={3}
      title="Scale & Integrate"
      subtitle="Subagents, MCP, and running many Claudes at once"
      bg={DARK}
      color={BONE}
      lottieSrc="../_shared/assets/lottie/Node-Web.lottie"
    />
  );
}

// ── Parallel Patterns ─────────────────────────────────────────────
// Consolidated port of Intuit 301 Slides 16+17. Seq-vs-parallel motivation
// on top, three parallelization patterns below. This is the WHY before
// ParallelCompare's WHICH.
function Slide_ParallelPatterns() {
  const tasks = ['Implement', 'Test', 'Docs', 'Review'];
  const patterns = [
    { n: '01', title: 'Task decomposition',   best: 'Greenfield features',
      ex: 'Auth + API + data layer — three agents, one feature' },
    { n: '02', title: 'Horizontal scaling',   best: 'Migrations & refactors',
      ex: 'Same transform across ten services simultaneously' },
    { n: '03', title: 'Pipeline parallelism', best: 'Established codebases',
      ex: 'Code → review → test in overlapping stages' },
  ];
  const bar = { padding: '6px 10px', borderRadius: 4, fontSize: 10.5, textAlign: 'center' };
  const cmd = { fontFamily: MONO, fontSize: 10.5, color: CLAY };
  return (
    <Slide bg={BONE} label="Parallel patterns">
      <div style={KICKER}>Motivation</div>
      <h2 style={H2}>Why parallelize</h2>
      <p style={{ ...SUB, marginBottom: 20 }}>Independent work doesn't need to queue.</p>

      {/* Seq vs Parallel micro-diagram */}
      <div style={{
        display: 'flex', gap: 24, alignItems: 'stretch',
        padding: '16px 24px', background: '#fff', borderRadius: 10,
        border: '1px solid rgba(20,20,19,0.06)', marginBottom: 20,
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: GRAY, marginBottom: 8, textAlign: 'center' }}>Sequential</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {tasks.map((t, i) => <div key={i} style={{ ...bar, background: OAT, color: GRAY }}>{t}</div>)}
          </div>
          <div style={{ fontSize: 10, color: GRAY, textAlign: 'center', marginTop: 6 }}>Total: sum of all tasks</div>
        </div>
        <div style={{ width: 1, background: 'rgba(20,20,19,0.08)' }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: CLAY, marginBottom: 8, textAlign: 'center' }}>Parallel</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 3 }}>
            {tasks.map((t, i) => <div key={i} style={{
              ...bar, background: 'rgba(217,119,87,0.08)', color: CLAY,
              border: '1px solid rgba(217,119,87,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>{t}</div>)}
          </div>
          <div style={{ fontSize: 10, color: CLAY, textAlign: 'center', marginTop: 6, fontWeight: 600 }}>Total: longest task</div>
        </div>
      </div>

      {/* Three pattern cards */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, alignContent: 'start' }}>
        {patterns.map((p) => (
          <div key={p.n} style={{
            padding: '18px 16px', background: '#fff', borderRadius: 10,
            border: '1px solid rgba(20,20,19,0.06)',
            display: 'flex', flexDirection: 'column', gap: 8,
          }}>
            <div style={{ fontFamily: SERIF, fontSize: 28, fontWeight: 350, color: CLAY }}>{p.n}</div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{p.title}</div>
            <div style={{ fontSize: 11, color: GRAY, fontStyle: 'italic', lineHeight: 1.45, flex: 1 }}>{p.ex}</div>
            <span style={{
              alignSelf: 'flex-start', fontSize: 10, padding: '3px 9px', borderRadius: 999,
              background: 'rgba(217,119,87,0.08)', border: '1px solid rgba(217,119,87,0.18)', color: CLAY,
            }}>{p.best}</span>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 11.5, color: GRAY, marginTop: 14, textAlign: 'center' }}>
        Built-in fan-out: <code style={cmd}>/batch</code> for N-worktree migrations ·{' '}
        <code style={cmd}>/ultrareview</code> for cloud parallel review ·{' '}
        <code style={cmd}>/ultraplan</code> for cloud planning. You don't have to build the orchestration yourself.
      </p>
    </Slide>
  );
}

// ── Subagents ─────────────────────────────────────────────────────
// Ported from Intuit slides 5-7 (custom agents). Fan-out diagram:
// main context spawns Explore/Plan/general agents, each with its own
// isolated context window. Results flow back, noise stays out.
function Slide_Subagents() {
  const agents = [
    { name: 'Explore', desc: 'Fan out across a codebase. Read-only. Each reports back a summary.', color: '#7bb8d9' },
    { name: 'Plan',    desc: 'Architects a change. Reads deeply, writes nothing. Returns a plan.', color: CLAY },
    { name: 'General', desc: 'Full tool access. Use for self-contained tasks that would pollute your main context.', color: '#8fba6a' },
  ];
  return (
    <Slide bg={BONE} label="Subagents">
      <div style={KICKER}>Scale</div>
      <h2 style={H2}>Subagents protect your context</h2>
      <p style={{ ...SUB, maxWidth: 620 }}>
        Each subagent has its own context window. Exploration noise, long tool
        output, failed branches — none of it pollutes your main session.
      </p>
      <VCenter>
        {/* Fan-out diagram */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {/* Main context */}
          <div style={{
            padding: '28px 22px', background: DARK, color: BONE,
            borderRadius: 12, textAlign: 'center', minWidth: 150,
            boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
          }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Main session</div>
            <div style={{ fontSize: 11, opacity: 0.6, marginTop: 4 }}>your conversation</div>
            <div style={{
              marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(250,249,245,0.15)',
              fontSize: 10, fontFamily: MONO, opacity: 0.5, lineHeight: 1.6,
            }}>
              spawns agents<br/>receives summaries
            </div>
          </div>
          {/* Arrows */}
          <svg width="60" height="180" style={{ overflow: 'visible' }}>
            {[-60, 0, 60].map((dy, i) => (
              <g key={i}>
                <path d={`M 0 90 Q 30 90 60 ${90 + dy}`} stroke={agents[i].color} strokeWidth="2" fill="none" opacity="0.5" />
                <circle cx="60" cy={90 + dy} r="3" fill={agents[i].color} />
              </g>
            ))}
          </svg>
          {/* Agent boxes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {agents.map((a, i) => (
              <div key={i} style={{
                padding: '12px 16px', background: '#fff', borderRadius: 8,
                border: `1px solid ${a.color}`, borderLeft: `4px solid ${a.color}`,
                minWidth: 340,
              }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: a.color }}>{a.name} agent</div>
                <div style={{ fontSize: 11.5, color: GRAY, lineHeight: 1.4, marginTop: 2 }}>{a.desc}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{
          marginTop: 18, fontFamily: MONO, fontSize: 11, padding: '8px 14px',
          background: DARK, color: BONE, borderRadius: 6, display: 'flex',
          alignItems: 'center', gap: 14,
        }}>
          <span><span style={{ color: CLAY }}>●</span> 3 running</span>
          <span style={{ opacity: 0.4 }}>│</span>
          <span style={{ opacity: 0.7 }}>
            <span style={{ color: CLAY }}>/agents</span> {'→'} Running tab to watch them live · Library tab to launch
          </span>
        </div>
      </VCenter>
    </Slide>
  );
}

// ── Custom Agents ─────────────────────────────────────────────────
// Ported from Intuit 301 slides-1.jsx (Slide06a). The built-in Explore/Plan
// agents are general-purpose; this is how you define your own with a model,
// tool scope, and default prompt. Proper 301 depth — most users never get here.
function Slide_CustomAgents() {
  // Card helper — inline since InfoCard's icon layout is overkill here
  const Pt = ({ k, v }) => (
    <div style={{
      padding: '10px 14px', background: '#fff', borderRadius: 8,
      borderLeft: `3px solid ${CLAY}`, border: '1px solid rgba(20,20,19,0.06)',
    }}>
      <div style={{ fontSize: 12.5, fontWeight: 600, marginBottom: 3 }}>{k}</div>
      <div style={{ fontSize: 11.5, color: GRAY, lineHeight: 1.45 }}>{v}</div>
    </div>
  );
  return (
    <Slide bg={BONE} label="Custom agents">
      <div style={KICKER}>Scale · your own agent types</div>
      <h2 style={H2}>Define agents in <code style={{ fontFamily: MONO, fontSize: 26 }}>.claude/agents/</code></h2>
      <p style={{ ...SUB, maxWidth: 640 }}>
        Explore and Plan ship with Claude Code. When a team needs a repeatable agent
        — a reviewer, a migrator, a test-writer — drop a markdown file and launch it by name.
      </p>
      <VCenter>
        <div style={{ display: 'grid', gridTemplateColumns: '420px 1fr', gap: 24, alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <EditorMockup filename=".claude/agents/reviewer.md" width="100%">
              <ELine num={1}><Cmt>---</Cmt></ELine>
              <ELine num={2}><Kw>name</Kw><Punc>:</Punc> reviewer</ELine>
              <ELine num={3}><Kw>model</Kw><Punc>:</Punc> opus</ELine>
              <ELine num={4}><Kw>effort</Kw><Punc>:</Punc> high</ELine>
              <ELine num={5}><Kw>maxTurns</Kw><Punc>:</Punc> <Typ>20</Typ></ELine>
              <ELine num={6}><Kw>isolation</Kw><Punc>:</Punc> worktree</ELine>
              <ELine num={7}><Kw>background</Kw><Punc>:</Punc> <Typ>true</Typ></ELine>
              <ELine num={8}><Kw>memory</Kw><Punc>:</Punc> project</ELine>
              <ELine num={9}><Kw>mcpServers</Kw><Punc>:</Punc> <Punc>[</Punc>github-enterprise<Punc>]</Punc></ELine>
              <ELine num={10}><Kw>disallowedTools</Kw><Punc>:</Punc> <Punc>[</Punc>Write<Punc>,</Punc> Edit<Punc>]</Punc></ELine>
              <ELine num={11}><Kw>initialPrompt</Kw><Punc>:</Punc> <Str>"Review the open diff"</Str></ELine>
              <ELine num={12}><Cmt>---</Cmt></ELine>
              <ELine num={13}>Flag edge cases the tests don't cover.</ELine>
              <ELine num={14}>Check error paths. Report only — no edits.</ELine>
            </EditorMockup>
            <div style={{
              fontFamily: MONO, fontSize: 11.5, padding: '8px 12px',
              background: DARK, color: BONE, borderRadius: 6,
              display: 'flex', flexDirection: 'column', gap: 4,
            }}>
              <div><span style={{ color: GRAY }}>$</span> claude <span style={{ color: CLAY }}>--agent=reviewer</span></div>
              <div><span style={{ color: GRAY }}>{'>'}</span> <span style={{ color: CLAY }}>@reviewer</span> look at this diff <span style={{ color: GRAY }}> ← or in-prompt</span></div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Pt k="Model per agent"
                v={<><code style={{fontFamily: MONO, fontSize: 10.5}}>opus</code> for the reviewer, <code style={{fontFamily: MONO, fontSize: 10.5}}>haiku</code> for the formatter. Pay for depth where it matters.</>} />
            <Pt k="Scoped MCP"
                v="The reviewer gets GitHub. The migrator gets the DB. Least-privilege, enforced by config." />
            <Pt k="Runaway guard"
                v={<><code style={{fontFamily: MONO, fontSize: 10.5}}>maxTurns</code> caps how long it runs. Answers the "how do I stop it going forever" question.</>} />
            <Pt k="Tool blocklist"
                v={<><code style={{fontFamily: MONO, fontSize: 10.5}}>disallowedTools</code> — a reviewer that physically can't write. Enforced, not suggested.</>} />
            <Pt k="Background + memory"
                v={<><code style={{fontFamily: MONO, fontSize: 10.5}}>background: true</code> keeps it running while you work. <code style={{fontFamily: MONO, fontSize: 10.5}}>memory</code> scope persists what it learns between runs.</>} />
          </div>
        </div>
      </VCenter>
    </Slide>
  );
}

// ── Demo 5 ────────────────────────────────────────────────────────
// Profile-driven: SLB's well-monitor needs "parallel wells" not "parallel
// explore", different beats. Falls back to flag-service generic if unset.
function Slide_Demo5() {
  const d = (window.DECK_PROFILE && window.DECK_PROFILE.demo5) || {};
  return <DemoSlide n={d.n ?? 5} title={d.title || "Parallel Explore"} beats={d.beats || [
    { key: null, line: '"Map this repo: data model, API surface, test coverage"' },
    { key: null, line: '3 Explore agents fan out simultaneously' },
    { key: null, line: 'results merge back — no context window blowout' },
  ]} />;
}

// ── MCP ───────────────────────────────────────────────────────────
// Ported from Intuit (Slide22_MCPArch) + GE Vernova MCP slide.
// Simplified: Claude ↔ MCP server ↔ your systems. Genericized
// server names (no intuit-iam, no github.intuit.com).
function Slide_MCP() {
  const pl = (window.DECK_PROFILE && window.DECK_PROFILE.plugins) || {};
  const servers = [
    { name: pl.mcpServer || '[MISSING plugins.mcpServer IN PROFILE]',   backend: 'Your flag database',  color: CLAY },
    { name: 'github',       backend: 'PRs, issues, reviews', color: '#7bb8d9' },
    { name: 'postgres',     backend: 'Service databases',    color: '#8fba6a' },
  ];
  return (
    <Slide bg={BONE} label="MCP">
      <div style={KICKER}>Integrate</div>
      <h2 style={H2}>MCP — USB for tools</h2>
      <p style={{ ...SUB, maxWidth: 620 }}>
        Model Context Protocol. stdio or HTTP servers that expose typed tools.
        Claude calls them the same way it calls Read or Bash — but they hit <em>your</em> systems.
      </p>
      <VCenter>
        {/* Grid width PINNED = viewBox width → SVG coords map 1:1 to pixels.
            Without this, VCenter's alignItems:center shrinks the grid to
            intrinsic width (~530px) and preserveAspectRatio="none" squishes
            every x proportionally — curves land ~85px short of the boxes.

            Column arithmetic (gap 14):
              col1 (Claude)   0 → 150
              col2 (MCP)    164 → 234   pill has marginLeft:-14, visually ~150→172
              col3 (server) 248 → 388
              col4 (backend)402 → 562
            Rows: 3×56 + 2×10 = 188. Row centers at y = 28, 94, 160.
            Fan-out: start 172 (pill right edge) → 248 (col3 left edge).
            Dashed: 388 (col3 right) → 402 (col4 left). */}
        <div style={{
          display: 'grid', gridTemplateColumns: '150px 70px 140px 160px',
          gridTemplateRows: `repeat(${servers.length}, 56px)`,
          columnGap: 14, rowGap: 10, position: 'relative', width: 562,
        }}>
          <svg viewBox="0 0 562 188" preserveAspectRatio="none"
               style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
            {servers.map((s, i) => {
              const y = 28 + i * 66;
              return (
                <g key={i}>
                  <path d={`M 172 94 Q 210 94 210 ${y} L 248 ${y}`} stroke={s.color} strokeWidth="1.5" fill="none" opacity="0.4" />
                  <line x1="388" y1={y} x2="402" y2={y} stroke={s.color} strokeWidth="1.5" opacity="0.3" strokeDasharray="3 3" />
                </g>
              );
            })}
          </svg>

          {/* Col 1: Claude Code — spans all rows */}
          <div style={{ gridColumn: 1, gridRow: '1 / -1', display: 'flex', alignItems: 'center', zIndex: 1 }}>
            <div style={{
              width: 150, padding: '20px 14px', background: CLAY, color: '#fff',
              borderRadius: 10, textAlign: 'center', boxShadow: '0 3px 12px rgba(217,119,87,0.25)',
            }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Claude Code</div>
              <div style={{ fontSize: 10, opacity: 0.75, marginTop: 2 }}>MCP Client</div>
            </div>
          </div>

          {/* Col 2: Protocol pill */}
          <div style={{ gridColumn: 2, gridRow: '1 / -1', display: 'flex', alignItems: 'center', zIndex: 1, marginLeft: -14 }}>
            <div style={{
              writingMode: 'vertical-lr', transform: 'rotate(180deg)',
              padding: '16px 6px', background: DARK, color: BONE,
              borderRadius: 6, fontSize: 10, fontWeight: 700, letterSpacing: 2,
            }}>MCP</div>
          </div>

          {/* Col 3+4: server + backend per row */}
          {servers.map((s, i) => (
            <React.Fragment key={i}>
              <div style={{
                gridColumn: 3, gridRow: i + 1, zIndex: 1,
                padding: '0 14px', background: '#fff', borderRadius: 8,
                border: `1.5px solid ${s.color}`, borderLeftWidth: 4,
                display: 'flex', alignItems: 'center',
              }}>
                <div>
                  <div style={{ fontFamily: MONO, fontSize: 12, fontWeight: 600 }}>{s.name}</div>
                  <div style={{ fontSize: 10, color: GRAY }}>MCP Server</div>
                </div>
              </div>
              <div style={{
                gridColumn: 4, gridRow: i + 1, zIndex: 1,
                padding: '0 12px', background: 'rgba(20,20,19,0.03)',
                border: '1px dashed rgba(20,20,19,0.15)', borderRadius: 8,
                display: 'flex', alignItems: 'center',
              }}>
                <div style={{ fontSize: 11, color: GRAY }}>{s.backend}</div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </VCenter>
      <div style={{
        display: 'flex', gap: 12,
        padding: '10px 16px', background: 'rgba(217,119,87,0.06)',
        borderRadius: 8, fontSize: 12, color: DARK,
      }}>
        <div style={{ flex: 1 }}>
          <strong style={{ color: CLAY }}>Auth:</strong> servers run with <em>your</em> credentials, not Claude's. Same audit surface you already have.
        </div>
        <div style={{ flex: 1, borderLeft: '1px solid rgba(20,20,19,0.1)', paddingLeft: 12 }}>
          <strong style={{ color: CLAY }}>Elicitation:</strong> servers can prompt <em>back</em> — structured dialogs mid-task when the tool needs more input.
        </div>
      </div>
    </Slide>
  );
}

// ── Demo 6 ────────────────────────────────────────────────────────
function Slide_Demo6() {
  const pl = (window.DECK_PROFILE && window.DECK_PROFILE.plugins) || {};
  const d  = (window.DECK_PROFILE && window.DECK_PROFILE.demo6) || {};
  return <DemoSlide n={d.n ?? 6} title="Wire up MCP" beats={[
    { key: 'claude mcp add', line: `wire ${pl.mcpServer || '[MISSING plugins.mcpServer IN PROFILE]'} as stdio server` },
    { key: null,             line: `"${pl.demoPrompt || '[MISSING plugins.demoPrompt IN PROFILE]'}"` },
    { key: null,             line: 'tool call appears — not a file read' },
    { key: 'cat .mcp.json',  line: 'show the config' },
  ]} />;
}

// ── Claude Code Web (C4E only) ────────────────────────────────────
function Slide_CCWeb() {
  return (
    <Slide bg={BONE} label="Claude Code Web">
      <div style={KICKER}>Claude for Enterprise</div>
      <h2 style={H2}>Same agent. In your browser.</h2>
      <p style={{ ...SUB, maxWidth: 600 }}>
        Claude Code Web runs the full agent — read, edit, run — against your repos,
        no terminal required. PMs, designers, anyone who doesn't live in a shell.
      </p>
      <div style={{ flex: 1, display: 'flex', gap: 16, alignItems: 'center' }}>
        <InfoCard
          icon="Globe"
          title="Full agent loop"
          items={[
            'Reads your GitHub repos directly',
            'Proposes diffs, you approve',
            'Opens a PR when you\'re done',
          ]}
        />
        <InfoCard
          icon="Users"
          title="For non-terminal users"
          items={[
            'PMs prototype without eng handoff',
            'Designers tweak CSS in the real code',
            'QA writes test cases against source',
          ]}
        />
        <InfoCard
          icon="Lock"
          title="Enterprise controls"
          items={[
            'SSO, audit logs, role-based access',
            'Same CLAUDE.md and skills apply',
            'Admin manages repo access centrally',
          ]}
        />
      </div>
    </Slide>
  );
}

// ── Scheduled Tasks (CE only — via CC Web) ────────────────────────
function Slide_ScheduledTasks() {
  return (
    <Slide bg={OAT} label="Routines">
      <h2 style={H2}>Work that runs while you sleep</h2>
      <p style={{ ...SUB, maxWidth: 680 }}>
        Routines — cron for Claude agents. Set them up at <code style={{ fontFamily: MONO, fontSize: 13 }}>claude.ai/code/routines</code> or
        from the CLI with <code style={{ fontFamily: MONO, fontSize: 13 }}>/schedule</code>. Runs on Anthropic infrastructure,
        opens PRs you review in the morning.
      </p>
      <div style={{ flex: 1, display: 'flex', gap: 16, alignItems: 'center' }}>
        <InfoCard
          icon="Moon"
          title="Code health"
          items={[
            'Nightly dep bumps — PR only if tests green',
            'Weekly dead code & unused import sweeps',
            'Triage TODOs older than 30 days',
          ]}
        />
        <InfoCard
          icon="Lock"
          title="Security"
          items={[
            'CVE drops → patch PR before the team wakes',
            'Daily secret scan across recent commits',
            'Weekly audit: what changed in auth code',
          ]}
        />
        <InfoCard
          icon="Users"
          title="Team glue"
          items={[
            'Monday changelog from merged PRs',
            'Nudge stale PRs with suggested next steps',
            'Auto-triage new issues: label, link, assign',
          ]}
        />
      </div>
      <div style={{
        padding: '10px 16px', background: 'rgba(217,119,87,0.06)',
        borderRadius: 8, fontSize: 12, color: DARK,
      }}>
        <strong style={{ color: CLAY }}>Composes with MCP:</strong> sync Linear/Jira from PR state · pull Zendesk bugs and draft fixes · cluster nightly error logs into issues
      </div>
      <div style={{
        marginTop: 10, padding: '10px 16px', background: '#fff',
        border: '1px solid rgba(20,20,19,0.06)', borderRadius: 8, fontSize: 11.5, color: GRAY,
        display: 'flex', gap: 16, justifyContent: 'center',
      }}>
        <span><code style={{ fontFamily: MONO, color: CLAY }}>Ctrl+B</code> fire-and-forget</span>
        <span><code style={{ fontFamily: MONO, color: CLAY }}>/loop</code> re-run a prompt on interval</span>
        <span><code style={{ fontFamily: MONO, color: CLAY }}>Monitor</code> stream a process — react per line</span>
        <span><strong style={{ color: DARK }}>Scheduled</strong> runs while you sleep</span>
      </div>
    </Slide>
  );
}

// ── Claude Code on mobile (via Remote Control) ────────────────────
function Slide_CCMobile() {
  const pl = (window.DECK_PROFILE && window.DECK_PROFILE.plugins) || {};
  return (
    <Slide bg={OAT} label="Claude Code on mobile">
      <h2 style={H2}>Drive your session from anywhere</h2>
      <p style={{ ...SUB, maxWidth: 640 }}>
        The Claude iOS/Android app connects to a session running on your machine via
        Remote Control — same conversation, full authoring. Kick off work at your desk,
        steer it from the train, land the PR from your phone.
      </p>
      <VCenter>
        <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
        {/* Phone mockup — simple frame */}
        <div style={{
          width: 200, height: 400, background: '#fff', borderRadius: 28,
          border: '8px solid #2a2a29', boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          padding: '16px 12px', display: 'flex', flexDirection: 'column',
          fontSize: 10, overflow: 'hidden',
        }}>
          <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 8, color: DARK }}>{pl.mobileHeading || '[MISSING plugins.mobileHeading IN PROFILE]'}</div>
          <div style={{
            flex: 1, background: '#f6f5f0', borderRadius: 8, padding: 8,
            fontFamily: MONO, fontSize: 8, lineHeight: 1.6, color: GRAY,
          }}>
            <div style={{ color: '#8fba6a' }}>+ rampSchedule: [...]</div>
            <div style={{ color: '#8fba6a' }}>+ interpolate(now, steps)</div>
            <div style={{ color: '#d97757' }}>{pl.yamlSample || '[MISSING plugins.yamlSample IN PROFILE]'}</div>
            <div style={{ color: GRAY, marginTop: 6 }}>3 files changed</div>
          </div>
          <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
            <div style={{ flex: 1, padding: '8px', background: CLAY, color: '#fff', borderRadius: 6, textAlign: 'center', fontSize: 10, fontWeight: 600 }}>Approve</div>
            <div style={{ flex: 1, padding: '8px', background: '#eee', borderRadius: 6, textAlign: 'center', fontSize: 10 }}>Request changes</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}>
          <div style={{ padding: '14px 16px', background: '#fff', borderRadius: 8, borderLeft: `3px solid ${CLAY}` }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Approve plans</div>
            <div style={{ fontSize: 12, color: GRAY, lineHeight: 1.5 }}>Claude proposes in Plan Mode on desktop. You approve from mobile. It executes.</div>
          </div>
          <div style={{ padding: '14px 16px', background: '#fff', borderRadius: 8, borderLeft: `3px solid ${CLAY}` }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Review diffs</div>
            <div style={{ fontSize: 12, color: GRAY, lineHeight: 1.5 }}>Syntax-highlighted, collapsible. Tap a file to expand.</div>
          </div>
          <div style={{ padding: '14px 16px', background: '#fff', borderRadius: 8, borderLeft: `3px solid ${CLAY}` }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Notifications</div>
            <div style={{ fontSize: 12, color: GRAY, lineHeight: 1.5 }}>Push when a long-running task completes or needs your input.</div>
          </div>
        </div>
        </div>
      </VCenter>
    </Slide>
  );
}

// ── Managed MCP (C4E only) ────────────────────────────────────────
function Slide_ManagedMCP() {
  const pl = (window.DECK_PROFILE && window.DECK_PROFILE.plugins) || {};
  return (
    <Slide bg={BONE} label="Managed MCP">
      <div style={KICKER}>Claude for Enterprise</div>
      <h2 style={H2}>Managed MCP — connectors, org-wide</h2>
      <p style={{ ...SUB, maxWidth: 620 }}>
        Admin pre-approves MCP servers in the console. Developers see them
        automatically — no per-machine setup, no <code style={{ fontFamily: MONO, fontSize: 13 }}>claude mcp add</code>.
        Governance happens once, centrally.
      </p>
      <VCenter>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        <div style={{
          flex: '0 0 360px', padding: '20px', background: '#fff',
          border: '1px solid rgba(20,20,19,0.08)', borderRadius: 12,
        }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: GRAY, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>
            Admin console
          </div>
          {['github-enterprise', 'jira', 'postgres-readonly', pl.mcpServer || '[MISSING plugins.mcpServer IN PROFILE]'].map((s, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '8px 0', borderBottom: i < 3 ? '1px solid rgba(20,20,19,0.06)' : 'none',
            }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#27ca40' }} />
              <code style={{ fontFamily: MONO, fontSize: 12, flex: 1 }}>{s}</code>
              <span style={{ fontSize: 10, color: GRAY }}>approved</span>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 24, color: GRAY }}>→</div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ padding: '14px 16px', background: '#fff', borderRadius: 8, borderLeft: `3px solid ${CLAY}` }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Zero dev setup</div>
            <div style={{ fontSize: 12, color: GRAY }}>Connectors appear in every developer's Claude Code automatically.</div>
          </div>
          <div style={{ padding: '14px 16px', background: '#fff', borderRadius: 8, borderLeft: `3px solid ${CLAY}` }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Centralized auth</div>
            <div style={{ fontSize: 12, color: GRAY }}>OAuth flows managed once. Tokens rotate centrally.</div>
          </div>
          <div style={{ padding: '14px 16px', background: '#fff', borderRadius: 8, borderLeft: `3px solid ${CLAY}` }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Allowlist enforcement</div>
            <div style={{ fontSize: 12, color: GRAY }}>Lock installs to approved servers only. No rogue MCP endpoints.</div>
          </div>
          <div style={{ padding: '14px 16px', background: '#fff', borderRadius: 8, borderLeft: `3px solid ${CLAY}` }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>claude.ai connectors carry over</div>
            <div style={{ fontSize: 12, color: GRAY }}>Slack, Gmail, Drive, GitHub — already configured in the org console — appear here too. Same OAuth, same audit trail.</div>
          </div>
        </div>
        </div>
      </VCenter>
    </Slide>
  );
}

// ── API Auth (API platforms only) ─────────────────────────────────
// PlatformSwitch for per-provider auth/limits/cost notes.
function Slide_APIAuth() {
  const Row = ({ label, val }) => (
    <div style={{ display: 'flex', gap: 16, padding: '10px 0', borderBottom: '1px solid rgba(20,20,19,0.06)' }}>
      <span style={{ width: 110, fontSize: 12, color: GRAY, fontWeight: 500 }}>{label}</span>
      <span style={{ fontSize: 12.5, color: DARK, flex: 1 }}>{val}</span>
    </div>
  );
  return (
    <Slide bg={BONE} label="API Auth">
      <div style={KICKER}>Your platform</div>
      <h2 style={H2}>Auth, limits, cost controls</h2>
      <VCenter lift={2.2} stretch>
        <div style={{
          width: '100%', padding: '24px 28px', background: '#fff',
          border: '1px solid rgba(20,20,19,0.08)', borderRadius: 12,
        }}>
          <PlatformSwitch>
            <div data-platform="bedrock">
              <Row label="Setup" val="Interactive wizard on first run — region, credentials, model pin. Or skip it: standard AWS credential chain (IAM role, ~/.aws, env)." />
              <Row label="Rate limits" val="Per-model quotas set in Bedrock console. Opus is throttled harder than Sonnet. Request increases via AWS support." />
              <Row label="Cost controls" val="AWS Budgets + Cost Explorer. Tag usage by team via request metadata. Usage shows up on your AWS bill." />
              <Row label="Region" val="Model availability varies by region. us-east-1 and us-west-2 have the full lineup." />
            </div>
            <div data-platform="vertex">
              <Row label="Setup" val="Interactive wizard on first run — GCP project, region, ADC. Or skip it: gcloud application-default login / service account JSON." />
              <Row label="Rate limits" val="Per-project quotas in GCP console. Request increases through quota page. Sonnet quotas are generous." />
              <Row label="Cost controls" val="GCP Billing budgets + alerts. Usage tagged by project. Shows up alongside other Vertex AI spend." />
              <Row label="Region" val="us-central1 and europe-west4 recommended. Check Vertex AI model garden for availability." />
            </div>
            <div data-platform="azure">
              <Row label="Auth" val="Azure-issued API key per deployment, or Managed Identity for service-to-service." />
              <Row label="Rate limits" val="TPM (tokens per minute) set per deployment in Azure AI Studio. Scale up per deployment." />
              <Row label="Cost controls" val="Azure Cost Management. Per-deployment metering. Budget alerts per resource group." />
              <Row label="Deployments" val="You name your own deployments — CLAUDE_CODE maps to them via env vars." />
            </div>
            <div data-platform="default">
              <Row label="Auth" val="ANTHROPIC_API_KEY env var. Get keys from platform.claude.com. Rotate without redeploy." />
              <Row label="Rate limits" val="Per-organization. Tiered by spend history. Headroom increases automatically as you scale." />
              <Row label="Cost controls" val="Hard spend caps in console. Per-key usage tracking. Workspace-level budgets for team isolation." />
              <Row label="Workspaces" val="Separate keys per environment (dev/staging/prod). Usage reported per workspace." />
            </div>
          </PlatformSwitch>
        </div>
      </VCenter>
    </Slide>
  );
}

// ── Exercise 3 ────────────────────────────────────────────────────
function Slide_Ex3() {
  const pl = (window.DECK_PROFILE && window.DECK_PROFILE.plugins) || {};
  const ex = (window.DECK_PROFILE && window.DECK_PROFILE.exercise3) || {};
  return (
    <ExerciseSlide
      n={ex.n ?? 3}
      time="15 min"
      title="Wire up MCP"
      doneWhen={`Claude answers via a mcp__${pl.mcpServer || '[MISSING plugins.mcpServer IN PROFILE]'}__* tool call (visible in transcript)`}
    >
      <ol style={{ paddingLeft: 20, margin: 0 }}>
        <li style={{ marginBottom: 10 }}><code style={{ fontFamily: MONO, fontSize: 13 }}>{`cd ${pl.ex3Repo || '[MISSING plugins.ex3Repo IN PROFILE]'} && npm install`}</code> (MCP SDK is a real dep)</li>
        <li style={{ marginBottom: 10 }}><code style={{ fontFamily: MONO, fontSize: 13 }}>{`claude mcp add ${pl.mcpServer || '[MISSING plugins.mcpServer IN PROFILE]'} -- node mcp/${pl.mcpServer || '[MISSING plugins.mcpServer IN PROFILE]'}/server.js`}</code></li>
        <li style={{ marginBottom: 10 }}>Restart <code style={{ fontFamily: MONO, fontSize: 13 }}>claude</code>, then ask:</li>
      </ol>
      <div style={{
        marginTop: 8, padding: '10px 14px', background: 'rgba(0,0,0,0.3)',
        borderRadius: 6, fontFamily: MONO, fontSize: 12.5, color: '#c3e88d',
      }}>
        {pl.ex3Prompt || '[MISSING plugins.ex3Prompt IN PROFILE]'}
      </div>
      <p style={{ fontSize: 12, color: 'rgba(250,249,245,0.5)', marginTop: 10 }}>
        If it reads <code style={{ fontFamily: MONO, fontSize: 11 }}>{pl.ex3ConfigPath || '[MISSING plugins.ex3ConfigPath IN PROFILE]'}</code> instead of calling the tool, say "use the MCP tool."
      </p>
    </ExerciseSlide>
  );
}

// ── Plugins ───────────────────────────────────────────────────────
function Slide_Plugins() {
  // Profile-driven file-tree labels. SLB's plugin would bundle the
  // /calibrate skill + well-data MCP config — flag-toolkit means nothing
  // to an oilfield audience. Seven strings, all with flag-service fallbacks.
  const pl = (window.DECK_PROFILE && window.DECK_PROFILE.plugins) || {};
  return (
    <Slide bg={BONE} label="Plugins">
      <div style={KICKER}>Distribute</div>
      <h2 style={H2}>Plugins bundle it all</h2>
      <p style={{ ...SUB, maxWidth: 620 }}>
        Skills + MCP config + settings, in one folder with a manifest.
        <code style={{ fontFamily: MONO, fontSize: 13 }}> claude plugin install</code> and the whole team inherits the workflow.
      </p>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, alignItems: 'center' }}>
        {/* File tree */}
        <div style={{
          padding: '18px 20px', background: DARK, color: BONE,
          borderRadius: 10, fontFamily: MONO, fontSize: 12, lineHeight: 1.8,
          whiteSpace: 'pre',
        }}>
          <div>{pl.toolkit || '[MISSING plugins.toolkit IN PROFILE]'}/</div>
          <div style={{ opacity: 0.6 }}>├── .claude-plugin/</div>
          <div style={{ color: CLAY }}>│   └── plugin.json</div>
          <div style={{ opacity: 0.6 }}>├── skills/</div>
          <div>│   └── {pl.skillName || '[MISSING plugins.skillName IN PROFILE]'}/</div>
          <div style={{ color: '#8fba6a' }}>│       └── SKILL.md</div>
          <div style={{ opacity: 0.6 }}>├── mcp/</div>
          <div>│   └── {pl.mcpConfig || '[MISSING plugins.mcpConfig IN PROFILE]'}</div>
          <div style={{ opacity: 0.6 }}>└── hooks/</div>
          <div>    └── {pl.hookScript || '[MISSING plugins.hookScript IN PROFILE]'}</div>
        </div>
        {/* Manifest */}
        <div>
          <EditorMockup filename=".claude-plugin/plugin.json" width="100%">
            <ELine num={1}><Punc>{'{'}</Punc></ELine>
            <ELine num={2} indent={1}><Str>"name"</Str><Punc>:</Punc> <Str>"{pl.toolkit || '[MISSING plugins.toolkit IN PROFILE]'}"</Str><Punc>,</Punc></ELine>
            <ELine num={3} indent={1}><Str>"description"</Str><Punc>:</Punc> <Str>"{pl.description || '[MISSING plugins.description IN PROFILE]'}"</Str><Punc>,</Punc></ELine>
            <ELine num={4} indent={1}><Str>"author"</Str><Punc>:</Punc> <Punc>{'{'}</Punc> <Str>"name"</Str><Punc>:</Punc> <Str>"{(pl.author && pl.author.name) || pl.author || '[MISSING plugins.author IN PROFILE]'}"</Str> <Punc>{'}'},</Punc></ELine>
            <ELine num={5} indent={1}><Str>"userConfig"</Str><Punc>:</Punc> <Punc>{'{'}</Punc></ELine>
            <ELine num={6} indent={2}><Str>"apiToken"</Str><Punc>:</Punc> <Punc>{'{'}</Punc> <Str>"sensitive"</Str><Punc>:</Punc> <Kw>true</Kw> <Punc>{'}'}</Punc></ELine>
            <ELine num={7} indent={1}><Punc>{'}'},</Punc></ELine>
            <ELine num={8} indent={1}><Str>"monitor"</Str><Punc>:</Punc> <Str>"bin/flag-lint --watch"</Str></ELine>
            <ELine num={9}><Punc>{'}'}</Punc></ELine>
          </EditorMockup>
          <div style={{
            marginTop: 14, padding: '12px 16px', background: 'rgba(217,119,87,0.06)',
            borderRadius: 8, fontSize: 12.5, color: DARK,
          }}>
            <strong style={{ color: CLAY }}>Manifest declares config + monitors.</strong> Skills,
            MCP, hooks, themes, and <code style={{ fontFamily: MONO, fontSize: 11 }}>bin/</code> executables auto-discovered
            from folders. Publish with <code style={{ fontFamily: MONO, fontSize: 11 }}>claude plugin tag</code>.
          </div>
        </div>
      </div>
    </Slide>
  );
}

// ── Must-have plugins ─────────────────────────────────────────────
// Split-bg curated-list slide ported from ServiceNow 201 Slide14.
// Slide_Plugins teaches the mechanism; this is the starting points.
function Slide_MustHavePlugins() {
  const plugins = [
    { name: 'commit-commands',      desc: 'Commit + PR workflows' },
    { name: 'claude-md-management', desc: 'Auto-maintain CLAUDE.md' },
    { name: 'feature-dev',          desc: 'Discovery → implementation' },
    { name: 'pr-review-toolkit',    desc: 'Subagents for code review' },
    { name: 'hookify',              desc: 'Pre/post tool hooks' },
  ];
  return (
    <Slide bg={`linear-gradient(to right, ${BONE} 50%, ${OAT} 50%)`} label="Must-have plugins" padding="0">
      <div style={{ display: 'flex', height: '100%' }}>
        {/* Left: install instructions. Column bg matches outer gradient's left
            half — redundant when gradient renders, covers the canvas if
            components.jsx is stale-cached. */}
        <div style={{
          flex: '0 0 50%', background: BONE,
          padding: '56px 44px',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
        }}>
          <div style={KICKER}>Shortcuts</div>
          <h2 style={{ ...H2, marginBottom: 18 }}>Must-have plugins</h2>
          <div style={{
            border: `2px solid ${CLAY}`, borderRadius: 10,
            padding: '14px 16px', background: 'rgba(217,119,87,0.04)',
            fontSize: 13, lineHeight: 1.5, color: DARK, marginBottom: 24,
          }}>
            We published the most popular combinations of MCPs, skills,
            subagents, and hooks used by the Claude Code team.
          </div>
          <div style={{ fontSize: 12, color: GRAY, marginBottom: 8 }}>Install via</div>
          <div style={{ fontFamily: MONO, fontSize: 18, color: CLAY, marginBottom: 4 }}>/plugin</div>
          <div style={{ fontFamily: MONO, fontSize: 13, color: GRAY }}>→ claude-plugins-official</div>
        </div>
        {/* Right: GitHub repo mockup */}
        <div style={{
          flex: 1, background: OAT, padding: '40px 44px',
          display: 'flex', alignItems: 'center',
        }}>
          <div style={{
            width: '100%', background: '#fff',
            border: '1px solid rgba(31,30,29,0.12)', borderRadius: 8,
            overflow: 'hidden', fontSize: 13,
          }}>
            {/* Repo header */}
            <div style={{
              padding: '12px 16px', borderBottom: '1px solid rgba(31,30,29,0.08)',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{ fontWeight: 600, color: DARK }}>claude-plugins-official</span>
              <span style={{
                fontSize: 10.5, padding: '2px 8px', borderRadius: 999,
                border: '1px solid rgba(31,30,29,0.12)', color: GRAY,
              }}>Public</span>
              <span style={{
                marginLeft: 'auto', fontSize: 11, color: GRAY,
                padding: '3px 9px', border: '1px solid rgba(31,30,29,0.12)', borderRadius: 5,
              }}>main ▾</span>
            </div>
            {/* Folder rows */}
            {plugins.map((p, i) => (
              <div key={i} style={{
                padding: '11px 16px',
                borderBottom: i < plugins.length - 1 ? '1px solid rgba(31,30,29,0.06)' : 'none',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <span style={{ color: DARK, fontFamily: MONO, fontSize: 12 }}>
                  <span style={{ opacity: 0.4, marginRight: 8 }}>▸</span>{p.name}
                </span>
                <span style={{ color: GRAY, fontSize: 11 }}>{p.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Slide>
  );
}

// ── Exercise 4 ────────────────────────────────────────────────────
function Slide_Ex4() {
  const pl = (window.DECK_PROFILE && window.DECK_PROFILE.plugins) || {};
  const ex = (window.DECK_PROFILE && window.DECK_PROFILE.exercise4) || {};
  return (
    <ExerciseSlide
      n={ex.n ?? 4}
      time="8 min"
      title="Package it"
      doneWhen={`claude plugin validate ${pl.toolkit || '[MISSING plugins.toolkit IN PROFILE]'} → green check`}
    >
      <ol style={{ paddingLeft: 20, margin: 0 }}>
        <li style={{ marginBottom: 10 }}><code style={{ fontFamily: MONO, fontSize: 13 }}>{`mkdir -p ${pl.toolkit || '[MISSING plugins.toolkit IN PROFILE]'}/.claude-plugin ${pl.toolkit || '[MISSING plugins.toolkit IN PROFILE]'}/skills`}</code></li>
        <li style={{ marginBottom: 10 }}>Copy your <code style={{ fontFamily: MONO, fontSize: 13 }}>{pl.skillName || '[MISSING plugins.skillName IN PROFILE]'}</code> skill into <code style={{ fontFamily: MONO, fontSize: 13 }}>{`${pl.toolkit || '[MISSING plugins.toolkit IN PROFILE]'}/skills/`}</code></li>
        <li style={{ marginBottom: 10 }}>Write <code style={{ fontFamily: MONO, fontSize: 13 }}>plugin.json</code> — three fields from the previous slide</li>
        <li><code style={{ fontFamily: MONO, fontSize: 13 }}>{`claude plugin validate ${pl.toolkit || '[MISSING plugins.toolkit IN PROFILE]'}`}</code></li>
      </ol>
    </ExerciseSlide>
  );
}

// ── Agent Teams ───────────────────────────────────────────────────
// Ported from Intuit (agent-team spec slide). Simplified: tmux split,
// 3 panes, each a separate Claude. They coordinate via the shared
// filesystem — one writes, one tests, one docs.
function Slide_AgentTeams() {
  const pl = (window.DECK_PROFILE && window.DECK_PROFILE.plugins) || {};
  const at = pl.agentTeam || {};
  const ROUTE = at.route    || '[MISSING plugins.agentTeam.route IN PROFILE]';
  const FILE  = at.file     || '[MISSING plugins.agentTeam.file IN PROFILE]';
  const TEST  = at.testFile || '[MISSING plugins.agentTeam.testFile IN PROFILE]';
  const panes = [
    { title: 'claude — pane 1', task: 'write route', color: CLAY,
      lines: [`> add POST ${ROUTE}`, `⏺ Editing ${FILE}`, '  added 12 lines'] },
    { title: 'claude — pane 2', task: 'write test', color: '#7bb8d9',
      lines: [`> test the ${ROUTE.replace(/^\//, '')} route`, `⏺ Reading ${FILE}`, `⏺ Writing ${TEST}`] },
    { title: 'claude — pane 3', task: 'update docs', color: '#8fba6a',
      lines: [`> document ${ROUTE} in README`, `⏺ Reading ${FILE}`, '⏺ Editing README.md'] },
  ];
  return (
    <Slide bg={DARK} color={BONE} label="Agent teams">
      <div style={{ ...KICKER, color: CLAY }}>Orchestrate</div>
      <h2 style={{ ...H2, color: BONE }}>Agent teams — many Claudes, one goal</h2>
      <p style={{ ...SUB, color: 'rgba(250,249,245,0.6)', maxWidth: 600 }}>
        tmux split. One Claude per pane. They coordinate through the shared
        filesystem — no orchestration layer, just files.
      </p>
      <div style={{
        flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
        gap: 2, background: '#0a0a09', borderRadius: 8, overflow: 'hidden',
        border: '1px solid rgba(250,249,245,0.1)',
      }}>
        {panes.map((p, i) => (
          <div key={i} style={{
            background: '#1a1918', padding: '12px 14px',
            fontFamily: MONO, fontSize: 10, lineHeight: 1.6,
            display: 'flex', flexDirection: 'column',
          }}>
            <div style={{
              fontSize: 9, color: p.color, marginBottom: 8,
              paddingBottom: 6, borderBottom: '1px solid rgba(250,249,245,0.08)',
            }}>{p.title} · <span style={{ opacity: 0.6 }}>{p.task}</span></div>
            {p.lines.map((l, j) => (
              <div key={j} style={{ color: j === 0 ? '#fff' : 'rgba(250,249,245,0.6)', marginBottom: 2 }}>{l}</div>
            ))}
            <div style={{ flex: 1 }} />
            <div style={{ color: p.color, opacity: 0.7 }}>▊</div>
          </div>
        ))}
      </div>
      <div style={{
        marginTop: 16, fontSize: 12, color: 'rgba(250,249,245,0.5)', textAlign: 'center',
      }}>
        Pane 2 reads the route pane 1 just wrote. Pane 3 reads both. The filesystem is the message bus.
      </div>
      <div style={{
        marginTop: 10, fontSize: 11, color: 'rgba(250,249,245,0.4)', textAlign: 'center',
        fontFamily: MONO,
      }}>
        Tip: <span style={{ color: CLAY }}>/color</span> + <span style={{ color: CLAY }}>/rename</span> per pane so you can tell them apart at a glance.
      </div>
    </Slide>
  );
}

// ── Parallel Compare ──────────────────────────────────────────────
// Subagents vs Parallel Claude (worktrees) vs Agent Teams. Syllabus gap:
// Akamai slide 9 has this, nobody in-repo does. The split is coordination —
// how much do the workers need to talk?
function Slide_ParallelCompare() {
  const cols = [
    {
      name: 'Subagents',
      tint: '#7bb8d9',
      what: 'Spawned inside one session',
      ctx:  'Isolated context. Results merge back to you.',
      when: 'Research fan-out. Heavy reads. "Map this repo."',
      via:  'Agent tool · Explore / Plan types',
    },
    {
      name: 'Parallel Claude',
      tint: CLAY,
      what: 'N separate sessions in git worktrees',
      ctx:  "Fully independent. Workers don't know about each other.",
      when: 'Independent targets. Migrate N files, N PRs. Or hop into an existing worktree mid-session.',
      via:  'claude -w · /batch · EnterWorktree · worktree.sparsePaths',
    },
    {
      name: 'Agent Teams',
      tint: '#8fba6a',
      what: 'N Claudes in tmux, one repo',
      ctx:  'Shared filesystem = message bus. Workers coordinate.',
      when: 'One feature, split the work. Route + test + docs.',
      via:  'TeamCreate · manual tmux split',
    },
  ];
  const Row = ({ label, val }) => (
    <div style={{ marginBottom: 10 }}>
      <div style={{ fontSize: 9.5, color: GRAY, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 12, lineHeight: 1.45 }}>{val}</div>
    </div>
  );
  return (
    <Slide bg={BONE} label="Parallel compare">
      <div style={KICKER}>Which when</div>
      <h2 style={H2}>Three ways to parallelize</h2>
      <p style={{ ...SUB, maxWidth: 600 }}>
        They're not the same tool. The split is: how much do the workers need to talk to each other?
      </p>
      <div style={{
        flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
        gap: 14, alignContent: 'center',
      }}>
        {cols.map((c, i) => (
          <div key={i} style={{
            padding: '18px 18px 12px', background: '#fff', borderRadius: 10,
            border: '1px solid rgba(20,20,19,0.06)', borderTop: '4px solid ' + c.tint,
            display: 'flex', flexDirection: 'column',
          }}>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>{c.name}</div>
            <Row label="What" val={c.what} />
            <Row label="Context" val={c.ctx} />
            <Row label="Reach for it when" val={c.when} />
            <div style={{ flex: 1 }} />
            <div style={{
              marginTop: 8, paddingTop: 10, borderTop: '1px solid rgba(20,20,19,0.06)',
              fontFamily: MONO, fontSize: 10.5, color: c.tint,
            }}>{c.via}</div>
          </div>
        ))}
      </div>
    </Slide>
  );
}

// ── Agent View ────────────────────────────────────────────────────
// Claude Code 2026-05-11 release. CLI dashboard for launching and
// supervising many background sessions from one screen — replaces the
// "multiple terminal tabs / & and tail" pattern customers improvised.
// Sits after Slide_ParallelCompare in the §301 flow: three ways to
// parallelize → and the dashboard to watch them all from one screen.
function Slide_AgentView() {
  const rows = [
    { id: 'sess_a1c3', flag: true,  preview: 'I added the migration but need confirmation before…',  ts: '2m ago'  },
    { id: 'sess_b7f2', flag: false, preview: '✓ 14 files updated, tests green on the migration branch', ts: '5m ago'  },
    { id: 'sess_c9d4', flag: false, preview: 'Reviewing diff for security findings…',                  ts: '11m ago' },
    { id: 'sess_d2e8', flag: true,  preview: 'Should I delete the legacy adapter, or keep it stubbed?',  ts: '18m ago' },
  ];
  const cmds = [
    { c: 'claude agents',        d: 'open the dashboard' },
    { c: '/bg',                  d: 'push the current session to background' },
    { c: 'claude --bg [task]',   d: 'launch directly to background' },
    { c: '←',                    d: 'open the highlighted session inline' },
  ];
  return (
    <Slide bg={BONE} label="Agent View">
      <div style={KICKER}>Watch</div>
      <h2 style={H2}>One screen, many sessions</h2>
      <p style={{ ...SUB, maxWidth: 640 }}>
        Agent View is the dashboard for background work. Launch sessions, see which
        ones need your input, and jump in — without juggling terminal tabs.
      </p>
      <div style={{
        flex: 1, display: 'grid', gridTemplateColumns: '1.35fr 1fr',
        gap: 18, alignItems: 'stretch',
      }}>
        {/* Mock dashboard */}
        <div style={{
          background: '#1a1918', borderRadius: 10, padding: '14px 16px',
          fontFamily: MONO, fontSize: 11, color: 'rgba(250,249,245,0.85)',
          display: 'flex', flexDirection: 'column',
          border: '1px solid rgba(20,20,19,0.08)',
        }}>
          <div style={{
            fontSize: 10, color: 'rgba(250,249,245,0.5)', marginBottom: 10,
            paddingBottom: 8, borderBottom: '1px solid rgba(250,249,245,0.08)',
            display: 'flex', justifyContent: 'space-between',
          }}>
            <span>claude agents</span>
            <span>4 sessions · 2 need input</span>
          </div>
          {rows.map((r, i) => (
            <div key={i} style={{
              padding: '8px 0', display: 'grid',
              gridTemplateColumns: '14px 92px 1fr 64px', gap: 10,
              alignItems: 'center',
              borderBottom: i < rows.length - 1 ? '1px solid rgba(250,249,245,0.05)' : 'none',
            }}>
              <span style={{ color: r.flag ? CLAY : 'rgba(250,249,245,0.2)', fontSize: 13 }}>{r.flag ? '●' : '·'}</span>
              <span style={{ color: r.flag ? '#fff' : 'rgba(250,249,245,0.7)' }}>{r.id}</span>
              <span style={{ color: 'rgba(250,249,245,0.55)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.preview}</span>
              <span style={{ color: 'rgba(250,249,245,0.35)', fontSize: 10, textAlign: 'right' }}>{r.ts}</span>
            </div>
          ))}
          <div style={{ flex: 1 }} />
          <div style={{
            marginTop: 10, paddingTop: 8, borderTop: '1px solid rgba(250,249,245,0.08)',
            fontSize: 10, color: 'rgba(250,249,245,0.4)',
          }}>
            ● needs input    ←/→ open    n new    q quit
          </div>
        </div>

        {/* Commands + reach-for-it */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{
            background: '#fff', borderRadius: 10, padding: '14px 16px',
            border: '1px solid rgba(20,20,19,0.06)',
          }}>
            <div style={{ fontSize: 9.5, color: GRAY, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>CLI surface</div>
            {cmds.map((c, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '155px 1fr', gap: 10,
                padding: '5px 0', alignItems: 'baseline',
                borderTop: i > 0 ? '1px solid rgba(20,20,19,0.04)' : 'none',
              }}>
                <code style={{ fontFamily: MONO, fontSize: 11.5, color: CLAY }}>{c.c}</code>
                <span style={{ fontSize: 11.5, color: DARK }}>{c.d}</span>
              </div>
            ))}
          </div>
          <div style={{
            background: 'rgba(217,119,87,0.06)', borderRadius: 10, padding: '12px 16px',
            fontSize: 11.5, color: DARK, lineHeight: 1.5,
          }}>
            <div style={{ fontSize: 9.5, color: CLAY, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6, fontWeight: 600 }}>Reach for it when</div>
            Async, queued background work — not real-time coordination. Fire-and-check-back,
            many in flight at once. The orchestration UI for parallel sessions.
          </div>
        </div>
      </div>
      <div style={{
        marginTop: 12, fontSize: 10.5, color: GRAY, textAlign: 'center',
      }}>
        Claude Code 2.1.139+ · Pro / Max / Team / Enterprise · API on Research Preview
      </div>
    </Slide>
  );
}

// ── Agent View — simulated (animated alternative to the static slide) ────
// 4-click walkthrough: launch 3 background sessions → open `claude agents`
// → one row lights up needing input → arrow-in inline to answer. Use this
// INSTEAD OF the static Slide_AgentView when you want a demo beat without
// the live-CLI dependency (Claude Code 2.1.139 on the presenter machine).
function Slide_AgentViewSim(props) {
  const STEP_MAX = 4;
  const sub = useSubSteps(STEP_MAX, props && props.registerSubNav);
  const step = sub.step;

  const ROWS = [
    { id: 'sess_a1c3', task: 'ship checkout v2 refactor',   preview: 'I added the migration but need confirmation before deleting…', flagAt: 3, age3: '8m ago' },
    { id: 'sess_b7f2', task: 'audit deps for CVEs',         preview: '✓ 14 deps reviewed, 2 patches staged on review-branch',         flagAt: 0, age3: '12m ago' },
    { id: 'sess_c9d4', task: 'scaffold the migration plan', preview: 'Drafting Step 3 of 5 — schema diff…',                          flagAt: 0, age3: '14m ago' },
  ];

  const termLines = [];
  if (step >= 1) {
    ROWS.forEach(r => {
      termLines.push({ p: '$', t: 'claude --bg "' + r.task + '"' });
      termLines.push({ p: '',  t: '→ launched ' + r.id, dim: true });
    });
  }
  if (step >= 2) termLines.push({ p: '$', t: 'claude agents' });

  const expandedId = step >= 4 ? 'sess_a1c3' : null;

  return (
    <Slide bg={BONE} label="Agent View — simulated">
      <div style={KICKER}>Watch · simulated demo</div>
      <h2 style={H2}>One screen, many sessions</h2>
      <p style={{ ...SUB, maxWidth: 680 }}>
        Pre-built walkthrough — press <kbd style={{
          fontFamily: MONO, fontSize: 10, padding: '1px 6px', borderRadius: 4,
          border: '1px solid rgba(20,20,19,0.15)', background: '#fff',
        }}>→</kbd> to launch three background sessions, open{' '}
        <code style={{fontFamily: MONO, fontSize: 12}}>claude agents</code>, watch one light up
        needing input, and jump in inline.
      </p>
      <div style={{
        flex: 1, display: 'grid', gridTemplateColumns: '1.55fr 1fr',
        gap: 18, alignItems: 'stretch',
      }}>
        {/* Terminal + dashboard */}
        <div style={{
          background: '#1a1918', borderRadius: 10, padding: '14px 16px',
          fontFamily: MONO, fontSize: 11.5, color: 'rgba(250,249,245,0.85)',
          display: 'flex', flexDirection: 'column', minHeight: 360,
        }}>
          <div style={{
            fontSize: 9.5, color: 'rgba(250,249,245,0.4)', marginBottom: 8,
            paddingBottom: 6, borderBottom: '1px solid rgba(250,249,245,0.06)',
          }}>
            ~/checkout-svc — zsh
          </div>

          {/* Typed terminal lines */}
          <div style={{ flex: 'none' }}>
            {termLines.map((l, i) => (
              <div key={i} style={{
                padding: '2px 0',
                color: l.dim ? 'rgba(250,249,245,0.45)' : 'rgba(250,249,245,0.9)',
              }}>
                {l.p && <span style={{ color: '#7bb8d9', marginRight: 8 }}>{l.p}</span>}
                {l.t}
              </div>
            ))}
            {step === 0 && (
              <div style={{ padding: '2px 0' }}>
                <span style={{ color: '#7bb8d9', marginRight: 8 }}>$</span>
                <span style={{
                  display: 'inline-block', width: 8, height: 14, verticalAlign: 'middle',
                  background: '#d1cfc5', animation: 'blink 1s infinite',
                }} />
                <span style={{ marginLeft: 10, fontSize: 10, color: 'rgba(250,249,245,0.35)' }}>
                  → to play
                </span>
              </div>
            )}
          </div>

          {/* Dashboard panel — appears at step ≥ 2 */}
          {step >= 2 && (
            <div style={{
              marginTop: 14, paddingTop: 12,
              borderTop: '1px solid rgba(250,249,245,0.08)',
              flex: 1, display: 'flex', flexDirection: 'column',
            }}>
              <div style={{
                fontSize: 10, color: 'rgba(250,249,245,0.5)', marginBottom: 8,
                display: 'flex', justifyContent: 'space-between',
              }}>
                <span>claude agents</span>
                <span>
                  {ROWS.length} sessions{step >= 3 ? ' · 1 needs input' : ''}
                </span>
              </div>
              {ROWS.map((r, i) => {
                const flagged = r.flagAt > 0 && step >= r.flagAt;
                const expanded = expandedId === r.id;
                return (
                  <React.Fragment key={r.id}>
                    <div style={{
                      padding: '7px 4px', display: 'grid',
                      gridTemplateColumns: '14px 92px 1fr 64px', gap: 10,
                      alignItems: 'center',
                      borderBottom: !expanded && i < ROWS.length - 1 ? '1px solid rgba(250,249,245,0.05)' : 'none',
                      background: expanded ? 'rgba(217,119,87,0.10)' : 'transparent',
                      borderRadius: expanded ? 4 : 0,
                    }}>
                      <span style={{
                        display: 'inline-block',
                        color: flagged ? CLAY : 'rgba(250,249,245,0.2)',
                        fontSize: 13, textAlign: 'center',
                        animation: flagged ? 'annotPulse 1.8s ease-in-out infinite' : 'none',
                      }}>{flagged ? '●' : '·'}</span>
                      <span style={{ color: flagged ? '#fff' : 'rgba(250,249,245,0.75)' }}>{r.id}</span>
                      <span style={{
                        color: 'rgba(250,249,245,0.55)',
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      }}>{r.preview}</span>
                      <span style={{ color: 'rgba(250,249,245,0.35)', fontSize: 10, textAlign: 'right' }}>
                        {step >= 3 ? r.age3 : 'just now'}
                      </span>
                    </div>
                    {expanded && (
                      <div style={{
                        margin: '4px 0 8px', padding: '10px 14px 12px',
                        background: '#262624', borderRadius: 6,
                        border: '1px solid rgba(217,119,87,0.28)',
                        fontSize: 11, lineHeight: 1.55,
                      }}>
                        <div style={{
                          color: 'rgba(250,249,245,0.5)', fontSize: 9.5,
                          marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em',
                        }}>
                          ← {r.id} · opened inline
                        </div>
                        <div style={{ color: 'rgba(250,249,245,0.85)' }}>
                          The legacy <code style={{ fontFamily: MONO, color: '#f0e0a0' }}>checkoutAdapter</code> still
                          has 3 callers in the codebase, but it{"'"}s flagged for removal in Q3.{' '}
                          <strong style={{ color: CLAY }}>Should I delete it</strong>, stub it for one release,
                          or keep it with a deprecation warning?
                        </div>
                        <div style={{
                          marginTop: 8, color: 'rgba(250,249,245,0.45)', fontSize: 10,
                        }}>
                          <span style={{ color: '#7bb8d9' }}>{'>'}</span>{' '}
                          <span style={{ background: '#d1cfc5', color: '#1a1918' }}>{' '}</span>
                          <span style={{ marginLeft: 14 }}>/bg to push back · Esc to dashboard</span>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
              <div style={{ flex: 1 }} />
              <div style={{
                marginTop: 8, paddingTop: 8, borderTop: '1px solid rgba(250,249,245,0.08)',
                fontSize: 10, color: 'rgba(250,249,245,0.4)',
              }}>
                ● needs input    ←/→ open    n new    q quit
              </div>
            </div>
          )}

          {step < 2 && <div style={{ flex: 1 }} />}
        </div>

        {/* Stage captions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <_AgentViewStageCard active={step >= 1} title="1 · Launch in the background"
            text={<><code style={{ fontFamily: MONO, fontSize: 10.5 }}>claude --bg [task]</code> fires a session
              without taking over your terminal. Stack them up.</>} />
          <_AgentViewStageCard active={step >= 2} title="2 · One dashboard, all sessions"
            text={<><code style={{ fontFamily: MONO, fontSize: 10.5 }}>claude agents</code> opens the supervisor
              view — id, status, last response, time. No more “which tab was the test writer?”</>} />
          <_AgentViewStageCard active={step >= 3} title="3 · Lights up when it needs you"
            text={<><span style={{ color: CLAY, fontWeight: 600 }}>●</span> on any row blocked on your input.
              Tab-switching becomes pull-driven — you check the flagged ones, not all of them.</>} />
          <_AgentViewStageCard active={step >= 4} title="4 · Jump in inline"
            text={<><kbd style={{ fontFamily: MONO, fontSize: 10, padding: '1px 5px', borderRadius: 3, border: '1px solid rgba(20,20,19,0.15)', background: '#fff' }}>←</kbd> opens
              the session right in the dashboard. Answer, <code style={{ fontFamily: MONO, fontSize: 10.5 }}>/bg</code> to
              push back, move to the next.</>} />
        </div>
      </div>
      <div style={{
        marginTop: 10, fontSize: 10.5, color: GRAY, textAlign: 'center',
      }}>
        Claude Code 2.1.139+ · Pro / Max / Team / Enterprise · API on Research Preview
        {step > 0 && step < STEP_MAX && (
          <span style={{ marginLeft: 14, color: CLAY }}>→ to advance · {step}/{STEP_MAX}</span>
        )}
      </div>
    </Slide>
  );
}

function _AgentViewStageCard(props) {
  const active = props.active;
  return (
    <div style={{
      padding: '11px 14px', borderRadius: 8,
      background: active ? 'rgba(217,119,87,0.07)' : '#fff',
      border: active ? '1px solid rgba(217,119,87,0.3)' : '1px solid rgba(20,20,19,0.06)',
      opacity: active ? 1 : 0.45,
      transition: 'opacity 0.3s, background 0.3s, border 0.3s',
    }}>
      <div style={{
        fontSize: 9.5, color: active ? CLAY : GRAY,
        textTransform: 'uppercase', letterSpacing: '0.08em',
        marginBottom: 6, fontWeight: 600,
      }}>{props.title}</div>
      <div style={{ fontSize: 11.5, color: DARK, lineHeight: 1.5 }}>{props.text}</div>
    </div>
  );
}

// ── Demo 7 ────────────────────────────────────────────────────────
// Profile-driven: SLB runs audit→fix→verify with named agents and
// SendMessage handoffs — the tmux/kill-switch beats below predate the
// agent-teams API and stay as fallback for decks that haven't migrated.
function Slide_Demo7() {
  const d = (window.DECK_PROFILE && window.DECK_PROFILE.demo7) || {};
  const pl = (window.DECK_PROFILE && window.DECK_PROFILE.plugins) || {};
  return <DemoSlide n={d.n ?? 7} title={d.title || "Agent teams"} beats={d.beats || [
    { key: 'tmux', line: 'split 3 panes, one claude per pane' },
    { key: null,   line: `"${pl.demo7Prompt || '[MISSING plugins.demo7Prompt IN PROFILE]'}"` },
    { key: null,   line: 'one writes the route, one the test, one the README' },
    { key: null,   line: 'they coordinate via files' },
  ]} />;
}

// ── Remote Control ────────────────────────────────────────────────
// Issue #2. Serve your local env to claude.ai/code — web UI, local
// filesystem and tools. Strong story for airgapped repos + terminal-
// averse devs. Diagram shows the trust boundary clearly.
function Slide_RemoteControl() {
  const Box = ({ title, sub, bg = '#fff', color = DARK, w = 150 }) => (
    <div style={{
      padding: '18px 16px', background: bg, color, borderRadius: 10,
      textAlign: 'center', minWidth: w, boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
      border: bg === '#fff' ? '1px solid rgba(20,20,19,0.08)' : 'none',
    }}>
      <div style={{ fontSize: 13, fontWeight: 600 }}>{title}</div>
      <div style={{ fontSize: 10.5, opacity: 0.65, marginTop: 3 }}>{sub}</div>
    </div>
  );
  const Arrow = ({ label }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <div style={{ fontSize: 20, color: GRAY }}>⟷</div>
      <div style={{ fontSize: 9, color: GRAY, fontFamily: MONO }}>{label}</div>
    </div>
  );
  return (
    <Slide bg={BONE} label="Remote Control">
      <div style={KICKER}>Scale & Integrate</div>
      <h2 style={H2}><code style={{ fontFamily: MONO, fontSize: 28 }}>claude remote-control</code></h2>
      <p style={{ ...SUB, maxWidth: 640 }}>
        Serve your local environment to claude.ai/code. Web UI in the browser,
        files and tools stay on your machine. The bridge between "I want the web UI"
        and "my repo can't leave this laptop."
      </p>
      <VCenter>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <Box title="Local daemon" sub="your filesystem, your tools" bg={DARK} color={BONE} />
          <Arrow label="encrypted tunnel" />
          {/* Trust boundary */}
          <div style={{
            padding: '6px 10px', borderLeft: `2px dashed ${CLAY}`, borderRight: `2px dashed ${CLAY}`,
            fontSize: 9, color: CLAY, fontWeight: 600, textAlign: 'center', alignSelf: 'stretch',
            display: 'flex', alignItems: 'center',
          }}>trust<br/>boundary</div>
          <Arrow label="WSS" />
          <Box title="claude.ai/code" sub="relay only — no file storage" />
          <Arrow label="HTTPS" />
          <Box title="Browser" sub="or phone, via Channels" bg={OAT} />
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
          {[
            { k: 'Airgapped repos', v: 'Internal code never uploads. The daemon serves files on demand; nothing persists in the cloud.' },
            { k: 'Locked-down laptops', v: 'Devs who can\'t install terminal tooling can run a background daemon and work entirely in-browser.' },
            { k: 'Session handoff', v: 'Start in terminal, continue in browser. Channels forwards approval prompts to your phone.' },
            { k: 'Push notifications', v: 'Claude pings your phone when a long task lands or needs approval. Kick it off, walk away.' },
          ].map((c, i) => (
            <div key={i} style={{
              flex: 1, padding: '12px 14px', background: '#fff', borderRadius: 8,
              border: '1px solid rgba(20,20,19,0.06)', borderTop: `3px solid ${CLAY}`,
            }}>
              <div style={{ fontSize: 12.5, fontWeight: 600, marginBottom: 4 }}>{c.k}</div>
              <div style={{ fontSize: 11, color: GRAY, lineHeight: 1.5 }}>{c.v}</div>
            </div>
          ))}
        </div>
      </VCenter>
    </Slide>
  );
}

// ── Enterprise Controls ───────────────────────────────────────────
// Issue #4. Dedicated slide — the InfoCard bullet in Slide_CCWeb
// can't carry this much. Deployment channels + hardening flags that
// security/platform teams ask about in the room.
function Slide_EnterpriseControls() {
  const mono = { fontFamily: MONO, fontSize: 10.5 };
  const groupHdr = { fontSize: 10.5, fontWeight: 600, color: CLAY, textTransform: 'uppercase', letterSpacing: '0.06em' };
  const Row = ({ k, v, code }) => (
    <div style={{
      display: 'grid', gridTemplateColumns: '196px 1fr', gap: 16,
      padding: '5px 0', borderBottom: '1px solid rgba(20,20,19,0.06)', alignItems: 'start',
    }}>
      <code style={{ ...mono, color: code ? CLAY : DARK, fontWeight: code ? 400 : 600, fontFamily: code ? MONO : 'inherit', fontSize: code ? 10.5 : 11.5 }}>{k}</code>
      <div style={{ fontSize: 11, color: GRAY, lineHeight: 1.4 }}>{v}</div>
    </div>
  );
  return (
    <Slide bg={BONE} label="Enterprise Controls">
      <div style={KICKER}>Governance</div>
      <h2 style={H2}>Enterprise deployment & hardening</h2>
      <p style={{ ...SUB, maxWidth: 660, marginBottom: 14 }}>
        Policy distribution and runtime hardening for fleets — the knobs your platform and security teams will ask about.
      </p>
      <div style={{
        padding: '14px 20px', background: '#fff',
        border: '1px solid rgba(20,20,19,0.08)', borderRadius: 12,
      }}>
        <div style={{ ...groupHdr, marginBottom: 2 }}>Policy deployment</div>
        <Row code k="managed-settings.json" v="Single org-wide policy file. The baseline." />
        <Row code k="managed-settings.d/*.json" v="Drop-in fragments — compose policies from multiple teams. Merged at load." />
        <Row code k="plist / Registry" v="MDM-native: macOS defaults plist, Windows Group Policy registry keys. wslInheritsWindowsSettings extends to WSL." />

        <div style={{ ...groupHdr, margin: '9px 0 2px' }}>Supply chain</div>
        <Row code k="blockedMarketplaces / strictKnownMarketplaces" v="Allowlist which plugin marketplaces are reachable. Block third-party plugin sources fleet-wide." />
        <Row code k="deniedMcpServers / allowedChannelPlugins" v="Block specific MCP servers (incl. claude.ai connectors); allowlist channel plugins for the org." />

        <div style={{ ...groupHdr, margin: '9px 0 2px' }}>Runtime hardening</div>
        <Row code k="/fewer-permission-prompts" v="Propose a read-only allowlist from real usage; ship via managed-settings. Cuts approve-fatigue." />
        <Row code k="sandbox.failIfUnavailable" v="Hard-error if the sandbox can't initialize. Fail closed, not open." />
        <Row code k="sandbox.allowRead" v="Carve read exceptions inside denyRead regions. Precise allowlisting." />
        <Row code k="CLAUDE_CODE_SUBPROCESS_ENV_SCRUB" v="Strip credentials from env before spawning subprocesses. Tools don't inherit secrets." />

        <div style={{ ...groupHdr, margin: '9px 0 2px' }}>Platform & cost</div>
        <Row code k="modelOverrides" v="Map /model picker entries to provider model IDs — Bedrock ARNs, Vertex regional IDs." />
        <Row code k="CLAUDE_CODE_PERFORCE_MODE" v="Perforce VCS support — Edit/Write surface p4 edit hints. Non-git shops." />
        <Row code k="ENABLE_PROMPT_CACHING_1H" v="Opt into 1-hour prompt cache TTL (API/Bedrock/Vertex/Foundry). Cuts repeat-read cost ~90%." />

        <div style={{ ...groupHdr, margin: '9px 0 2px' }}>Observability</div>
        <Row code k="OTEL_EXPORTER_OTLP_ENDPOINT" v="OpenTelemetry spans for every tool call & turn. Point at your existing collector." />
        <Row code k="X-Claude-Code-Session-Id" v="Header on every API request — correlate proxy logs and spend back to the session." />
      </div>
    </Slide>
  );
}

// ── Headless / CI ─────────────────────────────────────────────────
// Issue #7. The CI story: --bare for deterministic scripted runs,
// --console for service-account auth, -n for labeled history.
function Slide_HeadlessCI() {
  const mono = { fontFamily: MONO, fontSize: 11 };
  const Flag = ({ flag, desc }) => (
    <div style={{
      padding: '12px 16px', background: '#fff', borderRadius: 8,
      border: '1px solid rgba(20,20,19,0.06)', borderLeft: `3px solid ${CLAY}`,
    }}>
      <code style={{ ...mono, fontWeight: 600, color: CLAY }}>{flag}</code>
      <div style={{ fontSize: 11.5, color: GRAY, lineHeight: 1.45, marginTop: 4 }}>{desc}</div>
    </div>
  );
  return (
    <Slide bg={`linear-gradient(to right, ${BONE} 44%, ${OAT} 44%)`} label="Headless CI" padding="0">
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{
          flex: '0 0 44%', padding: '52px 40px', background: BONE,
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
        }}>
          <div style={KICKER}>Scale & Integrate</div>
          <h2 style={{ ...H2, fontSize: 28 }}>Claude Code in CI</h2>
          <p style={{ ...SUB, fontSize: 12.5, marginBottom: 18 }}>
            Scripted, headless, deterministic. No interactive login, no side effects.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Flag flag="--bare" desc="Disables hooks, LSP, plugin sync. Deterministic — the flag for CI." />
            <Flag flag="--console" desc="Auth via Anthropic Console API key. Service accounts, no claude.ai login." />
            <Flag flag="-p" desc="Print mode. One prompt in, result on stdout, exit." />
            <Flag flag="-n / --name" desc="Label the session. Find CI runs in history later." />
          </div>
        </div>
        <div style={{
          flex: 1, background: OAT, padding: '40px 36px',
          display: 'flex', alignItems: 'center',
        }}>
          <EditorMockup filename=".github/workflows/claude-review.yml" width="100%">
            <ELine num={1}><Kw>jobs</Kw><Punc>:</Punc></ELine>
            <ELine num={2} indent={1}><Kw>review</Kw><Punc>:</Punc></ELine>
            <ELine num={3} indent={2}><Kw>runs-on</Kw><Punc>:</Punc> ubuntu-latest</ELine>
            <ELine num={4} indent={2}><Kw>steps</Kw><Punc>:</Punc></ELine>
            <ELine num={5} indent={3}><Punc>-</Punc> <Kw>uses</Kw><Punc>:</Punc> actions/checkout@v4</ELine>
            <ELine num={6} indent={3}><Punc>-</Punc> <Kw>run</Kw><Punc>:</Punc> npm i -g @anthropic-ai/claude-code</ELine>
            <ELine num={7} indent={3}><Punc>-</Punc> <Kw>run</Kw><Punc>:</Punc> <Punc>|</Punc></ELine>
            <ELine num={8} indent={5}>claude --console --bare \</ELine>
            <ELine num={9} indent={6}>-n <Str>"ci-review-{'${{'} github.sha {'}}'}"</Str> \</ELine>
            <ELine num={10} indent={6}>-p <Str>"Review the diff against main. \</Str></ELine>
            <ELine num={11} indent={6}><Str>Post findings as a PR comment."</Str></ELine>
            <ELine num={12} indent={4}><Kw>env</Kw><Punc>:</Punc></ELine>
            <ELine num={13} indent={5}><Kw>ANTHROPIC_API_KEY</Kw><Punc>:</Punc> {'${{'} secrets.ANTHROPIC_API_KEY {'}}'}</ELine>
          </EditorMockup>
        </div>
      </div>
    </Slide>
  );
}

// ── /ultrareview ──────────────────────────────────────────────────
// Issue #91. Built-in fan-out review: N reviewer agents in the cloud
// against the current branch, each takes a different angle, findings
// consolidate.
function Slide_UltraReview() {
  const reviewers = [
    { name: 'correctness', tint: '#7bb8d9', f: '2 findings' },
    { name: 'security',    tint: CLAY,      f: '1 finding'  },
    { name: 'perf',        tint: '#8fba6a', f: 'clean'      },
    { name: 'style',       tint: '#b89bd4', f: '3 nits'     },
  ];
  const cmd = { fontFamily: MONO, fontSize: 11, color: CLAY };
  const Node = ({ label, sub, tint, w }) => (
    <div style={{
      width: w, padding: '10px 12px', background: '#fff', borderRadius: 8,
      border: '1px solid rgba(20,20,19,0.08)', borderLeft: '3px solid ' + (tint || CLAY),
      textAlign: 'center',
    }}>
      <div style={{ fontFamily: MONO, fontSize: 11, fontWeight: 600 }}>{label}</div>
      {sub && <div style={{ fontSize: 9.5, color: GRAY, marginTop: 2 }}>{sub}</div>}
    </div>
  );
  return (
    <Slide bg={BONE} label="/ultrareview">
      <div style={KICKER}>Built-in parallelism</div>
      <h2 style={H2}><code style={{ fontFamily: MONO, fontSize: 28 }}>/ultrareview</code></h2>
      <p style={{ ...SUB, maxWidth: 640 }}>
        One command, N reviewer agents in the cloud. Each takes a different angle on
        your branch — correctness, security, perf, idiom — then consolidate. The
        compute happens off-box; your laptop stays free.
      </p>

      <VCenter>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, width: '100%' }}>
          <Node label="your branch" sub="diffstat: 14 files · +412 −88" w={280} />
          <div style={{ fontSize: 18, color: GRAY }}>↓</div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            {reviewers.map((r, i) => <Node key={i} label={r.name} sub={r.f} tint={r.tint} w={130} />)}
          </div>
          <div style={{ fontSize: 18, color: GRAY }}>↓</div>
          <Node label="consolidated review" sub="6 findings · ranked · de-duped" w={280} />
        </div>
      </VCenter>

      <p style={{ fontSize: 11.5, color: GRAY, marginTop: 14, textAlign: 'center' }}>
        <code style={cmd}>/ultrareview</code> — current branch ·{' '}
        <code style={cmd}>/ultrareview 1234</code> — a GitHub PR ·{' '}
        <code style={cmd}>/ultraplan</code> — same engine, planning instead of reviewing.
        Reach for <code style={cmd}>/security-review</code> when you want one fast local pass; this when you want depth.
      </p>
    </Slide>
  );
}

// ── Deep Links ────────────────────────────────────────────────────
// Issue #105. claude-cli://open?q=<prompt> — launch CC with a pre-filled
// prompt from any internal tool. Runbook → one click → agent already
// briefed. The zero-code integration path before you reach for MCP.
function Slide_DeepLinks() {
  const mono = { fontFamily: MONO, fontSize: 11 };
  const SideCard = ({ title, children }) => (
    <div style={{
      padding: '14px 16px', background: '#fff', borderRadius: 8,
      border: '1px solid rgba(20,20,19,0.08)', borderLeft: `3px solid ${CLAY}`,
    }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: CLAY, marginBottom: 4 }}>{title}</div>
      <div style={{ fontSize: 12, color: GRAY, lineHeight: 1.5 }}>{children}</div>
    </div>
  );
  return (
    <SplitBg label="Deep links"
      left={
        <AbsHeader kicker="Integrate · zero-code" h2="Deep links"
          sub={<>A <code style={mono}>claude-cli://</code> URL opens Claude Code in the right repo with the prompt already typed. Put one in a runbook, a Jira ticket, an alert — one click and the agent is briefed.</>}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <SideCard title="Runbooks that act">
              The on-call doc links straight to the fix. No copy-pasting the incident ID,
              no "cd to the right repo first."
            </SideCard>
            <SideCard title="5,000 chars, newlines OK">
              Enough room to embed a full investigation prompt — log snippet, file paths,
              the question. <code style={mono}>cwd</code> param picks the working directory.
            </SideCard>
            <SideCard title="Locked-down fleets">
              <code style={mono}>disableDeepLinkRegistration</code> in managed settings turns
              the handler off org-wide if security needs it.
            </SideCard>
          </div>
        </AbsHeader>
      }
      right={
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: '100%' }}>
          <EditorMockup filename="runbooks/payments-5xx.md" width="100%">
            <ELine num={1}><Kw>## Payments 5xx spike</Kw></ELine>
            <ELine num={2}></ELine>
            <ELine num={3}>1. Check the dashboard for the failing route</ELine>
            <ELine num={4}>2. <Punc>[</Punc><Typ>Investigate with Claude</Typ><Punc>](</Punc><Str>claude-cli://open</Str></ELine>
            <ELine num={5}>   <Str>?cwd=~/src/payments</Str></ELine>
            <ELine num={6}>   <Str>&amp;q=Payments+is+throwing+5xx.+Read+the+last+200</Str></ELine>
            <ELine num={7}>   <Str>+lines+of+logs/app.log+and+find+the+failing+route.</Str><Punc>)</Punc></ELine>
          </EditorMockup>
          <TerminalMockup title="~/src/payments" width="100%">
            <TLine><TOrange>{'>'}</TOrange> Payments is throwing 5xx. Read the last 200</TLine>
            <TLine>  lines of logs/app.log and find the failing route.</TLine>
            <TBlank />
            <TLine><TDim>● Reading logs/app.log…</TDim></TLine>
          </TerminalMockup>
        </div>
      }
    />
  );
}

// ── GitHub App ────────────────────────────────────────────────────
// Issue #71. The first-party @claude GitHub App — interactive PR/issue
// workflows. Complements HeadlessCI (which is the scripted/deterministic path).
function Slide_GitHubApp() {
  const mono = { fontFamily: MONO, fontSize: 11 };
  const Step = ({ n, title, desc }) => (
    <div style={{
      padding: '12px 16px', background: '#fff', borderRadius: 8,
      border: '1px solid rgba(20,20,19,0.06)', borderLeft: `3px solid ${CLAY}`,
    }}>
      <div style={{ fontSize: 12.5, fontWeight: 600, marginBottom: 2 }}>
        <span style={{ color: CLAY, fontFamily: SERIF, marginRight: 8 }}>{n}</span>{title}
      </div>
      <div style={{ fontSize: 11.5, color: GRAY, lineHeight: 1.45 }}>{desc}</div>
    </div>
  );
  return (
    <Slide bg={`linear-gradient(to right, ${BONE} 44%, ${OAT} 44%)`} label="GitHub App" padding="0">
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{
          flex: '0 0 44%', padding: '52px 40px', background: BONE,
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
        }}>
          <div style={KICKER}>Scale & Integrate</div>
          <h2 style={{ ...H2, fontSize: 28 }}>@claude in GitHub</h2>
          <p style={{ ...SUB, fontSize: 12.5, marginBottom: 18 }}>
            First-party GitHub App. Tag <code style={mono}>@claude</code> in any PR or
            issue — it replies in-thread, edits code, opens PRs. No per-repo API-key plumbing.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Step n="1" title="Install" desc={<><code style={mono}>/install-github-app</code> from the CLI, or via GitHub Marketplace.</>} />
            <Step n="2" title="Mention" desc={<>Comment <code style={mono}>@claude fix the failing test</code> on any PR or issue.</>} />
            <Step n="3" title="Review" desc="Claude replies with a plan, pushes commits, or opens a follow-up PR. You approve." />
          </div>
          <div style={{ fontSize: 11, color: GRAY, marginTop: 14 }}>
            Runs <code style={mono}>anthropics/claude-code-action</code> under the hood — same agent, GitHub-native UX.
          </div>
        </div>
        <div style={{
          flex: 1, background: OAT, padding: '40px 36px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            width: '100%', background: '#fff', borderRadius: 10,
            border: '1px solid rgba(20,20,19,0.08)', overflow: 'hidden',
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
          }}>
            <div style={{
              padding: '10px 16px', borderBottom: '1px solid rgba(20,20,19,0.06)',
              fontSize: 11, color: GRAY, display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{ fontWeight: 600, color: DARK }}>PR #1423</span> · auth: fix race in token refresh
            </div>
            <div style={{ padding: '14px 16px', fontSize: 11.5, lineHeight: 1.5 }}>
              <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
                <div style={{ width: 24, height: 24, borderRadius: 12, background: '#6a9bcc', flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 11 }}>dana-k <span style={{ color: GRAY, fontWeight: 400 }}>· 2 min ago</span></div>
                  <div><code style={{ ...mono, color: CLAY }}>@claude</code> the test in <code style={mono}>auth.spec.ts</code> is flaking on CI — can you find the race and fix it?</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <div style={{ width: 24, height: 24, borderRadius: 12, background: CLAY, flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 11 }}>claude <span style={{ color: GRAY, fontWeight: 400 }}>· just now</span></div>
                  <div style={{ color: GRAY }}>
                    Found it — <code style={mono}>refreshToken</code> resolves after the assertion when the mock clock skews.
                    Pushed <code style={{ ...mono, color: '#2a7a3c' }}>a3f9c1e</code> with an awaited barrier; CI is green on re-run. ✅
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
}

// ── Agent SDK ─────────────────────────────────────────────────────
// Issue #72. Embed the agent loop in your own tools — TS/Python library.
// SDK = embedded with custom UI/tools; -p = shell-out.
function Slide_AgentSDK() {
  const mono = { fontFamily: MONO, fontSize: 11 };
  const Bullet = ({ k, v }) => (
    <div style={{ display: 'flex', gap: 10, fontSize: 11.5, alignItems: 'baseline', marginBottom: 6 }}>
      <span style={{ color: CLAY, fontWeight: 600, minWidth: 76 }}>{k}</span>
      <span style={{ color: GRAY, lineHeight: 1.45 }}>{v}</span>
    </div>
  );
  return (
    <Slide bg={`linear-gradient(to right, ${BONE} 44%, ${OAT} 44%)`} label="Agent SDK" padding="0">
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{
          flex: '0 0 44%', padding: '52px 40px', background: BONE,
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
        }}>
          <div style={KICKER}>Scale & Integrate</div>
          <h2 style={{ ...H2, fontSize: 28 }}>Agent SDK</h2>
          <p style={{ ...SUB, fontSize: 12.5, marginBottom: 16 }}>
            The same agent loop as the CLI — tools, hooks, permissions, subagents,
            MCP — as a TypeScript or Python library. Embed it in <em>your</em> tool.
          </p>
          <Bullet k="Same loop" v="Read · Decide · Act · Observe. Identical behavior to the terminal." />
          <Bullet k="Your tools" v="Register custom tools alongside Read/Edit/Bash. Domain actions, internal APIs." />
          <Bullet k="Your UI" v="Stream events to whatever surface you own — web panel, IDE plugin, chatops." />
          <div style={{
            marginTop: 14, padding: '10px 14px', background: 'rgba(217,119,87,0.06)',
            borderRadius: 8, fontSize: 11, color: DARK, lineHeight: 1.5,
          }}>
            <strong style={{ color: CLAY }}>SDK vs <code style={mono}>claude -p</code>:</strong>{' '}
            shell out with <code style={mono}>-p</code> when you just need an answer on stdout.
            Reach for the SDK when you're building a product around the loop.
          </div>
        </div>
        <div style={{
          flex: 1, background: OAT, padding: '40px 36px',
          display: 'flex', alignItems: 'center',
        }}>
          <EditorMockup filename="review-bot.ts" width="100%">
            <ELine num={1}><Kw>import</Kw> <Punc>{'{'}</Punc> query <Punc>{'}'}</Punc> <Kw>from</Kw> <Str>'@anthropic-ai/claude-agent-sdk'</Str></ELine>
            <ELine num={2}></ELine>
            <ELine num={3}><Kw>const</Kw> postReview <Punc>=</Punc> <Punc>{'{'}</Punc></ELine>
            <ELine num={4} indent={1}>name<Punc>:</Punc> <Str>'post_review'</Str><Punc>,</Punc></ELine>
            <ELine num={5} indent={1}>description<Punc>:</Punc> <Str>'Post a PR review comment'</Str><Punc>,</Punc></ELine>
            <ELine num={6} indent={1}>input_schema<Punc>:</Punc> <Punc>{'{'}</Punc> <Cmt>/* path, line, body */</Cmt> <Punc>{'}'}</Punc><Punc>,</Punc></ELine>
            <ELine num={7} indent={1}>handler<Punc>:</Punc> <Kw>async</Kw> <Punc>(</Punc>args<Punc>)</Punc> <Punc>{'=>'}</Punc> gh.createReviewComment<Punc>(</Punc>args<Punc>)</Punc><Punc>,</Punc></ELine>
            <ELine num={8}><Punc>{'}'}</Punc></ELine>
            <ELine num={9}></ELine>
            <ELine num={10}><Kw>for await</Kw> <Punc>(</Punc><Kw>const</Kw> ev <Kw>of</Kw> query<Punc>({'{'}</Punc></ELine>
            <ELine num={11} indent={1}>prompt<Punc>:</Punc> <Str>'Review the diff against main for security issues.'</Str><Punc>,</Punc></ELine>
            <ELine num={12} indent={1}>tools<Punc>:</Punc> <Punc>[</Punc>postReview<Punc>],</Punc></ELine>
            <ELine num={13}><Punc>{'}'})</Punc><Punc>)</Punc> ui.render<Punc>(</Punc>ev<Punc>)</Punc></ELine>
          </EditorMockup>
        </div>
      </div>
    </Slide>
  );
}

Object.assign(window, {
  Slide_Section301, Slide_ParallelPatterns, Slide_Subagents, Slide_CustomAgents, Slide_Demo5, Slide_MCP, Slide_Demo6,
  Slide_CCWeb, Slide_ScheduledTasks, Slide_CCMobile, Slide_RemoteControl, Slide_ManagedMCP,
  Slide_DeepLinks, Slide_EnterpriseControls, Slide_GitHubApp, Slide_HeadlessCI, Slide_AgentSDK, Slide_APIAuth,
  Slide_Ex3, Slide_Plugins, Slide_MustHavePlugins, Slide_Ex4, Slide_AgentTeams, Slide_ParallelCompare, Slide_AgentView, Slide_AgentViewSim, Slide_UltraReview, Slide_Demo7,
});

} // end scoped block
