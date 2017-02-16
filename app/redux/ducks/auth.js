import createReducer from '../../utils'

/*----------  INITIAL STATE  ----------*/
export const initialState = {}


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
  [SIGN_IN]: data => ({ ...data })
}


export default createReducer(reducer)
