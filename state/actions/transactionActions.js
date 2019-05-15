// @flow
import type {
  ReduxTransaction,
  BulkAddTransactionsAction,
  CreateTransactionAction,
  UpdateTransactionAction,
  ReduxNanoTransactionsObject
} from '~/types/reduxTypes'

const actions = {
  BULK_ADD_TRANSACTIONS: 'TRANSACTIONS::BULK_ADD',
  CREATE_TRANSACTION: 'TRANSACTIONS::CREATE',
  UPDATE_TRANSACTION: 'TRANSACTIONS::UPDATE'
}

type Creators = {
  bulkAddTransactions: ReduxNanoTransactionsObject => BulkAddTransactionsAction,
  createTransaction: ReduxTransaction => CreateTransactionAction,
  updateTransaction: Object => UpdateTransactionAction
}

const creators: Creators = {
  bulkAddTransactions: (payload = {}) => ({
    type: actions.BULK_ADD_TRANSACTIONS,
    payload
  }),
  createTransaction: payload => ({
    type: actions.CREATE_TRANSACTION,
    payload
  }),
  updateTransaction: (payload = {}) => ({
    type: actions.UPDATE_TRANSACTION,
    payload
  })
}

export { actions, creators }
