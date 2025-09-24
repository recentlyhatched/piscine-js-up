function map(arr, callback) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(callback(arr[i], i, arr));
  }
  return result;
}

function flatMap(arr, callback) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const mapped = callback(arr[i], i, arr);
    if (Array.isArray(mapped)) {
      result.push(...mapped); // flatten one level
    } else {
      result.push(mapped);
    }
  }
  return result;
}
