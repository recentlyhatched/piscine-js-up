function get(src, path) {
  const keys = path.split(".");
  let current = src;

  for (let i = 0; i < keys.length; i++) {
    current = current[keys[i]];
  }
  return current;
}
