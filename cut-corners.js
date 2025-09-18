function trunc(x) {
  // handle non-finite values quickly
  if (!Number.isFinite(x)) return x;
  // handle ±0
  if (x === 0) return 0;

  const sign = x < 0 ? -1 : 1;
  let y = x * sign; // absolute value

  // if absolute value < 1, integer part is 0
  if (y < 1) return 0;

  // find a power-of-two 'step' that is > y, then step back to largest <= y.
  let step = 1;
  while (step <= y) {
    const next = step * 2;
    // defensive: if next overflows to Infinity, stop
    if (!Number.isFinite(next)) break;
    step = next;
  }
  if (step > y) step = step / 2;

  // greedy/binary-add: accumulate largest powers down to 1
  let n = 0;
  while (step >= 1) {
    if (n + step <= y) n += step;
    step = step / 2;
  }

  return sign * n;
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
  const frac = x - t;
  if (x >= 0) {
    return frac >= 0.5 ? t + 1 : t;
  } else {
    return frac <= -0.5 ? t - 1 : t;
  }
}
