/*=============================================
=            TODO           =
=============================================
1. Fix AutoComplete Data
2. Styling
=====  END TODO  ======*/


import React, { Component } from 'react'

import Item from './Item'
import AddReview from './AddReview'

import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'


import { denormalizeSinglePlace} from '../../../utils'


export default class SinglePlace extends Component {

  /*----------  LIFE-CYCLE EVENTS  ----------*/
  componentDidUpdate(prevProps) {
    const { places,
            items,
            reviews,
            users,
            currentPlace,
            receiveCurrentPlace,
          } = this.props

    if (reviews !== prevProps.reviews) {
      const updatedCurrentPlace = denormalizeSinglePlace(
        currentPlace.id,
        places,
        items,
        reviews,
        users
      )
      receiveCurrentPlace(updatedCurrentPlace)
    }

}

  componentWillUnmount() {
    const { clearCurrentPlace, clearAddReview } = this.props
    clearCurrentPlace()
    clearAddReview()
  }


  /*----------  INSTANCE METHODS  ----------*/
  onReviewSubmit = () => {
    const { addReview,
            addToItemsAndCurrentPlace,
            closeAndClearAddReview,
            auth: { id: userId },
            forms: { addReview: addReviewForm },
            currentPlace: { id: placeId, items },
            reviews
          } = this.props
    const { item, stars, comment } = addReviewForm

    let itemId = item.id
    if (item.isSet) {
      if (item.isNew) {
        itemId = addToItemsAndCurrentPlace(item.name, placeId)
      }
    } else {
      const foundItem = items.find(currentItem => currentItem.name === item.name)
      itemId = foundItem ? foundItem.id : addToItemsAndCurrentPlace(item.name, placeId)
    }

    addReview({
        id: reviews.length + 1,
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
    const { currentPlace: { name, address, items },
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
                items={items}
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
