import React, { Component } from 'react'
import FlatButton from 'material-ui/FlatButton'
import DropDownMenu from 'material-ui/DropDownMenu'
import AutoComplete from 'material-ui/AutoComplete'
import MenuItem from 'material-ui/MenuItem'
import { Card, CardActions, CardHeader, CardTitle, CardText } from 'material-ui/Card'
import Item from './Item'
import { denormalizeRestaurants } from '../../../utils'
import { itemAutoCompleteDataConfig } from '../../../config'

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
    const { restaurants,
            items,
            reviews,
            users,
            receiveCurrentRestaurant,
            router
          } = this.props

    const denormRestaurants = denormalizeRestaurants( restaurants,
                                                      items,
                                                      reviews,
                                                      users
                                                    )

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
    const { currentRestaurant: { name, address, items } } = this.props

    return (
      <Card>
        <CardTitle title={name} subtitle={address} />
        <CardHeader>
          <AutoComplete
            floatingLabelText='Select or enter a menu item.'
            openOnFocus
            filter={AutoComplete.caseInsensitiveFilter}
            dataSource={items || []}
            dataSourceConfig={itemAutoCompleteDataConfig}
          />
        </CardHeader>
        <CardText>
          { items && items.map(item => <Item key={item.id} item={item} />) }
        </CardText>
      </Card>
    )
  }
}
