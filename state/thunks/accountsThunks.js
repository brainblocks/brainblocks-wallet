import { creators } from '~/state/actions/accountActions'
import { creators as uiCreators } from '~/state/actions/uiActions'
import * as accountsAPI from '~/state/api/accounts'
import { wallet, syncVault } from '~/state/wallet'

export const updateAccount = account => (dispatch, getState) => {
  return new Promise(async (resolve, reject) => {
    // show we're working
    dispatch(
      uiCreators.addActiveProcess(`update-account-${JSON.stringify(account)}`)
    )

    // update in redux
    dispatch(creators.updateAccount(account))

    let updatedAccount
    try {
      // update in wallet
      if (account.label) wallet.setLabel(account.account, account.label)
      if (account.color) wallet.setColor(account.account, account.color)
      await syncVault()

      // update on server
      updatedAccount = await accountsAPI.updateAccount(account)
      resolve()
    } catch (e) {
      dispatch(
        uiCreators.removeActiveProcess(
          `update-account-${JSON.stringify(account)}`
        )
      )
      reject('Error updating account')
    }

    dispatch(
      uiCreators.removeActiveProcess(
        `update-account-${JSON.stringify(account)}`
      )
    )
    resolve(updatedAccount)
  })
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
        wallet.setColor(key, accountSettings.color)
      }
      const accounts = wallet.getAccounts()
      const filtered = accounts.filter(acc => acc.account === key)
      const account = filtered.length ? filtered[0] : null
      if (!account) {
        reject('Something is wrong with the wallet accounts')
      }
      try {
        // add the account to redux
        dispatch(creators.createAccount(account))
        // call the updateAccount thunk to handle updating
        // on the server
        dispatch(updateAccount(account))
        resolve(account)
      } catch (e) {
        console.error('Error in addAccount', e)
        reject('Could not add the new account')
      }
    })
  }
}
