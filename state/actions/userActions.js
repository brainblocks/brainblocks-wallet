// @flow
const actions = {
  UPDATE_AUTHORIZED_USER: 'USER::UPDATE_AUTHORIZED_USER',
  UPDATE: 'USER::UPDATE'
}

const creators = {
  updateAuthorizedUser: (payload = {}) => ({
    type: actions.UPDATE_AUTHORIZED_USER,
    payload
  }),
  updateUser: payload => ({
    type: actions.UPDATE,
    payload
  })
}

export { actions, creators }
