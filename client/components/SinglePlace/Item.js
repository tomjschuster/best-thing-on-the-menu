import React from 'react'
import { Card, CardText } from 'react-toolbox/lib/card'
import { Button } from 'react-toolbox/lib/button'
import { ItemCardTitle } from '../custom-components/ItemCard'
import { ReviewStars } from './RatingStars'
import Review from './Review'
import style from './style.css'

const Title = ({ name, avgStars, numReviews, onClick }) => (
  <div className={style.itemTitle} onClick={onClick}>
    <h5>{name}</h5>&nbsp;&nbsp;
    {numReviews ? (
      <ReviewStars
        className={style.itemTitleStars}
        starCount={Math.round(avgStars)}
      />
    ) : null}
    <h5>{`(${numReviews})`}</h5>
  </div>
)

const calculateAverageStars = reviews =>
  reviews.length > 0
    ? reviews.map(({ stars }) => stars).reduce((sum, curr) => sum + curr, 0) /
      reviews.length
    : 0

const Item = ({ item, toggleItemExpanded }) => (
  <Card key={item.id}>
    <ItemCardTitle
      title={
        <Title
          name={item.name}
          avgStars={Math.round(calculateAverageStars(item.reviews))}
          numReviews={item.reviews.length}
          onClick={
            item.reviews.length > 0 ? () => toggleItemExpanded(item.id) : null
          }
        />
      }
      subtitle={
        item.reviews.length > 0 ? (
          <Button
            icon={`keyboard_arrow_${item.expanded ? 'up' : 'down'}`}
            onClick={
              item.reviews.length > 0 ? () => toggleItemExpanded(item.id) : null
            }
            floating
            mini
          />
        ) : null
      }
    />
    {item.expanded ? (
      <CardText>
        {item.reviews.map(review => (
          <div key={review.id} className={style.review}>
            <Review review={review} />
          </div>
        ))}
      </CardText>
    ) : null}
  </Card>
)

export default Item
