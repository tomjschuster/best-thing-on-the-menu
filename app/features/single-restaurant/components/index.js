import React, { Component } from 'react'

import Item from './Item'

import AutoComplete from 'material-ui/AutoComplete'
import IconButton from 'material-ui/IconButton'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import Star from 'material-ui/svg-icons/toggle/star'
import StarBorder from 'material-ui/svg-icons/toggle/star-border'

import { denormalizeRestaurants } from '../../../utils'
import { itemAutoCompleteDataConfig } from '../../../config'
import { times } from 'lodash'


const RatingStars = ({ starCount, onClick }) => (
    <div>
      { Array(5).fill(0).map((_, idx) => (
            <IconButton
              key={`star-${idx}`}
              onClick={ () => onClick(idx) }>
              { starCount <= idx ? <StarBorder /> : <Star /> }
            </IconButton>
          )
        )
      }
    </div>
  )

export default class SingleRestaurant extends Component {
  constructor(props) {
    super(props)
    this.state = {
      itemName: '',
      item: 0,
      stars: 0,
      comment: ''
    }
  }


  componentWillMount() {
    const { restaurants,
            items,
            reviews,
            users,
            receiveCurrentRestaurant,
            router
          } = this.props
          console.log(times(5, (...args) => console.log(...args)))

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


  onItemSelect = (chosenRequest, idx) => {
    const { addItem, addItemToCurrentRestaurant, currentRestaurant } = this.props
    if (idx === -1) {
      const item = { id: Math.random().toString(36).substring(7),
                name: chosenRequest,
                restaurantId: currentRestaurant.id
              }
      addItem(item)
      addItemToCurrentRestaurant({...item, reviews: []})
    }
  }
  setStars = (idx) => this.setState({ stars: idx + 1})
  onSelectItem = (event, index, value) => this.setState({ item: value})
  onChangeItemName = (...args) => console.log(...args)
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


  render() {
    const { onChangeItemName, onItemSelect, setStars } = this
    const { currentRestaurant: { name, address, items } } = this.props
    const { stars } = this.state

    return (
      <Card>
        <CardTitle title={name} subtitle={address} />
        <CardActions>
            <RaisedButton label='Add a Review' primary={true} />
            <Paper>
              <ul style={{listStyle: 'none'}}>
                <li>
                  <AutoComplete
                    floatingLabelText='Select or enter a menu item.'
                    openOnFocus
                    filter={AutoComplete.caseInsensitiveFilter}
                    dataSource={items || []}
                    dataSourceConfig={itemAutoCompleteDataConfig}
                    onNewRequest={onItemSelect}
                    onUpdateInput={onChangeItemName}
                    style={{paddingLeft: '12px'}}
                  />
                </li>
                <li>
                  <RatingStars
                    starCount={stars}
                    onClick={setStars}
                  />
                </li>
                <li>
                  <TextField
                    name='comment-field'
                    multiLine
                    rows={3}
                    floatingLabelText='Comment'
                    style={{paddingLeft: '12px'}}
                  />
                </li>
              </ul>
              <RaisedButton label='Submit' primary={true} />
              <RaisedButton label='Cancel' primary={true} />
            </Paper>
        </CardActions>
        <CardText>
          { items && items.map(item => <Item key={item.id} item={item} />) }
        </CardText>
      </Card>
    )
  }
}
