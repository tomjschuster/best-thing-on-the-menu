import axios from 'axios'


/*----------  INITIAL STATE  ----------*/
const initialState = { isAuthenticated: false }


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
    axios
      .get('/api/auth/check')
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
  ),

  endSession: () => () => (
    axios
      .post('/api/auth/logout')
      .then(res => {
        console.log('then', res)
      })
      .catch(err => {
        console.log('catch', err)
      })
  )

}


/*----------  REDUCER  ----------*/
const actionHandler =  {

  [SIGN_IN]: (state, { id }) => ({ ...state,
    id, isAuthenticated: true
  }),

  [SIGN_OUT]: (state) => ({ ...state,
    isAuthenticated: false
  })

}


export default { initialState, actionHandler }
