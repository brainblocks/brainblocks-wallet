import { creators } from '~/state/actions/accountActions'
import { creators as uiCreators } from '~/state/actions/uiActions'
import * as accountsAPI from '~/state/api/accounts'

export const updateAccount = account => (dispatch, getState) => {
  return new Promise(async (resolve, reject) => {
    // show we're working
    dispatch(
      uiCreators.addActiveProcess(`update-account-${JSON.stringify(account)}`)
    )

    // update in redux
    dispatch(creators.updateAccount(account))

    // update on server
    let updatedAccount
    try {
      updatedAccount = await accountsAPI.updateAccount()
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
