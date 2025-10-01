async function series(funcs) {
  const results = [];
  for (const fn of funcs) {
    results.push(await fn());
  }
  return results;
}
