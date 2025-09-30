function filterEntries(obj, callback) {
  const result = {};
  for (const [k, v] of Object.entries(obj)) {
    if (callback([k, v], obj)) {
      result[k] = v;
    }
  }
  return result;
}

function mapEntries(obj, callback) {
  const result = {};
  for (const [k, v] of Object.entries(obj)) {
    const [newK, newV] = callback([k, v], obj);
    result[newK] = newV;
  }
  return result;
}

function reduceEntries(obj, callback, initialValue) {
  let accumulator = initialValue;
  let first = true;

  for (const [k, v] of Object.entries(obj)) {
    if (accumulator === undefined && first) {
      accumulator = [k, v];
      first = false;
    } else {
      accumulator = callback(accumulator, [k, v], obj);
    }
  }
  return accumulator;
}

function totalCalories(cart) {
  return reduceEntries(
    cart,
    (acc, [item, grams]) => {
      const nutrition = nutritionDB[item];
      if (!nutrition) return acc;
      return acc + (nutrition.calories * grams) / 100;
    },
    0
  );
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
