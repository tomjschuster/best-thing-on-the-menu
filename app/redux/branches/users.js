/*
    CURRENTLY NOT IN USE. WILL USE LATER WITH ADMIN PAGES
*/


/*----------  INITIAL STATE  ----------*/
const initialState = []


/*----------  ACTION TYPES  ----------*/
const RECEIVE_USERS = 'RECEIVE_USERS'


/*----------  ACTIONS  ----------*/
export const actions = {

  // ACTION CREATORS
  receiveUsers: users => ({
    type: RECEIVE_USERS,
    users
  }),

  // THUNK CREATORS

}


/*----------  REDUCER  ----------*/
const actionHandler = {
  [RECEIVE_USERS]: (state, action) => ([ ...action.users ])
}


export default { initialState, actionHandler }
