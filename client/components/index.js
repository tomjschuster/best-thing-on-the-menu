import { connect } from 'react-redux'


const components = {
  Main: require('./Main.js').default,
  Login: require('./Login.js').default,
  Explore: require('./Explore.js').default,
  SinglePlace: require('./SinglePlace.js').default,
  ErrorPage: require('./ErrorPage.js').default
}

export default
  Object
    .keys(components)
    .reduce((connectedComponents, key) => ({
      ...connectedComponents,
      [key]: connect(state => state)(components[key])
    }), {})
