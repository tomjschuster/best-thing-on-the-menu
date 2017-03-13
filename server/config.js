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
    outParams: ['id']
  },
  createItem: {
    inParams: ['name', 'placeId'],
    outParams: ['id']
  },
  createReview: {
    inParams: ['stars', 'comment', 'itemId', 'userId'],
    outParams: ['id']
  }
}


module.exports = { db, procs }
