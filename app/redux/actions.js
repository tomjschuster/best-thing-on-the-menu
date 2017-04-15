export { actions as auth } from './ducks/auth'
export { actions as users } from './ducks/users'
export { actions as places } from './ducks/places'
export { actions as currentPlace } from './ducks/currentPlace'
export { actions as reviews } from './ducks/reviews'
export { actions as items } from './ducks/items'
export { actions as ux } from './ducks/ux'
export { actions as forms } from './ducks/forms'
export { actions as errors } from './ducks/errors'

export default {
  ...require('./ducks/auth').actions,
  ...require('./ducks/users').actions,
  ...require('./ducks/places').actions,
  ...require('./ducks/currentPlace').actions,
  ...require('./ducks/reviews').actions,
  ...require('./ducks/items').actions,
  ...require('./ducks/ux').actions,
  ...require('./ducks/forms').actions,
  ...require('./ducks/errors').actions
}
