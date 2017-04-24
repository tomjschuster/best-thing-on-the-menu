import React, { Component } from 'react'
import { Panel } from 'react-toolbox'
import { Card, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card'
import { Button } from 'react-toolbox/lib/button'
import Item from './Item'
import AddReview from './AddReview'


export default class SinglePlace extends Component {

  /*----------  LIFE-CYCLE EVENTS  ----------*/
  componentWillMount() {
    const { params: { id },
            getPlaceItemsReviews,
            router
          } = this.props
    getPlaceItemsReviews(id, router)
  }

  componentWillUnmount() {
    const { clearCurrentPlace, clearAddReview } = this.props
    clearCurrentPlace()
    clearAddReview()
  }


  /*----------  INSTANCE METHODS  ----------*/
  onReviewSubmit = () => {
    const { checkItemAndCreateReview,
            closeAndClearAddReview,
            auth: { id: userId },
            forms: { addReview: addReviewForm },
            currentPlace: { id: placeId }
          } = this.props
    const { itemName, stars, comment } = addReviewForm
    const trimmedName = itemName.trim()
    if (trimmedName && stars) {
      checkItemAndCreateReview(placeId, trimmedName, stars, comment, userId)
      closeAndClearAddReview()
    }
  }


/*----------  RENDER  ----------*/
  render() {
    const { onReviewSubmit } = this
    const { currentPlace: { name, address, items = [] },
            ux: { isShowAddReview },
            forms: { addReview: addReviewForm },
            showAddReview,
            closeAndClearAddReview,
            updateItemName,
            updateStars,
            updateComment
          } = this.props

    return (
      <div>
        <Card>
          <CardTitle title={name} subtitle={address} />
          <CardActions>
            { isShowAddReview ?
                <AddReview
                  itemsSource={items.map(({ name }) => name)}
                  addReviewForm={addReviewForm}
                  closeAndClearAddReview={closeAndClearAddReview}
                  updateItemName={updateItemName}
                  updateStars={updateStars}
                  updateComment={updateComment}
                  onReviewSubmit={onReviewSubmit}
                /> :
                <Button
                  label='Add a Review'
                  onClick={showAddReview}
                  raised
                  primary
                />
            }
          </CardActions>
          <CardText>
            { items && items.map(item => <Item key={item.id} item={item} />) }
          </CardText>
        </Card>
      </div>
    )
  }
}
