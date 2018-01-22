import React, { Component } from 'react'
import {
  auth as authActions,
} from '../../redux/actions'
import Login from './Login'

// export default class LoginWrapper extends Component {
//   render() {
//     return (
//       <Login
//         auth={this.props.auth}
//       />
//     )
//   }
// }

const LoginWrapper = ({ auth }) => <Login auth={auth} />

export default LoginWrapper
