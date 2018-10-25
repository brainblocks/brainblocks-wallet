// @flow
import produce from 'immer'
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

export default (state = initialState, action) =>
	produce(state, draft => {
		switch (action.type) {
			case AUTH_LOGIN_START:
				draft.isChecking = true
				draft.didCheck = true
				break

			case AUTH_LOGIN_SUCCESS:
				const { email, username, session, status, expires } = action.payload
				Object.assign(draft, {
					authToken: session,
					isLoggedIn: state === 'success',
					email,
					status,
					expires
				})
				break

			case AUTH_LOGIN_COMPLETE:
				draft.isChecking = false
				break
		}
	})
