{
const CLAY = '#D97757', OAT = '#F0EEE6', DARK = '#141413', BONE = '#FAF9F5',
      SLATE = '#1A1915', GRAY = '#73726C', BORDER = 'rgba(31,30,29,0.10)';
const SERIF = "'Anthropic Serif', Georgia, serif";
const MONO = "'JetBrains Mono', monospace";
const _P = window.DECK_PROFILE || {};
const CUSTOMER = (_P.customer) || 'Your Company';

const LABEL = { fontSize: 14, fontWeight: 500, color: CLAY, textTransform: 'uppercase',
                letterSpacing: '0.08em', marginBottom: 10 };
const H2 = { fontSize: 38, fontWeight: 600, lineHeight: 1.15, margin: '0 0 12px',
             letterSpacing: '-0.01em' };
const SUB = { fontSize: 21, fontWeight: 400, color: GRAY, lineHeight: 1.45,
              margin: '0 0 32px', maxWidth: 680 };

function CwHeader({ label, title, sub, dark }) {
  return <>
    {label && <div style={LABEL}>{label}</div>}
    <h2 style={{ ...H2, color: dark ? BONE : DARK }}>{title}</h2>
    {sub && <p style={{ ...SUB, color: dark ? 'rgba(250,249,245,0.7)' : GRAY }}>{sub}</p>}
  </>;
}

function CwCard({ title, desc, accent = CLAY }) {
  return <div style={{ background: '#fff', border: `1.5px solid ${BORDER}`, borderRadius: 12,
                       padding: '24px 22px', display: 'flex', flexDirection: 'column', gap: 10,
                       flex: 1, minWidth: 0 }}>
    <div style={{ width: 36, height: 4, background: accent, borderRadius: 2 }} />
    <div style={{ fontSize: 19, fontWeight: 600 }}>{title}</div>
    <div style={{ fontSize: 15, color: GRAY, lineHeight: 1.5 }}>{desc}</div>
  </div>;
}

function TeamCard({ team, title, desc, dark = true }) {
  const fg = dark ? BONE : DARK;
  return <div style={{ background: dark ? 'rgba(0,0,0,0.18)' : '#fff',
                       borderRadius: 12, padding: '18px 20px',
                       border: dark ? 'none' : `1px solid ${BORDER}` }}>
    <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase',
                  letterSpacing: '0.06em', color: dark ? 'rgba(255,255,255,0.55)' : GRAY,
                  marginBottom: 6 }}>{team}</div>
    <div style={{ fontSize: 18, fontWeight: 600, color: fg, marginBottom: 5 }}>{title}</div>
    <div style={{ fontSize: 14, lineHeight: 1.45,
                  color: dark ? 'rgba(255,255,255,0.72)' : GRAY }}>{desc}</div>
  </div>;
}

function TimelineStep({ day, text, active }) {
  return <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start', marginBottom: 16 }}>
    <div style={{ width: 56, height: 56, borderRadius: 12, flexShrink: 0,
                  background: active ? CLAY : OAT, color: active ? BONE : DARK,
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  justifyContent: 'center' }}>
      <div style={{ fontSize: 9, fontWeight: 600, opacity: 0.7, letterSpacing: '0.05em' }}>DAY</div>
      <div style={{ fontSize: 20, fontWeight: 600, lineHeight: 1 }}>{day}</div>
    </div>
    <div style={{ fontSize: 18, lineHeight: 1.5, paddingTop: 14 }}>{text}</div>
  </div>;
}

function PromptCard({ n, text }) {
  return <div style={{ display: 'flex', gap: 16, padding: '16px 20px', background: '#fff',
                       border: `1px solid ${BORDER}`, borderRadius: 10, marginBottom: 12,
                       alignItems: 'flex-start' }}>
    <div style={{ width: 28, height: 28, borderRadius: 14, background: CLAY, color: BONE,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, fontWeight: 600, flexShrink: 0 }}>{n}</div>
    <div style={{ fontFamily: MONO, fontSize: 14, lineHeight: 1.6, fontStyle: 'italic',
                  color: DARK }}>{'"'}{text}{'"'}</div>
  </div>;
}

