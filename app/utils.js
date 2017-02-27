export const createReducer = (initialState, actionHandlers) => {
  return (state = initialState, action) => {
    const reduceFn = actionHandlers[action.type]
    if (!reduceFn) { return state }
    return reduceFn(state, action)
  }
}

export const denormalizeRestaurants = (restaurants, items, reviews, users) => {
  const denormReviews = reviews.map(review => (
      { ...review,
        user: users.find(({id}) => id === review.userId )
      }
    ))

  const denormItems = items.map(item => (
      { ...item,
        reviews: denormReviews.filter(({itemId}) => item.id === itemId )
      }
    ))

  const denormRestaurants = restaurants.map(restaurant => (
    { ...restaurant,
      items: denormItems.filter(({restaurantId}) => restaurant.id === restaurantId )
    }
    ))

  return denormRestaurants
}

export const denormalizeSingleRestaurant = (currentId, restaurants, items, reviews, users) => {
  console.log(currentId, typeof currentId)
  const denormReviews = reviews.map(review => (
      { ...review,
        user: users.find(({ id }) => id === review.userId )
      }
    ))

  const denormItems = items.map(item => (
      { ...item,
        reviews: denormReviews.filter(({itemId}) => itemId === item.id )
      }
    ))

  const denormRestaurants = restaurants.map(restaurant => (
    { ...restaurant,
      items: denormItems.filter(({restaurantId}) => restaurantId === restaurant.id )
    }
    ))
  console.log(denormRestaurants)
  return denormRestaurants.find(({ id }) => id === currentId)
}
