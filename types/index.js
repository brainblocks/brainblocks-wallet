// @flow

export type ClassName = string | Array<string | Object> | Object

export type NormalizedState = { allIds: Array<string>, byId: Object }

export type NextJSContext = {
  pathName?: string,
  query?: Object,
  asPath?: string,
  req?: Object,
  res?: Object,
  err?: Object,
  reduxStore?: ReduxStore
}

export type ReduxStore = {
  dispatch: Function => mixed,
  getState: () => Object
}

export type NanoTransactionRedux = {
  currency: 'nano',
  balanceNano?: number,
  id: string,
  accountId: string,
  timestamp: number,
  amountNano: number,
  type: 'open' | 'receive' | 'send' | 'change',
  isState: boolean,
  linkAddress: string, // link_as_account
  status: 'local' | 'pending' | 'confirmed',
  note?: string
}
