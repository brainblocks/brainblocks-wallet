// @flow
import { actions } from '~/state/actions/vaultActions'
import { actions as authActions } from '~/state/actions/authActions'
import produce from 'immer'
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

  return produce(state, draft => {
    switch (action.type) {
      case actions.UPDATE:
        draft = { ...draft, ...action.payload }
        break

      case authActions.UPDATE:
        if (
          action.payload.hasOwnProperty('user') &&
          action.payload.user.hasOwnProperty('vault') &&
          action.payload.user.vault &&
          action.payload.user.vault.hasOwnProperty('wallet')
        ) {
          draft = { ...draft, ...action.payload.user.vault }
        }
        break
    }
    return draft
  })
}

export default vaultReducer
