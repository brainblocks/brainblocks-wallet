import { creators } from '~/state/actions/priceActions'
import { creators as uiCreators } from '~/state/actions/uiActions'
import * as priceAPI from '~/state/api/price'

export const updatePrice = (focusCheck = true) => (dispatch, getState) => {
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
      } catch (e) {
        console.error('Error getting price', e)
      }

      // update in redux
      dispatch(creators.updateNanoPrices(prices))

      // let ui know we're done
      dispatch(uiCreators.removeActiveProcess(`check-price-${time}`))
    }
  })
}
