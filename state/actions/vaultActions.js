// @flow
import type { UpdateVaultAction } from '~/types/reduxTypes'

const actions = {
  UPDATE: 'VAULT::UPDATE'
}

type Creators = {
  updateVault: Object => UpdateVaultAction
}

const creators: Creators = {
  updateVault: (payload: Object) => ({
    type: actions.UPDATE,
    payload
  })
}

export { actions, creators }
