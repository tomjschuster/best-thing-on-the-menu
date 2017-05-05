import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import reducers from './reducers'

export default createStore(
    combineReducers(reducers),
    // applyMiddleware(logger(), thunk)
    applyMiddleware(thunk)
  )

export actions from './actions'
