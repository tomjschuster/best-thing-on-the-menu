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

export const onEnterAuth = (nextState, replace, callback) => {
  const { auth } = store.getState()

    if (!auth.isAuthenticated) {
    store.dispatch(actions.checkAuth())
      .then(({ isAuthenticated }) => {
        if (!isAuthenticated) {
          replace('/login')
        }
        callback()
      })
    } else {
      callback()
    }
}
