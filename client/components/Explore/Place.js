import React from 'react'
import { Link } from '../../router'
import { Button } from 'react-toolbox/lib/button'

const pluralize = (count, singular, plural) =>
  count === 1 ? `${count} ${singular}` : `${count} ${plural}`

const linkStyle = {
  fontWeight: 600,
  textDecoration: 'none',
  letterSpacing: 1.25,
  color: '#000'
}

const PlaceLink = ({ place }) => (
  <Link to={`/places/${place.id}`} style={linkStyle}>
    {place.name}
  </Link>
)

const addressStyle = {
  marginBottom: 0
}

const CountSpan = ({ numItems, numReviews }) => (
  <span>
    {pluralize(numItems, 'item', 'items')},{' '}
    {pluralize(numReviews, 'review', 'reviews')}
  </span>
)

const Address = ({ address }) => <p style={addressStyle}>{address}</p>

const deleteButtonStyle = {
  float: 'right'
}

const DeleteButton = ({ placeId, isAdmin, deletePlace }) =>
  isAdmin ? (
    <Button
      style={deleteButtonStyle}
      icon="delete"
      onClick={evt => {
        evt.preventDefault()
        evt.stopPropagation()
        deletePlace(placeId)
      }}
      mini
      floating
    />
  ) : null

const placeStyle = {
  width: '400px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1em',
  margin: '1em'
}

const linkTextStyle = {
  margin: 0
}

const Place = ({ place, isAdmin, deletePlace }) => (
  <div style={placeStyle}>
    <div>
      <p style={linkTextStyle}>
        <PlaceLink place={place} />
        <CountSpan numItems={place.numItems} numReviews={place.numReviews} />
      </p>
      <Address address={place.address} />
    </div>
    <DeleteButton
      placeId={place.id}
      isAdmin={isAdmin}
      deletePlace={deletePlace}
    />
  </div>
)

export default Place
