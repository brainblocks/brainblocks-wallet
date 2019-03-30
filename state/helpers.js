import getConfig from 'next/config'
import { getClientSideStore } from '~/state'
import axios from 'axios'
import produce from 'immer'

const { publicRuntimeConfig } = getConfig()
const { BASE_API_URL } = publicRuntimeConfig

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
  return axios(
    produce(opts, draft => {
      draft.baseURL = BASE_API_URL
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
