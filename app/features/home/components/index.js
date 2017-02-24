/*global google*/

import React, { Component } from 'react'
import Restaurants from './Restaurants'
import SearchBar from './SearchBar'
import { denormalizeRestaurants } from '../../../utils'
import { autocompleteOptions } from '../../../config'

export default class Home extends Component {
  getAutocompleteInput = c => {
    if (c) {
      this.autocompleteInput = c.input
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
        const { restaurants, addRestaurant, router } = this.props

        const place = autocomplete.getPlace()
        const { id, name, address, photos } = place

        // if we have don'te entry for google place add to store
        if (!restaurants.find(({ placeId }) => placeId === place.id)) {
          addRestaurant({ id, name, address, photos })
        }

        // Navigate to restaurant page
        router.push(`/restaurants/${place.id}`)
      })
    }
  }

  render() {
    const { getAutocompleteInput } = this
    const { restaurants, items, reviews, users, router } = this.props
    const denormRestaurants = denormalizeRestaurants(restaurants, items, reviews, users)
    return (
      <div>
        <div className='tagline'><h4>Taskstreamer's Lunch Menu Review</h4></div>
        <SearchBar getAutocompleteInput={getAutocompleteInput} />
        <Restaurants
          denormRestaurants={denormRestaurants}
          router={router}
        />
      </div>
    )
  }
}
