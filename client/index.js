import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './redux'
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
  router.resolve(routes, location)
    .then(renderComponent)
    .catch(error => {
      console.log(error)
      router.resolve(routes, { ...location, error })
        .then(renderComponent)
    })

}

console.log(history)
console.log(history.location)
render(history.location)
history.listen(render)
