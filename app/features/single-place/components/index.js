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
    const { checkItemAndCreateReview,
            closeAndClearAddReview,
            auth: { id: userId },
            forms: { addReview: addReviewForm },
            currentPlace: { id: placeId }
          } = this.props
    const { item, stars, comment } = addReviewForm

    if (item.name) {
      // NEED TO IMPLEMENT checkItemAndCreateReview
      checkItemAndCreateReview(placeId, item.name, stars, comment, userId)
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
