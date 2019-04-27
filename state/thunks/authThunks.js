import { creators } from '~/state/actions/authActions'
import { destroyWallet } from '~/state/wallet'
import { getWs, closeWs } from '~/state/websocket'
import * as authAPI from '~/state/api/auth'

export const logout = () => (dispatch, getState) => {
  return new Promise(async (resolve, reject) => {
    // cache the token
    const { auth } = getState()
    const token = auth.token

    // destroy the wallet
    destroyWallet()

    // close the websocket connection
    if (getWs()) {
      closeWs()
    }

    // redux state reset
    dispatch(creators.logout())

    // remove cookie and invalidate token on server
    try {
      console.log(token)
      await authAPI.logout(token)
    } catch (e) {
      console.error('Error in logout request', e)
    }

    resolve(true)
  })
}
