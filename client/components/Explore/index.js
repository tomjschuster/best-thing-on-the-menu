import React, { Component } from 'react'
import Explore from './Explore'
import {
  auth as authActions,
  places as placesActions,
  google as googleActions
} from '../../redux/actions'

export default class ExploreWrapper extends Component {
  /*----------  DISPATCH EVENTS  ----------*/
  checkAuth = (onSuccess, onFailure) =>
    this.props.dispatch(authActions.checkAuth(onSuccess, onFailure))

  getPlaces = () => this.props.dispatch(placesActions.getPlaces())

  checkPlaceAndGoToPage = ({ googleId, name, address }) =>
    this.props.dispatch(
      placesActions.checkPlaceAndGoToPage({ googleId, name, address })
    )

  deletePlace = id => this.props.dispatch(placesActions.deletePlace(id))

  checkGoogleMapsLoaded = () =>
    this.props.dispatch(googleActions.checkGoogleMapsLoaded())

  /*----------  RENDER  ----------*/
  render() {
    return (
      <Explore
        auth={this.props.auth}
        places={this.props.places}
        google={this.props.google}
        checkAuth={this.checkAuth}
        getPlaces={this.getPlaces}
        checkPlaceAndGoToPage={this.checkPlaceAndGoToPage}
        deletePlace={this.deletePlace}
        checkGoogleMapsLoaded={this.checkGoogleMapsLoaded}
      />
    )
  }
}
