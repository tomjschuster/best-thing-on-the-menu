import axios from 'axios'
import store, { actions } from '../redux'
import { history } from '../router'

export const setupInterceptors = () => {
  axios.interceptors.response.use(res => res, err => {
    if (err.response.status === 401) {
      store.dispatch(actions.signOut())
      history.replace({ pathname: '/login', state: { loggedOut: true } })
    }
    return err
  })
}

export const logOut = () => {
  console.log('loggin out', history)
  history.replace({ pathname: '/login', state: { loggedOut: true } })
}
