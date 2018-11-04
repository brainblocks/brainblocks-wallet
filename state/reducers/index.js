import orm from '~/state/models'
import { combineReducers } from 'redux'
import { createReducer } from 'redux-orm'
import { reducer as formReducer } from 'redux-form'

import authReducer from './authReducer'
import userReducer from './userReducer'
import { produce } from 'immer'
export const ormReducer = createReducer(orm)

// TODO: Consider moving this in to it's own file since it'll most likely get very large
const initialState = {
  form: {},
  orm: orm.getEmptyState(),
  errors: {
    login: undefined,
    register: undefined
  },
  ui: {
    login: {
      isLoggingIn: false
    },
    register: {
      isRegistering: false
    }
  }
}

export default function rootReducer(state = initialState, action) {
  return produce(state, draft => {
    // Run through the namespaced reducers
    draft.orm = ormReducer(draft.orm, action)
    draft.form = formReducer(draft.form, action)

    // Run through the global reducers with the draft and the orm session passed in for performance
    const ormSession = orm.session(state.orm)

    // these reducers are allowed to update the state without immutability
    // because the root reducer does so for them, the should directly update
    // the draft
    authReducer(draft, action, ormSession)
    userReducer(draft, action, ormSession)

    draft.orm = ormSession.state
  })
}
