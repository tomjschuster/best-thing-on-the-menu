import React, { Component } from 'react'
import { Button } from 'react-toolbox/lib/button'
import Item from './Item'
import AddReview from './AddReview'
import style from './style.css'
import { logOut } from '../../utilities/auth'

export default class SinglePlace extends Component {
  /*----------  LIFE-CYCLE EVENTS  ----------*/
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.checkAuth(
        () => this.props.getPlaceItemsReviews(this.props.params.id),
        logOut
      )
    } else {
      this.props.getPlaceItemsReviews(this.props.params.id)
    }
  }

  componentWillUnmount() {
    this.props.clearCurrentPlace()
    this.props.clearAddReview()
  }

  /*----------  INSTANCE METHODS  ----------*/
  onReviewSubmit = () => {
    const placeId = this.props.currentPlace.id
    const { stars, comment } = this.props.forms.addReview
    const userId = this.props.auth.id
    const itemName = this.props.forms.addReview.itemName.trim()

    const args = { placeId, itemName, stars, comment, userId }

    if (itemName && stars) {
      this.props.checkItemAndCreateReview(args)
      this.props.closeAndClearAddReview()
    }
  }

  /*----------  RENDER  ----------*/
  render() {
    return (
      <div className={style.singlePlace}>
        <div className={style.nameBox}>
          <h2>{this.props.currentPlace.name}</h2>
          {this.props.ux.isShowAddReview ? null : (
            <div className={style.addReviewButton}>
              <Button
                label="Add a Review"
                onClick={this.props.showAddReview}
                raised
                primary
              />
            </div>
          )}
        </div>
        <div className={style.address}>
          <p>{this.props.currentPlace.address}</p>
        </div>
        {this.props.ux.isShowAddReview ? (
          <div className={style.addReview}>
            <AddReview
              itemsSource={
                this.props.currentPlace.items
                  ? this.props.currentPlace.items.map(({ name }) => name)
                  : []
              }
              addReviewForm={this.props.forms.addReview}
              closeAndClearAddReview={this.props.closeAndClearAddReview}
              updateItemName={this.props.updateItemName}
              updateStars={this.props.updateStars}
              updateComment={this.props.updateComment}
              onReviewSubmit={this.onReviewSubmit}
            />
          </div>
        ) : null}
        {this.props.currentPlace.items ? (
          <div>
            {this.props.currentPlace.items.map(item => (
              <div key={item.id}>
                <Item
                  item={item}
                  toggleItemExpanded={this.props.toggleItemExpanded}
                />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    )
  }
}
