import React from 'react'
import Paper from 'material-ui/Paper'
import {Card, CardHeader, CardText} from 'material-ui/Card'
const reviewStyle = {
    height: 100,
    width: '90%',
    margin: 20,
    textAlign: 'left',
    display: 'inline-block',
  }


const Review = ({ review }) => (
    <Paper style={reviewStyle} zDepth={1}>
      <Card>
        <CardHeader
          title={ review.user.name }
          subtitle={ '⭐'.repeat(review.stars) }
          avatar={ review.user.photoUrl }
        />
        <CardText>
          <span>{ review.comment }</span>
        </CardText>
      </Card>
    </Paper>
  )

export default Review
