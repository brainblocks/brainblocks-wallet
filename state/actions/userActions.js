import { put, takeLatest, call } from 'redux-saga/effects'
import { makeApiRequest } from '~/state/helpers'
import { dispatchError } from '~/state/actions'

export const USER_REGISTER = 'USER::REGISTER'
export const USER_REGISTER_START = 'USER::REGISTER_START'
export const USER_REGISTER_SUCCESS = 'USER::REGISTER_SUCCESS'
export const USER_REGISTER_ERROR = 'USER::REGISTER_ERROR'
export const USER_REGISTER_COMPLETE = 'USER::REGISTER_COMPLETE'

export function register({ username, email, password }) {
  return { type: USER_REGISTER_START, payload: { username, email, password } }
}

function* registerHandler(action) {
  yield put({ type: USER_REGISTER_START })

  try {
    const { data } = yield call(makeApiRequest, {
      method: 'post',
      url: '/user',
      data: { ...action.payload }
    })

    // TODO: Then log the user in

    yield put({ type: USER_REGISTER_SUCCESS, payload: data })
  } catch (error) {
    yield put(dispatchError(USER_REGISTER_ERROR, error))
  }

  yield put({ type: USER_REGISTER_COMPLETE })
}

export default function* userSage() {
  yield takeLatest(USER_REGISTER, registerHandler)
}
