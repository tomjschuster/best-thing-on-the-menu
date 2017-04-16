import React from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'

const SearchBar = ({ getAutocompleteInput }) => (
    <Paper style={{ marginBottom: '1em' }}>
      <div className='input-field' style={{ padding: '2% 10%' }}>
        <TextField
          id='autocomplete-search'
          placeholder='Find a restaurant near Taskstream...'
          ref={getAutocompleteInput}
          style={{ margin: '1em', width: '100%'}}
        />
      </div>
    </Paper>
  )

export default SearchBar
