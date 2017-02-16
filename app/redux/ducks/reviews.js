import createReducer from '../../utils'

/*----------  INITIAL STATE  ----------*/
export const initialState = {}


/*----------  ACTION TYPES  ----------*/
const RECEIVE_REVIEWS = 'RECEIVE_REVIEWS'


/*----------  ACTIONS  ----------*/
export const actions = {
  signIn: reviews => (
    { type: RECEIVE_REVIEWS,
      reviews
    })
}


/*----------  REDUCER  ----------*/
const reducer =  {
  [RECEIVE_REVIEWS]: reviews => ({ ...reviews })
}


export default createReducer(reducer)
