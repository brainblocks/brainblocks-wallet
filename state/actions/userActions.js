// @flow
export const UPDATE_AUTHORIZED_USER = 'USER::UPDATE_AUTHORIZED_USER'

export function updateAuthorizedUser(payload = {}) {
  return {
    type: UPDATE_AUTHORIZED_USER,
    payload
  }
}
