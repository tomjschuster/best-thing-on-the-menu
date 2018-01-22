import React from 'react'

const ErrorPage = ({ title, message }) => (
  <div>
    <h1>{title}</h1>
    {message && <p>{message}</p>}
  </div>
)

export default ErrorPage
