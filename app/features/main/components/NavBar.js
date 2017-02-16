import React, {Component} from 'react'

import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import RoomService from 'material-ui/svg-icons/places/room-service'

import FontIcon from 'material-ui/FontIcon'
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'
import Paper from 'material-ui/Paper'
import IconLocationOn from 'material-ui/svg-icons/communication/location-on'

const recentsIcon = <FontIcon className='material-icons'>Explore</FontIcon>
const favoritesIcon = <FontIcon className='material-icons'>Restaurants</FontIcon>

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

class NavBar extends Component {
  constructor(props) {
    super(props)
    this.state = { selectedIndex: 0 }
  }

  navigate(index, path) {
    this.setState({ selectedIndex: index })
    this.props.router.push(path)
  }

  render() {
    return (
      <div>
        <AppBar
          title='Best Thing On The Menu'
          iconElementLeft={<IconButton><RoomService /></IconButton>}
          iconElementRight={
            <FlatButton onClick={() => this.navigate(null, '/')} label='Restaurants' />
          }
        />
      {/*<Paper zDepth={1}>
        <BottomNavigation selectedIndex={this.state.selectedIndex}>
          <BottomNavigationItem
            label=''
            icon={recentsIcon}
            onTouchTap={() => this.navigate(0, '/')}
          />
          <BottomNavigationItem
            label=''
            icon={favoritesIcon}
            onTouchTap={() => this.navigate(1, '/restaurants')}
          />
        </BottomNavigation>
      </Paper>*/}
      </div>
    )
  }
}

export default NavBar
