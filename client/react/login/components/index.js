import React, { Component } from 'react'


export default class Login extends Component {

  render() {
    const { router } = this.props

    return (
      <div>
        <a href='/api/auth/google'>
          <img src='/assets/btn_google_signin_dark_normal_web@2x.png' />
        </a>
      </div>
    )
  }
}
