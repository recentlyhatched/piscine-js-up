function filter(arr, callback) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (callback(arr[i], i, arr)) {
      result.push(arr[i]);
    }
  }
  return result;
}

function reject(arr, callback) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (!callback(arr[i], i, arr)) {
      result.push(arr[i]);
    }
  }
  return result;
}

function partition(arr, callback) {
  const truthy = [];
  const falsy = [];
  
  for (let i = 0; i < arr.length; i++) {
    if (callback(arr[i], i, arr)) {
      truthy.push(arr[i]);
    } else {
      falsy.push(arr[i]);
    }
  }
  
  return [truthy, falsy];
}