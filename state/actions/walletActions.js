// @flow
const actions = {
  CREATE_WALLET: 'WALLET::CREATE_WALLET',
  UPDATE_WALLET: 'WALLET::UPDATE_WALLET'
}

const creators = {
  createWallet: (payload = {}) => ({
    type: actions.CREATE_WALLET,
    payload
  }),
  updateWallet: (payload = {}) => ({
    type: actions.UPDATE_WALLET,
    payload
  })
}

export { actions, creators }
