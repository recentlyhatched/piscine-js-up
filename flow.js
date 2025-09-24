function flow(funcs) {
  return function(...args) {
    return funcs.reduce((acc, fn, index) => {
      // For the first function, pass all arguments
      if (index === 0) {
        return fn(...args);
      }
      // For subsequent functions, pass only the previous result
      return fn(acc);
    }, undefined);
  };
}