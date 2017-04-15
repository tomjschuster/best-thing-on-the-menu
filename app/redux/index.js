import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { auth as authActions } from './actions'

const reducer = combineReducers({
  auth: require('./ducks/auth').default,
  users: require('./ducks/users').default,
  places: require('./ducks/places').default,
  currentPlace: require('./ducks/currentPlace').default,
  reviews: require('./ducks/reviews').default,
  items: require('./ducks/items').default,
  ux: require('./ducks/ux').default,
  forms: require('./ducks/forms').default,
  errors: require('./ducks/errors').default
})


const store = createStore(reducer, applyMiddleware(logger(), thunk))
// store.dispatch(authActions.checkAuth)
export actions from './actions'
export default store
// export default createStoreWithMiddleware(reducer, initialState)
