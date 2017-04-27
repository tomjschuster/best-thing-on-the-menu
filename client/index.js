import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import store from './redux'
import routes from './routes'
import theme from './theme'
import { ThemeProvider } from 'react-css-themr'
require('./utilities/auth').setupInterceptors()

render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <Router history={browserHistory} routes={routes} />
    </Provider>
  </ThemeProvider>,
  document.getElementById('app')
)
