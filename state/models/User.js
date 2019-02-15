// @flow
import { attr, fk, Model } from 'redux-orm'
import Wallet from './Wallet'
import { actions } from '~/state/actions/userActions'

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
      birthday: attr(),
      hasVerifiedEmail: attr(),
      wallet: fk(Wallet.modelName)
    }
  }

  static reducer(action, User, session) {
    const { Auth } = session
    const auth = Auth.withId('me') || Auth.create({ id: 'me' })

    switch (action.type) {
      case actions.UPDATE_AUTHORIZED_USER:
        auth.update({
          user: auth.user
            ? auth.user.update(action.payload)
            : User.create(action.payload)
        })
        break
    }

    return undefined
  }
}
