/*----------  INITIAL STATE  ----------*/
// export const initialState = []
export const initialState = require('../seed/restaurants').default


/*----------  ACTION TYPES  ----------*/
const RECEIVE_RESTAURANTS = 'RECEIVE_RESTAURANTS'
const ADD_RESTAURANT = 'ADD_RESTAURANT'


/*----------  ACTIONS  ----------*/
export const actions = {
  // Action Creators
  receiveRestaurants: restaurants => (
    { type: RECEIVE_RESTAURANTS,
      restaurants
    }),
  addRestaurant: restaurant => (
    { type: ADD_RESTAURANT,
      restaurant
    })
}


/*----------  REDUCER  ----------*/
const reducer =  {
  [RECEIVE_RESTAURANTS]: (state, action) => ([ ...action.restaurants ]),
  [ADD_RESTAURANT]: (state, action) => ([ ...state, action.restaurant ])
}


import { createReducer } from '../../utils'
export default createReducer(initialState, reducer)
