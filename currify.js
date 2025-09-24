function currify(fn) {
  return function curried(...args) { // spread operator
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      return (...more) => curried(...args, ...more);
    }
  };
}
