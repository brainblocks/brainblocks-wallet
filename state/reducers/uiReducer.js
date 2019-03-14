/* @flow */
import { actions } from '~/state/actions/uiActions'
import { TRANSACTIONS_PER_PAGE } from '~/constants'

export const uiInitialState = {
  activeProcesses: [],
  txStartIndex: 0,
  txEndIndex: TRANSACTIONS_PER_PAGE,
  dashboardAccount: 'all'
}

const uiReducer = (state, action) => {
  if (typeof state === 'undefined') {
    return uiInitialState
  }

  switch (action.type) {
    case actions.ADD_ACTIVE_PROCESS:
      return {
        ...state,
        activeProcesses: [...state.activeProcesses, action.processId]
      }
    case actions.REMOVE_ACTIVE_PROCESS:
      return {
        ...state,
        activeProcesses: state.activeProcesses.filter(
          item => item !== action.processId
        )
      }
    case actions.TRANSACTIONS_PAGING_RESET:
      return {
        ...state,
        txStartIndex: 0,
        txEndIndex: TRANSACTIONS_PER_PAGE
      }
    case actions.TRANSACTIONS_PAGING_SET:
      return {
        ...state,
        txStartIndex: action.startIndex,
        txEndIndex: action.endIndex
      }
    case actions.UPDATE_DASHBOARD_ACCOUNT:
      return {
        ...state,
        dashboardAccount: action.payload
      }
    default:
      return state
  }
}

export default uiReducer
