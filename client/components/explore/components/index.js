import React, { Component } from 'react'
import Places from './Places'
import SearchBar from './SearchBar'
import { autocompleteOptions } from '../../../config'
import { logOut } from '../../../utilities/auth'

export default class Explore extends Component {

  /*----------  LIFE-CYCLE EVENTS  ----------*/
  componentDidMount() {
    const { auth, checkAuth, getPlaces } = this.props
    if (!auth.isAuthenticated) {
      checkAuth(() => getPlaces(), logOut)
    } else {
      getPlaces()
    }
  }

  /*----------  INSTANCE METHODS  ----------*/
  bindGoogleMapsAutocomplete = () => {
    const input = this.autocompleteInput

      // Bind autocomplete functionality to input field
      const autocomplete = new window.google.maps.places.Autocomplete(input, autocompleteOptions)

      // On select, get google place and go to page
      autocomplete.addListener('place_changed', () => {
        const { checkPlaceAndGoToPage, router } = this.props
        const { id: googleId, name, formatted_address: address } = autocomplete.getPlace()

        // Get place id from db, creating if not exists
        checkPlaceAndGoToPage(googleId, name, address, router)
      })
  }

  /*----------  NODE REFERENCES  ----------*/
  getAutocompleteInput = node => {
    if (node) {
      this.autocompleteInput = node.refs.wrappedInstance.inputNode
    }
  }

  /*----------  RENDER  ----------*/
  render() {
    const { getAutocompleteInput, bindGoogleMapsAutocomplete } = this
    const { places,
            router,
            google,
            checkGoogleMapsLoaded
          } = this.props
    return (
      <div>
        <SearchBar
          getAutocompleteInput={getAutocompleteInput}
          checkGoogleMapsLoaded={checkGoogleMapsLoaded}
          google={google}
          bindGoogleMapsAutocomplete={bindGoogleMapsAutocomplete}
        />
        <Places
          places={places}
          router={router}
        />
      </div>
    )
  }
}
