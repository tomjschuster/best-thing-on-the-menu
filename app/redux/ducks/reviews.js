/*----------  INITIAL STATE  ----------*/
// export const initialState = []
export const initialState = require('../seed/reviews').default


/*----------  ACTION TYPES  ----------*/
const RECEIVE_REVIEWS = 'RECEIVE_REVIEWS'
const ADD_REVIEW = 'ADD_REVIEW'


/*----------  ACTIONS  ----------*/
export const actions = {
  receiveReviews: reviews => (
    { type: RECEIVE_REVIEWS,
      reviews
    }),
  addReview: review => (
    { type: ADD_REVIEW,
      review
    })
}


/*----------  REDUCER  ----------*/
const reducer =  {
  [RECEIVE_REVIEWS]: (state, action) => ([ ...action.reviews ]),
  [ADD_REVIEW]: (state, action) => ([...state, action.review]),
}


import { createReducer } from '../../utils'
export default createReducer(initialState, reducer)
