import { connect } from 'react-redux'

import Main from './Main'
import Login from './Login'
import Explore from './Explore'
import SinglePlace from './SinglePlace'
import ErrorPage from './ErrorPage'

const components = {
  Main,
  Login,
  Explore,
  SinglePlace,
  ErrorPage
}

export default
  Object
    .keys(components)
    .reduce((connectedComponents, key) => ({
      ...connectedComponents,
      [key]: connect(state => state)(components[key])
    }), {})
