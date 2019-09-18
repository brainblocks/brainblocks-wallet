// @flow
import type {
  UpdateNanoPairsAction,
  SetCurrentSellAction,
  SetCurrentBuyAction,
  CurrentSell,
  CurrentBuy,
  TradeQuote,
  SetSellQuoteAction,
  SetBuyQuoteAction,
  ResetCurrentBuyAction,
  ResetCurrentSellAction
} from '~/types/reduxTypes'

const actions = {
  UPDATE_NANO_PAIRS: 'TRADE::UPDATE_NANO_PAIRS',
  SET_CURRENT_SELL: 'TRADE::SET_CURRENT_SELL',
  SET_CURRENT_BUY: 'TRADE::SET_CURRENT_BUY',
  RESET_CURRENT_SELL: 'TRADE::RESET_CURRENT_SELL',
  RESET_CURRENT_BUY: 'TRADE::RESET_CURRENT_BUY',
  SET_SELL_QUOTE: 'TRADE::SET_SELL_QUOTE',
  SET_BUY_QUOTE: 'TRADE::SET_BUY_QUOTE'
}

type Creators = {
  updateNanoPairs: Object => UpdateNanoPairsAction,
  setCurrentSell: CurrentSell => SetCurrentSellAction,
  setCurrentBuy: CurrentBuy => SetCurrentBuyAction,
  resetCurrentSell: () => ResetCurrentSellAction,
  resetCurrentBuy: () => ResetCurrentBuyAction,
  setSellQuote: (TradeQuote | null) => SetSellQuoteAction,
  setBuyQuote: (TradeQuote | null) => SetBuyQuoteAction
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
  }),
  resetCurrentSell: () => ({
    type: actions.RESET_CURRENT_SELL
  }),
  resetCurrentBuy: () => ({
    type: actions.RESET_CURRENT_BUY
  }),
  setSellQuote: payload => ({
    type: actions.SET_SELL_QUOTE,
    payload
  }),
  setBuyQuote: payload => ({
    type: actions.SET_BUY_QUOTE,
    payload
  })
}

export { actions, creators }
