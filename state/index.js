import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { reducer as userReducer } from './user'

const combinedReducers = combineReducers({
  user: userReducer,
  orm: undefined,
  api: undefined
})

const initializeStore = () => {
  return createStore(
    combinedReducers,
    compose(composeWithDevTools(applyMiddleware(thunkMiddleware)))
  )
}

export { initializeStore, combinedReducers }
