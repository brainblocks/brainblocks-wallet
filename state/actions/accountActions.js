// @flow
const actions = {
  BULK_ADD_ACCOUNTS: 'ACCOUNTS::BULK_ADD_ACCOUNTS',
  CREATE_ACCOUNT: 'ACCOUNTS::CREATE_ACCOUNT',
  UPDATE_ACCOUNT: 'ACCOUNTS::UPDATE_ACCOUNT',
  DELETE_ACCOUNT: 'ACCOUNTS::DELETE_ACCOUNT'
}

const creators = {
  bulkAddAccounts: (payload = []) => ({
    type: actions.BULK_ADD_ACCOUNTS,
    payload
  }),
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
