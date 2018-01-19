import React from 'react'
import { List, ListItem, ListSubHeader, ListDivider } from 'react-toolbox/lib/list'
import FontIcon from 'react-toolbox/lib/font_icon'
import { history } from '../../router'

const Places =  ({ places }) => (
  <div>
    <List>
      <ListSubHeader>Featured Places</ListSubHeader>
        {places.map(({ id, name, address, numItems }) => (
          <div key={ id }>
            <ListDivider />
            <ListItem
              rightIcon={<FontIcon value='info' />}
              caption={`${name} (${numItems})`}
              legend={address}
              onClick={() => history.push(`/places/${id}`)}
            />
          </div>
        ))}
    </List>
  </div>
)

export default Places
