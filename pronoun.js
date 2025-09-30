function pronoun(str) {
  const pronouns = new Set(["i", "you", "he", "she", "it", "they", "we"]);
  const words = str
    .toLowerCase()
    .replace(/[^\w\s]/g, "") // remove punctuation
    .split(/\s+/);

  const result = {};

  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    if (pronouns.has(w)) {
      if (!result[w]) {
        result[w] = { word: [], count: 0 };
      }
      result[w].count++;

      const next = words[i + 1];
      if (next && !pronouns.has(next)) {
        result[w].word.push(next);
      }
    }
  }

  return result;
}
