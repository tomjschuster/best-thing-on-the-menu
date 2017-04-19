import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh'

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
      <Paper style={{ marginBottom: '1em' }}>
        <div className='input-field' style={{ display: 'inline-block', padding: '2% 10% 0%', width: '60%' }}>
          <TextField
            id='autocomplete-search'
            placeholder={ googleMapsLoaded ?
              'Find a restaurant near Taskstream...' :
              'Failed to load Google Maps'
            }
            ref={getAutocompleteInput}
            style={{ margin: '1em', width: '100%' }}
            disabled={!googleMapsLoaded}
          />
        </div>
        { googleMapsLoaded ?
              null :
              <RaisedButton
                label='Retry'
                labelPosition='before'
                primary={true}
                icon={<RefreshIcon />}
                style={{ margin: '1em', width: '15%' }}
                onTouchTap={checkGoogleMapsLoaded}
              />
            }
      </Paper>
    )
  }
}
