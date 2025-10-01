// Basic throttle: defaults to leading: true, trailing: true
function throttle(func, wait) {
  let timer = null;
  let previous = 0; // last invoke time (0 means "not invoked yet")
  let lastArgs = null;
  let lastThis = null;
  let result;

  function later() {
    // invoked when the trailing timeout expires
    previous = Date.now();
    timer = null;
    if (lastArgs) {
      result = func.apply(lastThis, lastArgs);
      lastArgs = lastThis = null;
    }
  }

  return function throttled(...args) {
    const now = Date.now();

    // store the latest call context/args
    lastArgs = args;
    lastThis = this;

    const remaining = wait - (now - previous);

    // If previous is zero (first call) then remaining will be <=0 because
    // now - previous is large (Date.now() since epoch). This causes immediate invoke.
    if (remaining <= 0 || remaining > wait) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      previous = now;
      result = func.apply(lastThis, lastArgs);
      lastArgs = lastThis = null;
    } else if (!timer) {
      // schedule a trailing invocation with the latest args
      timer = setTimeout(later, remaining);
    }

    return result;
  };
}


// Throttle with options: supports leading and trailing flags (like lodash)
function opThrottle(func, wait, options = {}) {
  const leading = options.hasOwnProperty("leading") ? !!options.leading : true;
  const trailing = options.hasOwnProperty("trailing") ? !!options.trailing : true;

  let timer = null;
  let previous = 0;
  let lastArgs = null;
  let lastThis = null;
  let result;

  function later() {
    // when the trailing timer fires, set previous to now if leading allowed,
    // otherwise reset to 0 so next call will be treated as "first" if leading=false
    previous = leading ? Date.now() : 0;
    timer = null;
    if (lastArgs && trailing) {
      result = func.apply(lastThis, lastArgs);
      lastArgs = lastThis = null;
    }
  }

  return function throttled(...args) {
    const now = Date.now();

    if (!previous && leading === false) {
      // If leading is false, treat previous as 'now' so we don't invoke immediately.
      previous = now;
    }

    lastArgs = args;
    lastThis = this;

    const remaining = wait - (now - previous);

    if (remaining <= 0 || remaining > wait) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      previous = now;
      result = func.apply(lastThis, lastArgs);
      lastArgs = lastThis = null;
    } else if (!timer && trailing) {
      // schedule trailing invocation with the latest args
      timer = setTimeout(later, remaining);
    }

    return result;
  };
}
