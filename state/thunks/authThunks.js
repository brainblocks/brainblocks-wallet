// @flow
import { creators } from '~/state/actions/authActions'
import { destroyWallet } from '~/state/wallet'
import { getWs, closeWs } from '~/state/websocket'
import * as authAPI from '~/state/api/auth'
import Router from 'next/router'
import log from '~/functions/log'
import type { ThunkAction } from '~/types/reduxTypes'

export const logout: () => ThunkAction = () => async (dispatch, getState) => {
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
    log.error('Error in logout request', e)
  }

  Router.push('/login')
}
