import { wallet, createWallet } from '~/state/wallet'
import { creators } from '~/state/actions/walletActions'
import { creators as accountCreators } from '~/state/actions/accountActions'
import { creators as uiCreators } from '~/state/actions/uiActions'
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
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      // show we're working
      dispatch(uiCreators.addActiveProcess('create-wallet'))

      // instantiate wallet class
      if (!wallet) {
        createWallet(password)
      }

      // get encrypted wallet from server
      let encryptedWallet
      try {
        encryptedWallet = await walletAPI.getWallet('blah')
      } catch (e) {
        reject('Error getting wallet for user')
      }

      // create the rai wallet
      wallet.createWallet(encryptedWallet || null)

      // if this is a new wallet, name the default account
      // and save it
      if (!encryptedWallet) {
        const accounts = wallet.getAccounts()
        wallet.setLabel(accounts[0].account, 'Default Vault')
        try {
          await walletAPI.updateWallet()
        } catch (e) {
          reject('Error sending encrypted wallet to server')
        }
      }

      // get the accounts
      const accounts = wallet.getAccounts()

      // create the accounts in redux
      accounts.forEach(acc => {
        dispatch(accountCreators.createAccount(acc))
      })

      dispatch(uiCreators.removeActiveProcess('create-wallet'))

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
