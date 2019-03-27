import { wallet, createWallet } from '~/state/wallet'
import { creators } from '~/state/actions/walletActions'
import { creators as accountCreators } from '~/state/actions/accountActions'
import { creators as uiCreators } from '~/state/actions/uiActions'
import { creators as vaultActions } from '~/state/actions/vaultActions'
import { password, destroyPassword } from '~/state/password'
import * as vaultAPI from '~/state/api/vault'

export const getVault = () => {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      // show we're working
      dispatch(uiCreators.addActiveProcess('load-wallet'))

      // get wallet from API
      let vault
      try {
        vault = await vaultAPI.getVault()
      } catch (e) {
        console.error('Error getting vault', e)
        reject(e)
      }

      // add to redux
      dispatch(vaultActions.updateVault(vault))

      // let ui know we're done
      dispatch(uiCreators.removeActiveProcess('load-wallet'))
    })
  }
}

export const getOrCreateWallet = () => {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      // show we're working
      dispatch(uiCreators.addActiveProcess('load-wallet'))

      // if ciphered wallet in localStorage
      if (localStorage.getItem(`__bb-ciphered-wallet-${userId}`)) {
        // get decryption key (via pin or not)
        // decrypt
        resolve(true)
      }

      // get wallet from API
      let encryptedWallet
      try {
        encryptedWallet = await walletAPI.getWallet()
      } catch (e) {
        console.error('Error getting wallet for user', e)
        reject(e)
      }

      // if this is a new wallet, name the default account
      // and save it
      if (!encryptedWallet) {
        const accounts = wallet.getAccounts()
        wallet.setLabel(accounts[0].account, 'Default Vault')
        try {
          await walletAPI.updateWallet()
        } catch (e) {
          console.warn('Error sending encrypted wallet to server')
          reject(e)
        }
      }

      // else if we have access to the password
      else if (password || true) {
        createWallet('1234') // @todo use login password

        // get wallet from API
        let encryptedWallet
        try {
          encryptedWallet = await walletAPI.getWallet()
        } catch (e) {
          console.error('Error getting wallet for user', e)
          reject(e)
        }
        // decrypt
        wallet.createWallet(encryptedWallet)

        // if this is a new wallet, name the default account
        // and save it
        if (!encryptedWallet) {
          const accounts = wallet.getAccounts()
          wallet.setLabel(accounts[0].account, 'Default Vault')
          try {
            await walletAPI.updateWallet()
          } catch (e) {
            console.warn('Error sending encrypted wallet to server')
            reject(e)
          }
        }
      }

      // else logout? (in future just prompt to retype password)
      else {
      }

      // populate accounts in store
      const accounts = wallet.getAccounts()
      accounts.forEach(acc => {
        dispatch(accountCreators.createAccount(acc))
      })

      // destroy the password
      destroyPassword()

      // let ui know we're done
      dispatch(uiCreators.removeActiveProcess('load-wallet'))

      resolve(true)
    })
  }
}
