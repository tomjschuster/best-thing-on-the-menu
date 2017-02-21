import React from 'react'
import {List, ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import Avatar from 'material-ui/Avatar'
import ActionInfo from 'material-ui/svg-icons/action/info'

const ListExampleMessages = () => (
  <div>
      <List>
        <Subheader>Today</Subheader>
        <ListItem
          rightIcon={<ActionInfo />}
          primaryText='Brunch this weekend?'
          secondaryText={'I\'ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?'}
          secondaryTextLines={1}
        />
        <Divider inset={true} />
        <ListItem
          leftAvatar={<Avatar src='images/kolage-128.jpg' />}
          primaryText='Summer BBQ'
          secondaryText={'Wish I could come, but I\'m out of town this weekend'}
          secondaryTextLines={2}
          rightIcon={<div>5</div>}
        />
      </List>
  </div>
)


const Restaurants =  ({ denormRestaurants, router }) => (
  <div>
    <List>
    <Subheader>Featured Restaurants</Subheader>
      { denormRestaurants.map(({ id, name, items, address }) => {
        const itemCount = items ? items.length : 0
        return (
          <ListItem
            key={ id }
            rightIcon={<ActionInfo />}
            primaryText={ `${name} (${itemCount})` }
            secondaryText={ address }
            secondaryTextLines={1}
            onClick={() => router.push(`/restaurants/${id}`)}
          />
          )
      })}
    </List>
  </div>
)

export default Restaurants
