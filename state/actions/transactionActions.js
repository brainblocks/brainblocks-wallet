// @flow
const actions = {
  BULK_ADD_TRANSACTIONS: 'TRANSACTIONS::BULK_ADD',
  CREATE_TRANSACTION: 'TRANSACTIONS::CREATE'
}

const creators = {
  bulkAddTransactions: (payload = []) => ({
    type: actions.BULK_ADD_TRANSACTIONS,
    payload
  }),
  createTransaction: (payload = {}) => ({
    type: actions.CREATE_TRANSACTION,
    payload
  })
}

export { actions, creators }
