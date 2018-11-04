// @flow
import { all, put, takeEvery } from 'redux-saga/effects'
import authSaga from './authActions'
import { isDevelopment } from '..'
import { deduceError } from '../errors'
import { BadRequestError } from '../errors/BadRequestError'

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
  yield authSaga()
}
