import { combineReducers } from 'redux'

import auth from './ducks/auth'
import users from './ducks/users'
import places from './ducks/places'
import currentPlace from './ducks/currentPlace'
import reviews from './ducks/reviews'
import items from './ducks/items'
import ux from './ducks/ux'
import forms from './ducks/forms'


export default combineReducers({
  auth,
  users,
  places,
  currentPlace,
  reviews,
  items,
  ux,
  forms
})
