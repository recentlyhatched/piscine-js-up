#!/usr/bin/env node

import { readdirSync, readFileSync, writeFileSync, statSync } from 'fs';
import { resolve, join } from 'path';

const dirPath = process.argv[2] ? resolve(process.argv[2]) : process.cwd();
const vipPath = join(dirPath, 'vip.txt');

// Ensure vip.txt exists (empty if needed)
try {
  writeFileSync(vipPath, '', 'utf8');
} catch {}

try {
  const entries = readdirSync(dirPath);
  const guests = [];

  for (const name of entries) {
    const fullPath = join(dirPath, name);

    // Skip if not a file
    try {
      if (!statSync(fullPath).isFile()) continue;
    } catch {
      continue;
    }

    // Try to read and parse JSON
    try {
      const txt = readFileSync(fullPath, 'utf8');
      const data = JSON.parse(txt);
      if (data.answer && data.answer.toUpperCase() === 'YES') {
        // Remove file extension safely
        const dotIndex = name.lastIndexOf('.');
        const base = dotIndex !== -1 ? name.slice(0, dotIndex) : name;

        // Split into first and last name
        const parts = base.split('_');
        const first = parts[0] || '';
        const last = parts.length > 1 ? parts.slice(1).join('_') : '';
        guests.push({ first, last });
      }
    } catch {
      // ignore read/parse errors
      continue;
    }
  }

  // Sort by last name, then first name
  guests.sort((a, b) => {
    const cmp = (a.last || '').localeCompare(b.last || '', undefined, { sensitivity: 'base' });
    return cmp !== 0 ? cmp : (a.first || '').localeCompare(b.first || '', undefined, { sensitivity: 'base' });
  });

  // Prepare lines
  const lines = guests.map((g, i) => `${i + 1}. ${g.last} ${g.first}`);

  // Write vip.txt (overwrite even if empty)
  writeFileSync(vipPath, lines.join('\n'), 'utf8');

  // Silent: do not print anything
} catch {
  // Fail silently; vip.txt already exists
}
