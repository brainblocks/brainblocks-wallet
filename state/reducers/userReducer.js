// @flow
import { actions } from '~/state/actions/userActions'
import { actions as authActions } from '~/state/actions/authActions'
import produce from 'immer'
import type { UserState, ReduxAction } from '~/types/reduxTypes'

export const userInitialState: UserState = {
  id: '',
  firstName: '',
  lastName: '',
  username: '',
  preferredCurrency: '',
  email: '',
  birthday: '',
  hasVerifiedEmail: false,
  defaultAccount: '',
  is2FAEnabled: false,
  ipAuthEnabled: false
}

const userReducer: (state: ?UserState, action: ReduxAction) => ?UserState = (
  state,
  action
) => {
  if (typeof state === 'undefined' || action.type === authActions.LOGOUT) {
    return userInitialState
  }

  return produce(state, draft => {
    switch (action.type) {
      case actions.UPDATE:
        draft = { ...draft, ...action.payload }
        break

      case authActions.UPDATE:
        draft = { ...draft, ...action.payload.user }
        break
    }
    return draft
  })
}

export default userReducer
