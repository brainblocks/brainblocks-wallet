// @flow
import { actions } from '~/state/actions/authActions'
import produce from 'immer'
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

  return produce(state, draft => {
    switch (action.type) {
      case actions.UPDATE:
        var payload = { ...action.payload }
        // delete anything from payload here
        draft = {
          ...draft,
          ...payload,
          isChecking: false,
          isAuthorized: true,
          didCheck: true
        }

        if (payload.hasOwnProperty('user')) {
          draft.user = payload.user.id
        }
        break

      // Assume that logout will work for immediate response
      case actions.LOGOUT:
        draft = authInitialState
        break
    }
    return draft
  })
}

export default authReducer
