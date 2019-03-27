// @flow
const actions = {
  UPDATE: 'VAULT::UPDATE'
}

const creators = {
  updateVault: (payload: Object) => ({
    type: actions.UPDATE,
    payload
  })
}

export { actions, creators }
