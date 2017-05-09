import React, { Component } from 'react'
import {
  auth as authActions,
} from '../../redux/actions'
import Login from './Login'

export default class LoginWrapper extends Component {
  _ = () => {}

  /*----------  DISPATCH EVENTS  ----------*/
  checkAuth = (onSuccess, onFailure) => this.props.dispatch(
    authActions.checkAuth(onSuccess, onFailure)
  )

  render() {
    const { auth } = this.props
    const { checkAuth } = this
    const props = { auth, checkAuth }
    return (
      <Login { ...props } />
    )
  }
}
