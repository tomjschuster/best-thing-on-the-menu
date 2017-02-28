/*global google*/

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
    // get input field
    const input = this.autocompleteInput

    if (input) {
      // bind autocomplete functionality to input field
      const autocomplete = new google.maps.places.Autocomplete(input, autocompleteOptions)

      // on select, get google place and go to page
      autocomplete.addListener('place_changed', () => {
        const { places, addPlace, router } = this.props

        const place = autocomplete.getPlace()
        const { id, name, address, photos } = place

        // if we have don'te entry for google place add to store
        if (!places.find(({ placeId }) => placeId === place.id)) {
          addPlace({ id, name, address, photos })
        }

        // Navigate to place page
        router.push(`/places/${place.id}`)
      })
    }
  }

  render() {
    const { getAutocompleteInput } = this
    const { places, items, reviews, users, router } = this.props
    const denormPlaces = denormalizePlaces(places, items, reviews, users)
    return (
      <div>
        <div className='tagline'><h4>Taskstreamer's Lunch Menu Review</h4></div>
        <SearchBar getAutocompleteInput={getAutocompleteInput} />
        <Places
          denormPlacess={denormPlaces}
          router={router}
        />
      </div>
    )
  }
}
