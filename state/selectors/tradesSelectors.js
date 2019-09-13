// @flow
import { createSelector } from 'reselect'
import type { TradesState, ReduxState } from '~/types/reduxTypes'

const tradesSelector = state => state.trades

export const getTrades: ReduxState => TradesState = createSelector(
  tradesSelector,
  trades => trades
)
