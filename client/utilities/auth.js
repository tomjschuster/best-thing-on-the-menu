import axios from 'axios'
import store, { actions } from '../redux'
import { browserHistory } from 'react-router'

export const setupInterceptors = () => {
  axios.interceptors.response.use(res => res, err => {
    if (err.response.status === 401) {
      store.dispatch(actions.signOut())
      browserHistory.replace({ pathname: '/login', state: { loggedOut: true } })
    }
    return err
  })
}

export const logOut = () => {
  browserHistory.replace({ pathname: '/login', state: { loggedOut: true } })
}
