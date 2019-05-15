// @flow
import { createSelector } from 'reselect'
import type { ReduxState } from '~/types/reduxTypes'

const getUI = state => state.ui

export const getActiveProcesses: ReduxState => Array<string> = createSelector(
  [getUI],
  ui => ui.activeProcesses
)

export const getIsWorking: ReduxState => boolean = createSelector(
  [getActiveProcesses],
  processes => processes.length > 0
)

export const getTransactionPagingIndexes: ReduxState => {
  startIndex: Number,
  endIndex: number
} = createSelector(
  [getUI],
  ui => ({ startIndex: ui.txStartIndex, endIndex: ui.txEndIndex })
)

export const getDashboardAccount: ReduxState => string = createSelector(
  getUI,
  ui => ui.dashboardAccount
)
