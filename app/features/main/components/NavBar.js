import React from 'react'

import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import RoomService from 'material-ui/svg-icons/places/room-service'

// allows click/touch triggers
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

const NavBar = props => (
      <div>
        <AppBar
          title='Best Thing On The Menu'
          iconElementLeft={
            <IconButton onClick={() => props.router.push('/explore')}>
              <RoomService />\
            </IconButton>
          }
        />
      </div>
    )

export default NavBar
