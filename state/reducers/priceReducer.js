import { actions } from '~/state/actions/priceActions'
import { actions as authActions } from '~/state/actions/authActions'

export const priceInitialState = {
  nano: {}
}

const priceReducer = (state, action) => {
  if (typeof state === 'undefined' || action.type === authActions.LOGOUT) {
    return priceInitialState
  }

  switch (action.type) {
    case actions.UPDATE_NANO_PRICES:
      return {
        ...state,
        nano: action.payload
      }
    default:
      return state
  }
}

export default priceReducer
