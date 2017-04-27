import React, { Component } from 'react'
import Places from './Places'
import SearchBar from './SearchBar'
import { autocompleteOptions } from '../../../config'

export default class Explore extends Component {

  /*----------  LIFE-CYCLE EVENTS  ----------*/
  componentDidMount() {
    this.props.getPlaces()
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
            google: { googleMapsLoaded },
            checkGoogleMapsLoaded
          } = this.props
    return (
      <div>
        <SearchBar
          getAutocompleteInput={getAutocompleteInput}
          checkGoogleMapsLoaded={checkGoogleMapsLoaded}
          googleMapsLoaded={googleMapsLoaded}
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
