// @flow
import { createSelector } from 'reselect'
import type { TradesState, ReduxState, Trade } from '~/types/reduxTypes'

const tradesSelector = state => state.trades

export const getTrades: ReduxState => TradesState = createSelector(
  tradesSelector,
  trades => trades
)

export const getTradesByTxHash: ReduxState => TradesState = createSelector(
  getTrades,
  trades =>
    trades.allIds.reduce((hashTrades, tid: string) => {
      const t: Trade = trades.byId[tid]
      const isSell = t.fromCurrency === 'nano'
      if (isSell) {
        if (t.hasOwnProperty('payinHash')) {
          return { ...hashTrades, [t.payinHash]: t }
        }
      } else {
        if (t.hasOwnProperty('payoutHash')) {
          return { ...hashTrades, [t.payoutHash]: t }
        }
      }
      return { ...hashTrades }
    }, {})
)
