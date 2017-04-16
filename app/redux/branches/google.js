/*----------  INITIAL STATE  ----------*/
const initialState = { googleMapsLoaded: false }


/*----------  ACTION TYPES  ----------*/
const SET_GOOGLE_MAPS_LOADED = 'SET_GOOGLE_MAPS_LOADED'


/*----------  ACTIONS  ----------*/
export const actions = {

  // ACTION CREATORS
  setGoogleMapsLoaded: googleMapsLoaded => ({
    type: SET_GOOGLE_MAPS_LOADED,
    googleMapsLoaded
  }),

  // THUNK CREATORS
  checkGoogleMapsLoaded: () => dispatch => {
    dispatch(actions.setGoogleMapsLoaded(!!window.google))
  }

}


/*----------  REDUCER  ----------*/
const actionHandler =  {

  // GOOGLE
  [SET_GOOGLE_MAPS_LOADED]: (state, { googleMapsLoaded }) => ({ ...state,
    googleMapsLoaded
  }),

}

export default { initialState, actionHandler }
