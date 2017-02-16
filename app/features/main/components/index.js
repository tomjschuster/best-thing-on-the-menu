import React, { Component } from 'react'
import NavBar from './Navbar'

export default class Main extends Component {
  render() {
  console.log(this.props)
    return (
      <div>
        <NavBar router={this.props.router}/>
          <div className='container' style={{padding: '2%'}}>
            {this.props.children}
          </div>
      </div>
    )
  }
}
