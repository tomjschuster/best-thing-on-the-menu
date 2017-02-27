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

import AutoComplete from 'material-ui/AutoComplete'
import IconButton from 'material-ui/IconButton'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Star from 'material-ui/svg-icons/toggle/star'
import StarBorder from 'material-ui/svg-icons/toggle/star-border'

import { denormalizeSingleRestaurant } from '../../../utils'
import { itemAutoCompleteDataConfig } from '../../../config'


const RatingStars = ({ starCount, onClick }) => (
    <div>
      { Array(5).fill(0).map((_, idx) => (
            <IconButton
              key={`star-${idx + 1}`}
              onClick={ () => onClick(idx + 1) }>
              { starCount <= idx ? <StarBorder /> : <Star /> }
            </IconButton>
          )
        )
      }
    </div>
  )

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
  onItemSelect = (chosenRequest, idx) => {
    const { addToItemsAndCurrentRestaurant, currentRestaurant } = this.props
    if (idx === -1) {
      addToItemsAndCurrentRestaurant(chosenRequest, currentRestaurant.id)
    }
  }

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
              <Card>
                <CardText>
                  <h4>Write a Review</h4>
                  <ul style={{listStyle: 'none'}}>
                    <li>
                      <AutoComplete
                        floatingLabelText='Select or enter a menu item.'
                        openOnFocus
                        filter={AutoComplete.caseInsensitiveFilter}
                        dataSource={items || []}
                        dataSourceConfig={itemAutoCompleteDataConfig}
                        searchText={addReviewForm.item.name}
                        onNewRequest={updateItemNewOrOld}
                        onUpdateInput={updateItemName}
                        style={{paddingLeft: '12px'}}
                      />
                    </li>
                    <li>
                      <RatingStars
                        starCount={addReviewForm.stars}
                        onClick={updateStars}
                      />
                    </li>
                    <li>
                      <TextField
                        name='comment-field'
                        multiLine
                        rows={3}
                        floatingLabelText='Comment'
                        style={ {paddingLeft: '12px'} }
                        value={addReviewForm.comment}
                        onChange={ (_, comment) => updateComment(comment) }
                      />
                    </li>
                  </ul>
                </CardText>
                <CardActions>
                  <RaisedButton
                    label='Submit'
                    primary={true}
                    onClick={onReviewSubmit}
                  />
                  <RaisedButton
                    label='Cancel'
                    primary={true}
                    onClick={closeAndClearAddReview}
                  />
                </CardActions>
              </Card> :
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
