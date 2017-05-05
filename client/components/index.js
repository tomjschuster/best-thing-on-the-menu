import { connect } from 'react-redux'
import { actions } from '../redux'
const wrapComponent = component => connect(state => state, actions)(component)

console.log('actions', actions)

const components = {
  Main: require('./Main').default,
  Login: require('./Login').default,
  Explore: require('./Explore').default,
  SinglePlace: require('./SinglePlace').default,
  Error: require('./Error').default
}

export default Object.keys(components).reduce((wrappedComponents, key) => ({
  ...wrappedComponents, [key]: wrapComponent(components[key])
}), {})
