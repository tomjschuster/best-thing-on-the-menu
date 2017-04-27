import React from 'react'
import { Card, CardTitle, CardText } from 'react-toolbox/lib/card'
import { ReviewStars } from './RatingStars'


const Review = ({ review }) => (
      <Card>
        <CardTitle
          title={ `${review.firstName} ${review.lastName}`}
          subtitle={<ReviewStars starCount={review.stars} />}
          avatar={ review.photoUrl }
        />
        <CardText>
          <span>{ review.comment }</span>
        </CardText>
      </Card>
  )

export default Review
