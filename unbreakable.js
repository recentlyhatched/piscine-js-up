function split(str, sep) {
  let result = [];
  let current = "";

  // special case: empty separator → split into characters
  if (sep === "") {
    for (let i = 0; i < str.length; i++) {
      result.push(str[i]);
    }
    return result;
  }

  for (let i = 0; i < str.length; i++) {
    // check if substring matches sep
    if (sep && str.slice(i, i + sep.length) === sep) {
      result.push(current);
      current = "";
      i += sep.length - 1; // skip ahead
    } else {
      current += str[i];
    }
  }
  result.push(current); // push the last chunk
  return result;
}

function join(arr, sep) {
  let result = "";
  for (let i = 0; i < arr.length; i++) {
    if (i > 0) result += sep; // add separator before every element except the first
    result += arr[i];
  }
  return result;
}
