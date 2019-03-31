import getConfig from 'next/config'
import { getClientSideStore, isServer } from '~/state'
import axios from 'axios'
import produce from 'immer'

const { publicRuntimeConfig } = getConfig()
const { BASE_API_URL, LOCAL_API } = publicRuntimeConfig

export function getAuthToken() {
  const store = getClientSideStore()
  if (!store) return undefined

  const state = store.getState()
  if (!state) return undefined

  const currentAuth = state.auth
  if (!currentAuth) return undefined

  return currentAuth.token
}

export function makeApiRequest(opts = {}) {
  // determine if the call is from the server
  const baseURL = ''

  if (isServer) {
    baseURL = LOCAL_API
  } else {
    baseURL = BASE_API_URL
  }

  return axios(
    produce(opts, draft => {
      draft.baseURL = baseURL
    })
  )
}

export function makeAuthorizedApiRequest(opts = {}, shouldThrow = true) {
  const authToken = opts.token || getAuthToken()
  delete opts.token

  if (shouldThrow && !authToken) {
    // TODO: We should consider making this an auth specific error
    throw new Error('No auth token set')
  }

  return makeApiRequest(
    produce(opts, draft => {
      draft['headers'] = draft['headers'] || {}
      draft['headers']['x-auth-token'] = authToken
    })
  )
}
