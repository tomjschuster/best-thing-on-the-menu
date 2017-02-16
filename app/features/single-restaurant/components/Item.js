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

import {
  blue300,
  indigo900,
  orange200,
  deepOrange300,
  pink400,
  purple500,
} from 'material-ui/styles/colors';

export default class Item extends Component {

	render(){
		let items = this.props.items;

		let listItem = items.map((item)=>{
			return (
				<Card>
					<CardHeader
					    title={item.name}
					    subtitle = '⭐'
					    actAsExpander={true}
					    showExpandableButton={true}
					/>
					<CardText expandable={true}>
					  	<Review reviews={item.reviews}/>
					 </CardText>
	  			</Card>)
		});
		return(
			<div>
				{listItem}
			</div>
		)

	}
}
