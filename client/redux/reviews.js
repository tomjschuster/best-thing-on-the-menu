/*
    CURRENTLY NOT IN USE. WILL USE WHEN NORMALIZED
*/

/*----------  INITIAL STATE  ----------*/
export const initialState = []

/*----------  ACTION TYPES  ----------*/
const RECEIVE_REVIEWS = 'RECEIVE_REVIEWS'
const ADD_REVIEW = 'ADD_REVIEW'
const REMOVE_REVIEW = 'REMOVE_REVIEW'
const REMOVE_ITEM_REVIEWS = 'REMOVE_ITEM_REVIEWS'
const REMOVE_PLACE_REVIEWS = 'REMOVE_PLACE_REVIEWS'

/*----------  ACTIONS  ----------*/
export const actions = {
  // ACTION CREATORS
  receiveReviews: reviews => ({
    type: RECEIVE_REVIEWS,
    reviews
  }),

  addReview: review => ({
    type: ADD_REVIEW,
    review
  }),

  removeReview: id => ({
    type: REMOVE_REVIEW,
    id
  }),

  removeItemReviews: itemId => ({
    type: REMOVE_ITEM_REVIEWS,
    itemId
  }),

  removePlaceReviews: placeId => ({
    type: REMOVE_PLACE_REVIEWS,
    placeId
  })

  // THUNK CREATORS
}

/*----------  REDUCER  ----------*/
export const actionHandler = {
  [RECEIVE_REVIEWS]: (state, { reviews }) => [...reviews],

  [ADD_REVIEW]: (state, { review }) => [...state, review],

  [REMOVE_REVIEW]: (state, { id }) => state.filter(x => x.id !== id),

  [REMOVE_ITEM_REVIEWS]: (state, { itemId }) =>
    state.filter(x => x.itemId !== itemId),

  [REMOVE_PLACE_REVIEWS]: (state, { placeId }) =>
    state.filter(x => x.placeId !== placeId)
}

export default { initialState, actions, actionHandler }
