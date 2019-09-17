// @flow
import type { TradeStatus } from '~/types/apiTypes'

export type Dispatch = (
  action: ReduxAction | ThunkAction | PromiseAction
) => any
export type GetState = () => ReduxState
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any
export type PromiseAction = Promise<ReduxAction>

export type ReduxState = {
  +ui: UIState,
  +price: PriceState,
  +user: UserState,
  +auth: AuthState,
  +accounts: AccountsState,
  +transactions: TransactionsState,
  +vault: VaultState
}

export type ReduxAction =
  | AccountsAction
  | AuthAction
  | PriceAction
  | TradeAction
  | TradesAction
  | TransactionAction
  | UIAction
  | UserAction
  | VaultAction

export type ReduxStore = {
  dispatch: Dispatch,
  getState: GetState
}

// User ===
// state
export type UserState = {
  +id: string,
  +firstName: string,
  +lastName: string,
  +username: string,
  +preferredCurrency: string,
  +email: string,
  +birthday: string,
  +hasVerifiedEmail: boolean,
  +defaultAccount: string,
  +is2FAEnabled: boolean
}
// actions
export type UpdateUserAction = {
  type: 'USER::UPDATE',
  payload: Object
}
export type UserAction = UpdateUserAction

// Transactions ===
// state
export type TransactionsState = {
  +allIds: Array<string>,
  +byId: { [string]: ReduxTransaction }
}
export type ReduxNanoTransactionsObject = { [string]: ReduxNanoTransaction }
export type ReduxTransaction = ReduxNanoTransaction
export type ReduxNanoTransaction = {
  +currency: 'nano',
  +balanceNano?: number,
  +id: string,
  +accountId: string,
  +timestamp: number,
  +amountNano: number,
  +height: number,
  +type: 'open' | 'receive' | 'send' | 'change',
  +isState: boolean,
  +linkAddress: string, // link_as_account
  +status: 'local' | 'pending' | 'confirmed',
  +note?: string
}
export type MutableReduxNanoTransaction = {
  currency: 'nano',
  balanceNano?: number,
  id: string,
  accountId: string,
  timestamp: number,
  amountNano: number,
  height: number,
  type: 'open' | 'receive' | 'send' | 'change',
  isState: boolean,
  linkAddress: string, // link_as_account
  status: 'local' | 'pending' | 'confirmed',
  note?: string
}
// actions
export type BulkAddTransactionsAction = {
  type: 'TRANSACTIONS::BULK_ADD',
  payload: { [string]: ReduxTransaction }
}
export type CreateTransactionAction = {
  type: 'TRANSACTIONS::CREATE',
  payload: ReduxTransaction
}
export type UpdateTransactionAction = {
  type: 'TRANSACTIONS::UPDATE',
  payload: Object
}
export type TransactionAction =
  | BulkAddTransactionsAction
  | CreateTransactionAction
  | UpdateTransactionAction

// Accounts ===
// state
export type AccountsState = {
  +allIds: Array<string>,
  +byId: { [string]: ReduxAccount }
}
export type ReduxAccount = {
  +account: string,
  +label: string,
  +lastHash: string,
  +balance: number,
  +pendingBalance: number,
  +type: string,
  +color: string,
  +didGetChain: boolean,
  +representative: string
}
// actions
export type BulkAddAccountsAction = {
  type: 'ACCOUNTS::BULK_ADD_ACCOUNTS',
  payload: Array<ReduxAccount>
}
export type CreateAccountAction = {
  type: 'ACCOUNTS::CREATE_ACCOUNT',
  payload: ReduxAccount
}
export type UpdateAccountAction = {
  type: 'ACCOUNTS::UPDATE_ACCOUNT',
  payload: Object
}
export type BulkUpdateAccountsAction = {
  type: 'ACCOUNTS::BULK_UPDATE_ACCOUNTS',
  payload: Array<ReduxAccount>
}
export type DeleteAccountAction = {
  type: 'ACCOUNTS::DELETE_ACCOUNT',
  accountId: string
}
export type AccountsAction =
  | BulkAddAccountsAction
  | CreateAccountAction
  | UpdateAccountAction
  | BulkUpdateAccountsAction
  | DeleteAccountAction

