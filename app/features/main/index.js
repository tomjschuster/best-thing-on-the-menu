import { connect } from 'react-redux'
import { actions } from '../../redux'
import Main from './components'

const mapState = state => {
  const { places, users, items, reviews } = state
  const formattedReviews = reviews.map(review => ({ ...review, user: users.find(({id}) => id === review.userId )}))
  const formattedItems = items.map(item => ({ ...item, reviews: formattedReviews.filter(({itemId}) => item.id === itemId )}))
  const formattedPlaces = places.map(place => ({ ...place, items: formattedItems.filter(({placeId}) => place.id === placeId )}))
  return { ...state, formattedPlaces }
}
const mapDispatch = { ...actions }

export default connect(mapState, mapDispatch)(Main)
