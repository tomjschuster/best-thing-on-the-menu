/*----------  INITIAL STATE  ----------*/
// export const initialState = []
export const initialState = require('../seed/reviews').default


/*----------  ACTION TYPES  ----------*/
const RECEIVE_REVIEWS = 'RECEIVE_REVIEWS'


/*----------  ACTIONS  ----------*/
export const actions = {
  signIn: reviews => (
    { type: RECEIVE_REVIEWS,
      reviews
    })
}


/*----------  REDUCER  ----------*/
const reducer =  {
  [RECEIVE_REVIEWS]: reviews => ({ ...reviews })
}


import { createReducer } from '../../utils'
export default createReducer(initialState, reducer)
