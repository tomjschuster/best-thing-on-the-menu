import React, { Component } from 'react'
import Restaurants from './Restaurants'
import { denormalizeRestaurants } from '../../../utils'
import { autocompleteOptions } from '../../../config'

export default class Home extends Component {
  componentDidMount() {
    // get input field
    const input = this.refs.autocomplete

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

  render() {
    const { restaurants, items, reviews, users } = this.props
    const denormRestaurants = denormalizeRestaurants(restaurants, items, reviews, users)
    return (
      <div>
        <input ref='autocomplete' />
        <Restaurants denormRestaurants={denormRestaurants} />
      </div>
    )
  }
}
