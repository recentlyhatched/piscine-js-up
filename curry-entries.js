function defaultCurry(obj1) {
  return function (obj2) {
    return { ...obj1, ...obj2 };
  };
}

function mapCurry(fn) {
  return function (obj) {
    const result = {};
    for (const [k, v] of Object.entries(obj)) {
      const [newK, newV] = fn([k, v]);
      result[newK] = newV;
    }
    return result;
  };
}

function reduceCurry(fn) {
  return function (obj, initialValue) {
    let acc = initialValue;
    for (const [k, v] of Object.entries(obj)) {
      acc = fn(acc, [k, v]);
    }
    return acc;
  };
}

function filterCurry(fn) {
  return function (obj) {
    const result = {};
    for (const [k, v] of Object.entries(obj)) {
      if (fn([k, v])) {
        result[k] = v;
      }
    }
    return result;
  };
}

// Sum of pilotingScore + shootingScore for force users
function reduceScore(personnel) {
  return reduceCurry((acc, [_, p]) => {
    if (p.isForceUser) {
      return acc + p.pilotingScore + p.shootingScore;
    }
    return acc;
  })(personnel, 0);
}

// Only force users with shootingScore >= 80
function filterForce(personnel) {
  return filterCurry(([_, p]) => p.isForceUser && p.shootingScore >= 80)(
    personnel
  );
}

// Add averageScore property to each person
function mapAverage(personnel) {
  return mapCurry(([k, p]) => [
    k,
    {
      ...p,
      averageScore: (p.pilotingScore + p.shootingScore) / 2,
    },
  ])(personnel);
}
