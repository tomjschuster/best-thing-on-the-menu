import { get } from 'axios'
import { browserHistory } from 'react-router'

/*----------  INITIAL STATE  ----------*/
export const initialState = { isAuthenticated: false }


/*----------  ACTION TYPES  ----------*/
const SIGN_IN = 'SIGN_IN'
const SIGN_OUT = 'SIGN_OUT'


/*----------  ACTIONS  ----------*/
export const actions = {

  // ACTION CREATORS
  signIn: id => ({
      type: SIGN_IN,
      id
    }),

  signOut: () => ({
    type: SIGN_OUT
  }),

  //  THUNK CREATORS
  checkAuth: () => dispatch => (
    get('/auth/check')
      .then(({ data: { id, isAuthenticated} }) => {
        if (isAuthenticated) {
          dispatch(actions.signIn(id))
          return { isAuthenticated }
        } else {
          dispatch(actions.signOut())
          return { isAuthenticated: false }
        }
      })
      .catch(err => {
        dispatch(actions.signOut())
        return { isAuthenticated: false, err }
      })
  )


}


/*----------  REDUCER  ----------*/
const reducer =  {

  [SIGN_IN]: (state, { id }) => ({ ...state,
    id, isAuthenticated: true
  }),

  [SIGN_OUT]: (state) => ({ ...state,
    isAuthenticated: false
  })

}


import { createReducer } from '../../utils'
export default createReducer(initialState, reducer)
