import React, { Component } from 'react'
import {GridList, GridTile} from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import Subheader from 'material-ui/Subheader'
import StarBorder from 'material-ui/svg-icons/toggle/star-border'
import Paper from 'material-ui/Paper'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';

import {
  blue300,
  indigo900,
  orange200,
  deepOrange300,
  pink400,
  purple500,
} from 'material-ui/styles/colors';


export default class Review extends Component {

  render() {
  	const style = {
	  height: 100,
	  width: '90%',
	  margin: 20,
	  textAlign: 'left',
	  display: 'inline-block',
	};
	const style1={
		margin: 20
	};
  	let reviews = this.props.reviews.map((singleReview)=>{
				    return(
				    	<Paper style={style} zDepth={1}>
				    		<Avatar style ={style1} src={singleReview.Person.photoUrl} />
				    		<div>{singleReview.Stars}</div>
				    		<div>{singleReview.Comment}</div>
				    	</Paper>
				    )
				});
  	return(
  		<div>
  			{reviews}
  		</div>
  	)
  }
}