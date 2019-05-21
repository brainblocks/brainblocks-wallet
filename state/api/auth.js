/* @flow */
import log from '~/functions/log'
import {
  makeApiRequest,
  makeLocalApiRequest,
  makeLocalAuthorizedApiRequest,
  makeAuthorizedApiRequest,
  getAuthToken
} from './helpers'

// Runs in `getInitialProps` only
export async function init(token: string): Promise<Object> {
  if (!token) {
    throw new Error('No token passed')
  }

  const { data } = await makeApiRequest({
    method: 'get',
    url: `/auth`,
    headers: {
      'x-auth-token': token
    }
  })

  return data
}

// Runs client-side only, requests from the next server (not API server)
export async function login(
  username: string,
  password: string,
  recaptcha: string,
  mfaCode: string
): Promise<Object> {
  let { data } = await makeLocalApiRequest({
    method: 'post',
    url: '/auth',
    data: { username, password, recaptcha, token2fa: mfaCode }
  })

  return data
}

export async function logout(): Promise<Object> {
  const token = getAuthToken()
  if (token) {
    // response header unsets cookie
    const { data } = await makeLocalAuthorizedApiRequest({
      method: 'delete',
      url: '/auth',
      data: { token }
    })

    return data
  } else {
    throw new Error('Could not logout - no token found')
  }
}

export async function verifyPassword(password: string): Promise<boolean> {
  try {
    await makeAuthorizedApiRequest({
      method: 'post',
      url: '/auth/validatepwd',
      data: { password }
    })
    return true
  } catch (e) {
    log.error('Could not validate password', e)
    return false
  }
}
