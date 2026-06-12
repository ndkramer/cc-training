let d = '';
process.stdin.on('data', c => d += c);
process.stdin.on('end', () => {
  const fp = (JSON.parse(d).tool_input.file_path || '');
  const normalized = fp.replace(/\\/g, '/');
  console.log('raw:', JSON.stringify(fp));
  console.log('normalized:', JSON.stringify(normalized));
  console.log('includes /data/:', normalized.includes('/data/'));
});
