// @flow
import { createSelector } from 'reselect'
import { getPreferredCurrency } from '~/state/selectors/userSelectors'

const getPrices = state => state.price

export const getNanoPriceInPreferredCurrency = createSelector(
  getPrices,
  getPreferredCurrency,
  (prices, preferredCurrency) => {
    preferredCurrency = preferredCurrency.toLowerCase()
    return prices.nano.hasOwnProperty(preferredCurrency)
      ? prices.nano[preferredCurrency]
      : 0
  }
)
