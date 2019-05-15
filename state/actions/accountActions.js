// @flow
import type {
  ReduxAccount,
  BulkAddAccountsAction,
  CreateAccountAction,
  UpdateAccountAction,
  BulkUpdateAccountsAction
  //DeleteAccountAction
} from '~/types/reduxTypes'

const actions = {
  BULK_ADD_ACCOUNTS: 'ACCOUNTS::BULK_ADD_ACCOUNTS',
  CREATE_ACCOUNT: 'ACCOUNTS::CREATE_ACCOUNT',
  UPDATE_ACCOUNT: 'ACCOUNTS::UPDATE_ACCOUNT',
  BULK_UPDATE_ACCOUNTS: 'ACCOUNTS::BULK_UPDATE_ACCOUNTS',
  DELETE_ACCOUNT: 'ACCOUNTS::DELETE_ACCOUNT'
}

type Creators = {
  bulkAddAccounts: (Array<ReduxAccount>) => BulkAddAccountsAction,
  createAccount: ReduxAccount => CreateAccountAction,
  updateAccount: Object => UpdateAccountAction,
  bulkUpdateAccounts: (Array<Object>) => BulkUpdateAccountsAction
  //deleteAccount: string => DeleteAccountAction
}

const creators: Creators = {
  bulkAddAccounts: (payload = []) => ({
    type: actions.BULK_ADD_ACCOUNTS,
    payload
  }),
  createAccount: payload => ({
    type: actions.CREATE_ACCOUNT,
    payload
  }),
  updateAccount: (payload = {}) => ({
    type: actions.UPDATE_ACCOUNT,
    payload
  }),
  bulkUpdateAccounts: (payload = []) => ({
    type: actions.BULK_UPDATE_ACCOUNTS,
    payload
  })
  /*deleteAccount: accountId => ({
    type: actions.DELETE_ACCOUNT,
    accountId
  })*/
}

export { actions, creators }
