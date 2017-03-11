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
  getRestaurantPlaceReviews: {
    inParams: ['placeId'],
    outParams: []
  }
}


module.exports = { db, procs }
