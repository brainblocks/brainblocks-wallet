// @flow
export function getError(namespace) {
  return state => state.errors[namespace]
}
