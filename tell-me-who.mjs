#!/usr/bin/env node

import { readdirSync } from 'fs';
import { resolve } from 'path';

// Take directory path argument, or use current directory
const dirPath = process.argv[2] ? resolve(process.argv[2]) : process.cwd();

try {
  // Read directory entries
  const entries = readdirSync(dirPath);

  // Sort alphabetically (ascending)
  const sorted = entries.sort((a, b) => a.localeCompare(b));

  // Print formatted list
  sorted.forEach((name, index) => {
    console.log(`${index + 1}. ${name}`);
  });

} catch (err) {
  console.error(`Error reading directory "${dirPath}":`, err.message);
  process.exit(1);
}
