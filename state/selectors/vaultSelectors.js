// @flow
import { createSelector } from 'reselect'

const vaultSelector = state => state.vault

export const getVault = createSelector(
  vaultSelector,
  vault => vault
)

export const getCipheredWallet = createSelector(
  getVault,
  vault => vault.wallet
)
