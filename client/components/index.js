import { connect } from 'react-redux'


const components = {
  Main: require('./Main/index.js').default,
  Login: require('./Login/index.js').default,
  Explore: require('./Explore/index.js').default,
  SinglePlace: require('./SinglePlace/index.js').default,
  ErrorPage: require('./ErrorPage/index.js').default
}

export default
  Object
    .keys(components)
    .reduce((connectedComponents, key) => ({
      ...connectedComponents,
      [key]: connect(state => state)(components[key])
    }), {})
