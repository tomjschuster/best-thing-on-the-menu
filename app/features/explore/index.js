import { connect } from 'react-redux'
import { actions } from '../../redux'
import Explore from './components'

const path = '/explore'

const mapState = state => state
const mapDispatch = { ...actions }
const component = connect(mapState, mapDispatch)(Explore)

export default { path, component }
