const db = {
  user: 'root',
  host: 'localhost',
  db: 'btotm',
  metadata: true
}

const procs = {
  getUser: {
    inParams: ['userId', 'place_id'],
    outParams: ['num_users', 'numItems']
  },
  getUserReviews: {
    inParams: ['userId'],
    outParams: []
  }
}


module.exports = { db, procs }
