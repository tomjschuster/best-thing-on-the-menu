import React from 'react'
import {GridList, GridTile} from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import Subheader from 'material-ui/Subheader'
import StarBorder from 'material-ui/svg-icons/toggle/star-border'
import Paper from 'material-ui/Paper'
import RestaurantCard from './RestaurantCard'
import RestaurantList from './RestaurantList'

const Restaurants = props => (
  <div className='row'>

        <Paper>
          <RestaurantList />
        </Paper>

  </div>
)

export default Restaurants
