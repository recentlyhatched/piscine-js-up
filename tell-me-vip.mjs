#!/usr/bin/env node

import { readdirSync, readFileSync, writeFileSync, statSync } from 'fs';
import { resolve, join } from 'path';

const dirPath = process.argv[2] ? resolve(process.argv[2]) : process.cwd();

try {
  const entries = readdirSync(dirPath);

  // Keep only JSON files
  const jsonFiles = entries.filter(name => {
    try {
      return statSync(join(dirPath, name)).isFile() && name.endsWith('.json');
    } catch {
      return false;
    }
  });

  // Parse guests who answered YES
  const guests = [];
  for (const file of jsonFiles) {
    const filePath = join(dirPath, file);
    try {
      const data = JSON.parse(readFileSync(filePath, 'utf8'));
      if (data.answer && data.answer.toUpperCase() === 'YES') {
        const base = file.replace(/\.json$/, '');
        const [first, last] = base.split('_');
        guests.push({ first, last });
      }
    } catch {
      // ignore malformed JSON files
    }
  }

  // Sort by last name, then first name
  guests.sort((a, b) => {
    const cmp = a.last.localeCompare(b.last, undefined, { sensitivity: 'base' });
    if (cmp !== 0) return cmp;
    return a.first.localeCompare(b.first, undefined, { sensitivity: 'base' });
  });

  // Format output lines
  const lines = guests.map((g, i) => `${i + 1}. ${g.last} ${g.first}`);

  // Write to vip.txt (empty file if no VIPs)
  writeFileSync(join(dirPath, 'vip.txt'), lines.join('\n'), 'utf8');

  // ✅ No console.log to satisfy test expectations

} catch (err) {
  console.error(`Error processing directory "${dirPath}":`, err.message);
  process.exit(1);
}
