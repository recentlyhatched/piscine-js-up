function ionOut(str) {
  // regex: look for words ending with 'tion'
  const regex = /\b\w*t(?=ion)\w*\b/g;
  const matches = str.match(regex) || []

  // remove the "ion" part from each word
  return matches.map(word => word.replace('ion', ''))
}
