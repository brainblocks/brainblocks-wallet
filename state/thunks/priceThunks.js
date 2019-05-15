// @flow
import { creators } from '~/state/actions/priceActions'
import { creators as uiCreators } from '~/state/actions/uiActions'
import * as priceAPI from '~/state/api/price'
import log from '~/functions/log'
import type { ThunkAction } from '~/types/reduxTypes'

export const updatePrice: boolean => ThunkAction = (focusCheck = true) => (
  dispatch,
  getState
) => {
  return new Promise(async (resolve, reject) => {
    if (
      !focusCheck ||
      (typeof document !== 'undefined' && document.hasFocus())
    ) {
      const time = Date.now()

      // let ui know we're working
      dispatch(uiCreators.addActiveProcess(`check-price-${time}`))

      let prices
      try {
        prices = await priceAPI.getNanoPrices()
        // update in redux
        dispatch(creators.updateNanoPrices(prices))
      } catch (e) {
        log.error('Error getting price', e)
      }

      // let ui know we're done
      dispatch(uiCreators.removeActiveProcess(`check-price-${time}`))
    }
  })
}
