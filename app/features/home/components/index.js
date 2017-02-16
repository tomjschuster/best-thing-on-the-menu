import React, { Component } from 'react'
import Paper from 'material-ui/Paper'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = { restaurant: {} }
  }

  componentDidMount() {
    const input = this.refs.autocomplete
    const autocomplete = new google.maps.places.Autocomplete(input)
    autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace()
          const restaurant = {
            restaurantId: place.id,
            name: place.name,
            address: place.formatted_address || '',
            photos: place.photos || []
          }
          console.log(place)
          this.setState({ restaurant })
    })
  }

  render() {
    return (
      <div>
        <input ref='autocomplete' />
        <Paper>
          { JSON.stringify(this.state.restaurant)}
        </Paper>
      </div>
    )
  }
}
