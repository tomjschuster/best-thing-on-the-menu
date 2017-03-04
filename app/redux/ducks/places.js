import axios from 'axios'

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
  loadPlaces: () => dispatch => {
    axios
      .get('/api/places')
      .then(({ data }) => dispatch(actions.receivePlaces(data)))
    }
}


/*----------  REDUCER  ----------*/
const reducer =  {
  [RECEIVE_PLACE]: (state, action) => ([ ...action.places ]),
  [ADD_PLACE]: (state, action) => ([ ...state, action.place ])
}


import { createReducer } from '../../utils'
export default createReducer(initialState, reducer)
