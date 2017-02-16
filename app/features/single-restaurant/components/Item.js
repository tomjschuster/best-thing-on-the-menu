import React, { Component } from 'react'
import {Card, CardHeader, CardText} from 'material-ui/Card'
import Review from './Review'

export default class Item extends Component {

  render(){
    let items = this.props.items

    let listItem = items.map((item)=>{
      return (
        <Card key={item.name}>
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
    })
    return(
      <div>
        {listItem}
      </div>
    )

  }
}
