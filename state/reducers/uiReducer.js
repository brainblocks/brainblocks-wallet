/* @flow */
import { actions } from '~/state/actions/uiActions'
import { actions as authActions } from '~/state/actions/authActions'
import { TRANSACTIONS_PER_PAGE } from '~/constants/config'
import type { UIState, ReduxAction } from '~/types/reduxTypes'

export const uiInitialState: UIState = {
  activeProcesses: [],
  txStartIndex: 0,
  txEndIndex: TRANSACTIONS_PER_PAGE,
  dashboardAccount: 'all'
}

const uiReducer = (state: UIState, action: ReduxAction): UIState => {
  if (typeof state === 'undefined' || action.type === authActions.LOGOUT) {
    return uiInitialState
  }

  switch (action.type) {
    case actions.ADD_ACTIVE_PROCESS:
      return {
        ...state,
        activeProcesses: [...state.activeProcesses, action.processId]
      }
    case actions.REMOVE_ACTIVE_PROCESS:
      var process = action.hasOwnProperty('processId') ? action.processId : ''
      return {
        ...state,
        activeProcesses: state.activeProcesses.filter(item => item !== process)
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
