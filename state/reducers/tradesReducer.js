// @flow
import produce from 'immer'
import { actions } from '~/state/actions/tradesActions'
import { actions as authActions } from '~/state/actions/authActions'
import type { TradesState, ReduxAction } from '~/types/reduxTypes'

export const tradesInitialState: TradesState = {
  allIds: [],
  byId: {}
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
        draft.allIds = [...draft.allIds, action.payload.map(trade => trade.id)]
        draft.byId = {
          ...draft.byId,
          ...action.payload.reduce((obj, trade) => (obj[trade.id] = trade), {})
        }
        dedupeIds()
        sort()
        break
      case actions.UPSERT_TRADE:
        draft.allIds.push(action.payload.id)
        draft.byId[action.payload.id] = action.payload
        dedupeIds()
        sort()
        break
      default:
    }

    // sort descending by timestamp
    function sort() {
      draft.allIds.sort((a, b) => {
        return draft.byId[b].createdAt - draft.byId[a].createdAt
      })
    }

    // dedupe allIds
    function dedupeIds() {
      draft.allIds = [...new Set(draft.allIds)]
    }
  })
}

export default tradesReducer
