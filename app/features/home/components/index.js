import React, { Component } from 'react'
import Places from './Places'
import SearchBar from './SearchBar'
import { denormalizePlaces } from '../../../utils'
import { autocompleteOptions } from '../../../config'

export default class Home extends Component {
  getAutocompleteInput = node => {
    if (node) {
      this.autocompleteInput = node.input
    }
  }

  componentDidMount = () => {
    const { setNoGoogle, clearNoGoogle } = this.props

    // get input field
    if (window.google) {
      /*global google: true*/

      clearNoGoogle()
      const input = this.autocompleteInput

      // bind autocomplete functionality to input field
      const autocomplete = new google.maps.places.Autocomplete(input, autocompleteOptions)

      // on select, get google place and go to page
      autocomplete.addListener('place_changed', () => {
        const { places, addPlace, router } = this.props

        const googlePlace = autocomplete.getPlace()
        const { id: googleId, name, formatted_address: address, photos } = googlePlace
        const foundPlace = places.find((place) => place.googleId === googleId)
        // if we have don'te entry for google place add to store
        const id = foundPlace ? foundPlace.id : places.length + 1
        if (!foundPlace) {
          // temporary length id
          addPlace({ id, googleId, name, address, photos })
        }

        // Navigate to place page
        router.push(`/places/${id}`)
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

  render() {
    const { getAutocompleteInput } = this
    const { places, items, reviews, users, router, errors: { noGoogle } } = this.props
    const denormPlaces = denormalizePlaces(places, items, reviews, users)
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
          denormPlaces={denormPlaces}
          router={router}
        />
      </div>
    )
  }
}
