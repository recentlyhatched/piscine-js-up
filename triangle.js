function triangle(chars, height) {
  let result = ""
  for (let i = 1; i <= height; i++) {
    result += chars.repeat(i) + (i < height ? "\n" : "")
  }
  return result
}
