// @flow
import orm from '../orm'
import { ORM_USER_CREATE, ORM_USER_UPDATE } from '../actions/userORMActions'

export default (state: Object, action: Object): Object => {
  const session: Object = orm.session(state)
  const { User } = session

  switch (action.type) {
    case ORM_USER_CREATE:
      User.create(action.payload)
      break
    case ORM_USER_UPDATE:
      User.withId(action.payload.id).update(action.payload)
      break
  }

  return session.state
}
