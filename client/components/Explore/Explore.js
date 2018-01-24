import React from 'react'
import Places from './Places'
import SearchBar from './SearchBar'

const Explore = ({
  checkGoogleMapsLoaded,
  google,
  auth,
  places,
  router,
  deletePlace
}) => (
  <div>
    <SearchBar checkGoogleMapsLoaded={checkGoogleMapsLoaded} google={google} />
    <Places
      isAdmin={auth.isAdmin}
      places={places}
      router={router}
      deletePlace={deletePlace}
    />
  </div>
)

export default Explore
