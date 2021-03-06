// @flow
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

const redirectUnauthorized = (res, path) => {
  const target =
    path === '/' ? '/login' : `/login?redirectTo=${encodeURIComponent(path)}`
  if (res) {
    res.writeHead(302, {
      Location: target
    })
    res.end()
  } else {
    Router.push(target)
  }
  return {}
}

/**
 * Gets the auth and user info on every page load
 * Run on server for new page loads, and client
 * for page transitions
 */
export const bootstrapInitialProps: (
  ctx: NextJSContext
) => Promise<Object> = async ctx => {
  const { reduxStore, res, pathname, asPath } = ctx
  if (!ctx.hasOwnProperty('reduxStore')) {
    throw new Error('No Redux Store in bootstrapInitialProps')
  }
  // $FlowFixMe
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
      redirectUnauthorized(res, asPath)
    }
  }

  return props
}
