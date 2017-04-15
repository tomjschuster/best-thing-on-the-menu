import React from 'react'

import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import RoomService from 'material-ui/svg-icons/places/room-service'
import Exit from 'material-ui/svg-icons/action/exit-to-app'

// allows click/touch triggers
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

const NavBar = ({ router, isAuthenticated }) => (
      <div>
        <AppBar
          title='Best Thing On The Menu'
          iconElementLeft={
            <IconButton onClick={() => isAuthenticated && router.push('/explore')}>
              <RoomService />
            </IconButton>
          }
          iconElementRight={ isAuthenticated ?
            <IconButton onClick={() => router.push('/explore')}>
              <Exit />
            </IconButton> :
            null
          }
        />
      </div>
    )

export default NavBar
