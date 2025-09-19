function chunk(arr, size) {
  size = Math.floor(Number(size))    // coerce to integer
  if (!size || size < 1) return []   // guard: non-positive size -> empty result

  const result = []
  for (let i = 0; i < arr.length; i += size) {
    const sub = []
    for (let j = i; j < i + size && j < arr.length; j++) {
      sub.push(arr[j])
    }
    result.push(sub)
  }
  return result
}
