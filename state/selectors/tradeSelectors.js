// @flow
import { createSelector } from 'reselect'
import type {
  ReduxState,
  CurrentBuy,
  CurrentSell,
  TradeQuote
} from '~/types/reduxTypes'

const getTrade = state => state.trade

export const getNanoPairs: ReduxState => Array<Object> = createSelector(
  getTrade,
  trade => trade.nanoPairs
)

export const getCurrentBuy: ReduxState => CurrentBuy = createSelector(
  getTrade,
  trade => trade.currentBuy
)

export const getCurrentSell: ReduxState => CurrentSell = createSelector(
  getTrade,
  trade => trade.currentSell
)

export const getBuyQuote: ReduxState => ?TradeQuote = createSelector(
  getTrade,
  trade => trade.buyQuote
)

export const getSellQuote: ReduxState => ?TradeQuote = createSelector(
  getTrade,
  trade => trade.sellQuote
)
