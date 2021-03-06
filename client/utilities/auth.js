import axios from 'axios'
import store, { actions } from '../redux'
import { history } from '../router'

export const setupInterceptors = () => {
  axios.interceptors.response.use(
    res => res,
    err => {
      if (
        err.response.status === 401 &&
        store.getState().auth.isAuthenticated
      ) {
        store.dispatch(actions.signOut())
        history.replace({ pathname: '/login', state: { loggedOut: true } })
      } else if (err.response.status === 403) {
        history.replace({ pathname: '/forbidden' })
      }
      throw err
    }
  )
}

export const logOut = () => {
  history.replace({ pathname: '/login', state: { loggedOut: true } })
}
