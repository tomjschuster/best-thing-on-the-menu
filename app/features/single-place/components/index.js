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
    const { currentPlace: { name, address, items },
            ux: { isShowAddReview },
            forms: { addReview: addReviewForm },
            showAddReview,
            closeAndClearAddReview,
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
