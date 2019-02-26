// @flow
const actions = {
  CREATE_ACCOUNT: 'ACCOUNTS::CREATE_ACCOUNT',
  UPDATE_ACCOUNT: 'ACCOUNTS::UPDATE_ACCOUNT',
  DELETE_ACCOUNT: 'ACCOUNTS::DELETE_ACCOUNT'
}

const creators = {
  createAccount: (payload = {}) => ({
    type: actions.CREATE_ACCOUNT,
    payload
  }),
  updateAccount: (payload = {}) => ({
    type: actions.UPDATE_ACCOUNT,
    payload
  }),
  deleteAccount: accountId => ({
    type: actions.DELETE_ACCOUNT,
    accountId
  })
}

export { actions, creators }
