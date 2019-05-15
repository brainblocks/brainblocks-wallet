// @flow
import { createSelector } from 'reselect'
import { getAccounts } from '~/state/selectors/accountSelectors'
import type { UserState, ReduxState } from '~/types/reduxTypes'

const userSelector = state => state.user

export const getCurrentUser: ReduxState => UserState = createSelector(
  userSelector,
  user => user
)

export const getUsername: ReduxState => string = createSelector(
  getCurrentUser,
  user => user.username
)

export const getPreferredCurrency: ReduxState => ?string = createSelector(
  getCurrentUser,
  user => user.preferredCurrency
)

export const getDefaultAccount: ReduxState => ?string = createSelector(
  getCurrentUser,
  getAccounts,
  (user, accounts) => {
    if (accounts.allIds.includes(user.defaultAccount)) {
      return user.defaultAccount
    }
    return null
  }
)
