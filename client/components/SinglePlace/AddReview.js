import React from 'react'
import { Autocomplete } from 'react-toolbox/lib/autocomplete'
import { Card, CardText, CardActions } from 'react-toolbox/lib/card'
import { Button } from 'react-toolbox/lib/button'
import Input from 'react-toolbox/lib/input'
import { AddReviewStars } from './RatingStars'


const AddReview = ({
  itemsSource,
  addReviewForm,
  closeAndClearAddReview,
  updateItemName,
  updateStars,
  updateComment,
  onReviewSubmit
}) => (
  <Card>
    <CardText>
      <h4>Write a Review</h4>
      <Autocomplete
        label='Select or enter a menu item.'
        source={itemsSource}
        suggestionMatch='anywhere'
        multiple={false}
        allowCreate
        value={addReviewForm.itemName}
        onQueryChange={updateItemName}
        onChange={updateItemName}
      />
      <AddReviewStars
        starCount={addReviewForm.stars}
        onClick={updateStars}
      />
      <Input
        name='comment-field'
        multiline
        rows={3}
        floating
        label='Comment'
        style={ {paddingLeft: '12px'} }
        value={addReviewForm.comment}
        onChange={updateComment}
      />
    </CardText>
    <CardActions>
      <Button
        label='Submit'
        raised
        primary
        onClick={onReviewSubmit}
      />
      <Button
        label='Cancel'
        raised
        primary
        onClick={closeAndClearAddReview}
      />
    </CardActions>
  </Card>
)

export default AddReview