function CoworkMockup({ folder, files = [], prompt, height = 380 }) {
  const tab = (name, active) =>
    <div style={{ padding: '6px 14px', fontSize: 12, fontWeight: 500,
                  borderBottom: active ? `2px solid ${CLAY}` : '2px solid transparent',
                  color: active ? DARK : GRAY }}>{name}</div>;
  return <div style={{ background: '#fff', borderRadius: 10, border: `1px solid ${BORDER}`,
                       boxShadow: '0 4px 24px rgba(0,0,0,0.08)', overflow: 'hidden',
                       height, display: 'flex', flexDirection: 'column' }}>
    <div style={{ display: 'flex', alignItems: 'center', padding: '8px 12px',
                  borderBottom: `1px solid ${BORDER}`, gap: 6 }}>
      <span style={{ width: 10, height: 10, borderRadius: 5, background: '#ff5f57' }} />
      <span style={{ width: 10, height: 10, borderRadius: 5, background: '#febc2e' }} />
      <span style={{ width: 10, height: 10, borderRadius: 5, background: '#28c840' }} />
      <div style={{ display: 'flex', marginLeft: 16 }}>
        {tab('Chat', false)}{tab('Cowork', true)}{tab('Code', false)}
      </div>
    </div>
    <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
      <div style={{ width: 170, borderRight: `1px solid ${BORDER}`, padding: '12px 14px',
                    background: '#FDFCFA', fontSize: 12 }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: GRAY, textTransform: 'uppercase',
                      letterSpacing: '0.05em', marginBottom: 8 }}>Working folder</div>
        <div style={{ fontFamily: MONO, fontSize: 11, color: DARK, marginBottom: 10,
                      wordBreak: 'break-all' }}>{folder || '~/work'}</div>
        {files.map((f, i) =>
          <div key={i} style={{ fontFamily: MONO, fontSize: 11, color: GRAY,
                                padding: '3px 0', overflow: 'hidden',
                                textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f}</div>)}
      </div>
      <div style={{ flex: 1, padding: '16px 18px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1 }} />
        <div style={{ background: OAT, borderRadius: 10, padding: '14px 16px',
                      fontSize: 14, lineHeight: 1.55, fontFamily: MONO }}>
          {prompt || 'Describe what done looks like…'}
        </div>
        <div style={{ marginTop: 8, fontSize: 11, color: GRAY,
                      textAlign: 'right' }}>⏎ to run</div>
      </div>
    </div>
  </div>;
}

function Chip({ children }) {
  return <span style={{ display: 'inline-block', fontFamily: MONO, fontSize: 12,
                        background: OAT, padding: '3px 9px', borderRadius: 5,
                        marginRight: 6, marginBottom: 4 }}>{children}</span>;
}

function InvolvedRow({ label, children }) {
  return <div style={{ display: 'flex', gap: 16, padding: '10px 0',
                       borderBottom: `1px solid ${BORDER}`, alignItems: 'flex-start' }}>
    <div style={{ width: 100, fontSize: 11, fontWeight: 600, textTransform: 'uppercase',
                  letterSpacing: '0.05em', color: GRAY, flexShrink: 0, paddingTop: 2 }}>
      {label}</div>
    <div style={{ flex: 1, fontSize: 14, lineHeight: 1.5 }}>{children}</div>
  </div>;
}

function CwDemoScenario({ n, dept, problem, files = [], connectors = [], output, prompt }) {
  return <Slide label={'Demo ' + n}>
    <div style={{ display: 'flex', justifyContent: 'space-between',
                  alignItems: 'baseline', marginBottom: 18 }}>
      <div style={{ ...LABEL, marginBottom: 0, fontSize: 13 }}>{dept}</div>
      <div style={{ fontSize: 12, fontWeight: 500, color: GRAY, fontFamily: MONO }}>
        LIVE DEMO {n}</div>
    </div>
    <div style={{ fontSize: 25, lineHeight: 1.45, fontWeight: 500, color: DARK,
                  marginBottom: 26, maxWidth: 820 }}>
      {'"'}{problem}{'"'}</div>
    <div style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 10,
                  padding: '8px 20px 4px', marginBottom: 18 }}>
      <InvolvedRow label="Files">
        {files.map((f, i) => <Chip key={i}>{f}</Chip>)}</InvolvedRow>
      <InvolvedRow label="Connectors">
        {connectors.length
          ? connectors.map((c, i) => <Chip key={i}>{c}</Chip>)
          : <span style={{ color: GRAY }}>Local files only</span>}
      </InvolvedRow>
      <InvolvedRow label="Output">{output}</InvolvedRow>
    </div>
    <div style={{ background: SLATE, color: BONE, borderRadius: 8, padding: '14px 18px',
                  fontFamily: MONO, fontSize: 13, lineHeight: 1.6 }}>
      <span style={{ color: CLAY, marginRight: 8 }}>›</span>{prompt}</div>
  </Slide>;
}

