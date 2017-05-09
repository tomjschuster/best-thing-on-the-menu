import React, { Component } from 'react'
import Explore from './Explore'
import {
  auth as authActions,
  places as placesActions,
  google as googleActions
} from '../../redux/actions'


export default class ExploreWrapper extends Component {
  _ = () => {}

  /*----------  DISPATCH EVENTS  ----------*/
  checkAuth = (onSuccess, onFailure) => this.props.dispatch(
    authActions.checkAuth(onSuccess, onFailure)
  )

  getPlaces = () => this.props.dispatch(
    placesActions.getPlaces()
  )

  checkPlaceAndGoToPage = (googleId, name, address) => this.props.dispatch(
    placesActions.checkPlaceAndGoToPage(googleId, name, address)
  )

  checkGoogleMapsLoaded = () => this.props.dispatch(
    googleActions.checkGoogleMapsLoaded()
  )


  /*----------  RENDER  ----------*/
  render() {
    const { auth, places, google } = this.props
    const {
      checkAuth,
      getPlaces,
      checkPlaceAndGoToPage,
      checkGoogleMapsLoaded
    } = this
    const props = {
      auth,
      places,
      google,
      checkAuth,
      getPlaces,
      checkPlaceAndGoToPage,
      checkGoogleMapsLoaded
    }

    return (
      <Explore {...props} />
    )
  }
}
