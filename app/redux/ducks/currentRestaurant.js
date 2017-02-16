/*----------  INITIAL STATE  ----------*/
export const initialState = {}


/*----------  ACTION TYPES  ----------*/
const RECEIVE_CURRENT_RESTAURANT = 'RECEIVE_CURRENT_RESTAURANT'


/*----------  ACTIONS  ----------*/
export const actions = {
  receiveCurrentRestaurant: restaurant => (
    { type: RECEIVE_CURRENT_RESTAURANT,
      restaurant
    })
}


/*----------  REDUCER  ----------*/
const reducer =  {
  _name: 'currentRestaurant',
  [RECEIVE_CURRENT_RESTAURANT]: restaurant => ({ ...restaurant })
}


import { createReducer } from '../../utils'
export default createReducer(initialState, reducer)
