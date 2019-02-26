// @flow
import { createSelector } from 'reselect'

/*
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
*/

const accountsSelector = state => state.accounts

export const getAccounts = createSelector(
  accountsSelector,
  accounts => accounts
)

export const getTotalBalance = createSelector(getAccounts, accounts => {
  let balance = 0
  accounts.allIds.map(
    accId => (balance += parseFloat(accounts.byId[accId].balance))
  )
  return balance
})
