import React, { Component } from 'react'
import {GridList, GridTile} from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import Subheader from 'material-ui/Subheader'
import StarBorder from 'material-ui/svg-icons/toggle/star-border'
import Paper from 'material-ui/Paper'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import Review from './Review';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import Item from './Item';
import {
  blue300,
  indigo900,
  orange200,
  deepOrange300,
  pink400,
  purple500,
} from 'material-ui/styles/colors';

export default class SingleRestaurant extends Component {
  constructor(props) {
    super(props)
  }

	onSelectItem = (event, index, value) => this.setState({value});
	onSelectStar = (event, index, value) => this.setState({value});

    componentWillMount() {
    const { location, formattedRestaurants, receiveCurrentRestaurant, router } = this.props
    const splitPath = location.pathname.split('/')
    const id = splitPath[splitPath.length - 1]
    const currentRestaurant = formattedRestaurants.find(restaurant => id == restaurant.id)
    if (currentRestaurant) receiveCurrentRestaurant(currentRestaurant)
    else router.push('/')
  }

  componentWillUnmount() {
    this.props.clearCurrentRestaurant()
  }


  	render() {
      console.log('currentRestaurant', this.props.currentRestaurant)
      // placeId = currentRestaurant.id ,...name, ...address
      const { currentRestaurant } = this.props
      const { id, name, address, items } = currentRestaurant
      console.log('CURRAENT', currentRestaurant)

	let listItems = items ? items.map((singleItem)=>{
		return (<MenuItem value={singleItem.id} key={singleItem.id} primaryText={singleItem.name} />);
	}) : []

	let stars = [];
	for(let ndx=1;ndx<=5;ndx++){
		stars.push(<MenuItem value={ndx} key={ndx} primaryText={ndx} />);
	}

    return (
      <div>
      	<h2>{name}</h2>
      	<h6>{address}</h6>
      	<Item items={items || []}/>
      	<DropDownMenu maxHeight={300} value={1} onChange={this.onSelectItem}>
        	{listItems}
      	</DropDownMenu>
      	<TextField
      		hintText="Add Comment"
      		multiLine={true}
      		rows={2}
      		rowsMax={4}
    	/>
    	<DropDownMenu maxHeight={300} value={1} onChange={this.onSelectStar}>
        	{stars}
      	</DropDownMenu>
      </div>
    )
  }
}
