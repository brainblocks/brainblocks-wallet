// @flow
import { createSelector } from 'reselect'

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
  user => user.defaultAccount
)
