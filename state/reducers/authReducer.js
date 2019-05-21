// @flow
import { actions } from '~/state/actions/authActions'
import type { AuthState, ReduxAction } from '~/types/reduxTypes'

export const authInitialState: AuthState = {
  token: undefined,
  expires: undefined,
  isAuthorized: false,
  isRegistering: false,
  didCheck: false,
  isChecking: false,
  user: undefined
}

const authReducer: (state: AuthState, action: ReduxAction) => AuthState = (
  state,
  action
) => {
  if (typeof state === 'undefined') {
    return authInitialState
  }

  switch (action.type) {
    case actions.UPDATE: {
      var payload = { ...action.payload }
      // delete anything from payload here
      const auth = {
        ...state,
        ...payload,
        isChecking: false,
        isAuthorized: true,
        didCheck: true
      }

      if (payload.hasOwnProperty('user')) {
        auth.user = payload.user.id
      }
      return auth
    }
    // Assume that logout will work for immediate response
    case actions.LOGOUT:
      return authInitialState

    default:
      return state
  }
}

export default authReducer
