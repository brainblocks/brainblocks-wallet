// @flow
import getConfig from 'next/config'
import { getClientSideStore, isServer } from '~/state'
import axios from 'axios'

const { publicRuntimeConfig } = getConfig()
const { BASE_API_URL, LOCAL_API, BASE_API_URL_SERVERSIDE } = publicRuntimeConfig

export function getAuthToken(): ?string {
  const store = getClientSideStore()
  if (!store) return undefined

  const state = store.getState()
  if (!state) return undefined

  const currentAuth = state.auth
  if (!currentAuth) return undefined

  return currentAuth.token
}

export function makeApiRequest(opts: Object = {}): Promise<Object> {
  let baseURL = BASE_API_URL

  if (isServer) {
    baseURL = BASE_API_URL_SERVERSIDE
  }

  return axios({
    baseURL,
    ...opts
  })
}

export function makeLocalApiRequest(opts: Object = {}): Promise<Object> {
  return axios({
    baseURL: LOCAL_API,
    ...opts
  })
}

function authorizedRequest(
  opts: Object = {},
  shouldThrow: ?boolean = true,
  local: boolean
): Promise<Object> {
  const authToken = getAuthToken()

  if (shouldThrow && !authToken) {
    // TODO: We should consider making this an auth specific error
    throw new Error('No auth token set')
  }

  const options = {
    headers: {},
    ...opts
  }
  options.headers['x-auth-token'] = authToken

  if (local) {
    return makeLocalApiRequest(options)
  } else {
    return makeApiRequest(options)
  }
}

export function makeAuthorizedApiRequest(
  opts: Object,
  shouldThrow: ?boolean
): Promise<Object> {
  return authorizedRequest(opts, shouldThrow, false)
}

export function makeLocalAuthorizedApiRequest(
  opts: Object,
  shouldThrow: ?boolean
): Promise<Object> {
  return authorizedRequest(opts, shouldThrow, true)
}
