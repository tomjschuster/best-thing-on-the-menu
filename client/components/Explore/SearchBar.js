import React, { Component } from 'react'
import Input from 'react-toolbox/lib/input'
import { Button } from 'react-toolbox/lib/button'

export default class SearchBar extends Component {
  /*----------  LIFE-CYCLE EVENTS  ----------*/
  componentWillMount() {
    if (!this.props.google.googleMapsLoaded) {
      this.props.checkGoogleMapsLoaded()
    }
  }

  componentDidMount() {
    this.props.getAutocompleteInput()

    if (this.props.google.googleMapsLoaded) {
      this.props.bindGoogleMapsAutocomplete()
    } else {
      this.props.checkGoogleMapsLoaded()
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.googleMapsLoaded && this.props.google.googleMapsLoaded) {
      this.props.bindGoogleMapsAutocomplete()
    }
    if (
      !this.props.google.googleMapsLoaded &&
      this.props.google.loadAttempts < 10
    ) {
      setTimeout(this.props.checkGoogleMapsLoaded, 500)
    }
  }

  render() {
    return (
      <div>
        <div className="input-field">
          <Input
            id="autocomplete-search"
            floating
            label={'Find a restaurant near Taskstream...'}
            hint=""
            placeholder=""
            disabled={!this.props.google.googleMapsLoaded}
            error={
              this.props.google.googleMapsLoaded
                ? null
                : 'Failed to load Google Maps'
            }
          />
        </div>
        {this.props.google.googleMapsLoaded ? null : (
          <Button
            label="Retry"
            primary
            raised
            icon="refresh"
            onClick={this.props.checkGoogleMapsLoaded}
          />
        )}
      </div>
    )
  }
}
