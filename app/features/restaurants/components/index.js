import React from 'react'
import {GridList, GridTile} from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import Subheader from 'material-ui/Subheader'
import StarBorder from 'material-ui/svg-icons/toggle/star-border'
import Paper from 'material-ui/Paper'
import RestaurantCard from './RestaurantCard'

const Restaurants = props => (
  <div className='row'>
    { props.restaurants.map(restaurant => (
      <div
        key={restaurant.id}
        className='col s12 m6 l4'
      >
        <Paper>
          <RestaurantCard
            title={restaurant.name}
          />
        </Paper>
      </div>
      )) }
  </div>
)

export default Restaurants
