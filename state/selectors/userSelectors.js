// @flow
import { createSelector } from 'reselect'
import { getAccounts } from '~/state/selectors/accountSelectors'

const userSelector = state => state.user

export const getCurrentUser = createSelector(
  userSelector,
  user => user
)

export const getPreferredCurrency = createSelector(
  getCurrentUser,
  user => user.preferredCurrency
)

export const getDefaultAccount = createSelector(
  getCurrentUser,
  getAccounts,
  (user, accounts) => {
    if (accounts.allIds.includes(user.defaultAccount)) {
      return user.defaultAccount
    }
    return null
  }
)
