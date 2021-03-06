import React from 'react'
import components from '../components'
const { Main, Login, Explore, SinglePlace, ErrorPage } = components

export default [
  {
    path: '/',
    redirect: ({ auth: { isAuthenticated } }) =>
      isAuthenticated ? '/explore' : '/login',
    isProtected: false
  },
  {
    path: '/login',
    redirect: ({ auth: { isAuthenticated } }) =>
      isAuthenticated ? '/explore' : null,
    action: () => (
      <Main>
        <Login />
      </Main>
    ),
    isProtected: false
  },
  {
    path: '/explore',
    action: () => (
      <Main>
        <Explore />
      </Main>
    ),
    isProtected: true
  },
  {
    path: '/places/:id',
    action: ({ params }) => (
      <Main>
        <SinglePlace params={params} />
      </Main>
    ),
    isProtected: true
  },
  {
    path: '/error',
    action: ({ error }) => (
      <Main>
        <ErrorPage title="Error" message={error.message} />
      </Main>
    ),
    isProtected: false
  },
  {
    path: '/forbidden',
    action: () => (
      <Main>
        <ErrorPage title="403 Forbidden" />
      </Main>
    ),
    isProtected: true
  }
]
