import orm from '~/state/models'
import { createReducer } from 'redux-orm'
import { combineReducers } from 'redux'

import authReducer from './authReducer'
import { produce } from 'immer'
export const ormReducer = createReducer(orm)

const initialState = {
  orm: orm.getEmptyState(),
  form: {},
  errors: {
    login: undefined
  }
}

export default function rootReducer(state = initialState, action) {
  return produce(state, draft => {
    draft.orm = ormReducer(draft.orm, action)
    draft = authReducer(draft, action)
  })

  return state
}
