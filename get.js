function get(src, path) {
  const keys = path.split(".");
  let current = src;

  for (let i = 0; i < keys.length; i++) {
    if (current == null) return undefined
    current = current[keys[i]];
  }
  return current;
}
