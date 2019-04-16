import nextCookie from 'next-cookies'
import cookie from 'js-cookie'
import {
  makeApiRequest,
  makeAuthorizedApiRequest,
  getAuthToken
} from '~/state/helpers'
import { isServer } from '~/state'

// Safely attempts to lookup and return the auth token cookie
export function tryLoadToken() {
  try {
    if (isServer) return undefined

    return cookie.get('token')
  } catch (e) {
    console.warn('Error while reading token from cookie', e)
    return undefined
  }
}

// Safely attempts to store an auth token cookie
export function tryStoreToken(token: string) {
  try {
    if (isServer) return

    cookie.set('token', token, { expires: 7 })
  } catch (e) {
    console.warn('Error while writing authToken to cookie', e)
  }
}

// Safely attempts to delete the auth token cookie
export function tryDeleteToken() {
  try {
    if (isServer) return

    cookie.remove('token')
  } catch (e) {
    console.warn('Error while deleting authToken from cookie', e)
  }
}

// Isomorphic function to get auth data
export async function init(token) {
  let authToken = token || tryLoadToken()

  if (authToken) {
    const { data } = await makeApiRequest({
      method: 'get',
      url: `/auth`,
      headers: {
        'x-auth-token': authToken
      }
    })

    // Attempt to re-store the toekn from the response in case it's updated
    tryStoreToken(data.token)

    return data
  }
  return false
}

export async function login(username, password, recaptcha, mfaCode) {
  // First perform the login to receive an auth token
  let { data } = await makeApiRequest({
    method: 'post',
    url: '/auth',
    data: { username, password, recaptcha, token2fa: mfaCode }
  })

  // Keep the auth token in a cookie
  tryStoreToken(data.token)

  return data
}

export async function logout(token) {
  // Immediately remove the token from the cookie
  cookie.remove('token')

  // Attempt to make the proper call to the backend as well
  if (!token) {
    token = tryLoadToken() || getAuthToken()
  }
  if (token) {
    const { data } = await makeAuthorizedApiRequest({
      token,
      method: 'delete',
      url: '/auth',
      data: { token }
    })

    return data
  }
}

export async function verifyPassword(password) {
  try {
    let { data } = await makeAuthorizedApiRequest({
      method: 'post',
      url: '/auth/validatepwd',
      data: { password }
    })
    return true
  } catch (e) {
    console.error('Could not validate password', e)
    return false
  }
}
