// @flow
import { createSelector } from 'redux-orm'
import orm from '~/state/models'

export const getAccounts = createSelector(
  orm,
  session => session.orm,
  orm => orm.Account.all().toModelArray()
)

export const getTotalBalance = createSelector(
  orm,
  session => session.orm,
  orm => {
    let balance = 0
    orm.Account.all()
      .toModelArray()
      .map(acc => {
        const account = acc.ref
        balance += parseFloat(account.balance)
      })
    return balance
  }
)
