import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'

export default class SearchBar extends Component {
  componentDidMount() {
    this.props.bindGoogleMapsAutocomplete()
  }

  render() {
    return (
      <Paper style={{ marginBottom: '1em' }}>
        <div className='input-field' style={{ padding: '2% 10%' }}>
          <TextField
            id='autocomplete-search'
            placeholder='Find a restaurant near Taskstream...'
            ref={this.props.getAutocompleteInput}
            style={{ margin: '1em', width: '100%'}}
          />
        </div>
      </Paper>
    )
  }
}
