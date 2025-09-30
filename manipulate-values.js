function filterValues(obj, callback) {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    if (callback(value, key, obj)) {
      result[key] = value;
    }
  }
  return result;
}

function mapValues(obj, callback) {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    result[key] = callback(value, key, obj);
  }
  return result;
}

function reduceValues(obj, callback, initialValue) {
  let accumulator = initialValue;
  let first = true;

  for (const value of Object.values(obj)) {
    if (accumulator === undefined && first) {
      accumulator = value;
      first = false;
    } else {
      accumulator = callback(accumulator, value);
    }
  }

  return accumulator;
}