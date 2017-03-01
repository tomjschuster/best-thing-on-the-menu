import { actions as auth } from './ducks/auth'
import { actions as users } from './ducks/users'
import { actions as places } from './ducks/places'
import { actions as currentPlace } from './ducks/currentPlace'
import { actions as reviews } from './ducks/reviews'
import { actions as items } from './ducks/items'
import { actions as ux } from './ducks/ux'
import { actions as forms } from './ducks/forms'
import { actions as errors } from './ducks/errors'

export default {
  ...auth,
  ...users,
  ...places,
  ...currentPlace,
  ...reviews,
  ...items,
  ...ux,
  ...forms,
  ...errors
}
