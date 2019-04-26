import { combineReducers } from 'redux'
import uiReducer, { uiInitialState } from '~/state/reducers/uiReducer'
import priceReducer, { priceInitialState } from '~/state/reducers/priceReducer'
import userReducer, { userInitialState } from '~/state/reducers/userReducer'
import authReducer, { authInitialState } from '~/state/reducers/authReducer'
import vaultReducer, { vaultInitialState } from '~/state/reducers/vaultReducer'
import accountsReducer, {
  accountsInitialState
} from '~/state/reducers/accountsReducer'
import transactionsReducer, {
  transactionsInitialState
} from '~/state/reducers/transactionsReducer'

export const initialState = {
  ui: uiInitialState,
  price: priceInitialState,
  user: userInitialState,
  auth: authInitialState,
  accounts: accountsInitialState,
  transactions: transactionsInitialState,
  vault: vaultInitialState
}

const combinedReducers = combineReducers({
  ui: uiReducer,
  price: priceReducer,
  user: userReducer,
  auth: authReducer,
  accounts: accountsReducer,
  transactions: transactionsReducer,
  vault: vaultReducer
})

export default combinedReducers
