// Basic throttle (leading + trailing by default)
function throttle(fn, wait) {
  let timer = null;
  let lastArgs = null;
  let lastThis = null;
  let lastCallTime = 0;

  return function throttled(...args) {
    const now = Date.now();
    const remaining = wait - (now - lastCallTime);

    lastArgs = args;
    lastThis = this;

    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      lastCallTime = now;
      fn.apply(lastThis, lastArgs);
      lastArgs = lastThis = null;
    } else if (!timer) {
      // schedule trailing call
      timer = setTimeout(() => {
        lastCallTime = Date.now();
        timer = null;
        fn.apply(lastThis, lastArgs);
        lastArgs = lastThis = null;
      }, remaining);
    }
  };
}


// Throttle with options: { leading, trailing }
function opThrottle(fn, wait, options = {}) {
  const { leading = true, trailing = true } = options;
  let timer = null;
  let lastArgs = null;
  let lastThis = null;
  let lastCallTime = 0;

  function invoke(time) {
    lastCallTime = time;
    fn.apply(lastThis, lastArgs);
    lastArgs = lastThis = null;
  }

  function trailingInvoke() {
    timer = null;
    if (trailing && lastArgs) {
      invoke(Date.now());
    }
  }

  return function throttled(...args) {
    const now = Date.now();
    if (!lastCallTime && !leading) {
      // skip immediate call if leading=false
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
      invoke(now); // leading invocation
    } else if (!timer && trailing) {
      // schedule trailing only if not already invoked
      timer = setTimeout(trailingInvoke, remaining);
    }
  };
}
