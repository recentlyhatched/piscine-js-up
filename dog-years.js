function dogYears(planet, ageInSeconds) {
  const secondsInEarthYear = 31557600
  const orbitalPeriods = {
    earth: 1.0,
    mercury: 0.2408467,
    venus: 0.61519726,
    mars: 1.8808158,
    jupiter: 11.862615,
    saturn: 29.447498,
    uranus: 84.016846,
    neptune: 164.79132
  }

  const ageInEarthYears = ageInSeconds / secondsInEarthYear

  const ageOnPlanet = ageInEarthYears / orbitalPeriods[planet]

  const ageInDogYears = ageOnPlanet * 7

  return Number(ageInDogYears.toFixed(2))
}
