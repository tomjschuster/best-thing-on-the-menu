import React from 'react'
import {Card, CardHeader, CardText} from 'material-ui/Card'
import Review from './Review'

const Item = props => {
  let listItem = props.items.map((item) => {
    return (
      <Card key={item.name}>
        <CardHeader
            title={item.name}
            subtitle = '⭐'
            actAsExpander={true}
            showExpandableButton={true}
        />
        <CardText expandable={true}>
            <Review reviews={item.reviews} />
         </CardText>
        </Card>)
  })

  return (
    <div>
      {listItem}
    </div>
  )
}

export default Item
