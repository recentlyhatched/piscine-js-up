function trunc(x) {
  if (x === 0) return 0;

  let sign = x < 0 ? -1 : 1;
  let n = 0;
  let step = 1;

  // Grow step until it overshoots
  while ((n + step) * sign <= x * sign) {
    n += step;
    step *= 2;
  }

  // Refine downwards
  while ((n + 1) * sign <= x * sign) {
    n += 1;
  }

  return n;
}
function floor(x) {
  const t = trunc(x);
  return t > x ? t - 1 : t;
}

function ceil(x) {
  const t = trunc(x);
  return t < x ? t + 1 : t;
}

function round(x) {
  const t = trunc(x);
  const diff = x - t;
  if (x >= 0) {
    return diff >= 0.5 ? t + 1 : t;
  } else {
    return diff <= -0.5 ? t - 1 : t;
  }
}
