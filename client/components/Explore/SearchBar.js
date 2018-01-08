import React, { Component } from 'react'
import Input from 'react-toolbox/lib/input'
import { Button } from 'react-toolbox/lib/button'


export default class SearchBar extends Component {

  /*----------  LIFE-CYCLE EVENTS  ----------*/
  componentWillMount() {
    const { checkGoogleMapsLoaded,
            google: { googleMapsLoaded }
          } = this.props

    if (!googleMapsLoaded) {
      checkGoogleMapsLoaded()
    }
  }

  componentDidMount() {
    const { google: { googleMapsLoaded },
            checkGoogleMapsLoaded,
            bindGoogleMapsAutocomplete,
            getAutocompleteInput
          } = this.props
    getAutocompleteInput()

    if (googleMapsLoaded) {
      bindGoogleMapsAutocomplete()
    } else {
      checkGoogleMapsLoaded()
    }
  }

  componentDidUpdate(prevProps) {
    const { google: { googleMapsLoaded, loadAttempts },
            checkGoogleMapsLoaded,
            bindGoogleMapsAutocomplete
          } = this.props

    if (!prevProps.googleMapsLoaded && googleMapsLoaded) {
      bindGoogleMapsAutocomplete()
    }
    if (!googleMapsLoaded && loadAttempts < 10) {
      setTimeout(checkGoogleMapsLoaded, 500)
    }
  }

  render() {
    const { google: { googleMapsLoaded },
            getAutocompleteInput,
            checkGoogleMapsLoaded
          } = this.props

    return (
      <div>
        <div className='input-field'>
          <Input
            id='autocomplete-search'
            floating
            label={'Find a restaurant near Taskstream...'}
            hint=''
            placeholder=''
            disabled={!googleMapsLoaded}
            error={googleMapsLoaded ? null : 'Failed to load Google Maps'}
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
