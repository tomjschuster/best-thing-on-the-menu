import React from 'react'
import NavBar from './Navbar'

const Main = props => (
      <div>
        <NavBar router={props.router} />
          <div className='tagline'><h4>Taskstreamer's Lunch Menu Review</h4></div>
          <div id='content' className='container'>
            {props.children}
          </div>
      </div>
    )

export default Main
