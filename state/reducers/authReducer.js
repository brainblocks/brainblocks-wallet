import { actions } from '~/state/actions/authActions'
import { actions as userActions } from '~/state/actions/userActions'
import produce from 'immer'

export const authInitialState = {
  token: undefined,
  expires: undefined,
  isAuthorized: false,
  isRegistering: false,
  didCheck: false,
  isChecking: false,
  user: undefined
}

const authReducer = (state, action) => {
  if (typeof state === 'undefined') {
    return authInitialState
  }

  return produce(state, draft => {
    switch (action.type) {
      case actions.SET_IS_CHECKING:
        draft.isChecking = action.payload
        break

      case actions.DID_CHECK:
        draft.didCheck = true
        break

      case actions.UPDATE:
        const payload = { ...action.payload }
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

      case userActions.UPDATE_AUTHORIZED_USER:
        draft.user = payload.id
        break
    }
    return draft
  })
}

export default authReducer
