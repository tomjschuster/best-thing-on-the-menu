const branches = {
  auth: require('./branches/auth').default,
  users: require('./branches/users').default,
  places: require('./branches/places').default,
  currentPlace: require('./branches/currentPlace').default,
  reviews: require('./branches/reviews').default,
  items: require('./branches/items').default,
  ux: require('./branches/ux').default,
  forms: require('./branches/forms').default,
  google: require('./branches/google').default,
  errors: require('./branches/errors').default
}


const createReducer = ({ initialState, actionHandler }) => {
  return (state = initialState, action) => {
    const reduceFn = actionHandler[action.type]
    if (!reduceFn) { return state }
    return reduceFn(state, action)
  }
}

export default
  Object
    .keys(branches)
    .reduce((reducers, branch) => ({
      ...reducers, [branch]: createReducer(branches[branch])
    }), {})

