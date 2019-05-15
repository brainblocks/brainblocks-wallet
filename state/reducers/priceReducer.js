// @flow
import { actions } from '~/state/actions/priceActions'
import { actions as authActions } from '~/state/actions/authActions'
import type { PriceState, ReduxAction } from '~/types/reduxTypes'

export const priceInitialState: PriceState = {
  nano: {}
}

const priceReducer: (state: PriceState, action: ReduxAction) => PriceState = (
  state,
  action
) => {
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
