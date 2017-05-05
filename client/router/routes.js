import React from 'react'
import components from '../components'

const { Main, Login, Explore, SinglePlace, Error } = components

export default [
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
    action: () => <Main><SinglePlace /></Main>
  },
  {
    path: '/error',
    action: () => <Main><Error /></Main>
  }
]
