#!/usr/bin/env node

import { readdirSync, statSync } from 'fs';
import { resolve, join } from 'path';

const dirPath = process.argv[2] ? resolve(process.argv[2]) : process.cwd();

try {
  const entries = readdirSync(dirPath);

  // Keep only files (not directories) to behave like the tests
  const files = entries.filter(name => {
    try {
      return statSync(join(dirPath, name)).isFile();
    } catch {
      return false;
    }
  });

  const parsed = files.map(name => {
    // remove extension
    const base = name.replace(/\.[^/.]+$/, '');
    const parts = base.split('_');
    const first = parts[0] ?? '';
    const last = parts.length > 1 ? parts.slice(1).join('_') : '';
    const formatted = last ? `${last} ${first}` : first;
    return { first, last, formatted, original: name };
  });

  // Sort by last name (ascending), fallback to first name if last names equal
  parsed.sort((a, b) => {
    const aLast = a.last || a.first;
    const bLast = b.last || b.first;
    const cmp = aLast.localeCompare(bLast, undefined, { sensitivity: 'base' });
    if (cmp !== 0) return cmp;
    return a.first.localeCompare(b.first, undefined, { sensitivity: 'base' });
  });

  parsed.forEach((p, i) => {
    console.log(`${i + 1}. ${p.formatted}`);
  });

} catch (err) {
  console.error(`Error reading directory "${dirPath}":`, err.message);
  process.exit(1);
}
