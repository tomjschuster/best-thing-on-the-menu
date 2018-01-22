import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './redux'
import { actions as authActions } from './redux/auth'
import theme from './theme'
import { ThemeProvider } from 'react-css-themr'
require('./utilities/auth').setupInterceptors()

import router, { history, routes } from './router'

const node = document.getElementById('app')

const renderComponent = component => {
  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        { component }
      </Provider>
    </ThemeProvider>,
    node
  )
}

const render = (location) => {
  const { auth : { isAuthenticated } } = store.getState()
  router.resolve(routes, location, isAuthenticated)
    .then(renderComponent)
    .catch(error => {
      if (error.status === 401) {
        history.replace({ pathname: '/login' })
      } else {
        router
          .resolve(routes, { ...location, error }, isAuthenticated)
          .then(renderComponent)
      }
    })
}

history.listen(render)
store.dispatch(authActions.checkAuth()).then(() => render(history.location))
