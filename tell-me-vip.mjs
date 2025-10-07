#!/usr/bin/env node

import { readdirSync, readFileSync, writeFileSync, statSync } from 'fs';
import { resolve, join } from 'path';

const dirPath = process.argv[2] ? resolve(process.argv[2]) : process.cwd();
const vipPath = join(dirPath, 'vip.txt');

// Brute-force: ensure vip.txt exists (create empty file first)
try {
  writeFileSync(vipPath, '', 'utf8');
} catch {
  // ignore
}

try {
  const entries = readdirSync(dirPath);

  const guests = [];

  for (const name of entries) {
    const full = join(dirPath, name);

    // Try to read every entry that looks like a file (but be tolerant)
    try {
      if (!statSync(full).isFile()) continue;
    } catch {
      // could not stat -> skip this entry
      continue;
    }

    // Try to read & parse the file contents as JSON (brute-force)
    try {
      const txt = readFileSync(full, 'utf8');
      let data;
      try {
        data = JSON.parse(txt);
      } catch {
        // not JSON -> skip parsing but continue (brute force tries only JSON for answer)
        continue;
      }

      if (data && typeof data.answer === 'string' && data.answer.toUpperCase() === 'YES') {
        // Extract base name without extension and split on underscore(s)
        const base = name.replace(/\.[^/.]+$/, '');
        const parts = base.split('_');
        const first = parts[0] || '';
        const last = parts.length > 1 ? parts.slice(1).join('_') : '';
        guests.push({ first, last });
      }
    } catch {
      // read/parsing errors -> ignore and continue
      continue;
    }
  }

  // Sort by last name (fallback to first name)
  guests.sort((a, b) => {
    const aLast = a.last || a.first || '';
    const bLast = b.last || b.first || '';
    const cmp = aLast.localeCompare(bLast, undefined, { sensitivity: 'base' });
    if (cmp !== 0) return cmp;
    const aFirst = a.first || '';
    const bFirst = b.first || '';
    return aFirst.localeCompare(bFirst, undefined, { sensitivity: 'base' });
  });

  // Format lines
  const lines = guests.map((g, i) => `${i + 1}. ${g.last} ${g.first}`);

  // Overwrite vip.txt with final content (may be empty)
  try {
    writeFileSync(vipPath, lines.join('\n'), 'utf8');
  } catch {
    // ignore write errors
  }

  // Silent: do not write to stdout/stderr
} catch {
  /
