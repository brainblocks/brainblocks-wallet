/* @flow */
import { actions } from '~/state/actions/transactionActions'
import produce from 'immer'
import type { NanoTransactionRedux } from '~/types'

export const nanoTransactionTemplate: NanoTransactionRedux = {
  currency: 'nano',
  id: '',
  accountId: '', // which nano address is it associated with?
  timestamp: 0,
  amountNano: 0,
  type: 'send', // open, receive, send, change
  isState: true,
  linkAddress: '', // link_as_account
  status: 'local', // local | pending | confirmed
  note: ''
}

export const transactionsInitialState = {
  allIds: [],
  byId: {}
}

const transactionsReducer: (state: Object, action: Object) => Object = (
  state,
  action
) => {
  if (typeof state === 'undefined') {
    return transactionsInitialState
  }

  //$FlowFixMe
  return produce(state, draft => {
    switch (action.type) {
      case actions.BULK_ADD_TRANSACTIONS:
        draft.allIds = [...draft.allIds, ...Object.keys(action.payload)]
        draft.byId = { ...draft.byId, ...action.payload }
        break
      case actions.CREATE_TRANSACTION:
        const { id } = action.payload
        draft.allIds.push(id)
        draft.byId[id] = { ...nanoTransactionTemplate, ...action.payload }
        break
      default:
        // return early from here to skip re-sorting unnecessarily
        return draft
    }

    // sort descending by timestamp
    draft.allIds.sort(
      (a, b) => draft.byId[b].timestamp - draft.byId[a].timestamp
    )

    return draft
  })
}

export default transactionsReducer
