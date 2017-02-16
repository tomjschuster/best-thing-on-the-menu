/*----------  INITIAL STATE  ----------*/
export const initialState = { id: 78 }


/*----------  ACTION TYPES  ----------*/
const SIGN_IN = 'SIGN_IN'


/*----------  ACTIONS  ----------*/
export const actions = {
  signIn: data => (
    { type: SIGN_IN,
      data
    })
}


/*----------  REDUCER  ----------*/
const reducer =  {
  [SIGN_IN]: (_, action) => ({ ...action.data })
}


import { createReducer } from '../../utils'
export default createReducer(initialState, reducer)
