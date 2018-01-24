import React from 'react'
import Place from './Place'

const placesStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'left',
  height: '100%',
  maxWidth: 'calc(400px + 4em)',
  margin: '0 auto'
}

const Places = ({ places, deletePlace, isAdmin }) => (
  <div style={placesStyle}>
    {places.map(place => (
      <Place
        key={place.id}
        place={place}
        isAdmin={isAdmin}
        deletePlace={deletePlace}
      />
    ))}
  </div>
)

export default Places
