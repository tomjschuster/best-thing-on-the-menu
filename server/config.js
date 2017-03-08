const db = {
  user: 'root',
  host: 'localhost',
  db: 'btotm',
  metadata: true
}

const procs = {
  getUser: {
    inParams: ['user_id', 'place_id'],
    outParams: ['num_users', 'num_items']
  },
  getUserReviews: {
    inParams: ['user_id'],
    outParams: []
  }
}


module.exports = { db, procs }