// Auth ===
// state
export type AuthState = {
  +token: ?string,
  +expires: ?string,
  +isAuthorized: boolean,
  +isRegistering: boolean,
  +didCheck: boolean,
  +isChecking: boolean,
  +user: ?string
}
// actions
export type UpdateAuthAction = {
  type: 'AUTH::UPDATE',
  payload: Object
}
export type LogoutAction = {
  type: 'AUTH::LOGOUT'
}
export type AuthAction = UpdateAuthAction | LogoutAction

// Prices ===
// state
export type PriceState = {
  nano: Object
}
// actions
export type UpdateNanoPricesAction = {
  type: 'PRICE::UPDATE_NANO_PRICES',
  payload: Object
}
export type PriceAction = UpdateNanoPricesAction

// Trades ===

// state
export type Trade = {
  +id: string,
  +status: TradeStatus,
  +payinAddress: string,
  +payoutAddress: string,
  +fromCurrency: string,
  +toCurrency: string,
  +refundAddress: string,
  +updatedAt: number,
  +expectedSendAmount: number,
  +expectedReceiveAmount: number,
  +createdAt: number
}
export type TradesState = {
  +allIds: Array<string>,
  +byId: { [string]: Trade },
  +didGetTrades: boolean
}
// actions
export type BulkAddTradesAction = {
  type: 'TRADES::BULK_ADD',
  payload: Array<Trade>
}
export type UpsertTradeAction = {
  type: 'TRADES::UPSERT',
  payload: Trade
}
export type TradesAction = BulkAddTradesAction | UpsertTradeAction

// Trade ===
// state
export type CurrentSell = {
  buyCurrency: string,
  fromAcc: string,
  sellAmount: number,
  receiveAddr: string,
  extraId: ?string
}
export type CurrentBuy = {
  sellCurrency: string,
  sellAmount: number,
  receiveAcc: string,
  refundAddr: string
}
export type TradeQuote = {
  amount: number,
  fromCurrency: string,
  id: string,
  payinAddress: string,
  payoutAddress: string,
  payoutExtraId: ?string,
  refundAddress: string,
  toCurrency: string
}
export type TradeState = {
  nanoPairs: Array<Object>,
  currentSell: CurrentSell,
  currentBuy: CurrentBuy,
  sellQuote: ?TradeQuote,
  buyQuote: ?TradeQuote
}
export type UpdateNanoPairsAction = {
  type: 'TRADE::UPDATE_NANO_PAIRS',
  payload: Object
}
export type SetCurrentSellAction = {
  type: 'TRADE::SET_CURRENT_SELL',
  payload: CurrentSell
}
export type SetCurrentBuyAction = {
  type: 'TRADE::SET_CURRENT_BUY',
  payload: CurrentBuy
}
export type SetSellQuoteAction = {
  type: 'TRADE::SET_SELL_QUOTE',
  payload: ?TradeQuote
}
export type SetBuyQuoteAction = {
  type: 'TRADE::SET_BUY_QUOTE',
  payload: ?TradeQuote
}
export type TradeAction =
  | UpdateNanoPairsAction
  | SetCurrentSellAction
  | SetCurrentBuyAction
  | SetBuyQuoteAction
  | SetSellQuoteAction

// UI ===
// state
export type UIState = {
  activeProcesses: string[],
  txStartIndex: number,
  txEndIndex: number,
  dashboardAccount: string
}
// actions
export type AddActiveProcessAction = {
  type: 'UI::ADD_ACTIVE_PROCESS',
  processId: string
}
export type RemoveActiveProcessAction = {
  type: 'UI::REMOVE_ACTIVE_PROCESS',
  processId: string
}
export type TxPagingResetAction = {
  type: 'UI::TRANSACTIONS_PAGING_RESET'
}
export type TxPagingSetAction = {
  type: 'UI::TRANSACTIONS_PAGING_SET',
  startIndex: number,
  endIndex: number
}
export type UpdateDashboardAccountAction = {
  type: 'UI::UPDATE_DASHBOARD_ACCOUNT',
  payload: string
}
export type UIAction =
  | AddActiveProcessAction
  | RemoveActiveProcessAction
  | TxPagingResetAction
  | TxPagingSetAction
  | UpdateDashboardAccountAction

// Vault ===
// state
export type VaultState = {
  +identifier: string,
  +wallet: string
}
// actions
export type UpdateVaultAction = {
  type: 'VAULT::UPDATE',
  payload: Object
}
export type VaultAction = UpdateVaultAction
