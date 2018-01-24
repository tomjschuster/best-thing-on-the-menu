import React, { Component } from 'react'
import Places from './Places'
import SearchBar from './SearchBar'
import { autocompleteOptions } from '../../config'
import { logOut } from '../../utilities/auth'

export default class Explore extends Component {
  /*----------  LIFE-CYCLE EVENTS  ----------*/
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.checkAuth(() => this.props.getPlaces(), logOut)
    } else {
      this.props.getPlaces()
    }
  }

  /*----------  INSTANCE METHODS  ----------*/
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
      this.props.checkPlaceAndGoToPage({ googleId, name, address })
    })
  }

  /*----------  NODE REFERENCES  ----------*/
  getAutocompleteInput = () => {
    this.autocompleteInput = document.getElementById('autocomplete-search')
  }

  /*----------  RENDER  ----------*/
  render() {
    return (
      <div>
        <SearchBar
          getAutocompleteInput={this.getAutocompleteInput}
          checkGoogleMapsLoaded={this.props.checkGoogleMapsLoaded}
          google={this.props.google}
          bindGoogleMapsAutocomplete={this.bindGoogleMapsAutocomplete}
        />
        <Places
          isAdmin={this.props.auth.isAdmin}
          places={this.props.places}
          router={this.props.router}
          deletePlace={this.props.deletePlace}
        />
      </div>
    )
  }
}
