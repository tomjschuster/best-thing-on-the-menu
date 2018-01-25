import { actions as uxActions } from './ux'

/*----------  INITIAL STATE  ----------*/
export const initialState = {
  login: {
    email: '',
    password: '',
    error: null
  },
  addReview: {
    itemName: '',
    stars: null,
    comment: ''
  }
}

/*----------  ACTION TYPES  ----------*/
const UPDATE_EMAIL = 'UPDATE_EMAIL'
const UPDATE_PASSWORD = 'UPDATE_PASSWORD'
const UPDATE_ERROR = 'UPDATE_ERROR'
const RESET_LOGIN = 'RESET_LOGIN'
const UPDATE_ITEM_NAME = 'UPDATE_ITEM_NAME'
const UPDATE_STARS = 'UPDATE_STARS'
const UPDATE_COMMENT = 'UPDATE_COMMENT'
const CLEAR_ADD_REVIEW = 'CLEAR_ADD_REVIEW'

/*----------  ACTIONS  ----------*/
export const actions = {
  // ACTION CREATORS
  // LOGIN
  updateEmail: email => ({
    type: UPDATE_EMAIL,
    email
  }),

  updatePassword: password => ({
    type: UPDATE_PASSWORD,
    password
  }),

  updateError: error => ({
    type: UPDATE_ERROR,
    error
  }),

  resetLogin: () => ({
    type: RESET_LOGIN
  }),

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
    type: CLEAR_ADD_REVIEW
  }),

  // THUNK CREATORS
  // ADD REVIEW
  closeAndClearAddReview: () => dispatch => {
    dispatch(uxActions.hideAddReview())
    dispatch(actions.clearAddReview())
  }
}

/*----------  REDUCER  ----------*/
export const actionHandler = {
  // LOGIN
  [UPDATE_EMAIL]: (state, { email }) => ({
    ...state,
    login: { ...state.login, email }
  }),
  [UPDATE_PASSWORD]: (state, { password }) => ({
    ...state,
    login: { ...state.login, password }
  }),
  [UPDATE_ERROR]: (state, { error }) => ({
    ...state,
    login: { ...state.login, error }
  }),
  [RESET_LOGIN]: (state, _) => ({
    ...state,
    login: initialState.login
  }),
  // ADD REVIEW
  [UPDATE_ITEM_NAME]: (state, { name }) => ({
    ...state,
    addReview: { ...state.addReview, itemName: name }
  }),

  [UPDATE_STARS]: (state, { stars }) => ({
    ...state,
    addReview: { ...state.addReview, stars }
  }),

  [UPDATE_COMMENT]: (state, { comment }) => ({
    ...state,
    addReview: { ...state.addReview, comment }
  }),

  [CLEAR_ADD_REVIEW]: state => ({
    ...state,
    addReview: { ...initialState.addReview }
  })
}

export default { initialState, actions, actionHandler }
