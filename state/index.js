import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'

import authSaga from './actions/authActions'
import authReducer from '~/state/reducers/authReducer'

const combinedReducers = combineReducers({
  auth: authReducer
  // ui: undefined,
  // orm: undefined
})

const initializeStore = () => {
  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(combinedReducers, applyMiddleware(sagaMiddleware))

  sagaMiddleware.run(authSaga)

  return store
}

export { initializeStore, combinedReducers }
