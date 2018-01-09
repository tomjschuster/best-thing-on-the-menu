import React, { Component } from 'react'
import {
  auth as authActions,
} from '../../redux/actions'
import Login from './Login'

export default class LoginWrapper extends Component {
  /*----------  DISPATCH EVENTS  ----------*/
  checkAuth = (onSuccess, onFailure) => this.props.dispatch(
    authActions.checkAuth(onSuccess, onFailure)
  )

  render() {
    return (
      <Login
        auth={this.props.auth}
        checkAuth={this.checkAuth}
      />
    )
  }
}
