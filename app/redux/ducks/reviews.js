import { get } from 'axios'
import { actions as itemActions } from './items'
/*----------  INITIAL STATE  ----------*/
// export const initialState = []
export const initialState = require('../seed/reviews').default


/*----------  ACTION TYPES  ----------*/
const RECEIVE_REVIEWS = 'RECEIVE_REVIEWS'
const ADD_REVIEW = 'ADD_REVIEW'


/*----------  ACTIONS  ----------*/
export const actions = {

  // ACTION CREATORS
  receiveReviews: reviews => (
    { type: RECEIVE_REVIEWS,
      reviews
    }),

  addReview: review => (
    { type: ADD_REVIEW,
      review
    }),

  // THUNK CREATORS
  getPlaceReviews: placeId => dispatch => {
    get(`/api/places/${placeId}/reviews`)
      .then(({ data }) => {
        dispatch(actions.receiveReviews(data.reviews))
        dispatch(itemActions.receiveItems(data.items))
      })
  }
}


/*----------  REDUCER  ----------*/
const reducer =  {
  [RECEIVE_REVIEWS]: (state, action) => ([ ...action.reviews ]),
  [ADD_REVIEW]: (state, action) => ([...state, action.review]),
}


import { createReducer } from '../../utils'
export default createReducer(initialState, reducer)
