import orm from '~/state/models'
import { combineReducers } from 'redux'
import { createReducer } from 'redux-orm'
import { reducer as formReducer } from 'redux-form'

import authReducer from './authReducer'
import { produce } from 'immer'
export const ormReducer = createReducer(orm)

const initialState = {
  form: {},
  orm: orm.getEmptyState(),
  errors: {
    login: undefined
  }
}

export default function rootReducer(state = initialState, action) {
  return produce(state, draft => {
    draft.orm = ormReducer(draft.orm, action)
    draft.form = formReducer(draft.form, action)
    draft = authReducer(draft, action)
  })

  return state
}
