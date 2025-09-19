function pyramid(chars, height) {
  if (height <= 0) return "";
  const lines = [];
  const patternLen = chars.length;

  for (let i = 1; i <= height; i++) {
    const width = 2 * i - 1;                    // characters needed
    const repeats = Math.ceil(width / patternLen);
    const content = chars.repeat(repeats).slice(0, width);
    const leading = " ".repeat(height - i);     // only leading spaces, no trailing
    lines.push(leading + content);
  }

  return lines.join("\n");
}
