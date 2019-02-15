// @flow
import { attr, fk, Model } from 'redux-orm'
import User from './User'
import { actions } from '~/state/actions/authActions'

export default class Auth extends Model {
  static get modelName() {
    return 'Auth'
  }

  static get fields() {
    return {
      id: attr(),
      token: attr(),
      expires: attr(),
      isAuthorized: attr(),
      didCheck: attr(),
      isChecking: attr(),
      user: fk(User.modelName),
      password: attr()
    }
  }

  static reducer(action, Auth, session) {
    const { User } = session
    const auth = Auth.withId('me') || Auth.create({ id: 'me' })

    switch (action.type) {
      case actions.SET_IS_CHECKING:
        auth.update({
          isChecking: action.payload
        })
        break

      case actions.DID_CHECK:
        auth.update({ didCheck: true })
        break

      case actions.UPDATE:
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
      case actions.LOGOUT:
        auth.update({
          isAuthorized: false,
          token: undefined,
          user: undefined
        })
        break

      case actions.STORE_USER_PASSWORD:
        auth.update({
          password: action.password
        })
        break

      case actions.DELETE_USER_PASSWORD:
        auth.update({
          password: undefined
        })
        break
    }

    return undefined
  }
}
