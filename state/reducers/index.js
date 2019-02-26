import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import uiReducer, { uiInitialState } from '~/state/reducers/uiReducer'
import userReducer, { userInitialState } from '~/state/reducers/userReducer'
import authReducer, { authInitialState } from '~/state/reducers/authReducer'
import accountsReducer, {
  accountsInitialState
} from '~/state/reducers/accountsReducer'

export const initialState = {
  form: {},
  ui: uiInitialState,
  user: userInitialState,
  auth: authInitialState,
  accounts: accountsInitialState
}

const combinedReducers = combineReducers({
  form: formReducer,
  ui: uiReducer,
  user: userReducer,
  auth: authReducer,
  accounts: accountsReducer
})

export default combinedReducers
