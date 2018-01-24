import React, { Component } from 'react'
import SinglePlace from './SinglePlace'
import {
  auth as authActions,
  currentPlace as currentPlaceActions,
  forms as formsActions,
  ux as uxActions
} from '../../redux/actions'

export default class SinglePlaceWrapper extends Component {
  /*----------  DISPATCH EVENTS  ----------*/
  checkAuth = (onSuccess, onFailure) =>
    this.props.dispatch(authActions.checkAuth(onSuccess, onFailure))

  getPlaceItemsReviews = id =>
    this.props.dispatch(currentPlaceActions.getPlaceItemsReviews(id))

  clearCurrentPlace = () =>
    this.props.dispatch(currentPlaceActions.clearCurrentPlace())

  checkItemAndCreateReview = ({ placeId, itemName, stars, comment, userId }) =>
    this.props.dispatch(
      currentPlaceActions.checkItemAndCreateReview({
        placeId,
        itemName,
        stars,
        comment,
        userId
      })
    )

  toggleItemExpanded = id =>
    this.props.dispatch(currentPlaceActions.toggleItemExpanded(id))

  showAddReview = () => this.props.dispatch(uxActions.showAddReview())

  updateItemName = name =>
    this.props.dispatch(formsActions.updateItemName(name))

  updateStars = stars => this.props.dispatch(formsActions.updateStars(stars))

  updateComment = comment =>
    this.props.dispatch(formsActions.updateComment(comment))

  clearAddReview = () => this.props.dispatch(formsActions.clearAddReview())

  closeAndClearAddReview = () =>
    this.props.dispatch(formsActions.closeAndClearAddReview())

  /*----------  RENDER  ----------*/
  render() {
    return (
      <SinglePlace
        params={this.props.params}
        auth={this.props.auth}
        forms={this.props.forms}
        currentPlace={this.props.currentPlace}
        ux={this.props.ux}
        checkAuth={this.checkAuth}
        getPlaceItemsReviews={this.getPlaceItemsReviews}
        clearCurrentPlace={this.clearCurrentPlace}
        checkItemAndCreateReview={this.checkItemAndCreateReview}
        toggleItemExpanded={this.toggleItemExpanded}
        showAddReview={this.showAddReview}
        updateItemName={this.updateItemName}
        updateStars={this.updateStars}
        updateComment={this.updateComment}
        clearAddReview={this.clearAddReview}
        closeAndClearAddReview={this.closeAndClearAddReview}
      />
    )
  }
}
