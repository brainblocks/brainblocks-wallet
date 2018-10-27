// @flow
import { createSelector } from 'redux-orm'
import orm from '~/state/models'

export const currentAuthSelector = createSelector(
	orm,
	state => state,
	({ Auth }) => Auth.withId('me')
)
