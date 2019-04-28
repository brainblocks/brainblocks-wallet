import { tryStoreToken } from './auth'
import { makeApiRequest, makeAuthorizedApiRequest } from '~/state/helpers'

export async function register({ username, email, password, recaptcha }) {
  const { data } = await makeApiRequest({
    method: 'post',
    url: '/users',
    data: { username, email, password, recaptcha }
  })

  // Keep the auth token in localStorage
  tryStoreToken(data.token)

  return data
}

export async function verifyEmail(hash, verification) {
  const { data } = await makeAuthorizedApiRequest({
    method: 'post',
    url: '/users/rpc/verify-email',
    data: { hash, verification }
  })

  return data
}

export async function set2fa() {
  const { data } = await makeAuthorizedApiRequest({
    method: 'post',
    url: '/users/2fa'
  })

  return data
}

export async function confirm2fa(token2fa) {
  const { data } = await makeAuthorizedApiRequest({
    method: 'post',
    url: '/users/2fa/confirm',
    data: { token2fa }
  })

  return data
}

export async function disable2fa(token2fa) {
  const { data } = await makeAuthorizedApiRequest({
    method: 'delete',
    url: '/users/2fa',
    data: { token2fa }
  })

  return data
}

export async function resendVerificationEmail() {
  const { data } = await makeAuthorizedApiRequest({
    method: 'post',
    url: '/users/rpc/resend-verification-email'
  })

  return data
}

export async function updateUser(user) {
  const { data } = await makeAuthorizedApiRequest({
    method: 'patch',
    url: '/users',
    data: user
  })

  return data
}
