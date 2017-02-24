import React from 'react'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'

const SearchBar = ({ getAutocompleteInput }) => (
    <Paper style={{ marginBottom: '1em' }}>
      <div className='input-field' style={{ padding: '2%' }}>
        <TextField
          id='autocomplete-search'
          placeholder='Find a restaurant near Taskstream...'
          ref={getAutocompleteInput}
          style={{ marginBottom: '1em' }}
        />
      </div>
    </Paper>
  )

export default SearchBar
