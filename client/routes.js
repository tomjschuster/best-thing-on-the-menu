import { main, login, singlePlace, explore } from './react'
import { requireAuth } from './utilities/auth'


export default {
  component: main,
  childRoutes: [
    login,
    {
      onEnter: requireAuth,
      childRoutes: [
        explore,
        singlePlace,
        { path: '*', onEnter: (_, replace) => replace('/explore') }
      ]
    }
  ]
}
