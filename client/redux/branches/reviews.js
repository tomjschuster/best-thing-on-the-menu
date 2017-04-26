/*
    CURRENTLY NOT IN USE. WILL USE LATER WITH ADMIN PAGES
*/

/*----------  INITIAL STATE  ----------*/
const initialState = []


/*----------  ACTION TYPES  ----------*/
const RECEIVE_REVIEWS = 'RECEIVE_REVIEWS'


/*----------  ACTIONS  ----------*/
export const actions = {

  // ACTION CREATORS
  receiveReviews: reviews => ({
    type: RECEIVE_REVIEWS,
    reviews
  })

  // THUNK CREATORS

}


/*----------  REDUCER  ----------*/
const actionHandler =  {
  [RECEIVE_REVIEWS]: (state, action) => ([ ...action.reviews ]),
}


export default { initialState, actionHandler }