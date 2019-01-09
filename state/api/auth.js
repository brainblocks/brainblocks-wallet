import {
  makeApiRequest,
  makeAuthorizedApiRequest,
  getAuthToken
} from '~/state/helpers'
import { LOCAL_STORAGE_AUTH_TOKEN_KEY } from '~/constants'
import { isServer } from '~/state'

// Safely attempts to lookup and return the auth token from localStorage
export function tryLoadToken() {
  try {
    if (isServer) return undefined

    return window.localStorage[LOCAL_STORAGE_AUTH_TOKEN_KEY]
  } catch (e) {
    console.warn('Error while reading token from localStorage', e)
    return undefined
  }
}

// Safely attempts to store an auth token to localStorage
export function tryStoreToken(token: string) {
  try {
    if (isServer) return

    window.localStorage[LOCAL_STORAGE_AUTH_TOKEN_KEY] = token
  } catch (e) {
    console.warn('Error while writting authToken to localStorage', e)
  }
}

// Safely attempts to delete the auth token from localStorage
export function tryDeleteToken() {
  try {
    if (isServer) return

    delete window.localStorage[LOCAL_STORAGE_AUTH_TOKEN_KEY]
  } catch (e) {
    console.warn('Error while deleting authToken from localStorage', e)
  }
}

export async function init() {
  let authToken = tryLoadToken()

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

export async function login(username, password, recaptcha) {
  // First perform the login to receive an auth token
  let { data } = await makeApiRequest({
    method: 'post',
    url: '/auth',
    data: { username, password, recaptcha }
  })

  // Keep the auth token in localStorage
  tryStoreToken(data.token)

  return data
}

export async function logout() {
  let token = getAuthToken()

  // Immediately remove the token from localstorage
  tryDeleteToken()

  // Attempt to make the proper call to the backend as well
  const { data } = await makeAuthorizedApiRequest({
    method: 'delete',
    url: '/auth',
    data: { token }
  })

  return data
}
