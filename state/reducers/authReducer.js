import { actions } from '~/state/actions/authActions'
import { actions as userActions } from '~/state/actions/userActions'
import produce from 'immer'

export const authInitialState = {
  token: undefined,
  expires: undefined,
  isAuthorized: false,
  didCheck: false,
  isChecking: false,
  user: undefined,
  password: undefined
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
        const { user, token, expires } = action.payload
        draft = {
          token,
          expires,
          user: user.id,
          isChecking: false,
          isAuthorized: true,
          didCheck: true
        }
        break

      // Assume that logout will work for immediate response
      case actions.LOGOUT:
        draft.isAuthorized = false
        draft.token = undefined
        draft.user = undefined
        break

      case actions.STORE_USER_PASSWORD:
        auth.password = action.password
        break

      case actions.DELETE_USER_PASSWORD:
        draft.password = undefined
        break

      case userActions.UPDATE_AUTHORIZED_USER:
        console.log('Payload: ', action.payload)
        draft.user = payload.id
        break
    }
    return draft
  })
}

export default authReducer
