import React from 'react'
import { Button } from 'react-toolbox/lib/button'
import Item from './Item'
import AddReview from './AddReview'
import style from './style.css'

const Header = ({ name, isShowAddReview, showAddReview }) => (
  <div className={style.nameBox}>
    <h2>{name}</h2>
    {isShowAddReview ? null : (
      <div className={style.addReviewButton}>
        <Button label="Add a Review" onClick={showAddReview} raised primary />
      </div>
    )}
  </div>
)

const Address = ({ address }) => (
  <div className={style.address}>
    <p>{address}</p>
  </div>
)
const AddReviewBox = ({
  isShowAddReview,
  items,
  addReviewForm,
  closeAndClearAddReview,
  updateItemName,
  updateStars,
  updateComment,
  onReviewSubmit
}) =>
  isShowAddReview ? (
    <div className={style.addReview}>
      <AddReview
        itemsSource={items ? items.map(({ name }) => name) : []}
        addReviewForm={addReviewForm}
        closeAndClearAddReview={closeAndClearAddReview}
        updateItemName={updateItemName}
        updateStars={updateStars}
        updateComment={updateComment}
        onReviewSubmit={onReviewSubmit}
      />
    </div>
  ) : null

const CurrentPlaceItems = ({ items, toggleItemExpanded }) =>
  items ? (
    <div>
      {items.map(item => (
        <div key={item.id}>
          <Item item={item} toggleItemExpanded={toggleItemExpanded} />
        </div>
      ))}
    </div>
  ) : null

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
    <Header
      name={currentPlace.name}
      isShowAddReview={ux.isShowAddReview}
      showAddReview={showAddReview}
    />
    <Address address={currentPlace.address} />
    <AddReviewBox
      isShowAddReview={ux.isShowAddReview}
      items={currentPlace.items}
      addReviewForm={forms.addReview}
      closeAndClearAddReview={closeAndClearAddReview}
      updateItemName={updateItemName}
      updateStars={updateStars}
      updateComment={updateComment}
      onReviewSubmit={onReviewSubmit}
    />
    <CurrentPlaceItems
      items={currentPlace.items}
      toggleItemExpanded={toggleItemExpanded}
    />
  </div>
)

export default SinglePlace
