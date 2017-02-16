import { actions as auth } from './ducks/auth'
import { actions as users } from './ducks/users'
import { actions as restaurants } from './ducks/restaurants'
import { actions as currentRestaurant } from './ducks/currentRestaurant'
import { actions as reviews } from './ducks/reviews'

export default {
  ...auth,
  ...users,
  ...restaurants,
  ...currentRestaurant,
  ...reviews
}
