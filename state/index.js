import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'

import authSaga from './actions/authActions'
import authReducer from '~/state/reducers/authReducer'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
	combineReducers({
		auth: authReducer
		// ui: undefined,
		// orm: undefined
	}),
	compose(composeWithDevTools(applyMiddleware(createLogger(), sagaMiddleware)))
)

sagaMiddleware.run(authSaga)

export default store
