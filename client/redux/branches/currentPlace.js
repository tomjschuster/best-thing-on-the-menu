import { get, post } from 'axios'

/*----------  INITIAL STATE  ----------*/
const initialState = {}


/*----------  ACTION TYPES  ----------*/
const RECEIVE_CURRENT_PLACE = 'RECEIVE_CURRENT_PLACE'
const CLEAR_CURRENT_PLACE = 'CLEAR_CURRENT_PLACE'
const ADD_ITEM_TO_CURRENT_PLACE = 'ADD_ITEM_TO_CURRENT_PLACE'
const ADD_REVIEW_TO_CURRENT_PLACE = 'ADD_REVIEW_TO_CURRENT_PLACE'
const TOGGLE_ITEM_EXPANDED = 'TOGGLE_ITEM_EXPANDED'

/*----------  ACTIONS  ----------*/
export const actions = {

  // ACTION CREATORS
  receiveCurrentPlace: currentPlace => ({
    type: RECEIVE_CURRENT_PLACE,
    currentPlace
  }),

  clearCurrentPlace: () => ({
    type: RECEIVE_CURRENT_PLACE
  }),

  addItemToCurrentPlace: item => ({
    type: ADD_ITEM_TO_CURRENT_PLACE,
    item
  }),

  addReviewToCurrentPlace: review => ({
    type: ADD_REVIEW_TO_CURRENT_PLACE,
    review
  }),

  toggleItemExpanded: id => ({
    type: TOGGLE_ITEM_EXPANDED,
    id
  }),

  // THUNK CREATORS
  checkItemAndCreateReview: (placeId, itemName, stars, comment, userId) => dispatch => {
    post(`/api/reviews/check/item`, { placeId, itemName, stars, comment, userId })
      .then(() => {
        dispatch(actions.getPlaceItemsReviews(placeId))
      })
      .catch(console.error)
  },

  getPlaceItemsReviews: (placeId, router) => dispatch => {
    get(`/api/places/${placeId}/reviews`)
      .then(({ data }) => {
        const { found, place, items, reviews } = data
        if (found) {
          const currentPlace = {
            ...place,
            items: items.map(item => ({
              ...item,
              reviews: reviews.filter(({ itemId }) => itemId === item.id)
            }))
          }
          dispatch(actions.receiveCurrentPlace(currentPlace))
        } else {
          router.push('/')
        }
      })
      .catch(err => {
        console.error(err)
        router.push('/')
      })
  },

}


/*----------  REDUCER  ----------*/
const actionHandler =  {

  [RECEIVE_CURRENT_PLACE]: (state, action) => ({
    ...action.currentPlace
  }),

  [CLEAR_CURRENT_PLACE]: () => ({}),

  [ADD_ITEM_TO_CURRENT_PLACE]: (state, { item }) => ({ ...state,
    items: [ ...state.items, item ]
  }),

  [ADD_REVIEW_TO_CURRENT_PLACE]: (state, { review }) => ({ ...state,
    items: state.items.map(item => (
      (item.id === review.itemId) ?
        { ...item, reviews: [ ...item.reviews, review ] } : item
    ))
  }),

  [TOGGLE_ITEM_EXPANDED]: (state, { id }) => ({ ...state,
    items: state.items.map((item, idx) => (
      (item.id === id) ?
        { ...item, expanded: !state.items[idx].expanded } : item
    ))
  })

}


export default { initialState, actionHandler }
