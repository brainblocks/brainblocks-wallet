// @flow
export function errorSelector(state, namespace) {
  return state.errors[namespace]
}
