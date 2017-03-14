import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import indigoTealTheme from './themes/indigoTeal'
import { Router, browserHistory } from 'react-router'
import store from './redux'
import routes from './routes'

render(
  <MuiThemeProvider muiTheme={getMuiTheme(indigoTealTheme)}>
    <Provider store={store}>
      <Router history={browserHistory} routes={routes} />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('app')
)
