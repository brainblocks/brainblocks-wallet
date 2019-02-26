// @flow
import { attr, many, Model } from 'redux-orm'
import { actions } from '~/state/actions/accountActions'

export default class Account extends Model {
  static get modelName() {
    return 'Account'
  }

  static get fields() {
    return {
      account: attr(),
      label: attr(),
      lastHash: attr(),
      balance: attr(),
      pendingBalance: attr(),
      type: attr(),
      color: attr()
      //transactions: many('Transaction')
    }
  }

  static reducer(action, Account, session) {
    switch (action.type) {
      case actions.CREATE_ACCOUNT:
        const id = action.payload.hasOwnProperty('account')
          ? action.payload.account
          : null
        Account.create({ ...action.payload, id })
        break
      case actions.UPDATE_ACCOUNT:
        break
      case actions.DELETE_ACCOUNT:
        break
    }

    return undefined
  }
}
