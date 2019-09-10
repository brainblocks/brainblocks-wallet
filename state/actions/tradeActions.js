// @flow
import type {
  UpdateNanoPairsAction,
  SetCurrentSellAction
} from '~/types/reduxTypes'

const actions = {
  UPDATE_NANO_PAIRS: 'TRADE::UPDATE_NANO_PAIRS',
  SET_CURRENT_SELL: 'TRADE::SET_CURRENT_SELL'
}

type Creators = {
  updateNanoPairs: Object => UpdateNanoPairsAction,
  setCurrentSell: Object => SetCurrentSellAction
}

const creators: Creators = {
  updateNanoPairs: payload => ({
    type: actions.UPDATE_NANO_PAIRS,
    payload
  }),
  setCurrentSell: payload => ({
    type: actions.SET_CURRENT_SELL,
    payload
  })
}

export { actions, creators }
