import React, { Component } from 'react'


export default class Login extends Component {
  componentDidMount() {
    const { auth, checkAuth, router } = this.props
    console.log('da props', this.props)
    console.log('da context', this.context)
    if (!auth.isAuthenticated) {
      checkAuth(() => router.replace('/explore'))
    } else {
      router.replace('/explore')
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
