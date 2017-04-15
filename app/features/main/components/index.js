import React, { Component } from 'react'
import NavBar from './Navbar'
import Paper from 'material-ui/Paper'
import { setupInterceptors } from '../../../auth'

export default class Main extends Component {
  componentWillMount() {
    setupInterceptors()
  }

  render() {
    const { auth, endSession, router, children } = this.props
    return (
      <Paper>
        <NavBar
          isAuthenticated={auth.isAuthenticated}
          endSession={endSession}
          router={router}
        />
        <div id='content' className='container'>
          {children}
        </div>
      </Paper>
    )
  }
}
