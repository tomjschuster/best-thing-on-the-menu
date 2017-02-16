import { main, restaurants, singleRestaurant, home } from './features'

export default {
  component: main,
  childRoutes: [
    singleRestaurant,
    restaurants,
    home
  ]
}
