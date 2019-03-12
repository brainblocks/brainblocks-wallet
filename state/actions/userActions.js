// @flow
const actions = {
  UPDATE: 'USER::UPDATE'
}

const creators = {
  updateUser: payload => ({
    type: actions.UPDATE,
    payload
  })
}

export { actions, creators }
