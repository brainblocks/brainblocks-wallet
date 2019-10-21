/* @flow */
import { actions } from '~/state/actions/transactionActions'
import { actions as authActions } from '~/state/actions/authActions'
import produce from 'immer'
import type {
  ReduxNanoTransaction,
  TransactionsState,
  ReduxAction
} from '~/types/reduxTypes'

export const nanoTransactionTemplate: ReduxNanoTransaction = {
  currency: 'nano',
  id: '',
  previous: '',
  link: '',
  accountId: '', // which nano address is it associated with?
  timestamp: 0,
  amountNano: 0,
  height: 0,
  type: 'send', // open, receive, send, change
  isState: true,
  linkAddress: '', // link_as_account
  status: 'confirmed', // local | pending | confirmed
  note: ''
}

export const transactionsInitialState: TransactionsState = {
  allIds: [],
  byId: {}
}

const transactionsReducer: (
  state: TransactionsState,
  action: ReduxAction
) => TransactionsState = (state, action) => {
  if (typeof state === 'undefined' || action.type === authActions.LOGOUT) {
    return transactionsInitialState
  }

  return produce(state, draft => {
    let id
    switch (action.type) {
      case actions.BULK_ADD_TRANSACTIONS:
        draft.allIds = [...draft.allIds, ...Object.keys(action.payload)]
        draft.byId = { ...draft.byId, ...action.payload }
        sort()
        break
      // return {
      //   allIds: [...draft.allIds, ...Object.keys(action.payload)],
      //   byId: { ...draft.byId, ...action.payload }
      // }
      case actions.CREATE_TRANSACTION:
        id = action.payload.id
        draft.allIds.push(id)
        draft.byId[id] = { ...nanoTransactionTemplate, ...action.payload }
        sort()
        break
      case actions.UPDATE_TRANSACTION:
        id = action.payload.id
        draft.byId[id] = { ...draft.byId[id], ...action.payload }
        sort()
        break
      default:
    }

    // sort descending by timestamp then height
    function sort() {
      draft.allIds.sort((a, b) => {
        const byTime = draft.byId[b].timestamp - draft.byId[a].timestamp
        const byHeight = draft.byId[b].height || 0 - draft.byId[a].height || 0
        return byTime !== 0 ? byTime : byHeight
      })
    }
  })
}

export default transactionsReducer
