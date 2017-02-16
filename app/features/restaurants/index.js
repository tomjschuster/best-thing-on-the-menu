import { connect } from 'react-redux'
import { actions } from '../../redux'
import Restaurants from './components'

const path = '/restaurants'

const mapState = state => state
const mapDispatch = { ...actions }
const component = connect(mapState, mapDispatch)(Restaurants)

export default { path, component }
