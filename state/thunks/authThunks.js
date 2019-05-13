import { creators } from '~/state/actions/authActions'
import { destroyWallet } from '~/state/wallet'
import { getWs, closeWs } from '~/state/websocket'
import * as authAPI from '~/state/api/auth'
import Router from 'next/router'

export const logout = () => async (dispatch, getState) => {
  // send the logout request _before_ we reset redux/auth
  const logoutReq = authAPI.logout()

  // destroy the wallet
  destroyWallet()

  // close the websocket connection
  if (getWs()) {
    closeWs()
  }

  // redux state reset
  dispatch(creators.logout())

  // await the logout request - invalidate token on server, response header unsets cookie
  try {
    await logoutReq
  } catch (e) {
    console.error('Error in logout request', e)
  }

  Router.push('/login')
}
