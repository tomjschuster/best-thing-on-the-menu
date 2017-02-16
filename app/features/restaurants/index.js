import { connect } from 'react-redux'
import { actions } from '../../redux'
import Restaurants from './components'

const path = '/restaurants'

const mapState = state => {
  const { restaurants, users, items, reviews } = state
  const formattedReviews = reviews.map(review => ({ ...review, user: users.find(({id}) => id === review.userId )}))
  const formattedItems = items.map(item => ({ ...item, reviews: formattedReviews.filter(({itemId}) => item.id === itemId )}))
  const formattedRestaurants = restaurants.map(restaurant => ({ ...restaurant, items: formattedItems.filter(({restaurantId}) => restaurant.id === restaurantId )}))
  return { ...state, formattedRestaurants }
}
const mapDispatch = { ...actions }
const component = connect(mapState, mapDispatch)(Restaurants)

export default { path, component }
