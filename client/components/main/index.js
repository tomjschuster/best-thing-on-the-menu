import React, { Component } from 'react'
import {
  auth as authActions,
} from '../../redux/actions'
import Main from './Main'


export default class MainWrapper extends Component {
  /*----------  DISPATCH EVENTS  ----------*/
  endSession = () => this.props.dispatch(
    authActions.endSession()
  )

  render() {
    return (
      <Main
        auth={this.props.auth}
        endSession={this.endSession}
      >
        {this.props.children}
      </Main>
    )
  }
}
