function chunk(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    const sub = [];
    for (let j = i; j < i + size; j++) {
      sub.push(arr[j]);
    }
    result.push(sub.join());
  }
  return result;
}
