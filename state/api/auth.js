/* @flow */
import {
  makeApiRequest,
  makeLocalApiRequest,
  makeLocalAuthorizedApiRequest,
  makeAuthorizedApiRequest,
  getAuthToken
} from './helpers'

// Runs in `getInitialProps` only
export async function init(token) {
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
export async function login(username, password, recaptcha, mfaCode) {
  let { data } = await makeLocalApiRequest({
    method: 'post',
    url: '/auth',
    data: { username, password, recaptcha, token2fa: mfaCode }
  })

  return data
}

export async function logout() {
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

export async function verifyPassword(password) {
  try {
    await makeAuthorizedApiRequest({
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
