import { connect } from 'react-redux'
import { actions } from '../../redux'
import Main from './components'

const mapState = state => state
const mapDispatch = { ...actions }

export default connect(mapState, mapDispatch)(Main)
