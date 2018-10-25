// @flow
import { all, put } from 'redux-saga/effects'
import authSaga from './authActions'

export const ANY_ERROR = 'ANY:ERROR'

export function* dispatchError(actionType, error) {
	yield put({ type: actionType, payload: { error } })
	yield put({ type: ANY_ERROR, payload: { error } })
}

export default function* rootSaga() {
	yield authSaga()
	yield takeEvery(ANY_ERROR, action => {
		console.error(action.payload.error)
	})
}
