/*----------  INITIAL STATE  ----------*/
// export const initialState = []
export const initialState = require('../seed/items').default


/*----------  ACTION TYPES  ----------*/
const RECEIVE_ITEMS = 'RECEIVE_ITEMS'
const ADD_ITEM = 'ADD_ITEM'


/*----------  ACTIONS  ----------*/
export const actions = {
  // Action Creators
  receiveItems: items => (
    { type: RECEIVE_ITEMS,
      items
    }),
  addItem: item => (
    { type: ADD_ITEM,
      item
    })
}


/*----------  REDUCER  ----------*/
const reducer =  {
  [RECEIVE_ITEMS]: (state, action) => ([ ...action.items ]),
  [ADD_ITEM]: (state, action) => ([ ...state, action.item ])
}


import { createReducer } from '../../utils'
export default createReducer(initialState, reducer)
