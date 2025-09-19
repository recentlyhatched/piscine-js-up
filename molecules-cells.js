function RNA(dna) {
  let map = { G: "C", C: "G", T: "A", A: "U" }
  let result = "";
  for (let i = 0; i < dna.length; i++) {
    const base = dna[i]
    result += map[base]
  }
  return result
}

function DNA(rna) {
  let map = { C: "G", G: "C", A: "T", U: "A" }
  let result = "";
  for (let i = 0; i < rna.length; i++) {
    const base = rna[i];
    result += map[base]
  }
  return result;
}
