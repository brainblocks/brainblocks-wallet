// @flow
import { attr, Model } from 'redux-orm'

export default class User extends Model {
  static get modelName() {
    return 'User'
  }

  static get fields() {
    return {
      id: attr(),
      firstName: attr(),
      lastName: attr(),
      username: attr(),
      preferredCurrency: attr(),
      email: attr(),
      birthday: attr()
    }
  }
}
