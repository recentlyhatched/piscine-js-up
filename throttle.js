// Basic throttle (leading + trailing by default)
function throttle(fn, wait) {
  let lastCallTime = 0;
  let timer = null;
  let lastArgs, lastThis;
  let result;

  function invoke(time) {
    lastCallTime = time;
    result = fn.apply(lastThis, lastArgs);
    lastArgs = lastThis = null;
    return result;
  }

  function trailingInvoke() {
    timer = null;
    if (lastArgs) {
      invoke(Date.now());
    }
  }

  return function throttled(...args) {
    const now = Date.now();
    if (!lastCallTime) {
      lastCallTime = now; // init on first call
    }

    const remaining = wait - (now - lastCallTime);
    lastArgs = args;
    lastThis = this;

    if (remaining <= 0 || remaining > wait) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      invoke(now); // leading execution
    } else if (!timer) {
      // schedule trailing if another call happens inside wait window
      timer = setTimeout(trailingInvoke, remaining);
    }

    return result;
  };
}



// Throttle with options: { leading, trailing }
function opThrottle(fn, wait, options = {}) {
  const { leading = true, trailing = true } = options;
  let timer = null;
  let lastArgs = null;
  let lastThis = null;
  let lastCallTime = 0;
  let result;

  function invoke(time) {
    lastCallTime = time;
    result = fn.apply(lastThis, lastArgs);
    lastArgs = lastThis = null;
    return result;
  }

  function trailingInvoke() {
    timer = null;
    if (trailing && lastArgs) {
      invoke(Date.now());
    }
  }

  return function throttled(...args) {
    const now = Date.now();
    if (!lastCallTime && leading === false) {
      // Initialize so first call is delayed
      lastCallTime = now;
    }

    const remaining = wait - (now - lastCallTime);
    lastArgs = args;
    lastThis = this;

    if (remaining <= 0 || remaining > wait) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      invoke(now);
    } else if (!timer && trailing) {
      // Only schedule a trailing call if we’re within the window
      timer = setTimeout(trailingInvoke, remaining);
    }

    return result;
  };
}

