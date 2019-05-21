// @flow
import { creators } from '~/state/actions/authActions'
import * as authAPI from '~/state/api/auth'
import log from '~/functions/log'
import type { ThunkAction } from '~/types/reduxTypes'

export const logout: () => ThunkAction = () => async (dispatch, getState) => {
  // send the logout request _before_ we reset redux/auth
  try {
    await authAPI.logout()
  } catch (e) {
    log.error('Error in logout request', e)
  }

  dispatch(creators.logout())

  // rather than use the router, simply redirecting
  // is a safe way to close the websocket, destroy the
  // wallet, reset redux and delete and any other sensitive
  // cached data
  !!window && window.location.replace('/login')
}
