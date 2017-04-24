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
        <div className='input-field' style={{ display: 'inline-block', padding: '2% 10% 0%', width: '60%' }}>
          <Input
            id='autocomplete-search'
            placeholder={ googleMapsLoaded ?
              'Find a restaurant near Taskstream...' :
              'Failed to load Google Maps'
            }
            ref={getAutocompleteInput}
            // style={{ margin: '1em', width: '100%' }}
            disabled={!googleMapsLoaded}
          />
        </div>
        { googleMapsLoaded ?
              null :
              <Button
                label='Retry'
                primary
                raised
                icon='refresh'
                // style={{ margin: '1em', width: '15%' }}
                onClick={checkGoogleMapsLoaded}
              />
            }
      </div>
    )
  }
}
