// @flow
import { all, put, call, takeEvery } from 'redux-saga/effects'
import authSaga from './authActions'
import userSaga from './userActions'
import { isDevelopment } from '..'
import { deduceError } from '../errors'

export const ANY_ERROR = 'ANY::ERROR'

export function* dispatchError(actionType, error) {
  error = deduceError(error)
  yield put({ type: actionType, payload: error })
  yield put({ type: ANY_ERROR, payload: error })
}

function* anyErrorHandler(action) {
  if (isDevelopment) {
    console.error(action.payload)
  }
}

export default function* rootSaga() {
  yield takeEvery(ANY_ERROR, anyErrorHandler)
  yield all([call(authSaga), call(userSaga)])
}
