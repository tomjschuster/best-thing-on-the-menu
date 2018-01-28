import axios from 'axios'
import { history } from '../router'

/*----------  INITIAL STATE  ----------*/
export const initialState = []

/*----------  ACTION TYPES  ----------*/
const RECEIVE_PLACE = 'RECEIVE_PLACE'
const ADD_PLACE = 'ADD_PLACE'
const REMOVE_PLACE = 'REMOVE_PLACE'
const CLEAR_PLACES = 'CLEAR_PLACES'

/*----------  ACTIONS  ----------*/
export const actions = {
  // ACTION CREATORS
  receivePlaces: places => ({
    type: RECEIVE_PLACE,
    places
  }),

  addPlace: place => ({
    type: ADD_PLACE,
    place
  }),

  removePlace: id => ({
    type: REMOVE_PLACE,
    id
  }),

  clearPlaces: () => ({
    type: CLEAR_PLACES
  }),

  // THUNK CREATORS
  checkPlaceAndGoToPage: ({ googleId, name, address }) => () =>
    axios
      .post('/api/places/check', { googleId, name, address })
      .then(({ data: { created, id } }) => {
        if (created) {
          history.push(`/places/${id}`)
        }
      })
      .catch(console.error),

  getPlaces: () => dispatch =>
    axios
      .get('/api/places')
      .then(({ data }) => dispatch(actions.receivePlaces(data)))
      .catch(console.error),

  deletePlace: id => dispatch =>
    axios
      .delete(`/api/places/${id}`)
      .then(() => dispatch(actions.removePlace(id)))
      .catch(console.error)
}

/*----------  REDUCER  ----------*/
export const actionHandler = {
  [RECEIVE_PLACE]: (state, action) => [...action.places],

  [ADD_PLACE]: (state, action) => [...state, action.place],

  [REMOVE_PLACE]: (state, action) => state.filter(({ id }) => id !== action.id),

  [CLEAR_PLACES]: () => [...initialState]
}

export default { initialState, actions, actionHandler }
