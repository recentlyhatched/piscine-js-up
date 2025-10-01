function interpolation({ step, start, end, callback, duration }) {
  // validate
  step = Number(step);
  duration = Number(duration);
  if (!step || step <= 0 || typeof callback !== 'function') return;

  const interval = duration / step;
  const delta = end - start;

  for (let i = 1; i <= step; i++) {
    // schedule each callback at i * interval
    setTimeout(() => {
      const x = start + ((i - 1) / step) * delta; // exclude the end
      const y = i * interval; // elapsed time for this point
      callback([x, y]);
    }, i * interval);
  }
}
