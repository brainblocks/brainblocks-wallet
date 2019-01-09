// @flow
export const AUTH_SET_IS_CHECKING = 'AUTH::IS_CHECKING'
export const AUTH_DID_CHECK = 'AUTH::DID_CHECK'
export const AUTH_UPDATE = 'AUTH::UPDATE'
export const AUTH_LOGOUT = 'AUTH::LOGOUT'

export function setIsChecking(isChecking = true): Object {
  return {
    type: AUTH_SET_IS_CHECKING,
    payload: isChecking
  }
}

export function didCheck(): Object {
  return {
    type: AUTH_DID_CHECK
  }
}

export function update(payload = {}): Objcet {
  return {
    type: AUTH_UPDATE,
    payload
  }
}

export function logout() {
  return {
    type: AUTH_LOGOUT
  }
}
