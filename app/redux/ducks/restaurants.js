import createReducer from '../../utils'

/*----------  INITIAL STATE  ----------*/
export const initialState = {}


/*----------  ACTION TYPES  ----------*/
const RECEIVE_RESTAURANTS = 'RECEIVE_RESTAURANTS'


/*----------  ACTIONS  ----------*/
export const actions = {
  signIn: restaurants => (
    { type: RECEIVE_RESTAURANTS,
      restaurants
    })
}


/*----------  REDUCER  ----------*/
const reducer =  {
  [RECEIVE_RESTAURANTS]: restaurants => ({ ...restaurants })
}


export default createReducer(reducer)