function CwUseCaseCard({ dept, title, problem, connectors, files, output }) {
  return <div style={{ background: 'rgba(0,0,0,0.18)', borderRadius: 12, padding: '18px 20px',
                       display: 'flex', flexDirection: 'column', gap: 8 }}>
    <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase',
                  letterSpacing: '0.06em', color: 'rgba(255,255,255,0.55)' }}>{dept}</div>
    <div style={{ fontSize: 17, fontWeight: 600, color: BONE }}>{title}</div>
    <div style={{ fontSize: 13, lineHeight: 1.45, color: 'rgba(255,255,255,0.8)',
                  marginBottom: 4 }}>{problem}</div>
    <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: 8,
                  fontSize: 11, lineHeight: 1.7, color: 'rgba(255,255,255,0.6)' }}>
      <div><b style={{ color: 'rgba(255,255,255,0.8)' }}>Connectors:</b> {connectors}</div>
      <div><b style={{ color: 'rgba(255,255,255,0.8)' }}>Files:</b> {files}</div>
      <div><b style={{ color: 'rgba(255,255,255,0.8)' }}>Output:</b> {output}</div>
    </div>
  </div>;
}

function StackRow({ label, items, note, accent }) {
  return <div style={{ display: 'flex', gap: 20, padding: '16px 0',
                       borderBottom: `1px solid ${BORDER}`, alignItems: 'flex-start' }}>
    <div style={{ width: 150, fontSize: 14, fontWeight: 600,
                  color: accent || DARK, flexShrink: 0 }}>{label}</div>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 16, lineHeight: 1.5 }}>{items}</div>
      {note && <div style={{ fontSize: 13, color: GRAY, marginTop: 4,
                             fontStyle: 'italic' }}>{note}</div>}
    </div>
  </div>;
}

// ───────────────────────────── Part 1 — What Cowork Is ─────────────────────────────

function Slide_CwTitle() {
  const cobrand = _P.cobrand || {};
  const presenters = (_P.presenters || []).join(' · ');
  return <Slide bg={SLATE} color={BONE} center label="Title">
    <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 40 }}>
      <img src="../_shared/assets/clay-spark.svg" alt="" style={{ height: 44 }} />
      {cobrand.src && <>
        <div style={{ width: 1, height: 36, background: 'rgba(250,249,245,0.25)' }} />
        <img src={cobrand.src} alt={cobrand.alt || ''}
             style={{ height: cobrand.height || 28, filter: cobrand.filter }} />
      </>}
    </div>
    <h1 style={{ fontFamily: SERIF, fontSize: 52, fontWeight: 360, margin: 0,
                 letterSpacing: '-0.01em' }}>Claude Cowork</h1>
    <p style={{ fontSize: 22, color: CLAY, margin: '10px 0 0', fontWeight: 500 }}>
      Getting real work done</p>
    <p style={{ fontSize: 14, color: 'rgba(250,249,245,0.5)', margin: '48px 0 0',
                fontFamily: MONO }}>{presenters || 'Anthropic Applied AI'}</p>
  </Slide>;
}

function Slide_CwAgenda() {
  return <Slide label="Agenda">
    <CwHeader label="60 minutes" title="Agenda" />
    <VCenter>
      <AgendaBlock duration="9 min" title="What Cowork is" color={CLAY} />
      <AgendaBlock duration="28 min" title="See it work — 3 live demos" color={CLAY} isDemo />
      <AgendaBlock duration="17 min" title="Making it stick" color={CLAY} />
    </VCenter>
  </Slide>;
}

