export function getUIState(namespace) {
  return state => state.ui[namespace]
}
