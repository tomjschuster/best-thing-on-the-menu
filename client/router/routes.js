import React from 'react'
import components from '../components'
const { Main, Login, Explore, SinglePlace, ErrorPage } = components

export default [
  {
    path: '/',
    action: () => <Main><Login /></Main>
  },
  {
    path: '/login',
    action: () => <Main><Login /></Main>
  },
  {
    path: '/explore',
    action: () => <Main><Explore /></Main>
  },
  {
    path: '/places/:id',
    action: ({ params }) => <Main><SinglePlace params={params} /></Main>
  },
  {
    path: '/error',
    action: ({ error }) => <Main><ErrorPage error={error} /></Main>
  }
]
