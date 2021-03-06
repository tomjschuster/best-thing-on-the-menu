import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

export const branches = {
  auth: require('./auth').default,
  currentPlace: require('./currentPlace').default,
  errors: require('./errors').default,
  forms: require('./forms').default,
  google: require('./google').default,
  items: require('./items').default,
  places: require('./places').default,
  reviews: require('./reviews').default,
  users: require('./users').default,
  ux: require('./ux').default
}

export const actions = Object.values(branches).reduce(
  (actions, branch) => ({ ...actions, ...branch.actions }),
  {}
)

const createReducer = ({ initialState, actionHandler: handler }) => (
  state = initialState,
  action
) => (handler[action.type] ? handler[action.type](state, action) : state)

export const reducers = Object.keys(branches).reduce(
  (reducers, branch) => ({
    ...reducers,
    [branch]: createReducer(branches[branch])
  }),
  {}
)

export default createStore(
  combineReducers(reducers),
  applyMiddleware(createLogger(), thunk)
)
