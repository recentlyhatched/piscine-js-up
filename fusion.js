function fusion(obj1, obj2) {
  const result = {};

  // Collect all unique keys from both objects
  const keys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);

  for (const key of keys) {
    const val1 = obj1[key];
    const val2 = obj2[key];

    if (val1 !== undefined && val2 !== undefined) {
      // Both objects have the key
      if (Array.isArray(val1) && Array.isArray(val2)) {
        result[key] = [...val1, ...val2];
      } else if (typeof val1 === "string" && typeof val2 === "string") {
        result[key] = val1 + " " + val2;
      } else if (typeof val1 === "number" && typeof val2 === "number") {
        result[key] = val1 + val2;
      } else if (
        val1 &&
        val2 &&
        typeof val1 === "object" &&
        typeof val2 === "object" &&
        !Array.isArray(val1) &&
        !Array.isArray(val2)
      ) {
        // Recursive merge for plain objects
        result[key] = fusion(val1, val2);
      } else {
        // Type mismatch → take the second value
        result[key] = val2;
      }
    } else {
      // Key exists only in one object
      result[key] = val1 !== undefined ? val1 : val2;
    }
  }

  return result;
}