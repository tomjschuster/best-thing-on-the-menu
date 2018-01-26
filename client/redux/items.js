/*
    CURRENTLY NOT IN USE. WILL WHEN NORMALIZED
*/

/*----------  INITIAL STATE  ----------*/
export const initialState = []

/*----------  ACTION TYPES  ----------*/
const RECEIVE_ITEMS = 'RECEIVE_ITEMS'
const ADD_ITEM = 'ADD_ITEM'
const REMOVE_ITEM = 'REMOVE_ITEM'
const REMOVE_PLACE_ITEMS = 'REMOVE_PLACE_ITEMS'

/*----------  ACTIONS  ----------*/
export const actions = {
  // ACTION CREATORS
  receiveItems: items => ({
    type: RECEIVE_ITEMS,
    items
  }),

  addItem: item => ({
    type: ADD_ITEM,
    item
  }),

  removeItem: id => ({
    type: REMOVE_ITEM,
    id
  }),

  removePlaceItems: placeId => ({
    type: REMOVE_PLACE_ITEMS,
    placeId
  })

  // THUNK CREATORS
}

/*----------  REDUCER  ----------*/
export const actionHandler = {
  [RECEIVE_ITEMS]: (state, { items }) => [...items],

  [ADD_ITEM]: (state, { item }) => [...state, item],

  [REMOVE_ITEM]: (state, { id }) => state.filter(x => x.id !== id),

  [REMOVE_PLACE_ITEMS]: (state, { placeId }) =>
    state.filter(x => x.placeId !== placeId)
}

export default { initialState, actionHandler, actions }
