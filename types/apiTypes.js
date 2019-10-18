// @flow

export type APIBlock = {
  amount: string,
  balance: string,
  block_account: string,
  contents: string,
  height: string,
  local_timestamp: string,
  origin: string,
  source_account: string
}

export type APIAccountsObject = {
  [string]: {
    balance: string,
    blocks: Array<APIBlock>,
    pending: string
  }
}

export type WebsocketReceiveBlock = {
  amount: string,
  from: string,
  hash: string
}

export type WebsocketReceiveAccountsObject = {
  [string]: {
    account: string,
    blocks: Array<WebsocketReceiveBlock>
  }
}

export type TradeStatus =
  | 'new'
  | 'waiting'
  | 'confirming'
  | 'exchanging'
  | 'sending'
  | 'finished'
  | 'failed'
  | 'refunded'
  | 'expired'

export type APITrade = {
  status: TradeStatus,
  payinAddress: string,
  payoutAddress: string,
  fromCurrency: string,
  toCurrency: string,
  refundAddress: string,
  id: string,
  updatedAt: string,
  createdAt: string,
  expectedSendAmount?: number,
  expectedReceiveAmount?: number,
  amountSend?: number,
  amountReceive?: number,
  depositReceivedAt?: string,
  payinExtraId?: string,
  payinExtraIdName?: string,
  payinHash?: string,
  payoutHash?: string
}

/* Example trade objects */
/*
const exampleSending = {
  status: 'sending',
  payinHash: 'ххх',
  payinAddress: 'yyy',
  payoutAddress: 'ccc',
  fromCurrency: 'link',
  toCurrency: 'xmr',
  amountSend: 5000,
  amountReceive: 109.163978629987,
  refundAddress: 'ooo',
  id: 'zzz',
  updatedAt: '2019-09-19T12:06:07.221Z',
  expectedSendAmount: 5000,
  expectedReceiveAmount: 111.6095224,
  createdAt: '2019-09-19T11:55:42.837Z',
  isPartner: true,
  depositReceivedAt: '2019-09-19T12:06:07.241Z'
}
const exampleFinished = {
  status: 'finished',
  payinHash: 'xxx',
  payoutHash: 'yyy',
  payinAddress: 'ooo',
  payoutAddress: 'zzz',
  fromCurrency: 'zec',
  toCurrency: 'link',
  amountSend: 1.15,
  amountReceive: 29.731006,
  refundAddress: 'zzz',
  id: 'zzz',
  updatedAt: '2019-09-19T12:25:57.884Z',
  createdAt: '2019-09-19T12:16:48.526Z',
  expectedReceiveAmount: 30.0570923,
  tokensAmount: 27.355,
  isPartner: false
}
const exampleFailed = {
  status: 'failed',
  payinHash: 'xxx',
  payinAddress: 'yyy',
  payoutAddress: 'ooo',
  fromCurrency: 'zec',
  toCurrency: 'eth',
  amountSend: 1.25,
  refundAddress: 'zzz',
  id: 'zzz',
  updatedAt: '2019-09-19T12:23:47.818Z',
  expectedSendAmount: 1.25,
  expectedReceiveAmount: 0.2891696,
  createdAt: '2019-09-19T12:17:29.245Z',
  isPartner: false,
  depositReceivedAt: '2019-09-19T12:23:47.838Z'
}
const exampleConfirming = {
  status: 'confirming',
  payinHash: 'xxx',
  payinAddress: 'yyy',
  payoutAddress: 'ooo',
  fromCurrency: 'btg',
  toCurrency: 'ltc',
  amountSend: 17.8,
  id: '056dd37aa5bf2e',
  updatedAt: '2019-09-19T12:25:44.428Z',
  expectedSendAmount: 17.8,
  expectedReceiveAmount: 2.4234283,
  createdAt: '2019-09-19T12:24:48.460Z',
  isPartner: false
}
const exampleExchanging = {
  status: 'exchanging',
  payinHash: 'xxx',
  payinAddress: 'yyy',
  payoutAddress: 'ooo',
  fromCurrency: 'btc',
  toCurrency: 'xmr',
  amountSend: 0.1,
  id: 'zzz',
  updatedAt: '2019-09-19T12:31:16.153Z',
  expectedSendAmount: 0.1,
  expectedReceiveAmount: 13.0026486,
  createdAt: '2019-09-19T12:20:14.007Z',
  isPartner: false
}
const exampleWaiting = {
  status: 'waiting',
  payinAddress: 'xxx',
  payoutAddress: 'yyy',
  fromCurrency: 'xmr',
  toCurrency: 'btc',
  refundAddress: 'zzz',
  id: 'zzz',
  updatedAt: '2019-09-19T12:34:45.520Z',
  expectedSendAmount: 27,
  expectedReceiveAmount: 0.2018695,
  createdAt: '2019-09-19T12:34:45.520Z',
  isPartner: false
}
const exampleVerifying = {
  status: 'verifying',
  payinHash: 'xxx',
  payinAddress: 'yyy',
  payoutAddress: 'ooo',
  fromCurrency: 'btc',
  toCurrency: 'bsv',
  amountSend: 0.97666,
  id: 'zzz',
  updatedAt: '2019-09-18T17:07:24.444Z',
  expectedSendAmount: 0.97666,
  expectedReceiveAmount: 75.2984126,
  createdAt: '2019-09-18T16:56:46.351Z',
  isPartner: true,
  depositReceivedAt: '2019-09-18T17:07:24.642Z'
}
const exampleRefunded = {
  status: 'refunded',
  payoutHash: 'xxx',
  payinAddress: 'yyy',
  payoutAddress: 'zzz',
  payinExtraId: '6242529444142862',
  fromCurrency: 'xlm',
  toCurrency: 'etc',
  amountReceive: 2436,
  id: 'zzz',
  updatedAt: '2019-09-19T11:52:56.280Z',
  expectedSendAmount: 2436,
  expectedReceiveAmount: 31.3457036,
  createdAt: '2019-09-19T05:25:45.875Z',
  isPartner: false,
  payinExtraIdName: 'Memo'
}
*/
