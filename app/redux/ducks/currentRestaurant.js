/*----------  INITIAL STATE  ----------*/
export const initialState = {}


/*----------  ACTION TYPES  ----------*/
const RECEIVE_CURRENT_RESTAURANT = 'RECEIVE_CURRENT_RESTAURANT'
const CLEAR_CURRENT_RESTAURANT = 'CLEAR_CURRENT_RESTAURANT'
const ADD_ITEM_TO_CURRENT_RESTAURANT = 'ADD_ITEM_TO_CURRENT_RESTAURANT'

/*----------  ACTIONS  ----------*/
export const actions = {

  // ACTION CREATORS
  receiveCurrentRestaurant: currentRestaurant => (
    { type: RECEIVE_CURRENT_RESTAURANT,
      currentRestaurant
    }),

  clearCurrentRestaurant: () => (
    { type: RECEIVE_CURRENT_RESTAURANT
    }),

  addItemToCurrentRestaurant: item => (
    { type: ADD_ITEM_TO_CURRENT_RESTAURANT,
      item
    })

}


/*----------  REDUCER  ----------*/
const reducer =  {
  _name: 'currentRestaurant',
  [RECEIVE_CURRENT_RESTAURANT]: (state, action) => ({ ...action.currentRestaurant }),
  [CLEAR_CURRENT_RESTAURANT]: () => ({}),
  [ADD_ITEM_TO_CURRENT_RESTAURANT]: (state, action) => (
    { ...state, items: [ ...state.items, action.item ] }
  )
}


import { createReducer } from '../../utils'
export default createReducer(initialState, reducer)
