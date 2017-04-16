/*----------  INITIAL STATE  ----------*/
const initialState = { noGoogle: false }


/*----------  ACTION TYPES  ----------*/
const SET_NO_GOOGLE = 'SET_NO_GOOGLE'
const CLEAR_NO_GOOGLE = 'CLEAR_NO_GOOGLE'


/*----------  ACTIONS  ----------*/
export const actions = {

  // ACTION CREATORS
  // GOOGLE
  setNoGoogle: () => ({
    type: SET_NO_GOOGLE
  }),

  clearNoGoogle: () => ({
    type: CLEAR_NO_GOOGLE
  }),

  // THUNK CREATORS

}


/*----------  REDUCER  ----------*/
const actionHandler =  {

  // GOOGLE
  [SET_NO_GOOGLE]: state => ({ ...state,
    noGoogle: true
  }),

  [CLEAR_NO_GOOGLE]: state => ({ ...state,
    noGoogle: false
  })

}

export default { initialState, actionHandler }
