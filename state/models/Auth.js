// @flow
import { attr, fk, Model } from 'redux-orm'
import User from './User'

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
      user: fk(User.modelName)
    }
  }
}
