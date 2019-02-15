// @flow
import { createSelector } from 'redux-orm'
import orm from '~/state/models'
import { getCurrentUser } from '~/state/selectors/userSelectors'

export const getWallet = createSelector(
  orm,
  session => session.orm,
  getCurrentUser,
  (orm, currentUser) => orm.Wallet.withId(currentUser._fields.wallet)
)
