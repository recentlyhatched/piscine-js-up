#!/usr/bin/env node

import { readdirSync, readFileSync, writeFileSync, statSync } from 'fs';
import { resolve, join } from 'path';

const dirPath = process.argv[2] ? resolve(process.argv[2]) : process.cwd();
const vipFilePath = join(dirPath, 'vip.txt');

try {
  const entries = readdirSync(dirPath);

  // Only JSON files
  const jsonFiles = entries.filter(name => {
    try {
      return statSync(join(dirPath, name)).isFile() && name.endsWith('.json');
    } catch {
      return false;
    }
  });

  const guests = [];

  for (const file of jsonFiles) {
    try {
      const data = JSON.parse(readFileSync(join(dirPath, file), 'utf8'));
      if (data.answer?.toUpperCase() === 'YES') {
        const [first, last] = file.replace(/\.json$/, '').split('_');
        guests.push({ first, last });
      }
    } catch {
      // ignore invalid JSON
    }
  }

  // Sort by last name, then first name
  guests.sort((a, b) => {
    const cmp = (a.last || '').localeCompare(b.last || '', undefined, { sensitivity: 'base' });
    return cmp !== 0 ? cmp : (a.first || '').localeCompare(b.first || '', undefined, { sensitivity: 'base' });
  });

  // Prepare output lines
  const lines = guests.map((g, i) => `${i + 1}. ${g.last} ${g.first}`);

  // ✅ Write vip.txt, empty if no guests
  writeFileSync(vipFilePath, lines.join('\n'), 'utf8');

  // Do NOT print anything to stdout
} catch {
  // Fail silently — vip.txt might still exist from previous runs
  try { writeFileSync(vipFilePath, '', 'utf8'); } catch {}
}
