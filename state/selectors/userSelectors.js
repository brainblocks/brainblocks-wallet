// @flow
import { createSelector } from 'redux-orm'
import orm from '~/state/models'
import { getCurrentAuth } from '~/state/selectors/authSelectors'

export const getCurrentUser = createSelector(
  orm,
  session => session.orm,
  getCurrentAuth,
  (orm, currentAuth) => orm.User.withId(currentAuth._fields.user)
)