function Slide_CwPoll() {
  return <Slide bg={OAT} label="Quick poll">
    <VCenter lift={2.2}>
      <div style={LABEL}>Quick poll — hands up</div>
      <h2 style={{ ...H2, fontSize: 42, maxWidth: 760 }}>
        Who spends more than an hour a day on repetitive file or data tasks?</h2>
      <p style={{ ...SUB, marginTop: 18 }}>
        Reformatting, reconciling, copy-pasting between tools.</p>
    </VCenter>
  </Slide>;
}

function Slide_CwWhatIs() {
  return <Slide label="What Cowork Is">
    <CwHeader label="The product" title="What Cowork is"
      sub="Claude Cowork handles tasks autonomously. Give it a goal and Claude works on your computer, local files, and applications to return a finished deliverable." />
    <div style={{ display: 'flex', gap: 18 }}>
      <CwCard title="Desktop app"
        desc="Runs on your machine. Same install your engineers use for Claude Code — two tabs in one sidebar." />
      <CwCard title="Scoped folder access"
        desc="Point it at a folder. It reads, creates, and edits files there. You control the scope." />
      <CwCard title="No code required"
        desc="Describe what done looks like in plain English. Finished work in your formats — xlsx, docx, pptx." />
    </div>
  </Slide>;
}

function Slide_CwVsChat() {
  const row = (era, name, who, what) =>
    <div style={{ display: 'flex', gap: 20, padding: '16px 0',
                  borderBottom: `1px solid ${BORDER}`, alignItems: 'baseline' }}>
      <div style={{ width: 60, fontFamily: MONO, fontSize: 13, color: GRAY }}>{era}</div>
      <div style={{ width: 140, fontSize: 18, fontWeight: 600 }}>{name}</div>
      <div style={{ width: 180, fontSize: 15, color: GRAY }}>{who}</div>
      <div style={{ flex: 1, fontSize: 15 }}>{what}</div>
    </div>;
  return <Slide label="If it's work, start in Cowork">
    <CwHeader label="Positioning" title="If it's work, start in Cowork"
      sub="In Chat, you work with Claude — advise, draft, iterate. In Cowork, Claude works for you — execute, deliver." />
    <VCenter stretch>
      {row('2023', 'Chat', 'Everyone', 'A conversation. You do the work; Claude helps.')}
      {row('2025', 'Code', 'Engineers', 'An agent in the terminal. ' + CUSTOMER + ' eng runs it today.')}
      {row('2026', 'Cowork', 'Everyone else', 'The same agent, no terminal. Finished deliverables, not chat.')}
    </VCenter>
  </Slide>;
}

function Slide_CwWhyHere() {
  const w = (_P.whyHere) || {};
  return <Slide bg={CLAY} color={BONE} label={'Why ' + CUSTOMER}>
    <CwHeader dark label="The opportunity" title={w.headline || ('Why this matters at ' + CUSTOMER)} />
    <VCenter>
      <div style={{ fontSize: 22, lineHeight: 1.65, maxWidth: 780,
                    color: 'rgba(250,249,245,0.92)' }}>
        {w.body || 'Every team has a manual middle — data arriving in slightly different formats, all needing a human to reconcile before anyone can decide.'}
      </div>
    </VCenter>
  </Slide>;
}

// ───────────────────────────── Part 2 — See It Work ─────────────────────────────

function cwDemo(idx) {
  const d = (_P.demos && _P.demos[idx]) || {};
  return function() {
    return <CwDemoScenario n={idx + 1} dept={d.dept} problem={d.problem}
      files={d.files} connectors={d.connectors} output={d.output} prompt={d.prompt} />;
  };
}
const Slide_CwDemo1 = cwDemo(0);
const Slide_CwDemo2 = cwDemo(1);
const Slide_CwDemo3 = cwDemo(2);

function Slide_CwPattern() {
  return <Slide bg={OAT} label="The pattern">
    <VCenter lift={2.0}>
      <div style={LABEL}>The pattern</div>
      <h2 style={{ ...H2, fontSize: 44, maxWidth: 760 }}>
        You described the outcome.<br />Claude did the steps.</h2>
      <p style={{ ...SUB, marginTop: 24 }}>
        {(_P.pattern && _P.pattern.sub) ||
         'Chat hands you one draft to copy-paste. Cowork writes finished files into your folder — it does the steps, not just the words.'}</p>
    </VCenter>
  </Slide>;
}

