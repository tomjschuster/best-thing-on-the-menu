import { connect } from 'react-redux'
import { actions } from '../../redux'
import SinglePlace from './components'

const path = '/places/:id'

const mapState = state => state
const mapDispatch = { ...actions }
const component = connect(mapState, mapDispatch)(SinglePlace)

export default { path, component }

