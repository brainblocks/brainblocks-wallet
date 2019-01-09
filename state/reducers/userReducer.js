// @flow
import orm from '~/state/models'
import { UPDATE_AUTHORIZED_USER } from '~/state/actions/userActions'

export default (draftState, action, { User, Auth }) => {
  const auth = Auth.withId('me') || Auth.create({ id: 'me' })

  switch (action.type) {
    case UPDATE_AUTHORIZED_USER:
      auth.update({
        user: auth.user
          ? auth.user.update(action.payload)
          : User.create(action.payload)
      })

      break
  }
}
