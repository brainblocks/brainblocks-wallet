// @flow
import { createSelector } from 'redux-orm'
import orm from '~/state/models'

export const authSelector = createSelector(
	orm,
	state => state,
	({ Auth }) => Auth.withId('me')
)
