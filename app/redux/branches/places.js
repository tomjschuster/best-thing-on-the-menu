import axios from 'axios'

/*----------  INITIAL STATE  ----------*/
const initialState = []


/*----------  ACTION TYPES  ----------*/
const RECEIVE_PLACE = 'RECEIVE_PLACE'
const ADD_PLACE = 'ADD_PLACE'


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

  // THUNK CREATORS
  checkPlaceAndGoToPage: (googleId, name, address, router) => () => {
   axios.post('/api/places/check', { googleId, name, address })
      .then(({ data: { created, id } }) => {
          if (created) {
            router.push(`/places/${id}`)
          }
      })
      .catch(console.error)
  },
  // createPlaceAndGoToPage: (googleId, name, address, router) => () => {
  //   post('/api/places', { googleId, name, address })
  //     .then(({ data: { created, id } }) => {
  //         if (created) {
  //           router.push(`/places/${id}`)
  //         }
  //     })
  //     .catch(console.error)
  // },
  getPlaces: () => dispatch => {
    axios.get('/api/places')
      .then(({ data }) => dispatch(actions.receivePlaces(data)))
      .catch(console.error)
    }
}


/*----------  REDUCER  ----------*/
const actionHandler =  {
  [RECEIVE_PLACE]: (state, action) => ([ ...action.places ]),
  [ADD_PLACE]: (state, action) => ([ ...state, action.place ])
}


export default { initialState, actionHandler }
