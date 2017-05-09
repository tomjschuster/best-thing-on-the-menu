/*----------  INITIAL STATE  ----------*/
const initialState = { noGoogleMaps: true }


/*----------  ACTION TYPES  ----------*/
const SET_NO_GOOGLE_MAPS = 'SET_NO_GOOGLE_MAPS'
const CLEAR_NO_GOOGLE_MAPS = 'CLEAR_NO_GOOGLE_MAPS'


/*----------  ACTIONS  ----------*/
export const actions = {

  // ACTION CREATORS
  // GOOGLE
  setNoGoogle: () => ({
    type: SET_NO_GOOGLE_MAPS
  }),

  clearNoGoogle: () => ({
    type: CLEAR_NO_GOOGLE_MAPS
  }),

  // THUNK CREATORS
  checkGoogleMaps: () => dispatch => {
    const action = window.google ?
                    actions.clearNoGoogle() :
                    actions.setNoGoogle()
    dispatch(action)
  }

}


/*----------  REDUCER  ----------*/
const actionHandler =  {

  // GOOGLE
  [SET_NO_GOOGLE_MAPS]: state => ({ ...state,
    noGoogleMaps: true
  }),

  [CLEAR_NO_GOOGLE_MAPS]: state => ({ ...state,
    noGoogleMaps: false
  })

}

export default { initialState, actions, actionHandler }
