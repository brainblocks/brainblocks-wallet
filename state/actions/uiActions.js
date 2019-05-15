// @flow
import type {
  AddActiveProcessAction,
  RemoveActiveProcessAction,
  TxPagingResetAction,
  TxPagingSetAction,
  UpdateDashboardAccountAction
} from '~/types/reduxTypes'

const actions = {
  ADD_ACTIVE_PROCESS: 'UI::ADD_ACTIVE_PROCESS',
  REMOVE_ACTIVE_PROCESS: 'UI::REMOVE_ACTIVE_PROCESS',
  TRANSACTIONS_PAGING_RESET: 'UI::TRANSACTIONS_PAGING_RESET',
  TRANSACTIONS_PAGING_SET: 'UI::TRANSACTIONS_PAGING_SET',
  UPDATE_DASHBOARD_ACCOUNT: 'UI::UPDATE_DASHBOARD_ACCOUNT'
}

type Creators = {
  addActiveProcess: string => AddActiveProcessAction,
  removeActiveProcess: string => RemoveActiveProcessAction,
  txPagingReset: () => TxPagingResetAction,
  txPagingSet: (startIndex: number, endIndex: number) => TxPagingSetAction,
  updateDashboardAccount: string => UpdateDashboardAccountAction
}

const creators: Creators = {
  addActiveProcess: processId => ({
    type: actions.ADD_ACTIVE_PROCESS,
    processId
  }),
  removeActiveProcess: processId => ({
    type: actions.REMOVE_ACTIVE_PROCESS,
    processId
  }),
  txPagingReset: () => ({
    type: actions.TRANSACTIONS_PAGING_RESET
  }),
  txPagingSet: (startIndex, endIndex) => ({
    type: actions.TRANSACTIONS_PAGING_SET,
    startIndex,
    endIndex
  }),
  updateDashboardAccount: (account = 'all') => ({
    type: actions.UPDATE_DASHBOARD_ACCOUNT,
    payload: account
  })
}

export { actions, creators }
