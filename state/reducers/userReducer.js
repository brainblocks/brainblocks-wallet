// @flow
import { actions } from '~/state/actions/userActions'
import { actions as authActions } from '~/state/actions/authActions'
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
  is2FAEnabled: false
}

const userReducer: (state: ?UserState, action: ReduxAction) => ?UserState = (
  state,
  action
) => {
  if (typeof state === 'undefined' || action.type === authActions.LOGOUT) {
    return userInitialState
  }

  switch (action.type) {
    case actions.UPDATE:
      return { ...state, ...action.payload }

    case authActions.UPDATE:
      return { ...state, ...action.payload.user }

    default:
      return state
  }
}

export default userReducer
