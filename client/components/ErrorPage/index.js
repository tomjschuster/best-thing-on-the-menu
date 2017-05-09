import React, { Component } from 'react'


export default class ErrorPage extends Component {
  render() {
    return (
      <div>
        <h1>Error</h1>
        <p>{this.props.error && this.props.error.toString()}</p>
      </div>
    )
  }
}
