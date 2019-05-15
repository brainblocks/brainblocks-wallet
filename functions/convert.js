// @flow

/**
 * Convert from Nano to Fiat and vice versa
 */
export const convert: (
  val: number,
  from: 'nano' | 'fiat',
  nanoPrice: number
) => number = (val, from, nanoPrice) => {
  if (!nanoPrice) return 0
  return from === 'nano' ? val * nanoPrice : val / nanoPrice
}
