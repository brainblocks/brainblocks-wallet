import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { Component } from 'react'
import getConfig from 'next/config'

import rootReducer from '~/state/reducers'

const { publicRuntimeConfig } = getConfig()
const { NODE_ENV, DEBUG } = publicRuntimeConfig

export const isServer = typeof window === 'undefined'
export const isDevelopment = NODE_ENV === 'development'

// Internal cache of the store for client side applications
let clientSideStore

function initializeStore(initialState) {
  const middleware = []

  // Redux thunk
  middleware.push(thunk)

  if (DEBUG && isDevelopment && !isServer) {
    middleware.push(createLogger({ collapsed: true }))
  }

  let appliedMiddleware = applyMiddleware(...middleware)

  if (isDevelopment) {
    appliedMiddleware = compose(composeWithDevTools(appliedMiddleware))
  }

  const store = createStore(rootReducer, initialState, appliedMiddleware)

  return store
}

function getOrCreateStore(initialState) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return initializeStore(initialState)
  }

  // Create store if one hasn't already been for this client
  if (!clientSideStore) {
    clientSideStore = initializeStore(initialState)
  }

  return clientSideStore
}

export function getClientSideStore() {
  // Ensure if we're calling this from the server to not return a store
  if (isServer) {
    return undefined
  }

  return clientSideStore
}

export function withReduxStore(App) {
  return class AppWithRedux extends Component {
    static async getInitialProps(appContext) {
      // Get or Create the store with `undefined` as initialState
      // This allows you to set a custom default initialState
      const reduxStore = getOrCreateStore()

      // Provide the store to getInitialProps of pages
      appContext.ctx.reduxStore = reduxStore

      let appProps = {}
      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps(appContext)
      }

      return {
        ...appProps,
        initialReduxState: reduxStore.getState()
      }
    }

    constructor(props) {
      super(props)
      this.reduxStore = getOrCreateStore(props.initialReduxState)
    }

    render() {
      return <App {...this.props} reduxStore={this.reduxStore} />
    }
  }
}
