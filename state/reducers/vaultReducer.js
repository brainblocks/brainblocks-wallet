// @flow
import { actions } from '~/state/actions/vaultActions'
import { actions as authActions } from '~/state/actions/authActions'
import type { VaultState, ReduxAction } from '~/types/reduxTypes'

export const vaultInitialState: VaultState = {
  identifier: '',
  wallet: ''
}

const vaultReducer: (state: ?VaultState, action: ReduxAction) => ?VaultState = (
  state,
  action
) => {
  if (typeof state === 'undefined' || action.type === authActions.LOGOUT) {
    return vaultInitialState
  }

  switch (action.type) {
    case actions.UPDATE:
      return { ...state, ...action.payload }

    case authActions.UPDATE:
      if (
        action.payload.hasOwnProperty('user') &&
        action.payload.user.hasOwnProperty('vault') &&
        action.payload.user.vault &&
        action.payload.user.vault.hasOwnProperty('wallet')
      ) {
        return { ...state, ...action.payload.user.vault }
      } else {
        return state
      }

    default:
      return state
  }
}

export default vaultReducer
