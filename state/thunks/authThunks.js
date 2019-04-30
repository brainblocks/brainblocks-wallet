import { creators } from '~/state/actions/authActions'
import { destroyWallet } from '~/state/wallet'
import { getWs, closeWs } from '~/state/websocket'
import * as authAPI from '~/state/api/auth'
import Router from 'next/router'

export const logout = () => async (dispatch, getState) => {
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
    await authAPI.logout(token)
  } catch (e) {
    console.error('Error in logout request', e)
  }

  Router.push('/login')
}
