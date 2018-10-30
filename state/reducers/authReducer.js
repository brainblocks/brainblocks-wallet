// @flow
import orm from '~/state/models'
import {
  AUTH_LOGIN_START,
  AUTH_LOGIN_COMPLETE,
  AUTH_LOGIN_SUCCESS,
  AUTH_INIT_START,
  AUTH_INIT_COMPLETE,
  AUTH_INIT_SUCCESS,
  AUTH_INIT_FAILURE,
  AUTH_LOGOUT_START,
  AUTH_LOGOUT_SUCCESS
} from '~/state/actions/authActions'

export default (state = orm.getEmptyState(), action) => {
  const session = orm.session(state)
  const { Auth, User } = session
  const auth = Auth.withId('me') || Auth.create({ id: 'me' })

  switch (action.type) {
    case AUTH_INIT_START:
    case AUTH_LOGIN_START:
      auth.update({
        isChecking: true,
        user: undefined
      })
      break

    case AUTH_INIT_SUCCESS:
    case AUTH_LOGIN_SUCCESS:
      const { user, authToken, expires } = action.payload

      auth.update({
        authToken,
        expires,
        user: User.create(user),
        isChecking: false,
        isAuthorized: true,
        didCheck: true
      })
      break

    case AUTH_INIT_COMPLETE:
    case AUTH_LOGIN_COMPLETE:
      auth.update({
        isChecking: true,
        didCheck: true
      })
      break

    // Assume that logout will work for immediate response
    case AUTH_LOGOUT_START:
      auth.update({
        isAuthorized: false
      })
      break

    case AUTH_LOGOUT_SUCCESS:
      auth.update({
        authToken: undefined,
        user: undefined
      })
      break
  }

  return session.state
}