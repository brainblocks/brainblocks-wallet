// @flow
import orm from '~/state/models'
import produce from 'immer'
import {
  AUTH_SET_IS_CHECKING,
  AUTH_DID_CHECK,
  AUTH_UPDATE,
  AUTH_LOGOUT
} from '~/state/actions/authActions'

export default (draftState, action, ormSession) => {
  const { Auth, User } = ormSession
  const auth = Auth.withId('me') || Auth.create({ id: 'me' })

  switch (action.type) {
    case AUTH_SET_IS_CHECKING:
      auth.update({
        isChecking: action.payload
      })
      break

    case AUTH_DID_CHECK:
      auth.update({ didCheck: true })
      break

    case AUTH_UPDATE:
      const { user, token, expires } = action.payload

      auth.update({
        token,
        expires,
        user: User.create(user),
        isChecking: false,
        isAuthorized: true,
        didCheck: true
      })

      break

    // Assume that logout will work for immediate response
    case AUTH_LOGOUT:
      auth.update({
        isAuthorized: false,
        token: undefined,
        user: undefined
      })
      break
  }
}
