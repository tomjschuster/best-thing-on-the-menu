import React, { Component } from 'react'
import IconButton from 'material-ui/IconButton';


export default class GoogleSignIn extends Component {

  render() {
    return (
      <div>
        <a href='/api/auth/google'>
        <IconButton>
          <img src='/assets/btn_google_signin_dark_normal_web@2x.png' />
        </IconButton>
        </a>
      </div>
     )
  }
}
