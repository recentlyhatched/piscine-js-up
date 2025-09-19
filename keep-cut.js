// remove first 2 characters
function cutFirst(str) {
  return str.slice(2)
}

// remove last 2 characters
function cutLast(str) {
  return str.slice(0, -2)
}

// remove first 2 and last 2 characters
function cutFirstLast(str) {
  return str.slice(2, -2)
}

// keep only the first 2 characters
function keepFirst(str) {
  return str.slice(0, 2)
}

// keep only the last 2 characters
function keepLast(str) {
  return str.slice(-2)
}

// keep first 2 and last 2 characters
function keepFirstLast(str) {
    if (str.length >= 4) {
        return str.slice(0, 2) + str.slice(-2)
    }
    return str
}