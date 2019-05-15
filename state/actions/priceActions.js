// @flow
import type { UpdateNanoPricesAction } from '~/types/reduxTypes'

const actions = {
  UPDATE_NANO_PRICES: 'PRICE::UPDATE_NANO_PRICES'
}

type Creators = {
  updateNanoPrices: Object => UpdateNanoPricesAction
}

const creators: Creators = {
  updateNanoPrices: payload => ({
    type: actions.UPDATE_NANO_PRICES,
    payload
  })
}

export { actions, creators }
