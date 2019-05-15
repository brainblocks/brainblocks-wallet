// @flow
import { createSelector } from 'reselect'
import {
  getTransactionPagingIndexes,
  getDashboardAccount,
  getActiveProcesses
} from '~/state/selectors/uiSelectors'
import type { TransactionsState, ReduxState } from '~/types/reduxTypes'

const transactionsSelector = state => state.transactions

export const getTransactions: ReduxState => TransactionsState = createSelector(
  transactionsSelector,
  txs => txs
)

export const getTransactionsForDashboardAccount: ReduxState => Array<string> = createSelector(
  [transactionsSelector, getDashboardAccount],
  (transactions, dashboardAccount) =>
    transactions.allIds.filter(
      txId =>
        dashboardAccount === 'all' ||
        transactions.byId[txId].accountId === dashboardAccount
    )
)

export const getVisibleTransactionsForDashboardAccount: ReduxState => Array<string> = createSelector(
  [getTransactionsForDashboardAccount, getTransactionPagingIndexes],
  (transactions, indexes) =>
    transactions.slice(indexes.startIndex, indexes.endIndex)
)

export const getIsGettingChains: ReduxState => boolean = createSelector(
  [getActiveProcesses, getTransactions],
  (processes, txs) =>
    txs.allIds.length === 0 &&
    processes.filter(process => process.indexOf('get-chains-') === 0).length > 0
)
