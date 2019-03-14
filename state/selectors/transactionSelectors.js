// @flow
import { createSelector } from 'reselect'
import {
  getTransactionPagingIndexes,
  getDashboardAccount
} from '~/state/selectors/uiSelectors'

const transactionsSelector = state => state.transactions

export const getTransactions = createSelector(
  transactionsSelector,
  txs => txs
)

export const getTransactionsForDashboardAccount = createSelector(
  [transactionsSelector, getDashboardAccount],
  (transactions, dashboardAccount) =>
    transactions.allIds.filter(
      txId =>
        dashboardAccount === 'all' ||
        transactions.byId[txId].accountId === dashboardAccount
    )
)

export const getVisibleTransactionsForDashboardAccount = createSelector(
  [getTransactionsForDashboardAccount, getTransactionPagingIndexes],
  (transactions, indexes) =>
    transactions.slice(indexes.startIndex, indexes.endIndex)
)
