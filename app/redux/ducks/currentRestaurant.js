import createReducer from '../../utils'

/*----------  INITIAL STATE  ----------*/
export const initialState = {}


/*----------  ACTION TYPES  ----------*/
const RECEIVE_CURRENT_RESTAURANT = 'RECEIVE_CURRENT_RESTAURANT'


/*----------  ACTIONS  ----------*/
export const actions = {
  receiveCurrentRestaurant: restaurant => (
    { type: RECEIVE_CURRENT_RESTAURANT,
      restaurant
    })
}


/*----------  REDUCER  ----------*/
const reducer =  {
  [RECEIVE_CURRENT_RESTAURANT]: restaurant => ({ ...restaurant })
}


export default createReducer(reducer)
