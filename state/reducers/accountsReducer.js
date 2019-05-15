// @flow
import { actions } from '~/state/actions/accountActions'
import { actions as authActions } from '~/state/actions/authActions'
import produce from 'immer'
import type {
  ReduxAction,
  AccountsState,
  ReduxAccount
} from '~/types/reduxTypes'

const accountTemplate: ReduxAccount = {
  account: '',
  label: '',
  lastHash: '',
  balance: 0,
  pendingBalance: 0,
  type: '',
  color: '',
  didGetChain: false,
  representative: ''
}

export const accountsInitialState: AccountsState = {
  allIds: [],
  byId: {}
}

const accountsReducer: (
  state: AccountsState,
  action: ReduxAction
) => AccountsState = (state, action) => {
  if (typeof state === 'undefined' || action.type === authActions.LOGOUT) {
    return accountsInitialState
  }

  let id
  return produce(state, draft => {
    switch (action.type) {
      case actions.BULK_ADD_ACCOUNTS:
        action.payload.forEach(acc => {
          draft.allIds.push(acc.account)
          draft.byId[acc.account] = { ...accountTemplate, ...acc }
        })
        break
      case actions.CREATE_ACCOUNT:
        id = action.payload.account
        draft.allIds.push(id)
        draft.byId[id] = { ...accountTemplate, ...action.payload }
        break
      case actions.UPDATE_ACCOUNT:
        id = action.payload.account
        draft.byId[id] = {
          ...draft.byId[id],
          ...action.payload
        }
        break
      case actions.BULK_UPDATE_ACCOUNTS:
        action.payload.forEach(acc => {
          draft.byId[acc.account] = {
            ...draft.byId[acc.account],
            ...acc
          }
        })
        break
      case actions.DELETE_ACCOUNT:
        break
    }
    return draft
  })
}

export default accountsReducer
