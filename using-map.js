function citiesOnly(arr) {
  return arr.map(obj => obj.city);
}

function upperCasingStates(arr) {
  return arr.map(state =>
    state
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
}

function fahrenheitToCelsius(arr) {
  return arr.map(temp => {
    const f = parseInt(temp, 10); // extract number part
    const c = Math.floor((f - 32) * 5 / 9);
    return `${c}°C`;
  });
}

function trimTemp(arr) {
  return arr.map(obj => ({
    ...obj, // copies beginning of the object using the spread operator e.g. city: 'Los Angeles'
    temperature: obj.temperature.replace(/\s+/g, '') // remove all spaces
  }));
}


function tempForecasts(arr) {
  return arr.map(obj => {
    const f = parseInt(obj.temperature, 10);
    const c = Math.floor((f - 32) * 5 / 9);
    const stateFormatted = obj.state
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    return `${c}°Celsius in ${obj.city}, ${stateFormatted}`;
  });
}

