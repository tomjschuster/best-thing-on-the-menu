import { connect } from 'react-redux'
import store, { actions } from '../../redux'
import SingleRestaurant from './components'
import { denormalizeSingleRestaurant } from '../../utils'

const path = '/restaurants/:id'

const mapState = state => state
const mapDispatch = { ...actions }
const component = connect(mapState, mapDispatch)(SingleRestaurant)

const onEnter = (nextState, replaceState) => {
  console.log(nextState)
  const { restaurants,
          items,
          reviews,
          users,
        } = store.getState()

    const { id } = nextState.params
    console.log(id)
    const currentRestaurant = denormalizeSingleRestaurant(
      Number(id),
      restaurants,
      items,
      reviews,
      users
    )
    console.log(currentRestaurant)
    if (currentRestaurant) {
      store.dispatch(actions.receiveCurrentRestaurant(currentRestaurant))
    } else {
      replaceState({ nextPathname: nextState.location.pathName }, '/restaurants' )
    }
}
export default { path, component, onEnter }

