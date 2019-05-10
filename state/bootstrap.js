/* @flow */
import Router from 'next/router'
import getConfig from 'next/config'
import nextCookie from 'next-cookies'
import { creators as authActions } from '~/state/actions/authActions'
import { creators as uiActions } from '~/state/actions/uiActions'
import * as AuthAPI from '~/state/api/auth'
import { getIsAuthorized } from '~/state/selectors/authSelectors'
import type { NextJSContext } from '~/types'

const { publicRuntimeConfig } = getConfig()
const { AUTH_TOKEN_COOKIE_KEY } = publicRuntimeConfig

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
  const { reduxStore, res, pathname } = ctx
  const { dispatch, getState } = reduxStore
  const props = {}

  const state = getState()
  let isAuthorized = getIsAuthorized(state)

  // If we're on the server
  if (res) {
    // Add UI process
    dispatch(uiActions.addActiveProcess('hydrating'))
    // Get the token from the cookie
    const cookie = nextCookie(ctx)
    const token = cookie[AUTH_TOKEN_COOKIE_KEY]
    // Authorize
    if (token) {
      try {
        const authData = await AuthAPI.init(token)

        if (authData) {
          isAuthorized = true
          // Update redux store (auth + user)
          dispatch(authActions.update(authData))
        }
      } catch (err) {
        isAuthorized = false
      }
    } else {
      isAuthorized = false
    }
  }

  // redirect if still not authorized
  if (!isAuthorized) {
    if (pathname !== '/login') {
      redirectUnauthorized(res)
    }
  }

  return props
}
