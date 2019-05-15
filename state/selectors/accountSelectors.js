// @flow
import { createSelector } from 'reselect'
import type { AccountsState, ReduxState } from '~/types/reduxTypes'

const accountsSelector = state => state.accounts

export const getAccounts: ReduxState => AccountsState = createSelector(
  accountsSelector,
  accounts => accounts
)

export const getTotalBalance: ReduxState => number = createSelector(
  getAccounts,
  accounts => {
    let balance = 0
    accounts.allIds.map(
      accId => (balance += parseFloat(accounts.byId[accId].balance))
    )
    return balance
  }
)

export const getDidGetChainForAnyAccount: ReduxState => boolean = createSelector(
  getAccounts,
  accounts => {
    const accountsWithChains = accounts.allIds.filter(
      acc => accounts.byId[acc].didGetChain
    )
    return accountsWithChains.length > 0
  }
)
