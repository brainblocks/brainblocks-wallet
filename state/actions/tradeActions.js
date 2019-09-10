// @flow
import type {
  UpdateNanoPairsAction,
  SetCurrentSellAction,
  SetCurrentBuyAction,
  CurrentSell,
  CurrentBuy
} from '~/types/reduxTypes'

const actions = {
  UPDATE_NANO_PAIRS: 'TRADE::UPDATE_NANO_PAIRS',
  SET_CURRENT_SELL: 'TRADE::SET_CURRENT_SELL',
  SET_CURRENT_BUY: 'TRADE::SET_CURRENT_BUY'
}

type Creators = {
  updateNanoPairs: Object => UpdateNanoPairsAction,
  setCurrentSell: CurrentSell => SetCurrentSellAction,
  setCurrentBuy: CurrentBuy => SetCurrentBuyAction
}

const creators: Creators = {
  updateNanoPairs: payload => ({
    type: actions.UPDATE_NANO_PAIRS,
    payload
  }),
  setCurrentSell: payload => ({
    type: actions.SET_CURRENT_SELL,
    payload
  }),
  setCurrentBuy: payload => ({
    type: actions.SET_CURRENT_BUY,
    payload
  })
}

export { actions, creators }
