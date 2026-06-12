#!/usr/bin/env node
import { execSync } from 'node:child_process';

const [, , action, ...portArgs] = process.argv;
const ports = portArgs.map(Number).filter(Boolean);

if (!action || !ports.length) {
  console.error('usage: node scripts/port.js <check|kill> <port> [port ...]');
  process.exit(2);
}

function pidsOnPort(p) {
  if (process.platform === 'win32') {
    const out = execSync('netstat -ano', { encoding: 'utf8' });
    const pids = new Set();
    for (const line of out.split(/\r?\n/)) {
      const m = line.match(/^\s*TCP(?:v6)?\s+\S+:(\d+)\s+\S+\s+LISTENING\s+(\d+)/);
      if (m && Number(m[1]) === p) pids.add(m[2]);
    }
    return [...pids];
  }
  try {
    const out = execSync(`lsof -ti:${p}`, { encoding: 'utf8' });
    return out.split(/\s+/).filter(Boolean);
  } catch {
    return [];
  }
}

function killPid(pid) {
  if (process.platform === 'win32') {
    execSync(`taskkill /F /PID ${pid}`, { stdio: 'ignore' });
  } else {
    execSync(`kill -9 ${pid}`, { stdio: 'ignore' });
  }
}

if (action === 'check') {
  for (const p of ports) {
    const pids = pidsOnPort(p);
    console.log(`port ${p}: ${pids.length ? 'LISTENING' : 'free'}`);
  }
  process.exit(0);
}

if (action === 'kill') {
  for (const p of ports) {
    for (const pid of pidsOnPort(p)) {
      try { killPid(pid); } catch {}
    }
  }
  console.log(`ports cleared: ${ports.join(', ')}`);
  process.exit(0);
}

console.error(`unknown action: ${action}`);
process.exit(2);
