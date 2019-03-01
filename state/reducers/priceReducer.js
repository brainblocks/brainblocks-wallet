import { actions } from '~/state/actions/priceActions'

export const priceInitialState = {
  nano: {}
}

const priceReducer = (state, action) => {
  if (typeof state === 'undefined') {
    return priceInitialState
  }

  switch (action.type) {
    case actions.UPDATE_NANO_PRICES:
      return {
        ...state,
        nano: action.payload
      }
    default:
      return state
  }
}

export default priceReducer
