// @flow
import produce from 'immer'
import { actions } from '~/state/actions/tradesActions'
import { actions as authActions } from '~/state/actions/authActions'
import type { TradesState, ReduxAction } from '~/types/reduxTypes'

export const tradesInitialState: TradesState = {
  allIds: [],
  byId: {},
  didGetTrades: false
}

const tradesReducer: (
  state: TradesState,
  action: ReduxAction
) => TradesState = (state, action) => {
  if (typeof state === 'undefined' || action.type === authActions.LOGOUT) {
    return tradesInitialState
  }

  return produce(state, draft => {
    switch (action.type) {
      case actions.BULK_ADD_TRADES:
        draft.allIds = [
          ...draft.allIds,
          ...action.payload.map(trade => trade.id)
        ]
        draft.byId = {}
        action.payload.forEach(trade => {
          draft.byId[trade.id] = trade
        })
        draft.didGetTrades = true
        updateTimestamps()
        dedupeIds()
        sort()
        break
      case actions.UPSERT_TRADE:
        draft.allIds.push(action.payload.id)
        draft.byId[action.payload.id] = action.payload
        updateTimestamps()
        dedupeIds()
        sort()
        break
      default:
    }

    // Update timestamps
    function updateTimestamps() {
      draft.allIds.forEach(tid => {
        draft.byId[tid].updatedAt = new Date(
          draft.byId[tid].updatedAt
        ).getTime()
        if (typeof draft.byId[tid].depositReceivedAt === 'string') {
          draft.byId[tid].depositReceivedAt = new Date(
            draft.byId[tid].depositReceivedAt
          ).getTime()
        }
      })
    }

    // sort descending by timestamp
    function sort() {
      draft.allIds.sort((a, b) => {
        return draft.byId[b].updatedAt - draft.byId[a].updatedAt
      })
    }

    // dedupe allIds
    function dedupeIds() {
      draft.allIds = [...new Set(draft.allIds)]
    }
  })
}

export default tradesReducer
