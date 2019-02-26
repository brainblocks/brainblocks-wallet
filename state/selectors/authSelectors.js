// @flow
import { createSelector } from 'reselect'

const authSelector = state => state.auth

export const getCurrentAuth = createSelector(authSelector, auth => auth)
