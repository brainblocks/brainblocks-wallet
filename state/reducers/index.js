import orm from '~/state/models'
import { createReducer } from 'redux-orm'

import authReducer from './authReducer'
export const ormReducer = createReducer(orm)

export default function rootReducer(state = orm.getEmptyState(), action) {
	state = ormReducer(state, action)
	state = authReducer(state, action)
	return state
}
