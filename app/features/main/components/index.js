import React, { Component } from 'react'
import NavBar from './Navbar'

export default class Main extends Component {
  render() {
  console.log(this.props)
    return (
      <div>
        <NavBar router={this.props.router}/>
          <div style={{textAlign:'center'}}><h4>Taskstreamer's Lunch Menu Review</h4></div>
          <div className='container' style={{padding: '2%'}}>
            {this.props.children}
          </div>
      </div>
    )
  }
}
