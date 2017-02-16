import React, { Component } from 'react'
import Paper from 'material-ui/Paper'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = { place: {} }
  }

  componentDidMount() {
    const input = this.refs.autocomplete
    const autocomplete = new google.maps.places.Autocomplete(input)
    autocomplete.addListener('place_changed', () => {
          const googlePlace = autocomplete.getPlace()
          const place = {
            PlaceId: googlePlace.id,
            Name: googlePlace.name,
            Address: googlePlace.formatted_address || '',
            Photos: googlePlace.photos || []
          }
          console.log(place)
          this.setState({ place })
    })
  }

  render() {
    return (
      <div>
        <input ref='autocomplete' />
        <Paper>
          { JSON.stringify(this.state.place)}
        </Paper>
      </div>
    )
  }
}
