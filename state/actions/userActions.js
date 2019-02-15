// @flow
const actions = { UPDATE_AUTHORIZED_USER: 'USER::UPDATE_AUTHORIZED_USER' }

const creators = {
  updateAuthorizedUser: (payload = {}) => ({
    type: actions.UPDATE_AUTHORIZED_USER,
    payload
  })
}

export { actions, creators }
