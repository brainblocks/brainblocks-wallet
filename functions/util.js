// @flow

export function getKeyByValue(object: Object, value: mixed): ?string {
  return Object.keys(object).find(key => object[key] === value)
}
