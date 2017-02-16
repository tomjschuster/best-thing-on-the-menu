import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import reducer from './reducer'

export default createStore(reducer, applyMiddleware(logger(), thunk))
// export default createStoreWithMiddleware(reducer, initialState)
export actions from './actions'
