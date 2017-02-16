import { connect } from 'react-redux'
import { actions } from '../../redux'
import SingleRestaurant from './components'
import store from './redux'

const path = '/restaurants/:id'

const mapState = state => state
const mapDispatch = { ...actions }
const component = connect(mapState, mapDispatch)(SingleRestaurant)

export default { path, component }

// componentDidMount() {
//   const { location, formattedRestaurants, receiveCurrentRestaurant, router } = this.props
//   const { id } = location.query
//   const currentRestaurant = formattedRestaurants.find(restaurant => id === restaurantId)
//   if (currentRestaurant) receiveCurrentRestaurant(currentRestaurant)
//   else router.push('/')
// }
// componentDidUnmount() {
//   this.props.clearCurrentRestaurant()
// }
