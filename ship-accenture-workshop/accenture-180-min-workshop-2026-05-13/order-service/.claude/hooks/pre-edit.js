let d = '';
process.stdin.on('data', c => d += c);
process.stdin.on('end', () => {
  const fp = (JSON.parse(d).tool_input.file_path || '');
  // Normalize both Windows (\) and Unix (/) separators
  const normalized = fp.replace(/\\/g, '/');
  if (normalized.includes('/data/') || normalized.endsWith('/data')) {
    process.stdout.write(JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'PreToolUse',
        permissionDecision: 'deny',
        permissionDecisionReason: 'Direct edits to data/ files are not allowed \u2014 use lib/reconciliation.js instead.'
      }
    }));
  }
  process.exit(0);
});
