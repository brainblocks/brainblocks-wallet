// @flow
import { actions } from '~/state/actions/tradeActions'
import { actions as authActions } from '~/state/actions/authActions'
import type { TradeState, ReduxAction } from '~/types/reduxTypes'

export const tradeInitialState: TradeState = {
  nanoPairs: [],
  currentSell: {
    buyCurrency: 'BTC',
    fromAcc: '',
    sellAmount: 0,
    receiveAddr: '',
    extraId: ''
  }
}

const tradeReducer: (state: TradeState, action: ReduxAction) => TradeState = (
  state,
  action
) => {
  if (typeof state === 'undefined' || action.type === authActions.LOGOUT) {
    return tradeInitialState
  }

  switch (action.type) {
    case actions.UPDATE_NANO_PAIRS:
      return {
        ...state,
        nanoPairs: action.payload
      }
    case actions.SET_CURRENT_SELL:
      return {
        ...state,
        currentSell: action.payload
      }
    default:
      return state
  }
}

export default tradeReducer
