import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import store from './redux'
import routes from './routes'


require('./auth').setupInterceptors()

render(
    <Provider store={store}>
      <Router history={browserHistory} routes={routes} />
    </Provider>,
  document.getElementById('app')
)
