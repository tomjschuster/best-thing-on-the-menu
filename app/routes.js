import { main, singleRestaurant, home } from './features'

export default {
  component: main,
  childRoutes: [
    singleRestaurant,
    home
  ]
}
