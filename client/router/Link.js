import React from 'react'
import { history } from './index'

export class Link extends React.Component {
  handleClick = evt => {
    this.props.onClick && this.props.onClick(evt)
    if (
      !evt.defaultPrevented &&
      evt.button === 0 &&
      this.props.to &&
      !(evt.metaKey || evt.altKey || evt.ctrlKey || evt.shiftKey)
    ) {
      console.log('here')
      evt.preventDefault()
      this.props.replace
        ? history.replace(this.props.to)
        : history.push(this.props.to)
    }
  }

  render() {
    const { _replace, ...props } = this.props // eslint-disable-line no-unused-vars

    const to =
      typeof this.props.to === 'string'
        ? { pathname: this.props.to }
        : this.props.to

    return (
      <a {...props} onClick={this.handleClick} href={history.createHref(to)} />
    )
  }
}

export default Link
