import React, { Component } from 'react'
import Paper from 'material-ui/Paper'

export default class Home extends Component {
  componentDidMount() {
    const input = this.refs.autocomplete
    const autocomplete = new google.maps.places.Autocomplete(input)
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
          router.push(`/restaurants/${googlePlace.id}`)
    })
  }

  render() {
    return (
      <div>
        <input ref='autocomplete' />
        <Paper>
          { this.props.restaurants && this.props.restaurants.map(JSON.stringify)}
        </Paper>
      </div>
    )
  }
}
