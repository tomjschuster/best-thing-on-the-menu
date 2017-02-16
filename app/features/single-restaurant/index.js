import { connect } from 'react-redux'
import { actions } from '../../redux'
import SingleRestaurant from './components'

const path = '/restaurants/:id'

const mapState = state => state
const mapDispatch = { ...actions }
const component = connect(mapState, mapDispatch)(SingleRestaurant)

export default { path, component }
