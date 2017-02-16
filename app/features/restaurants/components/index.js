import React from 'react'
import {GridList, GridTile} from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import Subheader from 'material-ui/Subheader'
import StarBorder from 'material-ui/svg-icons/toggle/star-border'
import Paper from 'material-ui/Paper'
import RestaurantList from './RestaurantList'

const Restaurants = props => {
  return (
  <div className='row'>

        <Paper>
          <RestaurantList formattedRestaurants={props.formattedRestaurants} />
        </Paper>

  </div>
)}

export default Restaurants
