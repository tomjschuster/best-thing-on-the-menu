import { get, post } from 'axios'

/*----------  INITIAL STATE  ----------*/
export const initialState = []
// export const initialState = require('../seed/places').default


/*----------  ACTION TYPES  ----------*/
const RECEIVE_PLACE = 'RECEIVE_PLACE'
const ADD_PLACE = 'ADD_PLACE'


/*----------  ACTIONS  ----------*/
export const actions = {
  // Action Creators
  receivePlaces: places => (
    { type: RECEIVE_PLACE,
      places
    }),
  addPlace: place => (
    { type: ADD_PLACE,
      place
    }),

  // Thunk Creators
  createPlaceAndGoToPage: (googleId, name, address, router) => () => {
    post('/api/places', { googleId, name, address })
      .then(({ data: { created, id } }) => {
          if (created) {
            router.push(`/places/${id}`)
          }
      })
      .catch(console.error)
  },
  getPlaces: () => dispatch => {
    get('/api/places')
      .then(({ data }) => dispatch(actions.receivePlaces(data)))
      .catch(console.error)
    }
}


/*----------  REDUCER  ----------*/
const reducer =  {
  [RECEIVE_PLACE]: (state, action) => ([ ...action.places ]),
  [ADD_PLACE]: (state, action) => ([ ...state, action.place ])
}


import { createReducer } from '../../utils'
export default createReducer(initialState, reducer)
