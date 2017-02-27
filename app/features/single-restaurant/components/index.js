/*=============================================
=            TODO           =
=============================================
x1. Check menu item on submit
x2. Clear redux form on submit/cancel/unmount
x3. Update current restaurant on submit
xx4. Change component did mount logic to only denormalize current restaurant, in thunk
5. Styling and modularization
=====  END TODO  ======*/


import React, { Component } from 'react'

import Item from './Item'
import AddReview from './AddReview'

import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'


import { denormalizeSingleRestaurant } from '../../../utils'


export default class SingleRestaurant extends Component {

  /*----------  LIFE-CYCLE EVENTS  ----------*/
  componentDidUpdate(prevProps) {
    const { restaurants,
            items,
            reviews,
            users,
            currentRestaurant,
            receiveCurrentRestaurant,
          } = this.props

    if (reviews !== prevProps.reviews) {
      const updatedCurrentRestaurant = denormalizeSingleRestaurant(
        currentRestaurant.id,
        restaurants,
        items,
        reviews,
        users
      )
      receiveCurrentRestaurant(updatedCurrentRestaurant)
    }

}

  componentWillUnmount() {
    const { clearCurrentRestaurant, clearAddReview } = this.props
    clearCurrentRestaurant()
    clearAddReview()
  }


  /*----------  INSTANCE METHODS  ----------*/
  onReviewSubmit = () => {
    const { addReview,
            addToItemsAndCurrentRestaurant,
            closeAndClearAddReview,
            auth: { id: userId },
            forms: { addReview: addReviewForm },
            currentRestaurant: { id: restaurantId, items },
            reviews
          } = this.props
    const { item, stars, comment } = addReviewForm

    let itemId = item.id
    if (item.isSet) {
      if (item.isNew) {
        itemId = addToItemsAndCurrentRestaurant(item.name, restaurantId)
      }
    } else {
      const foundItem = items.find(currentItem => currentItem.name === item.name)
      itemId = foundItem ? foundItem.id : addToItemsAndCurrentRestaurant(item.name, restaurantId)
    }

    addReview({
        id: reviews.length,
        userId,
        itemId,
        comment,
        stars
      })

    closeAndClearAddReview()
  }


/*----------  RENDER  ----------*/
  render() {
    const { onReviewSubmit } = this
    const { currentRestaurant: { name, address, items },
            ux: { isShowAddReview },
            forms: { addReview: addReviewForm },
            showAddReview,
            closeAndClearAddReview,
            updateItemNewOrOld,
            updateItemName,
            updateStars,
            updateComment
          } = this.props

    return (
      <Card>
        <CardTitle title={name} subtitle={address} />
        <CardActions>
          { isShowAddReview ?
              <AddReview
                item={items}
                addReviewForm={addReviewForm}
                closeAndClearAddReview={closeAndClearAddReview}
                updateItemNewOrOld={updateItemNewOrOld}
                updateItemName={updateItemName}
                updateStars={updateStars}
                updateComment={updateComment}
                onReviewSubmit={onReviewSubmit}
              /> :
              <RaisedButton
                label='Add a Review'
                primary={true}
                onClick={showAddReview}
              />
          }
        </CardActions>
        <CardText>
          { items && items.map(item => <Item key={item.id} item={item} />) }
        </CardText>
      </Card>
    )
  }
}
