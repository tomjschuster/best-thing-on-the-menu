import React from 'react'

import RatingStars from './RatingStars'

import AutoComplete from 'material-ui/AutoComplete'
import { Card, CardActions, CardText } from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import { itemAutoCompleteDataConfig } from '../../../config'

const AddReview = ({ items,
                     addReviewForm,
                     closeAndClearAddReview,
                     updateItemNewOrOld,
                     updateItemName,
                     updateStars,
                     updateComment,
                     onReviewSubmit
                   }) => (
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
    </Card>
  )

export default AddReview
