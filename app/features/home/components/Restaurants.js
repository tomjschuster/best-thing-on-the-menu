import React from 'react'
import {List, ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import Paper from 'material-ui/Paper'
import ActionInfo from 'material-ui/svg-icons/action/info'


const Restaurants =  ({ denormRestaurants, router }) => (
  <Paper>
    <List>
    <Subheader>Featured Restaurants</Subheader>
      { denormRestaurants.map(({ id, name, items, address }) => {
        const itemCount = items ? items.length : 0
        return (
          <div key={ id }>
            <ListItem
              rightIcon={<ActionInfo />}
              primaryText={ `${name} (${itemCount})` }
              secondaryText={ address }
              secondaryTextLines={1}
              onClick={() => router.push(`/restaurants/${id}`)}
            />
            <Divider inset />
          </div>
          )
      })}
    </List>
  </Paper>
)

export default Restaurants
