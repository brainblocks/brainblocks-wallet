// @flow
import { takeLatest, takeEvery, put, call, all } from 'redux-saga/effects'
import { LOCAL_STORAGE_AUTH_TOKEN_KEY } from '~/constants'
import { dispatchError } from '~/state/actions'
import {
	getAuthToken,
	makeApiRequest,
	makeAuthorizedApiRequest
} from '~/state/helpers'

// Safely attempts to lookup and return the auth token from localStorage
function tryLoadToken(): ?string {
	try {
		return window.localStorage[LOCAL_STORAGE_AUTH_TOKEN_KEY]
	} catch (e) {
		console.warn('Error while reading authToken from localStorage', e)
		return undefined
	}
}

// Safely attempts to store an auth token to localStorage
function tryStoreToken(authToken: string): void {
	try {
		window.localStorage[LOCAL_STORAGE_AUTH_TOKEN_KEY] = authToken
	} catch (e) {
		console.warn('Error while writting authToken to localStorage', e)
	}
}

// Safely attempts to delete the auth token from localStorage
function tryDeleteToken(): void {
	try {
		delete window.localStorage[LOCAL_STORAGE_AUTH_TOKEN_KEY]
	} catch (e) {
		console.warn('Error while deleting authToken from localStorage', e)
	}
}

export const AUTH_INIT = 'AUTH::INIT'
export const AUTH_INIT_START = 'AUTH::INIT_START'
export const AUTH_INIT_SUCCESS = 'AUTH::INIT_SUCCESS'
export const AUTH_INIT_FAILURE = 'AUTH::INIT_FAILURE'
export const AUTH_INIT_ERROR = 'AUTH::INIT_ERROR'
export const AUTH_INIT_COMPLETE = 'AUTH::INIT_COMPLETE'

export function init(): Object {
	return { type: AUTH_INIT }
}

function* initHandler(action: Object) {
	yield put({ type: AUTH_INIT_START })

	try {
		let authToken = tryLoadToken()

		if (authToken) {
			let { data: userData } = yield call(makeApiRequest, {
				method: 'get',
				url: `/users`,
				headers: {
					'x-auth-token': authToken
				}
			})

			let { user } = userData

			yield put({ type: AUTH_INIT_SUCCESS, payload: { authToken, user } })
		} else {
			yield put({ type: AUTH_INIT_FAILURE })
		}
	} catch (error) {
		tryDeleteToken() // Try and ensure we don't do this check again on the next refresh
		yield put({ type: AUTH_INIT_FAILURE })
		yield call(dispatchError, AUTH_INIT_ERROR, error)
	}

	yield put({ type: AUTH_INIT_COMPLETE })
}

export const AUTH_LOGIN = 'AUTH::LOGIN'
export const AUTH_LOGIN_START = 'AUTH::LOGIN_START'
export const AUTH_LOGIN_SUCCESS = 'AUTH::LOGIN_SUCCESS'
export const AUTH_LOGIN_ERROR = 'AUTH::LOGIN_ERROR'
export const AUTH_LOGIN_COMPLETE = 'AUTH::LOGIN_COMPLETE'

export function login(
	username: string,
	password: string,
	twoFactorAuthResponse: ?string
) {
	return {
		type: AUTH_LOGIN,
		payload: { username, password, twoFactorAuthResponse }
	}
}

function* loginHandler(action: Object) {
	yield put({ type: AUTH_LOGIN_START })

	let { username, password, twoFactorAuthResponse } = action.payload

	try {
		// First perform the login to receive an auth token
		let { data: sessionData } = yield call(makeApiRequest, {
			method: 'post',
			url: '/users/login',
			data: { username, password, twoFactorAuthResponse }
		})

		// Extract relavent information
		let { expires, session: authToken } = sessionData

		// Retrieve the current user
		let { data: userData } = yield call(makeApiRequest, {
			method: 'get',
			url: `/users`,
			headers: {
				'x-auth-token': authToken
			}
		})

		// Keep the auth token in localStorage
		tryStoreToken(authToken)

		let { user } = userData

		yield put({
			type: AUTH_LOGIN_SUCCESS,
			payload: { authToken, expires, user }
		})
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

export function logout(authToken: ?string = getAuthToken()) {
	return {
		type: AUTH_LOGOUT,
		payload: { authToken }
	}
}

function* logoutHandler(action: Object) {
	yield put({ type: AUTH_LOGOUT_START })

	try {
		let authToken = getAuthToken()

		// Immediately remove the token from localstorage
		tryDeleteToken()

		// Attempt to make the proper call to the backend as well
		let { data } = yield call(makeAuthorizedApiRequest, {
			method: 'delete',
			url: '/users/session',
			data: { token: authToken }
		})

		yield put({ type: AUTH_LOGOUT_SUCCESS, payload: data })
	} catch (error) {
		yield call(dispatchError, AUTH_LOGOUT_ERROR, error)
	}

	yield put({ type: AUTH_LOGOUT_COMPLETE })
}

export default function*() {
	yield takeLatest(AUTH_INIT, initHandler)
	yield takeLatest(AUTH_LOGIN, loginHandler)
	yield takeLatest(AUTH_LOGOUT, logoutHandler)
}
