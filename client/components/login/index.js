import { connect } from 'react-redux'
import actions from '../../redux'
import Login from './components'

const path = '/login'

const mapState = state => state
const mapDispatch = { ...actions }
const component = connect(mapState, mapDispatch)(Login)

export default { path, component }
