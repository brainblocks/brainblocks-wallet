// @flow
import { createSelector } from 'redux-orm'
import orm from '~/state/models'

export const getCurrentAuth = createSelector(
  orm,
  state => state.orm,
  ({ Auth }) => Auth.withId('me')
)
