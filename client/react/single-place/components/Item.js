import React from 'react'
import { Card, CardTitle, CardText } from 'react-toolbox/lib/card'
import { Button } from 'react-toolbox/lib/button'
import { ItemCardTitle } from '../../custom-components/ItemCard'
import { ReviewStars } from './RatingStars'
import Review from './Review'
import style from '../style.css'


const Title = ({ name, avgStars, numReviews, onClick }) => (
  <div
    className={style.itemTitle}
    onClick={onClick}
  >
    <h5>{name}</h5>&nbsp;&nbsp;
    { numReviews ?
        <ReviewStars
          className={style.itemTitleStars}
          starCount={Math.round(avgStars)}
        /> :
        null
    }
    <h5>{ `(${numReviews})` }</h5>
  </div>
)


const Item = ({ item: { id, name, reviews, expanded }, toggleItemExpanded }) => {
  const avgStars = reviews.length ?
                    reviews
                      .map(({stars}) => stars)
                      .reduce((sum, curr) => sum + curr, 0) / reviews.length : 0

  return (
    <Card key={id}>
      <ItemCardTitle
        title={
          <Title
            name={name}
            avgStars={Math.round(avgStars)}
            numReviews={reviews.length}
            onClick={reviews.length > 0 ? () => toggleItemExpanded(id) : null}
          />
        }

        subtitle={
          <Button
            icon={`keyboard_arrow_${expanded ? 'up' : 'down'}`}
            onClick={reviews.length > 0 ? () => toggleItemExpanded(id) : null}
            disabled={!reviews.length}
            floating
            mini
          />
        }
      />
      { expanded ?
          <CardText>
          { reviews.map(review => (
              <div key={review.id} className={style.review}>
                <Review review={ review } />
              </div>
            ))
          }
      </CardText> :
      null
      }
    </Card>
  )
}

export default Item
