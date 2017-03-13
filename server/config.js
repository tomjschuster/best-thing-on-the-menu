const db = {
  user: 'root',
  host: 'localhost',
  db: 'btotm',
  metadata: true
}

const procs = {
  getPlaces: {
    inParams: [],
    outParams: []
  },
  getPlaceItemsReviews: {
    inParams: ['placeId'],
    outParams: ['placeFound']
  },
  createPlace: {
    inParams: ['googleId', 'name', 'address'],
    outParams: []
  },
  createItem: {
    inParams: ['name', 'placeId'],
    outParams: []
  },
  createReview: {
    inParams: ['stars', 'comment', 'itemId', 'userId'],
    outParams: []
  }
}


module.exports = { db, procs }
