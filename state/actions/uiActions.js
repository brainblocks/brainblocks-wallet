// @flow
export const UI_IS_LOADING = 'UI:IS_LOADING'

export function isLoading(isLoading = true) {
  return {
    action: UI_IS_LOADING,
    payload: isLoading
  }
}
