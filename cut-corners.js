function trunc(x) {
  return x < 0 ? Math.ceil(x) : Math.floor(x);
}

function floor(x) {
  // already an integer
  if (x === trunc(x)) return x;
  // positive numbers, drop fraction
  if (x > 0) return trunc(x);
  // negative numbers, drop fraction, then subtract 1
  return trunc(x) - 1;
}

function ceil(x) {
  // already an integer
  if (x === trunc(x)) return x;
  // positive numbers, drop fraction, then add 1
  if (x > 0) return trunc(x) + 1;
  // negative numbers, just drop fraction
  return trunc(x);
}

function round(x) {
  const intPart = trunc(x);
  const frac = x - intPart;

  if (x >= 0) {
    // round up if fractional part >= 0.5
    return frac >= 0.5 ? intPart + 1 : intPart;
  } else {
    // negatives, round toward -∞ if frac <= -0.5
    return frac <= -0.5 ? intPart - 1 : intPart;
  }
}
