function race(promises) {
  return Promise.race(promises.map(p => Promise.resolve(p)));
}

function some(promises, count) {
  if (!promises.length || count === 0) return Promise.resolve([]);

  const results = Array(promises.length).fill(undefined);
  let resolvedCount = 0;

  return new Promise((resolve) => {
    promises.forEach((p, i) => {
      Promise.resolve(p)
        .then(value => {
          results[i] = value;
          resolvedCount++;
          if (resolvedCount === count) {
            // take the first `count` resolved values in original order
            const output = results.filter(r => r !== undefined).slice(0, count);
            resolve(output);
          }
        })
        .catch(() => {
          resolvedCount++;
          if (resolvedCount === count) {
            const output = results.filter(r => r !== undefined).slice(0, count);
            resolve(output);
          }
        });
    });
  });
}
