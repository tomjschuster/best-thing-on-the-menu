import React, { Component } from 'react'
import Login from './Login'
import { auth as authActions, forms as formActions } from '../../redux/actions'
import { history } from '../../router'
export default class LoginWrapper extends Component {
  /*----------  DISPATCH EVENTS  ----------*/
  updateEmail = ({ target: { value: email } }) =>
    this.props.dispatch(formActions.updateEmail(email))

  updatePassword = ({ target: { value: password } }) =>
    this.props.dispatch(formActions.updatePassword(password))

  signInPassword = () =>
    this.props.dispatch(
      authActions.signInPassword(
        this.props.forms.login.email,
        this.props.forms.login.password,
        () => history.push('/explore')
      )
    )

  render() {
    return (
      <Login
        email={this.props.forms.login.email}
        password={this.props.forms.login.password}
        error={this.props.forms.login.error}
        updateEmail={this.updateEmail}
        updatePassword={this.updatePassword}
        signInPassword={this.signInPassword}
      />
    )
  }
}
