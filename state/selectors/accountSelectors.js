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

export const getDidGetChainForAnyAccount = createSelector(
  getAccounts,
  accounts => {
    const accountsWithChains = accounts.allIds.filter(
      acc => accounts.byId[acc].didGetChain
    )
    return accountsWithChains.length > 0
  }
)
