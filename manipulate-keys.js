function filterKeys(obj, callback) {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    if (callback(key, obj)) {
      result[key] = value;
    }
  }
  return result;
}

function mapKeys(obj, callback) {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    const newKey = callback(key, obj);
    result[newKey] = value;
  }
  return result;
}

function reduceKeys(obj, callback, initialValue) {
  let accumulator = initialValue;
  let first = true;

  for (const key of Object.keys(obj)) {
    if (accumulator === undefined && first) {
      accumulator = key;
      first = false;
    } else {
      accumulator = callback(accumulator, key);
    }
  }

  return accumulator;
}