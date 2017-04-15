import axios from 'axios'
import store, { actions } from './redux'
import { browserHistory } from 'react-router'

export const setupInterceptors = () => {
  axios.interceptors.response.use(res => res, err => {
    if (err.status === 401) {
      store.dispatch(actions.signOut())
      browserHistory.push('/login')
    }
    return err
  })
}

export const requireAuth = (nextState, replace, callback) => {
  const { auth } = store.getState()
  // When entering app, check store for authorization
  if (!auth.isAuthenticated) {
  // If no auth in store, check w/ session and update store.
  store.dispatch(actions.checkAuth())
    .then(({ isAuthenticated }) => {
      if (!isAuthenticated) {
        // If not authorized, redirect to login page
        replace({ pathname: '/login', state: { loggedOut: true } })
      }
      callback()
    })
  } else {
    // If authorized, continue
    callback()
  }
}
