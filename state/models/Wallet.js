// @flow
import { attr, many, Model } from 'redux-orm'
import { actions } from '~/state/actions/walletActions'

export default class Wallet extends Model {
  static get modelName() {
    return 'Wallet'
  }

  static get fields() {
    return {
      seed: attr(),
      lastIndex: attr(),
      vaults: many('Vault')
    }
  }

  static reducer(action, Wallet, session) {
    switch (action.type) {
      case actions.CREATE_WALLET:
        Wallet.create(action.payload)
        break
      case actions.UPDATE_WALLET:
        break
    }

    return undefined
  }
}
