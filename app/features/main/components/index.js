import React from 'react'
import NavBar from './Navbar'
import Paper from 'material-ui/Paper'

const Main = props => (
      <Paper>
        <NavBar router={props.router} />
          <div id='content' className='container'>
            {props.children}
          </div>
      </Paper>
    )

export default Main
