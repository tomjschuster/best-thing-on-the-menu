import React from 'react'
import Input from 'react-toolbox/lib/input'
import { Button } from 'react-toolbox/lib/button'

const inputStyle = {
  maxWidth: '400px',
  margin: '0 auto'
}

const SearchBar = ({ google, checkGoogleMapsLoaded }) => (
  <div>
    <Input
      id="autocomplete-search"
      style={inputStyle}
      floating
      label={'Find a restaurant near Taskstream...'}
      hint=""
      placeholder=""
      disabled={!google.googleMapsLoaded}
      error={google.googleMapsLoaded ? null : 'Failed to load Google Maps'}
    />
    {google.googleMapsLoaded ? null : (
      <Button
        label="Retry"
        primary
        raised
        icon="refresh"
        onClick={checkGoogleMapsLoaded}
      />
    )}
  </div>
)

export default SearchBar
