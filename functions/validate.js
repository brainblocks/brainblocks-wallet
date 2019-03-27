export function isValidNanoAddress(address) {
  const re = /^(xrb|nano)_[13][13456789abcdefghijkmnopqrstuwxyz]{59}$/
  return re.test(address)
}

export function isValidNanoSeed(seed) {
  const re = /^[0-9A-Fa-f]{64}$/
  return re.test(seed)
}
