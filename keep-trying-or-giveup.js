function retry(count, callback) {
  return async function (...args) {
    let attempts = 0;
    while (true) {
      try {
        // attempt the callback
        return await callback(...args);
      } catch (err) {
        attempts++;
        if (attempts > count) {
          // throw only after exhausting all retries
          throw err;
        }
      }
    }
  };
}


function timeout(delay, callback) {
  return async function (...args) {
    return new Promise((resolve) => {
      let settled = false;

      // set a timer for the timeout
      const timer = setTimeout(() => {
        if (!settled) {
          settled = true;
          resolve(new Error('timeout'));
        }
      }, delay);

      // invoke the callback
      callback(...args)
        .then((res) => {
          if (!settled) {
            settled = true;
            clearTimeout(timer);
            resolve(res);
          }
        })
        .catch((err) => {
          if (!settled) {
            settled = true;
            clearTimeout(timer);
            resolve(err); // resolve with the error from callback
          }
        });
    });
  };
}
