import orm from '~/state/models'
import { createReducer } from 'redux-orm'
import { combineReducers } from 'redux'

import authReducer from './authReducer'
export const ormReducer = createReducer(orm)

const initialState = {
  orm: orm.getEmptyState(),
  errors: {},
  form: {}
}

export default function rootReducer(state = initialState, action) {
  state.orm = ormReducer(state.orm, action)
  state = authReducer(state, action)
  return state
}
