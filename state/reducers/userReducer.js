// @flow
import orm from '~/state/models'
import produce from 'immer'
import {
  USER_REGISTER_START,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_ERROR,
  USER_REGISTER_COMPLETE
} from '~/state/actions/userActions'

export default (draftState, action, { User, Auth }) => {
  const auth = Auth.withId('me') || Auth.create({ id: 'me' })

  switch (action.type) {
    case USER_REGISTER_START:
      draftState.ui.register.isRegistering = true
      break

    case USER_REGISTER_SUCCESS:
      const { user, authToken, expires } = action.payload

      auth.update({
        authToken,
        expires,
        user: User.create(user),
        isChecking: false,
        isAuthorized: true,
        didCheck: true
      })

      draftState.errors.register = undefined
      break

    case USER_REGISTER_ERROR:
      draftState.errors.register = action.payload
      break

    case USER_REGISTER_COMPLETE:
      draftState.ui.register.isRegistering = false
      break
  }
}
