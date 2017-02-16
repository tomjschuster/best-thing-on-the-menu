/*----------  INITIAL STATE  ----------*/
export const initialState = {}


/*----------  ACTION TYPES  ----------*/
const RECEIVE_CURRENT_RESTAURANT = 'RECEIVE_CURRENT_RESTAURANT'
const CLEAR_CURRENT_RESTAURANT = 'CLEAR_CURRENT_RESTAURANT'

/*----------  ACTIONS  ----------*/
export const actions = {
  receiveCurrentRestaurant: restaurant => (
    { type: RECEIVE_CURRENT_RESTAURANT,
      restaurant
    }),

  clearCurrentRestaurant: () => (
    { type: RECEIVE_CURRENT_RESTAURANT
    })
}


/*----------  REDUCER  ----------*/
const reducer =  {
  _name: 'currentRestaurant',
  [RECEIVE_CURRENT_RESTAURANT]: restaurant => ({ ...restaurant }),
  [CLEAR_CURRENT_RESTAURANT]: () => ({})
}


import { createReducer } from '../../utils'
export default createReducer(initialState, reducer)
