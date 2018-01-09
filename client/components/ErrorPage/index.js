import React from 'react'

const ErrorPage = ({ error }) => (
  <div>
    <h1>Error</h1>
    <p>{error && error.toString()}</p>
  </div>
)

export default ErrorPage
