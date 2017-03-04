import axios from 'axios'
import { actions as currentPlaceActions } from './currentPlace'

/*----------  INITIAL STATE  ----------*/
export const initialState = []
// export const initialState = require('../seed/items').default


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
    }),

  // Thunk Creators
  loadItems: () => dispatch => {
    axios
      .get('/api/items')
      .then(({ data }) => dispatch(actions.receiveItems(data)))
  },

  addToItemsAndCurrentPlace: (name, placeId) => dispatch => {
    const id = Math.random().toString(36).substring(7) // temporary
    const item = { id, placeId, name }
    const currentPlaceItem = { ...item, reviews: [] }

    dispatch(actions.addItem(item))
    dispatch(currentPlaceActions.addItemToCurrentPlace(currentPlaceItem))

    return id
  }
}


/*----------  REDUCER  ----------*/
const reducer =  {
  [RECEIVE_ITEMS]: (state, action) => ([ ...action.items ]),
  [ADD_ITEM]: (state, action) => ([ ...state, action.item ])
}


import { createReducer } from '../../utils'
export default createReducer(initialState, reducer)
