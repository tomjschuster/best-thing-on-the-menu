import React from 'react'

const Login = ({
  email,
  password,
  updateEmail,
  updatePassword,
  signInPassword
}) => (
  <div>
    <div>
      <a href="/auth/google">
        <img src="/assets/btn_google_signin_light_normal_web.png" />
      </a>
    </div>
    <div>
      <input
        placeholder="Email"
        onChange={updateEmail}
        value={email}
        type="email"
      />
      <input
        placeholder="Password"
        onChange={updatePassword}
        value={password}
        type="password"
      />
      <button onClick={() => signInPassword(email, password)} type="button">
        Sign In
      </button>
    </div>
  </div>
)

export default Login
