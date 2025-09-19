function letterSpaceNumber(str) {
  // "?!" negative lookahead to ensure pattern isn't followed by a letter
  const regex = /[a-zA-Z] \d(?![a-zA-Z])/g;
  return str.match(regex);
}
