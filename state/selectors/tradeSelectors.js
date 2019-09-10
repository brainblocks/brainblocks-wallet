// @flow
import { createSelector } from 'reselect'
import type { ReduxState } from '~/types/reduxTypes'

const getTrade = state => state.trade

export const getNanoPairs: ReduxState => Array<Object> = createSelector(
  getTrade,
  trade => trade.nanoPairs
)