function Slide_CwSkillsIntro() {
  return <Slide label="What are Skills">
    <CwHeader label="Reuse" title="Skills"
      sub="A Skill is a saved workflow. You did it once, you want it again next week — without re-explaining." />
    <div style={{ display: 'flex', gap: 18 }}>
      <CwCard title="Team playbooks that execute themselves"
        desc="Capture the prompt, the context, the output format. One person builds it; the whole team runs it." />
      <CwCard title="Plugins bundle Skills per role"
        desc="Skills + Connectors + sub-agents packaged together. Install the Finance plugin, Claude becomes a Finance specialist." />
    </div>
  </Slide>;
}

function cwOtherUses(key, defaultTitle) {
  return function() {
    const u = (_P.otherUses && _P.otherUses[key]) || {};
    const cases = u.cases || [];
    const cols = cases.length > 3 ? '1fr 1fr' : '1fr 1fr 1fr';
    return <Slide bg={CLAY} color={BONE} label={u.title || defaultTitle}>
      <CwHeader dark label="Beyond the demos" title={u.title || defaultTitle}
        sub="Same pattern, your domain. Connectors, files, and output called out." />
      <div style={{ display: 'grid', gridTemplateColumns: cols, gap: 14 }}>
        {cases.map((c, i) => <CwUseCaseCard key={i} {...c} />)}
      </div>
    </Slide>;
  };
}
const Slide_CwOtherUsesA = cwOtherUses('a', 'Other teams — program & technical');
const Slide_CwOtherUsesB = cwOtherUses('b', 'Other teams — operations & finance');

function Slide_CwConnectors() {
  return <Slide label="What are Connectors">
    <CwHeader label="Live context" title="Connectors"
      sub="Secure access to your apps — Calendar, Drive, Slack, and more — so Cowork pulls live context, not just local files. Your admin controls what it can read and write per tool." />
    <VCenter>
      <div style={{ fontSize: 26, fontWeight: 500, lineHeight: 1.6, maxWidth: 720,
                    color: DARK }}>
        Combine sources: your <b>calendar</b> + the docs in <b>Drive</b> + the
        thread in <b>Slack</b> — one prompt, one deliverable.</div>
    </VCenter>
  </Slide>;
}

function Slide_CwYourStack() {
  const s = (_P.stack) || {};
  return <Slide label="Your stack">
    <CwHeader label="Honest slide" title={'Your stack at ' + CUSTOMER}
      sub="What works today, what's coming, and when." />
    <VCenter stretch>
      <StackRow label="Works today" accent="#2A7A3B"
        items={(s.today || ['Google Workspace', 'Slack', 'Local files']).join(' · ')}
        note={s.todayNote || 'Connect these in week 1.'} />
      <StackRow label={s.comingLabel || 'Coming soon'} accent={CLAY}
        items={(s.coming || []).join(' · ')}
        note={s.comingNote} />
      <StackRow label="Roadmap"
        items={s.roadmap || 'Additional enterprise connectors'}
        note={s.roadmapNote} />
    </VCenter>
  </Slide>;
}

function Slide_CwSchedules() {
  const ex = (_P.schedules) || [
    { cadence: 'DAILY · 8AM', title: 'Yesterday, summarized',
      outcome: 'What landed in your inbox and calendar overnight, in one paragraph.' },
    { cadence: 'FRIDAYS', title: 'Week in review',
      outcome: 'This week\'s docs and threads rolled into one page.' },
    { cadence: 'MONTHLY', title: 'Contract renewal check',
      outcome: 'Re-run the Contract Intake skill on your vendor folder.' },
  ];
  const row = (cadence, title, outcome) =>
    <div style={{ display: 'flex', gap: 20, alignItems: 'center', padding: '16px 0',
                  borderBottom: `1px solid ${BORDER}` }}>
      <div style={{ width: 116, padding: '10px 0', borderRadius: 8, background: CLAY,
                    color: BONE, fontSize: 12, fontWeight: 600, textAlign: 'center',
                    fontFamily: MONO, letterSpacing: '0.03em', flexShrink: 0 }}>{cadence}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 19, fontWeight: 600, marginBottom: 3 }}>{title}</div>
        <div style={{ fontSize: 15, color: GRAY, lineHeight: 1.5 }}>{outcome}</div>
      </div>
    </div>;
  return <Slide label="Scheduled tasks">
    <CwHeader label="Recurring work" title="Scheduled tasks"
      sub="Describe the task once, pick a cadence, and Cowork runs it for you. Same connectors, same Skills — no re-prompting." />
    <div style={{ maxWidth: 740, marginTop: 4 }}>
      {ex.map((e, i) => <div key={i}>{row(e.cadence, e.title, e.outcome)}</div>)}
    </div>
  </Slide>;
}

