// @flow

/**
 * Convert from Nano to Fiat and vice versa
 */
export const convert = (
  val: number,
  from: 'nano' | 'fiat',
  nanoPrice: number
) => {
  if (!nanoPrice) return 0
  return from === 'nano' ? val * nanoPrice : val / nanoPrice
}
