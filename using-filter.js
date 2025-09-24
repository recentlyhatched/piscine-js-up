function filterShortStateName(arr) {
    return arr.filter(name => name.length < 7)
}

function filterStartVowel(arr) {
    return arr.filter(str => {
        return /[aeiou]/i.test(str[0]) // regex case-insensitive
    })
}

function filter5Vowels(arr) {
    return arr.filter(str => {
        let count = 0;
        for(let i = 0; i < str.length; i++) {
            if (/[aeiou]/i.test(str[i])) {
                count++
            }
        }
        return count >= 5
    })
}

function filter1DistinctVowel(arr) {
  return arr.filter(str => {
    const vowels = str
      .toLowerCase()
      .split("")
      .filter(ch => "aeiou".includes(ch)); // keep only vowels
    const distinct = new Set(vowels);
    return distinct.size === 1; // only 1 unique vowel
  });
}

function multiFilter(arr) {
  return arr.filter(obj => {
    const capitalOK = obj.capital.length >= 8;
    const nameOK = !/^[aeiou]/i.test(obj.name); // name does not start with vowel
    const tagOK = /[aeiou]/i.test(obj.tag); // tag has at least one vowel
    const regionOK = obj.region !== "South";

    return capitalOK && nameOK && tagOK && regionOK;
  });
}


