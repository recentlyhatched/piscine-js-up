function trunc(x) {
  return parseInt(x); // truncates toward 0
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
