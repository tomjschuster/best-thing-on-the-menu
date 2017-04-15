import { main, login, singlePlace, explore } from './features'
import { requireAuth } from './auth'


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
