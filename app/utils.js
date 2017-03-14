export const createReducer = (initialState, actionHandlers) => {
  return (state = initialState, action) => {
    const reduceFn = actionHandlers[action.type]
    if (!reduceFn) { return state }
    return reduceFn(state, action)
  }
}

export const denormalizePlaces = (places, items, reviews, users) => {
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

  const denormPlaces = places.map(place => (
    { ...place,
      items: denormItems.filter(({placeId}) => place.id === placeId )
    }
    ))

  return denormPlaces
}

export const denormalizeSinglePlace = (currentId, places, items, reviews, users) => {
  const denormPlaces = denormalizePlaces(places, items, reviews, users)
  return denormPlaces.find(({ id }) => id === currentId)
}
