import React, { Component } from 'react'
import Places from './Places'
import SearchBar from './SearchBar'
import { autocompleteOptions } from '../../../config'
import RaisedButton from 'material-ui/RaisedButton'

export default class Explore extends Component {

  /*----------  LIFE-CYCLE EVENTS  ----------*/
  componentWillMount() {
    const { getPlaces,
            google: { googleMapsLoaded },
            checkGoogleMapsLoaded
          } = this.props
    getPlaces()
    if (!googleMapsLoaded) {
      // checkGoogleMapsLoaded()
    }
  }

  componentDidMount() {
    const { google: { googleMapsLoaded }, checkGoogleMapsLoaded } = this.props
    if (!googleMapsLoaded) {
      // checkGoogleMapsLoaded()
    }
  }

  /*----------  INSTANCE METHODS  ----------*/
  bindGoogleMapsAutocomplete = () => {
    const input = this.autocompleteInput
      // bind autocomplete functionality to input field
      const autocomplete = new window.google.maps.places.Autocomplete(input, autocompleteOptions)

      // on select, get google place and go to page
      autocomplete.addListener('place_changed', () => {
        const { places, createPlaceAndGoToPage, router } = this.props

        const googlePlace = autocomplete.getPlace()
        const { id: googleId, name, formatted_address: address } = googlePlace
        const currentPlace = places.find((place) => place.googleId === googleId)
        // if we have don'te entry for google place add database
        if (!currentPlace) {
          createPlaceAndGoToPage(googleId, name, address, router)
        } else {
          router.push(`/places/${currentPlace.id}`)
        }
      })
  }

  /*----------  NODE REFERENCES  ----------*/
  getAutocompleteInput = node => {
    if (node) {
      this.autocompleteInput = node.input
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
        <div className='tagline'><h4>Taskstreamer's Lunch Menu Review</h4></div>
        { googleMapsLoaded ?
            <SearchBar
              getAutocompleteInput={getAutocompleteInput}
              bindGoogleMapsAutocomplete={bindGoogleMapsAutocomplete}
            /> :
            <label>
               Unable to connect to Google Places Service.
              <RaisedButton
                label='Retry'
                primary={true}
                onClick={checkGoogleMapsLoaded}
              />
            </label>
        }
        <Places
          places={places}
          router={router}
        />
      </div>
    )
  }
}
