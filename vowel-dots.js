// regex for vowels (both uppercase and lowercase)
const vowels = /[aeiouAEIOU]/g

function vowelDots(str) {
  return str.replace(vowels, match => match + '.')
}
