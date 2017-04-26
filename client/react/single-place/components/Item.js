import React from 'react'
import { Card, CardTitle, CardText } from 'react-toolbox/lib/card'
import Review from './Review'


const Item = ({ item }) => (
    <Card key={item.name}>
      <CardTitle
          title={item.name}
      />
      <CardText>
          { item.reviews.map(review => <Review key={ review.id } review={ review } /> )}
      </CardText>
    </Card>
  )

export default Item
