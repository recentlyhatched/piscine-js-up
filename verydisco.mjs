#!/usr/bin/env node

const input = process.argv.slice(2).join(' ');

if (!input) {
  console.log("Usage: node verydisco.mjs <text>");
  process.exit(1);
}

// Combine all words into one string (no spaces)
const joined = input.replace(/\s+/g, '');

// Cut in half and swap parts
const mid = Math.ceil(joined.length / 2);
const result = joined.slice(mid) + joined.slice(0, mid);

console.log(result);
