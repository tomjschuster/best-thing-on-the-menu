/*----------  INITIAL STATE  ----------*/
export const initialState = { isShowAddReview: false }


/*----------  ACTION TYPES  ----------*/
const SHOW_ADD_REVIEW = 'SHOW_ADD_REVIEW'
const HIDE_ADD_REVIEW = 'HIDE_ADD_REVIEW'


/*----------  ACTIONS  ----------*/
export const actions = {
  // Action Creators
  showAddReview: () => (
    { type: SHOW_ADD_REVIEW
    }),
  hideAddReview: () => (
    { type: HIDE_ADD_REVIEW
    }),

}


/*----------  REDUCER  ----------*/
const reducer =  {
  [SHOW_ADD_REVIEW]: (state) => ({ ...state, isShowAddReview: true }),
  [HIDE_ADD_REVIEW]: (state) => ({ ...state, isShowAddReview: false })
}


import { createReducer } from '../../utils'
export default createReducer(initialState, reducer)