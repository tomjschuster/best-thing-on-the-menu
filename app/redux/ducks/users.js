import axios from 'axios'

/*----------  INITIAL STATE  ----------*/
export const initialState = []
// export const initialState = require('../seed/users').default


/*----------  ACTION TYPES  ----------*/
const RECEIVE_USERS = 'RECEIVE_USERS'


/*----------  ACTIONS  ----------*/
export const actions = {
  // Action Creators
  receiveUsers: users => (
    { type: RECEIVE_USERS,
      users
    }),

  // Thunk Creators
  loadUsers: () => dispatch => {
    axios
      .get('/api/users')
      .then(({ data }) => dispatch(actions.receiveUsers(data)))
  }
}


/*----------  REDUCER  ----------*/
const reducer =  {
  [RECEIVE_USERS]: (state, action) => (
    [...action.users]
  )
}


import { createReducer } from '../../utils'
export default createReducer(initialState, reducer)
