function pyramid(chars, height) {
  if (height <= 0) return "";
  const patternLen = chars.length;
  const lines = [];

  for (let i = 1; i <= height; i++) {
    const width = 2 * i - 1;               // number of characters needed on this row
    let content = "";

    // build exactly `width` characters by cycling through `chars`
    for (let k = 0; k < width; k++) {
      content += chars[k % patternLen];
    }

    const leading = " ".repeat(height - i); // only leading spaces, no trailing
    lines.push(leading + content);
  }

  return lines.join("\n");
}
