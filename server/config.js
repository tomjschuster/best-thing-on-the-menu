const db = {
  user: 'root',
  host: 'localhost',
  db: 'btotm',
  metadata: true
}

const procs = {
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
    outParams: ['newUser']
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
  createItem: {
    inParams: ['name', 'placeId'],
    outParams: ['id']
  },
  createReview: {
    inParams: ['stars', 'comment', 'itemId', 'userId'],
    outParams: ['id']
  },
  checkItemAndCreateReview: {
    inParams: ['placeId', 'itemName', 'stars', 'comment', 'userId'],
    outParams: ['newItem']
  }
}

const auth = {
  GOOGLE_CALLBACK_URL: '/api/auth/google/callback'
}

module.exports = { db, procs, auth }
