// @flow
import produce from 'immer'
import {
	AUTH_LOGIN_START,
	AUTH_LOGIN_COMPLETE,
	AUTH_LOGIN_SUCCESS,
	AUTH_INIT_START,
	AUTH_INIT_COMPLETE,
	AUTH_INIT_SUCCESS,
	AUTH_INIT_FAILURE,
	AUTH_LOGOUT_START,
	AUTH_LOGOUT_SUCCESS
} from '~/state/actions/authActions'

const initialState = {
	isChecking: false,
	didCheck: false,
	isAuthorized: false,
	authToken: undefined,
	user: {
		firstName: undefined,
		lastName: undefined,
		preferredCurrency: undefined,
		username: undefined,
		email: undefined
	},
	expires: undefined
}

export default (state = initialState, action) =>
	produce(state, draft => {
		switch (action.type) {
			case AUTH_INIT_START:
			case AUTH_LOGIN_START:
				draft.isChecking = true
				break

			case AUTH_INIT_SUCCESS:
			case AUTH_LOGIN_SUCCESS:
				const { authToken, expires, user } = action.payload

				Object.assign(draft, {
					isAuthorized: true,
					authToken,
					expires
				})

				Object.assign(draft.user, user)
				break

			case AUTH_INIT_COMPLETE:
			case AUTH_LOGIN_COMPLETE:
				draft.isChecking = false
				draft.didCheck = true
				break

			// Assume that logout will work for immediate response
			case AUTH_LOGOUT_START:
				draft.isAuthorized = false
				break

			case AUTH_LOGOUT_SUCCESS:
				draft.authToken = undefined
				break
		}
	})
