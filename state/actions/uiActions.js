// @flow
const actions = {
  ADD_ACTIVE_PROCESS: 'UI::ADD_ACTIVE_PROCESS',
  REMOVE_ACTIVE_PROCESS: 'UI::REMOVE_ACTIVE_PROCESS',
  TRANSACTIONS_PAGING_RESET: 'UI::TRANSACTIONS_PAGING_RESET',
  TRANSACTIONS_PAGING_SET: 'UI::TRANSACTIONS_PAGING_SET',
  UPDATE_DASHBOARD_ACCOUNT: 'UI::UPDATE_DASHBOARD_ACCOUNT'
}

const creators = {
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
