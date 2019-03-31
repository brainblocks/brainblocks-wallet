/* @flow */
import Router from 'next/router'
import nextCookie from 'next-cookies'
import { creators as authActions } from '~/state/actions/authActions'
import { creators as uiActions } from '~/state/actions/uiActions'
import * as AuthAPI from '~/state/api/auth'
import { getIsAuthorized } from '~/state/selectors/authSelectors'
import type { NextJSContext } from '~/types'

const redirectUnauthorized = res => {
  if (res) {
    res.writeHead(302, {
      Location: '/login'
    })
    res.end()
  } else {
    Router.push('/login')
  }
  return {}
}

/**
 * Gets the auth and user info on every page load
 * Run on server for new page loads, and client
 * for page transitions
 */
export const bootstrapInitialProps = async (ctx: NextJSContext) => {
  const { reduxStore, res, pathName } = ctx
  const { dispatch, getState } = reduxStore
  const props = {}

  const state = getState()
  const isAuthorized = getIsAuthorized(state)

  // Get the token from the cookie
  const { token } = nextCookie(ctx)

  // log token
  console.log(token)

  if (!isAuthorized) {
    try {
      // Authenticate (also gets user)
      const authData = await AuthAPI.init(token)

      // Update redux store (auth + user)
      dispatch(authActions.update(authData))
    } catch (err) {
      console.warn('Auth error:', err)
      return props
      /*if (pathName !== '/login') {
        redirectUnauthorized(res)
      }*/
    }
  }

  // Add UI process (server only)
  if (res) {
    dispatch(uiActions.addActiveProcess('hydrating'))
  }

  return props
}
