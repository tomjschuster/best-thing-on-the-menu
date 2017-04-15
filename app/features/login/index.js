import { connect } from 'react-redux'
import store, { actions } from '../../redux'
import Login from './components'

const path = '/login'

const mapState = state => state
const mapDispatch = { ...actions }
const component = connect(mapState, mapDispatch)(Login)

const onEnter = (_, replace, callback) => {
  store.dispatch(actions.checkAuth())
    .then(({ isAuthenticated }) => {
      if (isAuthenticated) {
        replace('/explore')
      }
      callback()
    })
    .catch(() => callback())
}

export default { path, component, onEnter }
