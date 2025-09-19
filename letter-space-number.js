function letterSpaceNumber(str) {
  // "?!" negative lookahead to ensure pattern isn't followed by a letter
  const re = /[A-Za-z] \d(?![A-Za-z\d])/g
  return str.match(re)
}
