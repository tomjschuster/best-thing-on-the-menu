/*----------  INITIAL STATE  ----------*/
const initialState = { googleMapsLoaded: false, loadAttempts: 0 }


/*----------  ACTION TYPES  ----------*/
const SET_GOOGLE_MAPS_LOADED = 'SET_GOOGLE_MAPS_LOADED'
const ATTEMPT_GOOGLE_MAPS_LOAD = 'ATTEMPT_GOOGLE_MAPS_LOAD'
const RESET_GOOGLE_MAPS_LOAD_ATTEMPTS = 'RESET_GOOGLE_MAPS_LOAD_ATTEMPTS'


/*----------  ACTIONS  ----------*/
const actions = {

  // ACTION CREATORS
  setGoogleMapsLoaded: googleMapsLoaded => ({
    type: SET_GOOGLE_MAPS_LOADED,
    googleMapsLoaded
  }),

  attemptGoogleMapsLoad: () => ({
    type: ATTEMPT_GOOGLE_MAPS_LOAD
  }),

  resetGoogleMapsLoadAttempts: () => ({
    type: RESET_GOOGLE_MAPS_LOAD_ATTEMPTS
  }),

  // THUNK CREATORS
  checkGoogleMapsLoaded: () => dispatch => {
    if (window.google) {
      dispatch(actions.setGoogleMapsLoaded(true))
      dispatch(actions.resetGoogleMapsLoadAttempts())
    } else {
      dispatch(actions.attemptGoogleMapsLoad())
    }
  }

}


/*----------  REDUCER  ----------*/
const actionHandler =  {

  [SET_GOOGLE_MAPS_LOADED]: (state, { googleMapsLoaded }) => ({ ...state,
    googleMapsLoaded
  }),

  [ATTEMPT_GOOGLE_MAPS_LOAD]: (state, _) => ({ ...state,
    loadAttempts: ++state.loadAttempts
  }),

  [RESET_GOOGLE_MAPS_LOAD_ATTEMPTS]: (state, _) => ({ ...state,
    loadAttempts: 0
  })
}

export default { initialState, actions, actionHandler }
