import { put, takeLatest, call } from 'redux-saga/effects'
import { makeApiRequest } from '~/state/helpers'
import { dispatchError } from '~/state/actions'
import { tryStoreToken } from '~/state/actions/authActions'

export const USER_REGISTER = 'USER::REGISTER'
export const USER_REGISTER_START = 'USER::REGISTER_START'
export const USER_REGISTER_SUCCESS = 'USER::REGISTER_SUCCESS'
export const USER_REGISTER_ERROR = 'USER::REGISTER_ERROR'
export const USER_REGISTER_COMPLETE = 'USER::REGISTER_COMPLETE'

export function register({ username, email, password }) {
  return { type: USER_REGISTER, payload: { username, email, password } }
}

function* registerHandler(action) {
  yield put({ type: USER_REGISTER_START })

  try {
    const { data } = yield call(makeApiRequest, {
      method: 'post',
      url: '/users',
      data: { ...action.payload }
    })

    let { token } = data

    tryStoreToken(token)

    yield put({ type: USER_REGISTER_SUCCESS, payload: data })
  } catch (error) {
    yield call(dispatchError, USER_REGISTER_ERROR, error)
  }

  yield put({ type: USER_REGISTER_COMPLETE })
}

export default function* userSaga() {
  yield takeLatest(USER_REGISTER, registerHandler)
}
