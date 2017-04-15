import React, { Component } from 'react'
import Places from './Places'
import SearchBar from './SearchBar'
import { autocompleteOptions } from '../../../config'
import { get } from 'axios'
export default class Explore extends Component {
  componentWillMount() {
    this.props.getPlaces()
  }

  componentDidMount() {
    const { setNoGoogle, clearNoGoogle } = this.props

    // get input field
    if (window.google) {
      /*global google: true*/

      clearNoGoogle()
      const input = this.autocompleteInput
      console.log(google, input)
      // bind autocomplete functionality to input field
      const autocomplete = new google.maps.places.Autocomplete(input, autocompleteOptions)

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

        // Navigate to place page
      })
    } else {
      setNoGoogle()
    }
  }

  componentDidUpdate(prevProps) {
    const { errors: {  noGoogle }, clearNoGoogle, setNoGoogle } = this.props
    if (prevProps.noGoogle && window.google) {
      clearNoGoogle()
    }
    if (!noGoogle && !window.google) {
      setNoGoogle()
    }
  }

  getAutocompleteInput = node => {
    if (node) {
      this.autocompleteInput = node.input
    }
  }

  render() {
    const { getAutocompleteInput } = this
    const { places, router, errors: { noGoogle } } = this.props
    return (
      <div>
        <div className='tagline'><h4>Taskstreamer's Lunch Menu Review</h4></div>
        { !noGoogle ?
            <SearchBar getAutocompleteInput={getAutocompleteInput} /> :
            <p>
               Unable to connect to Google Places Service. Feel free to browse
               and review existing restaurants.
            </p>
        }
        <Places
          places={places}
          router={router}
        />
      </div>
    )
  }
}
