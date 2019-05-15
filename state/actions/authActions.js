// @flow
import type { UpdateAuthAction, LogoutAction } from '~/types/reduxTypes'

const actions = {
  UPDATE: 'AUTH::UPDATE',
  LOGOUT: 'AUTH::LOGOUT'
}

type Creators = {
  update: Object => UpdateAuthAction,
  logout: () => LogoutAction
}

const creators: Creators = {
  update: (payload = {}) => ({
    type: actions.UPDATE,
    payload
  }),
  logout: () => ({
    type: actions.LOGOUT
  })
}

export { actions, creators }
