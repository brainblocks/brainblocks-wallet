// @flow
import type { UpdateUserAction } from '~/types/reduxTypes'

const actions = {
  UPDATE: 'USER::UPDATE'
}

type Creators = {
  updateUser: Object => UpdateUserAction
}

const creators: Creators = {
  updateUser: payload => ({
    type: actions.UPDATE,
    payload
  })
}

export { actions, creators }
