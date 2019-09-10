// @flow
import { combineReducers } from 'redux'
import uiReducer, { uiInitialState } from '~/state/reducers/uiReducer'
import priceReducer, { priceInitialState } from '~/state/reducers/priceReducer'
import tradeReducer, { tradeInitialState } from '~/state/reducers/tradeReducer'
import userReducer, { userInitialState } from '~/state/reducers/userReducer'
import authReducer, { authInitialState } from '~/state/reducers/authReducer'
import vaultReducer, { vaultInitialState } from '~/state/reducers/vaultReducer'
import accountsReducer, {
  accountsInitialState
} from '~/state/reducers/accountsReducer'
import transactionsReducer, {
  transactionsInitialState
} from '~/state/reducers/transactionsReducer'
import type { ReduxState } from '~/types/reduxTypes'

export const initialState: ReduxState = {
  ui: uiInitialState,
  price: priceInitialState,
  trade: tradeInitialState,
  user: userInitialState,
  auth: authInitialState,
  accounts: accountsInitialState,
  transactions: transactionsInitialState,
  vault: vaultInitialState
}

const combinedReducers = combineReducers({
  ui: uiReducer,
  price: priceReducer,
  trade: tradeReducer,
  user: userReducer,
  auth: authReducer,
  accounts: accountsReducer,
  transactions: transactionsReducer,
  vault: vaultReducer
})

export default combinedReducers
