#!/usr/bin/env node
// Reset exercise repo to pre-workshop state. Safe to run between sessions.
// Pure node — runs identically on macOS, Linux, Windows.
// Generated from reset-demo.sh by /normalize-reset-script.

import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync, statSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const repo = resolve(here, '..');
process.chdir(repo);

const log = (msg) => console.log(`-> ${msg}`);

log('Restoring buggy tiers.js (re-plants the > 80 boundary bug)');
copyFileSync('.reset-snapshots/tiers.js', 'lib/tiers.js');

log('Restoring sparse CLAUDE.md (empty headers only)');
copyFileSync('.reset-snapshots/CLAUDE.md', 'CLAUDE.md');

// post-ncp:seed-skills-allowlist
log('Clearing attendee-created skills (Ex 2 cleanup)');
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

log('Restoring order-toolkit/skills/ to scaffold state (Ex 3 cleanup)');
rmSync('order-toolkit/skills', { recursive: true, force: true });
mkdirSync('order-toolkit/skills/triage', { recursive: true });
copyFileSync('.reset-snapshots/order-toolkit/skills/triage/SKILL.md', 'order-toolkit/skills/triage/SKILL.md');

console.log("OK Reset complete. Run: npm test  (expect: 1 failing -- 'order with score exactly 80 → high tier')");
