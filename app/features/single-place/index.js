import { connect } from 'react-redux'
import store, { actions } from '../../redux'
import SinglePlace from './components'

const path = '/places/:id'

const mapState = state => state
const mapDispatch = { ...actions }
const component = connect(mapState, mapDispatch)(SinglePlace)

const onEnter = (nextState, replaceState) => {
  const { places } = store.getState()
  const { id } = nextState.params
  const currentPlace = places.find(place => place.id === Number(id))
  if (currentPlace) {
    store.dispatch(actions.receiveCurrentPlace(currentPlace))
  } else {
    replaceState({ nextPathname: nextState.location.pathName }, '/' )
  }
}
export default { path, component, onEnter }

