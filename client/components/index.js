import { connect } from 'react-redux'


const components = {
  Main: require('./Main').default,
  Login: require('./Login').default,
  Explore: require('./Explore').default,
  SinglePlace: require('./SinglePlace').default,
  ErrorPage: require('./ErrorPage').default
}

export default
  Object
    .keys(components)
    .reduce((connectedComponents, key) => ({
      ...connectedComponents,
      [key]: connect(state => state)(components[key])
    }), {})
