function filterEntries(obj, callback) {
  const result = {};
  for (const [k, v] of Object.entries(obj)) {
    if (callback([k, v], obj)) result[k] = v;
  }
  return result;
}

function mapEntries(obj, callback) {
  const result = {};
  for (const [k, v] of Object.entries(obj)) {
    const out = callback([k, v], obj);
    if (!Array.isArray(out) || out.length !== 2) {
      throw new TypeError('mapEntries callback must return [newKey, newValue]');
    }
    const [newK, newV] = out;
    result[newK] = newV;
  }
  return result;
}

function reduceEntries(obj, callback, initialValue) {
  const entries = Object.entries(obj);
  if (initialValue === undefined) {
    if (entries.length === 0) {
      throw new TypeError('Reduce of empty object with no initial value');
    }
    // start accumulator as the first entry (shape: [k, v])
    let acc = entries[0];
    for (let i = 1; i < entries.length; i++) acc = callback(acc, entries[i], obj);
    return acc;
  } else {
    let acc = initialValue;
    for (const entry of entries) acc = callback(acc, entry, obj);
    return acc;
  }
}

// Uses nutritionDB (assumed provided)
function totalCalories(cart) {
  const sum = reduceEntries(
    cart,
    (acc, [item, grams]) => {
      const nutrition = nutritionDB[item];
      if (!nutrition) return acc;
      return acc + (nutrition.calories * grams) / 100;
    },
    0
  );
  // Normalize floating point precision to one decimal place
  return parseFloat(sum.toFixed(1));
}

function lowCarbs(cart) {
  return filterEntries(cart, ([item, grams]) => {
    const nutrition = nutritionDB[item];
    if (!nutrition) return false;
    const totalCarbs = (nutrition.carbs * grams) / 100;
    return totalCarbs < 50;
  });
}

function cartTotal(cart) {
  return mapEntries(cart, ([item, grams]) => {
    const nutrition = nutritionDB[item];
    if (!nutrition) return [item, {}];

    const totals = {};
    for (const [nutrient, value] of Object.entries(nutrition)) {
      totals[nutrient] = (value * grams) / 100;
    }
    return [item, totals];
  });
}
