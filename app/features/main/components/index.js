import React, { Component } from 'react'
import NavBar from './Navbar'
import Paper from 'material-ui/Paper'
import { setupInterceptors } from '../../../auth'

export default class Main extends Component {
  componentWillMount() {
    setupInterceptors()
  }

  render() {
    const { router, children } = this.props
    return (
      <Paper>
        <NavBar router={router} />
          <div id='content' className='container'>
            {children}
          </div>
      </Paper>
    )
  }
}
