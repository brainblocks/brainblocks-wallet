import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'

import rootSaga from '~/state/actions'
import rootReducer from '~/state/reducers'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
	rootReducer,
	compose(composeWithDevTools(applyMiddleware(createLogger(), sagaMiddleware)))
)

sagaMiddleware.run(rootSaga)

export default store
