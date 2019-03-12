import { wallet, createWallet } from '~/state/wallet'
import { creators } from '~/state/actions/walletActions'
import { creators as accountCreators } from '~/state/actions/accountActions'
import { creators as uiCreators } from '~/state/actions/uiActions'
import { password, destroyPassword } from '~/state/password'
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

export const getOrCreateWallet = userId => {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      // show we're working
      dispatch(uiCreators.addActiveProcess('load-wallet'))

      // if ciphered wallet in localStorage
      if (localStorage.getItem(`__bb-ciphered-wallet-${userId}`)) {
        // get decryption key (via pin or not)
        // decrypt
      }

      // else if we have access to the password
      else if (password || true) {
        createWallet('1234') // @todo use login password

        // get wallet from API
        let encryptedWallet
        try {
          encryptedWallet = await walletAPI.getWallet(userId)
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

// When we have both hot and cold wallets, this
// function will need to account for that
export const addAccount = accountSettings => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      const key = wallet.newKeyFromSeed()
      if (typeof accountSettings.label === 'string') {
        wallet.setLabel(key, accountSettings.label)
      }
      if (typeof accountSettings.color === 'string') {
        // need a function on the wallet to add a colour
      }
      const accounts = wallet.getAccounts()
      const filtered = accounts.filter(acc => acc.account === key)
      const account = filtered.length ? filtered[0] : null
      if (account) {
        dispatch(
          accountCreators.createAccount({
            ...account,
            // this will be unnecessary once the wallet has a setColour function
            color: accountSettings.color,
            balance: 12
          })
        )
        resolve(account)
      } else {
        reject('Something is wrong with the wallet accounts')
      }
    })
  }
}
