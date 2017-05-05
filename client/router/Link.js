import React from 'react'
import { history } from './index'

export class Link extends React.Component {

  handleClick = (evt) => {
    const { onClick, replace, to, target } = this.props
    onClick && onClick(evt)

    if (
      !evt.defaultPrevented &&
      evt.button === 0 &&
      target &&
      !!(evt.metaKey || evt.altKey || evt.ctrlKey || evt.shiftKey)
    ) {

      event.preventDefault()
      replace ? history.replace(to) : history.push(to)

    }

  }

  render() {
    const { replace, to, ...props } = this.props // eslint-disable-line no-unused-vars

    const href = history.createHref( typeof to === 'string' ? { pathname: to } : to )

    return <a {...props} onClick={this.handleClick} href={href} />
  }
}

export default Link
