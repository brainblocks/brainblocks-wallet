import { actions } from '~/state/actions/accountActions'
import { actions as authActions } from '~/state/actions/authActions'
import produce from 'immer'

const accountTemplate = {
  account: '',
  label: '',
  lastHash: '',
  balance: 0,
  pendingBalance: 0,
  type: '',
  color: '',
  transactions: []
}

export const accountsInitialState = {
  allIds: [],
  byId: {}
}

const accountsReducer = (state, action) => {
  if (typeof state === 'undefined' || action.type === authActions.LOGOUT) {
    return accountsInitialState
  }

  const id =
    action.type.indexOf('ACCOUNTS::') === 0 &&
    action.hasOwnProperty('payload') &&
    action.payload.hasOwnProperty('account')
      ? action.payload.account
      : null

  return produce(state, draft => {
    switch (action.type) {
      case actions.BULK_ADD_ACCOUNTS:
        action.payload.forEach(acc => {
          draft.allIds.push(acc.account)
          draft.byId[acc.account] = { ...accountTemplate, ...acc }
        })
        break
      case actions.CREATE_ACCOUNT:
        draft.allIds.push(id)
        draft.byId[id] = { ...accountTemplate, ...action.payload }
        break
      case actions.UPDATE_ACCOUNT:
        draft.byId[id] = {
          ...draft.byId[id],
          ...action.payload
        }
        break
      case actions.DELETE_ACCOUNT:
        break
    }
    return draft
  })
}

export default accountsReducer
