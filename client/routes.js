import { main, login, singlePlace, explore } from './components'


export default {
  component: main,
  childRoutes: [
    login,
    explore,
    singlePlace,
    { path: '*', onEnter: (_, replace) => replace('/explore') }
  ]
}
