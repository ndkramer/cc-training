#!/usr/bin/env node
// Reset to pre-workshop state. Safe to run between sessions.
// Pure node — runs identically on macOS, Linux, Windows.
// Generated from reset-demo.sh by /normalize-reset-script.

import { copyFileSync, existsSync, readdirSync, rmSync, statSync, unlinkSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const here = dirname(fileURLToPath(import.meta.url));
const repo = resolve(here, '..');
process.chdir(repo);

const log = (msg) => console.log(`-> ${msg}`);

log('Restoring buggy pricing.js (re-plants the Math.ceil bug)');
copyFileSync('.reset-snapshots/pricing.js', 'lib/pricing.js');

log('Restoring sparse CLAUDE.md (empty headers only)');
copyFileSync('.reset-snapshots/CLAUDE.md', 'CLAUDE.md');

log('Restoring clean reconciliation.js');
copyFileSync('.reset-snapshots/reconciliation.js', 'lib/reconciliation.js');

log('Restoring original invoice data');
for (const f of readdirSync('.reset-snapshots')) {
  if (f.endsWith('-invoices.json')) {
    copyFileSync(`.reset-snapshots/${f}`, `data/${f}`);
  }
}

log('Clearing reconciliation history and adjustment snapshots');
for (const f of readdirSync('data')) {
  if (/-ADJ-/.test(f) && f.endsWith('.json')) {
    try { unlinkSync(`data/${f}`); } catch {}
  }
}

log('Removing MCP registration (if any)');
spawnSync('claude mcp remove order-store', { stdio: 'ignore', shell: true });

// post-ncp:seed-skills-allowlist
log('Clearing attendee-created skills');
if (existsSync('.claude/skills')) {
  const seedSkills = existsSync('.reset-snapshots/skills')
    ? new Set(readdirSync('.reset-snapshots/skills'))
    : new Set();
  for (const name of readdirSync('.claude/skills')) {
    if (name === '.gitkeep') continue;
    const p = `.claude/skills/${name}`;
    if (statSync(p).isDirectory() && !seedSkills.has(name)) {
      log(`Removing attendee skill: ${name}`);
      rmSync(p, { recursive: true, force: true });
    }
  }
}

console.log("OK Reset complete. Run: npm test  (expect: 1 failing -- 'cancellation on day 15 of 30 bills for 15 days')");
