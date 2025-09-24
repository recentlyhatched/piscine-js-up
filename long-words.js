// every element has at least 5 characters
function longWords(arr) {
  return arr.every(word => typeof word === "string" && word.length >= 5);
}

// at least one element has 10 or more characters
function oneLongWord(arr) {
  return arr.some(word => typeof word === "string" && word.length >= 10);
}

// no element has 7 or more characters
function noLongWords(arr) {
  return arr.every(word => typeof word === "string" && word.length < 7);
}
