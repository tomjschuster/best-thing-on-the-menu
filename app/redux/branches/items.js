/*
    CURRENTLY NOT IN USE. WILL USE LATER WITH ADMIN PAGES
*/

/*----------  INITIAL STATE  ----------*/
const initialState = []


/*----------  ACTION TYPES  ----------*/
const RECEIVE_ITEMS = 'RECEIVE_ITEMS'
const ADD_ITEM = 'ADD_ITEM'


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

  // THUNK CREATORS

}


/*----------  REDUCER  ----------*/
const actionHandler =  {
  [RECEIVE_ITEMS]: (state, action) => ([ ...action.items ]),
  [ADD_ITEM]: (state, action) => ([ ...state, action.item ])
}

export default { initialState, actionHandler }
