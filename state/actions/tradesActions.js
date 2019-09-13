// @flow
import type {
  BulkAddTradesAction,
  UpsertTradeAction,
  Trade
} from '~/types/reduxTypes'

const actions = {
  BULK_ADD_TRADES: 'TRADES::BULK_ADD',
  UPSERT_TRADE: 'TRADES::UPSERT'
}

type Creators = {
  bulkAddTrades: (Array<Trade>) => BulkAddTradesAction,
  upsertTrade: Trade => UpsertTradeAction
}

const creators: Creators = {
  bulkAddTrades: payload => ({
    type: actions.BULK_ADD_TRADES,
    payload
  }),
  upsertTrade: payload => ({
    type: actions.UPSERT_TRADE,
    payload
  })
}

export { actions, creators }
