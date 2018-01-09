import { actions as uxActions } from './ux'

/*----------  INITIAL STATE  ----------*/
export const initialState = {
  addReview: {
    itemName: '',
    stars: null,
    comment: ''
  }
}


/*----------  ACTION TYPES  ----------*/
const UPDATE_ITEM_NAME = 'UPDATE_ITEM_NAME'
const UPDATE_STARS = 'UPDATE_STARS'
const UPDATE_COMMENT = 'UPDATE_COMMENT'
const CLEAR_ADD_REVIEW = 'CLEAR_ADD_REVIEW'


/*----------  ACTIONS  ----------*/
export const actions = {

  // ACTION CREATORS
  // ADD REVIEW
  updateItemName: name => ({
    type: UPDATE_ITEM_NAME,
    name
  }),

  updateStars: stars => ({
    type: UPDATE_STARS,
    stars
  }),

  updateComment: comment => ({
    type: UPDATE_COMMENT,
    comment
  }),

  clearAddReview: () => ({
    type: CLEAR_ADD_REVIEW,
  }),

  // THUNK CREATORS
  // ADD REVIEW
  closeAndClearAddReview: () => dispatch => {
    dispatch(uxActions.hideAddReview())
    dispatch(actions.clearAddReview())
  }

}


/*----------  REDUCER  ----------*/
export const actionHandler =  {

  // ADD REVIEW
  [UPDATE_ITEM_NAME]: (state, { name }) => ({
    ...state, addReview: { ...state.addReview, itemName: name }
  }),

  [UPDATE_STARS]: (state, { stars }) => ({
    ...state, addReview: { ...state.addReview, stars }
  }),

  [UPDATE_COMMENT]: (state, { comment }) => ({
    ...state, addReview: { ...state.addReview, comment }
  }),

  [CLEAR_ADD_REVIEW]: (state) => ({
    ...state, addReview: { ...initialState.addReview }
  })

}

export default { initialState, actions, actionHandler }
