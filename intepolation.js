function interpolation({ step, start, end, callback, duration }) {
  if (step <= 0) return;

  const interval = duration / step;
  const delta = (end - start) / step;

  for (let i = 1; i <= step; i++) {
    setTimeout(() => {
      const x = (i * (end - start)) / step; // distance covered so far
      const y = start + delta * i;          // current interpolated point
      callback([x, y]);
    }, i * interval);
  }
}
