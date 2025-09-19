function pyramid(chars, height) {
  let result = ""
  for (let i = 1; i <= height; i++) {
    // number of chars in this row
    const width = 2 * i - 1
    // spaces on each side
    const spaces = " ".repeat(height - i)
    // build the row
    result += spaces + chars.repeat(width) + spaces
    if (i < height) result += "\n"
  }
  return result
}
