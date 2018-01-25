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
      <Provider store={store}>{component}</Provider>
    </ThemeProvider>,
    node
  )
}

const renderOrRedirect = ({ redirect, component }) =>
  redirect ? history.push(redirect) : renderComponent(component)

const render = location => {
  router
    .resolve(routes, location, store.getState())
    .then(renderOrRedirect)
    .catch(error => {
      if (error.status === 401) {
        history.replace({ pathname: '/login' })
      } else {
        router
          .resolve(routes, { ...location, error }, store.getState())
          .then(renderOrRedirect)
      }
    })
}

history.listen(render)
store.dispatch(authActions.checkAuth()).then(() => render(history.location))
