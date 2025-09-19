function letterSpaceNumber(str) {
  // "?!" negative lookahead to ensure pattern isn't followed by a letter
  const re = /[A-Za-z] [0-9](?![0-9A-Za-z])/g
  return str.match(re)
}
