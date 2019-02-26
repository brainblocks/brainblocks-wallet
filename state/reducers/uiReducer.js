import { actions } from '~/state/actions/uiActions'

export const uiInitialState = {
  activeProcesses: []
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
    default:
      return state
  }
}

export default uiReducer
