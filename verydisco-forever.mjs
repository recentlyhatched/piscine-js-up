#!/usr/bin/env node

import { writeFileSync } from 'fs';

const firstArg = process.argv[2];

if (!firstArg) {
  console.log("Usage: node verydisco-forever.mjs <text>");
  process.exit(1);
}

function veryDiscoWord(word) {
  const mid = Math.ceil(word.length / 2);
  return word.slice(mid) + word.slice(0, mid);
}

// Process only the first argument (may contain spaces if quoted)
const result = firstArg
  .split(/\s+/)
  .map(veryDiscoWord)
  .join(' ');

// Write the result to verydisco-forever.txt
writeFileSync('verydisco-forever.txt', result);
