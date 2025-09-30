function deepCopy(value) {
  // Handle primitives (string, number, boolean, null, undefined, symbol)
  if (value === null || typeof value !== "object") {
    return value;
  }

  // Handle arrays
  if (Array.isArray(value)) {
    return value.map(deepCopy);
  }

  // Handle plain objects
  const copy = {};
  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      copy[key] = deepCopy(value[key]);
    }
  }
  return copy;
}
