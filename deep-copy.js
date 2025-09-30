function deepCopy(value) {
  // Handle primitives and functions
  if (value === null || typeof value !== "object") return value;
  if (typeof value === "function") return value;

  // Handle Date
  if (value instanceof Date) return new Date(value);

  // Handle RegExp
  if (value instanceof RegExp) return new RegExp(value.source, value.flags);

  // Handle Array
  if (Array.isArray(value)) return value.map(deepCopy);

  // Handle plain objects
  const copy = {};
  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      copy[key] = deepCopy(value[key]);
    }
  }
  return copy;
}
