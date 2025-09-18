function reverse(item) {
  if (typeof item === "string") {
    let result = "";
    for (let i = item.length - 1; i >= 0; i--) {
      result += item[i];
    }
    return result;
  }

  if (Array.isArray(item)) {
    let result = [];
    for (let i = item.length - 1; i >= 0; i--) {
      result.push(item[i]);
    }
    return result;
  }
}
