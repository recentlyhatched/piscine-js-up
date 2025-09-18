function trunc(x) {
  if (x >= 0) {
    let i = 0;
    while (i + 1 <= x) i++;
    return i;
  } else {
    let i = 0;
    while (i - 1 >= x) i--;
    return i;
  }
}

function floor(x) {
  const t = trunc(x);
  if (t === x) return t;
  return x < 0 ? t - 1 : t;
}

function ceil(x) {
  const t = trunc(x);
  if (t === x) return t;
  return x > 0 ? t + 1 : t;
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
