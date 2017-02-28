import { connect } from 'react-redux'
import store, { actions } from '../../redux'
import SinglePlace from './components'
import { denormalizeSinglePlace } from '../../utils'

const path = '/places/:id'

const mapState = state => state
const mapDispatch = { ...actions }
const component = connect(mapState, mapDispatch)(SinglePlace)

const onEnter = (nextState, replaceState) => {
  const { places,
          items,
          reviews,
          users,
        } = store.getState()

    const { id } = nextState.params
    const currentPlace = denormalizeSinglePlace(
      Number(id),
      places,
      items,
      reviews,
      users
    )
    if (currentPlace) {
      store.dispatch(actions.receiveCurrentPlace(currentPlace))
    } else {
      replaceState({ nextPathname: nextState.location.pathName }, '/' )
    }
}
export default { path, component, onEnter }

