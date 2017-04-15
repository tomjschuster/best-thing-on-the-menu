import React, { Component } from 'react'
import GoogleSignIn from './GoogleSignIn'


export default class Login extends Component {

  render() {
    const { router } = this.props

    return (
      <div>
        <div className='tagline'>
          <h4>Taskstreamer's Lunch Menu Review</h4>
        </div>
        <GoogleSignIn router={router} />
      </div>
    )
  }
}
