// @flow
import { createSelector } from 'reselect'
import { getPreferredCurrency } from '~/state/selectors/userSelectors'
import type { ReduxState } from '~/types/reduxTypes'

const getPrices = state => state.price

export const getNanoPriceInPreferredCurrency: ReduxState => number = createSelector(
  getPrices,
  getPreferredCurrency,
  (prices, preferredCurrency) => {
    return prices.nano.hasOwnProperty(preferredCurrency)
      ? prices.nano[preferredCurrency]
      : 0
  }
)

export const getSupportedCurrencies: ReduxState => Array<string> = createSelector(
  getPrices,
  prices => Object.keys(prices.nano).sort()
)
