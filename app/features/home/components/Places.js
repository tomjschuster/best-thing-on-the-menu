import React from 'react'
import {List, ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import Paper from 'material-ui/Paper'
import ActionInfo from 'material-ui/svg-icons/action/info'


const Places =  ({ places, router }) => (
  <Paper>
    <List>
    <Subheader>Featured Places</Subheader>
      { places.map(({ id, name, address, itemCount }) => {
          return (
            <div key={ id }>
              <Divider />
              <ListItem
                rightIcon={<ActionInfo />}
                primaryText={ `${name} (${itemCount})` }
                secondaryText={ address }
                secondaryTextLines={1}
                onClick={() => router.push(`/places/${id}`)}
              />
            </div>
          )
        })
      }
    </List>
  </Paper>
)

export default Places
