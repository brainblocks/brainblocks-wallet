// @flow
const actions = {
  UPDATE_NANO_PRICES: 'PRICE::UPDATE_NANO_PRICES'
}

const creators = {
  updateNanoPrices: payload => ({
    type: actions.UPDATE_NANO_PRICES,
    payload
  })
}

export { actions, creators }
