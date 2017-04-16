import { connect } from 'react-redux'
import store, { actions } from '../../redux'
import Login from './components'

const path = '/login'

const mapState = state => state
const mapDispatch = { ...actions }
const component = connect(mapState, mapDispatch)(Login)

const onEnter = ({ location: { state = {} } }, replace, callback) => {
  // If not logged out redirect, check for auth
  if (!state.loggedOut) {
    store.dispatch(actions.checkAuth())
    .then(({ isAuthenticated }) => {
      if (isAuthenticated) {
        replace('/explore')
      }
      callback()
    })
    .catch(() => callback())
  } else {
    callback()
  }
}

export default { path, component, onEnter }
