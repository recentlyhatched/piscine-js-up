// every: returns true if all elements satisfy the predicate
function every(arr, fn) {
  for (let i = 0; i < arr.length; i++) {
    if (!fn(arr[i], i, arr)) {
      return false; // as soon as one fails, return false
    }
  }
  return true; // all passed
}

// some: returns true if at least one element satisfies the predicate
function some(arr, fn) {
  for (let i = 0; i < arr.length; i++) {
    if (fn(arr[i], i, arr)) {
      return true; // as soon as one passes, return true
    }
  }
  return false; // none passed
}

// none: returns true if no element satisfies the predicate
function none(arr, fn) {
  for (let i = 0; i < arr.length; i++) {
    if (fn(arr[i], i, arr)) {
      return false; // found one that satisfies, return false
    }
  }
  return true; // none satisfied
}
