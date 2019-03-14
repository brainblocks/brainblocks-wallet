// @flow
import { createSelector } from 'reselect'

const accountsSelector = state => state.accounts

export const getAccounts = createSelector(
  accountsSelector,
  accounts => accounts
)

export const getTotalBalance = createSelector(
  getAccounts,
  accounts => {
    let balance = 0
    accounts.allIds.map(
      accId => (balance += parseFloat(accounts.byId[accId].balance))
    )
    return balance
  }
)
