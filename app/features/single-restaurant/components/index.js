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
  	let placeId= 1;
  	let placeName = 'Shack Shack';
  	let placeAddress = 'E 23rd St & Madison Ave New York, NY 10010';
  	let item = [
          { ItemId: 1, PlaceId: 1, ItemName: 'Shack Burger', Review:[
		{ ReviewId: 1, Stars: 4, ItemId: 1, Comment:'Awesome', Person: {
			"id":1, "name":"Aitken Thompson", "email":"athompson@taskstream.com", "photoUrl":"https://uploadsbiz.taskstream.com/2017/01/19101228/Aitken.png"
		}},
		{ ReviewId: 2, Stars: 2, ItemId: 1, Comment:'Great',Person: {
			"id":2, "name":"Akeem Boatswain", "email":"aboatswain@taskstream.com", "photoUrl":"https://uploadsbiz.taskstream.com/2017/01/20064407/TaskstreamJan12-Akeem-6875-427x640.jpg"
		} },
		{ ReviewId: 3, Stars: 3, ItemId: 1, Comment:'Awefull',Person: {
			"id":3, "name":"Alex Swaim", "email":"aswaim@taskstream.com", "photoUrl":"https://uploadsbiz.taskstream.com/2017/01/23094347/Alex.png"
		}},
		{ ReviewId: 9, Stars: 4, ItemId: 1, Comment:'Good',Person:{
			"id":4, "name":"Allison Holt", "email":"aholt@taskstream.com", "photoUrl":"https://uploadsbiz.taskstream.com/2017/01/20121013/Allison1.png"
		} }

	]},
		  { ItemId: 2, PlaceId: 1, ItemName: 'Shroom Burger'},
		  { ItemId: 3, PlaceId: 1, ItemName: 'Hamburger'},
		  { ItemId: 4, PlaceId: 2, ItemName: 'Pad Thai'},
		  { ItemId: 5, PlaceId: 2, ItemName: 'Orange Chicken'},
		  { ItemId: 6, PlaceId: 2, ItemName: 'Drunk Man Noodles'},
		  { ItemId: 6, PlaceId: 2, ItemName: 'Tamarind Whole Fish'}
	];

	let listItems= item.map((singleItem)=>{
		return (<MenuItem value={singleItem.ItemId} key={singleItem.ItemId} primaryText={singleItem.ItemName} />);
	})

	let stars = [];
	for(let ndx=1;ndx<=5;ndx++){
		stars.push(<MenuItem value={ndx} key={ndx} primaryText={ndx} />);
	}

    return (
      <div>
      	<h2>{placeName}</h2>
      	<h6>{placeAddress}</h6>
      	<Item items={item}/>
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
