import { main, singlePlace, home } from './features'

export default {
  component: main,
  childRoutes: [
    singlePlace,
    home
  ]
}
