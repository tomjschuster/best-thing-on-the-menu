import React from 'react'
import {Card, CardHeader, CardText} from 'material-ui/Card'
import Paper from 'material-ui/Paper'
import Review from './Review'

const Item = ({ item }) => (
  <Paper>
    <Card key={item.name}>
      <CardHeader
          title={item.name}
          subtitle = '⭐'
          actAsExpander={true}
          showExpandableButton={true}
      />
      <CardText expandable={true}>
          { item.reviews.map(review =>
              <Review key={ review.id } review={ review } />
          )}
      </CardText>
    </Card>
  </Paper>
  )

export default Item
