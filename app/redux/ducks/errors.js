/*----------  INITIAL STATE  ----------*/
export const initialState = { noGoogle: false }


/*----------  ACTION TYPES  ----------*/
const SET_NO_GOOGLE = 'SET_NO_GOOGLE'
const CLEAR_NO_GOOGLE = 'CLEAR_NO_GOOGLE'


/*----------  ACTIONS  ----------*/
export const actions = {
  // Action Creators
  setNoGoogle: () => (
    { type: SET_NO_GOOGLE
    }),
  clearNoGoogle: () => (
    { type: CLEAR_NO_GOOGLE
    }),

}


/*----------  REDUCER  ----------*/
const reducer =  {
  [SET_NO_GOOGLE]: state => ({ ...state,
    noGoogle: true
  }),

  [CLEAR_NO_GOOGLE]: state => ({ ...state,
    noGoogle: false
  })

}


import { createReducer } from '../../utils'
export default createReducer(initialState, reducer)
