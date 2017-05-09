import React, { Component } from 'react'
import {
  auth as authActions,
} from '../../redux/actions'
import Main from './Main'


export default class MainWrapper extends Component {
  _ = () => {}

  /*----------  DISPATCH EVENTS  ----------*/
  endSession = () => this.props.dispatch(
    authActions.endSession()
  )


  render() {
    const { auth, children } = this.props
    const { endSession } = this
    const props = { auth, children, endSession }

    return (
      <Main { ...props } />
    )
  }
}
