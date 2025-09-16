function getAcceleration(obj) {
  // try a = F/m
  if ('f' in obj && 'm' in obj && obj.m !== 0) {
    return obj.f / obj.m
  }
  
  // try a = Δv / Δt
  if ('Δv' in obj && 'Δt' in obj && obj['Δt'] !== 0) {
    return obj['Δv'] / obj['Δt']
  }

  // try a = 2d / t^2
  if ('d' in obj && 't' in obj && obj.t !== 0) {
    return (2 * obj.d) / (obj.t * obj.t)
  }

  // if none of the formulas can be applied
  return "impossible"
}
