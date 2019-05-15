// @flow
import { createSelector } from 'reselect'
import type { VaultState, ReduxState } from '~/types/reduxTypes'

const vaultSelector = state => state.vault

export const getVault: ReduxState => VaultState = createSelector(
  vaultSelector,
  vault => vault
)

export const getCipheredWallet: ReduxState => string = createSelector(
  getVault,
  vault => vault.wallet
)
