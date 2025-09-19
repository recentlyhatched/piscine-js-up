function pyramid(chars, height) {
  if (height <= 0) return "";
  const lines = [];
  for (let i = 1; i <= height; i++) {
    const width = 2 * i - 1;
    const leading = " ".repeat(height - i);
    lines.push(leading + chars.repeat(width));
  }
  return lines.join("\n");
}
