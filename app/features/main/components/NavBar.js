import React from 'react'
import { Link } from 'react-router'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import RoomService from 'material-ui/svg-icons/places/room-service'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

const NavBar = () => {
  return (
    <div>
      <AppBar
        title='Best Thing On The Menu'
        iconElementLeft={<IconButton><RoomService /></IconButton>}
        iconElementRight={
          <FlatButton onClick={console.log} label='Random Restaurant' />
        } />
      <Link to='/'>Home</Link>
      <Link to='/restaurants'>Restaurants</Link>
      <Link to='/restaurants/1'>Restaurant 1</Link>
    </div>
  )
}
export default NavBar
