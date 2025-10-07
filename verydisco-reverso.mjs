#!/usr/bin/env node

import { readFileSync } from 'fs';

const fileName = process.argv[2];

if (!fileName) {
  console.log("Usage: node verydisco-reverso.mjs <filename>");
  process.exit(1);
}

// Read file content
const content = readFileSync(fileName, 'utf8').trim();

function reverseVeryDiscoWord(word) {
  const len = word.length;
  const mid = Math.floor(len / 2); // opposite of Math.ceil used before
  const firstHalf = word.slice(mid);
  const secondHalf = word.slice(0, mid);
  return firstHalf + secondHalf;
}

// Handle multiple words (space-separated)
const result = content
  .split(/\s+/)
  .map(reverseVeryDiscoWord)
  .join(' ');

console.log(result);
