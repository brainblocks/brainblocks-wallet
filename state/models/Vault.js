// @flow
import { attr, many, Model } from 'redux-orm'
import { actions } from '~/state/actions/vaultActions'

export default class Vault extends Model {
  static get modelName() {
    return 'Vault'
  }

  static get fields() {
    return {
      account: attr(),
      label: attr(),
      lastHash: attr(),
      balance: attr(),
      pendingBalance: attr(),
      type: attr()
      //transactions: many('Transaction')
    }
  }

  static reducer(action, Vault, session) {
    switch (action.type) {
      case actions.CREATE_VAULT:
        console.log(action)
        Vault.create(action.payload)
        break
      case actions.UPDATE_VAULT:
        break
      case actions.DELETE_VAULT:
        break
    }

    return undefined
  }
}
