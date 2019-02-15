// @flow
const actions = {
  CREATE_VAULT: 'VAULTS::CREATE_VAULT',
  UPDATE_VAULT: 'VAULTS::UPDATE_VAULT',
  DELETE_VAULT: 'VAULTS::DELETE_VAULT'
}

const creators = {
  createVault: (payload = {}) =>
    console.log(payload) || {
      type: actions.CREATE_VAULT,
      payload
    },
  updateVault: (payload = {}) => ({
    type: actions.UPDATE_VAULT,
    payload
  }),
  deleteVault: vaultId => ({
    type: actions.DELETE_VAULT,
    vaultId
  })
}

export { actions, creators }
