import React, { Component } from 'react'
import SinglePlace from './SinglePlace'
import {
  auth as authActions,
  currentPlace as currentPlaceActions,
  forms as formsActions,
  ux as uxActions
} from '../../redux/actions'
import { logOut } from '../../utilities/auth'

export default class SinglePlaceWrapper extends Component {
  /*----------  LIFE-CYCLE EVENTS  ----------*/
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.checkAuth(
        () => this.getPlaceItemsReviews(this.props.params.id),
        logOut
      )
    } else {
      this.getPlaceItemsReviews(this.props.params.id)
    }
  }

  componentWillUnmount() {
    this.clearCurrentPlace()
    this.clearAddReview()
  }

  /*----------  INSTANCE METHODS  ----------*/
  onReviewSubmit = () => {
    const placeId = this.props.currentPlace.id
    const { stars, comment } = this.props.forms.addReview
    const userId = this.props.auth.id
    const itemName = this.props.forms.addReview.itemName.trim()

    const args = { placeId, itemName, stars, comment, userId }

    if (itemName && stars) {
      this.checkItemAndCreateReview(args)
      this.closeAndClearAddReview()
    }
  }

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
        clearCurrentPlace={this.clearCurrentPlace}
        checkItemAndCreateReview={this.checkItemAndCreateReview}
        closeAndClearAddReview={this.closeAndClearAddReview}
        toggleItemExpanded={this.toggleItemExpanded}
        showAddReview={this.showAddReview}
        updateItemName={this.updateItemName}
        updateStars={this.updateStars}
        updateComment={this.updateComment}
        onReviewSubmit={this.onReviewSubmit}
      />
    )
  }
}
