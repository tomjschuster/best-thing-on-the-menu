import { main, login, singlePlace, explore } from './features'
import { onEnterAuth } from './auth'


export default {
  component: main,
  childRoutes: [
    login,
    {
      onEnter: onEnterAuth,
      childRoutes: [
        explore,
        singlePlace,
        { path: '*', onEnter: (_, replace) => replace('/explore')}
      ]
    }
  ]
}
