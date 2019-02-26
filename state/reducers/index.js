import orm from '~/state/models'
import { createReducer } from 'redux-orm'
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import uiReducer, { uiInitialState } from '~/state/reducers/uiReducer'

// TODO: Consider moving this in to it's own file since it'll most likely get very large
const emptyORMState = orm.getEmptyState()
export const initialState = {
  form: {},
  orm: emptyORMState,
  ui: uiInitialState
}

const ormReducer = createReducer(orm)
const combinedReducers = combineReducers({
  form: formReducer,
  orm: ormReducer,
  ui: uiReducer
})

export default combinedReducers

/*
export default function rootReducer(state = initialState, action) {
  return produce(state, draft => {
    // Run through the namespaced reducers
    draft.orm = ormReducer(draft.orm, action)
    draft.form = formReducer(draft.form, action)
    draft.vaults = vaultsReducer(draft.vaults, action)

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
*/
