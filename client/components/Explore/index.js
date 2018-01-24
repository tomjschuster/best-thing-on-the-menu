import React, { Component } from 'react'
import Explore from './Explore'
import {
  auth as authActions,
  places as placesActions,
  google as googleActions
} from '../../redux/actions'
import { autocompleteOptions } from '../../config'

export default class ExploreWrapper extends Component {
  /*----------  LIFECYCLE  ----------*/
  componentWillMount() {
    if (!this.props.google.googleMapsLoaded) {
      this.checkGoogleMapsLoaded()
    }
  }

  componentDidMount() {
    this.getPlaces()
    this.getAutocompleteInput()

    if (this.props.google.googleMapsLoaded) {
      this.bindGoogleMapsAutocomplete()
    } else {
      this.checkGoogleMapsLoaded()
    }
  }

  componentDidUpdate(prevProps) {
    if (
      !prevProps.google.googleMapsLoaded &&
      this.props.google.googleMapsLoaded
    ) {
      this.bindGoogleMapsAutocomplete()
    }
    if (
      !this.props.google.googleMapsLoaded &&
      this.props.google.loadAttempts < 10
    ) {
      setTimeout(this.checkGoogleMapsLoaded, 500)
    }
  }

  /*----------  REFS  ----------*/
  getAutocompleteInput = () => {
    this.autocompleteInput = document.getElementById('autocomplete-search')
  }

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

  bindGoogleMapsAutocomplete = () => {
    const input = this.autocompleteInput

    // Bind autocomplete functionality to input field
    const autocomplete = new window.google.maps.places.Autocomplete(
      input,
      autocompleteOptions
    )

    // On select, get google place and go to page
    autocomplete.addListener('place_changed', () => {
      console.log(autocomplete.getPlace())
      const { id: googleId, name, vicinity: address } = autocomplete.getPlace()
      // Get place id from db, creating if not exists
      this.checkPlaceAndGoToPage({ googleId, name, address })
    })
  }

  /*----------  RENDER  ----------*/
  render() {
    return (
      <Explore
        auth={this.props.auth}
        places={this.props.places}
        google={this.props.google}
        deletePlace={this.deletePlace}
        checkGoogleMapsLoaded={this.checkGoogleMapsLoaded}
      />
    )
  }
}
