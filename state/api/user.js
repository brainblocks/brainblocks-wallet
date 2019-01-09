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

export async function resendVerificationEmail() {
  const { data } = await makeAuthorizedApiRequest({
    method: 'post',
    url: '/users/rpc/resend-verification-email'
  })

  return data
}
