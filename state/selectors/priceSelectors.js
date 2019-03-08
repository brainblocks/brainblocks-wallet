// @flow
import { createSelector } from 'reselect'
import { getPreferredCurrency } from '~/state/selectors/userSelectors'

const getPrices = state => state.price

export const getNanoPriceInPreferredCurrency = createSelector(
  getPrices,
  getPreferredCurrency,
  (prices, preferredCurrency) => {
    console.log(prices, preferredCurrency)
    return prices.nano.hasOwnProperty(preferredCurrency)
      ? prices.nano[preferredCurrency]
      : 0
  }
)

export const getSupportedCurrencies = createSelector(
  getPrices,
  prices => Object.keys(prices.nano).sort()
)
