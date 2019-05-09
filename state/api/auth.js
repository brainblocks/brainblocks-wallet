/* @flow */
import {
  makeApiRequest,
  makeLocalApiRequest,
  makeAuthorizedApiRequest,
  getAuthToken
} from '~/state/helpers'

// Runs in `getInitialProps` only
export async function init(token) {
  if (token) {
    const { data } = await makeApiRequest({
      method: 'get',
      url: `/auth`,
      headers: {
        'x-auth-token': token
      }
    })

    return data
  }
  return false
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

export async function logout(token) {
  // Attempt to make the proper call to the backend as well
  if (!token) {
    token = getAuthToken()
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
