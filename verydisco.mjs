#!/usr/bin/env node

const firstArg = process.argv[2];

if (!firstArg) {
  console.log("Usage: node verydisco.mjs <text>");
  process.exit(1);
}

function veryDiscoWord(word) {
  const mid = Math.ceil(word.length / 2);
  return word.slice(mid) + word.slice(0, mid);
}

// Only use the first argument; if it contains spaces, process each word inside it.
const result = firstArg
  .split(/\s+/)
  .map(veryDiscoWord)
  .join(' ');

console.log(result);
