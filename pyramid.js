function pyramid(chars, height) {
  if (height <= 0) return "";
  const patternLen = chars.length;
  const lines = [];

  for (let i = 1; i <= height; i++) {
    const repeats = 2 * i - 1;                      // how many whole `chars` units to place
    const leading = " ".repeat((height - i) * patternLen); // scale spaces by pattern length
    const content = chars.repeat(repeats);          // repeat the full pattern unit
    lines.push(leading + content);
  }

  return lines.join("\n");
}
