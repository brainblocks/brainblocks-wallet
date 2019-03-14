import { creators } from '~/state/actions/transactionActions'
import { creators as uiCreators } from '~/state/actions/uiActions'
import * as transactionsAPI from '~/state/api/transactions'
import { wallet, populateChains, blockToReduxTx } from '~/state/wallet'

export const importChains = () => (dispatch, getState) => {
  return new Promise(async (resolve, reject) => {
    const time = Date.now()
    const state = getState()
    const accounts = state.accounts.allIds

    // show we're working
    dispatch(uiCreators.addActiveProcess(`get-chains-${time}`))

    // get the chains from the BB API
    let accountsObject
    try {
      const res = await transactionsAPI.getChains(accounts)
      accountsObject = res.accounts
      // for testing, replace one of the sample accounts with one from our own wallet
      // and remove the rest
      accountsObject[accounts[0]] = {
        ...accountsObject.xrb_1zcwez9jgisedk6hnwwt9m6az4cfnhqehgdqo149i4dqsdjozbfasnqb856h
      }
      Object.keys(accountsObject).forEach(acc => {
        if (!accounts.includes(acc)) delete accountsObject[acc]
      })
    } catch (e) {
      dispatch(uiCreators.removeActiveProcess(`get-chains-${time}`))
      reject('Error getting chains', e)
    }

    // put them into the wallet
    const reduxTxs = populateChains(accountsObject)
    dispatch(creators.bulkAddTransactions(reduxTxs))

    dispatch(uiCreators.removeActiveProcess(`get-chains-${time}`))
    resolve()
  })
}
