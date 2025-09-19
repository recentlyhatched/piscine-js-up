function sameAmount(str, regex1, regex2) {
  const matches1 = str.match(new RegExp(regex1, regex1.flags.includes('g') ? regex1.flags : regex1.flags + 'g')) || []
  const matches2 = str.match(new RegExp(regex2, regex2.flags.includes('g') ? regex2.flags : regex2.flags + 'g')) || []
  return matches1.length === matches2.length
}
