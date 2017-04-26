import React from 'react'
import { List, ListItem, ListSubHeader, ListDivider } from 'react-toolbox/lib/list'
import FontIcon from 'react-toolbox/lib/font_icon'


const Places =  ({ places, router }) => (
  <div>
    <List>
      <ListSubHeader>Featured Places</ListSubHeader>
        { places.map(({ id, name, address, numItems }) => {
            return (
              <div key={ id }>
                <ListDivider />
                <ListItem
                  rightIcon={<FontIcon value='info' />}
                  caption={ `${name} (${numItems})` }
                  legend={ address }
                  onClick={() => router.push(`/places/${id}`)}
                />
              </div>
            )
          })
        }
    </List>
  </div>
)

export default Places
