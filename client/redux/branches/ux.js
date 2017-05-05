/*----------  INITIAL STATE  ----------*/
const initialState = { isShowAddReview: false }


/*----------  ACTION TYPES  ----------*/
const SHOW_ADD_REVIEW = 'SHOW_ADD_REVIEW'
const HIDE_ADD_REVIEW = 'HIDE_ADD_REVIEW'


/*----------  ACTIONS  ----------*/
const actions = {

  // ACTION CREATORS
  // ADD REVIEW
  showAddReview: () => ({
    type: SHOW_ADD_REVIEW
  }),

  hideAddReview: () => ({
    type: HIDE_ADD_REVIEW
  }),

  // THUNK CREATORS

}


/*----------  REDUCER  ----------*/
const actionHandler =  {

  // ADD REVIEW
  [SHOW_ADD_REVIEW]: (state) => ({ ...state,
    isShowAddReview: true
  }),

  [HIDE_ADD_REVIEW]: (state) => ({ ...state,
    isShowAddReview: false
  }),

}


export default { initialState, actions, actionHandler }
