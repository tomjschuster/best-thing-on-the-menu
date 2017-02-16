import React, { Component } from 'react'
import Paper from 'material-ui/Paper'

export default class Home extends Component {
  componentDidMount() {
    const input = this.refs.autocomplete
    const autocompleteOptions = {
      types: ['establishment'],
      bounds: {
        south: 40.734634,
        north: 40.752200,
        west: -74.002601,
        east: -73.981465
      },
      strictBounds: true
    }
    const autocomplete = new google.maps.places.Autocomplete(input, autocompleteOptions)
    autocomplete.addListener('place_changed', () => {
          const googlePlace = autocomplete.getPlace()
          const { restaurants, addRestaurant, router } = this.props
          if (!restaurants.find(({ placeId }) => placeId === googlePlace.id)) {
            const place = {
              id: googlePlace.id,
              name: googlePlace.name,
              address: googlePlace.formatted_address || '',
              photos: googlePlace.photos || []
            }
            addRestaurant(place)
          }
          console.log(googlePlace)
          router.push(`/restaurants/${googlePlace.id}`)
    })
  }

  render() {
    return (
      <div>
        <input ref='autocomplete' />
      </div>
    )
  }
}
