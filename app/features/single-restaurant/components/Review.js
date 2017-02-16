import React from 'react'
import Paper from 'material-ui/Paper'
import {Card, CardHeader, CardText} from 'material-ui/Card'

const Review = props => {
  const style = {
    height: 100,
    width: '90%',
    margin: 20,
    textAlign: 'left',
    display: 'inline-block',
  }

  const reviews = props.reviews.map((singleReview) => (
    <Paper key={singleReview.id} style={style} zDepth={1}>
      <Card>
        <CardHeader
          title={singleReview.user.name}
          subtitle={singleReview.stars + ' ⭐'}
          avatar={singleReview.user.photoUrl}
        />
        <CardText>
          {singleReview.comment}
        </CardText>
      </Card>
    </Paper>
    )
  )

  return (
    <div>
      {reviews}
    </div>
  )
}

export default Review
