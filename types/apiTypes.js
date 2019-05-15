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
