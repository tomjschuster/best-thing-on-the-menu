module.exports = {
  createUser: {
    inParams: ['firstName', 'lastName', 'email', 'hash', 'photoUrl', 'isAdmin'],
    outParams: ['alreadyExists', 'id']
  },
  getValidDomains: {
    inParams: [],
    outParams: []
  },
  getHash: {
    inParams: ['email'],
    outParams: []
  },
  updateOrCreateUser: {
    inParams: ['firstName', 'lastName', 'email', 'photoUrl'],
    outParams: ['newUser']
  },
  updateUserIfExists: {
    inParams: ['firstName', 'lastName', 'email', 'photoUrl'],
    outParams: ['userExists']
  },
  getUserByEmail: {
    inParams: ['email'],
    outParams: []
  },
  getPlaces: {
    inParams: [],
    outParams: []
  },
  getPlaceItemsReviews: {
    inParams: ['placeId'],
    outParams: ['found']
  },
  createPlace: {
    inParams: ['googleId', 'name', 'address'],
    outParams: ['id']
  },
  checkPlace: {
    inParams: ['googleId', 'name', 'address'],
    outParams: ['id', 'newPlace']
  },
  deletePlace: {
    inParams: ['placeId'],
    outParams: []
  },
  createItem: {
    inParams: ['name', 'placeId'],
    outParams: ['id']
  },
  deleteItem: {
    inParams: ['itemId'],
    outParams: []
  },
  createReview: {
    inParams: ['stars', 'comment', 'itemId', 'userId'],
    outParams: ['id']
  },
  checkItemAndCreateReview: {
    inParams: ['placeId', 'itemName', 'stars', 'comment', 'userId'],
    outParams: ['newItem', 'id']
  },
  deleteReview: {
    inParams: ['reviewId'],
    outParams: []
  }
}
