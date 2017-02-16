import React, { Component } from 'react'
import FlatButton from 'material-ui/FlatButton'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import Item from './Item'
import { denormalizeRestaurants } from '../../../utils'

export default class SingleRestaurant extends Component {
  constructor(props) {
    super(props)
    this.state = {
      item: 0,
      stars: 0,
      comment: ''
    }
  }

  onSelectItem = (event, index, value) => this.setState({ item: value})
  onSelectStar = (event, index, value) => this.setState({ stars: value})
  onChangeComment = (event) => this.setState({ comment: event.target.value})
  onReviewSubmit = () => {
    const { addReview, auth, reviews } = this.props
    const { item, stars, comment } = this.state
    addReview({
      id: reviews.length,
      userId: auth.id,
      itemId: item,
      comment,
      stars
    })
  }

  componentWillMount() {
    const { restaurants, items, reviews, users, receiveCurrentRestaurant, router } = this.props
    const denormRestaurants = denormalizeRestaurants(restaurants, items, reviews, users)

    const splitPath = location.pathname.split('/')
    const id = splitPath[splitPath.length - 1]

    const currentRestaurant = denormRestaurants.find(restaurant => id == restaurant.id)
    if (currentRestaurant) receiveCurrentRestaurant(currentRestaurant)
    else router.push('/')
  }

  componentWillUnmount() {
    this.props.clearCurrentRestaurant()
  }


  render() {
    const { currentRestaurant } = this.props
    const { name, address, items } = currentRestaurant

    let listItems = items ? items.map((singleItem) => {
      return (<MenuItem value={singleItem.id} key={singleItem.id} primaryText={singleItem.name} />)
    }) : []

    let stars = []
    for (let ndx = 1; ndx <= 5; ndx++) {
      stars.push(<MenuItem value={ndx} key={ndx} primaryText={ndx} />)
    }

    return (
      <div>
        <h2>{name}</h2>
        <h6>{address}</h6>
        <Item items={ items || []} />
        <DropDownMenu maxHeight={300} value={this.state.item} onChange={this.onSelectItem}>
          {listItems}
        </DropDownMenu>
        <TextField
          value={this.state.comment}
          hintText='Add Comment'
          multiLine={true}
          rows={2}
          rowsMax={4}
          onInput={this.onChangeComment}
        />
      <DropDownMenu maxHeight={300} value={this.state.stars} onChange={this.onSelectStar}>
        {stars}
      </DropDownMenu>
      <FlatButton label='Submit' onClick={() => this.onReviewSubmit()} />
      </div>
    )
  }
}