function Slide_CwTeamConnectors() {
  const items = (_P.teamConnectors) || [];
  return <Slide bg={CLAY} color={BONE} label="Connector workflows">
    <CwHeader dark title={'Once Google Workspace + Slack are connected'}
      sub="Workflow ideas to try in week 2 — run them on demand, or put the recurring ones on a schedule." />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
      {items.map((c, i) => <TeamCard key={i} team={c.tag} title={c.title} desc={c.desc} />)}
    </div>
  </Slide>;
}

// ───────────────────────────── Part 3 — Making It Stick ─────────────────────────────

function Slide_CwGoodTasks() {
  return <Slide label="Good Cowork tasks">
    <CwHeader label="Fit" title="Good Cowork tasks" />
    <div style={{ display: 'flex', gap: 18 }}>
      <CwCard title="Repetitive" desc="Same shape every week. The work is the doing, not the deciding." />
      <CwCard title="File-based" desc="Lives in folders, spreadsheets, docs, PDFs — not just in your head." />
      <CwCard title="Describable" desc="Could you explain it to a new hire in two sentences? Then Cowork can probably do it." />
    </div>
  </Slide>;
}

function Slide_CwNotYet() {
  return <Slide bg={OAT} label="Not-yet Cowork tasks">
    <VCenter lift={2.0}>
      <div style={LABEL}>Fit — the other side</div>
      <h2 style={{ ...H2, fontSize: 40 }}>Cowork does the hands work.<br />You still do the head work.</h2>
      <p style={{ ...SUB, marginTop: 20 }}>
        Real-time judgment calls, decisions where you are the output, work you can't
        describe {'"'}done{'"'} for — keep those.</p>
    </VCenter>
  </Slide>;
}

function Slide_CwSafety() {
  const card = (title, desc) =>
    <div style={{ background: 'rgba(250,249,245,0.06)', borderRadius: 12, padding: 20,
                  display: 'flex', gap: 14, alignItems: 'flex-start' }}>
      <div style={{ width: 6, alignSelf: 'stretch', background: CLAY, borderRadius: 3 }} />
      <div>
        <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 5 }}>{title}</div>
        <div style={{ fontSize: 14, lineHeight: 1.5,
                      color: 'rgba(250,249,245,0.7)' }}>{desc}</div>
      </div>
    </div>;
  return <Slide bg={SLATE} color={BONE} label="Safety & control">
    <CwHeader dark label="Trust" title="Safety & control" />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 8 }}>
      {card('Proposes before acting', 'Anything destructive — delete, overwrite, send — gets a confirmation first.')}
      {card('Scoped folder access', 'It only sees what you point it at. Nothing else on your machine.')}
      {card('Runs locally', 'Files stay on your machine unless a connector you enabled sends them.')}
      {card('Admin controls', 'RBAC, per-connector read/write toggles, spend limits, full audit trail.')}
    </div>
  </Slide>;
}

