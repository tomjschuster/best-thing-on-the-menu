import React from 'react'
import { Button } from 'react-toolbox/lib/button'
import Item from './Item'
import AddReview from './AddReview'
import style from './style.css'

const SinglePlace = ({
  currentPlace,
  ux,
  showAddReview,
  forms,
  closeAndClearAddReview,
  updateItemName,
  updateStars,
  updateComment,
  onReviewSubmit,
  toggleItemExpanded
}) => (
  <div className={style.singlePlace}>
    <div className={style.nameBox}>
      <h2>{currentPlace.name}</h2>
      {ux.isShowAddReview ? null : (
        <div className={style.addReviewButton}>
          <Button label="Add a Review" onClick={showAddReview} raised primary />
        </div>
      )}
    </div>
    <div className={style.address}>
      <p>{currentPlace.address}</p>
    </div>
    {ux.isShowAddReview ? (
      <div className={style.addReview}>
        <AddReview
          itemsSource={
            currentPlace.items ? currentPlace.items.map(({ name }) => name) : []
          }
          addReviewForm={forms.addReview}
          closeAndClearAddReview={closeAndClearAddReview}
          updateItemName={updateItemName}
          updateStars={updateStars}
          updateComment={updateComment}
          onReviewSubmit={onReviewSubmit}
        />
      </div>
    ) : null}
    {currentPlace.items ? (
      <div>
        {currentPlace.items.map(item => (
          <div key={item.id}>
            <Item item={item} toggleItemExpanded={toggleItemExpanded} />
          </div>
        ))}
      </div>
    ) : null}
  </div>
)

export default SinglePlace
