import React, { Component } from 'react'
import NavBar from './Navbar'
import Paper from 'material-ui/Paper'

export default class Main extends Component {
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
