function flat(arr, depth = 1) {
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (Array.isArray(item) && depth > 0) {
      result.push(...flat(item, depth - 1));
    } else {
      result.push(item);
    }
  }

  return result;
}
