// @flow
import { makeLocalApiRequest, makeAuthorizedApiRequest } from './helpers'

type RegisterObj = {
  username: string,
  email: string,
  password: string,
  recaptcha: string
}

export async function register({
  username,
  email,
  password,
  recaptcha
}: RegisterObj): Promise<Object> {
  const { data } = await makeLocalApiRequest({
    method: 'post',
    url: '/users',
    data: { username, email, password, recaptcha }
  })

  return data
}

export async function verifyEmail(
  hash: string,
  verification: string
): Promise<Object> {
  const { data } = await makeAuthorizedApiRequest({
    method: 'post',
    url: '/users/rpc/verify-email',
    data: { hash, verification }
  })

  return data
}

export async function set2fa(): Promise<Object> {
  const { data } = await makeAuthorizedApiRequest({
    method: 'post',
    url: '/users/2fa'
  })

  return data
}

export async function confirm2fa(token2fa: string): Promise<Object> {
  const { data } = await makeAuthorizedApiRequest({
    method: 'post',
    url: '/users/2fa/confirm',
    data: { token2fa }
  })

  return data
}

export async function disable2fa(token2fa: string): Promise<Object> {
  const { data } = await makeAuthorizedApiRequest({
    method: 'delete',
    url: '/users/2fa',
    data: { token2fa }
  })

  return data
}

export async function resendVerificationEmail(): Promise<Object> {
  const { data } = await makeAuthorizedApiRequest({
    method: 'post',
    url: '/users/rpc/resend-verification-email'
  })

  return data
}

export async function updateUser(user: Object): Promise<Object> {
  const { data } = await makeAuthorizedApiRequest({
    method: 'patch',
    url: '/users',
    data: user
  })

  return data
}

export async function enableIpAuth(user: Object): Promise<Object> {
  const { data } = await makeAuthorizedApiRequest({
    method: 'post',
    url: '/users/ipauth/enable'
  })

  return data
}
