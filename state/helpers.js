import { getClientSideStore } from '~/state'
import orm from '~/state/models'
import axios from 'axios'
import produce from 'immer'
import { BASE_API_URL } from '~/constants'

export function getAuthToken() {
  const store = getClientSideStore()
  if (!store) return undefined

  const state = store.getState()
  if (!state) return undefined

  const session = orm.session(state.orm)
  const { Auth } = session

  const currentAuth = Auth.withId('me')
  if (!currentAuth) return undefined

  return currentAuth.authToken
}

export function makeApiRequest(opts = {}) {
  return axios(
    produce(opts, draft => {
      draft.baseURL = BASE_API_URL
    })
  )
}

export function makeAuthorizedApiRequest(opts = {}, shouldThrow = true) {
  const authToken = getAuthToken()

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
