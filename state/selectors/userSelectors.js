// @flow
import { createSelector } from 'reselect'

const userSelector = state => state.user

export const getCurrentUser = createSelector(userSelector, user => user)
