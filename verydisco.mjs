#!/usr/bin/env node

// Get the argument (skip first 2 args: node + script name)
const input = process.argv.slice(2).join(' ');

if (!input) {
  console.log("Usage: node verydisco.mjs <text>");
  process.exit(1);
}

// Function to "very disco" a single word
function veryDiscoWord(word) {
  const mid = Math.ceil(word.length / 2);
  const firstHalf = word.slice(0, mid);
  const secondHalf = word.slice(mid);
  return secondHalf + firstHalf;
}

// Split into words, transform each, and join back
const result = input
  .split(/\s+/)
  .map(veryDiscoWord)
  .join(' ');

// Display the result 💃
console.log(result);
