import { actions } from '~/state/actions/userActions'
import { actions as authActions } from '~/state/actions/authActions'
import produce from 'immer'

export const userInitialState = {
  id: null,
  firstName: null,
  lastName: null,
  username: null,
  preferredCurrency: null,
  email: null,
  birthday: null,
  hasVerifiedEmail: false,
  wallet: null,
  defaultAccount: null
}

const userReducer = (state, action) => {
  if (typeof state === 'undefined') {
    return userInitialState
  }

  return produce(state, draft => {
    switch (action.type) {
      case actions.UPDATE_AUTHORIZED_USER:
        draft = { ...draft, ...action.payload }
        break

      case actions.UPDATE:
        draft = { ...draft, ...action.payload }
        break

      case authActions.UPDATE:
        draft = { ...draft, ...action.payload.user }
        break
    }
    return draft
  })
}

export default userReducer
