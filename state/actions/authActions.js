// @flow
import axios from 'axios'
import { takeLatest, takeEvery, put, call, all } from 'redux-saga/effects'
import { BASE_API_URL, LOCAL_STORAGE_AUTH_TOKEN_KEY } from '~/constants'
import { dispatchError } from '~/state/actions'
import { getAuthToken, authRequest } from '~/state/helpers'

export const AUTH_LOAD_TOKEN = 'AUTH::LOAD_TOKEN'
export const AUTH_LOAD_TOKEN_START = 'AUTH::LOAD_TOKEN_START'
export const AUTH_LOAD_TOKEN_SUCCESS = 'AUTH::LOAD_TOKEN_SUCCESS'
export const AUTH_LOAD_TOKEN_ERROR = 'AUTH::LOAD_TOKEN_ERROR'
export const AUTH_LOAD_TOKEN_COMPLETE = 'AUTH::LOAD_TOKEN_COMPLETE'

export function loadToken() {
	return { type: AUTH_LOAD_TOKEN }
}

function* loadTokenHandler(action) {
	yield put({ type: AUTH_LOAD_TOKEN_START })

	try {
		let authToken = window.localStorage[LOCAL_STORAGE_AUTH_TOKEN_KEY]

		yield put({ type: AUTH_LOAD_TOKEN_SUCCESS, payload: { authToken } })
	} catch (error) {
		yield call(dispatchError, AUTH_LOAD_TOKEN_ERROR, error)
	}

	yield put({ type: AUTH_LOAD_TOKEN_COMPLETE })
}

export const AUTH_STORE_TOKEN = 'AUTH::STORE_TOKEN'
export const AUTH_STORE_TOKEN_START = 'AUTH::STORE_TOKEN_START'
export const AUTH_STORE_TOKEN_SUCCESS = 'AUTH::STORE_TOKEN_SUCCESS'
export const AUTH_STORE_TOKEN_ERROR = 'AUTH::STORE_TOKEN_ERROR'
export const AUTH_STORE_TOKEN_COMPLETE = 'AUTH::STORE_TOKEN_COMPLETE'

export function storeToken(authToken = getAuthToken()) {
	return { type: AUTH_STORE_TOKEN, payload: { authToken } }
}

function* storeTokenHandler(action) {
	yield put({ type: AUTH_STORE_TOKEN_START })

	let { authToken } = action.payload

	try {
		window.localStorage[LOCAL_STORAGE_AUTH_TOKEN_KEY] = authToken

		yield put({ type: AUTH_STORE_TOKEN_SUCCESS })
	} catch (error) {
		yield call(dispatchError, AUTH_STORE_TOKEN_ERROR, error)
	}

	put({ type: AUTH_STORE_TOKEN_COMPLETE })
}

export const AUTH_DELETE_TOKEN = 'AUTH::DELETE_TOKEN'
export const AUTH_DELETE_TOKEN_START = 'AUTH::DELETE_TOKEN_START'
export const AUTH_DELETE_TOKEN_SUCCESS = 'AUTH::DELETE_TOKEN_SUCCESS'
export const AUTH_DELETE_TOKEN_ERROR = 'AUTH::DELETE_TOKEN_ERROR'
export const AUTH_DELETE_TOKEN_COMPLETE = 'AUTH::DELETE_TOKEN_COMPLETE'

export function deleteToken() {
	return { type: AUTH_DELETE_TOKEN }
}

function* deleteTokenHandler(action) {
	yield put({ type: AUTH_DELETE_TOKEN_START })

	try {
		delete window.localStorage[LOCAL_STORAGE_AUTH_TOKEN_KEY]

		yield put({ type: AUTH_DELETE_TOKEN_SUCCESS })
	} catch (error) {
		yield call(dispatchError, AUTH_DELETE_TOKEN_ERROR, error)
	}

	put({ type: AUTH_DELETE_TOKEN_COMPLETE })
}

