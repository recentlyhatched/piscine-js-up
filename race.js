function race(promises) {
  return Promise.race(promises.map(p => Promise.resolve(p)));
}

function some(promises, count) {
  if (!promises.length || count === 0) return Promise.resolve([]); // return []

  const results = [];
  let resolvedCount = 0;

  return new Promise((resolve) => {
    promises.forEach(p =>
      Promise.resolve(p)
        .then(value => {
          if (resolvedCount < count) {
            results.push(value);
            resolvedCount++;
            if (resolvedCount === count) resolve(results);
          }
        })
        .catch(() => {}) // ignore rejected promises
    );
  });
}

