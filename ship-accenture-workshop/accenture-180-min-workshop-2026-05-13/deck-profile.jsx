// Accenture 180 Min Workshop 2026-05-13 — deck profile
// Vehicle: order-service — B2B order management.
// Bug: Math.ceil instead of Math.floor in lib/pricing.js → ORD-0042 over-billed by one unit.

window.DECK_PROFILE = {
  // ▼▼▼ GENERATED FROM presentation-spec.json — /ncp-sync rewrites this block ▼▼▼
  vehicle: 'order-service',

  coldOpen: {
    msg:      'npm test is failing in order-service',
    bugFile:  'lib/pricing.js',
    title:    'Claude Code \u00b7 Accenture',
    subtitle: 'Foundations \u2192 Scale \u00b7 180 min',
    cobrand:  { src: '../../_shared/assets/accenture-logo-white.svg', alt: 'Accenture', height: 28 },
    partnerBrand: { src: '../../_shared/assets/Acc_Logo_White_Purple_RGB.svg', alt: 'Accenture', height: 22 },
  },

  demo1: {
    beats: [
      { key: 'npm test', line: 'see the failure \u2014 ORD-0042 expects 15, got 16' },
      { key: null,       line: '"npm test is failing. Find and fix it."' },
      { key: null,       line: 'watch: Read pricing.js \u2192 spot Math.ceil' },
      { key: 'npm test', line: 'green' },
    ],
  },

  exercise1: {
    doneWhen: 'npm test passes and you can name the operator that was wrong',
    steps: (<>
      <ol>
        <li>Unzip <code>order-service-exercise.zip</code>, <code>cd order-service-exercise {'&&'} npm install {'&&'} npm test</code></li>
        <li>One test fails. Don't read the test file — read the error message.</li>
        <li>Open Claude Code: <code>claude</code>. Tell it what you see. Watch where it goes.</li>
        <li>When green: explain the fix to your neighbor in one sentence.</li>
      </ol>
    </>),
  },

  exercise2: {
    n: 2,
    title: 'Teach the repo',
    doneWhen: '/<yourskill> runs and shows you a diff',
    steps: (<>
      <ol>
        <li>Open CLAUDE.md in order-service — fill in the three TODO comments: domain terms, test command, what not to touch.</li>
        <li>Create <code>.claude/skills/{'<your-verb>'}/SKILL.md</code> — pick a domain verb (e.g. reprice, audit, validate).</li>
        <li>Write 3-5 steps in plain English. Include a guardrail: "Run npm test first — abort if red."</li>
        <li>Test it: type <code>/{'<your-verb>'}</code> in Claude. Done when you see a diff.</li>
      </ol>
    </>),
  },

  exercise4: {
    n: 3,
    title: 'Package it',
    doneWhen: 'claude plugin validate shows a green check',
    steps: (<>
      <ol>
        <li>mkdir the plugin scaffold: <code>mkdir -p my-plugin/skills/{'<your-verb>'}</code></li>
        <li>Copy your SKILL.md from exercise 2 into the skills/ folder.</li>
        <li>Write <code>plugin.json</code> — three fields: name, description, author.</li>
        <li>Run <code>claude plugin validate my-plugin</code> — done when you see a green check.</li>
      </ol>
    </>),
  },

  atExample: 'why is @lib/pricing.js rounding up instead of down?',
  // ▲▲▲ END GENERATED ▲▲▲

  // ─── HAND-EDITABLE — /ncp-sync preserves everything below ────────────────
  // Domain-flavored JSX written ONCE by /ncp. Edit freely — sync won't touch.

  claudeMd: {
    body: (<>
      <ELine num={1}><Cmt># order-service</Cmt></ELine>
      <ELine num={2}></ELine>
      <ELine num={3}><Cmt>## What the code can't tell you</Cmt></ELine>
      <ELine num={4}>The order scheduler fires a few hundred ms after the</ELine>
      <ELine num={5}>billing boundary. So <Str>`elapsed / MS_PER_DAY`</Str> is 15.0048,</ELine>
      <ELine num={6}>not 15. <Kw>Floor it.</Kw> Math.ceil bills the client an extra day.</ELine>
      <ELine num={7}></ELine>
      <ELine num={8}><Cmt>## Constraints</Cmt></ELine>
      <ELine num={9}>- <Kw>NEVER</Kw> edit <Str>`data/*.json`</Str> directly. Use <Str>`/reconcile`</Str>.</ELine>
      <ELine num={10}>  We lost ORD-0118 audit trail in Feb — someone patched</ELine>
      <ELine num={11}>  the JSON by hand and finance couldn't reconcile Q1.</ELine>
      <ELine num={12}>- Drift corrections {'>'} 5% need manager sign-off.</ELine>
      <ELine num={13}></ELine>
      <ELine num={14}><Cmt>## Who to ask</Cmt></ELine>
      <ELine num={15}>Order pricing policy: #order-eng. Tier logic: @priya.shah</ELine>
    </>),
  },

  planMode: {
    prompt: 'refactor pricing for bulk discounts',
    steps: (<>
      <TLine>1. Add <TGreen>discountTiers</TGreen> config to pricing.js</TLine>
      <TLine>   — array of {'{'}minQty, pctOff{'}'} thresholds</TLine>
      <TLine>2. Update <TGreen>unitsUsed()</TGreen> to apply tier</TLine>
      <TLine>   discount before computing final amount</TLine>
      <TLine>3. Add <TGreen>test/bulk.test.js</TGreen> — 3 cases</TLine>
      <TLine>4. Migrate existing orders</TLine>
      <TLine>   (discountTiers: null → no discount)</TLine>
      <TBlank />
      <TLine><TGray>Files to modify: 2 | Files to create: 1</TGray></TLine>
    </>),
  },

  skill: {
    filename: '.claude/skills/reconcile/SKILL.md',
    body: (<>
      <ELine num={1}><Cmt>---</Cmt></ELine>
      <ELine num={2}><Kw>name</Kw>: reconcile</ELine>
      <ELine num={3}><Kw>description</Kw>: Reconcile an order's invoiced total</ELine>
      <ELine num={4}><Cmt>---</Cmt></ELine>
      <ELine num={5}></ELine>
      <ELine num={6}><Cmt>## Preconditions</Cmt></ELine>
      <ELine num={7}>- Order data exists in <Str>`data/{'<id>'}-invoices.json`</Str></ELine>
      <ELine num={8}>- Reference total is present in the data file</ELine>
      <ELine num={9}></ELine>
      <ELine num={10}><Cmt>## Steps</Cmt></ELine>
      <ELine num={11}>1. Run <Str>`npm test`</Str> — if red, STOP</ELine>
      <ELine num={12}>2. Read <Str>`data/{'<id>'}-invoices.json`</Str></ELine>
      <ELine num={13}>3. Compute drift: actual vs reference total</ELine>
      <ELine num={14}>4. If drift {'<'} 5%, apply correction via lib/</ELine>
      <ELine num={15}>5. Re-run <Str>`npm test`</Str>, show the diff</ELine>
      <ELine num={16}></ELine>
      <ELine num={17}><Cmt>## Constraints</Cmt></ELine>
      <ELine num={18}>- Max 5% correction without sign-off</ELine>
      <ELine num={19}>- Snapshot data/ before any mutation</ELine>
      <ELine num={20}></ELine>
      <ELine num={21}><Cmt>## References</Cmt></ELine>
      <ELine num={22}>- @lib/reconciliation.js</ELine>
      <ELine num={23}>- @lib/pricing.js</ELine>
    </>),
  },

  // ─── plugins block — used by 301 slides (MCP, Demo6, CCMobile, ManagedMCP,
  //     Ex3, Plugins, Ex4, AgentTeams, Demo7). ALL keys required — shared
  //     301.jsx renders "[MISSING plugins.<key> IN PROFILE]" when unset.
  //     /ncp forks this profile and swaps the bodies to the customer vehicle.
  plugins: {
    // Core plugin/MCP naming (used across MCP, Plugins, Ex3, Ex4, ManagedMCP)
    mcpServer:       'order-store',
    toolkit:         'reconcile-toolkit',
    skillName:       'reconcile',
    mcpConfig:       'order-store.json',
    hookScript:      'block-prod-invoices.sh',
    description:     'Safe order reconciliation workflow',
    author:          'order-eng',

    // Demo 6 — "use the MCP tool" moment
    demoPrompt:      'Show me all our active orders. Which one is the highest monthly rate?',

    // Mobile mockup (Slide_CCMobile)
    mobileHeading:   'Pending: reconciliation drift',
    yamlSample:      '- drift: 5.2',

    // Exercise 3 — wire up MCP
    ex3Repo:         'order-service',
    ex3Prompt:       "which orders have drift above 5% and haven't been reconciled in 30 days?",
    ex3ConfigPath:   'data/ORD-0042-invoices.json',

    // Agent Teams scenario (Slide_AgentTeams) — three Claudes, one feature
    agentTeam: {
      route:    '/reconcile',
      file:     'app/api/reconcile.js',
      testFile: 'test/reconcile.test.js',
    },

    // Demo 7 fallback beats (only used if demo7.beats is not supplied)
    demo7Prompt:     'Add a reconcile endpoint',

    // Hooks simulated demo (Slide_HooksSimDemo)
    hookGuardPath:   'data/ORD-0042-invoices.json',
    hookGuardKey:    'ORD-0042',
    hookCli:         'orderctl',
    hookCliCmd:      'orderctl reconcile ORD-0042',
    hookGuardPrompt: 'set the invoice total for ORD-0042 to 12500 in data/ORD-0042-invoices.json',
    hookDoneSummary: 'ORD-0042 reconciled via orderctl.',

    // MCP reconcile demo (Slide_DemoMCPReconcile)
    pdIncident:         'PD-0512',
    mcpReconcilePrompt: 'PD-0512 fired on order-service. Triage it — pull from PD, Notion, Slack, Jira, GitHub. Root cause?',
    mcpReconcileTrail:  'PD: what (drift >5% on ORD-0042) → Notion: reconcile runbook → Slack: hunch (rounding) → Jira: why (ORD-302) → GitHub: where (PR #133)',

    // Sample MCP list response
    mcpListSample: [
      { name: 'ORD-0042', pct: '5.2%' },
      { name: 'ORD-0118', pct: '6.4%' },
      { name: 'ORD-0207', pct: '7.1%' },
    ],
    mcpListPrompt: 'Which orders have drift over 5%?',
  },
};
