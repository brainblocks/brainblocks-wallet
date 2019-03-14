import { createSelector } from 'reselect'

const getUI = state => state.ui

export const getIsWorking = createSelector(
  [getUI],
  ui => ui.activeProcesses.length > 0
)

export const getTransactionPagingIndexes = createSelector(
  [getUI],
  ui => ({ startIndex: ui.txStartIndex, endIndex: ui.txEndIndex })
)

export const getDashboardAccount = createSelector(
  getUI,
  ui => ui.dashboardAccount
)
