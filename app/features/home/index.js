import { connect } from 'react-redux'
import { actions } from '../../redux'
import Home from './components'

const path = '/'

const mapState = state => state
const mapDispatch = { ...actions }
const component = connect(mapState, mapDispatch)(Home)

export default { path, component }
