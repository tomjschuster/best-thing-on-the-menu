import axios from 'axios'


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
  checkAuth: (onSuccess, onFailure, onError) => dispatch => (
    axios
      .get('/api/auth/check')
      .then(({ data: { id, isAuthenticated} }) => {
        if (isAuthenticated) {
          dispatch(actions.signIn(id))
          return onSuccess && onSuccess()
        } else {
          dispatch(actions.signOut())
          return onFailure && onFailure()
        }
      })
      .catch(err => {
        dispatch(actions.signOut())
        if (onError) {
          return onError(err)
        }
        return onFailure && onFailure()
      })
  ),

  endSession: () => dispatch => (
    axios
      .post('/api/auth/logout')
      .then(() => dispatch(actions.signOut()))
      .catch(() => dispatch(actions.signOut()))
  )

}


/*----------  REDUCER  ----------*/
export const actionHandler =  {

  [SIGN_IN]: (state, { id }) => ({
    ...state, id, isAuthenticated: true
  }),

  [SIGN_OUT]: (state) => ({
    ...state, isAuthenticated: false
  })

}


export default { initialState, actions, actionHandler }
