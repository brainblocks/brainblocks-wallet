// @flow
import {
  AUTH_LOGIN_START,
  AUTH_LOGIN_COMPLETE,
  AUTH_LOGIN_SUCCESS
} from '~/state/actions/authActions'

const initialState = {
  isChecking: false,
  didCheck: false,
  isLoggedIn: false,
  authToken: undefined,
  username: undefined,
  email: undefined,
  expires: undefined
}

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOGIN_START:
      state = {
        ...state,
        isChecking: true,
        didCheck: true
      }
      break

    case AUTH_LOGIN_SUCCESS:
      const { email, username, session, status, expires } = action.payload
      state = {
        ...state,
        authToken: session,
        isLoggedIn: status === 'success',
        email,
        username,
        expires
      }
      break

    case AUTH_LOGIN_COMPLETE:
      state = {
        ...state,
        isChecking: false
      }
      break
  }

  return state
}
