import React, { Component } from 'react'
import SinglePlace from './SinglePlace'
import {
  auth as authActions,
  currentPlace as currentPlaceActions,
  forms as formsActions,
  ux as uxActions
} from '../../redux/actions'

export default class SinglePlaceWrapper extends Component {
  _ = () => {}

  /*----------  DISPATCH EVENTS  ----------*/
  checkAuth = (onSuccess, onFailure) => this.props.dispatch(
    authActions.checkAuth(onSuccess, onFailure)
  )

  getPlaceItemsReviews = (id) => this.props.dispatch(
    currentPlaceActions.getPlaceItemsReviews(id)
  )

  clearCurrentPlace = () => this.props.dispatch(
    currentPlaceActions.clearCurrentPlace()
  )

  checkItemAndCreateReview = (placeId, name, stars, comment, userId) =>
    this.props.dispatch(
      currentPlaceActions.checkItemAndCreateReview(placeId, name, stars, comment, userId)
  )

  toggleItemExpanded = (id) => this.props.dispatch(
    currentPlaceActions.toggleItemExpanded(id)
  )

  showAddReview = () => this.props.dispatch(
    uxActions.showAddReview()
  )

  updateItemName = (name) => this.props.dispatch(
    formsActions.updateItemName(name)
  )

  updateStars = (stars) => this.props.dispatch(
    formsActions.updateStars(stars)
  )

  updateComment = (comment) => this.props.dispatch(
    formsActions.updateComment(comment)
  )

  clearAddReview = () => this.props.dispatch(
    formsActions.clearAddReview()
  )

  closeAndClearAddReview = () => this.props.dispatch(
    formsActions.closeAndClearAddReview()
  )


/*----------  RENDER  ----------*/
  render() {
    const { params, auth, forms, currentPlace, ux } = this.props
    const {
      checkAuth,
      getPlaceItemsReviews,
      clearCurrentPlace,
      checkItemAndCreateReview,
      toggleItemExpanded,
      showAddReview,
      updateItemName,
      updateStars,
      updateComment,
      clearAddReview,
      closeAndClearAddReview
    } = this
    const props = {
      params,
      auth,
      forms,
      currentPlace,
      ux,
      checkAuth,
      getPlaceItemsReviews,
      clearCurrentPlace,
      checkItemAndCreateReview,
      toggleItemExpanded,
      showAddReview,
      updateItemName,
      updateStars,
      updateComment,
      clearAddReview,
      closeAndClearAddReview
    }

    return (
     <SinglePlace { ...props } />
    )
  }
}
