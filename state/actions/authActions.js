// @flow
const actions = {
  SET_IS_CHECKING: 'AUTH::IS_CHECKING',
  DID_CHECK: 'AUTH::DID_CHECK',
  UPDATE: 'AUTH::UPDATE',
  LOGOUT: 'AUTH::LOGOUT',
  STORE_USER_PASSWORD: 'AUTH::STORE_PASSWORD',
  DELETE_USER_PASSWORD: 'AUTH::DELETE_PASSWORD'
}

const creators = {
  setIsChecking: (isChecking = true) => ({
    type: actions.SET_IS_CHECKING,
    payload: isChecking
  }),
  didCheck: () => ({
    type: actions.DID_CHECK
  }),
  update: (payload = {}) => ({
    type: actions.UPDATE,
    payload
  }),
  logout: () => ({
    type: actions.LOGOUT
  }),
  storePassword: password => ({
    type: actions.STORE_USER_PASSWORD,
    password
  }),
  deletePassword: () => ({
    type: actions.DELETE_USER_PASSWORD
  })
}

export { actions, creators }
