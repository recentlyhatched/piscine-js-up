// trailing-only debounce
function debounce(fn, wait) {
  let timer = null;
  let lastArgs = null;
  let lastThis = null;

  function debounced(...args) {
    lastArgs = args;
    lastThis = this;

    // reset timer each call — trailing invocation only
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn.apply(lastThis, lastArgs);
      lastArgs = lastThis = null;
    }, wait);
  }

  debounced.cancel = function () {
    clearTimeout(timer);
    timer = null;
    lastArgs = lastThis = null;
  };

  return debounced;
}

// debounce with leading option:
// - if leading === true: invoke immediately when there is no active timer, then ignore further calls until wait expires.
// - if leading !== true: behaves exactly like trailing debounce above.
function opDebounce(fn, wait, options = {}) {
  const leading = !!options.leading;
  let timer = null;
  let lastArgs = null;
  let lastThis = null;

  function debounced(...args) {
    lastArgs = args;
    lastThis = this;

    if (leading) {
      // If no active timer, call immediately and start suppression timer.
      if (!timer) {
        fn.apply(lastThis, lastArgs);
        lastArgs = lastThis = null;
        timer = setTimeout(() => {
          // after wait, allow next leading call
          clearTimeout(timer);
          timer = null;
        }, wait);
      } else {
        // If timer exists (we're within the wait window), ignore the call.
      }
    } else {
      // trailing behavior
      clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        fn.apply(lastThis, lastArgs);
        lastArgs = lastThis = null;
      }, wait);
    }
  }

  debounced.cancel = function () {
    clearTimeout(timer);
    timer = null;
    lastArgs = lastThis = null;
  };

  return debounced;
}
