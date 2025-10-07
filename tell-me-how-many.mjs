#!/usr/bin/env node

import { readdirSync } from 'fs';
import { resolve } from 'path';

// Take directory path from CLI or default to current directory
const dirPath = process.argv[2] ? resolve(process.argv[2]) : process.cwd();

try {
  // Read directory contents
  const entries = readdirSync(dirPath);
  
  // Print number of entries
  console.log(entries.length);
} catch (err) {
  console.error(`Error reading directory "${dirPath}":`, err.message);
  process.exit(1);
}
