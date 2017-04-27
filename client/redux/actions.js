export { actions as auth } from './branches/auth'
export { actions as users } from './branches/users'
export { actions as places } from './branches/places'
export { actions as currentPlace } from './branches/currentPlace'
export { actions as reviews } from './branches/reviews'
export { actions as items } from './branches/items'
export { actions as ux } from './branches/ux'
export { actions as forms } from './branches/forms'
export { actions as google } from './branches/google'
export { actions as errors } from './branches/errors'

export default {
  ...require('./branches/auth').actions,
  ...require('./branches/users').actions,
  ...require('./branches/places').actions,
  ...require('./branches/currentPlace').actions,
  ...require('./branches/reviews').actions,
  ...require('./branches/items').actions,
  ...require('./branches/ux').actions,
  ...require('./branches/forms').actions,
  ...require('./branches/google').actions,
  ...require('./branches/errors').actions
}
