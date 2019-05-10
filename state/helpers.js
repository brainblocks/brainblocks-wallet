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
  return axios(
    produce(opts, draft => {
      draft.baseURL = BASE_API_URL
    })
  )
}

export function makeLocalApiRequest(opts = {}) {
  return axios(
    produce(opts, draft => {
      draft.baseURL = LOCAL_API
    })
  )
}

function authorizedRequest(opts = {}, shouldThrow = true, local) {
  const authToken = getAuthToken()

  if (shouldThrow && !authToken) {
    // TODO: We should consider making this an auth specific error
    throw new Error('No auth token set')
  }

  const options = produce(opts, draft => {
    draft['headers'] = draft['headers'] || {}
    draft['headers']['x-auth-token'] = authToken
  })

  if (local) {
    return makeLocalApiRequest(options)
  } else {
    return makeApiRequest(options)
  }
}

export function makeAuthorizedApiRequest(opts, shouldThrow) {
  return authorizedRequest(opts, shouldThrow, false)
}

export function makeLocalAuthorizedApiRequest(opts, shouldThrow) {
  return authorizedRequest(opts, shouldThrow, true)
}
