import { wallet, createWallet } from '~/state/wallet'
import { creators } from '~/state/actions/walletActions'
import { creators as vaultCreators } from '~/state/actions/vaultActions'
import { getWallet } from '~/state/selectors/walletSelectors'
import * as walletAPI from '~/state/api/wallet'

/*
export const createWallet = password => {
  return (dispatch, getState) => {
    const wallet = new Wallet(password)
    wallet.createWallet()
    dispatch(creators.createWallet({ name: 'my new wallet' }))
    const hex = wallet.pack()
    return wallet
  }
}
*/

export const getOrCreateWallet = password => {
  return async (dispatch, getState) => {
    // instantiate wallet class
    if (!wallet) {
      createWallet(password)
    }

    // get encrypted wallet from server
    let encryptedWallet
    try {
      encryptedWallet = await walletAPI.getWallet('blah')
    } catch (e) {
      throw 'Error getting wallet for user'
    }

    // create the rai wallet
    wallet.createWallet(encryptedWallet || null)

    // get the vaults (accounts)
    const accounts = wallet.getAccounts()

    // create the vaults in redux
    accounts.forEach(acc => {
      dispatch(vaultCreators.createVault(acc))
    })

    /*const state = getState()
    let wallet = getWallet(state)
    if (!wallet) {
      wallet = new Wallet(password)
      wallet.createWallet()
      dispatch(creators.createWallet({
        vaults: []
      }))
      const hex = wallet.pack()
      console.log(wallet)
    }*/
  }
}

export const addVault = () => {
  return (dispatch, getState) => {
    const key = wallet.newKeyFromSeed()
    const accounts = wallet.getAccounts()
    const filtered = accounts.filter(acc => acc.account === key)
    const account = filtered.length ? filtered[0] : null
    if (account) {
      dispatch(vaultCreators.createVault(account))
    } else {
      throw 'Hmm, something weird...'
    }
  }
}
