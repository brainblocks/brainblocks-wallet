// @flow
import { createSelector } from 'reselect'
import type { AuthState, ReduxState } from '~/types/reduxTypes'

const authSelector = state => state.auth

export const getCurrentAuth: ReduxState => AuthState = createSelector(
  authSelector,
  auth => auth
)

export const getIsAuthorized: ReduxState => boolean = createSelector(
  getCurrentAuth,
  auth => auth.isAuthorized || false
)
