import React, { Component } from 'react'
import { history } from '../../router'

export default class Login extends Component {
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.checkAuth(() => history.replace('/explore'))
    } else {
      history.replace('/explore')
    }
  }

  render() {
    return (
      <div>
        <a href='/api/auth/google'>
          <img src='/assets/btn_google_signin_dark_normal_web@2x.png' />
        </a>
      </div>
    )
  }
}
