import axios from 'axios'
import { logOut } from '../utilities/auth'
import { actions as formActions } from './forms'

/*----------  INITIAL STATE  ----------*/
export const initialState = { isAuthenticated: false }

/*----------  ACTION TYPES  ----------*/
const SIGN_IN = 'SIGN_IN'
const SIGN_OUT = 'SIGN_OUT'

/*----------  ACTIONS  ----------*/
export const actions = {
  // ACTION CREATORS
  signIn: ({ isAdmin, email, firstName, lastName }) => ({
    type: SIGN_IN,
    isAdmin,
    email,
    firstName,
    lastName
  }),

  signOut: () => ({
    type: SIGN_OUT
  }),

  //  THUNK CREATORS
  signInPassword: (email, password, onSuccess) => dispatch =>
    axios
      .post('/auth/local', { email, password })
      .then(({ data: { isAdmin, email, firstName, lastName } }) => {
        dispatch(actions.signIn({ isAdmin, email, firstName, lastName }))
        return onSuccess && onSuccess()
      })
      .catch(() => dispatch(formActions.updatePassword(''))),

  checkAuth: (onSuccess, onFailure, onError) => dispatch =>
    axios
      .get('/auth/check')
      .then(
        ({
          data: { isAdmin, email, firstName, lastName, isAuthenticated }
        }) => {
          if (isAuthenticated) {
            dispatch(actions.signIn({ isAdmin, email, firstName, lastName }))
            return onSuccess && onSuccess()
          } else {
            dispatch(actions.signOut())
            return onFailure && onFailure()
          }
        }
      )
      .catch(err => {
        dispatch(actions.signOut())
        if (onError) {
          return onError(err)
        }
        return onFailure && onFailure()
      }),

  endSession: () => dispatch =>
    axios
      .post('/auth/logout')
      .then(() => dispatch(actions.signOut()))
      .catch(() => dispatch(actions.signOut()))
      .then(() => logOut())
}

/*----------  REDUCER  ----------*/
export const actionHandler = {
  [SIGN_IN]: (state, { isAdmin, firstName, lastName, email }) => ({
    ...state,
    isAdmin,
    firstName,
    lastName,
    email,
    isAuthenticated: true
  }),

  [SIGN_OUT]: state => ({
    ...state,
    isAuthenticated: false
  })
}

export default { initialState, actions, actionHandler }
