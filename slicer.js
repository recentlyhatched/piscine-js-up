const slice = (item, i = 0, end = item.length) => {
  const len = item.length;

  // Handle negative indices
  let start = i < 0 ? len + i : i;
  let stop = end < 0 ? len + end : end;

  if (Array.isArray(item)) {
    const result = [];
    for (let idx = start; idx < stop && idx < len; idx++) {
      result.push(item[idx]);
    }
    return result;
  }

  if (typeof item === "string") {
    let result = "";
    for (let idx = start; idx < stop && idx < len; idx++) {
      result += item[idx];
    }
    return result;
  }

  return undefined;
};
