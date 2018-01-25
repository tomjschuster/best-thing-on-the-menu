import React from 'react'

const Login = ({
  email,
  password,
  error,
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
      {error && <p>{error}</p>}
      <input
        placeholder="Email"
        onChange={updateEmail}
        value={email}
        type="email"
      />
      <input
        placeholder="Password"
        onChange={updatePassword}
        onKeyPress={({ key }) => key === 'Enter' && signInPassword()}
        value={password}
        type="password"
      />
      <button onClick={signInPassword} type="button">
        Sign In
      </button>
    </div>
  </div>
)

export default Login
