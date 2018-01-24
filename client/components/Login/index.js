import React, { Component } from 'react'
import Login from './Login'

export default class LoginWrapper extends Component {
  componentWillMount() {
    if (this.props.isAuthenticated) history.push('/explore')
  }

  render() {
    return <Login auth={this.props.auth} />
  }
}
