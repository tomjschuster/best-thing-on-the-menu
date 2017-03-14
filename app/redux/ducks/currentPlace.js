import { get, post } from 'axios'

/*----------  INITIAL STATE  ----------*/
export const initialState = {}


/*----------  ACTION TYPES  ----------*/
const RECEIVE_CURRENT_PLACE = 'RECEIVE_CURRENT_PLACE'
const CLEAR_CURRENT_PLACE = 'CLEAR_CURRENT_PLACE'
const ADD_ITEM_TO_CURRENT_PLACE = 'ADD_ITEM_TO_CURRENT_PLACE'
const ADD_REVIEW_TO_CURRENT_PLACE = 'ADD_REVIEW_TO_CURRENT_PLACE'

/*----------  ACTIONS  ----------*/
export const actions = {

  // ACTION CREATORS
  receiveCurrentPlace: currentPlace => (
    { type: RECEIVE_CURRENT_PLACE,
      currentPlace
    }),

  clearCurrentPlace: () => (
    { type: RECEIVE_CURRENT_PLACE
    }),

  addItemToCurrentPlace: item => (
    { type: ADD_ITEM_TO_CURRENT_PLACE,
      item
    }),

  addReviewToCurrentPlace: review => (
    { type: ADD_REVIEW_TO_CURRENT_PLACE,
      review
    }),

  //  THUNK CREATORS
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
const reducer =  {
  [RECEIVE_CURRENT_PLACE]: (state, action) => ({
    ...action.currentPlace
  }),

  [CLEAR_CURRENT_PLACE]: () => ({}),

  [ADD_ITEM_TO_CURRENT_PLACE]: (state, action) => ({ ...state,
    items: [ ...state.items, action.item ]
  }),

  [ADD_REVIEW_TO_CURRENT_PLACE]: (state, action) => ({ ...state,
    items: state.items.map(item => {
      if (item.id === action.review.itemId) {
        return { ...item, reviews: [ ...item.reviews, action.review ] }
      } else {
        return item
      }
    })
  })
}


import { createReducer } from '../../utils'
export default createReducer(initialState, reducer)