export const AUTH_CHECK = 'AUTH::CHECK'
export const AUTH_CHECK_START = 'AUTH::CHECK_START'
export const AUTH_CHECK_SUCCESS = 'AUTH::CHECK_SUCCESS'
export const AUTH_CHECK_ERROR = 'AUTH::CHECK_ERROR'
export const AUTH_CHECK_COMPLETE = 'AUTH::CHECK_COMPLETE'

export function check(authToken) {
	return { type: AUTH_CHECK, payload: { authToken } }
}

function* checkHandler(action) {
	yield put({ type: AUTH_CHECK_START })

	let { authToken } = action.payload

	try {
		let { data } = yield call(authRequest, {
			method: 'get',
			url: `/users`,
			baseUrl: BASE_API_URL
		})

		yield put({ type: AUTH_CHECK_SUCCESS, payload: data })
	} catch (error) {
		yield call(dispatchError, AUTH_CHECK_ERROR, error)
	}

	yield put({ type: AUTH_CHECK_END })
}

export const AUTH_LOGIN = 'AUTH::LOGIN'
export const AUTH_LOGIN_START = 'AUTH::LOGIN_START'
export const AUTH_LOGIN_SUCCESS = 'AUTH::LOGIN_SUCCESS'
export const AUTH_LOGIN_ERROR = 'AUTH::LOGIN_ERROR'
export const AUTH_LOGIN_COMPLETE = 'AUTH::LOGIN_COMPLETE'

export function login(username, password, twoFactorAuthResponse) {
	return {
		type: AUTH_LOGIN,
		payload: { username, password, twoFactorAuthResponse }
	}
}

function* loginHandler(action) {
	yield put({ type: AUTH_LOGIN_START })

	let { username, password, twoFactorAuthResponse } = action.payload

	try {
		let { data } = yield call(axios, {
			method: 'post',
			url: '/users/login',
			baseURL: BASE_API_URL,
			data: { username, password, twoFactorAuthResponse }
		})

		yield put(storeToken(data.session))

		yield put({ type: AUTH_LOGIN_SUCCESS, payload: data })
	} catch (error) {
		yield call(dispatchError, AUTH_LOGIN_ERROR, error)
	}

	yield put({ type: AUTH_LOGIN_COMPLETE })
}

export const AUTH_LOGOUT = 'AUTH::LOGOUT'
export const AUTH_LOGOUT_START = 'AUTH::LOGOUT_START'
export const AUTH_LOGOUT_SUCCESS = 'AUTH::LOGOUT_SUCCESS'
export const AUTH_LOGOUT_ERROR = 'AUTH::LOGOUT_ERROR'
export const AUTH_LOGOUT_COMPLETE = 'AUTH::LOGOUT_COMPLETE'

export function logout(authToken = getAuthToken()) {
	return {
		type: AUTH_LOGOUT,
		payload: { authToken }
	}
}

function* logoutHandler(action) {
	yield put({ type: AUTH_LOGOUT_START })

	const { authToken } = action.payload

	try {
		let { data } = yield call(axios, {
			method: 'delete',
			url: '/users/session',
			baseURL: BASE_API_URL,
			data: { token: authToken }
		})

		yield put(deleteToken(data.session))

		yield put({ type: AUTH_LOGOUT_SUCCESS, payload: data })
	} catch (error) {
		yield call(dispatchError, AUTH_LOGOUT_ERROR, error)
	}

	yield put({ type: AUTH_LOGOUT_COMPLETE })
}

export default function*() {
	yield takeLatest(AUTH_LOGIN, loginHandler)
	yield takeLatest(AUTH_LOGOUT, logoutHandler)
	yield takeLatest(AUTH_CHECK, checkHandler)
	yield takeLatest(AUTH_LOAD_TOKEN, loadTokenHandler)
	yield takeLatest(AUTH_STORE_TOKEN, storeTokenHandler)
}
