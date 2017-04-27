import React, { Component } from 'react'
import Input from 'react-toolbox/lib/input'
import { Button } from 'react-toolbox/lib/button'


export default class SearchBar extends Component {

  /*----------  LIFE-CYCLE EVENTS  ----------*/
  componentWillMount() {
    const { checkGoogleMapsLoaded, googleMapsLoaded } = this.props

    if (!googleMapsLoaded) {
      checkGoogleMapsLoaded()
    }
  }

  componentDidMount() {
    const { googleMapsLoaded,
            checkGoogleMapsLoaded,
            bindGoogleMapsAutocomplete
          } = this.props

    if (googleMapsLoaded) {
      bindGoogleMapsAutocomplete()
    } else {
      checkGoogleMapsLoaded()
    }
  }

  componentDidUpdate(prevProps) {
    const { googleMapsLoaded,
            checkGoogleMapsLoaded,
            bindGoogleMapsAutocomplete
          } = this.props

    if (!prevProps.googleMapsLoaded && googleMapsLoaded) {
      bindGoogleMapsAutocomplete()
    }
    if (!googleMapsLoaded) {
      checkGoogleMapsLoaded()
    }
  }

  render() {
    const { googleMapsLoaded,
            getAutocompleteInput,
            checkGoogleMapsLoaded
          } = this.props

    return (
      <div>
        <div className='input-field'>
          <Input
            id='autocomplete-search'
            floating
            label={ googleMapsLoaded ?
              'Find a restaurant near Taskstream...' :
              'Failed to load Google Maps'
            }
            hint=''
            placeholder=''
            ref={getAutocompleteInput}
            disabled={!googleMapsLoaded}
            error={!googleMapsLoaded}
          />
        </div>
        { googleMapsLoaded ?
              null :
              <Button
                label='Retry'
                primary
                raised
                icon='refresh'
                onClick={checkGoogleMapsLoaded}
              />
            }
      </div>
    )
  }
}
