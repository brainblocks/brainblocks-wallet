/* @flow */
import { actions } from '~/state/actions/transactionActions'
import { actions as authActions } from '~/state/actions/authActions'
import produce from 'immer'
import type { NanoTransactionRedux } from '~/types'

export const nanoTransactionTemplate: NanoTransactionRedux = {
  currency: 'nano',
  id: '',
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

export const transactionsInitialState = {
  allIds: [],
  byId: {}
}

const transactionsReducer: (state: Object, action: Object) => Object = (
  state,
  action
) => {
  if (typeof state === 'undefined' || action.type === authActions.LOGOUT) {
    return transactionsInitialState
  }

  //$FlowFixMe
  return produce(state, draft => {
    const id =
      action.type.indexOf('TRANSACTIONS::') === 0 &&
      action.hasOwnProperty('payload') &&
      action.payload.hasOwnProperty('id')
        ? action.payload.id
        : null

    switch (action.type) {
      case actions.BULK_ADD_TRANSACTIONS:
        draft.allIds = [...draft.allIds, ...Object.keys(action.payload)]
        draft.byId = { ...draft.byId, ...action.payload }
        break
      case actions.CREATE_TRANSACTION:
        draft.allIds.push(id)
        draft.byId[id] = { ...nanoTransactionTemplate, ...action.payload }
        break
      case actions.UPDATE_TRANSACTION:
        draft.byId[id] = { ...draft.byId[id], ...action.payload }
        break
      default:
        // return early from here to skip re-sorting unnecessarily
        return draft
    }

    // sort descending by timestamp then height
    draft.allIds.sort((a, b) => {
      const byTime = draft.byId[b].timestamp - draft.byId[a].timestamp
      const byHeight = draft.byId[b].height || 0 - draft.byId[a].height || 0
      return byTime !== 0 ? byTime : byHeight
    })

    return draft
  })
}

export default transactionsReducer
