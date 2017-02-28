/*----------  INITIAL STATE  ----------*/
export const initialState = {}


/*----------  ACTION TYPES  ----------*/
const RECEIVE_CURRENT_PLACE = 'RECEIVE_CURRENT_PLACE'
const CLEAR_CURRENT_PLACE = 'CLEAR_CURRENT_PLACE'
const ADD_ITEM_TO_CURRENT_PLACE = 'ADD_ITEM_TO_CURRENT_PLACE'

/*----------  ACTIONS  ----------*/
export const actions = {

  // ACTION CREATORS
  receiveCurrentPlace: currentPlace => (
    { type: RECEIVE_CURRENT_PLACE,
      currentPlace
    }),

  clearCurrentPlace: () => (
    { type: RECEIVE_CURRENT_PLACE
    }),

  addItemToCurrentPlace: item => (
    { type: ADD_ITEM_TO_CURRENT_PLACE,
      item
    })

}


/*----------  REDUCER  ----------*/
const reducer =  {
  _name: 'currentPlace',
  [RECEIVE_CURRENT_PLACE]: (state, action) => ({ ...action.currentPlace }),
  [CLEAR_CURRENT_PLACE]: () => ({}),
  [ADD_ITEM_TO_CURRENT_PLACE]: (state, action) => (
    { ...state, items: [ ...state.items, action.item ] }
  )
}


import { createReducer } from '../../utils'
export default createReducer(initialState, reducer)