function Slide_CwTrialPlan() {
  const t = (_P.trial) || {};
  const wk = (n, text) =>
    <div style={{ display: 'flex', gap: 16, padding: '12px 0',
                  borderBottom: `1px solid ${BORDER}` }}>
      <div style={{ fontFamily: MONO, fontSize: 13, fontWeight: 600, color: CLAY,
                    width: 70, flexShrink: 0 }}>WEEK {n}</div>
      <div style={{ fontSize: 16, lineHeight: 1.5 }}>{text}</div>
    </div>;
  return <Slide label="Make it stick">
    <CwHeader label="Champions → Playbook → Scale" title="Make it stick"
      sub="Four weeks, one habit per week. The Skills this room builds become the playbook everyone else follows." />
    <VCenter stretch>
      {(t.weeks || [
        'Everyone connects Google Workspace + Slack. Run one local-file task.',
        'Each team picks one weekly task and builds it as a Skill.',
        'Share Skills across teams — what one team built, another can run.',
        'Review: what worked, what is blocked, expansion case.',
      ]).map((w, i) => wk(i + 1, w))}
    </VCenter>
  </Slide>;
}

function Slide_CwFirstWeek() {
  return <Slide label="Your first week">
    <CwHeader label="Getting started" title="Your first week" />
    <VCenter>
      <div style={{ maxWidth: 640 }}>
        <TimelineStep day={1} text="Point Cowork at your messiest folder." active />
        <TimelineStep day={2} text="Connect Google Workspace and Slack." />
        <TimelineStep day={3} text="Pick one weekly task. Run it once." />
        <TimelineStep day={5} text="Save it as a Skill." />
      </div>
    </VCenter>
  </Slide>;
}

function Slide_CwTryPrompts() {
  const prompts = (_P.tryPrompts) || [
    'Organize my Downloads folder by file type and tell me what\'s in there.',
    'Summarize the last 20 messages in #my-team-channel into 5 bullets.',
    'Look at my calendar for tomorrow and draft a prep note for each meeting.',
  ];
  return <Slide label="Start this week">
    <CwHeader label="Start this week" title="Three prompts to try" />
    <VCenter stretch>
      {prompts.map((t, i) => <PromptCard key={i} n={i + 1} text={t} />)}
      {(_P.tryPromptsFooter) &&
        <div style={{ marginTop: 18, fontSize: 16, color: GRAY, lineHeight: 1.6 }}>
          {_P.tryPromptsFooter}</div>}
    </VCenter>
  </Slide>;
}

function Slide_CwResources() {
  const r = (_P.resources) || {};
  const ae = new URLSearchParams(location.search).get('ae');
  const aeEmail = ae ? ae.split('?')[0] : (r.ae || 'your-ae@anthropic.com');
  return <Slide label="Resources">
    <CwHeader label="Support" title="Resources" />
    <VCenter stretch>
      <StackRow label="Docs" items="support.claude.com → Cowork" />
      <StackRow label={CUSTOMER + ' internal'}
        items={r.internal || 'Your internal Cowork channel + champions'} />
      <StackRow label="Anthropic"
        items={(r.contacts || []).concat([aeEmail + ' (AE)']).join(' · ')} />
      {r.officeHours && <StackRow label="Office hours" items={r.officeHours} />}
    </VCenter>
  </Slide>;
}

function Slide_CwQuestions() {
  return <Slide bg={SLATE} color={BONE} center label="Questions">
    <h2 style={{ ...H2, fontSize: 48, color: BONE }}>Questions?</h2>
    <p style={{ fontSize: 20, color: 'rgba(250,249,245,0.6)', marginTop: 18, maxWidth: 620 }}>
      That task you thought of at the start — could Cowork do it?</p>
  </Slide>;
}

Object.assign(window, {
  CoworkMockup, CwCard, TeamCard, TimelineStep, PromptCard, StackRow, CwHeader,
  CwDemoScenario, CwUseCaseCard, Chip, InvolvedRow,
  Slide_CwTitle, Slide_CwAgenda, Slide_CwPoll, Slide_CwWhatIs, Slide_CwVsChat,
  Slide_CwWhyHere, Slide_CwDemo1, Slide_CwDemo2, Slide_CwDemo3, Slide_CwPattern,
  Slide_CwSkillsIntro, Slide_CwOtherUsesA, Slide_CwOtherUsesB, Slide_CwConnectors,
  Slide_CwYourStack, Slide_CwSchedules, Slide_CwTeamConnectors, Slide_CwGoodTasks, Slide_CwNotYet,
  Slide_CwSafety, Slide_CwTrialPlan, Slide_CwFirstWeek, Slide_CwTryPrompts,
  Slide_CwResources, Slide_CwQuestions,
});
}
